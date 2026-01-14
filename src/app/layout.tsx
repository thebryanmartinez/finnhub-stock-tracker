import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { StockWatchlistSidebar } from "@/modules/stocks/presentation/components";

import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finnhub Stock Tracker",
  description: "A web application for tracking stocks prices with the Finnhub API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <StockWatchlistSidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
