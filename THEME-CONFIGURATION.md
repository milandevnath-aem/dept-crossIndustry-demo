# Theme Configuration System

## Overview
This system allows you to manage CSS variables through **theme-configurator pages** in AEM, making it easy for authors to customize the site's theme without touching code. The system uses a hierarchical search pattern to find the most relevant theme configuration for each page.

## How It Works

### 1. Create Theme Configurator Page in AEM

**Current Active Method:** Theme Configurator Page with CSS Variable Blocks

**Path Examples:**
- `/content/dept-crossIndustry/us/theme-configurator` (Parent-level theme)
- `/content/dept-crossIndustry/us/en/theme-configurator` (Language-specific theme)

**Page Structure:**
```
Theme Configurator
├── css-variable
│   ├── primary-color
│   └── #B87C4C
├── css-variable
│   ├── secondary-color
│   └── #6366F1
├── css-variable
│   ├── font-family
│   └── 'Inter', sans-serif
├── css-variable
│   ├── font-size-base
│   └── 18px
└── (more css-variable blocks...)
```

### 2. Hierarchical Theme Search

The `loadThemeFromPage()` function in `scripts/scripts.js` automatically searches for theme configurations in this order:

**For page:** `/us/en/theme-preview`

1. **Sibling level**: `/us/en/theme-configurator` (same directory)
2. **Parent level**: `/us/theme-configurator` (parent directory)
3. **Root level**: `/theme-configurator` (site root)
4. **Fallback**: `/theme-configurator-root` (default theme)

**Benefits:**
- Pages can inherit parent themes
- Language-specific theme overrides
- Graceful fallback to default theme
- No configuration needed - automatic discovery

### 3. Automatic Application

The system:
- Searches for the closest theme-configurator page
- Fetches the `.plain.html` version
- Parses all `css-variable` blocks
- Extracts key-value pairs
- Generates CSS variables: `--primary-color: #B87C4C;`
- Injects into `<style id="theme-configuration-styles">` in `<head>`
- Applies before page decoration for immediate effect

## Usage

### Method 1: Auto-Detection (Default) ✅ RECOMMENDED

The system automatically discovers theme configurations using hierarchical search:

```javascript
// For page: /us/en/about-us
// Automatically searches:
// 1. /us/en/theme-configurator
// 2. /us/theme-configurator  
// 3. /theme-configurator
// 4. /theme-configurator-root (fallback)
// No configuration needed!
```

**Example Setup:**
- Create `/us/theme-configurator` for all US pages
- Create `/us/en/theme-configurator` to override for English pages
- System automatically applies most specific theme

### Method 2: Explicit Path

Override the search by passing a specific path:
```javascript
await loadThemeFromPage('/custom/theme-configurator');
```

## Complete CSS Variable Reference

### 🎨 Colors
```
primary-color           - Main brand color (e.g., #007bff)
secondary-color         - Secondary brand color (e.g., #6c757d)
dark-color             - Dark color (e.g., #343a40)
light-color            - Light color (e.g., #f8f9fa)
accent-color           - Accent/highlight color (e.g., #28a745)
background-color       - Page background (e.g., #ffffff)
text-color             - Body text color (e.g., #212529)
text-color-secondary   - Secondary text (e.g., #6c757d)
heading-color          - Heading color (e.g., #212529)
link-color             - Link color (e.g., #007bff)
link-hover-color       - Link hover color (e.g., #0056b3)
border-color           - Border color (e.g., #dee2e6)
error-color            - Error/danger (e.g., #dc3545)
success-color          - Success (e.g., #28a745)
warning-color          - Warning (e.g., #ffc107)
info-color             - Info (e.g., #17a2b8)
```

### ✍️ Typography - Fonts
```
font-family               - Body font (e.g., 'Inter', sans-serif)
heading-font-family       - Heading font (e.g., 'Playfair Display', serif)
monospace-font-family     - Code font (e.g., 'Courier New', monospace)
```

