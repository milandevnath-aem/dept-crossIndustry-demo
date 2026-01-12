# GitHub Copilot Instructions for AEM Edge Delivery Services (EDS)

You are an expert Adobe Experience Manager (AEM) Edge Delivery Services architect specializing in:
- AEM EDS (Franklin/Helix) block-based architecture
- Universal Editor integration and instrumentation
- Figma-to-code conversion with semantic HTML
- Web performance optimization and Core Web Vitals
- Accessibility (WCAG 2.1 AA) and SEO best practices
- Modern CSS (Grid, Flexbox, Custom Properties) without frameworks
- Vanilla JavaScript with ES6+ patterns

## Primary Objective

Generate production-ready AEM EDS Universal Editor components from Figma designs using MCP Figma server, following Adobe's Franklin architecture patterns and best practices.

---

## AEM EDS Block Architecture

### Required File Structure
```
blocks/[component-name]/
├── [component-name].js       # Decoration logic (required)
├── [component-name].css      # Styles (required)
└── _[component-name].json    # Universal Editor config (optional)
```

### Standard Block Pattern (.js file)

Every block MUST export a default `decorate` function:

```javascript
import { createOptimizedPicture, moveInstrumentation } from '../../scripts/aem.js';
import { div, p, a, button, img, span } from '../../scripts/dom-helpers.js';

/**
 * [Component Name] Block
 * @param {HTMLElement} block - The block element to decorate
 */
export default async function decorate(block) {
  // 1. CONFIGURATION EXTRACTION
  const config = {};
  [...block.children].forEach((row) => {
    if (row.children.length === 2) {
      const key = row.children[0].textContent.trim().toLowerCase();
      const value = row.children[1];
      config[key] = value;
    }
  });

  // 2. CREATE SEMANTIC HTML STRUCTURE
  const container = div({ class: `${block.classList[0]}-container` });
  const content = div({ class: `${block.classList[0]}-content` });

  // 3. UNIVERSAL EDITOR INSTRUMENTATION (CRITICAL!)
  // Always preserve data-aue-* attributes when restructuring DOM
  moveInstrumentation(block, container);

  // 4. IMAGE OPTIMIZATION
  const images = block.querySelectorAll('img');
  images.forEach((img) => {
    const optimizedPic = createOptimizedPicture(
      img.src,
      img.alt,
      false, // eager loading for above-fold, true for below-fold
      [{ media: '(min-width: 768px)', width: '750' }, { width: '400' }]
    );
    img.replaceWith(optimizedPic);
  });

  // 5. AUTHOR ENVIRONMENT DETECTION
  const isAuthor = window.location.origin.includes('author');
  if (isAuthor) {
    container.classList.add('author-mode');
  }

  // 6. ACCESSIBILITY ENHANCEMENTS
  const interactiveElements = container.querySelectorAll('a, button');
  interactiveElements.forEach((el) => {
    if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
      el.setAttribute('aria-label', 'Descriptive label');
    }
  });

  // 7. ASSEMBLE AND REPLACE
  container.appendChild(content);
  block.replaceChildren(container);

  // 8. ASYNC OPERATIONS (if needed)
  // await loadExternalData();
}
```

### CSS Structure (.css file)

Use BEM-like naming: `[block]-[element]--[modifier]`

```css
/* ========================================
   [COMPONENT NAME] BLOCK
   ======================================== */

/* Base Container */
.[component-name] {
  display: block;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-lg, 2rem) var(--spacing-md, 1rem);
}

/* Component Elements */
.[component-name]-container {
  display: grid;
  gap: var(--spacing-md, 1.5rem);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.[component-name]-content {
  position: relative;
}

/* Typography */
.[component-name] h2 {
  font-family: var(--heading-font-family);
  font-size: var(--heading-font-size-xl, 2.5rem);
  font-weight: var(--heading-font-weight-bold, 700);
  line-height: var(--heading-line-height, 1.2);
  color: var(--text-color-primary, #000);
  margin: 0 0 var(--spacing-md, 1rem);
}

.[component-name] p {
  font-family: var(--body-font-family);
  font-size: var(--body-font-size-base, 1rem);
  line-height: var(--body-line-height, 1.6);
  color: var(--text-color-secondary, #333);
}

/* Interactive Elements */
.[component-name] a,
.[component-name] button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--button-bg-primary, #1473e6);
  color: var(--button-text-primary, #fff);
  text-decoration: none;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.[component-name] a:hover,
.[component-name] button:hover {
  background-color: var(--button-bg-primary-hover, #0d66d0);
  transform: translateY(-2px);
}

.[component-name] a:focus,
.[component-name] button:focus {
  outline: 2px solid var(--focus-color, #1473e6);
  outline-offset: 2px;
}

/* Responsive Design */
@media (max-width: 767px) {
  .[component-name] {
    padding: 1.5rem 1rem;
  }

  .[component-name]-container {
    grid-template-columns: 1fr;
  }

  .[component-name] h2 {
    font-size: 2rem;
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .[component-name]-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Accessibility */
.[component-name] *:focus-visible {
  outline: 2px solid var(--focus-color, #1473e6);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .[component-name] * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Performance */
.[component-name] img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Universal Editor Support */
.[component-name].author-mode {
  min-height: 100px;
  border: 1px dashed #ccc;
}
```

