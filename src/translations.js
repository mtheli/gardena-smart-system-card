import en from './locales/en.json';
import de from './locales/de.json';
import sv from './locales/sv.json';

const LOCALES = { en, de, sv };

export function t(hass, key) {
  const lang = hass?.language || 'en';
  const locale = LOCALES[lang] || LOCALES.en;
  return locale[key] || LOCALES.en[key] || key;
}
