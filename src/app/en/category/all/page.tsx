import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AllProductsClient from '@/components/AllProductsClient';
import { getProducts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'All Products - Focal Trading Company',
  description: 'Browse all custom merchandise including enamel pins, keychains, medals, lanyards and more.',
  alternates: {
    canonical: 'https://focal-trading.com/en/category/all',
    languages: {
      'en': 'https://focal-trading.com/en/category/all',
      'zh-HK': 'https://focal-trading.com/zh/category/all',
    },
  },
  openGraph: {
    title: 'All Products - Focal Trading Company',
    description: 'Browse all custom merchandise including enamel pins, keychains, medals, lanyards and more.',
    url: 'https://focal-trading.com/en/category/all',
    siteName: 'Focal Trading Company',
    type: 'website',
    images: [
      {
        url: 'https://focal-trading.com/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Focal Trading Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Products - Focal Trading Company',
    description: 'Browse all custom merchandise including enamel pins, keychains, medals, lanyards and more.',
    images: ['https://focal-trading.com/og-default.svg'],
  },
};

export default function EnCategoryAllPage() {
  const products = getProducts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'All Products - Focal Trading Company',
            url: 'https://focal-trading.com/en/category/all',
            description: 'Browse all custom merchandise including enamel pins, keychains, medals, lanyards and more.',
            publisher: {
              '@type': 'Organization',
              name: 'Focal Trading Company',
              url: 'https://focal-trading.com',
            },
          }),
        }}
      />
      <Header lang="en" />
      <main>
        {/* Page Header */}
        <div className="bg-[#f8f9fa] border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-10">
            <nav className="text-sm text-[#6c757d] mb-4">
              <a href="/en/" className="hover:text-[#e94560]">Home</a>
              <span className="mx-2">/</span>
              <span className="text-[#333]">All Products</span>
            </nav>
            <h1 className="text-3xl font-bold text-[#1a1a2e]" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>
              All Products
            </h1>
            <p className="text-[#6c757d] mt-2">
              Browse our full range of custom merchandise
            </p>
          </div>
        </div>

        <AllProductsClient products={products} />
      </main>
      <Footer lang="en" />
    </>
  );
}