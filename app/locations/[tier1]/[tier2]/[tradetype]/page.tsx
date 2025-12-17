import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Star, MapPin, Phone, CheckCircle, Shield, ArrowRight } from "lucide-react";
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
  // Fetch tradespeople
  const { data: tradespeopleData, error } = await supabase
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

  if (!tradespeopleData || tradespeopleData.length === 0) {
    return [];
  }

  // Get place_ids to fetch images from google_maps_businesses
  const placeIds = tradespeopleData
    .map((tp) => tp.place_id)
    .filter((id): id is string => !!id);

  if (placeIds.length === 0) {
    return tradespeopleData;
  }

  // Fetch images from google_maps_businesses by place_id
  const { data: gmbData } = await supabase
    .from("google_maps_businesses")
    .select("place_id, images")
    .in("place_id", placeIds);

  // Create a map of place_id -> images
  const imagesMap = new Map<string, string[]>();
  if (gmbData) {
    gmbData.forEach((gmb) => {
      if (gmb.images && Array.isArray(gmb.images) && gmb.images.length > 0) {
        imagesMap.set(gmb.place_id, gmb.images);
      }
    });
  }

  // Merge images into tradesperson records
  return tradespeopleData.map((tp) => ({
    ...tp,
    gmb_images: tp.place_id ? imagesMap.get(tp.place_id) || [] : [],
  }));
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

