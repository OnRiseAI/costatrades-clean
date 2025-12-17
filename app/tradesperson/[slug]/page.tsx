export const dynamic = "force-dynamic";
import { Metadata, MetadataRoute } from "next";
import { notFound } from "next/navigation";
import TradespersonProfile from "@/pages/TradespersonProfile";

interface TradespersonParams {
  slug: string;
}

interface SpecialistData {
  id: string;
  slug: string;
  businessName: string;
  tradeCategory: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  yearsInBusiness?: number;
  phone?: string;
  email?: string;
  website?: string;
  bio?: string;
  areasCovered?: string[];
  services?: string[];
  profilePhoto?: string;
  coverImage?: string;
  created_year?: string;
  googleMapsUrl?: string;
  [key: string]: any;
}

/**
 * Fetch specialist data from Supabase
 * This runs on the server at request time (no static generation yet)
 */
async function fetchSpecialist(slug: string): Promise<SpecialistData | null> {
  try {
    // For now, we're using mock data since the actual Supabase integration
    // will depend on your real database schema.
    // In production, replace this with actual Supabase query:
    /*
    const { data, error } = await supabase
      .from('tradespeople')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error || !data) return null;
    return data as SpecialistData;
    */

    // Mock data for testing
    const mockData: Record<string, SpecialistData> = {
      "german-precision-electric": {
        id: "german-precision-electric",
        slug: "german-precision-electric",
        businessName: "German Precision Electric",
        tradeCategory: "Electrician",
        location: "Marbella",
        rating: 5.0,
        reviewCount: 24,
        verified: true,
        yearsInBusiness: 10,
        phone: "+34 123 456 789",
        email: "contact@germanelectric.com",
        website: "https://germanelectric.com",
        bio: "German Precision Electric has been serving the Costa del Sol for over 10 years. We specialize in high-quality electrical installations, repairs, and maintenance for both residential and commercial properties.",
        areasCovered: ["Marbella", "Estepona", "Mijas"],
        services: ["Rewiring", "Lighting", "Fuse Boxes", "Emergency Repair"],
        profilePhoto: "",
        coverImage:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop",
        created_year: "2014",
        googleMapsUrl: "https://maps.google.com/?q=German+Precision+Electric",
        portfolio: [
          { id: 1, title: "Luxury Villa Rewiring", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&h=600&fit=crop" },
          { id: 2, title: "Smart Home Installation", image: "https://images.unsplash.com/photo-1558002038-1091a166111c?w=800&h=600&fit=crop" },
          { id: 3, title: "Commercial Lighting", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" },
        ],
        reviews: [
          { id: 1, author: "Hans M.", rating: 5, date: "1 week ago", text: "Absolutely fantastic service.", verified: true },
          { id: 2, author: "Sarah L.", rating: 5, date: "2 weeks ago", text: "Very professional and on time.", verified: true },
        ],
      },
      "aqua-masters-costa": {
        id: "aqua-masters-costa",
        slug: "aqua-masters-costa",
        businessName: "Aqua Masters Costa",
        tradeCategory: "Plumber",
        location: "Estepona",
        rating: 4.8,
        reviewCount: 31,
        verified: true,
        yearsInBusiness: 8,
        phone: "+34 234 567 890",
        email: "info@aquamasters.com",
        website: "https://aquamasters.com",
        bio: "Aqua Masters Costa specializes in plumbing services for residential and commercial clients. We provide reliable solutions for water systems, drainage, and emergency repairs along the Costa del Sol.",
        areasCovered: ["Estepona", "Marbella", "Benahavis"],
        services: [
          "Pipe Repair",
          "Installation",
          "Drainage",
          "Emergency Plumbing",
        ],
        profilePhoto: "",
        coverImage:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&h=400&fit=crop",
        created_year: "2016",
        googleMapsUrl: "https://maps.google.com/?q=Aqua+Masters+Costa",
        portfolio: [
          { id: 1, title: "Bathroom Renovation", image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop" },
          { id: 2, title: "Kitchen Plumbing", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop" },
        ],
        reviews: [
          { id: 1, author: "Miguel R.", rating: 5, date: "3 days ago", text: "Fixed our leak quickly.", verified: true },
        ],
      },
    };

    return mockData[slug] || null;
  } catch (error) {
    console.error("Error fetching specialist:", error);
    return null;
  }
}

/**
 * Generate metadata for SEO and social sharing
 * This runs on the server and populates Open Graph tags
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<TradespersonParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialist = await fetchSpecialist(slug);

  if (!specialist) {
    return {
      title: "Specialist Not Found | CostaTrades",
      description: "The specialist you are looking for does not exist.",
    };
  }

  const title = `${specialist.businessName} - ${specialist.tradeCategory} in ${specialist.location} | CostaTrades`;
  const description = `Hire ${specialist.businessName}, a verified ${specialist.tradeCategory} in ${specialist.location}. Rating: ${specialist.rating}⭐ (${specialist.reviewCount} reviews).`;
  const url = `https://costatrades.com/tradesperson/${specialist.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url,
      siteName: "CostaTrades",
      images: [
        {
          url:
            specialist.coverImage ||
            specialist.profilePhoto ||
            "https://costatrades.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: specialist.businessName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        specialist.coverImage ||
          specialist.profilePhoto ||
          "https://costatrades.com/og-image.jpg",
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Main Page Component
 * Fetches specialist data and renders the profile
 */
import { Suspense } from "react";

function TradespersonLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>
  );
}

export default async function TradespersonProfilePage({
  params,
}: {
  params: Promise<TradespersonParams>;
}) {
  const { slug } = await params;
  const specialist = await fetchSpecialist(slug);

  if (!specialist) {
    notFound();
  }

  return (
    <Suspense fallback={<TradespersonLoader />}>
      <div suppressHydrationWarning>
        <TradespersonProfile initialData={specialist} />
      </div>
    </Suspense>
  );
}

/**
 * Generate static paths for known specialists (optional for ISR)
 * This enables Incremental Static Regeneration (ISR)
 */
export async function generateStaticParams(): Promise<TradespersonParams[]> {
  // Fetch all specialist slugs from Supabase
  // For now, return empty array and rely on dynamic generation
  // In production:
  /*
  const { data } = await supabase
    .from('tradespeople')
    .select('slug');
  
  return (data || []).map((specialist) => ({
    slug: specialist.slug,
  }));
  */

  return [
    { slug: "german-precision-electric" },
    { slug: "aqua-masters-costa" },
    // Add more slugs as needed
  ];
}

/**
 * Configure revalidation for ISR
 * 3600 seconds = 1 hour
 * The page will be regenerated in the background every hour
 */
export const revalidate = 3600;