### 📏 Typography - Sizes
```
font-size-base         - Base size (e.g., 16px or 1rem)
font-size-small        - Small text (e.g., 0.875rem)
font-size-large        - Large text (e.g., 1.125rem)
font-size-h1           - H1 (e.g., 2.5rem)
font-size-h2           - H2 (e.g., 2rem)
font-size-h3           - H3 (e.g., 1.75rem)
font-size-h4           - H4 (e.g., 1.5rem)
font-size-h5           - H5 (e.g., 1.25rem)
font-size-h6           - H6 (e.g., 1rem)
```

### ⚖️ Typography - Weights
```
font-weight-light      - Light (e.g., 300)
font-weight-normal     - Normal (e.g., 400)
font-weight-medium     - Medium (e.g., 500)
font-weight-semibold   - Semibold (e.g., 600)
font-weight-bold       - Bold (e.g., 700)
font-weight-extrabold  - Extra bold (e.g., 800)
```

### 📐 Typography - Line Heights
```
line-height-base       - Body line height (e.g., 1.6)
line-height-heading    - Heading line height (e.g., 1.2)
line-height-tight      - Tight (e.g., 1.25)
line-height-relaxed    - Relaxed (e.g., 1.75)
```

### 🔤 Typography - Letter Spacing
```
letter-spacing-normal  - Normal (e.g., 0)
letter-spacing-wide    - Wide (e.g., 0.05em)
letter-spacing-wider   - Wider (e.g., 0.1em)
letter-spacing-tight   - Tight (e.g., -0.02em)
```

### 📦 Spacing
```
spacing-xs             - Extra small (e.g., 0.25rem / 4px)
spacing-sm             - Small (e.g., 0.5rem / 8px)
spacing-md             - Medium (e.g., 1rem / 16px)
spacing-lg             - Large (e.g., 1.5rem / 24px)
spacing-xl             - Extra large (e.g., 2rem / 32px)
spacing-2xl            - 2X large (e.g., 3rem / 48px)
spacing-3xl            - 3X large (e.g., 4rem / 64px)
```

### 🔲 Borders
```
border-width           - Standard width (e.g., 1px)
border-width-thick     - Thick border (e.g., 2px)
border-radius          - Standard radius (e.g., 4px)
border-radius-sm       - Small radius (e.g., 2px)
border-radius-lg       - Large radius (e.g., 8px)
border-radius-xl       - Extra large (e.g., 12px)
border-radius-full     - Full/circle (e.g., 9999px)
```

### 🌟 Shadows & Effects
```
box-shadow             - Standard shadow (e.g., 0 2px 4px rgba(0,0,0,0.1))
box-shadow-sm          - Small shadow (e.g., 0 1px 2px rgba(0,0,0,0.05))
box-shadow-md          - Medium shadow (e.g., 0 4px 6px rgba(0,0,0,0.1))
box-shadow-lg          - Large shadow (e.g., 0 10px 15px rgba(0,0,0,0.1))
box-shadow-xl          - Extra large (e.g., 0 20px 25px rgba(0,0,0,0.15))
text-shadow            - Text shadow (e.g., 1px 1px 2px rgba(0,0,0,0.1))
```

### ⚡ Transitions & Animations
```
transition-speed       - Standard speed (e.g., 0.3s)
transition-speed-fast  - Fast (e.g., 0.15s)
transition-speed-slow  - Slow (e.g., 0.5s)
transition-timing      - Timing function (e.g., ease-in-out)
```

### Essential Minimum Set (Start Here)
```
✅ primary-color
✅ secondary-color
✅ dark-color
✅ light-color
✅ text-color
✅ background-color
✅ font-family
✅ font-size-base
✅ line-height-base
✅ spacing-md
✅ border-radius
✅ transition-speed
```

## Using Theme Variables in CSS

