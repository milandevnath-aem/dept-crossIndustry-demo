import {
  a,
  div,
  h2,
  img,
  p,
} from '../../scripts/dom-helpers.js';

/**
 * Extracts image source from either an <img> element or a Dynamic Media anchor tag.
 * Dynamic Media URLs are delivered as <a> tags with href containing the asset URL.
 * @param {HTMLElement} container - The container element to search within
 * @param {number} index - The index of the image to retrieve (0 for desktop, 1 for mobile)
 * @returns {string} The image URL with optional width/quality parameters
 */
function getImageSource(container, index = 0) {
  // First try to find traditional <img> elements
  const images = container.querySelectorAll('img');
  if (images.length > index) {
    return images[index].src.trim();
  }

  // Look for Dynamic Media anchor tags (URLs containing /adobe/assets/)
  const dmAnchors = Array.from(container.querySelectorAll('a[href]')).filter((anchor) => {
    const href = anchor.href || '';
    return href.includes('/adobe/assets/') || href.includes('delivery-');
  });

  if (dmAnchors.length > index) {
    const imageUrl = dmAnchors[index].href.trim();
    // Add width and quality params if not present
    try {
      const url = new URL(imageUrl);
      if (!url.searchParams.has('width')) {
        url.searchParams.set('width', '1400');
      }
      if (!url.searchParams.has('quality')) {
        url.searchParams.set('quality', '85');
      }
      return url.toString();
    } catch (e) {
      return imageUrl;
    }
  }

  // Fallback: return first available image source
  if (images.length > 0) {
    return images[0].src.trim();
  }
  if (dmAnchors.length > 0) {
    return dmAnchors[0].href.trim();
  }
  return '';
}

/**
 * Checks if an element contains a Dynamic Media URL.
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} True if element contains DM URL
 */
function containsDynamicMediaUrl(element) {
  const text = element.textContent || '';
  const anchor = element.querySelector('a[href]');
  const href = anchor?.href || '';
  return text.includes('/adobe/assets/') || text.includes('delivery-') || href.includes('/adobe/assets/') || href.includes('delivery-');
}

/**
 * Gets the description text, filtering out paragraphs with Dynamic Media URLs.
 * @param {HTMLElement} block - The block element
 * @returns {string} The description text
 */
function getDescriptionText(block) {
  const paragraphs = Array.from(block.querySelectorAll('p'));
  const validParagraph = paragraphs.find((para) => {
    // Skip paragraphs that contain DM URLs or only contain links
    if (containsDynamicMediaUrl(para)) return false;
    // Skip paragraphs that only contain CTA buttons (links)
    const links = para.querySelectorAll('a');
    if (links.length > 0 && para.textContent.trim() === Array.from(links).map((l) => l.textContent).join(' ').trim()) return false;
    return para.textContent.trim().length > 0;
  });
  return validParagraph?.innerText?.trim() || '';
}

/**
 * Gets the appropriate image source based on viewport width.
 * @param {HTMLElement} block - The block element
 * @returns {string} The image URL for the current viewport
 */
function getResponsiveImageSource(block) {
  const desktopIndex = 0;
  const mobileIndex = 1;

  // Check how many image sources are available
  const images = block.querySelectorAll('img');
  const dmAnchors = Array.from(block.querySelectorAll('a[href]')).filter((anchor) => {
    const href = anchor.href || '';
    return href.includes('/adobe/assets/') || href.includes('delivery-');
  });
  const totalImages = Math.max(images.length, dmAnchors.length);

  if (totalImages > 1) {
    // Two images available: use desktop for large screens, mobile for small
    return window.innerWidth > 1024
      ? getImageSource(block, desktopIndex)
      : getImageSource(block, mobileIndex);
  }
  // Only one image: use it for all viewports
  return getImageSource(block, 0);
}

function bannerType1(block) {
  const source = getResponsiveImageSource(block);
  const heading = block.querySelector('h2')?.innerText?.trim() || '';
  const description = getDescriptionText(block);

  // Filter out Dynamic Media anchor tags from buttons
  const buttons = Array.from(block.querySelectorAll('a')).filter((anchor) => {
    const href = anchor.href || '';
    return !href.includes('/adobe/assets/') && !href.includes('delivery-');
  });
  const fisrtAnchorText = buttons[0]?.innerText.trim() || '';
  const fisrtAnchorHref = buttons[0]?.href.trim() || '';
  const fisrtAnchorTitle = buttons[0]?.title.trim() || '';
  const secondAnchorText = buttons[1]?.innerText?.trim() || '';
  const secondAnchorHref = buttons[1]?.href.trim() || '';
  const secondAnchorTitle = buttons[1]?.title.trim() || '';

  const promotionalBanner = div(
    {
      class: 'promotionalbanner promotionalbanner-content block type1',
      'data-block-name': 'promotionalbanner',
      'data-block-status': 'loaded',
    },
    // -------- Image Section --------
    div(
      { class: 'bannner-image' },
      div(
        {},
        img({
          loading: 'eager',
          fetchpriority: 'high',
          alt: '',
          src: `${source}`,
        }),
      ),
    ),
    // -------- Content Section --------
    div(
      { class: 'banner-conetent' },
      div(
        { class: 'grid-content' },
        h2({ id: 'upgrade-to-smarter-stronger-rewards' }, heading),
        p({}, description),
        p(
          { class: 'redirections' },
          a({ href: `${fisrtAnchorHref}`, title: `${fisrtAnchorTitle}` }, fisrtAnchorText),
          ' ',
          a({ href: `${secondAnchorHref}`, title: `${secondAnchorTitle}` }, secondAnchorText),
        ),
      ),
    ),
  );
  block.textContent = '';

  return promotionalBanner;
}

