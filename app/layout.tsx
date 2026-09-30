import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { portfolioData } from '@/data/portfolio-data';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
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
    <html lang="en" className={`dark h-full ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="h-full overflow-hidden antialiased selection:bg-[#32235c] selection:text-[#f8c076] text-[#e2dcff] font-sans">
        {children}
      </body>
    </html>
  );
}
