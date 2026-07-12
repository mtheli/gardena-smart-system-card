import { GardenaSmartSystemCard, CARD_VERSION, ALL_DOMAINS } from "./gardena_smart_system_card.js";
import { registerSubCards } from "./sub-cards.js";

if (!customElements.get("gardena-smart-system-card")) {
  customElements.define("gardena-smart-system-card", GardenaSmartSystemCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "gardena-smart-system-card",
  name: "Gardena Smart System Card",
  description: "Custom card for the Gardena Smart System integration with mower, irrigation, and sensor support.",
  preview: true,
  // Card picker suggestion (HA 2026.6+): suggest the full card for any
  // entity belonging to a supported Gardena integration.
  getEntitySuggestion: (hass, entityId) => {
    const entity = hass.entities?.[entityId];
    if (!entity || !ALL_DOMAINS.includes(entity.platform)) return null;
    return {
      config: {
        type: "custom:gardena-smart-system-card",
        ...GardenaSmartSystemCard.getStubConfig(hass),
      },
    };
  },
});

registerSubCards();

console.info(
  `%c GARDENA-SMART-SYSTEM-CARD %c v${CARD_VERSION} `,
  "color:#fff;background:#1c1c1c;padding:2px 6px;border-radius:4px 0 0 4px;font-weight:700",
  "color:#1c1c1c;background:#4caf50;padding:2px 6px;border-radius:0 4px 4px 0;font-weight:700",
);
