import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Focal Trading Company - Custom Pins, Keychains, Medals & More',
  description: 'Professional custom merchandise including enamel pins, keychains, medals, lanyards, clothing labels and more. Flexible MOQ, fast turnaround.',
};

export default function EnHomePage() {
  const products = getProducts().slice(0, 8);
  const categories = getCategories();

  return (
    <>
      <Header lang="en" />
      <main>
        {/* Hero */}
        <section className="bg-[#f8f9fa]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a2e] mb-4" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>
                  CUSTOM MADE EASY
                </h1>
                <p className="text-lg text-[#6c757d] mb-8">
                  Making your life easier with our simple ordering service. Starting up is not easy — we are flexible on quantity, small and big!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/en/category/all" className="btn-primary">
                    Start Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                  <Link href="/en/contact" className="btn-secondary">
                    Get a Quote
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
                { icon: '🏆', stat: '25+', label: 'Years Experience' },
                { icon: '📦', stat: '1,000+', label: 'Happy Customers' },
                { icon: '🚀', stat: '50,000+', label: 'Products Delivered/Year' },
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
              <h2 className="section-title mb-0">Popular Products</h2>
              <Link href="/en/category/custom-pins" className="text-[#e94560] text-sm font-medium hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map(p => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  lang="en"
                  href={`/en/products/${p.slug}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#f8f9fa] py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h2 className="section-title text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Choose Product',
                  desc: 'Browse our product categories and select the item you want. Design file can be sent after ordering.',
                },
                {
                  step: '2',
                  title: 'Receive Proof',
                  desc: 'Within 2-3 working days, receive a digital proof for your confirmation before production begins.',
                },
                {
                  step: '3',
                  title: 'Get Your Order',
                  desc: 'After 15-18 working days, receive your finished products delivered to your door.',
                },
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
            <h2 className="section-title text-center mb-12">Product Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map(cat => (
                <Link key={cat.slug} href={`/en/category/${cat.slug}`} className="group">
                  <div className="bg-white border border-[#e9ecef] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="aspect-square bg-gradient-to-br from-[#1a1a2e]/10 to-[#1a1a2e]/5 flex items-center justify-center">
                      <span className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">
                        {cat.name.en.charAt(0)}
                      </span>
                    </div>
                    <div className="p-4 text-center">
                      <span className="font-medium text-[#333333] group-hover:text-[#e94560] transition-colors text-sm">
                        {cat.name.en}
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
            <h2 className="section-title text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Free Proof', desc: 'We provide free proof before production so you can see exactly what you will get.' },
                { title: 'Safety Mark', desc: 'Regular product inspection and testing, obtaining Hong Kong safety certification.' },
                { title: 'No Hidden Cost', desc: 'All pricing are listed as shown — no last minute surprise.' },
              ].map(f => (
                <div key={f.title} className="bg-white rounded-lg p-6 border border-[#e9ecef]">
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#6c757d]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h2 className="section-title text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { rating: 5, text: 'Excellent quality and fast delivery! Our school badges came out perfect.', author: 'St. Francis School', date: 'March 2024' },
                { rating: 5, text: 'Very responsive team. Helped us design the perfect challenge coins for our club.', author: 'Dragon Lions Club', date: 'February 2024' },
                { rating: 5, text: 'Small order no problem! Got our lanyards done within 3 weeks. Highly recommended.', author: 'Green Earth NGO', date: 'January 2024' },
              ].map((r, i) => (
                <div key={i} className="bg-white border border-[#e9ecef] rounded-lg p-6">
                  <div className="text-[#e94560] text-sm mb-3">{'★'.repeat(r.rating)}</div>
                  <p className="text-sm text-[#333333] mb-4 line-clamp-4">"{r.text}"</p>
                  <p className="text-[#6c757d] text-xs font-medium">— {r.author}</p>
                  <p className="text-[#6c757d] text-xs">{r.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1a1a2e] py-16 md:py-20">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Contact us today for a free quote. We will get back to you within 24 hours.
            </p>
            <Link href="/en/contact" className="btn-primary text-base px-8 py-4">
              Get a Free Quote Now
            </Link>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}