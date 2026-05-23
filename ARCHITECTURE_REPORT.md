# Focal Trading — Architecture Report

> Generated: 2026-05-23
> Analyst: SoftwareArchitect agent (agency-agents)
> Review status: Draft for Felix

---

## Executive Summary

focal-trading-next is a **static bilingual e-commerce site** built with Next.js App Router, serving Hong Kong B2B customers who order custom metal merchandise (pins, keychains, medals, lanyards). The current implementation is a solid MVP but has limited scalability headroom in four critical areas: **data layer**, **i18n strategy**, **SEO**, and **contact/inquiry pipeline**.

**Verdict**: The architecture is appropriate for the current scale (16 products, 6 categories). It will begin to show friction when product count crosses ~50 or when non-technical staff need to manage content. The good news: the migration path is clear and incremental.

---

## 1. Current State Analysis

### 1.1 Architecture Pattern

- **Framework**: Next.js 16 (App Router)
- **Rendering**: Static Site Generation (`output: 'export'`) — no server-side rendering, fully static HTML export to `/out`
- **Routing**: Route groups `/en/` and `/zh/` with duplicate page files per language
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Components**: 4 components — `Header`, `Footer`, `ProductCard`, `LanguageToggle`
- **Data**: Static JSON files in `/src/content/` loaded via `require()` in `lib/data.ts`

### 1.2 Data Layer

```
src/content/products.json   <- 16 products, bilingual (zh/en fields)
src/content/categories.json <- 6 categories, bilingual
src/lib/data.ts             <- getter functions (getProducts, getProductBySlug, etc.)
```

The `require()` calls happen on **every function invocation** — no caching layer. For 16 products this is negligible. At 500+ products this becomes measurable.

**No database**. No API endpoint returning dynamic data. Everything is import-time static.

### 1.3 Multi-language Strategy

Current: **manual route group duplication**

```
/en/page.tsx   <- English homepage
/zh/page.tsx   <- Chinese homepage
/en/products/[slug]/page.tsx
/zh/products/[slug]/page.tsx
...etc
```

Every page has a bilingual data structure embedded in JSON. Component logic checks `lang="en"|"zh"` prop and renders the correct field.

**Pros**: Zero runtime i18n overhead. Simple. Fast.
**Cons**: Code duplication. Every new page = write twice. Easy to drift out of sync.

**No i18n library** (no `next-intl`, no `react-i18next`). Content lives in the JSON files, not in translation keys.

### 1.4 Component Organization

Flat structure. 4 components only:

```
src/components/
  Header.tsx         <- nav + language toggle
  Footer.tsx         <- contact info, links
  ProductCard.tsx    <- product grid card
  LanguageToggle.tsx <- en <-> zh switcher
```

No component library, no design system beyond `globals.css`. No shared UI primitives (Button, Input, etc.) — inline styles everywhere.

### 1.5 Performance Bottlenecks

| Issue | Severity | Impact |
|-------|----------|--------|
| `require()` on every data call — no caching | Low | Negligible at 16 products, matters at 100+ |
| `output: 'export'` means no API routes work at runtime | **High** | Contact form API route only works in dev |
| Images not optimized — `images.unoptimized: true` | **High** | All images served as-is, no WebP/AVIF conversion |
| No lazy loading strategy | Medium | Full page weight loads at once |
| No CDN configuration | Medium | Static files served from Vercel edge, no image CDN |
| `next/font` not used — using system fonts via CSS | Low | Slight CLS risk |

### 1.6 SEO Implementation

**What's done:**
- `Metadata` export on English pages (title, description)
- Chinese pages lack metadata export (copy exists in page body only)

**What's missing:**
- No OpenGraph tags
- No `sitemap.xml`
- No `robots.txt`
- No canonical URLs
- No structured data (JSON-LD / Schema.org)
- No `hreflang` declaration
- No `lang` attribute strategy for html tag
- No alt text on images (images use emoji placeholders)

### 1.7 Contact/Inquiry Flow

Current pipeline:
```
Contact Form -> POST /api/inquiry -> console.log only
                                     |
                              (Resend email commented out)
```

Issues:
- Email integration is commented out (RESEND_API_KEY not set)
- No file upload support for design files
- No validation beyond required fields (name/email)
- No inquiry confirmation email to customer
- No spam protection (no CAPTCHA)

---

## 2. Scalability Challenges

### 2.1 Product Count: 16 -> 100+

**What breaks:**
- `require()` in data.ts reloads entire JSON on every call
- No pagination, no search — category pages show ALL products matching category
- No `/en/category/all` actual page — "View All" links to `/en/category/custom-pins`

**Trigger to act**: When adding the 30th product, implement proper data pagination and a product listing page with pagination or infinite scroll.

### 2.2 Category Count: 6 -> 20+

**What breaks:**
- Category grid on homepage hard-codes `getCategories()` — layout breaks past ~8 categories
- No dedicated category landing pages beyond product listings

