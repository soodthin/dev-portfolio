import type { Metadata } from 'next';
import { Newsreader, Be_Vietnam_Pro, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin', 'vietnamese'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Thai Do Thinh — Software Engineer & FinTech Automation Specialist',
  description: 'Portfolio of Thai Do Thinh (Sood). Specializing in FinTech automation, AI-driven reconciliation pipelines, high-throughput backend systems with FastAPI, Django REST, React, and Next.js.',
  keywords: [
    'Thai Do Thinh',
    'Do Thinh Thai',
    'Software Engineer',
    'FinTech Automation',
    'FastAPI',
    'Django REST Framework',
    'Next.js',
    'React',
    'Vietnam Developer',
  ],
  authors: [{ name: 'Thai Do Thinh' }],
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
    } catch (e) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark min-h-full ${newsreader.variable} ${beVietnamPro.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
