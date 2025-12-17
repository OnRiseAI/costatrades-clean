import { Suspense } from "react";
import RequestQuote from "@/pages/RequestQuote";

type RequestQuotePageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function RequestQuotePage({
  searchParams,
}: RequestQuotePageProps) {
  const tradespersonSlug =
    typeof searchParams.tradesperson === "string"
      ? searchParams.tradesperson
      : "";

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <RequestQuote tradespersonSlug={tradespersonSlug} />
    </Suspense>
  );
}
