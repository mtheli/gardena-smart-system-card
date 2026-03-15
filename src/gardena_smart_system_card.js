/**
 * Gardena Smart System Card for Home Assistant
 * Built on the hass-gardena-smart-system integration
 * https://github.com/py-smart-gardena/hass-gardena-smart-system
 */

import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from 'bundle-text:./gardena_smart_system_card.css';
import { t } from './translations.js';

export const CARD_VERSION = "0.1.0";

// ---------- Entity discovery map: translation_key → local alias ----------
const TRANSLATION_KEY_MAP = {
  // Mower
  battery_level: "battery",

  // Sensors
  soil_humidity: "soil_humidity",
  soil_temperature: "soil_temperature",
  light_intensity: "light_intensity",
  ambient_temperature: "ambient_temperature",

  // Binary sensors
  connection: "connection",
  frost_warning: "frost_warning",

  // Valve / Irrigation
  valve_open: "valve_open",
};

// ==========================================================
// CARD CLASS
// ==========================================================
export class GardenaSmartSystemCard extends LitElement {

  // ---------- Translation helper ----------
  _t(key) { return t(this._hass, key); }

  set hass(hass) {
    this._hass = hass;

    if ((!this._entities || !this._entities.battery) && this.config?.device_id) {
      this._entities = this._findEntities(hass, this.config.device_id);
    }

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
    return 4;
  }

  // ---------- Entity discovery ----------
  _findEntities(hass, deviceId) {
    const allEntities = hass.entities || {};
    const devices = hass.devices || {};
    const found = {};

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

      const tKey = entity.translation_key;
      if (tKey && TRANSLATION_KEY_MAP[tKey]) {
        found[TRANSLATION_KEY_MAP[tKey]] = entity.entity_id;
      }

      // Fallback: detect battery by device_class
      const state = hass.states[entity.entity_id];
      if (!found.battery && state?.attributes?.device_class === "battery") {
        found.battery = entity.entity_id;
      }
    }

    return found;
  }

  // ---------- State helpers ----------
  _entity(key) {
    const id = this._entities?.[key];
    return id ? this._hass.states[id] : null;
  }

  _stateVal(key, fallback) {
    const e = this._entity(key);
    if (!e || e.state === "unavailable" || e.state === "unknown") return fallback !== undefined ? fallback : null;
    return e.state;
  }

  _numState(key, fallback = 0) {
    const v = this._stateVal(key);
    if (v === null) return fallback;
    const n = parseFloat(v);
    return isNaN(n) ? fallback : n;
  }

  // ---------- More-info event ----------
  _fireMoreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
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

  // ---------- Main render ----------
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

    return html`
      <ha-card>
        ${this._renderHeader()}
        <div class="content">
          <!-- TODO: Card content will be designed in next step -->
        </div>
      </ha-card>
    `;
  }

  // ---------- Header ----------
  _renderHeader() {
    const device = this._hass.devices?.[this.config.device_id];
    const model = device?.model || "";
    const name = this.config.title || this._t("default_title");

    return html`
      <div class="card-header">
        <div class="header-title" @click="${() => this._fireMoreInfo(this._entities?.battery)}">
          <h2>${name}</h2>
          ${model ? html`<span class="header-sub">${model}</span>` : ''}
        </div>
        <div class="header-icons">
          <svg class="more-info-btn" viewBox="0 0 24 24" fill="currentColor" stroke="none"
               @click="${() => this._navigateToDevice()}">
            <circle cx="12" cy="5" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="12" cy="19" r="1.5"/>
          </svg>
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
          name: "device_id",
          required: true,
          selector: {
            device: {
              filter: [{ integration: "gardena_smart_system" }],
              multiple: false,
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
