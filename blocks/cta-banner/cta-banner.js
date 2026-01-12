import { createOptimizedPicture, moveInstrumentation } from '../../scripts/aem.js';
import { div, p, h2, button } from '../../scripts/dom-helpers.js';

/**
 * CTA Banner Block
 * A full-width call-to-action banner with heading, description, CTA button, and background image
 * @param {HTMLElement} block - The block element to decorate
 */
export default async function decorate(block) {
  try {
    // 1. CONFIGURATION EXTRACTION
    const config = {};
    const rows = [...block.children];
    
    rows.forEach((row) => {
      if (row.children.length >= 2) {
        const key = row.children[0].textContent.trim().toLowerCase().replace(/\s+/g, '-');
        const value = row.children[1];
        config[key] = value;
      }
    });

    // Extract content elements
    const heading = config.heading?.querySelector('h1, h2, h3, h4, h5, h6') 
      || config.heading?.querySelector('p')
      || config.heading;
    const description = config.description?.querySelector('p') || config.description;
    const ctaElement = config.cta?.querySelector('a') || config.cta;
    const backgroundImage = config['background-image']?.querySelector('img') 
      || config.background?.querySelector('img')
      || block.querySelector('img');

    // 2. CREATE SEMANTIC HTML STRUCTURE
    const container = div({ class: 'cta-banner-container' });
    
    // Background image layer
    if (backgroundImage) {
      const bgLayer = div({ class: 'cta-banner-background' });
      const optimizedBg = createOptimizedPicture(
        backgroundImage.src,
        backgroundImage.alt || 'Background decoration',
        false, // eager loading for above-fold CTA
        [
          { media: '(min-width: 1200px)', width: '2000' },
          { media: '(min-width: 768px)', width: '1500' },
          { width: '750' }
        ]
      );
      bgLayer.appendChild(optimizedBg);
      container.appendChild(bgLayer);
    }

    // Content wrapper
    const contentWrapper = div({ class: 'cta-banner-content' });

    // Text content area
    const textContent = div({ class: 'cta-banner-text' });

    // Heading
    if (heading) {
      const h2Element = h2({ class: 'cta-banner-heading' });
      h2Element.textContent = heading.textContent || "We're here when you need us.";
      textContent.appendChild(h2Element);
    }

    // Description
    if (description) {
      const descElement = p({ class: 'cta-banner-description' });
      descElement.textContent = description.textContent 
        || "Work with advisors who understand your goals, simplify the complex, and guide you toward long-term financial growth with clarity and confidence.";
      textContent.appendChild(descElement);
    }

    contentWrapper.appendChild(textContent);

    // CTA Button
    if (ctaElement) {
      const ctaButton = div({ class: 'cta-banner-cta' });
      const buttonElement = button({ 
        class: 'cta-banner-button',
        'aria-label': ctaElement.textContent || 'Get in Touch'
      });
      buttonElement.textContent = ctaElement.textContent || 'Get in Touch';
      
      // If original was a link, preserve the href
      if (ctaElement.tagName === 'A') {
        buttonElement.onclick = (e) => {
          e.preventDefault();
          window.location.href = ctaElement.href;
        };
        buttonElement.setAttribute('data-href', ctaElement.href);
      }
      
      ctaButton.appendChild(buttonElement);
      contentWrapper.appendChild(ctaButton);
    }

    container.appendChild(contentWrapper);

    // 3. UNIVERSAL EDITOR INSTRUMENTATION (CRITICAL!)
    moveInstrumentation(block, container);

    // 4. AUTHOR ENVIRONMENT DETECTION
    const isAuthor = window.location.origin.includes('author') 
      || window.location.pathname.includes('.html');
    if (isAuthor) {
      container.classList.add('author-mode');
    }

    // 5. ACCESSIBILITY ENHANCEMENTS
    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', 'Call to action banner');

    // Keyboard navigation for button
    const btn = container.querySelector('.cta-banner-button');
    if (btn) {
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    }

    // 6. ASSEMBLE AND REPLACE
    block.replaceChildren(container);

  } catch (error) {
    console.error('[CTA Banner] decoration error:', error);
    block.innerHTML = '<p class="cta-banner-error">Unable to load CTA banner</p>';
  }
}
