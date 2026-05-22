import Link from 'next/link';

export default function Footer({ lang }: { lang: 'zh' | 'en' }) {
  const isZh = lang === 'zh';
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: isZh
      ? [{ href: '/', label: '主頁' }, { href: '/about-us', label: '關於我們' }, { href: '/contact', label: '聯絡我們' }, { href: '/faq', label: '常見問題' }]
      : [{ href: '/en/', label: 'Home' }, { href: '/en/about-us', label: 'Our Story' }, { href: '/en/contact', label: 'Contact' }, { href: '/en/faq', label: 'FAQ' }],
    categories: isZh
      ? [{ href: '/category/custom-pins', label: '襟章' }, { href: '/category/custom-keychains', label: '匙扣' }, { href: '/category/medals-coins', label: '獎牌' }, { href: '/category/lanyards', label: '頸繩' }]
      : [{ href: '/en/category/custom-pins', label: 'Pins' }, { href: '/en/category/custom-keychains', label: 'Keychains' }, { href: '/en/category/medals-coins', label: 'Medals' }, { href: '/en/category/lanyards', label: 'Lanyards' }],
  };

  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Col 1: Brand */}
          <div>
            <div className="font-bold text-lg mb-4" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>Focal Trading</div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isZh
                ? '專業訂製各類金屬紀念品，包括襟章、匙扣、獎牌、頸繩等。靈活小批量訂製，最快10分鐘搞掂。'
                : 'Professional custom merchandise including pins, keychains, medals, lanyards and more. Flexible MOQ, fast turnaround.'}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{isZh ? '快速連結' : 'Quick Links'}</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{isZh ? '產品類別' : 'Categories'}</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{isZh ? '聯絡方式' : 'Contact'}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{isZh ? '電話: 另有安排' : 'Phone: TBC'}</li>
              <li>{isZh ? 'WhatsApp: 另有安排' : 'WhatsApp: TBC'}</li>
              <li>{isZh ? '電郵: info@focal-trading.com.hk' : 'Email: info@focal-trading.com.hk'}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>© {currentYear} Focal Trading Company. {isZh ? '版權所有' : 'All rights reserved'}.</p>
        </div>
      </div>
    </footer>
  );
}