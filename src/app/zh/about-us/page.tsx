import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '關於我們 - Focal Trading Company',
  description: '了解 Focal Trading Company 的歷史、使命和對品質的承諾。',
  alternates: {
    canonical: 'https://focal-trading.com/zh/about-us',
    languages: {
      'en': 'https://focal-trading.com/en/about-us',
      'zh-HK': 'https://focal-trading.com/zh/about-us',
    },
  },
  openGraph: {
    title: '關於我們 - Focal Trading Company',
    description: '了解 Focal Trading Company 的歷史、使命和對品質的承諾。',
    url: 'https://focal-trading.com/zh/about-us',
    siteName: 'Focal Trading Company',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Focal Trading Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '關於我們 - Focal Trading Company',
    description: '了解 Focal Trading Company 的歷史、使命和對品質的承諾。',
    images: ['/og-default.jpg'],
  },
};

export default function ZhAboutPage() {
  return (
    <>
      <Header lang="zh" />
      <main>
        <div className="bg-[#f8f9fa] py-8 border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <nav className="text-sm text-[#6c757d]">
              <Link href="/" className="hover:text-[#e94560]">主頁</Link>
              <span className="mx-2">/</span>
              <span className="text-[#333333]">關於我們</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 max-w-3xl">
            <h1 className="section-title">關於我們</h1>
            <div className="space-y-6 text-[#6c757d] leading-relaxed">
              <p>
                Focal Trading Company 於香港成立，使命簡單：讓客製化商品走進每個人。不論是學校社團的100個襟章，還是企業活動的10,000條頸繩——我們都能幫您搞定。
              </p>
              <p>
                創業從來不容易。所以我們在數量上靈活配合，不論大單小單。同時，我們相信優質產品不應有5,000件的起訂量門檻。
              </p>
              <p>
                我們的團隊擁有超過25年的客製化商品行業經驗。與香港及亞洲工廠直接合作，確保產品符合國際品質標準。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
                {[
                  { stat: '25+', label: '年行業經驗' },
                  { stat: '1,000+', label: '滿意客戶' },
                  { stat: '50,000+', label: '每年出貨量' },
                ].map(item => (
                  <div key={item.label} className="text-center bg-[#f8f9fa] rounded-lg p-6">
                    <div className="text-3xl font-bold text-[#e94560]">{item.stat}</div>
                    <div className="text-sm text-[#6c757d] mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-bold text-[#1a1a2e]">我們的承諾</h2>
              <ul className="space-y-2">
                {[
                  '生產前提供免費效果圖——讓您確認成品效果',
                  '無隱藏費用——所有價格透明',
                  '產品符合香港安全認證標準',
                  '24小時內回覆所有查詢',
                ].map(item => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#e94560]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="zh" />
    </>
  );
}