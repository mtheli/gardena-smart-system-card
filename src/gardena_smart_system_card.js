/**
 * Gardena Smart System Card for Home Assistant
 * Supports multiple backend integrations:
 *   - hass-gardena-smart-system (thecem / py-smart-gardena)
 *   - ha-gardena-smart-system (kayloehmann)
 */

import { LitElement, html, unsafeCSS } from 'lit';
import styles from 'bundle-text:./gardena_smart_system_card.css';
import { t } from './translations.js';
import { ThecemBackend } from './backends/thecem.js';
import { KayloehmannBackend } from './backends/kayloehmann.js';

export const CARD_VERSION = "0.3.0";

// ---------- Knob constants ----------
const KNOB_MIN = 5;
const KNOB_MAX = 120;
const KNOB_ARC_START = 135;
const KNOB_ARC_SWEEP = 270;
const KNOB_RADIUS = 58;
const KNOB_CX = 70;
const KNOB_CY = 70;
const KNOB_CIRCUMFERENCE = 2 * Math.PI * KNOB_RADIUS;
const KNOB_ARC_LENGTH = (KNOB_ARC_SWEEP / 360) * KNOB_CIRCUMFERENCE;
const KNOB_PRESETS = [10, 30, 60, 120];

// Integration domain for custom services (v2+)
const DOMAIN = 'gardena_smart_system';

// ---------- Mower activity mapping ----------
const MOWER_ACTIVITY_MAP = {
  'OK_CUTTING':                  'mower_cutting',
  'OK_CUTTING_TIMER_OVERRIDDEN': 'mower_cutting_manual',
  'OK_SEARCHING':                'mower_searching',
  'OK_LEAVING':                  'mower_leaving',
  'INITIATE_NEXT_ACTION':        'mower_next_action',
  'PAUSED':                      'mower_paused',
  'PAUSED_IN_CS':                'mower_paused_cs',
  'OK_CHARGING':                 'mower_charging',
  'PARKED_TIMER':                'mower_parked_timer',
  'PARKED_PARK_SELECTED':        'mower_parked_manual',
  'PARKED_AUTOTIMER':            'mower_parked_auto',
  'PARKED_FROST':                'mower_parked_frost',
  'STOPPED_IN_GARDEN':           'mower_stopped_garden',
  'SEARCHING_FOR_SATELLITES':    'mower_searching_sat',
  'NONE':                        'mower_error',
};

const MOWER_ERROR_MAP = {
  'TRAPPED':                     'error_trapped',
  'LIFTED':                      'error_lifted',
  'OUTSIDE_WORKING_AREA':        'error_outside',
  'COLLISION':                   'error_collision',
  'UPSIDE_DOWN':                 'error_upside_down',
  'LOW_BATTERY':                 'error_low_battery',
  'TEMPORARILY_STOPPED':         'error_temp_stopped',
  'CHARGING_STATION_BLOCKED':    'error_cs_blocked',
};

// Module-level timer storage — survives card re-creation during config edits
const TIMER_STORAGE_KEY = 'gardena_card_timers';
const _persistedTimers = _loadTimers();

function _loadTimers() {
  try {
    const raw = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const timers = {};
    const now = Date.now();
    for (const [id, t] of Object.entries(parsed)) {
      const start = new Date(t.startTime);
      // Discard expired timers
      if (now - start.getTime() < t.durationSec * 1000) {
        timers[id] = { startTime: start, durationSec: t.durationSec };
      }
    }
    return timers;
  } catch { return {}; }
}

function _saveTimers() {
  try {
    const data = {};
    for (const [id, t] of Object.entries(_persistedTimers)) {
      data[id] = { startTime: t.startTime.toISOString(), durationSec: t.durationSec };
    }
    if (Object.keys(data).length > 0) {
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(TIMER_STORAGE_KEY);
    }
  } catch {}
}

// ==========================================================
// CARD CLASS
// ==========================================================
export class GardenaSmartSystemCard extends LitElement {

  static get properties() {
    return {
      config: { type: Object },
      _entities: { type: Object, state: true },
      _selectedDuration: { type: Number, state: true },
      _now: { type: Object, state: true },
      _backend: { type: Object, state: true },
      _historyData: { type: Array, state: true },
    };
  }

  constructor() {
    super();
    this._selectedDuration = 30;
    this._now = new Date();
    this._clockInterval = null;
    this._isDragging = false;
    this._backend = null;
    this._historyData = null;
    this._historyLastFetch = 0;
    // Per-entity duration: entityId -> minutes
    this._entityDurations = {};
    // Which pill popup is currently open (entityId or null)
    this._openPillPopup = null;
    // Local countdown tracking: entityId -> { startTime, durationSec }
    this._valveTimers = _persistedTimers;
  }

  connectedCallback() {
    super.connectedCallback();
    this._clockInterval = setInterval(() => {
      this._now = new Date();
    }, 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._clockInterval) {
      clearInterval(this._clockInterval);
      this._clockInterval = null;
    }
  }

  // ---------- Translation helper ----------
  _t(key) { return t(this._hass, key); }

  set hass(hass) {
    this._hass = hass;

    // Auto-detect backend adapter
    if (!this._backend && hass.services?.[DOMAIN]) {
      // valve_open is a domain-level service only registered by thecem's integration
      if (hass.services[DOMAIN].valve_open) {
        this._backend = new ThecemBackend();
      } else {
        this._backend = new KayloehmannBackend();
      }
    }

    // Detect patched integration via backend
    if (this._isPatchedIntegration === undefined && this._backend && this._entities?.valves?.length) {
      this._isPatchedIntegration = this._backend.isPatchedIntegration(hass, this._entities);
    }

    if (!this._entities || !this._entities.valves) {
      this._entities = this._findEntities(hass);
    }

    // Fetch history data if needed
    if (this.config?.show_history !== false && this._entities) {
      this._fetchHistory();
    }

    // Clean up local timers for valves/sockets that closed externally
    let timerChanged = false;
    for (const entityId of Object.keys(this._valveTimers)) {
      const state = hass.states[entityId];
      if (!state || (state.state !== 'open' && state.state !== 'on' && state.state !== 'mowing')) {
        delete this._valveTimers[entityId];
        timerChanged = true;
      }
    }
    if (timerChanged) _saveTimers();

    this.requestUpdate();
  }

  get hass() {
    return this._hass;
  }

  setConfig(config) {
    this.config = config;
    this._selectedDuration = config.default_duration || 30;
    this._entities = null;
    if (this._hass) {
      this._entities = this._findEntities(this._hass);
    }
  }

  getCardSize() {
    return 6;
  }

  // ---------- Entity discovery (domain-based) ----------
  _findEntities(hass) {
    const allEntities = hass.entities || {};
    const found = { valves: [], sockets: [], mowers: [], connection: null, battery: null, deviceBatteries: {}, deviceConnections: {}, deviceSignals: {}, deviceIds: new Set() };

    for (const entityId in allEntities) {
      const entity = allEntities[entityId];
      if (entity.platform !== DOMAIN) continue;

      const domain = entityId.split('.')[0];
      const state = hass.states[entityId];

      if (entity.device_id) found.deviceIds.add(entity.device_id);

      if (domain === 'valve') {
        found.valves.push(entityId);
      } else if (domain === 'switch') {
        found.sockets.push(entityId);
      } else if (domain === 'lawn_mower') {
        found.mowers.push(entityId);
      } else if (domain === 'binary_sensor' && state?.attributes?.device_class === 'connectivity') {
        found.deviceConnections[entity.device_id] = entityId;
        if (!found.connection) found.connection = entityId;
      } else if (domain === 'sensor') {
        if (state?.attributes?.device_class === 'battery') {
          if (!found.battery) found.battery = entityId;
          if (entity.device_id) found.deviceBatteries[entity.device_id] = entityId;
        } else if (entity.translation_key === 'rf_link_level' && entity.device_id) {
          found.deviceSignals[entity.device_id] = entityId;
        }
      }
    }

    return found;
  }

  // ---------- Helpers ----------
  _shortEntityName(state, fallback) {
    // Prefer device name over entity friendly_name to avoid redundancy
    const entityId = state?.entity_id;
    if (entityId) {
      const entityReg = (this._hass.entities || {})[entityId];
      if (entityReg?.device_id) {
        const device = (this._hass.devices || {})[entityReg.device_id];
        if (device?.name_by_user || device?.name) {
          return device.name_by_user || device.name;
        }
      }
    }
    const name = state?.attributes?.friendly_name || fallback;
    let short = name.includes(' - ') ? name.split(' - ').pop().trim() : name;
    short = short.replace(/\b(\w+)(?:\s+\1)+\b/gi, '$1');
    return short || fallback;
  }

