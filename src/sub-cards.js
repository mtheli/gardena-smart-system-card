import { GardenaSmartSystemCard, ALL_DOMAINS } from './gardena_smart_system_card.js';

const SUB_CARDS = [
  {
    type: 'gardena-smart-mower-card',
    name: 'Gardena Smart System Card: Mower',
    description: 'Mower section from the Gardena Smart System card.',
    sections: ['mower'],
    configFields: ['title', 'show_header', 'show_schedules', 'mower_entities'],
    suggestDomains: ['lawn_mower'],
    size: 3,
  },
  {
    type: 'gardena-smart-valves-card',
    name: 'Gardena Smart System Card: Valves',
    description: 'Valve zones section from the Gardena Smart System card.',
    sections: ['valves'],
    configFields: ['title', 'show_header', 'show_schedules', 'default_duration', 'valve_columns', 'valve_entities'],
    suggestDomains: ['valve'],
    size: 4,
  },
  {
    type: 'gardena-smart-socket-card',
    name: 'Gardena Smart System Card: Socket',
    description: 'Power socket section from the Gardena Smart System card.',
    sections: ['socket'],
    configFields: ['title', 'show_header', 'show_schedules', 'default_duration', 'socket_entities'],
    suggestDomains: ['switch'],
    size: 2,
  },
  {
    type: 'gardena-smart-history-card',
    name: 'Gardena Smart System Card: History',
    description: 'History chart from the Gardena Smart System card.',
    sections: ['history'],
    configFields: ['title', 'show_header', 'valve_entities', 'socket_entities'],
    size: 3,
  },
];

function createSubCardClass(def) {
  class SubCard extends GardenaSmartSystemCard {
    setConfig(config) {
      super.setConfig({ ...config, sections: def.sections });
    }

    static getConfigForm() {
      const fullForm = GardenaSmartSystemCard.getConfigForm();
      return {
        schema: fullForm.schema.filter(f => def.configFields.includes(f.name)),
      };
    }

    static getStubConfig(hass) {
      const full = GardenaSmartSystemCard.getStubConfig(hass);
      const stub = {};
      for (const key of def.configFields) {
        if (full[key] !== undefined) stub[key] = full[key];
      }
      return stub;
    }

    getCardSize() {
      return def.size;
    }
  }
  return SubCard;
}

export function registerSubCards() {
  for (const def of SUB_CARDS) {
    // Keep a local reference: customElements.get(def.type) may return an
    // older copy of the card that won the registration race and lacks the
    // statics the suggestion callback needs.
    const SubCard = createSubCardClass(def);
    if (!customElements.get(def.type)) {
      customElements.define(def.type, SubCard);
    }
    window.customCards = window.customCards || [];
    window.customCards.push({
      type: def.type,
      name: def.name,
      description: def.description,
      preview: true,
      // Card picker suggestion (HA 2026.6+): each sub-card only suggests
      // itself for Gardena entities of its own domain (history has none).
      getEntitySuggestion: (hass, entityId) => {
        const entity = hass.entities?.[entityId];
        if (!entity || !ALL_DOMAINS.includes(entity.platform)) return null;
        if (!def.suggestDomains?.includes(entityId.split('.')[0])) return null;
        return {
          config: {
            type: `custom:${def.type}`,
            ...SubCard.getStubConfig(hass),
          },
        };
      },
    });
  }
}
