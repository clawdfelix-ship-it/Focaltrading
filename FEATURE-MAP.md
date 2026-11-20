# FEATURE MAP — Focaltrading

> Purpose: single unambiguous map of the product so requests like "the left sidebar thing" resolve without guessing.
> Generated from the actual route tree: 2026-11-20. Update when a page, flow, or role changes.

---

## 1. Product in one paragraph

Bilingual (zh-HK / en) product catalogue and lead-generation site for Focal Trading Company.
Static content driven from JSON; visitors browse categories and products, read reviews and FAQ,
and submit an enquiry that reaches the team via WhatsApp or the inquiry API.
No accounts, no cart, no checkout — conversion is enquiry-based.

---

## 2. Personas and roles

| Role | Description | Permissions | Entry point |
|---|---|---|---|
| Visitor | Any anonymous reader | Read all public pages | `/` or `/en` |

There is no admin role and no authentication. Admin work happens in the CMS/content JSON, not in-app.

---

## 3. Page inventory

| Route | Page name | Purpose | Roles | Key elements |
|---|---|---|---|---|
| `/` | Home (zh, default) | Landing page, default locale | visitor | Header, hero, featured products, Footer |
| `/zh` | Home (zh, explicit) | Explicit zh home | visitor | same as `/` |
| `/en` | Home (en) | English landing page | visitor | Header, hero, featured products, Footer |
| `/zh/category/all` | All products (zh) | Full catalogue | visitor | AllProductsClient, filters |
| `/en/category/all` | All products (en) | Full catalogue | visitor | AllProductsClient, filters |
| `/zh/category/[slug]` | Category (zh) | One category listing | visitor | ProductCard grid |
| `/en/category/[slug]` | Category (en) | One category listing | visitor | ProductCard grid |
| `/zh/products/[slug]` | Product detail (zh) | One product | visitor | gallery, price, specs, enquiry CTA |
| `/en/products/[slug]` | Product detail (en) | One product | visitor | gallery, price, specs, enquiry CTA |
| `/zh/reviews` | Reviews (zh) | Customer reviews | visitor | review list |
| `/en/reviews` | Reviews (en) | Customer reviews | visitor | review list |
| `/zh/faq` | FAQ (zh) | Frequently asked questions | visitor | accordion list |
| `/en/faq` | FAQ (en) | Frequently asked questions | visitor | accordion list |
| `/zh/about-us` | About (zh) | Company profile | visitor | static content |
| `/en/about-us` | About (en) | Company profile | visitor | static content |
| `/zh/contact` | Contact (zh) | Enquiry form | visitor | form, contact details |
| `/en/contact` | Contact (en) | Enquiry form | visitor | form, contact details |

Route count: 17 page files (2 locales x 7 pages + 2 locale roots + 1 redirect root).

---

## 4. Core user flows

### Flow A — Browse to enquiry

```
1. User lands on /zh or /en
2. Clicks a category in Header nav
3. Lands on /{locale}/category/{slug}
4. Clicks a ProductCard
5. Lands on /{locale}/products/{slug}
6. Clicks enquiry CTA (WhatsAppButton or contact link)
7. Result: WhatsApp opens pre-filled, or /{locale}/contact form is shown
```

### Flow B — Browse everything

```
1. User lands on /zh or /en
2. Clicks "All products" in Header nav
3. Lands on /{locale}/category/all
4. AllProductsClient applies client-side filters
5. Result: filtered product grid, no page reload
```

### Flow C — Submit an enquiry

```
1. User opens /{locale}/contact
2. Fills the form
3. POST /api/inquiry
4. Result: success message on success, inline error on failure
```

### Flow D — Switch language

```
1. User clicks LanguageToggle in Header
2. Current path is rewritten to the other locale, preserving path depth and query string
3. Result: same page in the other language, no lost position
```

---

## 5. Key UI regions

| Region | Location | Contains | Stable identifier |
|---|---|---|---|
| Header | top of every page | logo, nav links, locale switcher | `Header.tsx` |
| Locale switcher | inside Header | zh / en toggle, preserves path | `LanguageToggle.tsx` |
| Footer | bottom of every page | links, legal, contact | `Footer.tsx` |
| Product card | catalogue grids | image, name, price | `ProductCard.tsx` |
| Catalogue client | /category/all | filter state, grid rendering | `AllProductsClient.tsx` |
| Floating WhatsApp CTA | fixed, all pages | contact shortcut | `WhatsAppButton.tsx` |

Note: there is no left sidebar in this product. Admin-style sidebars do not exist here.

---

## 6. Data model

Content is static JSON under `src/content/`. Types live in `src/lib/types.ts`,
loading logic in `src/lib/data.ts`.

| Entity | Source | Main fields | Related |
|---|---|---|---|
| Product | `src/content/products.json` | slug, name, nameEn, price, category, images, specs | category |
| Category | `src/content/categories.json` | slug, name, nameEn, parent | product |

---

## 7. API surface

| Method | Path | Purpose | Auth |
|---|---|---|---|
| POST | `/api/inquiry` | Submit a product enquiry | none (public) |

---

## 8. Non-negotiable rules

| Rule | Enforced by |
|---|---|
| Every page has a zh and en variant under a matching path | CI build + route tree review |
| Language switch preserves the current path | `LanguageToggle.tsx` + manual QA |
| TypeScript strict mode must pass | `tsc --noEmit` in CI |
| Lint must pass with zero errors | `npm run lint` in CI |
| No secrets in the repo | `scripts/scan-secrets.sh` in CI + pre-commit hook |
| Prices render as reference price only, not a live quote | `priceRange` label + copy review |

---

## 9. Known gaps

- No automated tests (no test runner configured); CI covers lint, typecheck, build only.
- `/api/inquiry` has no rate limiting or spam protection.
- Prices are static in JSON and require a content edit to change.

