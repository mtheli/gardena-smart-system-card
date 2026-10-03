// Date and time the way the Home Assistant profile asks for them.
//
// Clock, week start and date order are profile settings, not properties of
// the language: a user can read a German dashboard and still want Sunday
// first and 8:30 PM. The card used to answer from the language alone - or,
// for the week, not at all - so everyone who had changed those settings got
// the other answer. These follow `hass.locale`, like the frontend does.

const WEEKDAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function language(hass) {
  return hass?.locale?.language || hass?.language || undefined;
}

/**
 * Whether times are written on a twelve-hour clock.
 *
 * The profile's two explicit choices arrive as '12' and '24'; 'language' and
 * 'system' defer to the chosen language or to the browser's own. A locale
 * without the setting is read as 'language'.
 */
export function useAmPm(hass) {
  const format = hass?.locale?.time_format ?? 'language';
  if (format === '12') return true;
  if (format === '24') return false;
  const tag = format === 'system' ? undefined : language(hass);
  try {
    const cycle = new Intl.DateTimeFormat(tag, { hour: 'numeric' }).resolvedOptions().hourCycle;
    return cycle === 'h11' || cycle === 'h12';
  } catch {
    return false;
  }
}

/**
 * A schedule time ("20:30", "20:30:00") on the profile's clock.
 *
 * Anything that is not a clock time - the sunrise and sunset symbols the
 * scheduler component uses - is handed back untouched.
 */
export function formatClockTime(hass, text) {
  const match = /^(\d{1,2}):(\d{2})/.exec(text || '');
  if (!match) return text;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return text;
  if (!useAmPm(hass)) return `${String(hours).padStart(2, '0')}:${match[2]}`;
  try {
    return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString(language(hass), {
      hour: 'numeric', minute: '2-digit', hourCycle: 'h12',
    });
  } catch {
    return text;
  }
}

/**
 * The day the week starts on, 0 = Sunday, as Home Assistant counts it.
 *
 * The profile names a day outright unless it is left at 'language', which
 * asks the language. Browsers that know neither answer keep Monday, which is
 * what the card assumed before it asked at all.
 */
export function firstWeekdayIndex(hass) {
  const chosen = hass?.locale?.first_weekday;
  if (chosen && chosen !== 'language' && WEEKDAYS.includes(chosen)) return WEEKDAYS.indexOf(chosen);
  try {
    const locale = new Intl.Locale(
      language(hass) || new Intl.DateTimeFormat().resolvedOptions().locale);
    const info = typeof locale.getWeekInfo === 'function' ? locale.getWeekInfo() : locale.weekInfo;
    // Intl counts Monday as 1 and Sunday as 7; Home Assistant puts Sunday at 0.
    if (info?.firstDay) return info.firstDay % 7;
  } catch { /* neither form of weekInfo - fall through */ }
  return 1;
}

/**
 * A day and month without the year ("22.8.", "8/22"), for chart labels.
 *
 * The language settles both the digits and the separator. An explicit date
 * order in the profile only decides which of the two comes first, so it is
 * applied by reordering what the language produced rather than by formatting
 * in some other language.
 */
export function formatDayMonth(hass, date) {
  const order = hass?.locale?.date_format;
  const tag = order === 'system' ? undefined : language(hass);
  try {
    const parts = new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'numeric' })
      .formatToParts(date);
    const day = parts.find(p => p.type === 'day').value;
    const month = parts.find(p => p.type === 'month').value;
    const separator = parts.find(p => p.type === 'literal')?.value ?? '.';
    const last = parts[parts.length - 1];
    const trailing = last.type === 'literal' ? last.value : '';
    const dayFirst = order === 'DMY' ? true
      : order === 'MDY' || order === 'YMD' ? false
        : parts.findIndex(p => p.type === 'day') < parts.findIndex(p => p.type === 'month');
    return dayFirst
      ? `${day}${separator}${month}${trailing}`
      : `${month}${separator}${day}${trailing}`;
  } catch {
    return `${date.getDate()}.${date.getMonth() + 1}.`;
  }
}

/**
 * The span a chart covers ("16.–22.08.2026"), written as the language spells
 * a date range - Intl drops whatever the two ends share by itself.
 *
 * An explicit date order in the profile is not applied here: a range comes
 * out of Intl as one string, and taking it apart to reorder it would break
 * the very collapsing that keeps the label short.
 */
export function formatDateRange(hass, from, to) {
  const tag = hass?.locale?.date_format === 'system' ? undefined : language(hass);
  try {
    return new Intl.DateTimeFormat(tag, {
      day: 'numeric', month: 'numeric', year: 'numeric',
    }).formatRange(from, to);
  } catch {
    return `${from.getDate()}.–${to.getDate()}.${to.getMonth() + 1}. ${to.getFullYear()}`;
  }
}
