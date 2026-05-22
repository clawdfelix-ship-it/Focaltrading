'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import LanguageToggle from './LanguageToggle';

export default function Header({ lang }: { lang: 'zh' | 'en' }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = {
    zh: [
      { href: '/', label: '主頁' },
      { href: '/category/custom-pins', label: '產品' },
      { href: '/about-us', label: '關於我們' },
      { href: '/contact', label: '聯絡我們' },
      { href: '/faq', label: '常見問題' },
    ],
    en: [
      { href: '/en/', label: 'Home' },
      { href: '/en/category/custom-pins', label: 'Products' },
      { href: '/en/about-us', label: 'Our Story' },
      { href: '/en/contact', label: 'Contact' },
      { href: '/en/faq', label: 'FAQ' },
    ],
  };

  const links = navLinks[lang];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href={lang === 'en' ? '/en/' : '/'} className="flex items-center gap-2">
            <div className="text-[#1a1a2e] font-bold text-xl" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>
              Focal Trading
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#333333] hover:text-[#e94560] transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageToggle lang={lang} />
            <button
              className="md:hidden p-2 text-[#333333]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#e9ecef]">
          <nav className="flex flex-col p-4 gap-1">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 text-sm font-medium text-[#333333] hover:text-[#e94560] hover:bg-[#f8f9fa] rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}