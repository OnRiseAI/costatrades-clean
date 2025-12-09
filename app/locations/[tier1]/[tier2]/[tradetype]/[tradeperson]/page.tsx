import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import TradespersonProfile from "@/pages/TradespersonProfile";

// Server-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY"
);

interface PageParams {
  tier1: string;
  tier2: string;
  tradetype: string;
  tradeperson: string;
}

interface TradespersonData {
  id: string;
  slug: string;
  name: string;
  costatrades_category: string;
  category_display: string;
  city: string;
  tier1_slug: string;
  tier1_name: string;
  tier2_slug: string;
  tier2_name: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviews_count: number;
  latitude: number;
  longitude: number;
  verified: boolean;
  images: string;
  opening_hours: string;
  google_maps_url: string;
  place_id: string;
}

async function getTradesperson(slug: string): Promise<TradespersonData | null> {
  const { data, error } = await supabase
    .from("tradespeople")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching tradesperson:", error);
    return null;
  }

  return data as TradespersonData;
}

async function getReviews(placeId: string) {
  if (!placeId) return [];
  const { data, error } = await supabase
    .from("google_maps_reviews")
    .select("*")
    .eq("place_id", placeId)
    .order("published_at", { ascending: false })
    .limit(10);
  if (error || !data) {
    console.error("Error fetching reviews:", error);
    return [];
  }
  return data;
}


// Transform Supabase data to match TradespersonProfile expected format
function transformToProfileData(data: TradespersonData) {
  // Parse images JSON string to array
  let imageArray: string[] = [];
  try {
    if (data.images) {
      imageArray = JSON.parse(data.images.replace(/\"\"/g, '"'));
    }
  } catch (e) {
    imageArray = [];
  }

  return {
    id: data.id,
    slug: data.slug,
    businessName: data.name,
    tradeCategory: data.category_display,
    tradeCategorySlug: data.costatrades_category,
    location: data.tier2_name,
    locationSlug: data.tier2_slug,
    areaName: data.tier1_name,
    areaSlug: data.tier1_slug,
    rating: data.rating || 0,
    reviewCount: data.reviews_count || 0,
    verified: data.verified || false,
    phone: data.phone,
    website: data.website,
    address: data.address,
    bio: `${data.name} provides professional ${data.category_display.toLowerCase()} services in ${data.tier2_name}, ${data.tier1_name}. Contact us for reliable and quality service.`,
    yearsInBusiness: 5, // Default, can be added to DB later
    profilePhoto: imageArray[0] || "",
    coverImage: imageArray[0] || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=400&fit=crop",
    images: imageArray,
    googleMapsUrl: data.google_maps_url,
    latitude: data.latitude,
    longitude: data.longitude,
    openingHours: data.opening_hours,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { tier1, tier2, tradetype, tradeperson } = await params;
  const data = await getTradesperson(tradeperson);

  if (!data) {
    return {
      title: "Tradesperson Not Found | CostaTrades",
      description: "The tradesperson you are looking for does not exist.",
    };
  }

  const title = `${data.name} - ${data.category_display} in ${data.tier2_name}, ${data.tier1_name} | CostaTrades`;
  const description = `Hire ${data.name}, a verified ${data.category_display.toLowerCase()} in ${data.tier2_name}, Costa del Sol. ${data.rating ? `Rating: ${data.rating}⭐` : ""} ${data.reviews_count ? `(${data.reviews_count} reviews)` : ""}. Contact for a free quote.`;
  const url = `https://costatrades.com/locations/${tier1}/${tier2}/${tradetype}/${tradeperson}`;

  let imageUrl = "https://costatrades.com/og-image.jpg";
  try {
    if (data.images) {
      const images = JSON.parse(data.images.replace(/\"\"/g, '"'));
      if (images.length > 0) imageUrl = images[0];
    }
  } catch (e) {}

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url,
      siteName: "CostaTrades",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: data.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function TradespersonPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { tier1, tier2, tradetype, tradeperson } = await params;
  
  const data = await getTradesperson(tradeperson);

  if (!data) {
    notFound();
  }

  // Verify URL matches the data (SEO protection)
  if (
    data.tier1_slug !== tier1 ||
    data.tier2_slug !== tier2 ||
    data.costatrades_category !== tradetype
  ) {
    // Redirect to correct URL would be better, but for now just show the page
    console.warn("URL mismatch, showing page anyway");
  }

  const reviews = await getReviews(data.place_id);
  const profileData = { ...transformToProfileData(data), googleReviews: reviews };

  return (
    <div suppressHydrationWarning>
      <TradespersonProfile initialData={profileData} />
    </div>
  );
}

// Generate static params for all tradespeople (for SSG)
export async function generateStaticParams(): Promise<PageParams[]> {
  const { data, error } = await supabase
    .from("tradespeople")
    .select("slug, tier1_slug, tier2_slug, costatrades_category");

  if (error || !data) {
    console.error("Error fetching tradespeople for static params:", error);
    return [];
  }

  return data.map((tp) => ({
    tier1: tp.tier1_slug,
    tier2: tp.tier2_slug,
    tradetype: tp.costatrades_category,
    tradeperson: tp.slug,
  }));
}

export const revalidate = 3600; // Revalidate every hour
