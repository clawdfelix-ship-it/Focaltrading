import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AllProductsClient from '@/components/AllProductsClient';
import { getProducts } from '@/lib/data';

export const metadata: Metadata = {
  title: '所有產品 - Focal Trading',
  description: '瀏覽全部訂製商品，包括琺瑯襟章、匙扣、獎牌、頸繩等。',
  alternates: {
    canonical: 'https://focal-trading.com/zh/category/all',
    languages: {
      'en': 'https://focal-trading.com/en/category/all',
      'zh-HK': 'https://focal-trading.com/zh/category/all',
    },
  },
  openGraph: {
    title: '所有產品 - Focal Trading',
    description: '瀏覽全部訂製商品，包括琺瑯襟章、匙扣、獎牌、頸繩等。',
    url: 'https://focal-trading.com/zh/category/all',
    siteName: 'Focal Trading',
    type: 'website',
    images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: 'Focal Trading' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '所有產品 - Focal Trading',
    description: '瀏覽全部訂製商品，包括琺瑯襟章、匙扣、獎牌、頸繩等。',
    images: ['/og-default.svg'],
  },
};

export default function ZhCategoryAllPage() {
  const products = getProducts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: '所有產品 - Focal Trading',
            url: 'https://focal-trading.com/zh/category/all',
            description: '瀏覽全部訂製商品，包括琺瑯襟章、匙扣、獎牌、頸繩等。',
            publisher: {
              '@type': 'Organization',
              name: 'Focal Trading',
              url: 'https://focal-trading.com',
            },
          }),
        }}
      />
      <Header lang="zh" />
      <main>
        <div className="bg-[#f8f9fa] border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-10">
            <nav className="text-sm text-[#6c757d] mb-4">
              <a href="/zh/" className="hover:text-[#e94560]">主頁</a>
              <span className="mx-2">/</span>
              <span className="text-[#333]">所有產品</span>
            </nav>
            <h1 className="text-3xl font-bold text-[#1a1a2e]" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>
              所有產品
            </h1>
            <p className="text-[#6c757d] mt-2">
              瀏覽我們全部訂製商品
            </p>
          </div>
        </div>

        <AllProductsClient products={products} lang="zh" />
      </main>
      <Footer lang="zh" />
    </>
  );
}