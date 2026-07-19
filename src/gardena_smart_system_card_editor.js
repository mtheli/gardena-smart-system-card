import { LitElement, html, css } from 'lit';
import { ALL_DOMAINS, CARD_VERSION, BUILD_DATE, entityNameWithoutDevice } from './gardena_smart_system_card.js';
import { t } from './translations.js';

const ALL_SECTIONS = ['mower', 'valves', 'socket', 'history'];

export class GardenaSmartSystemCardEditor extends LitElement {

  static get properties() {
    return {
      hass: { attribute: false },
      // Sub-card editors set this to their configFields list; unset = full editor.
      fields: { attribute: false },
      _config: { state: true },
      _expanded: { state: true },
      _sensorRows: { state: true },
    };
  }

  constructor() {
    super();
    // Panels default to expanded; this map only records explicit
    // user/toggle overrides (disabled sections have no body to expand).
    this._expanded = {};
    this._sensorRows = [];
  }

  setConfig(config) {
    this._config = config;
    // Rebuild the sensor-assignment rows only when the config no longer
    // matches what the current rows serialize to — this keeps rows without
    // a chosen sensor alive across the config echo after every change.
    const map = config.valve_sensors || {};
    if (JSON.stringify(map) !== JSON.stringify(this._rowsToMap(this._sensorRows))) {
      const rows = [];
      for (const [valve, sensors] of Object.entries(map)) {
        for (const sensor of (Array.isArray(sensors) ? sensors : [sensors])) {
          rows.push({ sensor, valve });
        }
      }
      this._sensorRows = rows;
    }
  }

  // ---------- Sensor assignment (valve_sensors) ----------
  _rowsToMap(rows) {
    const map = {};
    for (const row of rows) {
      if (!row.sensor || !row.valve) continue;
      (map[row.valve] = map[row.valve] || []).push(row.sensor);
    }
    return map;
  }

  _writeSensorRows(rows) {
    this._sensorRows = rows;
    const map = this._rowsToMap(rows);
    const newConfig = { ...this._config };
    if (Object.keys(map).length) newConfig.valve_sensors = map;
    else delete newConfig.valve_sensors;
    this._config = newConfig;
    this._fireConfig(newConfig);
  }

  _sensorRowChanged(index, patch) {
    this._writeSensorRows(this._sensorRows.map((row, i) => i === index ? { ...row, ...patch } : row));
  }

  // Valves the card displays: the configured list, or every discovered
  // Gardena valve when the list is empty.
  _valveOptions() {
    let ids = this._config.valve_entities;
    if (!ids?.length) ids = this._discoveredValves();
    return ids.map(id => ({
      value: id,
      label: entityNameWithoutDevice(this.hass, id, id),
    }));
  }

  _has(field) {
    return !this.fields || this.fields.includes(field);
  }

  // Sections currently enabled — no sections key means all of them. Sub-card
  // editors have a fixed section, so the gate only applies to the full editor.
  _activeSections() {
    if (!this._has('sections')) return ALL_SECTIONS;
    return Array.isArray(this._config.sections) ? this._config.sections : ALL_SECTIONS;
  }

  _sectionOn(section) {
    if (!this._activeSections().includes(section)) return false;
    // Legacy way of hiding the history section.
    if (section === 'history' && this._config.show_history === false) return false;
    return true;
  }

  _fireConfig(config) {
    this.dispatchEvent(new CustomEvent('config-changed', {
      bubbles: true, composed: true,
      detail: { config },
    }));
  }

  // Values at their default (or empty) are removed instead of written, so the
  // stored YAML only contains what the user actually changed.
  _valueChanged(key, value, defaultValue) {
    const newConfig = { ...this._config, [key]: value };
    if (value === defaultValue || value === '' || value === undefined
      || (Array.isArray(value) && value.length === 0)) {
      delete newConfig[key];
    }
    if (key === 'valve_entities') this._pruneValveSensors(newConfig);
    this._config = newConfig;
    this._fireConfig(newConfig);
  }

  // Drop sensor assignments that point at a valve the card no longer shows
  // (called when the valve list changes, so removing a zone takes its
  // assignments along instead of leaving rows with a raw entity_id).
  _pruneValveSensors(config) {
    if (!config.valve_sensors) return;
    const allowed = config.valve_entities?.length
      ? config.valve_entities
      : this._discoveredValves();
    const map = {};
    for (const [valve, sensors] of Object.entries(config.valve_sensors)) {
      if (allowed.includes(valve)) map[valve] = sensors;
    }
    if (Object.keys(map).length) config.valve_sensors = map;
    else delete config.valve_sensors;
    this._sensorRows = this._sensorRows.filter(row => !row.valve || allowed.includes(row.valve));
  }

  _discoveredValves() {
    return Object.values(this.hass.entities || {})
      .filter(e => ALL_DOMAINS.includes(e.platform) && e.entity_id.startsWith('valve.'))
      .map(e => e.entity_id);
  }

  // show_* keys all default to true: on = no key, off = false.
  _toggleChanged(key, checked) {
    this._valueChanged(key, checked ? undefined : false);
  }

