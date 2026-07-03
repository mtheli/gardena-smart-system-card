/**
 * Backend adapter for the original hass-gardena-smart-system integration
 * (py-smart-gardena / thecem / mtheli fork)
 *
 * Uses custom domain-level services (gardena_smart_system.*) with device_id parameter.
 * Duration parameters are in seconds.
 */

import { alphabeticValveIndex } from './shared.js';

const DOMAIN = 'gardena_smart_system';

export class ThecemBackend {
  get id() { return 'thecem'; }

  get domain() { return DOMAIN; }

  // -- Valve --

  async openValve(hass, { entityId, gardenaDeviceId, serviceId, durationSec }) {
    const data = { device_id: gardenaDeviceId };
    if (serviceId != null) {
      data.service_id = serviceId;
      data.duration = durationSec;
    }
    await hass.callService(DOMAIN, 'valve_open', data);
  }

  async closeValve(hass, { entityId, gardenaDeviceId, serviceId }) {
    const data = { device_id: gardenaDeviceId };
    if (serviceId != null) data.service_id = serviceId;
    await hass.callService(DOMAIN, 'valve_close', data);
  }

  // -- Mower --

  async callMowerAction(hass, entityId, action, durationSec) {
    switch (action) {
      case 'start_override':
        await hass.callService(DOMAIN, 'start_override', {
          entity_id: entityId,
          duration: durationSec,
        });
        return true; // started timer
      case 'start_automatic':
        await hass.callService(DOMAIN, 'start_automatic', { entity_id: entityId });
        return false;
      case 'park_until_next_task':
        await hass.callService(DOMAIN, 'park_until_next_task', { entity_id: entityId });
        return false;
      case 'park_until_further_notice':
        await hass.callService(DOMAIN, 'park_until_further_notice', { entity_id: entityId });
        return false;
      case 'pause':
        await hass.callService('lawn_mower', 'pause', { entity_id: entityId });
        return false;
      case 'resume':
        await hass.callService('lawn_mower', 'start_mowing', { entity_id: entityId });
        return false;
    }
    return false;
  }

  getMowerActions(haState) {
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

  getMowerInfo(_hass, state, _context) {
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

  // -- Socket --

  async turnOnSocket(hass, { entityId, gardenaDeviceId, durationSec, patched }) {
    const data = { device_id: gardenaDeviceId };
    if (patched) data.duration = durationSec;
    await hass.callService(DOMAIN, 'power_socket_on', data);
  }

  async turnOffSocket(hass, { entityId, gardenaDeviceId }) {
    await hass.callService(DOMAIN, 'power_socket_off', { device_id: gardenaDeviceId });
  }

  // -- Attribute helpers --

  getRfLinkLevel(hass, entityId) {
    return hass.states[entityId]?.attributes?.rf_link_level ?? null;
  }

  isPatchedIntegration(hass, entities) {
    if (!entities?.valves?.length) return undefined;
    const firstValve = hass.states[entities.valves[0]];
    return firstValve?.attributes?.service_id != null;
  }

  // Real 1-based Gardena valve number, read from py-smart-gardena's
  // "{device_uuid}:{valve_number}" service_id attribute. This is the
  // authoritative mapping and is independent of entity_id sort order.
  getValveIndex(hass, entityId) {
    const serviceId = hass.states?.[entityId]?.attributes?.service_id;
    if (typeof serviceId === 'string') {
      const num = parseInt(serviceId.split(':').pop(), 10);
      if (!Number.isNaN(num)) return num;
    }
    // Pre-patch installs without service_id: fall back to the alphabetic heuristic.
    return alphabeticValveIndex(hass, entityId);
  }

  getGardenaDeviceId(hass, entityId) {
    const entity = (hass.entities || {})[entityId];
    if (!entity?.device_id) return null;
    const device = (hass.devices || {})[entity.device_id];
    if (!device?.identifiers) return null;
    for (const [domain, id] of device.identifiers) {
      if (domain === DOMAIN) return id;
    }
    return null;
  }
}
