import { GardenaSmartSystemCard, CARD_VERSION } from "./gardena_smart_system_card.js";
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
});

registerSubCards();

console.info(
  `%c GARDENA-SMART-SYSTEM-CARD %c v${CARD_VERSION} `,
  "color:#fff;background:#1c1c1c;padding:2px 6px;border-radius:4px 0 0 4px;font-weight:700",
  "color:#1c1c1c;background:#4caf50;padding:2px 6px;border-radius:0 4px 4px 0;font-weight:700",
);