**Trigger to act**: When category count exceeds what fits in a 3x4 grid on homepage, implement a dedicated "All Categories" page.

### 2.3 User Accounts / Order Tracking

**What breaks:**
- Entire site is anonymous. No user system.
- No order status tracking, no saved quotations, no inquiry history

**Trigger to act**: When this becomes a requirement, add Supabase Auth. This requires a backend decision (see ADR-003).

### 2.4 Multiple Currencies / International Shipping

**What breaks:**
- All prices hard-coded as "HK$" in JSON
- No currency conversion, no shipping calculator, no international pricing tiers

**Trigger to act**: When international orders become >10% of total inquiries, add a currency selector and region-based pricing.

### 2.5 Real-time Inventory Management

**What breaks:**
- Stock levels don't exist in the current data model
- MOQ shown as static text, no low-stock/out-of-stock indicators

**Trigger to act**: When inventory accuracy becomes a business requirement, move to a database-backed product system.

### 2.6 CMS for Non-Technical Staff

**What breaks:**
- Product JSON files require a developer to update
- No staging/production content workflow, no content approval process

**This is the most pressing scalability issue**: The moment the sales team needs to add a new product or update a price, they need a developer.

**Trigger to act**: When content update frequency > 1/week, implement a headless CMS.

---

## 3. Architecture Decision Records (ADRs)

### ADR-001: Content Management System

**Current State**: All product/category content in `src/content/products.json` and `src/content/categories.json`. Updated by developer only.

**Option A — Stay Static (JSON files)**
- Pros: Zero infrastructure. Fast. No CMS vendor lock-in. Version controllable.
- Cons: Non-technical staff cannot update content. Developer required for every change.

**Option B — Headless CMS (Sanity or Strapi)**
- Pros: Non-technical staff can manage content. Preview mode. Staging workflow. Built-in i18n.
- Cons: New service to pay for (Sanity free tier: 10GB, Strapi self-hosted: requires infra).

**Option C — Notion API as CMS**
- Pros: Staff already know Notion. Free (for small use). API access. Dual-language support.
- Cons: Not designed as CMS. Rate limits. No built-in preview.

**Recommendation**: **Option C — Notion as CMS**. Staff already use Notion. Free. When product count exceeds 50 AND content updates exceed 3/week, migrate to Sanity.

**Decision Trigger**: "When the sales team asks to update a product price without going through a developer, move to Option C."

---

### ADR-002: Backend Strategy

**Current State**: `output: 'export'` means API routes only work in development. Inquiry form is `console.log` only.

**Recommendation**: Remove `output: 'export'` to enable hybrid rendering. Use Vercel serverless for Resend email integration — one `npm install resend` away from working.

**Decision Trigger**: "When you need file upload for design proofs, or need background job processing, switch to hybrid rendering + Vercel serverless."

---

### ADR-003: Database

**Current State**: Static JSON, no database.

**Recommendation**: **Stay static until ADR-001 triggers**. Then move to Supabase (PostgreSQL, generous free tier, auth built-in). Add Prisma ORM.

**Decision Trigger**: "When product count exceeds 100 OR you need user accounts OR real-time inventory, move to Supabase."

---

### ADR-004: Internationalization (i18n) Strategy

**Current State**: Every page duplicated under `/en/` and `/zh/` route groups.

**Recommendation**: **Stay manual until product count exceeds 50 AND content updates exceed 1/week**. At that point the duplication cost outweighs the migration cost to `next-intl`.

**Decision Trigger**: "When adding a new language OR when EN/ZH drift becomes a known maintenance problem, migrate to next-intl."

---

### ADR-005: Image / CDN Strategy

**Current State**: Images are placeholder gradients + letters. `images.unoptimized: true`.

**Recommendation**: **Stay local now**. When real product photos are added, switch to Cloudflare R2 (free tier: 10GB storage, 100GB bandwidth/month). Only code change needed: remove `output: 'export'` + configure R2 bucket.

**Decision Trigger**: "When replacing placeholder images with real product photos, move to R2 + Next.js Image Optimization."

---

### ADR-006: E-commerce Platform

**Current State**: Custom static site with inquiry form. No shopping cart, no checkout, no payments.

**Recommendation**: **Stay custom for now**. B2B custom merchandise (MOQ 100+) works better with inquiry/quotation flow than shopping cart. The form -> email -> WhatsApp conversation IS the actual sales process.

**Decision Trigger**: "When inquiry-to-order conversion tracking becomes critical AND manual order entry is taking >2 hours/day, implement Shopify Storefront API."

---

## 4. Recommended Architecture Evolution Roadmap

### Phase 1: Foundation (Do now — 1-2 hours each)

