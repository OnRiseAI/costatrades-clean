import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Star, MapPin, Phone, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY"
);

interface PageParams {
  tier1: string;
  tier2: string;
  tradetype: string;
}

const CATEGORY_DISPLAY: Record<string, string> = {
  plumber: "Plumber",
  electrician: "Electrician",
  builder: "Builders & Construction",
  "painter-decorator": "Painter & Decorator",
  gardener: "Gardeners & Landscaping",
  "pool-maintenance": "Pool Maintenance",
  "air-conditioning": "Air Conditioning",
  locksmith: "Locksmith",
  "cleaning-services": "Cleaning Services",
  "window-cleaning": "Window Cleaning",
  handyman: "Handyman",
  "pest-control": "Pest Control",
  carpenter: "Carpenter",
  "security-alarms": "Security & Alarms",
  removals: "Removals & Moving",
  "solar-panels": "Solar Panels",
  "property-management": "Property Management",
};

async function getTradespeople(tier1: string, tier2: string, tradetype: string) {
  const { data, error } = await supabase
    .from("tradespeople")
    .select("*")
    .eq("tier1_slug", tier1)
    .eq("tier2_slug", tier2)
    .eq("costatrades_category", tradetype)
    .order("rating", { ascending: false });

  if (error) {
    console.error("Error fetching tradespeople:", error);
    return [];
  }

  return data || [];
}

async function getLocationInfo(tier1: string, tier2: string) {
  const { data } = await supabase
    .from("tradespeople")
    .select("tier1_name, tier2_name")
    .eq("tier1_slug", tier1)
    .eq("tier2_slug", tier2)
    .limit(1)
    .single();

  return data || { tier1_name: tier1, tier2_name: tier2 };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { tier1, tier2, tradetype } = await params;
  const locationInfo = await getLocationInfo(tier1, tier2);
  const categoryName = CATEGORY_DISPLAY[tradetype] || tradetype;

  const title = `${categoryName}s in ${locationInfo.tier2_name}, ${locationInfo.tier1_name} | CostaTrades`;
  const description = `Find trusted ${categoryName.toLowerCase()} services in ${locationInfo.tier2_name}, Costa del Sol. Verified professionals, real reviews. Get free quotes today.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://costatrades.com/locations/${tier1}/${tier2}/${tradetype}`,
    },
  };
}

function getFirstImage(imagesStr: string): string {
  try {
    if (imagesStr) {
      const images = JSON.parse(imagesStr.replace(/\"\"/g, '"'));
      if (images.length > 0) return images[0];
    }
  } catch (e) {}
  return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop";
}

export default async function TradetypePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { tier1, tier2, tradetype } = await params;
  
  const [tradespeople, locationInfo] = await Promise.all([
    getTradespeople(tier1, tier2, tradetype),
    getLocationInfo(tier1, tier2),
  ]);

  const categoryName = CATEGORY_DISPLAY[tradetype] || tradetype;

  if (tradespeople.length === 0) {
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
              <Link href={`/locations/${tier1}/${tier2}`} className="hover:text-blue-600">{locationInfo.tier2_name}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{categoryName}s</span>
            </nav>
          </div>
        </div>

        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-bold text-[#0a1f44] mb-4">
            No {categoryName}s Found in {locationInfo.tier2_name}
          </h1>
          <p className="text-gray-600 mb-8">
            We're expanding our network. Check back soon or post a job to get quotes.
          </p>
          <Link href="/post-job">
            <Button className="bg-[#E31E24] hover:bg-[#C41218]">
              Post a Job
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href={`/locations/${tier1}/${tier2}`} className="hover:text-blue-600">{locationInfo.tier2_name}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{categoryName}s</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#0a1f44] text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {categoryName}s in {locationInfo.tier2_name}
          </h1>
          <p className="text-blue-100 text-lg mb-6">
            {tradespeople.length} verified {categoryName.toLowerCase()}s ready to help in {locationInfo.tier2_name}, {locationInfo.tier1_name}
          </p>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              Verified Professionals
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Real Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="container-custom py-8">
        <div className="grid gap-4">
          {tradespeople.map((tp) => (
            <Link
              key={tp.id}
              href={`/locations/${tier1}/${tier2}/${tradetype}/${tp.slug}`}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={getFirstImage(tp.images)}
                      alt={tp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="font-bold text-lg text-[#0a1f44] truncate">
                          {tp.name}
                        </h2>
                        <p className="text-gray-600 text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {tp.tier2_name}, {tp.tier1_name}
                        </p>
                      </div>
                      {tp.verified && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex-shrink-0">
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                      {tp.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-semibold">{tp.rating}</span>
                          {tp.reviews_count > 0 && (
                            <span className="text-gray-500 text-sm">
                              ({tp.reviews_count} reviews)
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Phone */}
                    {tp.phone && (
                      <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {tp.phone}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="hidden md:flex items-center">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#0a1f44] text-white py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need a {categoryName} in {locationInfo.tier2_name}?
          </h2>
          <p className="text-blue-100 mb-6">
            Post your job and get quotes from verified professionals
          </p>
          <Link href={`/post-job?area=${tier2}&trade=${tradetype}`}>
            <Button className="bg-[#E31E24] hover:bg-[#C41218] text-white px-8 py-3">
              Get Free Quotes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;
