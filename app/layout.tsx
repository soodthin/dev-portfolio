import type { Metadata } from 'next';
import { portfolioData } from '@/data/portfolio-data';
import { Navbar } from '@/components/navbar';
import './globals.css';

export const metadata: Metadata = {
  title: portfolioData.profile.meta.title,
  description: portfolioData.profile.meta.description,
  keywords: portfolioData.profile.meta.keywords,
  authors: [{ name: portfolioData.profile.name }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased selection:bg-[#32235c] selection:text-[#f8c076] text-[#e2dcff]">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