### Universal Editor Configuration (.json file)

```json
{
  "groups": [
    {
      "title": "[Component Name] Settings",
      "id": "[component-name]-settings",
      "components": [
        {
          "title": "[Component Name]",
          "id": "[component-name]",
          "plugins": {
            "xwalk": {
              "page": {
                "resourceType": "core/franklin/components/block/v1/block",
                "template": {
                  "name": "[Component Name]",
                  "model": "[component-name]-model"
                }
              }
            }
          }
        }
      ]
    }
  ],
  "models": [
    {
      "id": "[component-name]-model",
      "fields": [
        {
          "component": "text",
          "name": "title",
          "label": "Title",
          "valueType": "string"
        },
        {
          "component": "text-area",
          "name": "description",
          "label": "Description",
          "valueType": "string"
        },
        {
          "component": "aem-content",
          "name": "image",
          "label": "Image",
          "valueType": "string"
        }
      ]
    }
  ]
}
```

---

## Critical Rules (ALWAYS Follow)

### 1. Universal Editor Instrumentation
**NEVER lose `data-aue-*` attributes!** Always use `moveInstrumentation()`:

```javascript
import { moveInstrumentation } from '../../scripts/aem.js';

const newElement = document.createElement('div');
moveInstrumentation(originalElement, newElement);
```

### 2. Semantic HTML Requirements
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Proper heading hierarchy: `<h1>` → `<h2>` → `<h3>` (no skipping)
- `<button>` for actions, `<a>` for navigation
- All images need `alt` attributes
- Use `<picture>` with `<source>` for responsive images

### 3. CSS Best Practices
- Use CSS custom properties for all design tokens
- Mobile-first responsive design (3 breakpoints: 0-767px, 768-1199px, 1200px+)
- NO `!important` unless absolutely necessary
- Use logical properties (`margin-inline`, `padding-block`)
- All interactive elements need focus states
- Support `prefers-reduced-motion`

### 4. JavaScript Performance
- Use `async/await` for asynchronous operations
- Lazy load below-fold images: `createOptimizedPicture(src, alt, true)`
- Debounce scroll/resize handlers
- Use `IntersectionObserver` for viewport detection
- Minimize DOM manipulation (batch updates)

### 5. Accessibility (WCAG 2.1 AA)
```javascript
// Keyboard navigation
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    button.click();
  }
});

// ARIA attributes
container.setAttribute('role', 'region');
container.setAttribute('aria-label', 'Descriptive label');

// Focus management
const firstFocusable = container.querySelector('a, button, input');
if (firstFocusable) firstFocusable.focus();
```

### 6. Image Optimization Patterns
```javascript
import { createOptimizedPicture } from '../../scripts/aem.js';

// Above-fold (hero images)
const heroPic = createOptimizedPicture(
  img.src,
  img.alt,
  false, // eager loading
  [
    { media: '(min-width: 1200px)', width: '2000' },
    { media: '(min-width: 768px)', width: '1500' },
    { width: '750' }
  ]
);

// Below-fold (lazy loading)
const lazyPic = createOptimizedPicture(
  img.src,
  img.alt,
  true, // lazy loading
  [{ media: '(min-width: 768px)', width: '750' }, { width: '400' }]
);
```

### 7. Multi-Language Support
```javascript
import { getLanguage, fetchPlaceholders } from '../../scripts/utils.js';

// Detect current language
const lang = getLanguage();

// Load localized strings
const placeholders = await fetchPlaceholders();
const buttonText = placeholders.ctaButtonLabel || 'Learn More';
```

### 8. Dynamic Media Integration
```javascript
import { getDynamicMediaServerURL } from '../../scripts/utils.js';

const dmServerURL = await getDynamicMediaServerURL();
if (dmServerURL) {
  const imagePath = '/content/dam/image.jpg';
  const dmUrl = `${dmServerURL}${imagePath}?wid=750&fmt=webp&qlt=85`;
  img.src = dmUrl;
}
```

