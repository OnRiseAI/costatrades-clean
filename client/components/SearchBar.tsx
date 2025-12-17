"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTypewriterPlaceholder } from "@/hooks/useTypewriterPlaceholder";
import { SEARCH_PLACEHOLDERS } from "@/data/searchPlaceholders";

interface SearchBarProps {
  variant?: "hero" | "compact";
}

export function SearchBar({ variant = "hero" }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { t } = useLanguage();

  const typewriterPlaceholder = useTypewriterPlaceholder(SEARCH_PLACEHOLDERS, {
    typeSpeed: 80,
    deleteSpeed: 40,
    pauseMs: 2000,
  });

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();
    if (searchQuery) params.set("option", searchQuery);
    router.push(`/post-job?${params.toString()}`);
  };

  const isHero = variant === "hero";

  if (isHero) {
    return (
      <div className="relative max-w-2xl mx-auto group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
        <div className="relative bg-white rounded-full shadow-2xl flex items-center p-2 transition-transform duration-300 hover:scale-[1.01]">
          <div className="hidden md:block pl-6 pr-4 text-gray-400 flex-shrink-0">
            <Search className="h-6 w-6" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={
              typewriterPlaceholder || "Villa Renovation in Marbella"
            }
            className="flex-1 min-w-0 h-14 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent transition-opacity duration-500"
          />
          <button
            onClick={() => handleSearch()}
            className="bg-[#0a1f44] text-white h-12 w-12 md:w-auto md:px-8 md:h-14 rounded-full font-bold text-lg hover:bg-blue-900 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center flex-shrink-0 mr-1 md:mr-0"
            aria-label="Search"
          >
            <Search className="h-5 w-5 md:hidden" />
            <span className="hidden md:inline">Search</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("hero.searchPlaceholder")}
            className="w-full px-4 py-3 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground group-hover:border-primary/50 transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          className="bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 px-6 flex items-center justify-center rounded-lg text-white font-medium"
        >
          <Search className="mr-2 h-4 w-4" />
          {t("hero.searchButton")}
        </button>
      </div>
    </form>
  );
}