async function getOtherLocationsWithTradetype(tier1: string, currentTier2: string, tradetype: string) {
  const { data, error } = await supabase
    .from("tradespeople")
    .select("tier2_slug, tier2_name")
    .eq("tier1_slug", tier1)
    .eq("costatrades_category", tradetype)
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

  // Sort by count and return top 6
  return Object.entries(townCounts)
    .map(([slug, info]) => ({ slug, name: info.name, count: info.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { tier1, tier2, tradetype } = await params;
  const locationInfo = await getLocationInfo(tier1, tier2);
  const categoryName = CATEGORY_DISPLAY[tradetype] || tradetype;

  // Optimised for 50-55 chars to prevent SERP truncation
  const title = `${categoryName}s in ${locationInfo.tier2_name} | Free Quotes`;
  const description = `Find verified ${categoryName.toLowerCase()}s in ${locationInfo.tier2_name}, Costa del Sol. Real reviews, free quotes from local professionals.`;
  const url = `https://costatrades.com/locations/${tier1}/${tier2}/${tradetype}`;

  return {
    title,
    description,
    openGraph: {
      title: `${categoryName}s in ${locationInfo.tier2_name}, Costa del Sol`,
      description,
      type: "website",
      url,
    },
    alternates: {
      canonical: url,
    },
  };
}

// Generate a consistent color based on the business name
function getInitialsColor(name: string): string {
  const colors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-orange-600",
    "bg-teal-600",
    "bg-indigo-600",
    "bg-pink-600",
    "bg-cyan-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// Get initials from business name (up to 2 characters)
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

function getFirstImage(tradesperson: any): string | null {
  // First try gmb_images (native JSON array from google_maps_businesses)
  if (tradesperson.gmb_images && Array.isArray(tradesperson.gmb_images) && tradesperson.gmb_images.length > 0) {
    return tradesperson.gmb_images[0];
  }

  // Fallback to images field (JSON string format)
  try {
    if (tradesperson.images && tradesperson.images !== "[]") {
      const images = typeof tradesperson.images === "string"
        ? JSON.parse(tradesperson.images.replace(/\"\"/g, '"'))
        : tradesperson.images;
      if (Array.isArray(images) && images.length > 0) return images[0];
    }
  } catch (e) {}

  return null; // Return null to trigger initials display
}

export default async function TradetypePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { tier1, tier2, tradetype } = await params;

  const [tradespeople, locationInfo, otherLocations] = await Promise.all([
    getTradespeople(tier1, tier2, tradetype),
    getLocationInfo(tier1, tier2),
    getOtherLocationsWithTradetype(tier1, tier2, tradetype),
  ]);

  const categoryName = CATEGORY_DISPLAY[tradetype] || tradetype;

  // BreadcrumbList Schema for rich results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://costatrades.com" },
      { "@type": "ListItem", position: 2, name: locationInfo.tier1_name, item: `https://costatrades.com/locations/${tier1}` },
      { "@type": "ListItem", position: 3, name: locationInfo.tier2_name, item: `https://costatrades.com/locations/${tier1}/${tier2}` },
      { "@type": "ListItem", position: 4, name: `${categoryName}s`, item: `https://costatrades.com/locations/${tier1}/${tier2}/${tradetype}` },
    ],
  };

  // Service Schema for this trade category listing
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${categoryName} Services`,
    provider: { "@type": "Organization", name: "CostaTrades" },
    areaServed: {
      "@type": "Place",
      name: `${locationInfo.tier2_name}, Costa del Sol`,
    },
    description: `Find verified ${categoryName.toLowerCase()}s in ${locationInfo.tier2_name}. ${tradespeople.length} professionals available.`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Free quotes from verified professionals",
    },
  };

  // ItemList Schema for AEO - helps with rich snippets for "[trade] in [location]" searches
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryName}s in ${locationInfo.tier2_name}`,
    description: `${tradespeople.length} verified ${categoryName.toLowerCase()}s available in ${locationInfo.tier2_name}, ${locationInfo.tier1_name}.`,
    numberOfItems: tradespeople.length,
    itemListElement: tradespeople.slice(0, 10).map((tp, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tp.name,
      url: `https://costatrades.com/locations/${tier1}/${tier2}/${tradetype}/${tp.slug}`,
      item: {
        "@type": "LocalBusiness",
        name: tp.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: locationInfo.tier2_name,
          addressRegion: locationInfo.tier1_name,
          addressCountry: "ES",
        },
        ...(tp.rating > 0 && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tp.rating.toString(),
            reviewCount: (tp.reviews_count || 1).toString(),
            bestRating: "5",
            worstRating: "1",
          },
        }),
      },
    })),
  };

  // FAQPage Schema for AEO - answers common questions about this trade in this location
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How many ${categoryName.toLowerCase()}s are available in ${locationInfo.tier2_name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `There are ${tradespeople.length} verified ${categoryName.toLowerCase()}s available in ${locationInfo.tier2_name}, ${locationInfo.tier1_name}. All professionals are vetted and have real customer reviews.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I get quotes from ${categoryName.toLowerCase()}s in ${locationInfo.tier2_name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can get free quotes by posting your job on CostaTrades. Describe your project, and verified ${categoryName.toLowerCase()}s in ${locationInfo.tier2_name} will send you competitive quotes.`,
        },
      },
      {
        "@type": "Question",
        name: `Are ${categoryName.toLowerCase()}s in ${locationInfo.tier2_name} verified?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, all ${categoryName.toLowerCase()}s listed on CostaTrades are verified professionals with real customer reviews. We ensure quality and reliability for homeowners in ${locationInfo.tier2_name}.`,
        },
      },
    ],
  };

  const combinedSchema = { "@context": "https://schema.org", "@graph": [breadcrumbSchema, serviceSchema, itemListSchema, faqSchema] };

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
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />

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
                  {/* Image or Initials */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                    {getFirstImage(tp) ? (
                      <img
                        src={getFirstImage(tp)!}
                        alt={tp.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${getInitialsColor(tp.name)} text-white text-2xl md:text-3xl font-bold`}>
                        {getInitials(tp.name)}
                      </div>
                    )}
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

      {/* Other Locations Section */}
      {otherLocations.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="container-custom py-12">
            <h2 className="text-xl font-bold text-[#0a1f44] mb-2">
              Find {categoryName}s in Other Areas
            </h2>
            <p className="text-gray-600 mb-6">
              Browse {categoryName.toLowerCase()}s across {locationInfo.tier1_name}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {otherLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${tier1}/${location.slug}/${tradetype}`}
                  className="group flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-[#0a1f44] hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0 group-hover:text-[#0a1f44]" />
                    <span className="text-sm font-medium text-[#0a1f44] truncate group-hover:text-[#E31E24] transition-colors">
                      {location.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{location.count}</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <Link
                href={`/locations/${tier1}/${tier2}`}
                className="inline-flex items-center gap-2 text-[#0a1f44] font-semibold text-sm hover:text-[#E31E24] transition-colors"
              >
                All trades in {locationInfo.tier2_name}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/cost-guides/${tradetype === 'painter-decorator' ? 'painter' : tradetype === 'air-conditioning' ? 'ac-repair' : tradetype}`}
                className="inline-flex items-center gap-2 text-[#0a1f44] font-semibold text-sm hover:text-[#E31E24] transition-colors"
              >
                {categoryName} Cost Guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

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
