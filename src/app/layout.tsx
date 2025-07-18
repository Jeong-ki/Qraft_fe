import QueryProvider from '@/lib/query-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Qraft',
  description: 'Qraft Disclosure',
};

export default async function RootLayout({
  pc,
  mobile,
}: Readonly<{
  pc: React.ReactNode;
  mobile: React.ReactNode;
}>) {
  const headersList = await headers();
  const { device } = userAgent({ headers: headersList });

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>{device.type === 'mobile' ? mobile : pc}</QueryProvider>
      </body>
    </html>
  );
}
