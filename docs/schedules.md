# Schedules

## Schedule Display in the Card

The card can display schedules (time slots and weekdays) below each device. This requires the optional [Gardena Smart Schedule](https://github.com/mtheli/gardena-smart-schedule) integration, which reads schedule data from the Gardena Cloud API.

**How it works:**
- Gardena Smart Schedule creates `sensor` entities that mirror the schedules configured in the Gardena App
- The card auto-discovers these sensors and renders the time slots with weekday indicators
- Active schedule slots are highlighted in green when the device is currently running on schedule

**Without this integration**, the card works fully — you just won't see the schedule rows.

## Alternative: Home Assistant Automations

If you prefer to manage schedules locally in Home Assistant instead of the Gardena App, you can create automations that trigger Gardena devices on a time-based schedule. The card does not display these automations, but device control and status work as usual.

### Mower — Mow Mon–Fri at 10:00 for 3 hours

```yaml
automation:
  - alias: "Mower schedule"
    trigger:
      - platform: time
        at: "10:00:00"
    condition:
      - condition: time
        weekday: [mon, tue, wed, thu, fri]
    action:
      - service: gardena_smart_system.override_schedule
        target:
          entity_id: lawn_mower.garten_schaf_mower
        data:
          duration: 180  # minutes
```

### Valve — Water Zone 1 daily at 06:00 for 30 minutes

```yaml
automation:
  - alias: "Irrigation zone 1"
    trigger:
      - platform: time
        at: "06:00:00"
    action:
      - service: gardena_smart_system.start_watering
        target:
          entity_id: valve.garten_bewasserung_valve_1
        data:
          duration: 30  # minutes
```

### Power Socket — Turn on every evening at 20:00 for 2 hours

```yaml
automation:
  - alias: "Garden lights"
    trigger:
      - platform: time
        at: "20:00:00"
    action:
      - service: gardena_smart_system.turn_on_for
        target:
          entity_id: switch.power_steckdose
        data:
          duration: 120  # minutes
```

### Smart Conditions

You can combine time-based triggers with sensor conditions, e.g. only water when soil moisture is low:

```yaml
automation:
  - alias: "Smart irrigation"
    trigger:
      - platform: time
        at: "06:00:00"
    condition:
      - condition: numeric_state
        entity_id: sensor.soil_moisture
        below: 40
    action:
      - service: gardena_smart_system.start_watering
        target:
          entity_id: valve.garten_bewasserung_valve_1
        data:
          duration: 30
```

> **Note:** The service names and parameters above are for [ha-gardena-smart-system](https://github.com/kayloehmann/ha-gardena-smart-system). If you use [hass-gardena-smart-system](https://github.com/py-smart-gardena/hass-gardena-smart-system), the service names differ (e.g. `gardena_smart_system.start_override` with `duration` in seconds).
