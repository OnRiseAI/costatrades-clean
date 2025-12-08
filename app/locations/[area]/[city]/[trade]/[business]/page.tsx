export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import TradespersonProfile from "@/pages/TradespersonProfile";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface PageParams {
  area: string;
  city: string;
  trade: string;
  business: string;
}

async function getBusiness(slug: string) {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

async function getReviews(placeId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("place_id", placeId)
    .order("published_at", { ascending: false })
    .limit(10);

  if (error) return [];
  return data || [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { area, city, trade, business: businessSlug } = await params;
  const business = await getBusiness(businessSlug);

  if (!business) {
    return {
      title: "Business Not Found | CostaTrades",
      description: "The business you are looking for does not exist.",
    };
  }

  const title = `${business.name} - ${business.category_display} in ${business.city} | CostaTrades`;
  const description = `Hire ${business.name}, a verified ${business.category_display} in ${business.city}, Costa del Sol. Rating: ${business.rating}⭐ (${business.reviews_count} reviews).`;
  const url = `https://costatrades.com/locations/${area}/${city}/${trade}/${businessSlug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url,
      siteName: "CostaTrades",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { area, city, trade, business: businessSlug } = await params;
  const business = await getBusiness(businessSlug);

  if (!business) {
    notFound();
  }

  // Fetch reviews for this business
  const reviews = await getReviews(business.place_id);

  // Parse images JSON if it's a string
  let images = [];
  try {
    if (typeof business.images === "string") {
      images = JSON.parse(business.images);
    } else if (Array.isArray(business.images)) {
      images = business.images;
    }
  } catch (e) {
    images = [];
  }

  // Transform to the format TradespersonProfile expects
  const specialistData = {
    id: business.id,
    slug: business.slug,
    businessName: business.name,
    tradeCategory: business.category_display,
    tradeCategorySlug: business.category,
    location: business.city,
    areaSlug: business.area_slug,
    areaName: business.area_name,
    citySlug: business.city_slug,
    rating: parseFloat(business.rating) || 0,
    reviewCount: parseInt(business.reviews_count) || 0,
    verified: business.verified === "true" || business.verified === true,
    phone: business.phone,
    website: business.website,
    address: business.address,
    bio: `${business.name} provides professional ${business.category_display.toLowerCase()} services in ${business.city} and surrounding areas of the Costa del Sol.`,
    areasCovered: [business.city, business.area_name],
    services: [business.category_display],
    profilePhoto: images[0] || "",
    coverImage: images[0] || "",
    googleMapsUrl: business.google_maps_url,
    latitude: business.latitude,
    longitude: business.longitude,
    openingHours: business.opening_hours,
    portfolio: images.slice(0, 4).map((img: string, i: number) => ({
      id: i + 1,
      title: `Project ${i + 1}`,
      image: img,
    })),
    reviews: reviews.map((r: any) => ({
      id: r.id,
      author: r.reviewer_name || "Anonymous",
      rating: parseInt(r.rating) || 5,
      date: r.published_at ? new Date(r.published_at).toLocaleDateString() : "",
      text: r.text || "",
      verified: true,
      ownerResponse: r.response_from_owner || null,
    })),
    // Breadcrumb data
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: business.area_name, href: `/locations/${area}` },
      { label: business.city, href: `/locations/${area}/${city}` },
      { label: business.category_display, href: `/locations/${area}/${city}/${trade}` },
      { label: business.name, href: null },
    ],
  };

  return (
    <div suppressHydrationWarning>
      <TradespersonProfile initialData={specialistData} />
    </div>
  );
}

export const revalidate = 3600; // Revalidate every hour