1. **Fix SEO** — Add OpenGraph tags, sitemap.xml, robots.txt, hreflang, JSON-LD schema
2. **Remove `output: 'export'`** — Switch to hybrid rendering (API routes required for email to work in production)
3. **Configure Resend** — Uncomment email code in `/api/inquiry`, set `RESEND_API_KEY` in Vercel
4. **Add CAPTCHA** — Add a honeypot field or Cloudflare Turnstile to inquiry form
5. **Reserve R2 bucket** — Prepare Cloudflare R2 bucket for when real product photos arrive

### Phase 2: Content Management (Trigger: sales team requests content update)

1. **Notion as CMS** — Connect product/category data to Notion database via Notion API
2. **GitHub Actions sync** — Nightly sync from Notion -> JSON files -> auto-deploy
3. **Preview workflow** — Vercel preview deployments for content changes

### Phase 3: Capability Expansion (Trigger: product count > 50 OR orders > 20/month)

1. **Add search + pagination** — Product listing page with client-side search
2. **Supabase database** — Migrate products to PostgreSQL via Supabase, add Prisma ORM
3. **User accounts** — Supabase Auth for returning customers, inquiry history
4. **next-intl** — Migrate /en/ /zh/ duplication to single-source next-intl

### Phase 4: Full Commerce (Trigger: manual order entry > 2hrs/day)

1. **Shopify Storefront API** — Headless commerce for cart + checkout
2. **WhatsApp integration** — Direct order confirmation via Twilio WhatsApp Business API
3. **Admin dashboard** — Order management UI (Refine.dev or custom Next.js admin)

---

## 5. Immediate Action Items (Top 5)

### 1. CRITICAL — Remove `output: 'export'`

**What**: In `next.config.ts`, remove `output: 'export'` and `images: { unoptimized: true }`.

**Why**: Currently the inquiry form API route **silently fails in production**. The site cannot send emails, cannot have server-side rendering, cannot use Next.js Image Optimization. This is a broken feature that looks working in development.

**Effort**: Low — 10-line config change.

**Risk if not done**: Inquiry form broken in production. You are losing actual customer inquiries and don't know it.

---

### 2. CRITICAL — Configure Resend email integration

**What**: Uncomment the Resend code in `src/app/api/inquiry/route.ts`, set `RESEND_API_KEY` environment variable in Vercel.

**Why**: Every inquiry is `console.log` only. No email is sent. Customers fill the form and hear nothing back.

**Effort**: Low — Get a Resend API key (free tier: 100 emails/day), set env var, uncomment ~5 lines.

**Risk if not done**: Losing inquiries. No follow-up means lost sales.

---

### 3. MEDIUM — Fix SEO gaps

**What**: Add OpenGraph tags to all pages, add `sitemap.xml` and `robots.txt`, add JSON-LD schema for Organization and Product.

**Why**: Currently no OpenGraph tags means shared links show no preview image. No sitemap means Google can't discover all pages. No structured data means no rich search results.

**Effort**: Medium — 2-3 hours for sitemap.xml generator + OpenGraph component + JSON-LD.

**Risk if not done**: Poorer SEO performance. Lower social share click-through rate.

---

### 4. MEDIUM — Add `/en/category/all` page

**What**: Create a proper "all products" page at `/en/category/all` with search and pagination.

**Why**: The homepage "View All ->" links to `/en/category/custom-pins` which only shows one category. Customers can't browse all products.

**Effort**: Medium — New page + URL parameter filtering on existing data layer.

**Risk if not done**: Customers can't discover all 16 products. Reduced cross-selling.

---

### 5. LOW — Add CAPTCHA to inquiry form

**What**: Add a honeypot field or Cloudflare Turnstile to the contact form.

**Why**: Currently zero spam protection on the inquiry form. Honeypot field is free and no-user-friction.

**Effort**: Low — 10 lines of CSS + 1 hidden form field.

**Risk if not done**: Your inbox fills with bot submissions. Real inquiries get lost in noise.

---

## 6. Summary: Decision Triggers Cheat Sheet

| When... | Then do... |
|--------|-----------|
| Sales team asks to update content without a developer | Implement Notion CMS (ADR-001) |
| Product count exceeds 100 | Migrate to Supabase (ADR-003) |
| Email from contact form not sending | Remove `output: 'export'` from next.config.ts |
| Adding real product photos | Set up Cloudflare R2 + remove `output: 'export'` |
| EN/ZH content drift becomes a problem | Migrate to next-intl (ADR-004) |
| Adding a 3rd language | Migrate to next-intl (ADR-004) first |
| Manual order entry > 2hrs/day | Implement Shopify Storefront API (ADR-006) |
| Inquiry-to-order tracking becomes critical | Implement Shopify Storefront API (ADR-006) |
| International orders > 10% of total | Add currency selector + region pricing |
| Inventory accuracy needed | Migrate to Supabase with real-time data (ADR-003) |

---

*Report generated by SoftwareArchitect agent using agency-agents template*
*Claude Code architecture study applied: ADR methodology, trigger-based migration decisions, incremental evolution over big-bang rewrites*
