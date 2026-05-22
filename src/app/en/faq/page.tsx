import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FAQ - Focal Trading Company',
  description: 'Frequently asked questions about ordering custom pins, keychains, medals and more.',
};

export default function EnFAQPage() {
  const faqs = [
    { q: 'What is the minimum order quantity?', a: 'It depends on the product. For most pins and keychains, MOQ starts at 50-100 pieces. Labels typically require 1,000+ pieces. Please contact us for specific MOQ details.' },
    { q: 'How long does production take?', a: 'Standard production takes 15-18 working days after proof approval. Rush orders may be available with additional charges.' },
    { q: 'Can I get a free sample?', a: 'We offer free samples when ordering over 300 pieces. For smaller orders, sample fees apply but are deductible from the final order.' },
    { q: 'What file formats do you accept?', a: 'We accept AI, EPS, PDF, and high-resolution PNG/JPG files. Vector files are preferred for best quality.' },
    { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide. Shipping costs are calculated based on weight and destination.' },
    { q: 'What payment methods do you accept?', a: 'We accept bank transfer, PayPal, and credit card payments. Payment terms are negotiable for large orders.' },
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
              <span className="text-[#333333]">FAQ</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 max-w-3xl">
            <h1 className="section-title">Frequently Asked Questions</h1>
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
              <p className="text-[#6c757d] mb-4">Still have questions?</p>
              <Link href="/en/contact" className="btn-primary">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}