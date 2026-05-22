import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Focal Trading Company - Custom Pins, Keychains, Medals & More',
  description: 'Professional custom merchandise including enamel pins, keychains, medals, lanyards, clothing labels and more. Flexible MOQ, fast turnaround.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}