  // Each section group header carries its own on/off switch. All four on
  // means "no restriction" and drops the key again.
  _toggleSection(section, enabled) {
    const set = new Set(this._activeSections());
    if (enabled) set.add(section); else set.delete(section);
    const list = ALL_SECTIONS.filter(s => set.has(s));
    const newConfig = { ...this._config };
    if (list.length === ALL_SECTIONS.length) delete newConfig.sections;
    else newConfig.sections = list;
    if (section === 'history' && enabled) delete newConfig.show_history;
    this._config = newConfig;
    this._fireConfig(newConfig);
    // Opening a section is almost always followed by configuring it.
    this._expanded = { ...this._expanded, [section]: enabled };
  }

  _setExpanded(key, ev) {
    this._expanded = { ...this._expanded, [key]: ev.detail.expanded };
  }

  // Section on/off as a header toggle; null when this editor has no
  // sections picker (sub-cards) so the panel renders without a switch.
  _sectionToggle(section) {
    if (!this._has('sections')) return null;
    return {
      checked: this._sectionOn(section),
      onChange: (checked) => this._toggleSection(section, checked),
    };
  }

  // One outlined expansion panel per group (the pattern HA's own editors
  // use). An optional toggle sits in the header; while off, the panel is a
  // plain non-collapsible row.
  _renderPanel(key, labelKey, icon, content, toggle = null) {
    if (!toggle && !content) return '';
    const on = !toggle || toggle.checked;
    const hasBody = !!content && on;
    return html`
      <ha-expansion-panel outlined
        .leftChevron=${true}
        .expanded=${hasBody && (this._expanded[key] ?? true)}
        .noCollapse=${!hasBody}
        @expanded-changed=${(ev) => this._setExpanded(key, ev)}>
        <div slot="header" class="panel-header">
          <ha-icon .icon=${icon}></ha-icon>
          <span>${t(this.hass, labelKey)}</span>
          ${toggle ? html`
            <ha-switch
              .checked=${toggle.checked}
              @click=${(ev) => ev.stopPropagation()}
              @change=${(ev) => toggle.onChange(ev.target.checked)}
            ></ha-switch>
          ` : ''}
        </div>
        ${hasBody ? html`<div class="panel-content">${content}</div>` : ''}
      </ha-expansion-panel>
    `;
  }

  _entitySelector(domain) {
    return {
      entity: {
        filter: ALL_DOMAINS.map(integration => ({ domain, integration })),
        multiple: true,
        reorder: true,
      },
    };
  }

  _renderSwitch(key, labelKey) {
    return html`
      <div class="field row">
        <ha-switch
          .checked=${this._config[key] !== false}
          @change=${(ev) => this._toggleChanged(key, ev.target.checked)}
        ></ha-switch>
        <span>${t(this.hass, labelKey)}</span>
      </div>
    `;
  }

