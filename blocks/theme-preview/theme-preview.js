function createColorsPreview() {
  const section = document.createElement('div');
  section.className = 'preview-section';
  section.innerHTML = `
    <h3>Colors</h3>
    <div class="color-swatches">
      <div class="color-swatch" style="background-color: var(--primary-color, #007bff);">
        <span>Primary</span>
      </div>
      <div class="color-swatch" style="background-color: var(--secondary-color, #6c757d);">
        <span>Secondary</span>
      </div>
      <div class="color-swatch" style="background-color: var(--light-color, #f8f9fa); color: #000;">
        <span>Light</span>
      </div>
      <div class="color-swatch" style="background-color: var(--dark-color, #343a40);">
        <span>Dark</span>
      </div>
    </div>
  `;
  return section;
}
function observeThemeChanges(container) {
  // Watch for changes to theme style tag in head only
  const styleObserver = new MutationObserver((mutations) => {
    // Only process if theme-configurator-styles changed
    const themeStyleChanged = mutations.some((mutation) => {
      if (mutation.type === 'childList') {
        return Array.from(mutation.addedNodes).some(
          (node) => node.id === 'theme-configurator-styles',
        ) || Array.from(mutation.removedNodes).some(
          (node) => node.id === 'theme-configurator-styles',
        );
      }
      return mutation.target.id === 'theme-configurator-styles';
    });

    if (themeStyleChanged) {
      // Theme updated, add visual feedback
      container.classList.add('theme-updated');
      setTimeout(() => container.classList.remove('theme-updated'), 300);
    }
  });

  // Only observe the head element for style changes
  styleObserver.observe(document.head, {
    childList: true,
    subtree: false,
    characterData: false,
  });
}

export default function decorate(block) {
  // This block will show live preview of theme variables
  // It displays sample components styled with the current theme

  // Clear the block
  block.innerHTML = '';

  // Create preview container
  const previewContainer = document.createElement('div');
  previewContainer.className = 'theme-preview-container';

  // Create preview sections
  const sections = [
    createColorsPreview(),
  ];

  sections.forEach((section) => previewContainer.appendChild(section));

  block.appendChild(previewContainer);

  // Listen for theme changes and update preview
  observeThemeChanges(previewContainer);
}