  _entityNameWithoutDevice(entityId, fallback) {
    const state = this._hass.states[entityId];
    const name = state?.attributes?.friendly_name || fallback;
    const entityReg = (this._hass.entities || {})[entityId];
    if (entityReg?.device_id) {
      const device = (this._hass.devices || {})[entityReg.device_id];
      const devName = device?.name_by_user || device?.name;
      if (devName && name.startsWith(devName)) {
        const suffix = name.substring(devName.length).replace(/^[\s\-–]+/, '').trim();
        if (suffix) return suffix;
      }
    }
    return name;
  }

  _getGardenaDeviceId(entityId) {
    if (this._backend) return this._backend.getGardenaDeviceId(this._hass, entityId);
    const entity = (this._hass.entities || {})[entityId];
    if (!entity?.device_id) return null;
    const device = (this._hass.devices || {})[entity.device_id];
    if (!device?.identifiers) return null;
    for (const [domain, id] of device.identifiers) {
      if (domain === DOMAIN) return id;
    }
    return null;
  }

  _formatTime(seconds) {
    if (!seconds || seconds <= 0) return '';
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    if (m > 0 && s > 0) return `${m}m ${s}s`;
    if (m > 0) return `${m} min`;
    return `${s}s`;
  }

  _getValveRemaining(entityId, state) {
    // Try real attribute first (thecem-style integration)
    if (state.attributes.valve_remaining_time > 0) {
      return {
        remaining: state.attributes.valve_remaining_time,
        total: state.attributes.valve_duration || state.attributes.valve_remaining_time,
      };
    }
    // Fall back to local timer tracking (py-smart-gardena v2)
    const timer = this._valveTimers[entityId];
    if (timer) {
      const elapsed = (this._now.getTime() - timer.startTime.getTime()) / 1000;
      const remaining = Math.max(0, timer.durationSec - elapsed);
      return { remaining, total: timer.durationSec };
    }
    // Fall back to schedule-based timer
    const scheduleTimer = this._getScheduleRemaining(entityId, state);
    if (scheduleTimer) return scheduleTimer;
    return { remaining: 0, total: 0 };
  }

  _getScheduleRemaining(entityId, state) {
    const activity = state.attributes?.activity;
    if (activity !== 'SCHEDULED_WATERING' && activity !== 'SCHEDULED_ON') return null;
    const events = state.attributes?.scheduled_events;
    if (!events || events.length === 0) return null;
    const now = this._now;
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = dayMap[now.getDay()];
    const nowMins = now.getHours() * 60 + now.getMinutes();
    for (const ev of events) {
      if (!(ev.weekdays || []).includes(today)) continue;
      const startRaw = ev.start_at || '';
      const endRaw = ev.end_at || '';
      if (startRaw.startsWith('SR') || startRaw.startsWith('SS') || endRaw.startsWith('SR') || endRaw.startsWith('SS')) continue;
      const [sh, sm] = startRaw.split(':').map(Number);
      const [eh, em] = endRaw.split(':').map(Number);
      if (isNaN(sh) || isNaN(eh)) continue;
      const startMins = sh * 60 + (sm || 0);
      const endMins = eh * 60 + (em || 0);
      const crossesMidnight = endMins <= startMins;
      const inRange = crossesMidnight
        ? (nowMins >= startMins || nowMins <= endMins)
        : (nowMins >= startMins && nowMins <= endMins);
      if (inRange) {
        const totalSec = crossesMidnight
          ? (1440 - startMins + endMins) * 60
          : (endMins - startMins) * 60;
        const elapsedSec = crossesMidnight && nowMins < startMins
          ? (1440 - startMins + nowMins) * 60 + now.getSeconds()
          : (nowMins - startMins) * 60 + now.getSeconds();
        return { remaining: Math.max(0, totalSec - elapsedSec), total: totalSec };
      }
    }
    return null;
  }

  _getConnectionEntityForDevices(entityIds) {
    const connections = this._entities?.deviceConnections || {};
    const signals = this._entities?.deviceSignals || {};
    const entities = this._hass.entities || {};
    for (const eid of entityIds) {
      const devId = entities[eid]?.device_id;
      if (devId) {
        if (connections[devId]) return connections[devId];
        if (signals[devId]) return signals[devId];
      }
    }
    return null;
  }

  _renderConnectionIcon(status, entityIds) {
    const connEntityId = entityIds ? this._getConnectionEntityForDevices(entityIds) : null;
    const click = connEntityId ? () => this._fireMoreInfo(connEntityId) : null;
    const tooltip = status === 'online' ? this._t('state_online') : this._t('state_offline');
    if (status === 'online') {
      return html`<span class="section-status online" title="${tooltip}" @click="${click}"><svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg></span>`;
    }
    return html`<span class="section-status offline" title="${tooltip}" @click="${click}"><svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg></span>`;
  }

  _getDeviceOnlineStatus(entityIds) {
    if (!entityIds || entityIds.length === 0) return null;
    const connections = this._entities?.deviceConnections || {};
    const entities = this._hass.entities || {};
    const checked = new Set();
    let online = false, offline = false;
    let hasConnSensor = false;
    for (const eid of entityIds) {
      const devId = entities[eid]?.device_id;
      if (!devId || checked.has(devId)) continue;
      checked.add(devId);
      const connId = connections[devId];
      if (connId) {
        hasConnSensor = true;
        if (this._hass.states[connId]?.state === 'on') online = true;
        else offline = true;
      }
    }
    if (hasConnSensor) {
      if (online && !offline) return 'online';
      if (offline) return 'offline';
      return null;
    }
    // Fallback: check entity availability (e.g. kayloehmann backend)
    for (const eid of entityIds) {
      const state = this._hass.states[eid];
      if (!state) continue;
      if (state.state === 'unavailable') offline = true;
      else online = true;
    }
    if (online && !offline) return 'online';
    if (offline) return 'offline';
    return null;
  }

  _getMinRfLink(entityIds) {
    let min = null;
    for (const eid of entityIds) {
      let rf = this._backend
        ? this._backend.getRfLinkLevel(this._hass, eid)
        : this._hass.states[eid]?.attributes?.rf_link_level;
      // Fallback: look up device signal sensor (e.g. kayloehmann)
      if (rf == null) {
        const devId = (this._hass.entities || {})[eid]?.device_id;
        const sigId = devId && this._entities?.deviceSignals?.[devId];
        if (sigId) {
          rf = parseInt(this._hass.states[sigId]?.state, 10);
          if (isNaN(rf)) rf = null;
        }
      }
      if (rf != null && (min === null || rf < min)) min = rf;
    }
    return min;
  }

  _renderSignalBars(level) {
    const dim = 0.2;
    return html`<svg viewBox="0 0 24 24"><path d="M3,21H6V18H3Z" fill="currentColor" opacity="${level >= 1 ? 1 : dim}"/><path d="M8,21H11V14H8Z" fill="currentColor" opacity="${level >= 25 ? 1 : dim}"/><path d="M13,21H16V9H13Z" fill="currentColor" opacity="${level >= 50 ? 1 : dim}"/><path d="M18,21H21V3H18V21Z" fill="currentColor" opacity="${level >= 75 ? 1 : dim}"/></svg>`;
  }

  _getDeviceNameForEntities(entityIds) {
    const entities = this._hass.entities || {};
    const devices = this._hass.devices || {};
    for (const eid of entityIds) {
      const devId = entities[eid]?.device_id;
      if (devId) {
        const dev = devices[devId];
        if (dev) return dev.name_by_user || dev.name || null;
      }
    }
    return null;
  }

