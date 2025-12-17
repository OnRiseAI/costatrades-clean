"use client";

import { Suspense } from "react";
import RequestQuoteContact from "@/pages/RequestQuoteContact";

function QuoteContactLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

export default function RequestQuoteContactPage() {
  return (
    <Suspense fallback={<QuoteContactLoader />}>
      <RequestQuoteContact />
    </Suspense>
  );
}
