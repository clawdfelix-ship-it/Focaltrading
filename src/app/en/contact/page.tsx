import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProducts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact Us - Focal Trading Company',
  description: 'Get in touch with Focal Trading Company for custom pins, keychains, medals and more.',
};

export default function EnContactPage() {
  return (
    <>
      <Header lang="en" />
      <main>
        <div className="bg-[#f8f9fa] py-8 border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <nav className="text-sm text-[#6c757d]">
              <Link href="/en/" className="hover:text-[#e94560]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[#333333]">Contact</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h1 className="section-title">Contact Us</h1>

            <div className="grid md:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white border border-[#e9ecef] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a2e] mb-4">Get in Touch</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <span className="text-[#e94560]">📧</span>
                      <div>
                        <div className="font-medium text-[#333333]">Email</div>
                        <div className="text-[#6c757d]">info@focal-trading.com.hk</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[#e94560]">💬</span>
                      <div>
                        <div className="font-medium text-[#333333]">WhatsApp</div>
                        <div className="text-[#6c757d]">TBC</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[#e94560]">📍</span>
                      <div>
                        <div className="font-medium text-[#333333]">Address</div>
                        <div className="text-[#6c757d]">TBC, Hong Kong</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9fa] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">Business Hours</h3>
                  <p className="text-sm text-[#6c757d]">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="md:col-span-3">
                <div className="bg-white border border-[#e9ecef] rounded-lg p-6 md:p-8">
                  <h3 className="font-semibold text-[#1a1a2e] mb-6">Send an Inquiry</h3>
                  <form action="/api/inquiry" method="POST" className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#333333] mb-1">
                          Name <span className="text-[#e94560]">*</span>
                        </label>
                        <input type="text" name="name" required className="input-field" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#333333] mb-1">
                          Email <span className="text-[#e94560]">*</span>
                        </label>
                        <input type="email" name="email" required className="input-field" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#333333] mb-1">Company</label>
                        <input type="text" name="company" className="input-field" placeholder="Company name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#333333] mb-1">Phone</label>
                        <input type="tel" name="phone" className="input-field" placeholder="+852 XXXX XXXX" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1">Product Interest</label>
                      <select name="product" className="input-field">
                        <option value="">Select a product</option>
                        {getProducts().slice(0, 10).map(p => (
                          <option key={p.slug} value={p.slug}>{p.name.en}</option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1">Quantity</label>
                      <input type="text" name="quantity" className="input-field" placeholder="e.g. 300 pcs" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1">Message</label>
                      <textarea name="message" rows={4} className="input-field min-h-[120px] resize-y" placeholder="Tell us about your requirements..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-1">Attach File (optional)</label>
                      <div className="border-2 border-dashed border-[#e9ecef] rounded-lg p-6 text-center hover:border-[#e94560] transition-colors cursor-pointer">
                        <input type="file" name="file" className="hidden" id="file-upload" />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <div className="text-[#6c757d] text-sm">Click to upload or drag and drop</div>
                          <div className="text-xs text-[#6c757d] mt-1">PNG, JPG, PDF up to 10MB</div>
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-4">
                      Send Inquiry
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}