  // Variante A rows: [sensor picker] → [zone dropdown] ✕
  _renderSensorAssignment() {
    const valveOptions = this._valveOptions();
    const sensorSelector = {
      entity: {
        filter: [{
          domain: 'sensor',
          device_class: ['humidity', 'moisture', 'temperature', 'illuminance'],
        }],
      },
    };
    return html`
      <div class="sub-label">${t(this.hass, 'config_valve_sensors')}</div>
      ${this._sensorRows.map((row, i) => html`
        <div class="map-row">
          <div class="map-sensor">
            <ha-selector
              .hass=${this.hass}
              .selector=${sensorSelector}
              .value=${row.sensor || ''}
              @value-changed=${(ev) => this._sensorRowChanged(i, { sensor: ev.detail.value })}
            ></ha-selector>
          </div>
          <span class="map-arrow">→</span>
          <div class="map-zone">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ select: { mode: 'dropdown', options: valveOptions } }}
              .value=${row.valve || ''}
              @value-changed=${(ev) => this._sensorRowChanged(i, { valve: ev.detail.value })}
            ></ha-selector>
          </div>
          <button class="row-remove"
                  @click=${() => this._writeSensorRows(this._sensorRows.filter((_, j) => j !== i))}>✕</button>
        </div>
      `)}
      <button class="add-btn"
              @click=${() => { this._sensorRows = [...this._sensorRows, { sensor: '', valve: valveOptions[0]?.value || '' }]; }}>
        ＋ ${t(this.hass, 'config_valve_sensors_add')}
      </button>
    `;
  }

  _renderEntityList(key, labelKey, domain) {
    return html`
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .selector=${this._entitySelector(domain)}
          .label=${t(this.hass, labelKey)}
          .value=${this._config[key] || []}
          @value-changed=${(ev) => this._valueChanged(key, ev.detail.value)}
        ></ha-selector>
      </div>
    `;
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const generalContent = html`
      ${this._has('title') ? html`
        <div class="field">
          <ha-input
            .label=${t(this.hass, 'config_title')}
            .value=${this._config.title || ''}
            @input=${(ev) => this._valueChanged('title', ev.target.value)}
          ></ha-input>
        </div>
      ` : ''}
      ${this._has('show_header') ? this._renderSwitch('show_header', 'config_show_header') : ''}
      ${this._has('default_duration') && (this._sectionOn('valves') || this._sectionOn('socket')) ? html`
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ number: { min: 5, max: 120, step: 5, unit_of_measurement: 'min', mode: 'slider' } }}
            .label=${t(this.hass, 'config_default_duration')}
            .value=${this._config.default_duration ?? 30}
            @value-changed=${(ev) => this._valueChanged('default_duration', ev.detail.value, 30)}
          ></ha-selector>
        </div>
      ` : ''}
    `;

    const schedulesContent = this._has('show_scheduler_schedules') ? html`
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .selector=${{ select: { mode: 'dropdown', options: [
            { value: 'mixed', label: t(this.hass, 'scheduler_mode_mixed') },
            { value: 'separate', label: t(this.hass, 'scheduler_mode_separate') },
          ] } }}
          .label=${t(this.hass, 'config_show_scheduler_schedules')}
          .value=${this._config.show_scheduler_schedules || 'mixed'}
          @value-changed=${(ev) => this._valueChanged('show_scheduler_schedules', ev.detail.value, 'mixed')}
        ></ha-selector>
      </div>
    ` : null;

    const schedulesToggle = this._has('show_schedules') ? {
      checked: this._config.show_schedules !== false,
      onChange: (checked) => this._toggleChanged('show_schedules', checked),
    } : null;

    const valvesContent = this._has('valve_columns') || this._has('valve_entities') ? html`
      ${this._has('valve_columns') ? html`
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ number: { min: 1, max: 3, step: 1, mode: 'slider' } }}
            .label=${t(this.hass, 'config_valve_columns')}
            .value=${this._config.valve_columns ?? 3}
            @value-changed=${(ev) => this._valueChanged('valve_columns', ev.detail.value, 3)}
          ></ha-selector>
        </div>
      ` : ''}
      ${this._has('valve_entities') ? this._renderEntityList('valve_entities', 'config_valve_entities', 'valve') : ''}
      ${this._has('valve_sensors') ? this._renderSensorAssignment() : ''}
    ` : null;

    return html`
      <div class="editor">
        ${this._renderPanel('general', 'config_group_general', 'mdi:tune', generalContent)}

        ${this._renderPanel('schedules', 'config_group_schedules', 'mdi:calendar-clock', schedulesContent, schedulesToggle)}

        ${this._renderPanel('mower', 'section_mower', 'mdi:robot-mower',
          this._has('mower_entities')
            ? this._renderEntityList('mower_entities', 'config_mower_entities', 'lawn_mower')
            : null, this._sectionToggle('mower'))}

        ${this._renderPanel('valves', 'section_valves', 'mdi:sprinkler-variant', valvesContent, this._sectionToggle('valves'))}

        ${this._renderPanel('socket', 'section_socket', 'mdi:power-plug',
          this._has('socket_entities')
            ? this._renderEntityList('socket_entities', 'config_socket_entities', 'switch')
            : null, this._sectionToggle('socket'))}

        ${this._renderPanel('history', 'section_history', 'mdi:chart-bar', null, this._sectionToggle('history'))}

        <div class="build-info">
          Gardena Smart System Card v${CARD_VERSION} · Build ${BUILD_DATE}
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor {
        padding: 4px 0;
      }
      .field {
        margin-bottom: 16px;
      }
      .field.row {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      ha-input {
        display: block;
        width: 100%;
      }
      ha-expansion-panel {
        display: block;
        margin-bottom: 12px;
      }
      .panel-header {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        min-width: 0;
        font-weight: 600;
        padding: 4px 0;
      }
      .panel-header ha-icon {
        color: var(--secondary-text-color, #888);
        flex-shrink: 0;
      }
      .panel-header ha-switch {
        margin-left: auto;
        padding-right: 4px;
      }
      .panel-content {
        padding: 12px 12px 4px;
      }
      .sub-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--secondary-text-color, #888);
        margin: 16px 0 8px;
      }
      .map-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }
      .map-sensor {
        flex: 1;
        min-width: 0;
      }
      .map-zone {
        flex: 0 1 150px;
        min-width: 110px;
      }
      .map-arrow {
        color: var(--secondary-text-color, #888);
        flex-shrink: 0;
      }
      .row-remove {
        background: none;
        border: none;
        color: var(--secondary-text-color, #888);
        font-size: 14px;
        cursor: pointer;
        padding: 4px;
        flex-shrink: 0;
      }
      .row-remove:hover {
        color: var(--error-color, #db4437);
      }
      .add-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border: none;
        cursor: pointer;
        background: rgba(3, 169, 244, 0.12);
        color: var(--primary-color, #03a9f4);
        font: inherit;
        font-weight: 500;
        border-radius: 14px;
        padding: 6px 14px;
        margin: 2px 0 8px;
      }
      .add-btn:hover {
        background: rgba(3, 169, 244, 0.22);
      }
      .panel-content .field:last-child {
        margin-bottom: 8px;
      }
      .build-info {
        margin-top: 16px;
        text-align: center;
        font-size: 11px;
        color: var(--secondary-text-color, #727272);
        opacity: 0.8;
      }
    `;
  }
}
