"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClaimBusiness = dynamic(() => import("@/pages/ClaimBusiness"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  ),
});

export default function ClaimBusinessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <ClaimBusiness />
    </Suspense>
  );
}
