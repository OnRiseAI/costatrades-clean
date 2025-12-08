import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { 
  Wrench, Zap, Hammer, Paintbrush, Shovel, Droplets, 
  Thermometer, Key, Sparkles, Bug, Shield, Truck, Sun,
  Home, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY"
);

interface PageParams {
  tier1: string;
  tier2: string;
}

const CATEGORY_CONFIG: Record<string, { name: string; icon: any; color: string }> = {
  plumber: { name: "Plumber", icon: Wrench, color: "bg-blue-100 text-blue-600" },
  electrician: { name: "Electrician", icon: Zap, color: "bg-yellow-100 text-yellow-600" },
  builder: { name: "Builders & Construction", icon: Hammer, color: "bg-orange-100 text-orange-600" },
  "painter-decorator": { name: "Painter & Decorator", icon: Paintbrush, color: "bg-purple-100 text-purple-600" },
  gardener: { name: "Gardeners & Landscaping", icon: Shovel, color: "bg-green-100 text-green-600" },
  "pool-maintenance": { name: "Pool Maintenance", icon: Droplets, color: "bg-cyan-100 text-cyan-600" },
  "air-conditioning": { name: "Air Conditioning", icon: Thermometer, color: "bg-sky-100 text-sky-600" },
  locksmith: { name: "Locksmith", icon: Key, color: "bg-gray-100 text-gray-600" },
  "cleaning-services": { name: "Cleaning Services", icon: Sparkles, color: "bg-pink-100 text-pink-600" },
  "window-cleaning": { name: "Window Cleaning", icon: Sparkles, color: "bg-indigo-100 text-indigo-600" },
  handyman: { name: "Handyman", icon: Settings, color: "bg-amber-100 text-amber-600" },
  "pest-control": { name: "Pest Control", icon: Bug, color: "bg-red-100 text-red-600" },
  carpenter: { name: "Carpenter", icon: Hammer, color: "bg-amber-100 text-amber-700" },
  "security-alarms": { name: "Security & Alarms", icon: Shield, color: "bg-slate-100 text-slate-600" },
  removals: { name: "Removals & Moving", icon: Truck, color: "bg-emerald-100 text-emerald-600" },
  "solar-panels": { name: "Solar Panels", icon: Sun, color: "bg-yellow-100 text-yellow-500" },
  "property-management": { name: "Property Management", icon: Home, color: "bg-teal-100 text-teal-600" },
};

async function getCategoryCounts(tier1: string, tier2: string) {
  const { data, error } = await supabase
    .from("tradespeople")
    .select("costatrades_category")
    .eq("tier1_slug", tier1)
    .eq("tier2_slug", tier2);

  if (error || !data) return {};

  const counts: Record<string, number> = {};
  data.forEach((row) => {
    const cat = row.costatrades_category;
    counts[cat] = (counts[cat] || 0) + 1;
  });

  return counts;
}

async function getLocationInfo(tier1: string, tier2: string) {
  const { data } = await supabase
    .from("tradespeople")
    .select("tier1_name, tier2_name, latitude, longitude")
    .eq("tier1_slug", tier1)
    .eq("tier2_slug", tier2)
    .limit(1)
    .single();

  return data || { tier1_name: tier1, tier2_name: tier2, latitude: 36.5, longitude: -4.88 };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { tier1, tier2 } = await params;
  const locationInfo = await getLocationInfo(tier1, tier2);

  const title = `Tradespeople in ${locationInfo.tier2_name}, ${locationInfo.tier1_name} | CostaTrades`;
  const description = `Find verified tradespeople in ${locationInfo.tier2_name}, Costa del Sol. Plumbers, electricians, builders, cleaners and more. Real reviews, trusted professionals.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://costatrades.com/locations/${tier1}/${tier2}`,
    },
  };
}

export default async function Tier2LocationPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { tier1, tier2 } = await params;

  const [categoryCounts, locationInfo] = await Promise.all([
    getCategoryCounts(tier1, tier2),
    getLocationInfo(tier1, tier2),
  ]);

  const totalTradespeople = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

  // Sort categories by count
  const sortedCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([slug, count]) => ({
      slug,
      count,
      ...CATEGORY_CONFIG[slug],
    }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/locations/${tier1}`} className="hover:text-blue-600">{locationInfo.tier1_name}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{locationInfo.tier2_name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#0a1f44] text-white py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Tradespeople in {locationInfo.tier2_name}
          </h1>
          <p className="text-blue-100 text-lg mb-2">
            {locationInfo.tier1_name}, Costa del Sol
          </p>
          <p className="text-blue-200">
            {totalTradespeople} verified professionals available
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container-custom py-12">
        <h2 className="text-2xl font-bold text-[#0a1f44] mb-8">
          Browse by Trade
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedCategories.map((category) => {
            const Icon = category.icon || Wrench;
            return (
              <Link
                key={category.slug}
                href={`/locations/${tier1}/${tier2}/${category.slug}`}
              >
                <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full">
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-[#0a1f44]">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} {category.count === 1 ? "professional" : "professionals"}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Map Section */}
      <div className="container-custom pb-12">
        <h2 className="text-2xl font-bold text-[#0a1f44] mb-6">
          Service Area
        </h2>
        <div className="w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden">
          <iframe
            title={`Map of ${locationInfo.tier2_name}`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationInfo.longitude - 0.05},${locationInfo.latitude - 0.05},${locationInfo.longitude + 0.05},${locationInfo.latitude + 0.05}&layer=mapnik&marker=${locationInfo.latitude},${locationInfo.longitude}`}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0a1f44] text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need Help in {locationInfo.tier2_name}?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Post your job and receive quotes from verified local tradespeople. It's free and takes just 2 minutes.
          </p>
          <Link href={`/post-job?area=${tier2}`}>
            <Button className="bg-[#E31E24] hover:bg-[#C41218] text-white px-8 py-4 text-lg">
              Post a Job - It's Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
