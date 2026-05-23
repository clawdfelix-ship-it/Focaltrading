'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

const PRODUCTS_PER_PAGE = 12;

interface AllProductsClientProps {
  products: Product[];
  initialSearch?: string;
}

export default function AllProductsClient({ products, initialSearch = '' }: AllProductsClientProps) {
  const [search, setSearch] = useState(initialSearch);

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      p =>
        p.name.en.toLowerCase().includes(q) ||
        p.name.zh.includes(q) ||
        p.description.en.toLowerCase().includes(q) ||
        p.description.zh.includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const [page, setPage] = useState(1);

  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="bg-white border-b border-[#e9ecef] sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#e9ecef] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]/20 focus:border-[#e94560]"
              />
              {search && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6c757d] hover:text-[#333]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="text-sm text-[#6c757d] self-center">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6c757d] text-lg mb-2">No products found for "{search}"</p>
            <button onClick={() => handleSearch('')} className="text-[#e94560] hover:underline text-sm">
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {paginated.map(p => (
                <ProductCard key={p.slug} product={p} lang="en" href={`/en/products/${p.slug}`} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 rounded border border-[#e9ecef] flex items-center justify-center text-sm text-[#6c757d] hover:bg-[#f8f9fa] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-10 h-10 rounded border text-sm flex items-center justify-center ${
                      n === page
                        ? 'bg-[#e94560] text-white border-[#e94560]'
                        : 'border-[#e9ecef] text-[#6c757d] hover:bg-[#f8f9fa]'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 rounded border border-[#e9ecef] flex items-center justify-center text-sm text-[#6c757d] hover:bg-[#f8f9fa] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}