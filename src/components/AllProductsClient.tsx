'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

const PRODUCTS_PER_PAGE = 12;

interface AllProductsClientProps {
  products: Product[];
}

export default function AllProductsClient({ products }: AllProductsClientProps) {
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

  return (
    <section className="py-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearch}
              className="input-field pl-10"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6c757d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-sm text-[#6c757d] mt-2">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
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
                  lang="en"
                  href={`/en/products/${p.slug}`}
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
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-[#6c757d]">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-[#e9ecef] rounded-lg text-sm hover:bg-[#f8f9fa] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#6c757d]">No products match your search.</p>
            <button
              onClick={() => { setSearch(''); setPage(1); }}
              className="mt-4 text-[#e94560] hover:underline text-sm"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}