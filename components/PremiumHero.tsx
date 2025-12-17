"use client";

import { Search, Shield, FileCheck, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  POST_JOB_CATEGORIES,
  POST_JOB_TOWNS,
} from "@/data/postJobSearchConfig";
import { extractTradeAndLocation } from "@/lib/searchParser";
import { SEARCH_PLACEHOLDERS } from "@/data/searchPlaceholders";
import { useTypewriterPlaceholder } from "@/hooks/useTypewriterPlaceholder";

export function PremiumHero() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const router = useRouter();
  const typewriterPlaceholder = useTypewriterPlaceholder(SEARCH_PLACEHOLDERS, {
    typeSpeed: 80,
    deleteSpeed: 40,
    pauseMs: 2000,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) {
      return;
    }

    const { tradeSlug, location } = extractTradeAndLocation(
      trimmed,
      POST_JOB_CATEGORIES,
      POST_JOB_TOWNS,
    );

    const params = new URLSearchParams();
    params.set("option", trimmed);
    if (tradeSlug) {
      params.set("trade", tradeSlug);
    }
    if (location) {
      params.set("location", location);
    }

    router.push(`/post-job?${params.toString()}`);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Premium Mediterranean Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20"></div>

        {/* Subtle coastal tint with soft blurred imagery effect */}
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.pexels.com/photos/3970132/pexels-photo-3970132.jpeg?auto=compress&cs=tinysrgb&w=2400"
            alt="Costa del Sol lifestyle"
            className="w-full h-full object-cover blur-2xl"
          />
        </div>

        {/* Floating light orbs for premium feel */}
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-gradient-to-tr from-cyan-100/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Main Content Block */}
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-center leading-tight tracking-tight animate-fade-in">
            Find verified English and Spanish speaking specialists across the
            Costa del Sol
          </h2>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-muted-foreground text-center mb-12 leading-relaxed font-light max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Local professionals who pass ID, NIE and insurance checks. Real
            reviews from homeowners. A simple and trusted way to get your
            project done.
          </p>

          {/* Premium Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mb-8 animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative bg-white rounded-full shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden border border-white/80">
              {/* Inner subtle shadow for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent pointer-events-none rounded-full"></div>

              <div className="relative flex items-center px-8 py-5 md:py-6">
                <Search
                  className="h-5 w-5 text-muted-foreground mr-4 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    typewriterPlaceholder || "Villa Renovation in Marbella"
                  }
                  className="flex-1 bg-transparent text-lg text-foreground placeholder-muted-foreground focus:outline-none font-light transition-opacity duration-500"
                />
                <Button
                  type="submit"
                  className="ml-4 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-2.5 rounded-full font-semibold text-base transition-all duration-300 flex-shrink-0"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          {/* Secondary CTA Link */}
          <div className="text-center mb-12">
            <Link
              href="/post-job"
              className="inline-block text-base text-primary hover:text-primary-600 font-medium transition-colors"
            >
              Or describe your project and let us match you →
            </Link>
          </div>

          {/* Trust Row - Three Badges */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 px-4 md:px-0">
            {/* Badge 1 - Fully Verified */}
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100/60 to-blue-50/40 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Shield className="h-8 w-8 text-blue-600" strokeWidth={1.5} />
                </div>
              </div>
              <p className="text-base font-medium text-foreground">
                Fully verified professionals
              </p>
            </div>

            {/* Badge 2 - NIE and Insurance */}
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100/60 to-emerald-50/40 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <FileCheck
                    className="h-8 w-8 text-emerald-600"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <p className="text-base font-medium text-foreground">
                NIE and insurance checked
              </p>
            </div>

            {/* Badge 3 - Star Rating */}
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100/60 to-orange-50/40 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Star
                    className="h-8 w-8 text-orange-600"
                    strokeWidth={1.5}
                    fill="currentColor"
                  />
                </div>
              </div>
              <p className="text-base font-medium text-foreground">
                Average rating 4.8 out of 5
              </p>
            </div>
          </div>

          {/* Service Areas Micro Line */}
          <div className="text-center pt-8 border-t border-gray-200/50">
            <p className="text-sm text-muted-foreground font-light">
              Serving homeowners across Malaga, Marbella, Mijas, Fuengirola and
              Estepona
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
