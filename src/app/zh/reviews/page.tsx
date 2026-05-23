import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '客戶評價 - Focal Trading Company',
  description: '看看客戶對 Focal Trading Company 客製化商品的評價。',
  alternates: {
    canonical: 'https://focal-trading.com/zh/reviews',
    languages: {
      'en': 'https://focal-trading.com/en/reviews',
      'zh-HK': 'https://focal-trading.com/zh/reviews',
    },
  },
  openGraph: {
    title: '客戶評價 - Focal Trading Company',
    description: '看看客戶對 Focal Trading Company 客製化商品的評價。',
    url: 'https://focal-trading.com/zh/reviews',
    siteName: 'Focal Trading Company',
    type: 'website',
    images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: 'Focal Trading Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '客戶評價 - Focal Trading Company',
    description: '看看客戶對 Focal Trading Company 客製化商品的評價。',
    images: ['/og-default.svg'],
  },
};

export default function ZhReviewsPage() {
  const reviews = [
    { rating: 5, text: '品質卓越，交貨快捷！學校的校徽效果完美。團隊對我們多次修改非常耐心。', author: '聖法蘭西斯學校', date: '2024年3月' },
    { rating: 5, text: '團隊非常積極回應。幫助我們設計了完美的俱樂部挑戰硬幣。一定會再訂購！', author: '龍獅會', date: '2024年2月' },
    { rating: 5, text: '小批量完全沒問題！3週內收到頸繩。活動籌辦者強烈推薦。', author: '綠色地球NGO', date: '2024年1月' },
    { rating: 5, text: '織嘜品質超出預期。非常適合我們的服裝系列。價格公道。', author: 'Urban Thread Co.', date: '2023年12月' },
    { rating: 5, text: '我們已經在 Focal Trading 訂購了3年。每次品質穩定，交貨可靠。', author: '香港童軍總會', date: '2023年11月' },
    { rating: 5, text: '整個過程溝通順暢。他們發的效果圖和最終成品一模一樣。', author: '科技 startup', date: '2023年10月' },
  ];

  return (
    <>
      <Header lang="zh" />
      <main>
        <div className="bg-[#f8f9fa] py-8 border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <nav className="text-sm text-[#6c757d]">
              <Link href="/" className="hover:text-[#e94560]">主頁</Link>
              <span className="mx-2">/</span>
              <span className="text-[#333333]">客戶評價</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="section-title">客戶評價</h1>
              <p className="text-[#6c757d]">听听客户对我们的评价</p>
              <div className="text-[#e94560] text-2xl mt-2">★★★★★ <span className="text-[#6c757d] text-base">5.0/5.0</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <div key={i} className="bg-white border border-[#e9ecef] rounded-lg p-6">
                  <div className="text-[#e94560] text-sm mb-3">{'★'.repeat(r.rating)}</div>
                  <p className="text-sm text-[#333333] mb-4">"{r.text}"</p>
                  <p className="text-[#6c757d] text-xs font-medium">— {r.author}</p>
                  <p className="text-[#6c757d] text-xs">{r.date}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-[#6c757d] mb-4">想分享您的經驗？</p>
              <Link href="/zh/contact" className="btn-secondary">撰寫評價</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="zh" />
    </>
  );
}