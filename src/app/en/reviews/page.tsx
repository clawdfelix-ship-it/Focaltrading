import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Customer Reviews - Focal Trading Company',
  description: 'See what our customers say about Focal Trading Company custom merchandise.',
  alternates: {
    canonical: 'https://focal-trading.com/en/reviews',
    languages: {
      'en': 'https://focal-trading.com/en/reviews',
      'zh-HK': 'https://focal-trading.com/zh/reviews',
    },
  },
  openGraph: {
    title: 'Customer Reviews - Focal Trading Company',
    description: 'See what our customers say about Focal Trading Company custom merchandise.',
    url: 'https://focal-trading.com/en/reviews',
    siteName: 'Focal Trading Company',
    type: 'website',
    images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: 'Focal Trading Company' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Reviews - Focal Trading Company',
    description: 'See what our customers say about Focal Trading Company custom merchandise.',
    images: ['/og-default.svg'],
  },
};

export default function EnReviewsPage() {
  const reviews = [
    { rating: 5, text: 'Excellent quality and fast delivery! Our school badges came out perfect. The team was very patient with our multiple revisions.', author: 'St. Francis School', date: 'March 2024' },
    { rating: 5, text: 'Very responsive team. Helped us design the perfect challenge coins for our club. Will definitely order again.', author: 'Dragon Lions Club', date: 'February 2024' },
    { rating: 5, text: 'Small order no problem! Got our lanyards done within 3 weeks. Highly recommended for event organizers.', author: 'Green Earth NGO', date: 'January 2024' },
    { rating: 5, text: 'The woven labels quality exceeded our expectations. Perfect for our clothing line. Fair pricing too.', author: 'Urban Thread Co.', date: 'December 2023' },
    { rating: 5, text: 'We have been ordering from Focal Trading for 3 years now. Consistent quality and reliable delivery every time.', author: 'HK Scouts Association', date: 'November 2023' },
    { rating: 5, text: 'Great communication throughout the process. The proof they sent looked exactly like the final product.', author: 'Tech Startup Ltd.', date: 'October 2023' },
  ];

  return (
    <>
      <Header lang="en" />
      <main>
        <div className="bg-[#f8f9fa] py-8 border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <nav className="text-sm text-[#6c757d]">
              <Link href="/en/" className="hover:text-[#e94560]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[#333333]">Reviews</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="section-title">Customer Reviews</h1>
              <p className="text-[#6c757d]">What our customers say about us</p>
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
              <p className="text-[#6c757d] mb-4">Want to share your experience?</p>
              <Link href="/en/contact" className="btn-secondary">Write a Review</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}