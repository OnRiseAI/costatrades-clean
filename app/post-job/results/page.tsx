"use client";

import { Suspense } from "react";
import PostJobResults from "@/pages/PostJobResults";

function ResultsLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

export default function PostJobResultsPage() {
  return (
    <Suspense fallback={<ResultsLoader />}>
      <PostJobResults />
    </Suspense>
  );
}
