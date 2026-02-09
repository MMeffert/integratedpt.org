# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Integrated Physical Therapy (IPT)**, a physical therapy practice in the Madison, WI area with three locations (Madison, Waunakee, Cottage Grove). No build system, framework, or package manager -- just raw HTML, CSS, and images served as static files.

## Architecture

- **Layout**: Table-based layout (legacy pattern), fixed 766px content width. Not a modern responsive design -- the viewport meta tag locks to 765px width.
- **Styling**: Single `styles.css` file containing both a Gantry/RocketTheme framework CSS base (grid system, menu system, slider/mosaic components) and site-specific styles appended at the bottom (lines ~1066+). Site-specific classes: `.m1`-`.m5` (nav image buttons), `.x2`/`.x2l` (text styles), `.copy`/`.copyl` (footer text).
- **Navigation**: Image-based nav buttons using CSS background-image swap on hover (`.m1`/`.m1m` pattern). Nav links: Specialized PT, Locations, Insurance, Forms, About Us. Additional top nav includes Main Page, Telerehab, Contact Us.
- **Homepage**: `index.html` uses a completely different layout above the fold -- a Gantry/RocketTheme div-based structure (`rt-page-surround`, `rt-header-surround`, `rt-showcase-surround`) wrapping an image slider iframe (`slider_files/slider-en.html`). The shared table-based header/nav/footer then appears *below* this section. No other page uses the Gantry div structure.
- **Pages**: Each HTML page duplicates the full header/nav/footer structure (no templating). Shared `<meta>` description and keywords are identical across all pages.
- **Award badges**: The header includes "Best of Madison" award images (2022 Bronze, 2023 Silver, 2025 Silver) that appear across all pages.

## Key Files

- `styles.css` -- All styling. First ~1065 lines are Gantry framework CSS; site-specific styles start at line ~1066.
- `images/` -- All site images including nav buttons (`m1.jpg`-`m5.jpg`, `m1m.jpg`-`m5m.jpg`), backgrounds (`bgr_*`), staff photos, and PDFs.
- `slider_files/` -- Homepage image slider (iframe-based). Includes `slider-en.html`, `adjast-slider.js`, and slide images/CSS.
- `BingSiteAuth.xml` / `google19ebac6a1b17f216.html` -- Search engine verification files. Do not modify or remove.

## Development

No build tools. Open HTML files directly in a browser or use any local HTTP server:
```bash
python3 -m http.server 8000
```

## Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`):
1. OIDC auth via `aws-actions/configure-aws-credentials` (role ARN in GitHub secret)
2. `aws s3 sync` to bucket `integratedpt.org` with `--delete` (excludes `.git/`, `.github/`, `.claude/`, `CLAUDE.md`, `.gitignore`, `.gitattributes`)
3. HTML files get 5-min cache; all other assets get 1-year cache
4. CloudFront invalidation (`/*`) on distribution `E2FEV1DY0V5FHM`

Infrastructure (S3, CloudFront, Route 53, ACM cert) was created manually in 2019 -- no IaC manages it.

## Important Notes

- **No templating**: Header, nav, and footer are copy-pasted across every page. Changes to shared elements must be manually replicated to all 9 HTML files.
- **Image nav**: The main navigation bar is entirely image-based (JPEG background images on table cells with spacer GIFs for click targets). Changing nav labels requires editing the source image files, not HTML text.
