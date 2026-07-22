function detectVariant(block) {
  const container = block.closest('.product-compare-cards-container');
  if (container?.classList.contains('compare-variant2')) return 'compare-variant2';
  if (container?.classList.contains('compare-variant3')) return 'compare-variant3';
  return 'compare-variant1';
}

function getCell(row, index) {
  return row.children[index]?.innerHTML?.trim() || '';
}

function createSwatches(swatchMarkup) {
  const swatchWrap = document.createElement('div');
  swatchWrap.className = 'product-compare-cards-swatches';

  const temp = document.createElement('div');
  temp.innerHTML = swatchMarkup;
  const values = [...temp.querySelectorAll('li')]
    .map((li) => li.textContent?.trim())
    .filter((val) => val && val.startsWith('#'));

  values.forEach((hex, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'product-compare-cards-swatch';
    dot.style.backgroundColor = hex;
    dot.setAttribute('aria-label', `Color option ${index + 1}: ${hex}`);
    swatchWrap.append(dot);
  });

  return swatchWrap;
}

function createSpecs(specsMarkup) {
  const temp = document.createElement('div');
  temp.innerHTML = specsMarkup;
  const list = temp.querySelector('ul') || document.createElement('ul');
  list.classList.add('product-compare-cards-specs');
  return list;
}

function createImagePlaceholder(title) {
  const thumb = document.createElement('div');
  thumb.className = 'product-compare-cards-thumb';
  const label = document.createElement('span');
  label.textContent = title || 'Laptop';
  thumb.append(label);
  return thumb;
}

function createCard(row, variant, index) {
  const title = row.children[2]?.textContent?.trim() || '';
  const description = row.children[3]?.textContent?.trim() || '';
  const performance = row.children[4]?.textContent?.trim() || '';
  const ctaLabel = row.children[6]?.textContent?.trim() || 'Add to Cart';
  const ctaStyle = row.children[7]?.textContent?.trim() || 'button-dark';

  const card = document.createElement('article');
  card.className = 'product-compare-cards-item';
  if (variant === 'compare-variant3' && index === 1) {
    card.classList.add('is-featured');
  }

  if (variant === 'compare-variant3' && index === 1) {
    const featureLabel = document.createElement('p');
    featureLabel.className = 'product-compare-cards-featured-label';
    featureLabel.textContent = 'Recommended';
    card.append(featureLabel);
  }

  card.append(createImagePlaceholder(title));
  card.append(createSwatches(getCell(row, 1)));

  const heading = document.createElement('h3');
  heading.className = 'product-compare-cards-title';
  heading.textContent = title;
  card.append(heading);

  const desc = document.createElement('p');
  desc.className = 'product-compare-cards-description';
  desc.textContent = description;
  card.append(desc);

  const perf = document.createElement('p');
  perf.className = 'product-compare-cards-performance';
  perf.textContent = performance;
  card.append(perf);

  card.append(createSpecs(getCell(row, 5)));

  const ctaWrap = document.createElement('p');
  ctaWrap.className = `button-container ${ctaStyle}`;
  const cta = document.createElement('a');
  cta.className = 'button';
  cta.href = '#';
  cta.textContent = ctaLabel;
  ctaWrap.append(cta);
  card.append(ctaWrap);

  return card;
}

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const variant = detectVariant(block);
  block.classList.add(variant);

  const list = document.createElement('div');
  list.className = 'product-compare-cards-list';

  rows.forEach((row, index) => {
    list.append(createCard(row, variant, index));
  });

  block.replaceChildren(list);
}