```css
/* In your block CSS files */
.my-block {
  background-color: var(--primary-color);
  font-family: var(--font-family);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
}

.my-block h2 {
  color: var(--secondary-color);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
}

.my-block button {
  ba1. Elegant Neutral Theme
```
Theme Configurator
├── css-variable: primary-color → #B8AE8C (Warm beige/tan)
├── css-variable: secondary-color → #7C8A95 (Slate gray)
├── css-variable: dark-color → #2C3E50 (Deep blue-gray)
├── css-variable: light-color → #F5F5F0 (Warm off-white)
├── css-variable: text-color → #333333 (Charcoal)
├── css-variable: font-family → 'Inter', sans-serif
├── css-variable: font-size-base → 16px
└── css-variable: line-height-base → 1.6
```

### 2. Modern Corporate Blue
```
Theme Configurator
├── css-variable: primary-color → #0066CC
├── css-variable: secondary-color → #5856D6
├── css-variable: dark-color → #1A1A2E
├── css-variable: light-color → #F8F9FA
├── css-variable: accent-color → #00D4FF
├── css-variable: font-family → 'Roboto', sans-serif
├── css-variable: heading-font-family → 'Roboto Condensed', sans-serif
└── css-variable: font-weight-bold → 600
```

### 3. Fresh & Natural Green
```
Theme Configurator
├── css-variable: primary-color → #2ECC71
├── css-variable: secondary-color → #27AE60
├── Hierarchical Theme Inheritance
Child pages automatically inherit the most specific theme:

**Example Structure:**
```
/theme-configurator-root               (Site-wide default)
/us/theme-configurator                 (US region theme)
/us/en/theme-configurator              (English US theme)
/us/en/products/theme-configurator     (Products section theme)
```

**For page:** `/us/en/products/laptop`
- Uses: `/us/en/products/theme-configurator` (most specific)
- Falls back to: `/us/en/theme-configurator`
- Then to: `/us/theme-configurator`
- Finally: `/theme-configurator-root`

### Live Preview with Theme Preview Block

Add the `theme-preview` block to any page to see live theme visualization:
- Hero section with gradient
- Card components
- Typography samples
- Button styles
- Updates automatically when theme changes

### CSS Variable Naming Convention

**In CSS Variable Blocks:**
- Key: `primary-color` or `primary_color` (both work)
- Both convert to: `--primary-color` in CSS
- Use kebab-case for consistency

**Examples:**
```
css-variable: font-size-h1 → --font-size-h1: 2.5rem
css-variable: primary_color → --primary-color: #007bff
css-variable: box-shadow → --box-shadow: 0 2px 4px rgba(0,0,0,0.1)
```
Theme Configurator
├── css-variable: primary-color → #B87C4C (Copper/tan)
├── css-variable: secondary-color → #6366F1 (Indigo)
├── css-variable: dark-color → #313647 (Charcoal)
└── css-variable: light-color → #FAF9FC (Lavender white)
## Example Theme Configurations

### Light Theme
```
| key              | value           |
|------------------|-----------------|
| primary-color    | #007bff         |
| secondary-color  | #6c757d         |
| background-color | #ffffff         |
| texHierarchical Organization**: 
   - Create parent-level themes for regions/languages
   - Override with more specific themes for sections
   - Keep fallback theme simple and universal

2. **Naming Convention**: 
   - Use kebab-case: `primary-color`, `font-size-base`
   - Be semantic: `primary-color` not `blue-color`
   - Group related variables: `font-*`, `spacing-*`, `border-*`

3. **Fallback Values**: 
   - Always define fallbacks in `styles/theme-variables.css`
   - Provide sensible defaults that work without theme

4. **Typography System**:
   - Define complete font stack with fallbacks
   - Set base size (16px) and use rem for everything else
   - Include font-weights you'll actually use

5. **Color System**:
   - Start with 4-6 core colors (primary, secondary, dark, light)
   - Add semantic colors (success, error, warning, info) as needed
   - Ensure sufficient contrast for accessibility

6. **Testing**: 
   - Use theme-preview block to visualize changes
   - Test on multiple devices and browsers
   - Check dark mode compatibility if applicable

7. **Documentation**: 
   - Document available variables for your team
   - Include usage examples in component CSS
   - Note any theme-specific requirements
```
| key              | value           |
|------------------|-----------------|
| primary-color    | #66b3ff         |
| secondary-color  | #b8c1cc         |
| background-color | #1a1a1a         |
| text-color       | #f8f9fa         |
| border-ctheme-configurator page is published
3. Check hierarchical search in console: "Theme configurator found at: /us/theme-configurator"
4. Ensure css-variable blocks are properly formatted (2 rows: key, value)
5. Verify page exists at `/theme-configurator-root` as ultimate fallback

