/**
 * Gardena Smart System Card for Home Assistant
 * Requires py-smart-gardena integration v2.0+
 * https://github.com/py-smart-gardena/hass-gardena-smart-system
 */

import { LitElement, html, unsafeCSS } from 'lit';
import styles from 'bundle-text:./gardena_smart_system_card.css';
import { t } from './translations.js';

export const CARD_VERSION = "0.2.0";

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
      _hasV2Services: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this._selectedDuration = 30;
    this._now = new Date();
    this._clockInterval = null;
    this._isDragging = false;
    this._hasV2Services = false;
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

    // Check for v2 custom services
    if (!this._hasV2Services && hass.services?.[DOMAIN]) {
      if (hass.services[DOMAIN].valve_open || hass.services[DOMAIN].start_override) {
        this._hasV2Services = true;
      }
    }

    // Detect patched integration (service_id attribute on valves)
    if (this._isPatchedIntegration === undefined && this._entities?.valves?.length) {
      const firstValve = hass.states[this._entities.valves[0]];
      this._isPatchedIntegration = firstValve?.attributes?.service_id != null;
    }

    if (!this._entities || !this._entities.valves) {
      this._entities = this._findEntities(hass);
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
    const found = { valves: [], sockets: [], mowers: [], connection: null, battery: null, deviceBatteries: {}, deviceConnections: {}, deviceIds: new Set() };

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
      } else if (domain === 'binary_sensor') {
        found.deviceConnections[entity.device_id] = entityId;
        if (!found.connection) found.connection = entityId;
      } else if (domain === 'sensor' && state?.attributes?.device_class === 'battery') {
        if (!found.battery) found.battery = entityId;
        if (entity.device_id) found.deviceBatteries[entity.device_id] = entityId;
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

  _getGardenaDeviceId(entityId) {
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
    return { remaining: 0, total: 0 };
  }

  _getConnectionEntityForDevices(entityIds) {
    const connections = this._entities?.deviceConnections || {};
    const entities = this._hass.entities || {};
    for (const eid of entityIds) {
      const devId = entities[eid]?.device_id;
      if (devId && connections[devId]) return connections[devId];
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
    for (const eid of entityIds) {
      const devId = entities[eid]?.device_id;
      if (!devId || checked.has(devId)) continue;
      checked.add(devId);
      const connId = connections[devId];
      if (connId) {
        if (this._hass.states[connId]?.state === 'on') online = true;
        else offline = true;
      }
    }
    if (online && !offline) return 'online';
    if (offline) return 'offline';
    return null;
  }

  _getMinRfLink(entityIds) {
    let min = null;
    for (const eid of entityIds) {
      const rf = this._hass.states[eid]?.attributes?.rf_link_level;
      if (rf != null && (min === null || rf < min)) min = rf;
    }
    return min;
  }

  _renderSignalBars(level) {
    const dim = 0.2;
    return html`<svg viewBox="0 0 24 24"><path d="M3,21H6V18H3Z" fill="currentColor" opacity="${level >= 1 ? 1 : dim}"/><path d="M8,21H11V14H8Z" fill="currentColor" opacity="${level >= 25 ? 1 : dim}"/><path d="M13,21H16V9H13Z" fill="currentColor" opacity="${level >= 50 ? 1 : dim}"/><path d="M18,21H21V3H18V21Z" fill="currentColor" opacity="${level >= 75 ? 1 : dim}"/></svg>`;
  }

  _fireMoreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      bubbles: true, composed: true,
      detail: { entityId },
    }));
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

    // Show warning if v2 services not detected
    if (hass.services && !hass.services[DOMAIN]?.valve_open && !hass.services[DOMAIN]?.start_override) {
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
      <ha-card>
        ${this.config.show_header !== false ? this._renderHeader() : ''}
        <div class="content">
          ${this._isPatchedIntegration === false ? html`
            <div class="patch-warning">
              <strong>${this._t("patch_warning_title")}</strong>
              ${this._t("patch_warning_message")}
            </div>
          ` : this.config.show_duration !== false && (hasValves || hasSockets || hasMowers) ? this._renderKnobSection() : ''}
          ${hasMowers ? this._renderMowerSection() : ''}
          ${hasValves ? this._renderValvesSection() : ''}
          ${hasSockets ? this._renderSocketSection() : ''}
        </div>
      </ha-card>
    `;
  }

  // ---------- Header ----------
  _isGlobalOnline() {
    const connections = this._entities?.deviceConnections || {};
    return Object.values(connections).some(eid => this._hass.states[eid]?.state === 'on');
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

    return html`
      <div class="valves-section">
        <div class="section-label">
          ${this._t('section_valves')}
          ${rfLink != null ? html`<span class="section-signal" @click="${() => this._fireMoreInfo(this._getConnectionEntityForDevices(valves))}">${this._renderSignalBars(rfLink)}</span>` : ''}
        </div>
        <div class="valves-grid count-${Math.min(valves.length, 3)}">
          ${valves.map((entityId, i) => this._renderValve(entityId, i, status === 'offline'))}
        </div>
      </div>
    `;
  }

  _renderValve(entityId, index, isOffline = false) {
    const state = this._hass.states[entityId];
    if (!state) return '';

    const isActive = state.state === 'open';
    const shortName = state.attributes?.friendly_name || `Valve ${index + 1}`;
    const zoneLabel = `${this._t('valve_zone')} ${index + 1}`;

    const { remaining, total } = this._getValveRemaining(entityId, state);
    const pct = (isActive && total > 0 && remaining > 0)
      ? Math.round((remaining / total) * 100)
      : 0;

    return html`
      <div class="valve ${isActive ? 'active' : ''} ${isOffline ? 'offline' : ''}" style="animation-delay:${(index * 0.05 + 0.05)}s">
        <div class="valve-header">
          <span class="valve-zone-label">${zoneLabel}</span>
          <button class="toggle ${isActive ? 'on' : ''} ${isOffline && !isActive ? 'disabled' : ''}"
            @click="${() => !isOffline && this._toggleValve(entityId, isActive)}"
            ?disabled="${isOffline && !isActive}"></button>
        </div>
        <div class="valve-name" @click="${() => this._fireMoreInfo(entityId)}">${shortName}</div>
        <div class="valve-status">
          ${isOffline && !isActive
            ? this._t('state_offline')
            : isActive
              ? html`<span class="water-icon"></span><span class="countdown-text">${this._formatTime(remaining) || this._t('valve_watering')}</span>`
              : this._t('valve_ready')}
        </div>
        <div class="valve-progress">
          ${isActive ? html`<div class="valve-progress-fill" style="width:${pct}%"></div>` : ''}
        </div>
      </div>
    `;
  }

  async _toggleValve(entityId, isActive) {
    const gardenaId = this._getGardenaDeviceId(entityId);
    if (!gardenaId) return;
    const state = this._hass.states[entityId];
    const patched = this._isPatchedIntegration;

    if (isActive) {
      const closeData = { device_id: gardenaId };
      if (patched) closeData.service_id = state?.attributes?.service_id;
      await this._hass.callService(DOMAIN, 'valve_close', closeData);
      delete this._valveTimers[entityId];
    } else {
      const durationSec = this._selectedDuration * 60;
      const openData = { device_id: gardenaId };
      if (patched) {
        openData.service_id = state?.attributes?.service_id;
        openData.duration = durationSec;
      }
      await this._hass.callService(DOMAIN, 'valve_open', openData);
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
    switch (haState) {
      case 'docked':
        return [
          { key: 'mower_start', action: 'start_override', primary: true },
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
          { key: 'mower_start', action: 'start_override', primary: true },
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
          ${rfLink != null ? html`<span class="section-signal" @click="${() => this._fireMoreInfo(this._getConnectionEntityForDevices(mowers))}">${this._renderSignalBars(rfLink)}</span>` : ''}
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
      <div class="mower-card ${stateClass} ${isOffline ? 'offline' : ''}">
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
            <div class="mower-battery-chip ${info.battery < 20 ? 'low' : ''} ${info.batteryState === 'CHARGING' ? 'charging' : ''}"
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
            ${this._t('mower_error_prefix')}: ${info.lastError}
          </div>
        ` : ''}

        <div class="mower-actions">
          ${actions.map(a => html`
            <button class="mower-btn ${a.primary ? 'primary' : ''}"
              @click="${() => this._callMowerAction(entityId, a.action)}"
              ?disabled="${isOffline}">
              ${this._t(a.key)}${a.action === 'start_override' ? ` (${this._selectedDuration}m)` : ''}
            </button>
          `)}
        </div>
      </div>
    `;
  }

  async _callMowerAction(entityId, action) {
    switch (action) {
      case 'start_override': {
        const durationSec = this._selectedDuration * 60;
        await this._hass.callService(DOMAIN, 'start_override', {
          entity_id: entityId,
          duration: durationSec,
        });
        this._valveTimers[entityId] = { startTime: new Date(), durationSec };
        _saveTimers();
        break;
      }
      case 'start_automatic':
        await this._hass.callService(DOMAIN, 'start_automatic', { entity_id: entityId });
        break;
      case 'park_until_next_task':
        await this._hass.callService(DOMAIN, 'park_until_next_task', { entity_id: entityId });
        break;
      case 'park_until_further_notice':
        await this._hass.callService(DOMAIN, 'park_until_further_notice', { entity_id: entityId });
        break;
      case 'pause':
        await this._hass.callService('lawn_mower', 'pause', { entity_id: entityId });
        break;
      case 'resume':
        await this._hass.callService('lawn_mower', 'start_mowing', { entity_id: entityId });
        break;
    }
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
          ${rfLink != null ? html`<span class="section-signal" @click="${() => this._fireMoreInfo(this._getConnectionEntityForDevices(sockets))}">${this._renderSignalBars(rfLink)}</span>` : ''}
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
    const pct = (isActive && total > 0 && remaining > 0)
      ? Math.round((remaining / total) * 100) : 0;

    return html`
      <div class="socket-card ${isActive ? 'active' : ''} ${isOffline && !isActive ? 'offline' : ''}">
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
                : isActive && remaining > 0
                  ? html`<span class="countdown-text">${this._formatTime(remaining)} ${this._t('socket_remaining')}</span>`
                  : isActive ? this._t('socket_active') : this._t('socket_off')}
            </div>
          </div>
        </div>
        <div class="socket-right">
          ${isActive && remaining > 0
            ? html`<span class="socket-timer">${this._formatTime(remaining)}</span>` : ''}
          <button class="toggle ${isActive ? 'on socket-toggle-on' : ''} ${isOffline && !isActive ? 'disabled' : ''}"
            @click="${() => !isOffline && this._toggleSocket(entityId, isActive)}"
            ?disabled="${isOffline && !isActive}"></button>
        </div>
        ${isActive && pct > 0 ? html`
          <div class="socket-progress-wrap">
            <div class="socket-progress-track">
              <div class="socket-progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  async _toggleSocket(entityId, isOn) {
    const gardenaId = this._getGardenaDeviceId(entityId);
    if (!gardenaId) return;
    const patched = this._isPatchedIntegration;

    if (isOn) {
      await this._hass.callService(DOMAIN, 'power_socket_off', { device_id: gardenaId });
      delete this._valveTimers[entityId];
    } else {
      const durationSec = this._selectedDuration * 60;
      const onData = { device_id: gardenaId };
      if (patched) onData.duration = durationSec;
      await this._hass.callService(DOMAIN, 'power_socket_on', onData);
      this._valveTimers[entityId] = { startTime: new Date(), durationSec };
    }
    _saveTimers();
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
      valve_entities: byDomain('valve'),
      socket_entities: byDomain('switch'),
      mower_entities: byDomain('lawn_mower'),
    };
  }
}
