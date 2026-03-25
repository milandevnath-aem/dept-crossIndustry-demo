import {
  decorateBlock,
  loadBlock,
} from '../../scripts/aem.js';

/**
 * Decorates nested blocks within the sub-section.
 * This function identifies block divs and applies decoration similar to main sections.
 * @param {HTMLElement} container - The sub-section container element
 */
function decorateNestedBlocks(container) {
  // Find all direct child divs that have a class (potential blocks)
  container.querySelectorAll(':scope > div > div[class]').forEach((block) => {
    // Skip if already decorated
    if (block.dataset.blockStatus) return;
    decorateBlock(block);
  });
}

/**
 * Loads all decorated blocks within the sub-section.
 * @param {HTMLElement} container - The sub-section container element
 * @returns {Promise<void>}
 */
async function loadNestedBlocks(container) {
  const blocks = container.querySelectorAll(':scope > div > div[data-block-status="initialized"]');
  const loadPromises = Array.from(blocks).map((block) => loadBlock(block));
  await Promise.all(loadPromises);
}

/**
 * Wraps default content (non-block content) in wrapper divs.
 * @param {HTMLElement} container - The sub-section container element
 */
function wrapDefaultContent(container) {
  const children = [...container.children];
  children.forEach((child) => {
    // If it's a div without a class, it might contain default content
    if (child.tagName === 'DIV' && !child.className) {
      const innerDiv = child.querySelector(':scope > div');
      if (innerDiv && !innerDiv.className) {
        // This is default content, wrap it
        innerDiv.classList.add('default-content-wrapper');
      }
    }
  });
}

/**
 * Reads sub-section configuration from metadata div.
 * @param {HTMLElement} block - The sub-section block element
 * @returns {Object} Configuration object
 */
function readSubSectionConfig(block) {
  const config = {};
  const metadataDiv = block.querySelector(':scope > div.sub-section-metadata');

  if (metadataDiv) {
    [...metadataDiv.children].forEach((row) => {
      const key = row.children[0]?.textContent?.trim().toLowerCase().replace(/\s+/g, '-');
      const value = row.children[1]?.textContent?.trim();
      if (key && value) {
        config[key] = value;
      }
    });
    metadataDiv.remove();
  }

  return config;
}

/**
 * Applies styling classes based on configuration.
 * @param {HTMLElement} block - The sub-section block element
 * @param {Object} config - Configuration object
 */
function applyStyles(block, config) {
  // Apply background style
  if (config.style) {
    const styles = config.style.split(',').map((s) => s.trim());
    styles.forEach((style) => {
      if (style) block.classList.add(style);
    });
  }

  // Apply spacing
  if (config['spacing-top']) {
    block.classList.add(`sub-section-spacing-top-${config['spacing-top']}`);
  }
  if (config['spacing-bottom']) {
    block.classList.add(`sub-section-spacing-bottom-${config['spacing-bottom']}`);
  }

  // Apply layout
  if (config.layout) {
    block.classList.add(`sub-section-layout-${config.layout}`);
  }

  // Apply width constraint
  if (config.width) {
    block.classList.add(`sub-section-width-${config.width}`);
  }
}

/**
 * Sub-section block decorator.
 * Creates a nested section-like container that can house other components.
 * @param {HTMLElement} block - The sub-section block element
 */
export default async function decorate(block) {
  // Read and apply configuration
  const config = readSubSectionConfig(block);
  applyStyles(block, config);

  // Add sub-section wrapper class
  block.classList.add('sub-section-content');

  // Wrap default content
  wrapDefaultContent(block);

  // Decorate nested blocks
  decorateNestedBlocks(block);

  // Load nested blocks
  await loadNestedBlocks(block);

  // Mark sub-section as loaded
  block.dataset.subSectionStatus = 'loaded';
}
