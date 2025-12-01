"use client";

import { useState, useEffect } from "react";
import { Clock, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface RecentSearch {
  trade: string;
  location: string;
  timestamp: number;
}

export function RecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Load recent searches from localStorage
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSearches(parsed.slice(0, 5)); // Show max 5 recent searches
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  const removeSearch = (index: number) => {
    const updated = searches.filter((_, i) => i !== index);
    setSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const clearAll = () => {
    setSearches([]);
    localStorage.removeItem("recentSearches");
  };

  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Recent Searches</h3>
        </div>
        <button
          onClick={clearAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-2">
        {searches.map((search, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-border hover:border-primary transition-colors group"
          >
            <Link
              href={`/post-job?option=${encodeURIComponent(search.trade)}&postcode=${encodeURIComponent(search.location)}`}
              className="flex-1 flex items-center gap-3"
            >
              <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                {search.trade}
              </span>
              {search.location && (
                <>
                  <span className="text-muted-foreground">in</span>
                  <span className="text-muted-foreground">
                    {search.location}
                  </span>
                </>
              )}
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeSearch(index);
              }}
              className="text-muted-foreground hover:text-destructive transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Utility function to save searches
export function saveRecentSearch(trade: string, location: string) {
  if (!trade) return;

  const stored = localStorage.getItem("recentSearches");
  let searches: RecentSearch[] = [];

  if (stored) {
    try {
      searches = JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse stored searches", e);
    }
  }

  // Remove duplicate if exists
  searches = searches.filter(
    (s) =>
      !(
        s.trade.toLowerCase() === trade.toLowerCase() &&
        s.location.toLowerCase() === location.toLowerCase()
      ),
  );

  // Add new search at the beginning
  searches.unshift({
    trade,
    location,
    timestamp: Date.now(),
  });

  // Keep only last 10 searches
  searches = searches.slice(0, 10);

  localStorage.setItem("recentSearches", JSON.stringify(searches));
}
