# Block Variants Template

This file explains how to create block variant documents in SharePoint/Google Drive.

## Directory Structure in SharePoint/Google Drive

```
/tools/
  /sidekick/
    library.xlsx           (Excel workbook with helix-blocks sheet)
    library.html           (already created in Git repo)
    README.md              (already created in Git repo)
    /blocks/               (create this in SharePoint/Google Drive)
      cta-banner.docx      (Word document with CTA Banner variants)
      cards.docx           (Word document with Cards variants)
      hero.docx            (Word document with Hero variants)
      ...
```

## Example: CTA Banner Variants Document (cta-banner.docx)

Create this document in SharePoint/Google Drive at `/tools/sidekick/blocks/cta-banner.docx`

### Content Structure:

---

**Section 1: Default Library Metadata (Optional - applies to all variants)**

| Library Metadata |  |
|------------------|--|
| description | Call-to-action banner component with various themes and layouts |
| searchTags | cta, banner, call to action, contact, get in touch |
| tableHeaderBackgroundColor | #1B1B1E |

---

**Section 2: CTA Banner - Dark Theme**

| CTA Banner |  |
|------------|--|
| Content | **We're here when you need us.**<br><br>Work with advisors who understand your goals, simplify the complex, and guide you toward long-term financial growth with clarity and confidence. |
| CTA Text | Get in Touch |
| CTA Link | /contact/dept-demo |
| Background Image | ![benefit-card](https://example.com/path/to/benefit-card.png) |

| Library Metadata |  |
|------------------|--|
| name | CTA Banner - Dark Theme |
| description | CTA banner with dark background (#1B1B1E) and decorative background image |

---

**Section 3: CTA Banner - Light Theme**

| CTA Banner |  |
|------------|--|
| Content | **Ready to get started?**<br><br>Our team is here to help you achieve your financial goals. Schedule a consultation today. |
| CTA Text | Schedule Now |
| CTA Link | /schedule |
| Background Image | ![light-bg](https://example.com/path/to/light-background.png) |

| Library Metadata |  |
|------------------|--|
| name | CTA Banner - Light Theme |
| description | CTA banner with light background and alternative styling |

---

**Section 4: CTA Banner - No Image**

| CTA Banner |  |
|------------|--|
| Content | **Questions? We have answers.**<br><br>Connect with our support team for immediate assistance. |
| CTA Text | Contact Support |
| CTA Link | /support |

| Library Metadata |  |
|------------------|--|
| name | CTA Banner - No Background Image |
| description | Minimal CTA banner without background image |

---

## Library Metadata Properties Explained

### Required in library.xlsx

In the `helix-blocks` sheet of `library.xlsx`:

| name | path |
|------|------|
| CTA Banner | /tools/sidekick/blocks/cta-banner |

### Optional in Block Variants Document

**Default Library Metadata** (in its own section):
- Applies to ALL variants in the document
- Must be the only content in its section

**Section Library Metadata** (in same section as block):
- Applies to specific variant
- Overrides default metadata

### Available Properties:

| Property | Type | Description |
|----------|------|-------------|
| name | string | Display name in library (overrides block name) |
| description | string | Description shown to authors |
| searchTags | string | Comma-separated search terms |
| type | string | `template` or `section` |
| include next sections | number | How many sections to include (e.g., 1, 2) |
| tableHeaderBackgroundColor | hex color | Table header color (e.g., #1B1B1E) |
| tableHeaderForegroundColor | hex color | Table header text color (e.g., #FFFFFF) |
| contentEditable | boolean | Enable/disable editing in preview |
| disableCopy | boolean | Disable copy button |
| hideDetailsView | boolean | Hide details panel |

## Steps to Implement

### 1. In SharePoint/Google Drive:

1. Create `/tools/sidekick/` folder structure
2. Create `library.xlsx` with `helix-blocks` sheet
3. Add block entries (name and path columns)
4. Create `/tools/sidekick/blocks/` folder
5. Create Word documents for each block with variants
6. Use section delimiters (---) between variants
7. Add Library Metadata blocks as needed
8. **Preview and Publish** all documents

### 2. In Your Code Repository (Git):

✅ Already done:
- `library.html` created
- `README.md` created
- Next step: Update sidekick config

### 3. Configure Sidekick API:

Run the API call to add the library plugin to your sidekick configuration (see README.md for details)

### 4. Test:

1. Open any `.docx` file in SharePoint/Google Drive
2. Open AEM Sidekick browser extension
3. Click "Library" button
4. Browse and search for block variants
5. Click to preview and copy blocks to your document

## Tips

- **Section Delimiters**: Use `---` (3 dashes) to separate variants
- **Images**: Use actual images from your DAM or placeholder images
- **Links**: Use relative paths starting with `/`
- **Search**: Add relevant searchTags to make blocks easy to find
- **Naming**: Use descriptive names that indicate the variant/use case
- **Testing**: Always preview blocks in different viewports (mobile/tablet/desktop)
- **Metadata**: Use default metadata for common properties, section metadata for specific overrides

## Example Search Tags

Good search tags help authors find blocks quickly:

- **CTA Banner**: `cta, banner, call to action, contact, button, get in touch`
- **Hero**: `hero, banner, header, jumbotron, featured, highlight`
- **Cards**: `cards, grid, features, services, products`
- **Columns**: `columns, layout, grid, split, multi-column`
- **Form**: `form, contact, input, fields, submit`

## Common Issues

1. **Block not showing**: Make sure document is published
2. **Wrong content**: Check section delimiters are correct
3. **Library not loading**: Verify library.json path in library.html
4. **Images not showing**: Check image URLs and encoding settings
5. **Can't copy**: Check disableCopy is not set to true

## Next Steps

After setting up the library:

1. Create variant documents for your most-used blocks
2. Add searchTags to improve discoverability
3. Create templates for common page layouts
4. Train authors on using the library
5. Gather feedback and add more variants as needed
