# Deploy Instructions for Focal Trading Next.js Site

## Prerequisite
You need a Vercel account connected to GitHub. The code is already pushed to:
https://github.com/clawdfelix-ship-it/Focaltrading

## Deploy Steps

### Option 1: Vercel Dashboard (Easiest)
1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import the `Focaltrading` repository from GitHub
4. Framework Preset: Next.js (auto-detected)
5. Build Command: `npm run build`
6. Output Directory: `.next` (auto-filled)
7. Click "Deploy"

### Option 2: Vercel CLI
```bash
cd ~/clones/focal-trading-next
vercel login
vercel --prod
```

## Features Deployed
- Bilingual site: `/` (Chinese) and `/en/` (English)
- Homepage with hero, trust bar, popular products, how it works, categories
- Product category pages (6 categories)
- Product detail pages (16 products)
- Contact page with inquiry form (API route at `/api/inquiry`)
- About Us page
- FAQ page with accordion
- Reviews page
- Mobile-first responsive design
- Red accent color (`#e94560`) from original site

## Environment Variables (Optional)
If you want the inquiry form to actually send emails:
- `RESEND_API_KEY` — Add your Resend API key for email delivery

## Notes
- The inquiry form API route (`/api/inquiry`) currently logs to console.
  To enable email, uncomment the Resend integration in `src/app/api/inquiry/route.ts`
- Product images are placeholders (gradient + initial letter)
  Replace with actual product photos for production
- Contact phone/WhatsApp are placeholder values ("另有安排" / "TBC")
  Update `src/components/Footer.tsx` with real contact info