"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { SEO } from "@/components/SEO";

export default function TradeCategory() {
  const params = useParams();
  const searchParams = useSearchParams();
  const category = params?.category as string;
  const locationFromPath = params?.location as string;

  const categoryLabel = useMemo(() => {
    return category
      ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
      : "Trade";
  }, [category]);

  // Check for location from path params first, then query params, then fallback to empty
  const locationName = useMemo(() => {
    if (locationFromPath) {
      return (
        locationFromPath.charAt(0).toUpperCase() +
        locationFromPath.slice(1).replace(/-/g, " ")
      );
    }
    return searchParams?.get("location") || "";
  }, [locationFromPath, searchParams]);

  const pageTitle = `${categoryLabel} in ${locationName || "Costa del Sol"} | English & German Speaking`;
  const h1Text = `Top 10 Verified ${categoryLabel} in ${locationName || "Costa del Sol"}`;

  const locationPhrase = locationName
    ? `in ${locationName}`
    : "on the Costa del Sol";
  const defaultDescription = `Find verified ${categoryLabel} ${locationPhrase}. Compare trusted international professionals who speak your language. Get free quotes today.`;

  const metaDescription =
    category === "pool-maintenance"
      ? "Best Pool Maintenance Costa del Sol. Verified, English-speaking pool cleaners. Get free quotes for cleaning, repairs & green water treatment."
      : defaultDescription;

  return (
    <div className="min-h-screen bg-white font-sans py-12">
      <SEO title={pageTitle} description={metaDescription} />

      <div className="container-custom">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A1E40]">
            {h1Text}
          </h1>
        </header>

        {/* Placeholder for category listings - preserve existing behavior elsewhere */}
        <div className="bg-white rounded-lg border border-slate-100 p-6 shadow-sm">
          <p className="text-sm text-slate-600">
            Showing top professionals for <strong>{categoryLabel}</strong> in{" "}
            <strong>{locationName || "Costa del Sol"}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
