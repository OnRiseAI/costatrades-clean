import { Suspense } from "react";
import TradeCategory from "@/pages/TradeCategory";

interface TradeParams {
  params: Promise<{
    category: string;
  }>;
}

function CategoryLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

export default async function TradeCategoryPage({ params }: TradeParams) {
  const { category } = await params;
  return (
    <Suspense fallback={<CategoryLoader />}>
      <TradeCategory />
    </Suspense>
  );
}
