import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY"
);

interface PageParams {
  tier1: string;
}

async function getTier2Locations(tier1: string) {
  const { data, error } = await supabase
    .from("tradespeople")
    .select("tier2_slug, tier2_name")
    .eq("tier1_slug", tier1);

  if (error || !data) return [];

  // Count and dedupe
  const locationCounts: Record<string, { name: string; count: number }> = {};
  data.forEach((row) => {
    const slug = row.tier2_slug;
    if (!locationCounts[slug]) {
      locationCounts[slug] = { name: row.tier2_name, count: 0 };
    }
    locationCounts[slug].count++;
  });

  return Object.entries(locationCounts)
    .map(([slug, info]) => ({
      slug,
      name: info.name,
      count: info.count,
    }))
    .sort((a, b) => b.count - a.count);
}

async function getTier1Info(tier1: string) {
  const { data } = await supabase
    .from("tradespeople")
    .select("tier1_name, latitude, longitude")
    .eq("tier1_slug", tier1)
    .limit(1)
    .single();

  return data || { tier1_name: tier1, latitude: 36.5, longitude: -4.88 };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { tier1 } = await params;
  const tier1Info = await getTier1Info(tier1);

  const title = `Tradespeople in ${tier1Info.tier1_name}, Costa del Sol | CostaTrades`;
  const description = `Find verified tradespeople across ${tier1Info.tier1_name}. Browse by location to find plumbers, electricians, builders and more near you.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://costatrades.com/locations/${tier1}`,
    },
  };
}

export default async function Tier1AreaPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { tier1 } = await params;

  const [tier2Locations, tier1Info] = await Promise.all([
    getTier2Locations(tier1),
    getTier1Info(tier1),
  ]);

  const totalTradespeople = tier2Locations.reduce((sum, loc) => sum + loc.count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-blue-600">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{tier1Info.tier1_name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#0a1f44] text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-blue-200 mb-4">
            <MapPin className="w-5 h-5" />
            <span>Costa del Sol, Spain</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tradespeople in {tier1Info.tier1_name}
          </h1>
          <p className="text-blue-100 text-lg">
            {totalTradespeople} verified professionals across {tier2Locations.length} locations
          </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="container-custom py-12">
        <h2 className="text-2xl font-bold text-[#0a1f44] mb-8">
          Browse by Location
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tier2Locations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${tier1}/${location.slug}`}
            >
              <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#0a1f44] mb-2">
                      {location.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{location.count} tradespeople</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="container-custom pb-12">
        <h2 className="text-2xl font-bold text-[#0a1f44] mb-6">
          Coverage Area
        </h2>
        <div className="w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden">
          <iframe
            title={`Map of ${tier1Info.tier1_name}`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${tier1Info.longitude - 0.15},${tier1Info.latitude - 0.1},${tier1Info.longitude + 0.15},${tier1Info.latitude + 0.1}&layer=mapnik&marker=${tier1Info.latitude},${tier1Info.longitude}`}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0a1f44] text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need a Tradesperson in {tier1Info.tier1_name}?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Post your job and get quotes from local verified professionals. Free to use.
          </p>
          <Link href={`/post-job?area=${tier1}`}>
            <Button className="bg-[#E31E24] hover:bg-[#C41218] text-white px-8 py-4 text-lg">
              Post a Job - Get Free Quotes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
