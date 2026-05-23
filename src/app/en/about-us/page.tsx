import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Our Story - Focal Trading Company',
  description: 'Learn about Focal Trading Company - our history, mission and commitment to quality custom merchandise.',
  alternates: {
    canonical: 'https://focal-trading.com/en/about-us',
    languages: {
      'en': 'https://focal-trading.com/en/about-us',
      'zh-HK': 'https://focal-trading.com/zh/about-us',
    },
  },
  openGraph: {
    title: 'Our Story - Focal Trading Company',
    description: 'Learn about Focal Trading Company - our history, mission and commitment to quality custom merchandise.',
    url: 'https://focal-trading.com/en/about-us',
    siteName: 'Focal Trading Company',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Focal Trading Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story - Focal Trading Company',
    description: 'Learn about Focal Trading Company - our history, mission and commitment to quality custom merchandise.',
    images: ['/og-default.jpg'],
  },
};

export default function EnAboutPage() {
  return (
    <>
      <Header lang="en" />
      <main>
        <div className="bg-[#f8f9fa] py-8 border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <nav className="text-sm text-[#6c757d]">
              <Link href="/en/" className="hover:text-[#e94560]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[#333333]">Our Story</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 max-w-3xl">
            <h1 className="section-title">Our Story</h1>
            <div className="space-y-6 text-[#6c757d] leading-relaxed">
              <p>
                Focal Trading Company was established in Hong Kong with a simple mission: making custom merchandise accessible to everyone. Whether you need 100 pins for your school club or 10,000 lanyards for a corporate event — we handle it all.
              </p>
              <p>
                Starting a new project is never easy. That is why we are flexible on quantity — small and big orders alike. We believe premium quality should not require minimum orders of 5,000 pieces.
              </p>
              <p>
                Our team has over 25 years of experience in the custom merchandise industry. We work directly with factories in Hong Kong and across Asia to deliver products that meet international quality standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
                {[
                  { stat: '25+', label: 'Years Experience' },
                  { stat: '1,000+', label: 'Happy Customers' },
                  { stat: '50,000+', label: 'Products/Year' },
                ].map(item => (
                  <div key={item.label} className="text-center bg-[#f8f9fa] rounded-lg p-6">
                    <div className="text-3xl font-bold text-[#e94560]">{item.stat}</div>
                    <div className="text-sm text-[#6c757d] mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-bold text-[#1a1a2e]">Our Promise</h2>
              <ul className="space-y-2">
                {[
                  'Free proof before production — see exactly what you will get',
                  'No hidden costs — all prices transparent',
                  'Hong Kong safety certified products',
                  'Reply within 24 hours on all inquiries',
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
      <Footer lang="en" />
    </>
  );
}