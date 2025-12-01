import type { Metadata } from "next";
import React from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Providers } from "./providers";
import "@/global.css";

export const metadata: Metadata = {
  title: "CostaTrades - Find Trusted Specialists on the Costa del Sol",
  description:
    "Hire verified electricians, plumbers, and other tradespeople on the Costa del Sol. Get instant quotes and book appointments online.",
  icons: {
    icon: "https://cdn.builder.io/api/v1/image/assets%2F30dab4e592724986a43fc4d20bfb2e27%2F688e3adc2cd64e55bc8c864b62a74a4a?format=webp&width=128",
  },
  openGraph: {
    title: "CostaTrades - Find Trusted Specialists on the Costa del Sol",
    description:
      "Hire verified electricians, plumbers, and other tradespeople on the Costa del Sol.",
    type: "website",
    locale: "en_US",
    siteName: "CostaTrades",
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
      <body className="font-sans antialiased">
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
