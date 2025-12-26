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

function createTypographyPreview() {
  const section = document.createElement('div');
  section.className = 'preview-section';
  section.innerHTML = `
    <h3>Typography</h3>
    <div class="typography-samples">
      <h1 style="font-family: var(--font-family, inherit); color: var(--primary-color, #007bff);">
        Heading 1
      </h1>
      <h2 style="font-family: var(--font-family, inherit);">Heading 2</h2>
      <p style="font-family: var(--font-family, inherit); color: var(--text-color, #212529);">
        This is a sample paragraph demonstrating the typography settings. 
        The font family and colors are controlled by CSS variables.
      </p>
    </div>
  `;
  return section;
}

function createButtonsPreview() {
  const section = document.createElement('div');
  section.className = 'preview-section';
  section.innerHTML = `
    <h3>Buttons</h3>
    <div class="button-samples">
      <button class="preview-btn primary-btn">Primary Button</button>
      <button class="preview-btn secondary-btn">Secondary Button</button>
      <button class="preview-btn outline-btn">Outline Button</button>
    </div>
  `;
  return section;
}

function createCardsPreview() {
  const section = document.createElement('div');
  section.className = 'preview-section';
  section.innerHTML = `
    <h3>Card Component</h3>
    <div class="preview-cards">
      <div class="preview-card">
        <div class="preview-card-header" style="background-color: var(--primary-color, #007bff);">
          Card Title
        </div>
        <div class="preview-card-body">
          <p>This is a sample card component showing how theme variables affect card styling.</p>
          <button class="preview-btn primary-btn">Learn More</button>
        </div>
      </div>
    </div>
  `;
  return section;
}

function observeThemeChanges(container) {
  // Watch for changes to theme variables in the DOM
  const observer = new MutationObserver(() => {
    // Force repaint to apply new CSS variables
    container.style.display = 'none';
    // eslint-disable-next-line no-unused-expressions
    container.offsetHeight; // Trigger reflow
    container.style.display = '';
  });

  // Observe changes to style tags in head
  const styleObserver = new MutationObserver(() => {
    const themeStyle = document.getElementById('theme-configurator-styles');
    if (themeStyle) {
      // Theme updated, force preview refresh
      container.classList.add('theme-updated');
      setTimeout(() => container.classList.remove('theme-updated'), 300);
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style'],
    subtree: true,
  });

  styleObserver.observe(document.head, {
    childList: true,
    subtree: true,
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
    createTypographyPreview(),
    createButtonsPreview(),
    createCardsPreview(),
  ];

  sections.forEach((section) => previewContainer.appendChild(section));

  block.appendChild(previewContainer);

  // Listen for theme changes and update preview
  observeThemeChanges(previewContainer);
}
