import { readBlockConfig } from '../../scripts/aem.js';

/**
 * Decorates the theme configurator block
 * This block only houses css-variable blocks for display purposes
 * Theme loading and application is handled by loadThemeFromPage() in scripts.js
 * @param {Element} block The theme configurator block element
 */
export default async function decorate(block) {
console.log(block);
  // block.appendChild(variablesContainer);
}
