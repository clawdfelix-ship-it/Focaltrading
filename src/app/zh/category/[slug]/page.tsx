import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategoryBySlug } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = ['custom-pins', 'custom-keychains', 'medals-coins', 'custom-clothing-labels', 'lanyards', 'others'];
  return categories.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: 'Category Not Found' };
  return {
    title: `${cat.name.zh} - Focal Trading Company`,
    description: cat.description.zh,
  };
}

export default async function ZhCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  const products = getProducts().filter(p => p.category === slug);

  return (
    <>
      <Header lang="zh" />
      <main>
        <div className="bg-[#f8f9fa] py-3 border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <nav className="text-sm text-[#6c757d]">
              <Link href="/" className="hover:text-[#e94560]">主頁</Link>
              <span className="mx-2">/</span>
              <span className="text-[#333333]">{cat?.name.zh || slug}</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h1 className="section-title">{cat?.name.zh || slug}</h1>
            {cat && <p className="text-[#6c757d] mb-8 max-w-2xl">{cat.description.zh}</p>}

            {products.length === 0 ? (
              <div className="text-center py-16 text-[#6c757d]">
                <p>此類別暫無產品。</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map(p => (
                  <ProductCard key={p.slug} product={p} lang="zh" href={`/products/${p.slug}`} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer lang="zh" />
    </>
  );
}