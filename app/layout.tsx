import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { portfolioData } from '@/data/portfolio-data';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

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
    <html lang="en" className={`dark h-full ${geistSans.variable} ${geistMono.variable}`}>
      <body className="h-full overflow-hidden antialiased selection:bg-[#32235c] selection:text-[#f8c076] text-[#e2dcff] font-sans">
        {children}
      </body>
    </html>
  );
}
