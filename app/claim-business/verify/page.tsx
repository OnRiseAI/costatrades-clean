"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClaimBusinessVerify = dynamic(
  () => import("@/pages/ClaimBusinessVerify"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ),
  }
);

export default function ClaimBusinessVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <ClaimBusinessVerify />
    </Suspense>
  );
}
