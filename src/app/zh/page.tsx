import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Focal Trading Company - 專業訂製襟章、匙扣、獎牌',
  description: '專業訂製各類金屬紀念品，包括襟章、匙扣、獎牌、頸繩等。靈活小批量訂製，最快10分鐘搞掂。',
  alternates: {
    canonical: 'https://focal-trading.com/zh',
    languages: {
      'en': 'https://focal-trading.com/en',
      'zh-HK': 'https://focal-trading.com/zh',
    },
  },
  openGraph: {
    title: 'Focal Trading Company - 專業訂製襟章、匙扣、獎牌',
    description: '專業訂製各類金屬紀念品，包括襟章、匙扣、獎牌、頸繩等。靈活小批量訂製，最快10分鐘搞掂。',
    url: 'https://focal-trading.com/zh',
    siteName: 'Focal Trading Company',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Focal Trading Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focal Trading Company - 專業訂製襟章、匙扣、獎牌',
    description: '專業訂製各類金屬紀念品，包括襟章、匙扣、獎牌、頸繩等。靈活小批量訂製，最快10分鐘搞掂。',
    images: ['/og-default.jpg'],
  },
};

export default function ZhHomePage() {
  const products = getProducts().slice(0, 8);
  const categories = getCategories();

  return (
    <>
      <Header lang="zh" />
      <main>
        {/* Hero */}
        <section className="bg-[#f8f9fa]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a2e] mb-4" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>
                  專業金屬紀念品訂製
                </h1>
                <p className="text-lg text-[#6c757d] mb-8">
                  讓您的生活更輕鬆，簡單下單流程。不論數量多寡，我們都能靈活配合！
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/category/all" className="btn-primary">
                    立即開始
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <Link href="/contact" className="btn-secondary">
                    獲取報價
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="w-full max-w-md aspect-square bg-gradient-to-br from-[#e94560]/10 to-[#e94560]/5 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl text-[#e94560]/30">🏆</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-white border-y border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: '🏆', stat: '25+', label: '年行業經驗' },
                { icon: '📦', stat: '1,000+', label: '滿意客戶' },
                { icon: '🚀', stat: '50,000+', label: '每年出貨量' },
              ].map(item => (
                <div key={item.label} className="flex flex-col items-center text-center gap-2">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-2xl font-bold text-[#1a1a2e]">{item.stat}</span>
                  <span className="text-sm text-[#6c757d]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Products */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-8">
              <h2 className="section-title mb-0">熱門產品</h2>
              <Link href="/category/custom-pins" className="text-[#e94560] text-sm font-medium hover:underline">
                查看全部 →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map(p => (
                <ProductCard key={p.slug} product={p} lang="zh" href={`/products/${p.slug}`} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#f8f9fa] py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h2 className="section-title text-center mb-12">訂購流程</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '①', title: '選擇產品', desc: '選擇好產品及確認訂單，設計圖可於下單後以電郵傳送。' },
                { step: '②', title: '效果圖確認', desc: '2-3個工作天內收到效果圖確認並安排生產。' },
                { step: '③', title: '收貨', desc: '15-18個工作天後收到製成品。' },
              ].map(item => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#e94560] text-white flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#6c757d]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h2 className="section-title text-center mb-12">產品類別</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map(cat => (
                <Link key={cat.slug} href={`/category/${cat.slug}`} className="group">
                  <div className="bg-white border border-[#e9ecef] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="aspect-square bg-gradient-to-br from-[#1a1a2e]/10 to-[#1a1a2e]/5 flex items-center justify-center">
                      <span className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">
                        {cat.name.zh.charAt(0)}
                      </span>
                    </div>
                    <div className="p-4 text-center">
                      <span className="font-medium text-[#333333] group-hover:text-[#e94560] transition-colors text-sm">
                        {cat.name.zh}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-[#f8f9fa] py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h2 className="section-title text-center mb-12">為什麼選擇我們</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '免費效果圖', desc: '生產前提供免費效果圖，讓您確認成品效果。' },
                { title: '安全認證', desc: '定期產品檢驗及測試，獲得香港安全認證。' },
                { title: '無隱藏費用', desc: '所有價格清晰顯示，絕無追加費用。' },
              ].map(f => (
                <div key={f.title} className="bg-white rounded-lg p-6 border border-[#e9ecef]">
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#6c757d]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1a1a2e] py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>
              準備好了嗎？
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              立即聯絡我們獲取免費報價。我們會在24小時內回覆您。
            </p>
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              立即獲取免費報價
            </Link>
          </div>
        </section>
      </main>
      <Footer lang="zh" />
    </>
  );
}