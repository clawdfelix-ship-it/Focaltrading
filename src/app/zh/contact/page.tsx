'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProducts } from '@/lib/data';

export default function ZhContactPage() {
  const products = getProducts().slice(0, 10);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);

    // Add honeypot field
    const honeypot = formData.get('__hp') as string;
    if (honeypot) {
      // Bot detected — silently show success
      setStatus('success');
      return;
    }

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || '出現錯誤，請重試。');
      }
    } catch {
      setStatus('error');
      setErrorMessage('網絡錯誤，請檢查您的連線然後重試。');
    }
  }

  return (
    <>
      <Header lang="zh" />
      <main>
        <div className="bg-[#f8f9fa] py-8 border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <nav className="text-sm text-[#6c757d]">
              <Link href="/zh/" className="hover:text-[#e94560]">主頁</Link>
              <span className="mx-2">/</span>
              <span className="text-[#333333]">聯絡我們</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h1 className="section-title">聯絡我們</h1>

            <div className="grid md:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white border border-[#e9ecef] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a2e] mb-4">聯絡方式</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <span className="text-[#e94560]">📧</span>
                      <div>
                        <div className="font-medium text-[#333333]">電郵</div>
                        <div className="text-[#6c757d]">info@focal-trading.com.hk</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[#e94560]">💬</span>
                      <div>
                        <div className="font-medium text-[#333333]">WhatsApp</div>
                        <div className="text-[#6c757d]">另有安排</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[#e94560]">📍</span>
                      <div>
                        <div className="font-medium text-[#333333]">地址</div>
                        <div className="text-[#6c757d]">香港（另有安排）</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9fa] rounded-lg p-6">
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">辦公時間</h3>
                  <p className="text-sm text-[#6c757d]">
                    星期一至五: 9:00 AM - 6:00 PM<br />
                    星期六: 10:00 AM - 2:00 PM<br />
                    星期日: 休息
                  </p>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="md:col-span-3">
                <div className="bg-white border border-[#e9ecef] rounded-lg p-6 md:p-8">
                  <h3 className="font-semibold text-[#1a1a2e] mb-6">發送查詢</h3>

                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">✅</div>
                      <h4 className="text-xl font-semibold text-[#1a1a2e] mb-2">感謝您的查詢！</h4>
                      <p className="text-[#6c757d] mb-6">
                        我們已收到您的訊息，會在 24 小時內回覆。
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="text-[#e94560] hover:underline"
                      >
                        再次發送查詢
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Honeypot field — hidden from users, bots will fill it */}
                      <input
                        type="text"
                        name="__hp"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        style={{ display: 'none' }}
                      />

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1">
                            姓名 <span className="text-[#e94560]">*</span>
                          </label>
                          <input type="text" name="name" required className="input-field" placeholder="您的姓名" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1">
                            電郵 <span className="text-[#e94560]">*</span>
                          </label>
                          <input type="email" name="email" required className="input-field" placeholder="your@email.com" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1">公司/機構</label>
                          <input type="text" name="company" className="input-field" placeholder="公司名稱" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#333333] mb-1">電話</label>
                          <input type="tel" name="phone" className="input-field" placeholder="+852 XXXX XXXX" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#333333] mb-1">產品</label>
                        <select name="product" className="input-field">
                          <option value="">選擇產品</option>
                          {products.map(p => (
                            <option key={p.slug} value={p.slug}>{p.name.zh}</option>
                          ))}
                          <option value="other">其他</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#333333] mb-1">數量</label>
                        <input type="text" name="quantity" className="input-field" placeholder="例如: 300個" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#333333] mb-1">訊息</label>
                        <textarea name="message" rows={4} className="input-field min-h-[120px] resize-y" placeholder="告訴我們您的需求..." />
                      </div>

                      {status === 'error' && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                          {errorMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === 'loading' ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            發送中...
                          </>
                        ) : (
                          <>
                            發送查詢
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="zh" />
    </>
  );
}