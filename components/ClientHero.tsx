"use client";

import {
  Search,
  MessageSquare,
  CheckCircle,
  Globe,
  Wrench,
  Hammer,
  Paintbrush,
  Zap,
  HardHat,
  Ruler,
  Truck,
} from "lucide-react";
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

export function ClientHero() {
  const [searchValue, setSearchValue] = useState("");
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

  const trustBadges = [
    {
      icon: MessageSquare,
      label: "Real customer reviews",
      color: "text-blue-200",
      bgColor: "bg-white/10",
    },
    {
      icon: CheckCircle,
      label: "Transparent profiles",
      color: "text-green-300",
      bgColor: "bg-white/10",
    },
    {
      icon: Globe,
      label: "Multilingual support",
      color: "text-purple-300",
      bgColor: "bg-white/10",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#0a1f44]">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 opacity-10 animate-float-slow">
          <Wrench className="w-24 h-24 text-blue-300" />
        </div>
        <div className="absolute top-20 right-20 opacity-10 animate-float-medium">
          <Hammer className="w-32 h-32 text-purple-300" />
        </div>
        <div className="absolute bottom-10 left-1/4 opacity-5 animate-float-fast">
          <Paintbrush className="w-20 h-20 text-green-300" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-5 animate-pulse-slow">
          <Zap className="w-16 h-16 text-yellow-300" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 animate-float-slow">
          <HardHat className="w-28 h-28 text-orange-300" />
        </div>
        <div className="absolute top-1/2 left-10 opacity-5 animate-float-medium">
          <Ruler className="w-20 h-20 text-cyan-300" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 opacity-5 animate-float-fast">
          <Truck className="w-24 h-24 text-red-300" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f44]/50 to-[#0a1f44] pointer-events-none"></div>

      <div className="container-custom relative z-10">
        {/* Main Content Container */}
        <div className="max-w-3xl mx-auto">
          {/* Premium Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white text-center mb-8 leading-tight tracking-tighter animate-fade-in">
            Find Verified Specialists on the Costa del Sol
          </h1>

          {/* Elegant Subheading */}
          <p
            className="text-xl md:text-2xl text-blue-100/90 text-center mb-12 leading-relaxed font-light max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Connect with trusted Home Improvement & Maintenance Professionals
            who speak your language.
          </p>

          {/* Premium Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mb-16 animate-scale-in max-w-2xl mx-auto"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative bg-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/10 group">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative flex items-center px-4 md:px-8 py-3 md:py-6 gap-2 md:gap-4">
                <Search
                  className="h-5 w-5 text-gray-400 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    typewriterPlaceholder || "Villa Renovation in Marbella"
                  }
                  className="flex-1 bg-transparent text-base md:text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none font-light transition-opacity duration-500 min-w-0"
                />
                <Button
                  type="submit"
                  className="ml-1 md:ml-2 bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white px-6 md:px-8 py-2 md:py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          {/* Secondary CTA Link */}
          <div
            className="text-center mb-12 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/post-job"
              className="inline-block text-base text-blue-200 hover:text-white font-medium transition-colors duration-300"
            >
              Or describe your project and let us match you →
            </Link>
          </div>

          {/* Trust Badges - Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="mb-12">
            <div className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-0">
              <div className="flex md:grid md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-0 pb-2 md:pb-0 min-w-min md:min-w-auto">
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 md:flex-shrink text-center animate-slide-up"
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <div className="flex justify-center mb-3">
                        <div
                          className={`w-14 h-14 ${badge.bgColor} rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur-sm border border-white/10`}
                        >
                          <Icon
                            className={`h-7 w-7 ${badge.color}`}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                      <p className="text-sm md:text-base font-medium text-blue-100 whitespace-nowrap md:whitespace-normal">
                        {badge.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Location Microcopy */}
          <div
            className="text-center pt-8 border-t border-white/10 animate-fade-in"
            style={{ animationDelay: "0.7s" }}
          >
            <p className="text-xs md:text-sm text-blue-200/60 font-light tracking-wide">
              Serving homeowners across Malaga, Marbella, Mijas, Fuengirola and
              Estepona
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
