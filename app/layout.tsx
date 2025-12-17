import type { Metadata } from "next";
import React from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Providers } from "./providers";
import "../global.css";

export const metadata: Metadata = {
  title: {
    default: "Find Tradespeople Costa del Sol | CostaTrades",
    template: "%s | CostaTrades",
  },
  description:
    "Find verified tradespeople on the Costa del Sol. Electricians, plumbers, builders with real reviews. Free quotes from local professionals.",
  openGraph: {
    title: "Find Tradespeople Costa del Sol | CostaTrades",
    description:
      "Find verified tradespeople on the Costa del Sol. Electricians, plumbers, builders with real reviews.",
    type: "website",
    locale: "en_US",
    siteName: "CostaTrades",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Tradespeople Costa del Sol | CostaTrades",
    description: "Find verified tradespeople on the Costa del Sol. Free quotes from local professionals.",
  },
  alternates: {
    canonical: "https://costatrades.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}