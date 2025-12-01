"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      // Show banner after a short delay so it does not affect LCP
      const timer = setTimeout(() => setIsVisible(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    // In a real implementation, this would disable non-essential cookies
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-600">
          <Cookie className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-[#0a1f44] mb-2">
            We use cookies
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic. By clicking "Accept
            All", you consent to our use of cookies. Read our{" "}
            <Link
              href="/cookie-policy"
              className="text-blue-600 hover:underline font-medium"
            >
              Cookie Policy
            </Link>{" "}
            to learn more.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="whitespace-nowrap"
          >
            Decline
          </Button>
          <Button
            onClick={handleAccept}
            className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
