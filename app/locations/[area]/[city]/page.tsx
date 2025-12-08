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
  city: string;
}

async function getLocation(slug: string) {
  const { data } = await supabase
    .from("locations")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

async function getTradesInCity(areaSlug: string, citySlug: string) {
  // Get distinct trades and counts for this city
  const { data, error } = await supabase
    .from("businesses")
    .select("category, category_display")
    .eq("area_slug", areaSlug)
    .eq("city_slug", citySlug);

  if (error || !data) return [];

  // Count by category
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

async function getTotalBusinesses(areaSlug: string, citySlug: string) {
  const { count } = await supabase
    .from("businesses")
    .select("*", { count: "exact", head: true })
    .eq("area_slug", areaSlug)
    .eq("city_slug", citySlug);

  return count || 0;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { area, city } = await params;
  const location = await getLocation(city);
  const areaLocation = await getLocation(area);
  
  const cityName = location?.name || city;
  const areaName = areaLocation?.name || area;

  const title = `Tradespeople in ${cityName} | Verified Professionals | CostaTrades`;
  const description = `Find verified tradespeople in ${cityName}, ${areaName}. Plumbers, electricians, builders and more. All professionals are ID-verified with real customer reviews.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { area, city } = await params;
  const location = await getLocation(city);
  const areaLocation = await getLocation(area);
  const trades = await getTradesInCity(area, city);
  const totalBusinesses = await getTotalBusinesses(area, city);

  const cityName = location?.name || city;
  const areaName = areaLocation?.name || area;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/locations/${area}`} className="hover:text-blue-600">{areaName}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{cityName}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-[#0a1f44] text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <MapPin className="w-5 h-5" />
            <span>{areaName}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tradespeople in {cityName}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {totalBusinesses} verified professionals across {trades.length} trade categories. 
            All tradespeople are ID-verified and reviewed by local customers.
          </p>
        </div>
      </section>

      {/* Trade Categories */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-[#0a1f44] mb-8">
            Find a Professional in {cityName}
          </h2>

          {trades.length === 0 ? (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">No tradespeople listed in {cityName} yet</h3>
              <p className="text-gray-600 mb-6">
                We're actively adding verified professionals to this area.
              </p>
              <Link href="/post-job">
                <Button className="bg-[#E31E24] hover:bg-[#C41218]">
                  Post a Job Request
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trades.map((trade) => (
                <Link
                  key={trade.slug}
                  href={`/locations/${area}/${city}/${trade.slug}`}
                >
                  <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0a1f44]">
                          {trade.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-500 mt-1">
                          <Users className="w-4 h-4" />
                          <span>{trade.count} professionals</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#0a1f44] text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need work done in {cityName}?
          </h2>
          <p className="text-blue-100 mb-6">
            Post your job and receive quotes from verified local professionals
          </p>
          <Link href={`/post-job?area=${city}`}>
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
