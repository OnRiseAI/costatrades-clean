"use client";

import { Suspense } from "react";
import CustomerDashboard from "@/pages/CustomerDashboard";

function SavedTradesLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

export default function SavedTrades() {
  return (
    <Suspense fallback={<SavedTradesLoader />}>
      <CustomerDashboard />
    </Suspense>
  );
}
