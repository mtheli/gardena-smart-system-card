# Schedules

- [Schedule Display in the Card](#schedule-display-in-the-card)
- [Alternative: Scheduler Component](#alternative-scheduler-component)
  - [Display Mode](#display-mode)
  - [Recommended Scheduler Card Configuration](#recommended-scheduler-card-configuration)
  - [Why custom actions?](#why-custom-actions)
- [Alternative: Home Assistant Automations](#alternative-home-assistant-automations)
  - [Mower](#mower--mow-monfri-at-1000-for-3-hours)
  - [Valve](#valve--water-zone-1-daily-at-0600-for-30-minutes)
  - [Power Socket](#power-socket--turn-on-every-evening-at-2000-for-2-hours)
  - [Smart Conditions](#smart-conditions)

## Schedule Display in the Card

The card can display schedules (time slots and weekdays) below each device. This requires the optional [Gardena Smart Schedule](https://github.com/mtheli/gardena-smart-schedule) integration, which reads schedule data from the Gardena Cloud API.

**How it works:**
- Gardena Smart Schedule creates `sensor` entities that mirror the schedules configured in the Gardena App
- The card auto-discovers these sensors and renders the time slots with weekday indicators
- Active schedule slots are highlighted in green when the device is currently running on schedule

**Without this integration**, the card works fully — you just won't see the schedule rows.

## Alternative: Scheduler Component

If you prefer a visual schedule editor inside Home Assistant, you can use the [scheduler-component](https://github.com/nielsfaber/scheduler-component) together with the [scheduler-card](https://github.com/nielsfaber/scheduler-card). Both are available via HACS.

The Gardena Smart System Card **automatically detects** scheduler-component schedules (`switch.schedule_*` entities) that target Gardena devices and displays them in the schedule section. This works out of the box — no additional configuration needed on the Gardena card side.

### Display Mode

By default, scheduler schedules are mixed into the existing schedule list. You can change this via the `show_scheduler_schedules` config option:

- `mixed` (default) — scheduler entries appear alongside Gardena App schedules
- `separate` — scheduler entries get their own labeled section

### Recommended Scheduler Card Configuration

The standard valve/switch/mower actions don't include a duration parameter. To get proper timed control, add custom actions to your scheduler-card config:

```yaml
type: custom:scheduler-card
customize:
  valve.garten_bewasserung:
    actions:
      - service: gardena_smart_system.start_watering
        name: Water
        variables:
          duration:
            name: Duration (minutes)
            min: 5
            max: 120
            step: 5
            unit: min
  switch.power:
    actions:
      - service: gardena_smart_system.turn_on_for
        name: Turn on
        variables:
          duration:
            name: Duration (minutes)
            min: 5
            max: 120
            step: 5
            unit: min
  lawn_mower.garten_schaf:
    actions:
      - service: gardena_smart_system.override_schedule
        name: Mow
        variables:
          duration:
            name: Duration (minutes)
            min: 30
            max: 480
            step: 30
            unit: min
```

> **Note:** Replace the entity IDs with your own. If you have multiple valve zones, add each one individually — domain-level keys (e.g., `valve`) are [not yet supported](https://github.com/nielsfaber/scheduler-card/issues/1127) for the entity picker.

### Why custom actions?

| Device | Standard action | Custom action |
|--------|----------------|---------------|
| Valve | `valve.open_valve` — opens indefinitely (Gardena default ~60 min timeout) | `gardena_smart_system.start_watering` — waters for exact duration, then closes |
| Socket | `switch.turn_on` — turns on indefinitely | `gardena_smart_system.turn_on_for` — turns on for exact duration, then off |
| Mower | `lawn_mower.start_mowing` — mows until next park schedule or battery empty | `gardena_smart_system.override_schedule` — mows for exact duration, then resumes schedule |

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
