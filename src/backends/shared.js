/**
 * Shared helpers used by both backend adapters and the card itself.
 */

/**
 * Legacy heuristic for a valve's 1-based Gardena number: its position among
 * the same-device valve entities when sorted alphabetically by entity_id.
 *
 * This is correct only when the entity_ids happen to sort in the same order
 * as the Gardena valve numbering — typically only when valves keep their
 * default names. Kept as a fallback for the kayloehmann backend (which exposes
 * no per-valve service_id) and for pre-patch py-smart-gardena installs that
 * don't expose service_id either.
 *
 * @returns {number|null} 1-based valve number, or null if not resolvable.
 */
export function alphabeticValveIndex(hass, entityId) {
  const entities = hass?.entities;
  if (!entities) return null;
  const sourceEntity = entities[entityId];
  if (!sourceEntity?.device_id) return null;
  const deviceId = sourceEntity.device_id;
  const valveEntities = Object.keys(entities)
    .filter(eid => eid.startsWith('valve.') && entities[eid]?.device_id === deviceId)
    .sort();
  const idx = valveEntities.indexOf(entityId);
  return idx >= 0 ? idx + 1 : null;
}
