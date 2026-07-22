/**
 * Decorates the Compare Section block.
 * @param {Element} block The block element
 */
// import Swiper from './swiper.min.js';

export default function decorate(block) {
  console.log("block", block)
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const authorBase = 'https://publish-p153659-e1796191.adobeaemcloud.com';

  // --- 1. ID LOGIC: Block Anchor for scrolling ---
  const blockName = block.classList[0];
  const firstRow = block.querySelector(':scope > div');
  const potentialTitle = firstRow?.children.length < 8 ? firstRow.textContent.trim() : '';

  const cleanSuffix = potentialTitle
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 20);

  block.id = cleanSuffix ? `${blockName}-${cleanSuffix}` : blockName;

  // --- 2. RENDER LOGIC: Shared for initial load and authoring updates ---
  const renderBlock = () => {
    // We work from a copy of the children to avoid infinite loops during mutation
    const rows = [...block.children];
    if (!rows.length) return;

    const grid = document.createElement('div');
    grid.classList.add('compare-grid');

    rows.forEach((row) => {
      const cols = [...row.children];
      // Skip rows that don't match the product data structure (8 columns)
      if (cols.length < 8) {
        if (cols.length > 0) row.classList.add('compare-section-header');
        return;
      }

      const [icon, colorField, titleEl, descriptionEl, productModelEl, specsEl, ctaTextEl, ctaStyleEl] = cols;

      // ---- IMAGE ----
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('compare-card__image');
      const img = document.createElement('img');
      imageWrapper.append(img);

      const updateImage = (colorHex) => {
        const cleanColor = colorHex.replace('#', '');
        const cleanTitle = titleEl.textContent.trim().replace(/[^a-zA-Z0-9]/g, '').replace('inch', '');
        const cleanModel = productModelEl.textContent.trim().split('·')[0].replace(/[^a-zA-Z0-9]/g, '');
        
        const fileName = `product_${cleanTitle}_${cleanModel}_${cleanColor}.png`;
        const path = `/content/dam/dept-crossIndustry/hi-tech-images/${fileName}`;
        
        img.src = isLocalhost ? `${authorBase}${path}` : path;
        img.alt = titleEl.textContent.trim();
      };

      // ---- SWATCHES ----
      const swatchWrapper = document.createElement('div');
      swatchWrapper.classList.add('compare-card__swatches');
      
      const colors = [...colorField.querySelectorAll('li')].map(li => li.textContent.trim());
      colors.forEach((color, index) => {
        const swatch = document.createElement('span');
        swatch.classList.add('compare-swatch');
        swatch.style.backgroundColor = color;
        
        swatch.addEventListener('click', () => {
          swatchWrapper.querySelectorAll('.compare-swatch').forEach(s => s.classList.remove('is-active'));
          swatch.classList.add('is-active');
          updateImage(color);
        });
        
        if (index === 0) {
          swatch.classList.add('is-active');
          updateImage(color); 
        }
        swatchWrapper.append(swatch);
      });

      // ---- PRODUCT DETAILS & CTA ----
      row.classList.add('compare-card');
      titleEl.classList.add('compare-card__title');
      descriptionEl.classList.add('compare-card__desc');
      productModelEl.classList.add('compare-card__model');
      specsEl.classList.add('compare-card__specs');

      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('compare-card__cta');
      const ctaButton = document.createElement('button');
      
      // Dynamic button style from authoring dropdown
      const buttonStyle = ctaStyleEl?.textContent.trim() || 'button-dark';
      ctaButton.className = buttonStyle;
      ctaButton.textContent = ctaTextEl?.textContent.trim() || 'Add to Cart';
      ctaWrapper.append(ctaButton);

      // --- ASSEMBLE ---
      // Moving existing elements preserves the UE 'data-aue-prop' attributes
      row.replaceChildren(imageWrapper, swatchWrapper, titleEl, descriptionEl, productModelEl, specsEl, ctaWrapper);
      grid.append(row);
    });
    // Replace the block's internal content with the newly decorated grid
    block.replaceChildren(grid);
  };

  // --- 3. INITIAL EXECUTION ---
  renderBlock();
  // --- 4. MUTATION OBSERVER: Fixes the "Dropdown not updating" issue ---
  const observer = new MutationObserver((mutations) => {
    // Check if the change came from a UE authoring update
    const isAuthoringAction = mutations.some(m => m.type === 'characterData' || m.type === 'childList');
    
    if (isAuthoringAction && !block.dataset.isDecorating) {
      block.dataset.isDecorating = 'true';
      renderBlock();
      delete block.dataset.isDecorating;
    }
  });

  observer.observe(block, { 
    childList: true, 
    subtree: true, 
    characterData: true 
  });
}