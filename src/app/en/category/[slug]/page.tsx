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
    title: `${cat.name.en} - Focal Trading Company`,
    description: cat.description.en,
    alternates: {
      canonical: `https://focal-trading.com/en/category/${slug}`,
      languages: {
        'en': `https://focal-trading.com/en/category/${slug}`,
        'zh-HK': `https://focal-trading.com/zh/category/${slug}`,
      },
    },
    openGraph: {
      title: `${cat.name.en} - Focal Trading Company`,
      description: cat.description.en,
      url: `https://focal-trading.com/en/category/${slug}`,
      siteName: 'Focal Trading Company',
      type: 'website',
      images: [{ url: '/og-default.svg', width: 1200, height: 630, alt: cat.name.en }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cat.name.en} - Focal Trading Company`,
      description: cat.description.en,
      images: ['/og-default.svg'],
    },
  };
}

export default async function EnCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  const products = getProducts().filter(p => p.category === slug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://focal-trading.com/en/' },
      { '@type': 'ListItem', position: 2, name: cat?.name.en || slug, item: `https://focal-trading.com/en/category/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header lang="en" />
      <main>
        <div className="bg-[#f8f9fa] py-3 border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <nav className="text-sm text-[#6c757d]">
              <Link href="/en/" className="hover:text-[#e94560]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[#333333]">{cat?.name.en || slug}</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <h1 className="section-title">{cat?.name.en || slug}</h1>
            {cat && <p className="text-[#6c757d] mb-8 max-w-2xl">{cat.description.en}</p>}

            {products.length === 0 ? (
              <div className="text-center py-16 text-[#6c757d]">
                <p>No products in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map(p => (
                  <ProductCard key={p.slug} product={p} lang="en" href={`/en/products/${p.slug}`} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer lang="en" />
    </>
  );
}