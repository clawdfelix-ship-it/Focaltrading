import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const products = getProducts();
  const product = products.find(p => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name.en} - Focal Trading Company`,
    description: product.description.en,
    alternates: {
      canonical: `https://focal-trading.com/en/products/${slug}`,
      languages: {
        'en': `https://focal-trading.com/en/products/${slug}`,
        'zh-HK': `https://focal-trading.com/zh/products/${slug}`,
      },
    },
    openGraph: {
      title: `${product.name.en} - Focal Trading Company`,
      description: product.description.en,
      url: `https://focal-trading.com/en/products/${slug}`,
      siteName: 'Focal Trading Company',
      type: 'website',
      images: product.images && product.images[0] ? [{ url: product.images[0], width: 800, height: 800, alt: product.name.en }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name.en} - Focal Trading Company`,
      description: product.description.en,
      images: product.images && product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function EnProductPage({ params }: Props) {
  const { slug } = await params;
  const products = getProducts();
  const product = products.find(p => p.slug === slug);
  if (!product) return <div>Product not found</div>;

  const related = products.filter(p => p.slug !== slug && p.category === product.category).slice(0, 4);
  const cat = product.category;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name.en,
    description: product.description.en,
    image: product.images || [],
    offers: {
      '@type': 'Offer',
      price: product.priceRange.en,
      availability: 'https://schema.org/InStock',
      url: `https://focal-trading.com/en/products/${slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://focal-trading.com/en/' },
      { '@type': 'ListItem', position: 2, name: cat.replace('-', ' '), item: `https://focal-trading.com/en/category/${cat}` },
      { '@type': 'ListItem', position: 3, name: product.name.en, item: `https://focal-trading.com/en/products/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Header lang="en" />
      <main>
        <div className="bg-[#f8f9fa] py-3 border-b border-[#e9ecef]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <nav className="text-sm text-[#6c757d]">
              <Link href="/en/" className="hover:text-[#e94560]">Home</Link>
              <span className="mx-2">/</span>
              <Link href={`/en/category/${product.category}`} className="hover:text-[#e94560]">{product.category.replace('-', ' ')}</Link>
              <span className="mx-2">/</span>
              <span className="text-[#333333]">{product.name.en}</span>
            </nav>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name.en}
                    className="aspect-square w-full object-cover rounded-xl mb-4"
                  />
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-[#e94560]/10 to-[#e94560]/5 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-8xl text-[#e94560]/30">{product.name.en.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-3" style={{fontFamily: 'Noto Sans HK, sans-serif'}}>
                  {product.name.en}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-[#6c757d] mb-6">
                  <span>MOQ: {product.minOrder.en}</span>
                  <span>•</span>
                  <span className="font-medium text-[#e94560]">{product.priceRange.en}</span>
                </div>
                <p className="text-[#6c757d] mb-6 leading-relaxed">{product.description.en}</p>

                <div className="border-b border-[#e9ecef] mb-6">
                  <div className="flex gap-6">
                    {['Specs', 'Description', 'Lead Time'].map((tab, i) => (
                      <button key={tab} className={`pb-3 text-sm font-medium border-b-2 transition-colors ${i === 0 ? 'border-[#e94560] text-[#e94560]' : 'border-transparent text-[#6c757d] hover:text-[#333333]'}`}>
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f8f9fa] rounded-lg p-4 text-sm text-[#6c757d] whitespace-pre-line mb-6">
                  {product.specs.en}
                </div>

                <Link href="/en/contact" className="btn-primary w-full justify-center py-4 text-base">
                  Get a Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-[#f8f9fa] py-12 md:py-16">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6">
              <h2 className="section-title">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {related.map(p => (
                  <ProductCard key={p.slug} product={p} lang="en" href={`/en/products/${p.slug}`} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer lang="en" />
    </>
  );
}