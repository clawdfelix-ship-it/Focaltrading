import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://focal-trading.com'),
  title: 'Focal Trading Company - Custom Pins, Keychains, Medals & More',
  description: 'Professional custom merchandise including enamel pins, keychains, medals, lanyards, clothing labels and more. Flexible MOQ, fast turnaround.',
  alternates: {
    canonical: 'https://focal-trading.com/',
    languages: {
      'en': 'https://focal-trading.com/en',
      'zh-HK': 'https://focal-trading.com/zh',
    },
  },
  openGraph: {
    title: 'Focal Trading Company - Custom Pins, Keychains, Medals & More',
    description: 'Professional custom merchandise including enamel pins, keychains, medals, lanyards, clothing labels and more. Flexible MOQ, fast turnaround.',
    url: 'https://focal-trading.com/en',
    siteName: 'Focal Trading Company',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Focal Trading Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focal Trading Company - Custom Pins, Keychains, Medals & More',
    description: 'Professional custom merchandise including enamel pins, keychains, medals, lanyards, clothing labels and more. Flexible MOQ, fast turnaround.',
    images: ['/og-default.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Focal Trading Company',
    url: 'https://focal-trading.com',
    logo: 'https://focal-trading.com/favicon.ico',
    description: 'Professional custom merchandise including enamel pins, keychains, medals, lanyards, clothing labels and more.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      addressCountry: 'HK',
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese'],
    },
  };

  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}