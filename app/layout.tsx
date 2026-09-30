import type { Metadata } from 'next';
import { portfolioData } from '@/data/portfolio-data';
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
    <html lang="en" className="dark h-full">
      <body className="h-full overflow-hidden antialiased selection:bg-[#32235c] selection:text-[#f8c076] text-[#e2dcff]">
        {children}
      </body>
    </html>
  );
}
