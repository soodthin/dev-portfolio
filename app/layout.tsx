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

const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('soodfolio-theme');
      if (saved === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark min-h-full ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased selection:bg-teal-500/20 selection:text-teal-200 font-sans">
        {children}
      </body>
    </html>
  );
}
