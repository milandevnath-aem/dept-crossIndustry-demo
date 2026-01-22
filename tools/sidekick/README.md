# AEM Sidekick Library Setup

This directory contains the Sidekick Library configuration for displaying block variants to content authors.

## What You Need to Do

### 1. Create the Library Workbook

In SharePoint or Google Drive (at the root of your content repository):

1. Create an Excel file: `/tools/sidekick/library.xlsx`
2. Inside the workbook, create a sheet named `helix-blocks`
3. In the `helix-blocks` sheet, create two columns:
   - Column 1: `name` (the display name of the block)
   - Column 2: `path` (relative path to the block variants document)

**Example:**

| name | path |
|------|------|
| CTA Banner | /tools/sidekick/blocks/cta-banner |
| Cards | /tools/sidekick/blocks/cards |
| Hero | /tools/sidekick/blocks/hero |
| Columns | /tools/sidekick/blocks/columns |

4. **Preview and Publish** the `library.xlsx` file

### 2. Create Block Variant Documents

For each block you want to include in the library:

1. Create a directory: `/tools/sidekick/blocks/` (in SharePoint/Google Drive)
2. For each block, create a Word document with block variants
   - Example: `cta-banner.docx` for the CTA Banner block
3. In the document, add examples of each variation of the block
4. **Separate each variation with a section delimiter** (---) 
5. Optionally add `Library Metadata` to customize display:

**Example Library Metadata Block:**

```
Library Metadata
name: CTA Banner with Dark Background
description: A call-to-action banner with dark theme and background image
searchTags: cta, banner, call to action, dark
```

6. **Preview and Publish** each block variant document

### 3. Example CTA Banner Variants Document Structure

In `/tools/sidekick/blocks/cta-banner.docx`:

```
[CTA Banner Block - Variant 1]
Content goes here...

---

Library Metadata
name: CTA Banner - Dark Theme
description: CTA banner with dark background

---

[CTA Banner Block - Variant 2]
Content goes here...

---

Library Metadata
name: CTA Banner - Light Theme
description: CTA banner with light background

---
```

### 4. Exclude Library Content from Search Indexing

Add to your `fstab.yaml` (if not already present):

```yaml
mountpoints:
  /: ...
  
metadata:
  exclude:
    - /tools/**
```

Or use [bulk metadata](https://www.aem.live/docs/bulk-metadata) to exclude `/tools/**` from indexing.

### 5. Configure Sidekick

The library plugin needs to be added to your sidekick configuration. This is typically done via the Admin API:

```bash
curl -X POST https://admin.hlx.page/config/{org}/sites/{repo}/sidekick.json \
  -H 'content-type: application/json' \
  -H 'x-auth-token: {your-auth-token}' \
  --data '{
    "project": "AEM XWalk Boilerplate",
    "plugins": [{
      "id": "library",
      "title": "Library",
      "environments": ["edit"],
      "url": "/tools/sidekick/library.html",
      "includePaths": ["**.docx**"]
    }]
  }'
```

**Important:** If you already have a sidekick configuration, GET it first and add the library plugin to the existing plugins array.

### 6. Test the Library

1. Open any `.docx` file in SharePoint/Google Drive
2. Open the AEM Sidekick (browser extension)
3. You should see a "Library" button in the sidekick
4. Click it to see your block variants

## Library Metadata Options

You can customize how blocks appear using Library Metadata:

| Property | Description | Example |
|----------|-------------|---------|
| name | Custom display name | `Hero Banner - Full Width` |
| description | Block description | `A full-width hero with background image` |
| searchTags | Comma-separated search terms | `hero, banner, header, jumbotron` |
| type | `section` or `template` | `section` |
| include next sections | Include subsequent sections | `1` or `2` |
| tableHeaderBackgroundColor | Override table color | `#ff3300` |
| contentEditable | Enable/disable editing | `false` |
| disableCopy | Disable copy button | `true` |

## Default vs Section Library Metadata

- **Default Library Metadata**: Place in its own section (applies to all variants)
- **Section Library Metadata**: Place in the same section as the block (overrides default)

## Current Blocks Available

Based on your project structure, you have these blocks that can be added to the library:

- accordion
- action-button
- cards
- carousel
- columns
- content-fragment
- cta-banner ⭐ (newly created)
- dynamicmedia-image
- find-a-doctor
- footer
- forex
- form
- header
- hero
- iframe
- quote
- tabs
- teaser
- video

## Resources

- [Official Documentation](https://www.aem.live/docs/sidekick-library)
- [Example Implementation](https://github.com/dylandepass/boilerplate-with-library)
