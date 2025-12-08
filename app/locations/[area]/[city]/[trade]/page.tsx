export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Star, MapPin, Phone, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface PageParams {
  area: string;
  city: string;
  trade: string;
}

async function getBusinesses(areaSlug: string, citySlug: string, tradeSlug: string) {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("area_slug", areaSlug)
    .eq("city_slug", citySlug)
    .eq("category", tradeSlug)
    .order("rating", { ascending: false });

  if (error) return [];
  return data || [];
}

async function getCategory(slug: string) {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

async function getLocation(slug: string) {
  const { data } = await supabase
    .from("locations")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { area, city, trade } = await params;
  const category = await getCategory(trade);
  const location = await getLocation(city);
  
  const tradeName = category?.name || trade;
  const cityName = location?.name || city;

  const title = `${tradeName} in ${cityName} | Verified Professionals | CostaTrades`;
  const description = `Find verified ${tradeName.toLowerCase()} professionals in ${cityName}, Costa del Sol. Compare ratings, read reviews, and get quotes from trusted local tradespeople.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function TradeListingsPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { area, city, trade } = await params;
  const businesses = await getBusinesses(area, city, trade);
  const category = await getCategory(trade);
  const location = await getLocation(city);
  const areaLocation = await getLocation(area);

  if (businesses.length === 0) {
    // Show empty state instead of 404
  }

  const tradeName = category?.name || trade;
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
            <Link href={`/locations/${area}/${city}`} className="hover:text-blue-600">{cityName}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{tradeName}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-[#0a1f44] text-white py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {tradeName} in {cityName}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {businesses.length} verified {tradeName.toLowerCase()} professionals ready to help. 
            All tradespeople are ID-verified and reviewed by local customers.
          </p>
        </div>
      </section>

      {/* Listings */}
      <section className="py-8">
        <div className="container-custom">
          {businesses.length === 0 ? (
            <Card className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">No {tradeName} found in {cityName} yet</h2>
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
            <div className="grid gap-6">
              {businesses.map((biz: any) => {
                let images: string[] = [];
                try {
                  if (typeof biz.images === "string") {
                    images = JSON.parse(biz.images);
                  }
                } catch (e) {}

                return (
                  <Card key={biz.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image */}
                      <div className="w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {images[0] ? (
                          <img
                            src={images[0]}
                            alt={biz.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
                            {biz.name?.charAt(0) || "?"}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link href={`/locations/${area}/${city}/${trade}/${biz.slug}`}>
                              <h2 className="text-xl font-bold text-[#0a1f44] hover:text-blue-600">
                                {biz.name}
                              </h2>
                            </Link>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {biz.city}
                              </span>
                              {biz.verified === "true" && (
                                <span className="flex items-center gap-1 text-green-600">
                                  <Shield className="w-4 h-4" />
                                  Verified
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Rating */}
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                              <span className="font-bold text-lg">{biz.rating || "New"}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {biz.reviews_count || 0} reviews
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          Professional {tradeName.toLowerCase()} services in {biz.city} and surrounding areas.
                        </p>

                        <div className="flex flex-wrap gap-3">
                          <Link href={`/locations/${area}/${city}/${trade}/${biz.slug}`}>
                            <Button variant="outline">View Profile</Button>
                          </Link>
                          <Link href={`/post-job?trade=${trade}&area=${city}`}>
                            <Button className="bg-[#E31E24] hover:bg-[#C41218]">
                              Get Quote
                            </Button>
                          </Link>
                          {biz.phone && (
                            <a href={`tel:${biz.phone}`}>
                              <Button variant="outline" className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Call
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#0a1f44] text-white">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">
            Need a {tradeName} in {cityName}?
          </h2>
          <p className="text-blue-100 mb-6">
            Post your job and receive quotes from verified professionals
          </p>
          <Link href={`/post-job?trade=${trade}&area=${city}`}>
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
