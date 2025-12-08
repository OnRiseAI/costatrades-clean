export const dynamic = "force-dynamic";
import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface PageParams {
  area: string;
}

async function getLocation(slug: string) {
  const { data } = await supabase
    .from("locations")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

async function getTradesInArea(areaSlug: string) {
  const { data } = await supabase
    .from("businesses")
    .select("category, category_display")
    .eq("area_slug", areaSlug);

  if (!data) return [];

  const counts: Record<string, { slug: string; name: string; count: number }> = {};
  data.forEach((row: any) => {
    if (!counts[row.category]) {
      counts[row.category] = {
        slug: row.category,
        name: row.category_display,
        count: 0,
      };
    }
    counts[row.category].count++;
  });

  return Object.values(counts).sort((a, b) => b.count - a.count);
}

async function getCityStats(areaSlug: string) {
  const { data } = await supabase
    .from("businesses")
    .select("city_slug, city")
    .eq("area_slug", areaSlug);

  if (!data) return {};

  const stats: Record<string, { name: string; count: number }> = {};
  data.forEach((row: any) => {
    if (!stats[row.city_slug]) {
      stats[row.city_slug] = { name: row.city, count: 0 };
    }
    stats[row.city_slug].count++;
  });

  return stats;
}

async function getTotalBusinesses(areaSlug: string) {
  const { count } = await supabase
    .from("businesses")
    .select("*", { count: "exact", head: true })
    .eq("area_slug", areaSlug);

  return count || 0;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { area } = await params;
  const location = await getLocation(area);
  const areaName = location?.name || area;

  const title = `Tradespeople in ${areaName} | Verified Professionals | CostaTrades`;
  const description = `Find verified tradespeople in ${areaName}, Costa del Sol. Plumbers, electricians, builders, pool services and more. All professionals are ID-verified.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { area } = await params;
  const location = await getLocation(area);
  const trades = await getTradesInArea(area);
  const cityStats = await getCityStats(area);
  const totalBusinesses = await getTotalBusinesses(area);

  const areaName = location?.name || area;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-blue-600">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{areaName}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-[#0a1f44] text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tradespeople in {areaName}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {totalBusinesses} verified professionals across {Object.keys(cityStats).length} locations. 
            Find trusted plumbers, electricians, builders, and more.
          </p>
        </div>
      </section>

      {/* Towns/Cities */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[#0a1f44] mb-8">
            Browse by Location
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(cityStats).map(([citySlug, stats]) => (
              <Link key={citySlug} href={`/locations/${area}/${citySlug}`}>
                <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-[#E31E24]" />
                        <h3 className="text-lg font-semibold text-[#0a1f44]">
                          {stats.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{stats.count} professionals</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Categories */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[#0a1f44] mb-8">
            Browse by Trade
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trades.map((trade) => (
              <Card key={trade.slug} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{trade.name}</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {trade.count}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#0a1f44] text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need work done in {areaName}?
          </h2>
          <p className="text-blue-100 mb-6">
            Post your job and receive quotes from verified local professionals
          </p>
          <Link href={`/post-job?area=${area}`}>
            <Button size="lg" className="bg-[#E31E24] hover:bg-[#C41218]">
              Post a Job Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export const revalidate = 3600;
