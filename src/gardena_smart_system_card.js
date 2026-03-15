/**
 * Gardena Smart System Card for Home Assistant
 * Requires py-smart-gardena integration v2.0+
 * https://github.com/py-smart-gardena/hass-gardena-smart-system
 */

import { LitElement, html, css, unsafeCSS } from 'lit';
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
    if (!this._hasV2Services && hass.services?.[DOMAIN]?.valve_open) {
      this._hasV2Services = true;
    }

    if ((!this._entities || !this._entities.valves) && this.config?.device_id) {
      this._entities = this._findEntities(hass, this.config.device_id);
    }

    // Clean up local timers for valves/sockets that closed externally
    let timerChanged = false;
    for (const entityId of Object.keys(this._valveTimers)) {
      const state = hass.states[entityId];
      if (!state || (state.state !== 'open' && state.state !== 'on')) {
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
    if (!config.device_id) {
      throw new Error(t(null, "config_select_device"));
    }
    this.config = config;
    this._entities = null;
    if (this._hass) {
      this._entities = this._findEntities(this._hass, config.device_id);
    }
  }

  getCardSize() {
    return 6;
  }

  // ---------- Entity discovery (domain-based) ----------
  _findEntities(hass, deviceId) {
    const allEntities = hass.entities || {};
    const devices = hass.devices || {};
    const found = { valves: [], sockets: [], connection: null, battery: null, deviceConnections: {} };

    // Collect all device IDs sharing the same config_entry
    const deviceIds = new Set([deviceId]);
    const mainDevice = devices[deviceId];
    if (mainDevice) {
      const configEntries = mainDevice.config_entries || [];
      for (const [id, dev] of Object.entries(devices)) {
        if (id === deviceId) continue;
        const devEntries = dev.config_entries || [];
        if (configEntries.some((ce) => devEntries.includes(ce))) {
          deviceIds.add(id);
        }
      }
    }

    for (const entityId in allEntities) {
      const entity = allEntities[entityId];
      if (!deviceIds.has(entity.device_id)) continue;

      const domain = entityId.split('.')[0];
      const state = hass.states[entityId];

      if (domain === 'valve') {
        found.valves.push(entityId);
      } else if (domain === 'switch') {
        found.sockets.push(entityId);
      } else if (domain === 'binary_sensor') {
        found.deviceConnections[entity.device_id] = entityId;
        if (!found.connection) found.connection = entityId;
      } else if (domain === 'sensor' && !found.battery && state?.attributes?.device_class === 'battery') {
        found.battery = entityId;
      }
    }

    return found;
  }

  // ---------- Helpers ----------
  _shortEntityName(state, fallback) {
    const name = state?.attributes?.friendly_name || fallback;
    // Strip device-name prefix (e.g. "Gardena Device - Power Socket" → "Power Socket")
    let short = name.includes(' - ') ? name.split(' - ').pop().trim() : name;
    // Deduplicate consecutive repeated words (e.g. "Power Power Power Socket" → "Power Socket")
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

  _fireMoreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      bubbles: true, composed: true,
      detail: { entityId },
    }));
  }

  _navigateToDevice() {
    const deviceId = this.config?.device_id;
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
      if (hass && config?.device_id) {
        this._entities = this._findEntities(hass, config.device_id);
      }
      if (!this._entities) {
        return html`<ha-card><div class="unavailable">${this._t("config_no_device")}</div></ha-card>`;
      }
    }

    // Show warning if v2 services not detected
    if (hass.services && !hass.services[DOMAIN]?.valve_open) {
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

    return html`
      <ha-card>
        ${this._renderHeader()}
        <div class="content">
          ${hasValves || hasSockets ? this._renderKnobSection() : ''}
          ${hasValves ? this._renderValvesSection() : ''}
          ${hasSockets ? this._renderSocketSection() : ''}
        </div>
        ${this._renderFooter()}
      </ha-card>
    `;
  }

  // ---------- Header ----------
  _isGlobalOnline() {
    const connections = this._entities?.deviceConnections || {};
    return Object.values(connections).some(eid => this._hass.states[eid]?.state === 'on');
  }

  _renderHeader() {
    const device = this._hass.devices?.[this.config.device_id];
    const model = device?.model || "Gardena Smart System";
    const name = this.config.title || device?.name || this._t("default_title");
    const wsOnline = this._isGlobalOnline();

    return html`
      <div class="card-header">
        <div class="header-left">
          <div class="device-icon" @click="${() => this._navigateToDevice()}">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </div>
          <div>
            <div class="device-name" @click="${() => this._fireMoreInfo(this._entities?.connection)}">${name}</div>
            <div class="device-sub">${model}</div>
          </div>
        </div>
        <div class="header-badges">
          <div class="badge">
            <span class="dot ${wsOnline ? 'dot-online' : 'dot-offline'}"></span>
            WebSocket
          </div>
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
    // If valve_entities is configured, filter to only those; otherwise show all
    if (configured && configured.length > 0) {
      return configured.filter(id => allValves.includes(id));
    }
    return allValves;
  }

  _renderValvesSection() {
    const valves = this._getVisibleValves();
    if (valves.length === 0) return '';
    const status = this._getDeviceOnlineStatus(valves);

    return html`
      <div class="valves-section">
        <div class="section-label">
          ${this._t('section_valves')}
          ${status !== null ? this._renderConnectionIcon(status, valves) : ''}
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
    const shortName = this._shortEntityName(state, `Valve ${index + 1}`);
    const zoneLabel = `Zone ${index + 1}`;

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

    if (isActive) {
      await this._hass.callService(DOMAIN, 'valve_close', { device_id: gardenaId });
      delete this._valveTimers[entityId];
    } else {
      const durationSec = this._selectedDuration * 60;
      await this._hass.callService(DOMAIN, 'valve_open', { device_id: gardenaId, duration: durationSec });
      this._valveTimers[entityId] = { startTime: new Date(), durationSec };
    }
    _saveTimers();
  }

  // ---------- Socket Section ----------
  _getVisibleSockets() {
    const allSockets = this._entities?.sockets || [];
    const configured = this.config?.socket_entities;
    if (configured && configured.length > 0) {
      return configured.filter(id => allSockets.includes(id));
    }
    return allSockets;
  }

  _renderSocketSection() {
    const sockets = this._getVisibleSockets();
    if (sockets.length === 0) return '';
    const status = this._getDeviceOnlineStatus(sockets);

    return html`
      <div class="socket-section">
        <div class="section-label">
          ${this._t('section_socket')}
          ${status !== null ? this._renderConnectionIcon(status, sockets) : ''}
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
                  ? html`<span class="countdown-text">${this._formatTime(remaining)} verbleibend</span>`
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
      </div>
      ${isActive && pct > 0 ? html`
        <div class="socket-progress-wrap">
          <div class="socket-progress-track">
            <div class="socket-progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
      ` : ''}
    `;
  }

  async _toggleSocket(entityId, isOn) {
    const gardenaId = this._getGardenaDeviceId(entityId);
    if (!gardenaId) return;

    if (isOn) {
      await this._hass.callService(DOMAIN, 'power_socket_off', { device_id: gardenaId });
      delete this._valveTimers[entityId];
    } else {
      const durationSec = this._selectedDuration * 60;
      await this._hass.callService(DOMAIN, 'power_socket_on', { device_id: gardenaId, duration: durationSec });
      this._valveTimers[entityId] = { startTime: new Date(), durationSec };
    }
    _saveTimers();
  }

  // ---------- Footer ----------
  _renderFooter() {
    const isOnline = this._isGlobalOnline();

    const timeStr = this._now.toLocaleTimeString(
      this._hass?.language || 'en',
      { hour: '2-digit', minute: '2-digit', second: '2-digit' }
    );

    return html`
      <div class="card-footer">
        <div class="footer-left">
          <span class="live-dot ${isOnline ? '' : 'offline'}"></span>
          <span>${isOnline ? this._t('footer_connected') : this._t('footer_disconnected')}</span>
        </div>
        <span class="footer-time">${timeStr}</span>
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
          name: "device_id",
          required: true,
          selector: {
            device: {
              filter: [{ integration: "gardena_smart_system" }],
              multiple: false,
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
    const entry = Object.values(hass.entities).find(
      (e) => e.platform === "gardena_smart_system"
    );
    return { device_id: entry ? entry.device_id : "" };
  }
}
