"use client";

import { SEO } from "@/components/SEO";
import { HomeHero } from "@/components/HomeHero";
import { PriceGuideTable } from "@/components/PriceGuideTable";
import { HowItWorks } from "@/components/HowItWorks";
import { AreasWeServe } from "@/components/AreasWeServe";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { FAQSection, getFAQSchema } from "@/components/FAQSection";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { CategoryCard } from "@/components/CategoryCard";
import { ProGrowthBand } from "@/components/ProGrowthBand";
import { WhyCostaTrades } from "@/components/WhyCostaTrades";
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Shovel,
  Droplets,
  Snowflake,
  Key,
} from "lucide-react";

export default function Index() {
  const popularCategories = [
    {
      name: "Plumber",
      slug: "plumbers",
      icon: Wrench,
      isMostRequested: true,
    },
    {
      name: "Electrician",
      slug: "electricians",
      icon: Zap,
    },
    {
      name: "Air Con",
      slug: "air-conditioning",
      icon: Snowflake,
      isMostRequested: true,
    },
    {
      name: "Builder",
      slug: "builders",
      icon: Hammer,
    },
    {
      name: "Painter",
      slug: "painters",
      icon: Paintbrush,
    },
    {
      name: "Gardener",
      slug: "gardeners",
      icon: Shovel,
    },
    {
      name: "Pool Services",
      slug: "pool-maintenance",
      icon: Droplets,
    },
    {
      name: "Locksmith",
      slug: "locksmiths",
      icon: Key,
    },
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CostaTrades",
    url: "https://costatrades.com",
    description:
      "The leading marketplace for verified English-speaking tradespeople on the Costa del Sol.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marbella",
      addressRegion: "Malaga",
      addressCountry: "ES",
    },
    sameAs: [
      "https://www.facebook.com/costatrades",
      "https://www.instagram.com/costatrades",
    ],
  };

  const faqSchema = getFAQSchema();

  // Merge schemas into a graph
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, faqSchema],
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-20 md:pb-0">
      <SEO
        title="Trusted Specialists Costa del Sol | CostaTrades"
        description="Find trusted specialists across the Costa del Sol. Compare quotes from vetted professionals. Post your job for free."
        schema={JSON.stringify(combinedSchema)}
      />

      <main>
        {/* 1. Hero Section */}
        <HomeHero />

        {/* 2. Market Rates (Interactive Price Guide) */}
        <div className="container-custom relative z-20 -mt-8 mb-16">
          <PriceGuideTable />
        </div>

        {/* 3. How It Works (Premium Zig-Zag) */}
        <HowItWorks />

        {/* 4. Popular Trades (Mediterranean Refresh) */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">
                Popular Trades
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Find the right specialist for your home improvement project.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularCategories.map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  name={cat.name}
                  slug={cat.slug}
                  icon={cat.icon}
                  isMostRequested={cat.isMostRequested}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Pro Growth Band (The "Claim" Strategy) */}
        <ProGrowthBand />

        {/* 6. Why CostaTrades? (Trust & Stats) */}
        <WhyCostaTrades />

        {/* 7. FAQ Section (Expanded) */}
        <FAQSection />

        {/* 8. Areas We Cover (SEO Footer) */}
        <AreasWeServe />
      </main>

      {/* Mobile Sticky CTA */}
      <StickyMobileCTA />
    </div>
  );
}
