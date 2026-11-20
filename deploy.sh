#!/bin/bash
# Deploy Focal Trading Next.js site to Vercel
# Run this after `vercel login`

cd "$(dirname "$0")"

echo "Deploying to Vercel..."
npx vercel --prod

echo ""
echo "Deployment complete!"
echo "To set up custom domain, go to Vercel dashboard."