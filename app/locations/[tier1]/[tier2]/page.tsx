import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import {
  Wrench, Zap, Hammer, Paintbrush, Shovel, Droplets,
  Thermometer, Key, Sparkles, Bug, Shield, Truck, Sun,
  Home, Settings, CheckCircle, Star, Users, MapPin, ArrowRight, Circle
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

// Coverage radius in km for different town sizes
const TOWN_RADIUS: Record<string, number> = {
  // Major towns - larger coverage
  "marbella": 8,
  "fuengirola": 6,
  "estepona": 7,
  "torremolinos": 5,
  "benalmadena": 5,
  "nerja": 6,
  "mijas": 7,
  "malaga": 10,
  // Medium towns
  "san-pedro-de-alcantara": 5,
  "puerto-banus": 4,
  "nueva-andalucia": 4,
  "la-cala-de-mijas": 4,
  "calahonda": 4,
  "riviera-del-sol": 4,
  "torre-del-mar": 5,
  "velez-malaga": 5,
  "torrox": 5,
  "sotogrande": 6,
  "manilva": 5,
  "casares": 6,
  // Marbella East
  "elviria": 4,
  "las-chapas": 3,
  // Smaller towns - default
};

function getCoverageRadius(tier2Slug: string): number {
  return TOWN_RADIUS[tier2Slug] || 4; // Default 4km for smaller towns
}

const CATEGORY_CONFIG: Record<string, { name: string; icon: any }> = {
  plumber: { name: "Plumber", icon: Wrench },
  electrician: { name: "Electrician", icon: Zap },
  builder: { name: "Builders & Construction", icon: Hammer },
  "painter-decorator": { name: "Painter & Decorator", icon: Paintbrush },
  gardener: { name: "Gardeners & Landscaping", icon: Shovel },
  "pool-maintenance": { name: "Pool Maintenance", icon: Droplets },
  "air-conditioning": { name: "Air Conditioning", icon: Thermometer },
  locksmith: { name: "Locksmith", icon: Key },
  "cleaning-services": { name: "Cleaning Services", icon: Sparkles },
  "window-cleaning": { name: "Window Cleaning", icon: Sparkles },
  handyman: { name: "Handyman", icon: Settings },
  "pest-control": { name: "Pest Control", icon: Bug },
  carpenter: { name: "Carpenter", icon: Hammer },
  "security-alarms": { name: "Security & Alarms", icon: Shield },
  removals: { name: "Removals & Moving", icon: Truck },
  "solar-panels": { name: "Solar Panels", icon: Sun },
  "property-management": { name: "Property Management", icon: Home },
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

async function getNearbyTowns(tier1: string, currentTier2: string) {
  const { data, error } = await supabase
    .from("tradespeople")
    .select("tier2_slug, tier2_name")
    .eq("tier1_slug", tier1)
    .neq("tier2_slug", currentTier2);

  if (error || !data) return [];

  // Get unique towns with counts
  const townCounts: Record<string, { name: string; count: number }> = {};
  data.forEach((row) => {
    if (row.tier2_slug && row.tier2_name) {
      if (!townCounts[row.tier2_slug]) {
        townCounts[row.tier2_slug] = { name: row.tier2_name, count: 0 };
      }
      townCounts[row.tier2_slug].count++;
    }
  });

  // Sort by count and return top 8
  return Object.entries(townCounts)
    .map(([slug, info]) => ({ slug, name: info.name, count: info.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { tier1, tier2 } = await params;
  const locationInfo = await getLocationInfo(tier1, tier2);

  // Optimised for 50-55 chars to prevent SERP truncation
  const title = `Tradespeople in ${locationInfo.tier2_name} | Verified Pros`;
  const description = `Find verified tradespeople in ${locationInfo.tier2_name}, Costa del Sol. Plumbers, electricians, builders. Real reviews, free quotes.`;
  const url = `https://costatrades.com/locations/${tier1}/${tier2}`;

  return {
    title,
    description,
    openGraph: {
      title: `Tradespeople in ${locationInfo.tier2_name}, ${locationInfo.tier1_name}`,
      description,
      type: "website",
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function Tier2LocationPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { tier1, tier2 } = await params;

  const [categoryCounts, locationInfo, nearbyTowns] = await Promise.all([
    getCategoryCounts(tier1, tier2),
    getLocationInfo(tier1, tier2),
    getNearbyTowns(tier1, tier2),
  ]);

  const totalTradespeople = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
  const totalCategories = Object.keys(categoryCounts).length;
  const coverageRadius = getCoverageRadius(tier2);

  // Sort categories by count
  const sortedCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([slug, count]) => ({
      slug,
      count,
      ...CATEGORY_CONFIG[slug],
    }));

  // Top 4 categories for featured section
  const featuredCategories = sortedCategories.slice(0, 4);
  const otherCategories = sortedCategories.slice(4);

  // BreadcrumbList Schema for rich results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://costatrades.com" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://costatrades.com/locations" },
      { "@type": "ListItem", position: 3, name: locationInfo.tier1_name, item: `https://costatrades.com/locations/${tier1}` },
      { "@type": "ListItem", position: 4, name: locationInfo.tier2_name, item: `https://costatrades.com/locations/${tier1}/${tier2}` },
    ],
  };

  // Place Schema for AEO - "tradespeople in [location]" searches
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: locationInfo.tier2_name,
    description: `Find ${totalTradespeople} verified tradespeople in ${locationInfo.tier2_name}, ${locationInfo.tier1_name}. Plumbers, electricians, builders and more local professionals.`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: locationInfo.latitude,
      longitude: locationInfo.longitude,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: locationInfo.tier2_name,
      addressRegion: locationInfo.tier1_name,
      addressCountry: "ES",
    },
    containedInPlace: {
      "@type": "Place",
      name: `${locationInfo.tier1_name}, Costa del Sol`,
    },
  };

  // ItemList Schema for trade categories - helps with rich snippets
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Trade Services in ${locationInfo.tier2_name}`,
    description: `${totalCategories} types of trade services available in ${locationInfo.tier2_name} with ${totalTradespeople} verified professionals.`,
    numberOfItems: totalCategories,
    itemListElement: sortedCategories.slice(0, 10).map((cat, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: cat.name,
      url: `https://costatrades.com/locations/${tier1}/${tier2}/${cat.slug}`,
    })),
  };

  // LocalBusiness Schema for AEO - "services near me" queries
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `CostaTrades ${locationInfo.tier2_name}`,
    description: `Connect with ${totalTradespeople} verified tradespeople in ${locationInfo.tier2_name}. Free quotes from local plumbers, electricians, builders and more.`,
    url: `https://costatrades.com/locations/${tier1}/${tier2}`,
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
      },
      geoRadius: `${coverageRadius} km`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: locationInfo.tier2_name,
      addressRegion: locationInfo.tier1_name,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: locationInfo.latitude,
      longitude: locationInfo.longitude,
    },
    priceRange: "€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: totalTradespeople.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Combined schema graph
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, placeSchema, itemListSchema, localBusinessSchema],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-[#0a1f44] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-[#0a1f44] transition-colors">Locations</Link>
            <span className="mx-2">/</span>
            <Link href={`/locations/${tier1}`} className="hover:text-[#0a1f44] transition-colors">{locationInfo.tier1_name}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0a1f44] font-medium">{locationInfo.tier2_name}</span>
          </nav>
        </div>
      </div>

      {/* Premium Hero Section */}
      <div className="relative bg-[#0a1f44] text-white overflow-hidden">
        <div className="container-custom py-16 md:py-20 relative z-10">
          <div className="max-w-4xl">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm font-medium">{locationInfo.tier1_name}, Costa del Sol</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Trusted Tradespeople in{" "}
              <span className="text-white">
                {locationInfo.tier2_name}
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Connect with verified local professionals. Quality workmanship, competitive prices, and real customer reviews.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{totalTradespeople}</p>
                  <p className="text-white/60 text-sm">Verified Pros</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{totalCategories}</p>
                  <p className="text-white/60 text-sm">Trade Categories</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">4.8</p>
                  <p className="text-white/60 text-sm">Avg. Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Circle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{coverageRadius}km</p>
                  <p className="text-white/60 text-sm">Coverage Radius</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container-custom py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-5 h-5 text-[#0a1f44]" />
              <span>All Professionals Verified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-[#0a1f44]" />
              <span>Real Customer Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="w-5 h-5 text-[#0a1f44]" />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <div className="container-custom py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44]">
                Most Popular Services
              </h2>
              <p className="text-gray-500 mt-2">Top requested trades in {locationInfo.tier2_name}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => {
              const Icon = category.icon || Wrench;
              return (
                <Link
                  key={category.slug}
                  href={`/locations/${tier1}/${tier2}/${category.slug}`}
                >
                  <Card className="group relative overflow-hidden h-full border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <div className="p-6 h-full flex flex-col">
                      <div className="w-16 h-16 rounded-2xl bg-[#0a1f44] flex items-center justify-center mb-4 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0a1f44] group-hover:text-[#E31E24] transition-colors mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 mb-4 flex-grow">
                        {category.count} verified {category.count === 1 ? "professional" : "professionals"}
                      </p>
                      <div className="flex items-center text-[#0a1f44] group-hover:text-[#E31E24] font-medium transition-colors">
                        <span>Browse all</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Bottom accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0a1f44] group-hover:bg-[#E31E24] transition-colors" />
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* All Categories Grid */}
      {otherCategories.length > 0 && (
        <div className="bg-gray-50">
          <div className="container-custom py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-8">
              All Trade Categories
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {otherCategories.map((category) => {
                const Icon = category.icon || Wrench;
                return (
                  <Link
                    key={category.slug}
                    href={`/locations/${tier1}/${tier2}/${category.slug}`}
                  >
                    <Card className="group p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full bg-white border border-gray-200">
                      <div className="w-12 h-12 rounded-xl bg-[#0a1f44] flex items-center justify-center mb-3 shadow-md">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-[#0a1f44] group-hover:text-[#E31E24] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {category.count} pros
                      </p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Map Section */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-4">
              Serving {locationInfo.tier2_name} & Surrounding Areas
            </h2>
            <p className="text-gray-600 mb-6">
              Our network of trusted tradespeople covers {locationInfo.tier2_name} and the wider {locationInfo.tier1_name} area.
              Whether you need emergency repairs or planned renovations, find the right professional near you.
            </p>

            {/* Coverage Radius Badge */}
            <div className="inline-flex items-center gap-3 bg-[#0a1f44]/5 border border-[#0a1f44]/20 rounded-xl px-5 py-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#0a1f44] flex items-center justify-center">
                <Circle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[#0a1f44]">{coverageRadius}km Coverage Radius</p>
                <p className="text-sm text-gray-600">Professionals serving this area and beyond</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#0a1f44] flex-shrink-0" />
                <span>Local professionals who know the area</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#0a1f44] flex-shrink-0" />
                <span>Quick response times for urgent jobs</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#0a1f44] flex-shrink-0" />
                <span>Familiar with local building regulations</span>
              </div>
            </div>
          </div>
          <div className="w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title={`Map of ${locationInfo.tier2_name}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationInfo.longitude - 0.05},${locationInfo.latitude - 0.05},${locationInfo.longitude + 0.05},${locationInfo.latitude + 0.05}&layer=mapnik&marker=${locationInfo.latitude},${locationInfo.longitude}`}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Nearby Towns Section */}
      {nearbyTowns.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="container-custom py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-2">
              Nearby Towns
            </h2>
            <p className="text-gray-600 mb-8">
              Find tradespeople in other {locationInfo.tier1_name} locations
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyTowns.map((town) => (
                <Link
                  key={town.slug}
                  href={`/locations/${tier1}/${town.slug}`}
                  className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-[#0a1f44] hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#0a1f44] transition-colors" />
                    <span className="font-medium text-[#0a1f44] group-hover:text-[#E31E24] transition-colors">
                      {town.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{town.count} pros</span>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href={`/locations/${tier1}`}
                className="inline-flex items-center gap-2 text-[#0a1f44] font-semibold hover:text-[#E31E24] transition-colors"
              >
                View all {locationInfo.tier1_name} locations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="relative bg-[#0a1f44] text-white overflow-hidden">
        <div className="container-custom py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Work Done in {locationInfo.tier2_name}?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Post your job in 2 minutes and receive quotes from verified local professionals.
              Compare prices, read reviews, and hire with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/post-job?area=${tier2}`}>
                <Button className="bg-[#E31E24] hover:bg-[#C41218] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Post a Job - It's Free
                </Button>
              </Link>
              <Link href={`/locations/${tier1}`}>
                <Button variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0a1f44] px-8 py-6 text-lg transition-colors">
                  Browse Other Areas
                </Button>
              </Link>
            </div>
            <p className="text-white/60 text-sm mt-6">
              No signup required • Free quotes • No obligation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
