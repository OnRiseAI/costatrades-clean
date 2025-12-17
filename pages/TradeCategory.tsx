"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { searchTradespeople, getTradespeopleByCategory } from "@/data/tradespeople";
import { Star, MapPin, Shield, CheckCircle, Phone } from "lucide-react";

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

  // Get tradespeople for this category
  const tradespeople = useMemo(() => {
    if (locationName) {
      return searchTradespeople(category, locationName);
    }
    return getTradespeopleByCategory(category);
  }, [category, locationName]);

  const pageTitle = `${categoryLabel} in ${locationName || "Costa del Sol"} | English & German Speaking`;
  const h1Text = `Top ${tradespeople.length > 10 ? 10 : tradespeople.length} Verified ${categoryLabel} in ${locationName || "Costa del Sol"}`;

  const locationPhrase = locationName
    ? `in ${locationName}`
    : "on the Costa del Sol";
  const defaultDescription = `Find verified ${categoryLabel} ${locationPhrase}. Compare trusted international professionals who speak your language. Get free quotes today.`;

  const metaDescription =
    category === "pool-maintenance"
      ? "Best Pool Maintenance Costa del Sol. Verified, English-speaking pool cleaners. Get free quotes for cleaning, repairs & green water treatment."
      : defaultDescription;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SEO title={pageTitle} description={metaDescription} />

      {/* Hero Header */}
      <div className="bg-[#0a1f44] py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {h1Text}
          </h1>
          <p className="text-blue-200">
            {tradespeople.length} verified professionals available
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        {tradespeople.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-4">
              No professionals found for <strong>{categoryLabel}</strong> in{" "}
              <strong>{locationName || "Costa del Sol"}</strong>.
            </p>
            <Link href="/post-job">
              <Button className="bg-[#0a1f44] hover:bg-[#0a1f44]/90">
                Post a Job Request
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {tradespeople.slice(0, 10).map((tradesperson) => (
              <div
                key={tradesperson.slug}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="w-full md:w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 relative">
                    {tradesperson.profilePhoto ? (
                      <img
                        src={tradesperson.profilePhoto}
                        alt={tradesperson.businessName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400 bg-gray-100">
                        {tradesperson.businessName.charAt(0)}
                      </div>
                    )}
                    {tradesperson.verified && (
                      <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-tl-lg">
                        <Shield className="h-3 w-3" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h2 className="text-xl font-bold text-[#0a1f44] truncate pr-4">
                        {tradesperson.businessName}
                      </h2>
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                        <Star className="h-4 w-4 text-green-600 fill-current" />
                        <span className="font-bold text-green-700">
                          {tradesperson.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-green-600">
                          ({tradesperson.reviewCount})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{tradesperson.location}</span>
                      <span className="text-gray-300">•</span>
                      <span>{tradesperson.yearsInBusiness} years experience</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {tradesperson.tradeCategory}
                      </span>
                      {tradesperson.verified && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 gap-1">
                          <CheckCircle className="h-3 w-3" /> Verified
                        </span>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {tradesperson.jobsCompleted} jobs completed
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 w-full md:w-48 flex-shrink-0">
                    <Link
                      href={`/post-job/results?category=${category}&postcode=${tradesperson.location}`}
                    >
                      <Button className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white font-bold py-6 rounded-xl shadow-sm">
                        Request a quote
                      </Button>
                    </Link>
                    {tradesperson.phone && (
                      <a href={`tel:${tradesperson.phone}`}>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-semibold py-6 rounded-xl"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call now
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