  _fireMoreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      bubbles: true, composed: true,
      detail: { entityId },
    }));
  }

  _navigateHistory(entityId) {
    if (!entityId) return;
    history.pushState(null, '', `/history?entity_id=${entityId}`);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  _getFirstDeviceId() {
    const deviceIds = this._entities?.deviceIds;
    if (deviceIds && deviceIds.size > 0) return deviceIds.values().next().value;
    return null;
  }

  _navigateToDevice() {
    const deviceId = this._getFirstDeviceId();
    if (!deviceId) return;
    const path = `/config/devices/device/${deviceId}`;
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  // ==========================================================
  // RENDER
  // ==========================================================
  render() {
    const hass = this._hass;
    const config = this.config;

    if (!hass || !config || !this._entities) {
      if (hass && config) {
        this._entities = this._findEntities(hass);
      }
      if (!this._entities) {
        return html`<ha-card><div class="unavailable">${this._t("config_no_device")}</div></ha-card>`;
      }
    }

    // Show warning if no supported backend detected
    if (!this._backend) {
      return html`
        <ha-card>
          <div class="unavailable">
            <div class="version-warning">
              <strong>${this._t("version_required_title")}</strong><br>
              ${this._t("version_required_message")}
            </div>
          </div>
        </ha-card>
      `;
    }

    const hasValves = this._getVisibleValves().length > 0;
    const hasSockets = this._getVisibleSockets().length > 0;
    const hasMowers = this._getVisibleMowers().length > 0;

    return html`
      <ha-card @click="${() => this._closePillPopups()}">
        ${this.config.show_header !== false ? this._renderHeader() : ''}
        <div class="content">
          ${this._isPatchedIntegration === false ? html`
            <div class="patch-warning">
              <strong>${this._t("patch_warning_title")}</strong>
              ${this._t("patch_warning_message")}
            </div>
          ` : ''}
          ${this._renderScheduleMissingBanner()}
          ${hasMowers ? this._renderMowerSection() : ''}
          ${hasValves ? this._renderValvesSection() : ''}
          ${hasSockets ? this._renderSocketSection() : ''}
          ${this.config.show_history !== false && (hasValves || hasSockets) ? this._renderHistorySection() : ''}
        </div>
      </ha-card>
    `;
  }

  // ---------- Schedule missing banner ----------
  _renderScheduleMissingBanner() {
    if (this.config?.show_schedules === false) return '';
    // Check if any gardena_smart_schedule entity exists (integration installed)
    const entities = this._hass.entities || {};
    const hasScheduleIntegration = Object.values(entities).some(
      e => e.platform === 'gardena_smart_schedule'
    );
    if (hasScheduleIntegration) return '';
    // Also skip if the main integration provides schedules natively (patched fork)
    const allEntityIds = [
      ...(this._entities?.valves || []),
      ...(this._entities?.sockets || []),
      ...(this._entities?.mowers || []),
    ];
    const hasNativeSchedules = allEntityIds.some(eid => {
      const st = this._hass.states[eid];
      return st?.attributes?.scheduled_events?.length > 0;
    });
    if (hasNativeSchedules) return '';
    return html`
      <div class="schedule-missing">
        <strong>${this._t('schedule_missing_title')}</strong>
        ${this._t('schedule_missing_message')}
      </div>
    `;
  }

  // ---------- Header ----------
  _isGlobalOnline() {
    const connections = this._entities?.deviceConnections || {};
    const connIds = Object.values(connections);
    if (connIds.length > 0) {
      return connIds.some(eid => this._hass.states[eid]?.state === 'on');
    }
    // Fallback: check if any main entity is available
    const allEntityIds = [
      ...(this._entities?.valves || []),
      ...(this._entities?.sockets || []),
      ...(this._entities?.mowers || []),
    ];
    return allEntityIds.some(eid => {
      const s = this._hass.states[eid]?.state;
      return s && s !== 'unavailable';
    });
  }

  _renderHeader() {
    const name = this.config.title || this._t("default_title");
    const wsOnline = this._isGlobalOnline();

    return html`
      <div class="card-header">
        <div class="header-title">${name}</div>
        <div class="header-right">
          <span class="ws-icon ${wsOnline ? 'online' : 'offline'}" title="${wsOnline ? this._t('ws_connected') : this._t('ws_disconnected')}"
            @click="${() => this._fireMoreInfo(this._entities?.connection)}">
            ${wsOnline
              ? html`<svg viewBox="0 0 24 24"><path d="M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M3,13V18L3,20H10V18H5V13H3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M14,15H20V19H14V15Z"/></svg>`
              : html`<svg viewBox="0 0 24 24"><path d="M4,1C2.89,1 2,1.89 2,3V7C2,8.11 2.89,9 4,9H1V11H13V9H10C11.11,9 12,8.11 12,7V3C12,1.89 11.11,1 10,1H4M4,3H10V7H4V3M14,13C12.89,13 12,13.89 12,15V19C12,20.11 12.89,21 14,21H11V23H23V21H20C21.11,21 22,20.11 22,19V15C22,13.89 21.11,13 20,13H14M3.88,13.46L2.46,14.88L4.59,17L2.46,19.12L3.88,20.54L6,18.41L8.12,20.54L9.54,19.12L7.41,17L9.54,14.88L8.12,13.46L6,15.59L3.88,13.46M14,15H20V19H14V15Z"/></svg>`}
          </span>
          <span class="header-menu" @click="${() => this._navigateToDevice()}">
            <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </span>
        </div>
      </div>
    `;
  }

  // ---------- Knob Duration Control ----------
  _renderKnobSection() {
    const dur = this._selectedDuration;
    const angle = ((dur - KNOB_MIN) / (KNOB_MAX - KNOB_MIN)) * KNOB_ARC_SWEEP;
    const fraction = angle / KNOB_ARC_SWEEP;
    const fillLength = fraction * KNOB_ARC_LENGTH;
    const gapLength = KNOB_CIRCUMFERENCE - KNOB_ARC_LENGTH;

    // Handle position as percentage of 140x140 viewbox
    const handleAngle = KNOB_ARC_START + angle;
    const rad = (handleAngle * Math.PI) / 180;
    const hx = KNOB_CX + KNOB_RADIUS * Math.cos(rad);
    const hy = KNOB_CY + KNOB_RADIUS * Math.sin(rad);

    return html`
      <div class="knob-section">
        <div class="knob-container" @click="${this._onKnobClick}">
          <div class="knob-track">
            <svg viewBox="0 0 140 140">
              <circle class="knob-arc-bg" cx="70" cy="70" r="58"
                stroke-dasharray="${KNOB_ARC_LENGTH} ${gapLength}"
                stroke-dashoffset="0"
                transform="rotate(135 70 70)"/>
              <circle class="knob-arc-fill" cx="70" cy="70" r="58"
                stroke-dasharray="${fillLength} ${KNOB_CIRCUMFERENCE}"
                stroke-dashoffset="0"
                transform="rotate(135 70 70)"/>
            </svg>
          </div>
          <div class="knob-handle"
            style="left:${(hx / 140) * 100}%;top:${(hy / 140) * 100}%"
            @mousedown="${this._onKnobDragStart}"
            @touchstart="${this._onKnobDragStart}">
          </div>
          <div class="knob-center">
            <div class="knob-value">${dur}</div>
            <div class="knob-unit">${this._t('knob_unit_minutes')}</div>
          </div>
        </div>
        <div class="knob-info">
          ${KNOB_PRESETS.map(min => html`
            <button class="knob-preset ${dur === min ? 'active' : ''}"
              @click="${(e) => { e.stopPropagation(); this._selectedDuration = min; }}">
              <span class="knob-preset-dot"></span> ${min} min
            </button>
          `)}
        </div>
      </div>
    `;
  }

  // ---------- Knob drag logic ----------
  _onKnobDragStart(e) {
    e.preventDefault();
    e.stopPropagation();
    this._isDragging = true;
    this._boundDrag = this._onKnobDrag.bind(this);
    this._boundDragEnd = this._onKnobDragEnd.bind(this);
    document.addEventListener('mousemove', this._boundDrag);
    document.addEventListener('mouseup', this._boundDragEnd);
    document.addEventListener('touchmove', this._boundDrag, { passive: false });
    document.addEventListener('touchend', this._boundDragEnd);
  }

  _onKnobDrag(e) {
    if (!this._isDragging) return;
    e.preventDefault();
    const angle = this._getAngleFromEvent(e);
    const t = Math.max(0, Math.min(1, angle / KNOB_ARC_SWEEP));
    this._selectedDuration = Math.round((KNOB_MIN + t * (KNOB_MAX - KNOB_MIN)) / 5) * 5;
  }

  _onKnobDragEnd() {
    this._isDragging = false;
    document.removeEventListener('mousemove', this._boundDrag);
    document.removeEventListener('mouseup', this._boundDragEnd);
    document.removeEventListener('touchmove', this._boundDrag);
    document.removeEventListener('touchend', this._boundDragEnd);
  }

  _onKnobClick(e) {
    if (e.target.closest('.knob-handle') || e.target.closest('.knob-preset')) return;
    const angle = this._getAngleFromEvent(e);
    if (angle < 0) return;
    const t = Math.max(0, Math.min(1, angle / KNOB_ARC_SWEEP));
    this._selectedDuration = Math.round((KNOB_MIN + t * (KNOB_MAX - KNOB_MIN)) / 5) * 5;
  }

  _getAngleFromEvent(e) {
    const container = this.shadowRoot.querySelector('.knob-container');
    if (!container) return -1;
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    let angle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
    angle = (angle - KNOB_ARC_START + 360) % 360;
    if (angle > KNOB_ARC_SWEEP + 20) angle = 0;
    if (angle > KNOB_ARC_SWEEP) angle = KNOB_ARC_SWEEP;
    return angle;
  }

  // ---------- Pill Track Duration Helpers ----------
  static PILL_DURATIONS = [5, 10, 15, 20, 30, 45, 60, 90];
  static MOWER_DURATIONS = [30, 60, 120, 180, 360];

  _getEntityDuration(entityId) {
    if (this._entityDurations[entityId]) return this._entityDurations[entityId];
    // Mowers default to 60min, valves/sockets to config default
    const entity = (this._hass?.entities || {})[entityId];
    if (entity && entityId.startsWith('lawn_mower.')) return 60;
    return this._selectedDuration;
  }

  _formatDurationLabel(minutes) {
    if (minutes >= 60 && minutes % 60 === 0) return `${minutes / 60}h`;
    return `${minutes}m`;
  }

  _setEntityDuration(entityId, minutes) {
    this._entityDurations[entityId] = minutes;
    this._openPillPopup = null;
    this.requestUpdate();
  }

  _togglePillPopup(entityId, e) {
    e.stopPropagation();
    this._openPillPopup = this._openPillPopup === entityId ? null : entityId;
    this.requestUpdate();
  }

  _closePillPopups() {
    if (this._openPillPopup) {
      this._openPillPopup = null;
      this.requestUpdate();
    }
  }

  _renderPill(entityId, isActive, isDisabled, onToggle, amberToggle = false) {
    const dur = this._getEntityDuration(entityId);
    const isOpen = this._openPillPopup === entityId;
    const isCustom = !GardenaSmartSystemCard.PILL_DURATIONS.includes(dur);
    return html`
      <div class="pill">
        <div class="pill-dur-wrap">
          <div class="pill-dur ${isOpen ? 'open' : ''} ${isActive ? 'locked' : ''}"
            @click="${(e) => { e.stopPropagation(); if (!isActive) this._togglePillPopup(entityId, e); }}">
            <span>${dur}m</span>
            ${isActive ? '' : html`<svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>`}
          </div>
          <div class="pill-pop ${isOpen ? 'show' : ''}" @click="${(e) => e.stopPropagation()}">
            ${GardenaSmartSystemCard.PILL_DURATIONS.map(d => html`
              <span class="pop-chip ${d === dur ? 'sel' : ''}"
                @click="${(e) => { e.stopPropagation(); this._setEntityDuration(entityId, d); }}">${d}m</span>
            `)}
            <div class="pop-custom">
              <input class="pop-input" type="number" min="1" max="90" placeholder="z.B. 25"
                .value="${isCustom ? String(dur) : ''}"
                @click="${(e) => e.stopPropagation()}"
                @keydown="${(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); const v = Math.max(1, Math.min(90, parseInt(e.target.value))); if (v) this._setEntityDuration(entityId, v); } }}"
              />
              <span class="pop-input-unit">min</span>
              <button class="pop-ok" @click="${(e) => { e.stopPropagation(); const inp = e.target.closest('.pop-custom').querySelector('input'); const v = Math.max(1, Math.min(90, parseInt(inp.value))); if (v) this._setEntityDuration(entityId, v); }}">OK</button>
            </div>
          </div>
        </div>
        <div class="pill-tog ${isActive ? 'on' : ''} ${amberToggle && isActive ? 'amber' : ''} ${isDisabled ? 'disabled' : ''}"
          @click="${() => !isDisabled && onToggle()}"></div>
      </div>
    `;
  }

  // ---------- Valves Section ----------
  _getVisibleValves() {
    const allValves = this._entities?.valves || [];
    const configured = this.config?.valve_entities;
    if (!configured || configured.length === 0) return allValves;
    return configured.filter(id => allValves.includes(id));
  }

  _renderValvesSection() {
    const valves = this._getVisibleValves();
    if (valves.length === 0) return '';
    const status = this._getDeviceOnlineStatus(valves);
    const rfLink = this._getMinRfLink(valves);

    const deviceName = this._getDeviceNameForEntities(valves);

    return html`
      <div class="valves-section">
        <div class="section-label">
          ${deviceName ? `${deviceName} – ` : ''}${this._t('section_valves')}
          ${rfLink != null ? html`<span class="section-signal" @click="${() => this._fireMoreInfo(this._getConnectionEntityForDevices(valves))}">${this._renderSignalBars(rfLink)}</span>`
            : status ? this._renderConnectionIcon(status, valves) : ''}
        </div>
        <div class="valves-grid count-${Math.min(valves.length, this.config?.valve_columns || 3)}">
          ${valves.map((entityId, i) => this._renderValve(entityId, i, status === 'offline'))}
        </div>
      </div>
    `;
  }

  _renderValve(entityId, index, isOffline = false) {
    const state = this._hass.states[entityId];
    if (!state) return '';

    const isActive = state.state === 'open';
    const shortName = this._entityNameWithoutDevice(entityId, `Valve ${index + 1}`);
    const zoneLabel = `${this._t('valve_zone')} ${index + 1}`;

    const { remaining, total } = this._getValveRemaining(entityId, state);
    const pct = (isActive && total > 0 && remaining > 0)
      ? Math.round((remaining / total) * 100)
      : 0;

    const scheduleEvents = this._getScheduleEvents(entityId);
    const isSchedulePaused = scheduleEvents.some(ev => ev.paused === true);

    return html`
      <div class="valve ${isActive ? 'active' : ''} ${isOffline ? 'offline' : ''} ${isSchedulePaused ? 'schedule-paused' : ''} ${this._openPillPopup === entityId ? 'pill-open' : ''}" style="animation-delay:${(index * 0.05 + 0.05)}s">
        <div class="valve-header">
          <span class="valve-zone-label">${zoneLabel}</span>
          ${this._renderPill(entityId, isActive,
            (isOffline && !isActive) || this._isPatchedIntegration === false,
            () => this._toggleValve(entityId, isActive))}
        </div>
        <div class="valve-name" @click="${() => this._fireMoreInfo(entityId)}">${shortName}</div>
        <div class="valve-status">
          ${isOffline && !isActive
            ? this._t('state_offline')
            : this._getValveStatusText(state, remaining)}
        </div>
        <div class="valve-progress">
          ${isActive ? html`<div class="valve-progress-fill" style="width:${pct}%"></div>` : ''}
        </div>
        ${this._renderValveScheduleMini(entityId)}
      </div>
    `;
  }

  async _toggleValve(entityId, isActive) {
    const gardenaId = this._getGardenaDeviceId(entityId);
    const state = this._hass.states[entityId];
    const serviceId = state?.attributes?.service_id;

    if (isActive) {
      await this._backend.closeValve(this._hass, { entityId, gardenaDeviceId: gardenaId, serviceId });
      delete this._valveTimers[entityId];
    } else {
      const durationSec = this._getEntityDuration(entityId) * 60;
      await this._backend.openValve(this._hass, { entityId, gardenaDeviceId: gardenaId, serviceId, durationSec });
      this._valveTimers[entityId] = { startTime: new Date(), durationSec };
    }
    _saveTimers();
  }

  // ---------- Socket Section ----------
  _getVisibleSockets() {
    const allSockets = this._entities?.sockets || [];
    const configured = this.config?.socket_entities;
    if (configured === undefined) return allSockets;
    return configured.filter(id => allSockets.includes(id));
  }

  // ---------- Mower Section ----------
  _getVisibleMowers() {
    const allMowers = this._entities?.mowers || [];
    const configured = this.config?.mower_entities;
    if (configured === undefined) return allMowers;
    return configured.filter(id => allMowers.includes(id));
  }

  _getMowerInfo(state) {
    if (this._backend) {
      const entityId = state.entity_id;
      const deviceId = (this._hass.entities || {})[entityId]?.device_id;
      return this._backend.getMowerInfo(this._hass, state, {
        entities: this._entities,
        deviceId,
      });
    }
    return {
      haState: state.state,
      activity: state.attributes.activity,
      battery: state.attributes.battery_level,
      batteryState: state.attributes.battery_state,
      opHours: state.attributes.operating_hours,
      lastError: state.attributes.last_error_code,
      deviceState: state.attributes.state,
    };
  }

  _getBatteryIconPath(level, charging) {
    const bolt = 'M23,11H20V4L15,14H18V22';
    const shell = 'M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z';
    if (charging) {
      if (level >= 95) return `${bolt}${shell}`;
      if (level >= 85) return `${bolt}M12,8H4V6H12${shell}`;
      if (level >= 75) return `${bolt}M12,9H4V6H12${shell}`;
      if (level >= 55) return `${bolt}M12,11H4V6H12${shell}`;
      if (level >= 35) return `M13,4H11V2H5V4H3C2.4,4 2,4.4 2,5V21C2,21.6 2.4,22 3,22H13C13.6,22 14,21.6 14,21V5C14,4.4 13.6,4 13,4M12,14.5H4V6H12V14.5${bolt}`;
      return `${bolt}M12.05,17H4.05V6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z`;
    }
    if (level >= 95) return 'M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    if (level >= 85) return 'M16,8H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    if (level >= 75) return 'M16,9H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    if (level >= 65) return 'M16,10H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    if (level >= 55) return 'M16,12H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    if (level >= 45) return 'M16,13H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    if (level >= 35) return 'M16,14H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    if (level >= 25) return 'M16,15H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    if (level >= 15) return 'M16,17H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    if (level >= 5) return 'M16,18H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
    return 'M14,20H6V6H14M14.67,4H13V2H7V4H5.33C4.6,4 4,4.6 4,5.33V20.67C4,21.4 4.6,22 5.33,22H14.67C15.4,22 16,21.4 16,20.67V5.33C16,4.6 15.4,4 14.67,4M21,7H19V13H21V8M21,15H19V17H21V15Z';
  }

  _getMowerActions(haState) {
    if (this._backend) return this._backend.getMowerActions(haState);
    switch (haState) {
      case 'docked':
        return [
          { key: 'mower_start', action: 'start_override', primary: true, showDuration: true },
          { key: 'mower_resume_schedule', action: 'start_automatic' },
        ];
      case 'mowing':
        return [
          { key: 'mower_pause', action: 'pause', primary: true },
          { key: 'mower_park_next', action: 'park_until_next_task' },
          { key: 'mower_park', action: 'park_until_further_notice' },
        ];
      case 'paused':
        return [
          { key: 'mower_resume', action: 'resume', primary: true },
          { key: 'mower_park_next', action: 'park_until_next_task' },
          { key: 'mower_park', action: 'park_until_further_notice' },
        ];
      default:
        return [
          { key: 'mower_start', action: 'start_override', primary: true, showDuration: true },
          { key: 'mower_park', action: 'park_until_further_notice' },
        ];
    }
  }

  _renderMowerSection() {
    const mowers = this._getVisibleMowers();
    if (mowers.length === 0) return '';
    const status = this._getDeviceOnlineStatus(mowers);
    const rfLink = this._getMinRfLink(mowers);

    return html`
      <div class="mower-section">
        <div class="section-label">
          ${this._t('section_mower')}
          ${rfLink != null ? html`<span class="section-signal" @click="${() => this._fireMoreInfo(this._getConnectionEntityForDevices(mowers))}">${this._renderSignalBars(rfLink)}</span>`
            : status ? this._renderConnectionIcon(status, mowers) : ''}
        </div>
        ${mowers.map(entityId => this._renderMower(entityId, status === 'offline'))}
      </div>
    `;
  }

  _getMowerRemaining(entityId, info) {
    const timer = this._valveTimers[entityId];
    if (timer && info.haState === 'mowing') {
      const elapsed = (this._now.getTime() - timer.startTime.getTime()) / 1000;
      const remaining = Math.max(0, timer.durationSec - elapsed);
      return { remaining, total: timer.durationSec };
    }
    return { remaining: 0, total: 0 };
  }

  _renderMower(entityId, isOffline = false) {
    const state = this._hass.states[entityId];
    if (!state) return '';

    const info = this._getMowerInfo(state);
    const shortName = this._shortEntityName(state, this._t('section_mower'));
    const activityKey = MOWER_ACTIVITY_MAP[info.activity] || `mower_${info.haState}`;
    const activityText = this._t(activityKey);
    const actions = this._getMowerActions(info.haState);
    const isMowing = info.haState === 'mowing';
    const stateClass = isMowing ? 'active'
      : info.haState === 'error' ? 'error'
      : info.haState === 'paused' ? 'paused'
      : 'docked';

    const { remaining, total } = this._getMowerRemaining(entityId, info);
    const pct = (isMowing && total > 0 && remaining > 0)
      ? Math.round((remaining / total) * 100) : 0;

    return html`
      <div class="mower-card ${stateClass} ${isOffline ? 'offline' : ''} ${this._openPillPopup === entityId ? 'pill-open' : ''}">
        <div class="mower-header">
          <div class="mower-icon ${isMowing ? 'mowing' : ''}">
            <span class="mower-drive">
              <svg viewBox="0 0 24 24"><path d="M1 14C1 16.76 3.24 19 6 19C7.64 19 9.09 18.21 10 17H15.17C15.58 18.17 16.7 19 18 19C19.31 19 20.42 18.17 20.83 17H23V15C23 9.5 18.5 5 13 5H1V14M21 15H10.9C10.97 14.68 11 14.34 11 14C11 11.24 8.76 9 6 9C4.87 9 3.84 9.37 3 10V7H12.5C15.1 7 17.42 8.16 19 10H15V12H20.25C20.67 12.92 20.92 13.94 21 15M6 11C7.66 11 9 12.34 9 14C9 15.66 7.66 17 6 17C4.34 17 3 15.66 3 14C3 12.34 4.34 11 6 11Z"/></svg>
              ${isMowing ? html`<span class="grass-particles"></span>` : ''}
            </span>
          </div>
          <div class="mower-info">
            <div class="mower-name" @click="${() => this._fireMoreInfo(entityId)}">${shortName}</div>
            <div class="mower-activity">
              ${isMowing ? html`<span class="mow-dot"></span>` : ''}
              ${activityText}
              ${isMowing && remaining > 0 ? html`<span class="mower-remaining">${this._formatTime(remaining)}</span>` : ''}
            </div>
          </div>
          ${info.battery != null ? html`
            <div class="mower-battery-chip ${info.batteryState === 'REPLACE_NOW' ? 'replace' : (info.batteryState === 'LOW' || info.battery < 20) ? 'low' : ''} ${info.batteryState === 'CHARGING' ? 'charging' : ''}"
              @click="${() => { const devId = (this._hass.entities || {})[entityId]?.device_id; const batId = devId && this._entities?.deviceBatteries?.[devId]; this._fireMoreInfo(batId || entityId); }}" style="cursor:pointer">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="${this._getBatteryIconPath(info.battery, info.batteryState === 'CHARGING')}"/></svg>
              <span>${info.battery}%</span>
            </div>
          ` : ''}
        </div>

        ${isMowing && pct > 0 ? html`
          <div class="mower-progress">
            <div class="mower-progress-fill" style="width:${pct}%"></div>
          </div>
        ` : ''}

        ${info.haState === 'error' && info.lastError ? html`
          <div class="mower-error-banner">
            ${this._t('mower_error_prefix')}: ${MOWER_ERROR_MAP[info.lastError] ? this._t(MOWER_ERROR_MAP[info.lastError]) : info.lastError}
          </div>
        ` : ''}

        <div class="mower-actions">
          ${actions.map(a => a.showDuration && this._isPatchedIntegration !== false ? html`
            <div class="mower-btn-wrap" style="position:relative">
              <button class="mower-btn ${a.primary ? 'primary' : ''}"
                @click="${() => this._callMowerAction(entityId, a.action)}"
                ?disabled="${isOffline || this._isPatchedIntegration === false}">
                ${this._t(a.key)}
              </button>
              <div class="mower-dur-wrap">
                <div class="mower-dur-btn ${this._openPillPopup === entityId ? 'open' : ''}"
                  @click="${(e) => { e.stopPropagation(); if (!isOffline && this._isPatchedIntegration !== false) this._togglePillPopup(entityId, e); }}">
                  ${this._formatDurationLabel(this._getEntityDuration(entityId))}
                  <svg viewBox="0 0 24 24" width="10" height="10"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
                </div>
                <div class="pill-pop ${this._openPillPopup === entityId ? 'show' : ''}" @click="${(e) => e.stopPropagation()}">
                  ${GardenaSmartSystemCard.MOWER_DURATIONS.map(d => html`
                    <span class="pop-chip ${d === this._getEntityDuration(entityId) ? 'sel' : ''}"
                      @click="${(e) => { e.stopPropagation(); this._setEntityDuration(entityId, d); }}">${this._formatDurationLabel(d)}</span>
                  `)}
                  <div class="pop-custom">
                    <input class="pop-input" type="number" min="1" max="360" placeholder="z.B. 25"
                      .value="${!GardenaSmartSystemCard.MOWER_DURATIONS.includes(this._getEntityDuration(entityId)) ? String(this._getEntityDuration(entityId)) : ''}"
                      @click="${(e) => e.stopPropagation()}"
                      @keydown="${(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); const v = Math.max(1, Math.min(360, parseInt(e.target.value))); if (v) this._setEntityDuration(entityId, v); } }}"
                    />
                    <span class="pop-input-unit">min</span>
                    <button class="pop-ok" @click="${(e) => { e.stopPropagation(); const inp = e.target.closest('.pop-custom').querySelector('input'); const v = Math.max(1, Math.min(360, parseInt(inp.value))); if (v) this._setEntityDuration(entityId, v); }}">OK</button>
                  </div>
                </div>
              </div>
            </div>
          ` : html`
            <button class="mower-btn ${a.primary ? 'primary' : ''}"
              @click="${() => this._isPatchedIntegration !== false && this._callMowerAction(entityId, a.action)}"
              ?disabled="${isOffline || this._isPatchedIntegration === false}">
              ${this._t(a.key)}
            </button>
          `)}
        </div>
        ${this._renderScheduleStrip(entityId)}
      </div>
    `;
  }

  async _callMowerAction(entityId, action) {
    const durationSec = this._getEntityDuration(entityId) * 60;
    const startedTimer = await this._backend.callMowerAction(this._hass, entityId, action, durationSec);
    if (startedTimer) {
      this._valveTimers[entityId] = { startTime: new Date(), durationSec };
      _saveTimers();
    }
  }

  // ---------- Schedule Helpers ----------
  static SCHEDULE_WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  static SCHEDULE_DAY_KEYS = ['schedule_day_mo', 'schedule_day_tu', 'schedule_day_we', 'schedule_day_th', 'schedule_day_fr', 'schedule_day_sa', 'schedule_day_su'];

  // ---------- Activity Helpers ----------
  _getValveStatusText(state, remaining) {
    const activity = state.attributes?.activity;
    if (state.state === 'open') {
      const timeText = this._formatTime(remaining);
      if (activity === 'SCHEDULED_WATERING') {
        return html`<span class="water-icon"></span><span class="countdown-text">${timeText || this._t('valve_watering_scheduled')}</span>`;
      }
      if (activity === 'MANUAL_WATERING') {
        return html`<span class="water-icon"></span><span class="countdown-text">${timeText || this._t('valve_watering_manual')}</span>`;
      }
      // Fallback: no activity attribute available
      return html`<span class="water-icon"></span><span class="countdown-text">${timeText || this._t('valve_watering')}</span>`;
    }
    return this._t('valve_ready');
  }

  _getSocketStatusText(state, remaining) {
    const activity = state.attributes?.activity;
    if (state.state === 'on') {
      if (remaining > 0) {
        return html`<span class="countdown-text">${this._formatTime(remaining)} ${this._t('socket_remaining')}</span>`;
      }
      if (activity === 'SCHEDULED_ON') return this._t('socket_active_scheduled');
      if (activity === 'FOREVER_ON') return this._t('socket_active_manual');
      if (activity === 'TIME_LIMITED_ON') return this._t('socket_active');
      return this._t('socket_active');
    }
    return this._t('socket_off');
  }

  _isScheduleActive(ev, entityId) {
    const state = this._hass.states[entityId];
    if (!state) return false;
    const activity = state.attributes?.activity;
    const haState = state.state;
    const isScheduled = activity === 'SCHEDULED_WATERING' || activity === 'SCHEDULED_ON'
      || (haState === 'mowing' && (activity === 'OK_CUTTING' || activity === 'OK_CUTTING_TIMER_OVERRIDDEN'));
    if (!isScheduled) return false;
    const now = this._now;
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = dayMap[now.getDay()];
    if (!(ev.weekdays || []).includes(today)) return false;
    const startRaw = ev.start_at || '';
    const endRaw = ev.end_at || '';
    if (startRaw.startsWith('SR') || startRaw.startsWith('SS') || endRaw.startsWith('SR') || endRaw.startsWith('SS')) return true;
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const [sh, sm] = (startRaw.startsWith('MN+') ? startRaw.substring(3) : startRaw).split(':').map(Number);
    const [eh, em] = (endRaw.startsWith('MN+') ? endRaw.substring(3) : endRaw).split(':').map(Number);
    if (isNaN(sh) || isNaN(eh)) return true;
    const startMins = sh * 60 + (sm || 0);
    const endMins = eh * 60 + (em || 0);
    if (endMins <= startMins) {
      // Midnight crossing (e.g. 22:45 – 00:00)
      return nowMins >= startMins || nowMins <= endMins;
    }
    return nowMins >= startMins && nowMins <= endMins;
  }

  _scheduleIcon(isPaused = false, isActive = false) {
    const tooltip = isPaused ? this._t('schedule_tooltip_paused') : isActive ? this._t('schedule_tooltip_active') : this._t('schedule_tooltip');
    return html`<span class="schedule-icon-wrap"><svg class="schedule-icon" viewBox="0 0 24 24"><title>${tooltip}</title><path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/></svg></span>`;
  }

  _getScheduleEvents(entityId) {
    if (this.config?.show_schedules === false) return [];
    const state = this._hass.states[entityId];
    // Primary: check main entity attributes (patched integration / fork)
    const mainEvents = state?.attributes?.scheduled_events;
    if (mainEvents && mainEvents.length > 0) return mainEvents;
    // Fallback: look for gardena_smart_schedule sensor on the same device
    return this._getScheduleEventsFromScheduleIntegration(entityId);
  }

  _getScheduleEventsFromScheduleIntegration(entityId) {
    if (!this._hass) return [];
    // Get the Gardena device ID for this entity
    const gardenaDeviceId = this._getGardenaDeviceId(entityId);
    if (!gardenaDeviceId) return [];
    // For valve entities, extract the valve index
    const valveIdx = this._getValveIndex(entityId);
    // Find all gardena_smart_schedule sensors matching this Gardena device ID
    const entities = this._hass.entities || {};
    const candidates = [];
    for (const eid of Object.keys(entities)) {
      if (!eid.startsWith('sensor.')) continue;
      const e = entities[eid];
      if (e.platform !== 'gardena_smart_schedule') continue;
      const st = this._hass.states[eid];
      if (st?.attributes?.scheduled_events && (st.attributes.gardena_device_id === gardenaDeviceId || st.attributes.gardena_serial === gardenaDeviceId)) {
        candidates.push(st);
      }
    }
    if (candidates.length === 0) return [];
    // For valve entities, always match by valve_id
    if (valveIdx !== null) {
      const match = candidates.find(st => st.attributes.valve_id === valveIdx);
      return match ? match.attributes.scheduled_events : [];
    }
    // Non-valve entities (mower, socket): return first match
    if (candidates.length === 1) return candidates[0].attributes.scheduled_events;
    // Multiple candidates without valve context — return the one without valve_id
    const noValve = candidates.find(st => st.attributes.valve_id == null);
    return noValve ? noValve.attributes.scheduled_events : candidates[0].attributes.scheduled_events;
  }

  _getValveIndex(entityId) {
    if (!entityId.startsWith('valve.')) return null;
    const entities = this._hass.entities;
    if (!entities) return null;
    const sourceEntity = entities[entityId];
    if (!sourceEntity?.device_id) return null;
    // Find all valve entities on the same device, sorted by entity_id
    const deviceId = sourceEntity.device_id;
    const valveEntities = Object.keys(entities)
      .filter(eid => eid.startsWith('valve.') && entities[eid]?.device_id === deviceId)
      .sort();
    const idx = valveEntities.indexOf(entityId);
    // Return 1-based index to match schedule API valve_id
    return idx >= 0 ? idx + 1 : null;
  }

  _renderScheduleStrip(entityId) {
    const events = this._getScheduleEvents(entityId);
    if (events.length === 0) return '';

    return html`
      <div class="schedule-strip">
        ${events.map(ev => {
          const isPaused = ev.paused === true;
          const weekdays = ev.weekdays || [];
          const nowActive = this._isScheduleActive(ev, entityId);
          return html`
            <div class="schedule-row ${nowActive ? 'now-active' : ''} ${isPaused ? 'schedule-paused' : ''}">
              <span class="schedule-time">${this._scheduleIcon(isPaused, nowActive)}${this._cleanTime(ev.start_at)} – ${this._cleanTime(ev.end_at)}</span>
              <span class="schedule-days">
                ${GardenaSmartSystemCard.SCHEDULE_WEEKDAYS.map((day, i) => {
                  const isActive = weekdays.includes(day);
                  const cls = isPaused && isActive ? 'paused' : isActive ? 'active' : 'inactive';
                  return html`<span class="schedule-day ${cls}">${this._t(GardenaSmartSystemCard.SCHEDULE_DAY_KEYS[i])}</span>`;
                })}
              </span>
              ${isPaused ? html`<span class="schedule-pause-badge">${ev.paused_until ? `${this._t('schedule_paused_until')} ${this._formatPauseDate(ev.paused_until)}` : this._t('schedule_paused')}</span>` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }

  _renderValveScheduleMini(entityId) {
    const events = this._getScheduleEvents(entityId);
    if (events.length === 0) return '';

    return html`
      <div class="valve-schedule-mini">
        ${events.map(ev => {
          const isPaused = ev.paused === true;
          const weekdays = ev.weekdays || [];
          const nowActive = this._isScheduleActive(ev, entityId);
          return html`
            <div class="valve-schedule-row ${nowActive ? 'now-active' : ''} ${isPaused ? 'schedule-paused' : ''}">
              <span class="valve-schedule-time">${this._scheduleIcon(isPaused, nowActive)}${this._cleanTime(ev.start_at)}–${this._cleanTime(ev.end_at)}</span>
              <span class="schedule-days">
                ${GardenaSmartSystemCard.SCHEDULE_WEEKDAYS.map((day, i) => {
                  const isActive = weekdays.includes(day);
                  const cls = isPaused && isActive ? 'paused' : isActive ? 'active' : 'inactive';
                  return html`<span class="schedule-day ${cls}">${this._t(GardenaSmartSystemCard.SCHEDULE_DAY_KEYS[i])}</span>`;
                })}
              </span>
            </div>
          `;
        })}
      </div>
    `;
  }

  _renderSocketSchedule(entityId) {
    const events = this._getScheduleEvents(entityId);
    if (events.length === 0) return '';

    return html`
      ${events.map(ev => {
        const isPaused = ev.paused === true;
        const weekdays = ev.weekdays || [];
        const nowActive = this._isScheduleActive(ev, entityId);
        return html`
          <div class="socket-schedule-mini ${nowActive ? 'now-active' : ''} ${isPaused ? 'schedule-paused' : ''}">
            <span class="schedule-time">${this._scheduleIcon(isPaused, nowActive)}${this._cleanTime(ev.start_at)} – ${this._cleanTime(ev.end_at)}</span>
            <span class="schedule-days">
              ${GardenaSmartSystemCard.SCHEDULE_WEEKDAYS.map((day, i) => {
                const isActive = weekdays.includes(day);
                const cls = isPaused && isActive ? 'paused' : isActive ? 'active' : 'inactive';
                return html`<span class="schedule-day ${cls}">${this._t(GardenaSmartSystemCard.SCHEDULE_DAY_KEYS[i])}</span>`;
              })}
            </span>
            ${isPaused ? html`<span class="schedule-pause-badge">${ev.paused_until ? `${this._t('schedule_paused_until')} ${this._formatPauseDate(ev.paused_until)}` : this._t('schedule_paused')}</span>` : ''}
          </div>
        `;
      })}
    `;
  }

  _cleanTime(t) {
    if (!t) return '';
    if (t.startsWith('MN+')) return t.substring(3);
    if (t.startsWith('SR') || t.startsWith('SS')) {
      const symbol = t.startsWith('SR') ? '☀\uFE0E' : '☾';
      const offset = t.substring(2);
      if (offset === '+00:00' || offset === '-00:00' || offset === '') return symbol;
      const sign = offset[0];
      const [h, m] = offset.substring(1).split(':').map(Number);
      const mins = h * 60 + (m || 0);
      return `${symbol}${sign}${mins}min`;
    }
    return t;
  }

  _formatPauseDate(isoString) {
    try {
      const d = new Date(isoString);
      return `${d.getDate()}.${d.getMonth() + 1}.`;
    } catch { return ''; }
  }

  _renderSocketSection() {
    const sockets = this._getVisibleSockets();
    if (sockets.length === 0) return '';
    const status = this._getDeviceOnlineStatus(sockets);
    const rfLink = this._getMinRfLink(sockets);

    return html`
      <div class="socket-section">
        <div class="section-label">
          ${this._t('section_socket')}
          ${rfLink != null ? html`<span class="section-signal" @click="${() => this._fireMoreInfo(this._getConnectionEntityForDevices(sockets))}">${this._renderSignalBars(rfLink)}</span>`
            : status ? this._renderConnectionIcon(status, sockets) : ''}
        </div>
        ${sockets.map(entityId => this._renderSocket(entityId, status === 'offline'))}
      </div>
    `;
  }

  _renderSocket(entityId, isOffline = false) {
    const state = this._hass.states[entityId];
    if (!state) return '';

    const isActive = state.state === 'on';
    let shortName = this._shortEntityName(state, this._t('section_socket'));

    // Reuse valve timer tracking for socket countdown
    const timer = this._valveTimers[entityId];
    let remaining = 0, total = 0;
    if (isActive && timer) {
      const elapsed = (this._now.getTime() - timer.startTime.getTime()) / 1000;
      remaining = Math.max(0, timer.durationSec - elapsed);
      total = timer.durationSec;
    }
    // Fall back to schedule-based timer
    if (isActive && remaining === 0) {
      const scheduleTimer = this._getScheduleRemaining(entityId, state);
      if (scheduleTimer) { remaining = scheduleTimer.remaining; total = scheduleTimer.total; }
    }
    const pct = (isActive && total > 0 && remaining > 0)
      ? Math.round((remaining / total) * 100) : 0;

    return html`
      <div class="socket-card ${isActive ? 'active' : ''} ${isOffline && !isActive ? 'offline' : ''} ${this._openPillPopup === entityId ? 'pill-open' : ''}">
        <div class="socket-left">
          <div class="socket-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v6"/><path d="M6 2v6"/>
              <rect x="2" y="8" width="16" height="4" rx="1"/>
              <path d="M10 12v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4"/>
              <path d="M6 18v4"/><path d="M12 18v4"/>
            </svg>
          </div>
          <div class="socket-info">
            <div class="socket-name" @click="${() => this._fireMoreInfo(entityId)}">${shortName}</div>
            <div class="socket-status">
              ${isOffline && !isActive
                ? this._t('state_offline')
                : this._getSocketStatusText(state, remaining)}
            </div>
          </div>
        </div>
        <div class="socket-right">
          ${isActive && remaining > 0
            ? html`<span class="socket-timer">${this._formatTime(remaining)}</span>` : ''}
          ${this._renderPill(entityId, isActive,
            (isOffline && !isActive) || this._isPatchedIntegration === false,
            () => this._toggleSocket(entityId, isActive), true)}
        </div>
        ${isActive && pct > 0 ? html`
          <div class="socket-progress-wrap">
            <div class="socket-progress-track">
              <div class="socket-progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
        ` : ''}
        ${this._renderSocketSchedule(entityId)}
      </div>
    `;
  }

  async _toggleSocket(entityId, isOn) {
    const gardenaId = this._getGardenaDeviceId(entityId);

    if (isOn) {
      await this._backend.turnOffSocket(this._hass, { entityId, gardenaDeviceId: gardenaId });
      delete this._valveTimers[entityId];
    } else {
      const durationSec = this._getEntityDuration(entityId) * 60;
      await this._backend.turnOnSocket(this._hass, { entityId, gardenaDeviceId: gardenaId, durationSec, patched: this._isPatchedIntegration });
      this._valveTimers[entityId] = { startTime: new Date(), durationSec };
    }
    _saveTimers();
  }

  // ---------- History Section ----------
  static HISTORY_COLORS = ['#1DBF7B','#00A86B','#5DCAA5','#EF9F27','#378ADD','#D85A30','#D4537E','#8E6FBF','#3AAFA9','#FF6F61'];

  async _fetchHistory() {
    const now = Date.now();
    if (now - this._historyLastFetch < 300000) return; // cache 5 min
    this._historyLastFetch = now;

    const valves = this._getVisibleValves();
    const sockets = this._getVisibleSockets();
    const entities = [...valves, ...sockets];
    if (entities.length === 0) { this._historyData = []; return; }

    const end = new Date();
    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    const entityFilter = entities.join(',');
    const url = `history/period/${start.toISOString()}?end_time=${end.toISOString()}&filter_entity_id=${entityFilter}&minimal_response&no_attributes&significant_changes_only`;

    try {
      const result = await this._hass.callApi('GET', url);
      this._historyData = this._processHistory(result, entities, start, end);
    } catch (e) {
      console.warn('Gardena Card: Failed to fetch history', e);
      this._historyData = [];
    }
  }

  _processHistory(result, entities, start, end) {
    // Build 7-day structure
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + d);
      days.push({ date, minutes: new Array(entities.length).fill(0) });
    }

    if (!result || !Array.isArray(result)) return days;

    result.forEach((entityHistory) => {
      if (!Array.isArray(entityHistory) || entityHistory.length === 0) return;
      // Find which entity index this corresponds to
      const eid = entityHistory[0]?.entity_id;
      const idx = entities.indexOf(eid);
      if (idx === -1) return;

      for (let i = 0; i < entityHistory.length; i++) {
        const entry = entityHistory[i];
        const isActive = entry.state === 'open' || entry.state === 'on';
        if (!isActive) continue;

        const entryStart = new Date(entry.last_changed);
        const nextEntry = entityHistory[i + 1];
        const entryEnd = nextEntry ? new Date(nextEntry.last_changed) : end;

        // Distribute minutes across days
        for (const day of days) {
          const dayStart = new Date(day.date);
          dayStart.setHours(0, 0, 0, 0);
          const dayEnd = new Date(dayStart);
          dayEnd.setDate(dayEnd.getDate() + 1);

          const overlapStart = Math.max(entryStart.getTime(), dayStart.getTime());
          const overlapEnd = Math.min(entryEnd.getTime(), dayEnd.getTime());
          if (overlapStart < overlapEnd) {
            day.minutes[idx] += (overlapEnd - overlapStart) / 60000;
          }
        }
      }
    });

    // Round minutes
    days.forEach(d => d.minutes = d.minutes.map(m => Math.round(m)));
    return days;
  }

  _renderHistorySection() {
    const valves = this._getVisibleValves();
    const sockets = this._getVisibleSockets();
    const entities = [...valves, ...sockets];
    if (entities.length === 0 || !this._historyData || this._historyData.length === 0) return '';

    const days = this._historyData;

    // Check if there's any data at all
    const hasAnyData = days.some(d => d.minutes.some(m => m > 0));
    if (!hasAnyData) return '';

    const dayNames = [
      this._t('day_sun'), this._t('day_mon'), this._t('day_tue'),
      this._t('day_wed'), this._t('day_thu'), this._t('day_fri'), this._t('day_sat')
    ];

    // Entity names for legend — valves use friendly_name, others use device name
    const valveSet = new Set(valves);
    const entityNames = entities.map(eid => {
      const state = this._hass.states[eid];
      if (valveSet.has(eid)) {
        const name = state?.attributes?.friendly_name || eid.split('.').pop();
        let short = name.includes(' - ') ? name.split(' - ').pop().trim() : name;
        short = short.replace(/\b(\w+)(?:\s+\1)+\b/gi, '$1');
        return short || eid.split('.').pop();
      }
      return this._shortEntityName(state, eid.split('.').pop());
    });

    let maxTotal = 0;
    const dayTotals = days.map(d => {
      const sum = d.minutes.reduce((a, b) => a + b, 0);
      if (sum > maxTotal) maxTotal = sum;
      return sum;
    });
    maxTotal = Math.max(maxTotal, 20);
    maxTotal = Math.ceil(maxTotal / 20) * 20;

    const grandTotal = dayTotals.reduce((a, b) => a + b, 0);
    const totalHrs = Math.floor(grandTotal / 60);
    const totalMins = grandTotal % 60;
    const totalStr = (totalHrs > 0 ? totalHrs + 'h ' : '') + totalMins + 'min';

    const first = days[0].date;
    const last = days[days.length - 1].date;
    const periodStr = `${first.getDate()}.–${last.getDate()}.${last.getMonth() + 1}. ${last.getFullYear()}`;

    const chartHeight = 124;
    const gridSteps = 4;
    const today = new Date();

    // Find which entities have any data
    const usedEntities = new Set();
    days.forEach(d => d.minutes.forEach((m, i) => { if (m > 0) usedEntities.add(i); }));

    return html`
      <div class="history-section">
        <div class="section-label">${this._t('section_history')}</div>
        <div class="history-header">
          <div class="history-period">${periodStr}</div>
          <div class="history-total">${totalStr}</div>
        </div>
        <div class="chart-container">
          <div class="chart-y-axis">
            ${Array.from({ length: gridSteps + 1 }, (_, i) => html`
              <span class="chart-y-label" style="top:${(i / gridSteps) * 100}%">${Math.round(maxTotal - (maxTotal / gridSteps) * i)}</span>
            `)}
          </div>
          <div class="chart-main">
            <div class="chart-gridlines">
              ${Array.from({ length: gridSteps + 1 }, () => html`<div class="chart-gridline"></div>`)}
            </div>
            <div class="chart-bars">
              ${days.map((day, di) => {
                const isToday = day.date.getDate() === today.getDate() && day.date.getMonth() === today.getMonth();
                const dayTotal = dayTotals[di];
                const dateStr = day.date.getDate() + '.' + (day.date.getMonth() + 1) + '.';
                return html`
                  <div class="chart-bar-group ${isToday ? 'today' : ''}">
                    <div class="chart-stack">
                      ${day.minutes.map((mins, zi) => mins > 0 ? html`
                        <div class="chart-segment" style="height:${Math.max(1, (mins / maxTotal) * chartHeight)}px;background:${GardenaSmartSystemCard.HISTORY_COLORS[zi % 10]};cursor:pointer" @click="${() => this._navigateHistory(entities[zi])}"></div>
                      ` : '')}
                    </div>
                    <div class="chart-day-label">${isToday ? this._t('day_today') : dateStr}</div>
                    ${dayTotal > 0 ? html`
                      <div class="chart-tooltip">
                        <div class="tooltip-title">${dayNames[day.date.getDay()]}, ${dateStr}</div>
                        ${day.minutes.map((mins, zi) => mins > 0 ? html`
                          <div class="tooltip-line">
                            <span class="tooltip-dot" style="background:${GardenaSmartSystemCard.HISTORY_COLORS[zi % 10]}"></span>
                            <span>${entityNames[zi]}</span>
                            <span class="tooltip-mins">${mins} min</span>
                          </div>
                        ` : '')}
                        <div class="tooltip-total">
                          <span>${this._t('history_total_label')}</span>
                          <span>${dayTotal} min</span>
                        </div>
                      </div>
                    ` : ''}
                  </div>
                `;
              })}
            </div>
          </div>
        </div>
        <div class="chart-legend">
          ${entityNames.map((name, i) => usedEntities.has(i) ? html`
            <div class="legend-item" @click="${() => this._navigateHistory(entities[i])}" style="cursor:pointer">
              <span class="legend-dot" style="background:${GardenaSmartSystemCard.HISTORY_COLORS[i % 10]}"></span>
              ${name}
            </div>
          ` : '')}
        </div>
      </div>
    `;
  }

  // ---------- Styles ----------
  static get styles() {
    return unsafeCSS(styles);
  }

  // ---------- Config form ----------
  static getConfigForm() {
    return {
      schema: [
        {
          name: "title",
          label: t(null, "config_title"),
          selector: { text: {} },
        },
        {
          name: "show_header",
          label: t(null, "config_show_header"),
          selector: { boolean: {} },
          default: true,
        },
        {
          name: "show_duration",
          label: t(null, "config_show_duration"),
          selector: { boolean: {} },
          default: true,
        },
        {
          name: "show_history",
          label: t(null, "config_show_history"),
          selector: { boolean: {} },
          default: true,
        },
        {
          name: "show_schedules",
          label: t(null, "config_show_schedules"),
          selector: { boolean: {} },
          default: true,
        },
        {
          name: "default_duration",
          label: t(null, "config_default_duration"),
          selector: {
            number: { min: 5, max: 120, step: 5, unit_of_measurement: "min", mode: "slider" },
          },
        },
        {
          name: "mower_entities",
          label: t(null, "config_mower_entities"),
          selector: {
            entity: {
              filter: [{ domain: "lawn_mower", integration: "gardena_smart_system" }],
              multiple: true,
            },
          },
        },
        {
          name: "valve_columns",
          label: t(null, "config_valve_columns"),
          selector: {
            number: { min: 1, max: 3, step: 1, mode: "slider" },
          },
          default: 3,
        },
        {
          name: "valve_entities",
          label: t(null, "config_valve_entities"),
          selector: {
            entity: {
              filter: [{ domain: "valve", integration: "gardena_smart_system" }],
              multiple: true,
            },
          },
        },
        {
          name: "socket_entities",
          label: t(null, "config_socket_entities"),
          selector: {
            entity: {
              filter: [{ domain: "switch", integration: "gardena_smart_system" }],
              multiple: true,
            },
          },
        },
      ],
    };
  }

  static getStubConfig(hass) {
    const allEntities = Object.values(hass.entities).filter(
      (e) => e.platform === "gardena_smart_system"
    );
    const byDomain = (domain) => allEntities
      .filter(e => e.entity_id.startsWith(domain + '.'))
      .map(e => e.entity_id);
    return {
      default_duration: 30,
      valve_columns: 3,
      valve_entities: byDomain('valve'),
      socket_entities: byDomain('switch'),
      mower_entities: byDomain('lawn_mower'),
    };
  }
}