function bannerType3(block) {
  const source = getResponsiveImageSource(block);
  const heading = block.querySelector('h2')?.innerText?.trim() || '';
  const description = getDescriptionText(block);

  // Filter out Dynamic Media anchor tags from buttons
  const buttons = Array.from(block.querySelectorAll('a')).filter((anchor) => {
    const href = anchor.href || '';
    return !href.includes('/adobe/assets/') && !href.includes('delivery-');
  });
  const fisrtAnchorText = buttons[0]?.innerText.trim() || '';
  const fisrtAnchorHref = buttons[0]?.href.trim() || '';
  const fisrtAnchorTitle = buttons[0]?.title.trim() || '';
  const secondAnchorText = buttons[1]?.innerText?.trim() || '';
  const secondAnchorHref = buttons[1]?.href.trim() || '';
  const secondAnchorTitle = buttons[1]?.title.trim() || '';

  const promotionalBanner = div(
    {
      class: 'promotionalbanner promotionalbanner-content block type1',
      'data-block-name': 'promotionalbanner',
      'data-block-status': 'loaded',
    },
    // -------- Image Section --------
    div(
      { class: 'bannner-image desktop-img' },
      div(
        {},
        img({
          loading: 'eager',
          fetchpriority: 'high',
          alt: '',
          src: `${source}`,
        }),
      ),
    ),
    // -------- Content Section --------
    div(
      { class: 'banner-conetent' },
      div(
        { class: 'grid-content' },
        div({}, h2({ id: 'upgrade-to-smarter-stronger-rewards' }, heading)),
        // -------- Image Section --------
        div(
          { class: 'bannner-image mob-img' },
          div(
            {},
            img({
              loading: 'eager',
              fetchpriority: 'high',
              alt: '',
              src: `${source}`,
            }),
          ),
        ),
        div(
          { class: 'bottom-content' },
          p({}, description),
          p(
            { class: 'redirections' },
            a({ href: `${fisrtAnchorHref}`, title: `${fisrtAnchorTitle}` }, fisrtAnchorText),
            a({ href: `${secondAnchorHref}`, title: `${secondAnchorTitle}` }, secondAnchorText),
          ),
        ),
      ),
    ),
  );

  block.textContent = '';

  return promotionalBanner;
}

function bannerType4(block) {
  const source = getResponsiveImageSource(block);
  const heading = block.querySelector('h2')?.innerText?.trim() || '';
  const description = getDescriptionText(block);
  block.closest('.promotional-banner-container').style.background = `url(${source}) center / cover no-repeat`;

  // Filter out Dynamic Media anchor tags from buttons
  const buttons = Array.from(block.querySelectorAll('a')).filter((anchor) => {
    const href = anchor.href || '';
    return !href.includes('/adobe/assets/') && !href.includes('delivery-');
  });
  const fisrtAnchorText = buttons[0]?.innerText.trim() || '';
  const fisrtAnchorHref = buttons[0]?.href.trim() || '';
  const fisrtAnchorTitle = buttons[0]?.title.trim() || '';
  const secondAnchorText = buttons[1]?.innerText?.trim() || '';
  const secondAnchorHref = buttons[1]?.href.trim() || '';
  const secondAnchorTitle = buttons[1]?.title.trim() || '';

  const promotionalBanner = div(
    {
      class: 'promotionalbanner promotionalbanner-content block type1',
      'data-block-name': 'promotionalbanner',
      'data-block-status': 'loaded',
    },
    // -------- Content Section --------
    div(
      { class: 'banner-conetent' },
      div(
        { class: 'grid-content' },
        h2({ id: 'upgrade-to-smarter-stronger-rewards' }, heading),
        p({}, description),
        p(
          { class: 'redirections' },
          a({ href: `${fisrtAnchorHref}`, title: `${fisrtAnchorTitle}` }, fisrtAnchorText),
          ' ',
          a({ href: `${secondAnchorHref}`, title: `${secondAnchorTitle}` }, secondAnchorText),
        ),
      ),
    ),
  );
  block.textContent = '';

  return promotionalBanner;
}

export default function decorate(block) {
  const getType = block.classList;

  if (getType.contains('type-1')) {
    block.closest('.promotional-banner-container').classList.add('banner-varient1');
    block.append(bannerType1(block));
  } else if (getType.contains('type-2')) {
    block.closest('.promotional-banner-container').classList.add('banner-varient2');
    block.append(bannerType1(block));
  } else if (getType.contains('type-3')) {
    block.closest('.promotional-banner-container').classList.add('banner-varient3');
    block.append(bannerType3(block));
  } else if (getType.contains('type-4')) {
    block.closest('.promotional-banner-container').classList.add('banner-varient4');
    block.append(bannerType4(block));
  } else {
    block.append(bannerType1(block));
  }
}
