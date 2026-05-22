import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  lang: 'zh' | 'en';
  href: string;
}

export default function ProductCard({ product, lang, href }: ProductCardProps) {
  const name = product.name[lang];
  const price = product.priceRange[lang];
  const cat = product.category;

  // Placeholder gradient based on category
  const gradients: Record<string, string> = {
    'custom-pins': 'from-[#e94560]/10 to-[#e94560]/5',
    'custom-keychains': 'from-[#1a1a2e]/10 to-[#1a1a2e]/5',
    'medals-coins': 'from-yellow-500/10 to-yellow-500/5',
    'custom-clothing-labels': 'from-green-500/10 to-green-500/5',
    'lanyards': 'from-blue-500/10 to-blue-500/5',
    'others': 'from-purple-500/10 to-purple-500/5',
  };
  const gradient = gradients[cat] || 'from-gray-100 to-gray-50';

  return (
    <Link href={href} className="group block">
      <div className="bg-white border border-[#e9ecef] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
        {/* Image */}
        <div className={`aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          {product.images && product.images[0] ? (
            <img src={product.images[0]} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl opacity-40 group-hover:opacity-60 transition-opacity">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div className="p-4">
          <span className="text-xs bg-[#f8f9fa] text-[#6c757d] px-2 py-0.5 rounded mb-2 inline-block">
            {cat}
          </span>
          <h3 className="font-medium text-[#333333] line-clamp-2 text-sm mb-1" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>
            {name}
          </h3>
          <p className="text-xs text-[#6c757d]">{price}</p>
          <div className="mt-3 flex items-center gap-1 text-[#e94560] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>{lang === 'zh' ? '立即查詢' : 'Get Quote'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}