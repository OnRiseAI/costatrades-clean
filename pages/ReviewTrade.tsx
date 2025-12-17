"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Star, MapPin } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { demoTradespeople } from "@/data/tradespeople";

export default function ReviewTrade() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return demoTradespeople.slice(0, 6);
    }

    return demoTradespeople.filter((pro) => {
      const haystack =
        `${pro.businessName} ${pro.tradeCategory} ${pro.location}`.toLowerCase();
      return haystack.includes(value);
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <SEO
        title="Review a Specialist | CostaTrades"
        description="Share your experience with the community. Help other homeowners by reviewing your tradesperson. Your feedback keeps our standards high and safe."
      />

      {/* Hero */}
      <section className="bg-[#0a1f44] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f44]/60 to-[#0a1f44] pointer-events-none" />
        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Who would you like to review?
          </h1>
          <p className="text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto mb-8">
            Search by business name, trade or location to find the right
            specialist.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 group-hover:opacity-40 blur transition duration-500" />
              <div className="relative flex items-center gap-3 bg-white rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Start typing a name, trade or town..."
                  className="flex-1 bg-transparent border-0 outline-none text-sm md:text-base text-slate-900 placeholder:text-slate-400 min-w-0"
                />
                <Button
                  type="button"
                  className="bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white rounded-full px-5 md:px-7 h-9 md:h-10 text-sm font-semibold flex-shrink-0"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs md:text-sm text-blue-200/70">
            Only review specialists you have personally hired and worked with.
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="container-custom pt-10 md:pt-14">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#0a1f44]">
              {query.trim() ? "Search results" : "Popular specialists"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {results.length} {results.length === 1 ? "match" : "matches"}{" "}
              found
            </p>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
            <p className="text-slate-600 mb-2 font-medium">
              We could not find any trades matching your search.
            </p>
            <p className="text-slate-500 text-sm">
              Try searching with a shorter name or just the town where the work
              was done.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((pro) => (
              <div
                key={pro.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between"
              >
                <div className="mb-4">
                  <h3 className="text-base md:text-lg font-bold text-[#0a1f44] mb-1">
                    {pro.businessName}
                  </h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                    {pro.location}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                    {pro.tradeCategory}
                  </p>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold">
                      {pro.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-400 text-xs">
                      ({pro.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <Link href={`/tradesperson/${pro.slug}`} className="mt-auto">
                  <Button className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white font-semibold rounded-xl h-10 text-sm">
                    Write Review
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
