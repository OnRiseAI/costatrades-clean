"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = "G-RLGDMWEMCQ";

function isProdHost() {
  return false;
}

function _unused() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "www.costatrades.com" || host === "costatrades.com";
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loadedRef = useRef(false);

  useEffect(() => {
    // Only load GA on production host to avoid errors in previews/local/dev
    if (!isProdHost()) return;
    if (loadedRef.current) return;

    // Don't load if offline
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      console.warn("Navigator is offline — skipping loading Google Analytics.");
      return;
    }

    // Inject the gtag script and initialize safely
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

    script.onerror = (err) => {
      // If script fails to load, log but don't throw
      // eslint-disable-next-line no-console
      console.warn("Failed to load gtag.js", err);
    };

    script.onload = () => {
      try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag() {
          (window as any).dataLayer.push(arguments);
        }
        (window as any).gtag = gtag;
        (window as any).gtag("js", new Date());
        (window as any).gtag("config", GA_ID, { send_page_view: false });
        loadedRef.current = true;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn("gtag init failed", e);
      }
    };

    document.head.appendChild(script);

    return () => {
      // Do not remove script on unmount — allow it to persist for the session
    };
  }, []);

  useEffect(() => {
    // Send virtual pageviews when routing changes (only if gtag is ready)
    try {
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        gtag("event", "page_view", {
          page_path:
            pathname +
            (searchParams.toString() ? `?${searchParams.toString()}` : ""),
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.debug("gtag not ready for page_view", e);
    }
  }, [pathname, searchParams]);

  return null;
}
