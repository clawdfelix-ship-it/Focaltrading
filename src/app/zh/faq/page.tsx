import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '常見問題 - Focal Trading Company',
  description: '關於訂製襟章、匙扣、獎牌等的常見問題。',
  alternates: {
    canonical: 'https://focal-trading.com/zh/faq',
    languages: {
      'en': 'https://focal-trading.com/en/faq',
      'zh-HK': 'https://focal-trading.com/zh/faq',
    },
  },
  openGraph: {
    title: '常見問題 - Focal Trading Company',
    description: '關於訂製襟章、匙扣、獎牌等的常見問題。',
    url: 'https://focal-trading.com/zh/faq',
    siteName: 'Focal Trading Company',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Focal Trading Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '常見問題 - Focal Trading Company',
    description: '關於訂製襟章、匙扣、獎牌等的常見問題。',
    images: ['/og-default.jpg'],
  },
};

export default function ZhFAQPage() {
  const faqs = [
    { q: '最低訂購量是多少？', a: '視產品而定。大部分襟章和匙扣起訂量為50-100個。標籤通常需要1,000個以上。歡迎聯絡我們查詢具體起訂量。' },
    { q: '生產需要多長時間？', a: '標準生產時間為效果圖確認後15-18個工作天。加急訂單可能需要額外費用。' },
    { q: '可以提供免費樣品嗎？', a: '訂購300個以上可享免費樣品。小批量訂單需收取樣品費用，但可在最終訂單中扣除。' },
    { q: '你們接受什麼檔案格式？', a: '我們接受 AI、EPS、PDF 及高清 PNG/JPG 檔案。向量檔案能確保最佳品質。' },
    { q: '提供國際運送嗎？', a: '是的，我們提供全球運送。運費根據重量及目的地計算。' },
    { q: '接受什麼付款方式？', a: '我們接受銀行轉帳、PayPal 及信用卡付款。大批量訂單可另行商量付款條款。' },
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
              <span className="text-[#333333]">常見問題</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 max-w-3xl">
            <h1 className="section-title">常見問題</h1>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-white border border-[#e9ecef] rounded-lg group">
                  <summary className="p-4 cursor-pointer font-medium text-[#333333] list-none flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="text-[#e94560] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-[#6c757d] border-t border-[#e9ecef] pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-8 text-center bg-[#f8f9fa] rounded-lg p-6">
              <p className="text-[#6c757d] mb-4">還有其他問題？</p>
              <Link href="/contact" className="btn-primary">聯絡我們</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="zh" />
    </>
  );
}