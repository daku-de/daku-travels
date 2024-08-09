import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "DAKU'S TRAVELS",
    description: 'A page used for tracking previous and future journeys.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className}`}>
                <Providers>{children}</Providers>
            </body>
            <Analytics />
        </html>
    );
}
