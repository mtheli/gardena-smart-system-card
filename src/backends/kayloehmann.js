/**
 * Backend adapter for kayloehmann's ha-gardena-smart-system integration
 * (kayloehmann/ha-gardena-smart-system) v1.4+
 *
 * Uses standard HA services (valve.open_valve, lawn_mower.start_mowing, switch.turn_on)
 * plus entity-services for timed operations (duration in minutes).
 * Device identifiers use serial number: (DOMAIN, device.serial).
 *
 * Key differences from thecem backend:
 *   - activity, battery_state are separate sensor entities (not attributes on mower)
 *   - valve remaining duration is a separate sensor (not attribute on valve)
 *   - valve activity is not exposed at all (inferred via schedule integration)
 *   - socket activity IS an extra_state_attribute on the switch entity
 */

const DOMAIN = 'gardena_smart_system';

export class KayloehmannBackend {
  get id() { return 'kayloehmann'; }

  // -- Valve --

  async openValve(hass, { entityId, durationSec }) {
    // Use entity-service start_watering with duration in minutes
    const durationMin = Math.round(durationSec / 60);
    await hass.callService(DOMAIN, 'start_watering', {
      entity_id: entityId,
      duration: durationMin,
    });
  }

  async closeValve(hass, { entityId }) {
    await hass.callService('valve', 'close_valve', { entity_id: entityId });
  }

  // -- Mower --

  async callMowerAction(hass, entityId, action, durationSec) {
    switch (action) {
      case 'start_override': {
        // Entity-service override_schedule with duration in minutes
        const durationMin = Math.round(durationSec / 60);
        await hass.callService(DOMAIN, 'override_schedule', {
          entity_id: entityId,
          duration: durationMin,
        });
        return true; // started timer
      }
      case 'start_automatic':
        // start_mowing maps to START_DONT_OVERRIDE (resume schedule)
        await hass.callService('lawn_mower', 'start_mowing', { entity_id: entityId });
        return false;
      case 'park_until_next_task':
        // dock maps to PARK_UNTIL_NEXT_TASK
        await hass.callService('lawn_mower', 'dock', { entity_id: entityId });
        return false;
      case 'park_until_further_notice':
        // pause maps to PARK_UNTIL_FURTHER_NOTICE
        await hass.callService('lawn_mower', 'pause', { entity_id: entityId });
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

  getMowerInfo(hass, state, { entities, deviceId }) {
    // kayloehmann exposes activity, battery_state as separate sensor entities
    // battery_level is on a separate sensor entity (device lookup)
    let battery = null;
    if (deviceId && entities?.deviceBatteries?.[deviceId]) {
      const batteryEntityId = entities.deviceBatteries[deviceId];
      const batteryState = hass.states[batteryEntityId];
      if (batteryState) {
        battery = parseInt(batteryState.state, 10);
        if (isNaN(battery)) battery = null;
      }
    }

    // Activity from separate sensor (raw Gardena values: OK_CUTTING, PARKED_TIMER, etc.)
    let activity = state.attributes.activity; // fallback to attribute if present
    if (!activity && deviceId && entities?.deviceMowerActivities?.[deviceId]) {
      const actSensor = hass.states[entities.deviceMowerActivities[deviceId]];
      if (actSensor) activity = actSensor.state;
    }

    // Battery state from separate enum sensor (lowercase: charging, ok, low, etc.)
    let batteryState = state.attributes.battery_state;
    if (!batteryState && deviceId && entities?.deviceBatteryStates?.[deviceId]) {
      const batStateSensor = hass.states[entities.deviceBatteryStates[deviceId]];
      if (batStateSensor) batteryState = batStateSensor.state?.toUpperCase();
    }

    return {
      haState: state.state,
      activity,
      battery,
      batteryState,
      opHours: null,
      lastError: state.attributes.last_error_code,
      deviceState: null,
    };
  }

  // -- Socket --

  async turnOnSocket(hass, { entityId, durationSec }) {
    // Entity-service turn_on_for with duration in minutes
    const durationMin = Math.round(durationSec / 60);
    await hass.callService(DOMAIN, 'turn_on_for', {
      entity_id: entityId,
      duration: durationMin,
    });
  }

  async turnOffSocket(hass, { entityId }) {
    await hass.callService('switch', 'turn_off', { entity_id: entityId });
  }

  // -- Attribute helpers --

  getRfLinkLevel(_hass, _entityId) {
    // rf_link_level is a separate sensor entity in kayloehmann's integration
    // not available as a direct attribute on valve/mower/switch entities
    return null;
  }

  isPatchedIntegration() {
    // kayloehmann's integration always has working controls
    return true;
  }

  getGardenaDeviceId(hass, entityId) {
    // kayloehmann uses serial as device identifier: (DOMAIN, serial)
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
