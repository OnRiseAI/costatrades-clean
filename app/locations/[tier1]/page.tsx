import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import {
  MapPin, Users, ArrowRight, Shield, CheckCircle, Star,
  Clock, Phone, Sparkles, TrendingUp, Building2, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY"
);

interface PageParams {
  tier1: string;
}

// Slug normalization map - merges duplicates and fixes naming
const SLUG_NORMALIZATION: Record<string, { slug: string; name: string }> = {
  "san-pedro-alcantara-malaga-espana": { slug: "san-pedro-de-alcantara", name: "San Pedro de Alcantara" },
  "puerto-banus-marbella": { slug: "puerto-banus", name: "Puerto Banus" },
};

// Additional tier2 locations to add for marbella-area (coming soon)
const ADDITIONAL_TIER2_LOCATIONS: Record<string, Array<{ slug: string; name: string; count: number }>> = {
  "marbella-area": [
    { slug: "nueva-andalucia", name: "Nueva Andalucia", count: 0 },
    { slug: "elviria", name: "Elviria", count: 0 },
    { slug: "las-chapas", name: "Las Chapas", count: 0 },
  ],
};

// Area descriptions for rich content
const AREA_DESCRIPTIONS: Record<string, { tagline: string; description: string }> = {
  "marbella-area": {
    tagline: "The Golden Mile & Beyond",
    description: "From the glamour of Puerto Banus to the charm of San Pedro, find trusted professionals across Marbella's most prestigious neighborhoods.",
  },
  "fuengirola-area": {
    tagline: "Heart of the Costa del Sol",
    description: "Serving Fuengirola, Los Boliches, and surrounding areas with reliable tradespeople for every home improvement need.",
  },
  "estepona-manilva": {
    tagline: "The Garden of the Costa del Sol",
    description: "Beautiful Estepona and Manilva deserve the best. Find verified professionals for your coastal property.",
  },
  "benalmadena-area": {
    tagline: "Where Mountains Meet the Sea",
    description: "From Benalmadena Pueblo to Torremolinos, connect with skilled tradespeople across this vibrant area.",
  },
  "mijas-costa": {
    tagline: "Coastal Living at Its Finest",
    description: "La Cala, Calahonda, Riviera del Sol - find the right tradesperson for your Mijas Costa property.",
  },
  "malaga-east-axarquia": {
    tagline: "Authentic Andalucia",
    description: "From Nerja to Torre del Mar, the Axarquia region's finest tradespeople at your service.",
  },
  "sotogrande-san-roque": {
    tagline: "Exclusive & Prestigious",
    description: "Premium service for Sotogrande's exclusive properties. Only the best verified professionals.",
  },
};

