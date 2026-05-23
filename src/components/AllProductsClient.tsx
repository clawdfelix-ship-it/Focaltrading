'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

const PRODUCTS_PER_PAGE = 12;

interface AllProductsClientProps {
  products: Product[];
  lang?: 'en' | 'zh';
}

export default function AllProductsClient({ products, lang = 'en' }: AllProductsClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = products.filter(p =>
    p.name.en.toLowerCase().includes(search.toLowerCase()) ||
    p.name.zh.includes(search) ||
    p.category.includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const start = (page - 1) * PRODUCTS_PER_PAGE;
  const visible = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setPage(1);
  }

  const productLabel = lang === 'zh' ? '產品' : 'product';
  const foundLabel = lang === 'zh' ? '找到' : 'found';
  const noResultLabel = lang === 'zh' ? '沒有符合您搜尋的產品。' : 'No products match your search.';
  const clearLabel = lang === 'zh' ? '清除搜尋' : 'Clear search';
  const prevLabel = lang === 'zh' ? '上一頁' : 'Previous';
  const nextLabel = lang === 'zh' ? '下一頁' : 'Next';
  const pageLabel = lang === 'zh' ? '頁' : 'Page';

  return (
    <section className="py-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder={lang === 'zh' ? '搜尋產品...' : 'Search products...'}
              value={search}
              onChange={handleSearch}
              className="input-field pl-10"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-sm text-[#6c757d] mt-2">
            {filtered.length} {foundLabel} {filtered.length === 1 ? productLabel : productLabel}
          </p>
        </div>

        {/* Product Grid */}
        {visible.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {visible.map(p => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  lang={lang}
                  href={`/${lang}/products/${p.slug}`}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-[#e9ecef] rounded-lg text-sm hover:bg-[#f8f9fa] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {prevLabel}
                </button>
                <span className="px-4 py-2 text-sm text-[#6c757d]">
                  {pageLabel} {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-[#e9ecef] rounded-lg text-sm hover:bg-[#f8f9fa] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {nextLabel}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#6c757d]">{noResultLabel}</p>
            <button
              onClick={() => { setSearch(''); setPage(1); }}
              className="mt-4 text-[#e94560] hover:underline text-sm"
            >
              {clearLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}