# its-alikhokher.github.io

Personal site of Ali Raza — Frappe & ERPNext developer, Islamabad.
Live at <https://its-alikhokher.github.io/>. Plain HTML/CSS/JS on GitHub Pages, no framework.

## Pages

| Path | What it is |
|------|------------|
| `/` | Intro, current role, skills, integrations, industries, services, FAQ, contact |
| `/projects/` | Project cards, pre-rendered from `assets/projects.js` |
| `/integrations/` | FedEx, Shopify, B2B portal, NPHIES, Moyasar, card gateways, ZKTeco, push notifications |
| `/experience/` | Work history and education |
| `/404.html` | Not-found page (`noindex`) |

## Updating

- **Projects:** edit `assets/projects.js` (newest first), then run `node build.js`.
  It pre-renders the cards into `projects/index.html` so search engines can read them,
  rewrites the projects JSON-LD and regenerates `sitemap.xml`.
- **New page:** add its path to `PAGES` in `build.js`, link it from the nav on every page
  (including `404.html`), give it a canonical URL, Open Graph tags and a `BreadcrumbList`.
- **Photo:** `tools/update-photo.py` regenerates the profile images.

## SEO checklist

Each page has a unique `<title>` (≤ 60 characters, keywords first), a meta description
(≤ 160 characters), a canonical link, Open Graph/Twitter tags and JSON-LD
(`Person`, `WebSite`, `ProfessionalService`, `FAQPage`, `ItemList`, `BreadcrumbList`).
Visible FAQ text must match the `FAQPage` JSON-LD word for word.