async function getTier2Locations(tier1: string) {
  const { data, error } = await supabase
    .from("tradespeople")
    .select("tier2_slug, tier2_name")
    .eq("tier1_slug", tier1);

  if (error || !data) return [];

  // Count and dedupe with slug normalization
  const locationCounts: Record<string, { name: string; count: number }> = {};
  data.forEach((row) => {
    const normalized = SLUG_NORMALIZATION[row.tier2_slug];
    const slug = normalized?.slug || row.tier2_slug;
    const name = normalized?.name || row.tier2_name;

    if (!locationCounts[slug]) {
      locationCounts[slug] = { name, count: 0 };
    }
    locationCounts[slug].count++;
  });

  // Add additional tier2 locations for this tier1 area
  const additionalLocations = ADDITIONAL_TIER2_LOCATIONS[tier1] || [];
  additionalLocations.forEach((loc) => {
    if (!locationCounts[loc.slug]) {
      locationCounts[loc.slug] = { name: loc.name, count: loc.count };
    }
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

  // Optimised for 50-55 chars to prevent SERP truncation
  const title = `Tradespeople in ${tier1Info.tier1_name} | Local Pros`;
  const description = `Find verified tradespeople in ${tier1Info.tier1_name}, Costa del Sol. Plumbers, electricians, builders. Real reviews, free quotes.`;
  const url = `https://costatrades.com/locations/${tier1}`;

  return {
    title,
    description,
    openGraph: {
      title: `Tradespeople in ${tier1Info.tier1_name}, Costa del Sol`,
      description,
      type: "website",
      url,
    },
    alternates: {
      canonical: url,
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
  const areaInfo = AREA_DESCRIPTIONS[tier1] || {
    tagline: "Costa del Sol",
    description: `Find trusted, verified tradespeople across ${tier1Info.tier1_name}. Browse by location to connect with local professionals.`,
  };

  // Split locations into featured (top 3 with most tradespeople) and others
  const featuredLocations = tier2Locations.slice(0, 3);
  const otherLocations = tier2Locations.slice(3);

  // BreadcrumbList Schema for rich results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://costatrades.com" },
      { "@type": "ListItem", position: 2, name: "Locations", item: "https://costatrades.com/locations" },
      { "@type": "ListItem", position: 3, name: tier1Info.tier1_name, item: `https://costatrades.com/locations/${tier1}` },
    ],
  };

  // Place Schema for AEO - location-based searches
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: tier1Info.tier1_name,
    description: areaInfo.description,
    geo: {
      "@type": "GeoCoordinates",
      latitude: tier1Info.latitude,
      longitude: tier1Info.longitude,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: tier1Info.tier1_name,
      addressRegion: "Málaga",
      addressCountry: "ES",
    },
    containedInPlace: {
      "@type": "Place",
      name: "Costa del Sol, Spain",
    },
  };

  // ItemList Schema for the locations listing - helps with rich snippets
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Tradespeople Locations in ${tier1Info.tier1_name}`,
    description: `Find verified tradespeople in ${tier2Locations.length} locations across ${tier1Info.tier1_name}, Costa del Sol.`,
    numberOfItems: tier2Locations.length,
    itemListElement: tier2Locations.slice(0, 10).map((loc, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: loc.name,
      url: `https://costatrades.com/locations/${tier1}/${loc.slug}`,
    })),
  };

  // Service Schema - AEO for "find tradesperson near me" queries
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Tradesperson Directory",
    provider: {
      "@type": "Organization",
      name: "CostaTrades",
      url: "https://costatrades.com",
    },
    areaServed: {
      "@type": "Place",
      name: `${tier1Info.tier1_name}, Costa del Sol`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: tier1Info.latitude,
        longitude: tier1Info.longitude,
      },
    },
    description: `Connect with ${totalTradespeople} verified tradespeople in ${tier1Info.tier1_name}. Plumbers, electricians, builders and more.`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Free quotes from verified professionals",
    },
  };

  // Combined schema graph
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, placeSchema, itemListSchema, serviceSchema],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#0a1f44] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/locations" className="hover:text-[#0a1f44] transition-colors">Locations</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-[#0a1f44] font-medium">{tier1Info.tier1_name}</span>
          </nav>
        </div>
      </div>

      {/* Premium Hero Section */}
      <div className="relative bg-[#0a1f44] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-custom py-16 md:py-24 relative z-10">
          <div className="max-w-4xl">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm font-medium">Costa del Sol, Spain</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Tradespeople in{" "}
              <span className="text-white">
                {tier1Info.tier1_name}
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-white/80 mb-4 font-light">
              {areaInfo.tagline}
            </p>

            {/* Description */}
            <p className="text-white/70 text-lg mb-8 max-w-2xl">
              {areaInfo.description}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold">{totalTradespeople}</p>
                    <p className="text-white/60 text-xs md:text-sm">Professionals</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold">{tier2Locations.length}</p>
                    <p className="text-white/60 text-xs md:text-sm">Locations</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold">4.8</p>
                    <p className="text-white/60 text-xs md:text-sm">Avg Rating</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold">100%</p>
                    <p className="text-white/60 text-xs md:text-sm">Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white border-b shadow-sm">
        <div className="container-custom py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-[#0a1f44]/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#0a1f44]" />
              </div>
              <span className="font-medium">Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-[#0a1f44]/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-[#0a1f44]" />
              </div>
              <span className="font-medium">Real Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-[#0a1f44]/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#0a1f44]" />
              </div>
              <span className="font-medium">Fast Response</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-8 h-8 rounded-full bg-[#0a1f44]/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-[#0a1f44]" />
              </div>
              <span className="font-medium">Free Quotes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Locations */}
      {featuredLocations.length > 0 && (
        <div className="container-custom py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-[#E31E24] font-semibold text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>POPULAR AREAS</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44]">
                Top Locations in {tier1Info.tier1_name}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredLocations.map((location, index) => (
              <Link
                key={location.slug}
                href={`/locations/${tier1}/${location.slug}`}
              >
                <Card className="group relative overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-white">
                  <div className="p-6 md:p-8">
                    {/* Badge */}
                    {index === 0 && (
                      <div className="inline-flex items-center gap-1 bg-[#E31E24] text-white rounded-full px-3 py-1 text-xs font-medium mb-4">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </div>
                    )}

                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#0a1f44] group-hover:text-[#E31E24] transition-colors">
                      {location.name}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 mb-6">
                      <Users className="w-4 h-4" />
                      <span>{location.count} tradespeople available</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#0a1f44] font-medium group-hover:text-[#E31E24] group-hover:gap-3 transition-all">
                      <span>Browse professionals</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0a1f44] group-hover:bg-[#E31E24] transition-colors" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Locations Grid */}
      {otherLocations.length > 0 && (
        <div className="bg-gray-50 py-12 md:py-16">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-8">
              All Locations
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {otherLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${tier1}/${location.slug}`}
                >
                  <Card className="group p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full bg-white border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-[#0a1f44] mb-1 group-hover:text-[#E31E24] transition-colors">
                          {location.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Users className="w-4 h-4" />
                          <span>
                            {location.count > 0
                              ? `${location.count} tradespeople`
                              : "Coming soon"}
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#E31E24]/10 flex items-center justify-center transition-colors">
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#E31E24] transition-colors" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Map Section */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-4">
              Covering {tier1Info.tier1_name} & Surroundings
            </h2>
            <p className="text-gray-600 mb-6">
              Our network of verified tradespeople serves all areas within {tier1Info.tier1_name}.
              Whether you're in the town center or surrounding urbanizations, find the right professional for your project.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a1f44]">Local Expertise</p>
                  <p className="text-gray-600 text-sm">Professionals who know the area and local regulations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a1f44]">Quick Response Times</p>
                  <p className="text-gray-600 text-sm">Get quotes within hours, not days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a1f44]">English & Spanish Speaking</p>
                  <p className="text-gray-600 text-sm">Communication made easy for expats and locals</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title={`Map of ${tier1Info.tier1_name}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${tier1Info.longitude - 0.15},${tier1Info.latitude - 0.1},${tier1Info.longitude + 0.15},${tier1Info.latitude + 0.1}&layer=mapnik&marker=${tier1Info.latitude},${tier1Info.longitude}`}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-[#0a1f44] text-white overflow-hidden">
        <div className="container-custom py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white/80 text-sm font-medium">Free to Use</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Tradesperson in {tier1Info.tier1_name}?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Post your job in minutes and receive quotes from verified local professionals.
              Compare prices, read reviews, and hire with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/post-job?area=${tier1}`}>
                <Button className="bg-[#E31E24] hover:bg-[#C41218] text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Post a Job - Get Free Quotes
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0a1f44] px-8 py-6 text-lg font-semibold rounded-xl transition-colors">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
