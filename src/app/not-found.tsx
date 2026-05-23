import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header lang="en" />
      <main>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl font-bold text-[#e94560] mb-4">404</div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] mb-4">Page Not Found</h1>
            <p className="text-[#6c757d] mb-8">
              Sorry, the page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/en/" className="btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer lang="en" />
    </>
  );
}