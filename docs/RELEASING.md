# Releasing

How a release is cut and, more importantly, how its notes are written. The
format is shared with the sibling cards and integrations (toothbrush-card,
isdt_air_card, philips_sonicare_ble, philips_shaver, isdt_air_ble,
gardena-smart-schedule) — this file exists so it stops drifting.

## Release notes

Written for someone who uses the card, not for someone who reads the diff.
What changed for them, and what they have to do about it.

**Structure:** `##` sections by theme, each holding bullets that open with a
bold phrase and then explain themselves in one or two sentences. A short
lead-in paragraph before the bullets is fine when they need context — a new
option, for instance, is easier to grasp with the YAML it produces.

```markdown
## Soil sensors on your valve zones

Each valve zone can show sensor readings next to the zone name.

- **Assign them in the editor** under *Valve Zones → Sensor assignment*,
  one row per sensor.
- **Any humidity, temperature or illuminance sensor works** — Gardena smart
  Sensor, Mi Flora, a template sensor. No vendor lock-in.
```

**Title:** `vX.Y.Z — what it is about`, e.g.
*v0.10.0 — Sensor readings per valve zone*.

**Say which part it applies to.** The card ships a main card plus mower,
valve, power-socket, history and schedule sub-cards, and it runs against
more than one backend integration. Name the sub-card or the backend a
section applies to — and where a reader would otherwise assume it applies to
theirs, name the one it does not.

**Credit belongs in the notes.** Name whoever reported the problem, tested
the fix or supplied the screenshots, with `@handle` and the issue number, in
the bullet their work belongs to. The `@` is not decoration: it notifies
them and links their profile, and it is how the release and the issue thread
explain each other.

Link the external cause when one triggered the release — a Home Assistant
version, an upstream pull request, a dependency release. A reader who
upgraded something and then saw behaviour change deserves to know the two
are connected.

**What does not belong:** commit lists, file names, internal symbol names,
test tallies, documentation-only changes, and the reasoning behind an
implementation choice.

## The version lives in two files

| File | Role |
| :--- | :--- |
| `package.json` | `version` — what the package declares. |
| `src/gardena_smart_system_card.js` | `CARD_VERSION` — rendered in the editor footer and the console banner, next to the build date. |

**Both must match the tag.** The footer is how a user proves which bundle
their browser actually loaded, which is the first question on any bug report
where a fix "did not work" — a stale cached bundle and a real regression look
identical until that value is read out.

`hacs.json` carries no version; HACS resolves that from the release.

## dist/ is committed, and it is what users install

`dist/gardena_smart_system_card.js` is built by `npm run build` and attached
to every release as an asset. It has to be rebuilt and committed **in the
release commit**, so the tagged tree contains the bundle that carries the
tagged version.

`scripts/gen_build_info.mjs` stamps a timestamp into `src/build-info.js`, so
rebuilding without changing a line of source still produces a one-line diff.
That single `BUILD_DATE` line is the only difference a rebuild may show — any
other change means `dist/` was out of sync with `src/`.

## No release workflow, on purpose

There is no `.github/workflows/release.yaml`. One existed until v0.6.0 and
raced a manual `gh release create` for the same tag, which left two releases
behind and failed the workflow with `already_exists`. Releases are cut by
hand so the notes say what we want them to say instead of being generated
from commit subjects.

## Cutting the release

1. Content commits first, pushed and green.
2. Bump `version` in `package.json` and `CARD_VERSION` in
   `src/gardena_smart_system_card.js` to the new version.
3. `npm run build`, and run `npm run check:translations` — a card that
   renders an untranslated key looks broken in every language but ours.
4. Commit the bump together with the rebuilt `dist/`.
5. Tag `vX.Y.Z` and push the tag with it.
6. `gh release create vX.Y.Z dist/gardena_smart_system_card.js --title … --notes-file …`
