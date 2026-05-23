/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' removed — required for API routes to work in production
  // Re-enable ONLY if deploying to pure static host (S3/Cloudflare Pages)
  images: {
    // unoptimized: true removed — re-enable when using Cloudflare R2 or similar CDN
  },
  basePath: '',
};

export default nextConfig;