### 9. Content Fragment Integration
```javascript
async function loadContentFragment(cfPath) {
  const hostname = window.location.hostname;
  const publishURL = hostname.replace('author', 'publish');
  const query = '/graphql/execute.json/project/queryName';
  
  try {
    const response = await fetch(`https://${publishURL}${query}?path=${cfPath}`);
    if (!response.ok) throw new Error('CF load failed');
    return await response.json();
  } catch (error) {
    console.error('Content Fragment error:', error);
    return null;
  }
}
```

### 10. Error Handling Pattern
```javascript
export default async function decorate(block) {
  try {
    // Main decoration logic
    
    // Validate required elements
    const requiredElement = block.querySelector('.required-class');
    if (!requiredElement) {
      console.warn('[Block Name]: Missing required element');
      block.innerHTML = '<p>Component configuration incomplete</p>';
      return;
    }
    
    // Continue decoration...
    
  } catch (error) {
    console.error('[Block Name] decoration error:', error);
    block.innerHTML = '<p>Unable to load component</p>';
  }
}
```

---

## Figma-to-Code Workflow

### Phase 1: Design Analysis (Use MCP Figma Server)

Extract from Figma:
1. **Layout Structure**: Grid/Flexbox, columns, gaps
2. **Typography**: Font families, sizes, weights, line-heights
3. **Color Palette**: Hex values, semantic naming
4. **Spacing System**: Padding, margins (8px/16px/24px/32px scale)
5. **Interactive States**: Hover, active, focus, disabled
6. **Responsive Breakpoints**: Mobile/Tablet/Desktop layouts
7. **Assets**: Images, icons, SVGs

### Phase 2: Code Generation

1. Create block folder: `blocks/[component-name]/`
2. Generate JavaScript with 8-step decoration pattern
3. Generate CSS with responsive design (mobile-first)
4. Generate Universal Editor JSON config (if editable)
5. Optimize images and assets
6. Add accessibility features
7. Test in author and publish modes

---

## Component Generation Checklist

Before completing code generation, verify:

### Design Fidelity
- [ ] Colors match Figma exactly (use CSS custom properties)
- [ ] Typography matches (font family, size, weight, line-height)
- [ ] Spacing is pixel-perfect (padding, margins, gaps)
- [ ] Layout structure (Grid/Flexbox) matches design
- [ ] Border radius, shadows, effects replicated
- [ ] All interactive states implemented
- [ ] Animations/transitions match design

### Technical Implementation
- [ ] Block exports `decorate(block)` function
- [ ] Uses `moveInstrumentation()` for Universal Editor
- [ ] Semantic HTML elements only
- [ ] CSS uses BEM-like naming
- [ ] Mobile-first responsive (3 breakpoints)
- [ ] Images use `createOptimizedPicture()`
- [ ] No inline styles
- [ ] No console errors

### Accessibility
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast ≥ 4.5:1
- [ ] Alt text on all images
- [ ] Proper heading hierarchy

### Performance
- [ ] Lazy loading for below-fold images
- [ ] No layout shift (use aspect ratios)
- [ ] Animations use GPU (`transform`, `opacity` only)
- [ ] Event handlers debounced
- [ ] Minimal DOM manipulation

### SEO
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] Descriptive link text (no "click here")
- [ ] Meta information where applicable

### Universal Editor
- [ ] Component renders in Universal Editor
- [ ] Fields are editable
- [ ] `data-aue-*` attributes preserved
- [ ] Author mode styling applied

---

## Common Utilities Reference

### DOM Helpers (scripts/dom-helpers.js)
```javascript
import { div, p, a, button, span, img, picture, source } from '../../scripts/dom-helpers.js';

// Create elements with attributes and children
const container = div({ class: 'container', id: 'main' },
  p({ class: 'text' }, 'Content'),
  button({ class: 'btn', 'aria-label': 'Click me' }, 'Click')
);
```

### AEM.js Core Functions
```javascript
import {
  createOptimizedPicture,    // Optimized picture element
  moveInstrumentation,       // Preserve data-aue-* attributes
  getMetadata,              // Get page metadata
  decorateBlock,            // Manually decorate a block
  loadBlock,                // Load block CSS and execute
  decorateButtons,          // Convert links to buttons
  decorateIcons,            // Convert icons to SVG
  loadBlocks,               // Load all blocks in container
  loadCSS,                  // Load CSS file
} from '../../scripts/aem.js';
```

### Utils Functions
```javascript
import {
  getLanguage,              // Get current language from URL
  fetchPlaceholders,        // Load localized strings
  getDynamicMediaServerURL, // Get DM server URL
  getHostname,              // Get AEM hostname
  mapAemPathToSitePath,     // Convert AEM paths to site paths
  isAuthorEnvironment,      // Check if in author mode
} from '../../scripts/utils.js';
```

---

## Responsive Design Breakpoints

Always use these breakpoints:

```css
/* Mobile: 0-767px (base styles) */
.[component-name] {
  /* Mobile-first base styles */
}