### Variables not applying?
1. Ensure CSS uses `var(--variable-name)` syntax
2. Check if values have proper CSS syntax (units, quotes for fonts)
3. Verify variable names match exactly (case-sensitive)
4. Clear browser cache and hard refresh (Ctrl+Shift+R)
5. Check DevTools computed styles to see actual values

### Hierarchical search not working?
1. Check console logs for search order
2. Verify page paths don't have trailing slashes
3. Ensure `.plain.html` endpoint is accessible
4. CMain Implementation**: `scripts/scripts.js` (loadThemeFromPage function, line ~104)
- **Theme Search Logic**: Hierarchical cascade with fallback
- **Default Variables**: `styles/theme-variables.css`
- **Block Implementation**: `blocks/css-variable/` (renders key-value pairs)
- **Preview Block**: `blocks/theme-preview/` (visualizes theme)
- **AEM Pages**: `/content/dept-crossIndustry/[region]/[lang]/theme-configurator`
- **Fallback**: `/theme-configurator-root` (site-wide default)

## Architecture

### Theme Loading Flow
```
1. Page loads
   ↓
2. loadEager() in scripts.js
   ↓
3. loadThemeFromPage() called
   ↓
4. Hierarchical search begins
   ↓
5. Fetches closest theme-configurator.plain.html
   ↓
6. Parses css-variable blocks
   ↓
7. Generates CSS: --var: value;
   ↓
8. Injects <style> into <head>
   ↓
9. Theme applied globally
   ↓
10. Blocks use var(--var) in their CSS
```

## Example Implementation

See `scripts/scripts.js` line 104-188 for the complete hierarchical search implementation.

Example console output:
```
Theme configurator found at: /us/en/theme-configurator
```

## Related Blocks

- **css-variable**: Renders individual CSS variable key-value pairs
- **theme-configurator**: Container block for css-variable blocks
- **theme-preview**: Live preview of theme applied to components
### Theme Preview not updating?
1. Ensure theme-configuration-styles exists in `<head>`
2. Check if css variables are in `:root`
3. Clear cache and reload page
4. Verify theme-preview block is properly decorated
Child pages automatically inherit the theme from parent pages unless overridden.

### Fallback Values
Define fallback values in `styles/theme-variables.css`:
```css
:root {
  --primary-color: #007bff; /* Used if spreadsheet doesn't load */
  --secondary-color: #6c757d;
}
```

### Dynamic Theme Switching
Switch themes programmatically:
```javascript
// Switch to dark theme
await loadThemeConfiguration('/en/dark-theme-configuration');

// Switch to brand theme
await loadThemeConfiguration('/en/brand-theme-configuration');
```

## Best Practices

1. **Naming Convention**: Use consistent naming (kebab-case or snake_case)
2. **Fallback Values**: Always define fallbacks in CSS
3. **Semantic Names**: Use semantic names (`primary-color` not `blue-color`)
4. **Documentation**: Document available variables in your style guide
5. **Testing**: Test theme changes in preview before publishing

## Troubleshooting

### Theme not loading?
1. Check browser console for errors
2. Verify spreadsheet is published (not just preview)
3. Check JSON URL: `https://[your-site]/[lang]/theme-configuration.json`
4. Verify spreadsheet has `key` and `value` columns

### Variables not applying?
1. Ensure CSS uses `var(--variable-name)`
2. Check if values have proper CSS syntax (units, quotes, etc.)
3. Verify variable names match (including dashes/underscores)

### Override not working?
1. CSS specificity might be higher elsewhere
2. Use `!important` sparingly: `var(--primary-color) !important`
3. Check browser DevTools computed styles

## File Locations

- **Implementation**: `scripts/scripts.js` (loadThemeConfiguration function)
- **Default Variables**: `styles/theme-variables.css`
- **AEM Spreadsheet**: `/content/dept-crossIndustry/[lang]/theme-configuration`
- **Published JSON**: `/[lang]/theme-configuration.json`

## Example Implementation

See `scripts/scripts.js` line ~30 for the complete implementation.

## Support

For questions or issues, refer to:
- `.github/copilot-instructions.md` - Project architecture guide
- `README.md` - General project documentation
