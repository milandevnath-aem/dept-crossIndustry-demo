/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement("summary");
    summary.className = "accordion-item-label";
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    body.className = "accordion-item-body";
    // decorate accordion item
    const details = document.createElement("details");
    moveInstrumentation(row, details);
    details.className = "accordion-item";
    details.append(summary, body);
    row.replaceWith(details);
  });
  const container = block.closest(".accordion-container");
  const classes = block.classList;
  const TYPE_MAP = {
    "accordion-type-1": { variant: "accordion-varient1" },
    "accordion-type-2": { variant: "accordion-varient2" },
    "accordion-type-3": { variant: "accordion-varient3" },
    "accordion-type-4": { variant: "accordion-varient4" },
  };
  // Find matching type
  const matchKey = Object.keys(TYPE_MAP).find((key) => classes.contains(key));
  // Fallback to type-1
  const { variant } = TYPE_MAP[matchKey] || TYPE_MAP["type-1"];
  // Apply variant class
  container?.classList.add(variant);
}