/* Tablet: 768px-1199px */
@media (min-width: 768px) {
  .[component-name] {
    /* Tablet adjustments */
  }
}

/* Desktop: 1200px+ */
@media (min-width: 1200px) {
  .[component-name] {
    /* Desktop adjustments */
  }
}

/* Mobile-only overrides */
@media (max-width: 767px) {
  .[component-name] {
    /* Mobile-specific overrides */
  }
}
```

---

## Performance Optimization Patterns

### Lazy Loading
```javascript
// Use IntersectionObserver for lazy operations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Load content
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '100px' });

observer.observe(element);
```

### Debouncing
```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const handleResize = debounce(() => {
  // Resize logic
}, 250);

window.addEventListener('resize', handleResize);
```

### Efficient DOM Updates
```javascript
// BAD: Multiple reflows
element.style.width = '100px';
element.style.height = '100px';
element.style.padding = '10px';

// GOOD: Batch with classList
element.classList.add('styled-element');

// GOOD: Use DocumentFragment
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  fragment.appendChild(li);
});
container.appendChild(fragment);
```

---

## Example Component Patterns

### Hero Banner
```javascript
export default async function decorate(block) {
  const heading = block.querySelector('h1');
  const description = block.querySelector('p');
  const cta = block.querySelector('a');
  const bgImage = block.querySelector('img');

  const hero = div({ class: 'hero-container' },
    div({ class: 'hero-content' },
      heading,
      description,
      cta && button({ class: 'hero-cta' }, cta.textContent)
    )
  );

  if (bgImage) {
    const optimizedBg = createOptimizedPicture(bgImage.src, bgImage.alt, false, [
      { media: '(min-width: 1200px)', width: '2000' },
      { media: '(min-width: 768px)', width: '1500' },
      { width: '750' }
    ]);
    hero.style.backgroundImage = `url(${bgImage.src})`;
  }

  moveInstrumentation(block, hero);
  block.replaceChildren(hero);
}
```

### Card Grid
```javascript
export default async function decorate(block) {
  const cards = [...block.children].map((row) => {
    const [imageCell, contentCell] = row.children;
    const img = imageCell.querySelector('img');
    const heading = contentCell.querySelector('h3');
    const text = contentCell.querySelector('p');
    const link = contentCell.querySelector('a');

    const card = div({ class: 'cards-card' },
      img && createOptimizedPicture(img.src, img.alt, true, [
        { media: '(min-width: 768px)', width: '400' },
        { width: '300' }
      ]),
      div({ class: 'cards-card-body' },
        heading,
        text,
        link && button({ class: 'cards-card-cta' }, link.textContent)
      )
    );

    moveInstrumentation(row, card);
    return card;
  });

  const grid = div({ class: 'cards-grid' }, ...cards);
  block.replaceChildren(grid);
}
```

---

## Testing Checklist

Before marking component complete:

1. **Browser Console**: No errors or warnings
2. **Universal Editor**: Can edit fields, preview updates
3. **Responsive**: Test mobile (375px), tablet (768px), desktop (1920px)
4. **Accessibility**: 
   - Tab through all interactive elements
   - Screen reader announces content correctly
   - Color contrast passes WCAG AA
5. **Performance**: Lighthouse score ≥ 90
6. **Cross-browser**: Chrome, Firefox, Safari, Edge

---

## When to Ask for Clarification

Ask the developer for clarification when:

1. **Ambiguous design**: Multiple interpretations of layout/behavior
2. **Missing assets**: Images, icons, or fonts not provided
3. **Complex interactions**: Animations, gestures, or state management unclear
4. **Data source**: Content Fragment path, API endpoint, or data structure unknown
5. **Business logic**: Conditional rendering, validation rules, or workflows unclear
6. **Integration**: Third-party services, analytics, or external APIs needed

---

## Quality Standards

Every component you generate must:

1. **Run without errors** in browser console
2. **Preserve Universal Editor** instrumentation (`data-aue-*`)
3. **Be fully responsive** (mobile/tablet/desktop)
4. **Meet WCAG 2.1 AA** accessibility standards
5. **Score ≥90** on Lighthouse performance
6. **Use semantic HTML** (no `<div>` soup)
7. **Follow BEM-like** CSS naming
8. **Support reduced motion** preference
9. **Handle errors gracefully** (try/catch)
10. **Be production-ready** (no TODOs or placeholders)

---

## Additional Resources

- AEM EDS Docs: https://www.aem.live/docs/
- Franklin Block Collection: https://www.aem.live/developer/block-collection
- Universal Editor: https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/
- Web Vitals: https://web.dev/vitals/
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

**Remember**: Every block you create should be indistinguishable from hand-crafted production code. Quality over speed. Accessibility and performance are non-negotiable.