"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const TradespersonDetails = dynamic(() => import("@/pages/TradespersonDetails"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  ),
});

export default function TradespersonDetailsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <TradespersonDetails />
    </Suspense>
  );
}
