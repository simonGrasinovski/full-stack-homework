import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import ThemeRegistry from './components/ThemeRegistry';
import ErrorBoundary from './components/ErrorBoundary';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Full Stack Assessment',
  description: 'Numbers and Grades Management Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ErrorBoundary>
          <ThemeRegistry>
            <Navigation />
            <main>
              {children}
            </main>
          </ThemeRegistry>
        </ErrorBoundary>
      </body>
    </html>
  );
}
