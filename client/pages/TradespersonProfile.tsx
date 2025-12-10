"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  MapPin,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Award,
  Users,
  Camera,
  ChevronRight,
  X,
  Check,
  Building2,
  User,
  AlertTriangle,
  Flag,
  MessageCircle,
  Smartphone,
  Zap,
  ShieldCheck,
  Home,
  Building,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { demoTradespeople, Tradesperson } from "@/data/tradespeople";
import { SEO } from "@/components/SEO";


// Costa del Sol trade pricing by category (estimates, +30% adjusted)
const PRICING_DATA: Record<string, { callOut: string; dayRate: string; commonJob: { name: string; price: string } }> = {
  "plumber": { callOut: "€65 - €100", dayRate: "€100 - €160", commonJob: { name: "Boiler Service", price: "€100 - €195" } },
  "electrician": { callOut: "€65 - €100", dayRate: "€130 - €210", commonJob: { name: "Full Rewire (3 bed)", price: "€3,900 - €5,200" } },
  "air-conditioning": { callOut: "€80 - €130", dayRate: "€155 - €235", commonJob: { name: "AC Unit Installation", price: "€975 - €1,950" } },
  "gardener": { callOut: "€50 - €80", dayRate: "€100 - €160", commonJob: { name: "Monthly Maintenance", price: "€155 - €260" } },
  "pool-maintenance": { callOut: "€65 - €100", dayRate: "€100 - €160", commonJob: { name: "Monthly Pool Service", price: "€100 - €195" } },
  "builder": { callOut: "€80 - €130", dayRate: "€100 - €160", commonJob: { name: "Bathroom Renovation", price: "€5,200 - €10,400" } },
  "painter-decorator": { callOut: "€50 - €80", dayRate: "€130 - €160", commonJob: { name: "Room Repaint", price: "€260 - €520" } },
  "locksmith": { callOut: "€65 - €130", dayRate: "€130 - €195", commonJob: { name: "Lock Change", price: "€100 - €195" } },
  "cleaning-services": { callOut: "€15 - €25/hour", dayRate: "N/A", commonJob: { name: "Deep Clean (3 bed)", price: "€195 - €325" } },
  "security-alarms": { callOut: "€80 - €130", dayRate: "€155 - €235", commonJob: { name: "Alarm System Install", price: "€650 - €1,950" } },
  "removals": { callOut: "Free Quote", dayRate: "€260 - €520", commonJob: { name: "Local Move (3 bed)", price: "€520 - €1,040" } },
  "carpenter": { callOut: "€65 - €100", dayRate: "€100 - €160", commonJob: { name: "Built-in Wardrobe", price: "€1,040 - €2,600" } },
  "handyman": { callOut: "€50 - €80", dayRate: "€100 - €130", commonJob: { name: "Half Day Jobs", price: "€65 - €100" } },
  "pest-control": { callOut: "€65 - €100", dayRate: "€130 - €195", commonJob: { name: "Pest Treatment", price: "€130 - €260" } },
  "solar-panels": { callOut: "Free Survey", dayRate: "Quote Based", commonJob: { name: "5kW System Install", price: "€6,500 - €9,750" } },
  "window-cleaning": { callOut: "N/A", dayRate: "€80 - €130", commonJob: { name: "Villa Windows", price: "€65 - €130" } },
  "glazier": { callOut: "€80 - €130", dayRate: "€130 - €195", commonJob: { name: "Window Replacement", price: "€260 - €650" } },
  "property-management": { callOut: "Free Consultation", dayRate: "Monthly Fee", commonJob: { name: "Monthly Management", price: "€130 - €390" } },
};
const DEFAULT_PRICING = { callOut: "€65 - €100", dayRate: "€100 - €195", commonJob: { name: "Standard Service", price: "Quote on Request" } };

// Services by trade category for SEO/AEO
const SERVICES_DATA: Record<string, string[]> = {
  "plumber": ["Leak Repair", "Boiler Service", "Bathroom Fitting", "Pipe Installation", "Emergency Plumbing", "Water Heater Repair"],
  "electrician": ["Rewiring", "Fuse Box Upgrade", "Lighting Installation", "Safety Inspections", "Socket Installation", "EV Charger Install"],
  "air-conditioning": ["AC Installation", "AC Repair", "AC Servicing", "Heat Pumps", "Duct Cleaning", "Climate Control"],
  "gardener": ["Lawn Care", "Tree Pruning", "Garden Design", "Irrigation Systems", "Hedge Trimming", "Landscape Maintenance"],
  "pool-maintenance": ["Pool Cleaning", "Chemical Balancing", "Filter Service", "Pool Repairs", "Pump Maintenance", "Winter Closing"],
  "builder": ["Extensions", "Renovations", "New Builds", "Structural Work", "Roofing", "Foundation Repair"],
  "painter-decorator": ["Interior Painting", "Exterior Painting", "Wallpapering", "Plastering", "Spray Painting", "Wood Finishing"],
  "locksmith": ["Lock Changes", "Emergency Entry", "Key Cutting", "Security Upgrades", "Safe Opening", "UPVC Lock Repair"],
  "cleaning-services": ["Deep Cleaning", "Regular Cleaning", "End of Tenancy", "Window Cleaning", "Carpet Cleaning", "Office Cleaning"],
  "security-alarms": ["Alarm Installation", "CCTV Systems", "Access Control", "Alarm Monitoring", "Security Upgrades", "Intercom Systems"],
  "removals": ["Home Removals", "Office Removals", "Packing Services", "Storage Solutions", "Piano Moving", "International Moves"],
  "carpenter": ["Custom Furniture", "Kitchen Fitting", "Door Installation", "Wardrobes", "Flooring", "Deck Building"],
  "handyman": ["General Repairs", "Furniture Assembly", "Mounting Services", "Minor Plumbing", "Minor Electrical", "Odd Jobs"],
  "pest-control": ["Insect Control", "Rodent Removal", "Termite Treatment", "Bird Proofing", "Fumigation", "Prevention Plans"],
  "solar-panels": ["Solar Installation", "Panel Maintenance", "Battery Storage", "System Design", "Energy Audits", "Inverter Repair"],
  "window-cleaning": ["Residential Windows", "Commercial Windows", "Conservatory Cleaning", "Gutter Clearing", "Pressure Washing", "Solar Panel Cleaning"],
  "glazier": ["Window Replacement", "Double Glazing", "Glass Repair", "Mirrors", "Shower Screens", "Shopfronts"],
  "property-management": ["Tenant Management", "Rent Collection", "Property Inspections", "Maintenance Coordination", "Key Holding", "Holiday Lets"],
};
const DEFAULT_SERVICES = ["Residential", "Commercial", "Consultation", "Emergency Service", "Free Quotes"];


// Extended interface for the full profile
interface TradespersonProfileData extends Tradesperson {
  type: "Company" | "Sole Trader";
  cif?: string;
  insurance?: string;
  street?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  bio: string;
  areasCovered: string[];
  team?: {
    name: string;
    role: string;
    photo: string;
  }[];
  portfolio: {
    id: number;
    image: string;
    title: string;
  }[];
  reviews: {
    id: number;
    author: string;
    rating: number;
    date: string;
    text: string;
    verified: boolean;
  }[];
  coverImage: string;
  isClaimed: boolean;
  created_year: string;
  googleMapsUrl?: string;
}

interface TradespersonProfileProps {
  initialData?: any;
}

export default function TradespersonProfile({
  initialData,
}: TradespersonProfileProps = {}) {
  const params = useParams();
  const slug = params?.slug as string;
  
  // Default data to fill in missing fields
  const defaultData: TradespersonProfileData = {
    id: "",
    slug: "",
    type: "Company",
    bio: "",
    areasCovered: [],
    portfolio: [],
    reviews: [],
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop",
    isClaimed: true,
    created_year: "2020",
    rating: 5.0,
    reviewCount: 0,
    verified: true,
    yearsInBusiness: 1,
    phone: "",
    email: "",
    website: "",
    street: "",
    postal_code: "",
    googleMapsUrl: "#",
    businessName: "Business",
    tradeCategory: "Tradesperson",
    tradeCategorySlug: "tradesperson",
    location: "Costa del Sol",
    profilePhoto: "",
  };
  
  const [profile, setProfile] = useState<TradespersonProfileData | null>(
    initialData ? { ...defaultData, ...initialData } as TradespersonProfileData : null,
  );
  const [loading, setLoading] = useState(!initialData);
  
  // Create safe profile with all defaults applied
  // Filter out undefined values from profile so defaults are used
  const cleanProfile = profile ? Object.fromEntries(
    Object.entries(profile).filter(([_, v]) => v !== undefined)
  ) : {};
  const safeProfile = { ...defaultData, ...cleanProfile } as TradespersonProfileData;
  const pricing = PRICING_DATA[safeProfile.tradeCategorySlug] || DEFAULT_PRICING;
  const services = SERVICES_DATA[safeProfile.tradeCategorySlug] || DEFAULT_SERVICES;

  useEffect(() => {
    // Skip loading if we already have initialData
    if (initialData) {
      setLoading(false);
      return;
    }

    // Simulate API fetch
    // For the purpose of this design task, we force the "German Precision Electric" data
    // regardless of the slug, or we can just use it as a base.
    // To respect the "dynamic template" request, we'll try to use the slug if it matches,
    // but default to the requested placeholder content if we are in "design mode" or if not found.

    // For this specific task, I will override the data to match the prompt's "German Precision Electric"
    // to ensure the user sees exactly what they asked for.

    const mockProfile: TradespersonProfileData = {
      id: "german-precision-electric",
      slug: "german-precision-electric",
      businessName: "German Precision Electric",
      tradeCategory: "Electrician",
      tradeCategorySlug: "electrician",
      location: "Marbella",
      rating: 5.0,
      reviewCount: 24,
      verified: true,
      yearsInBusiness: 10,
      phone: "+34 123 456 789",
      email: "contact@germanelectric.com",
      website: "https://germanelectric.com",
      type: "Company",
      cif: "B-12345678",
      insurance: "Liability Insurance up to €1M",
      street: "Calle de la Plata 12",
      postal_code: "29601",
      bio: "German Precision Electric has been serving the Costa del Sol for over 10 years. We specialize in high-quality electrical installations, repairs, and maintenance for both residential and commercial properties. Our team of certified master electricians is dedicated to safety, efficiency, and precision in every job we undertake.",
      areasCovered: ["Marbella", "Estepona", "Mijas"],
      portfolio: [
        {
          id: 1,
          title: "Luxury Villa Rewiring",
          image:
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&h=600&fit=crop",
        },
        {
          id: 2,
          title: "Smart Home Installation",
          image:
            "https://images.unsplash.com/photo-1558002038-1091a166111c?w=800&h=600&fit=crop",
        },
        {
          id: 3,
          title: "Commercial Lighting",
          image:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        },
      ],
      reviews: [
        {
          id: 1,
          author: "Hans M.",
          rating: 5,
          date: "1 week ago",
          text: "Absolutely fantastic service. Punctual, clean, and very professional.",
          verified: true,
        },
        {
          id: 2,
          author: "Sarah L.",
          rating: 5,
          date: "2 weeks ago",
          text: "Fixed our emergency power outage in record time. Highly recommended!",
          verified: true,
        },
      ],
      coverImage:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop", // Modern villa/construction
      profilePhoto: "", // Will use placeholder logic
      isClaimed: true, // We will show both cards as requested
      services: ["Rewiring", "Lighting", "Fuse Boxes", "Emergency Repair"],
      languages: ["English", "German", "Spanish"],
      created_year: "2014",
      googleMapsUrl: "https://maps.google.com/?q=German+Precision+Electric",
    };

    setProfile(mockProfile);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a1f44]"></div>
      </div>
    );
  }

  if (!profile) return null;

  // Use safeProfile for all rendering to avoid undefined errors

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans pb-20 md:pb-0">
      <SEO
        title={`${safeProfile.businessName || "Business"} - ${safeProfile.location || "Costa del Sol"} | CostaTrades`}
        description={`Hire ${safeProfile.businessName || "this business"}, a verified ${safeProfile.tradeCategory || "tradesperson"} in ${safeProfile.location || "Costa del Sol"}.`}
      />

      {/* SECTION 1: THE HERO HEADER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-4">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-[#0066CC]">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li>
              <Link
                href={`/locations/${(safeProfile.location).toLowerCase()}`}
                className="hover:text-[#0066CC]"
              >
                {safeProfile.location}
              </Link>
            </li>
            <li>
              <span className="text-gray-300">/</span>
            </li>
            <li className="font-medium text-gray-900">
              {safeProfile.tradeCategory}s
            </li>
          </ol>
        </nav>

        {/* Cover Image */}
        <div className="relative w-full h-[250px] rounded-lg overflow-hidden shadow-sm">
          <img
            src={safeProfile.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Bar (Overlapping) */}
        <div className="relative px-4 sm:px-8 -mt-[60px] flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          <div className="w-[120px] h-[120px] rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex-shrink-0">
            {safeProfile.profilePhoto ? (
              <img
                src={safeProfile.profilePhoto}
                alt={safeProfile.businessName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#0a1f44] text-white text-4xl font-bold">
                {(safeProfile.businessName).charAt(0)}
              </div>
            )}
          </div>

          {/* Info Stack */}
          <div className="flex-1 pb-2 sm:mt-[60px] pt-3">
            {/* 1. The "Kicker" (Role) */}
            <div className="text-xs font-bold text-[#0066CC] uppercase tracking-[2px] mb-2">
              MASTER {(safeProfile.tradeCategory).toUpperCase()}
            </div>

            {/* Middle Element: Headline Row */}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0a1f44]">
                {safeProfile.businessName}
              </h1>
              {safeProfile.verified && (
                <CheckCircle className="w-6 h-6 text-[#16A34A]" />
              )}
              <span className="text-gray-300 text-2xl font-light">|</span>
              <span className="text-2xl font-light text-gray-500">
                {safeProfile.location}
              </span>
            </div>

            {/* 2. The Google Rating Pill */}
            <a
              href={safeProfile.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:border-[#0066CC] transition-colors cursor-pointer mt-3"
            >
              {/* Element A: The Google G */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                className="w-[18px] h-[18px]"
              >
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                  />
                  <path
                    fill="#34A853"
                    d="M12.255 24c3.24 0 5.95-1.08 7.92-2.91l-3.86-3c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98C.435 8.55 0 10.37 0 12.29c0 1.92.435 3.74 1.545 5.71l3.98-3.09z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12.255 4.58c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                  />
                </g>
              </svg>

              {/* Element B: The Score */}
              <span className="font-bold text-[#0a1f44] text-sm">
                {(safeProfile.rating ?? 5).toFixed(1)}
              </span>

              {/* Element C: The Divider */}
              <div className="w-[1px] h-3 bg-gray-300"></div>

              {/* Element D: The Visuals */}
              <div className="flex flex-row gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]"
                  />
                ))}
              </div>

              {/* Element E: The Count */}
              <span className="text-xs text-gray-500 font-medium">
                ({safeProfile.reviewCount ?? 0})
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* PRO PERFORMANCE BAR - Updated for Space Efficiency */}
      <div className="w-full bg-slate-50 border-y border-slate-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 py-5">
          {/* Reduced padding slightly */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 md:divide-x divide-slate-200">
            {/* 1. CONTACT VERIFIED (Short & Safe) */}
            <div className="flex items-center justify-center gap-3 px-2 md:px-4">
              <div className="p-2 bg-green-100 rounded-lg text-green-700 shrink-0">
                <Smartphone size={18} /> {/* Slightly smaller icon */}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Identity
                </p>
                <p className="text-sm font-bold text-slate-900 leading-tight whitespace-nowrap">
                  Contact Verified
                </p>
              </div>
            </div>

            {/* 2. ACTIVITY */}
            <div className="flex items-center justify-center gap-3 px-2 md:px-4">
              <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700 shrink-0">
                <Zap size={18} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Activity
                </p>
                <p className="text-sm font-bold text-slate-900 leading-tight whitespace-nowrap">
                  Fast Responder
                </p>
              </div>
            </div>

            {/* 3. PROMISE */}
            <div className="flex items-center justify-center gap-3 px-2 md:px-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Commitment
                </p>
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  Fair Price Promise
                </p>
              </div>
            </div>

            {/* 4. LOCATION */}
            <div className="flex items-center justify-center gap-3 px-2 md:px-4">
              <div className="p-2 bg-slate-200 rounded-lg text-slate-600 shrink-0">
                <MapPin size={18} />
              </div>
              <div className="group relative cursor-pointer">
                {/* Tooltip Box */}
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1F2937] text-white text-xs font-medium px-3 py-2 rounded-md shadow-lg whitespace-nowrap transition-opacity duration-200 z-10">
                  {safeProfile.address
                    ? `${safeProfile.address}, ${safeProfile.postal_code}`
                    : "Address available on request"}
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1F2937]"></div>
                </div>

                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Location
                </p>
                <p className="text-sm font-bold text-slate-900 leading-tight truncate max-w-[100px]">
                  {safeProfile.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: MAIN LAYOUT (Grid) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[66%_33%] gap-8">
          {/* LEFT COLUMN (Content) */}
          <div className="space-y-10">
            {/* About */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4">
                About {safeProfile.businessName}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {safeProfile.bio}
              </p>
            </section>

            {/* Services */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4">
                Services
              </h2>
              <div className="flex flex-wrap gap-3 items-center">
                {services.map((service, index) => (
                  <div key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-[#EFF6FF] border border-[#DBEAFE] rounded-full hover:border-[#1E40AF] transition-colors cursor-default">
                    <CheckCircle className="w-4 h-4 text-[#1E40AF]" />
                    <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wide">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* NEW SECTION: PRICING RATE CARD */}
            <section>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-[#F8FAFC] px-6 py-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-[#0a1f44] font-bold text-lg mb-1">
                      Standard Rate Guide
                    </h3>
                    <p className="text-sm text-gray-500">
                      Estimated pricing for this trade category. Final quote
                      provided upon inspection.
                    </p>
                  </div>
                  <Link
                    href="/cost-guides"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-[#16A34A] text-xs font-bold border border-green-100 whitespace-nowrap self-start sm:self-center hover:underline"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Fair Price Promise
                  </Link>
                </div>

                {/* Pricing Rows */}
                <div className="divide-y divide-gray-100">
                  {/* Item 1 */}
                  <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-[#F3F4F6] hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-[#0a1f44]">
                      Standard Call Out
                    </div>
                    <div className="font-bold text-[#0066CC] text-right">
                      {pricing.callOut}
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-[#F3F4F6] hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-[#0a1f44]">
                      Daily Labor Rate
                    </div>
                    <div className="font-bold text-[#0066CC] text-right">
                      {pricing.dayRate}
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-[#F3F4F6] hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-[#0a1f44]">
                      {pricing.commonJob.name}
                    </div>
                    <div className="font-bold text-[#0066CC] text-right">
                      {pricing.commonJob.price}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 py-5 bg-white border-t border-gray-100 flex items-center justify-center gap-2">
                  <span className="text-gray-500 text-sm">
                    Not sure what you need?
                  </span>
                  <Link
                    href={`/post-job?area=${(safeProfile.location).toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-[#FF8A00] font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    Get a Custom Quote <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>
            {/* UPGRADE 1: THE "GOOGLE REVIEWS" DASHBOARD */}
            <section className="bg-[#F9FAFB] rounded-xl p-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-[#0a1f44] font-bold text-2xl">
                  Client Reviews
                </h2>
              </div>
              {safeProfile.googleReviews && safeProfile.googleReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {safeProfile.googleReviews.slice(0, 4).map((review: any, i: number) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#0a1f44] flex items-center justify-center text-white font-bold">
                            {review.reviewer_name?.charAt(0) || "U"}
                          </div>
                          <div className="font-bold text-[#0a1f44]">
                            {review.reviewer_name || "Anonymous"}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {review.published_at ? new Date(review.published_at).toLocaleDateString() : ""}
                        </div>
                      </div>
                      <div className="flex text-[#FFB400] mb-3">
                        {[...Array(review.rating || 5)].map((_, star) => (
                          <Star key={star} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      {review.text && (
                        <p className="text-gray-700 leading-relaxed text-sm mb-4">
                          &quot;{review.text}&quot;
                        </p>
                      )}
                      {review.response_from_owner && (
                        <div className="bg-[#EFF6FF] rounded-md p-3 mt-4">
                          <p className="text-xs text-blue-800">
                            <span className="font-bold">Business Response:</span> {review.response_from_owner}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 bg-[#FFF7ED] rounded-full flex items-center justify-center">
                    <Star className="w-10 h-10 text-[#FF8A00]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a1f44] mb-2">
                    Be the first to review {safeProfile.businessName}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Share your experience and help others find great tradespeople.
                  </p>
                  <a
                    href={safeProfile.googleMapsUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a1f44] text-white font-bold rounded-lg hover:bg-[#1a3a5c] transition-colors"
                  >
                    <Star className="w-5 h-5" />
                    Write a Review on Google
                  </a>
                </div>
              )}
            </section>
            {/* Gallery */}
            {Array.isArray(safeProfile.portfolio) && safeProfile.portfolio.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4">
                Portfolio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
                {/* Large Left Image */}
                <div className="md:row-span-2 rounded-lg overflow-hidden relative group cursor-pointer">
                  <img
                    src={safeProfile.portfolio[0]?.image}
                    alt={safeProfile.portfolio[0]?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Small Right Images */}
                {safeProfile.portfolio[1] && (
                <div className="rounded-lg overflow-hidden relative group cursor-pointer">
                  <img
                    src={safeProfile.portfolio[1]?.image}
                    alt={safeProfile.portfolio[1]?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                )}
                {safeProfile.portfolio[2] && (
                <div className="rounded-lg overflow-hidden relative group cursor-pointer">
                  <img
                    src={safeProfile.portfolio[2]?.image}
                    alt={safeProfile.portfolio[2]?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {safeProfile.portfolio.length > 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                      +{safeProfile.portfolio.length - 3} More
                    </div>
                  )}
                </div>
                )}
              </div>
            </section>
            )}

            {/* UPGRADE 3: THE SERVICE AREA MAP */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-[#0a1f44] font-bold text-lg">
                  Service Area
                </h3>
              </div>
              <div className="relative h-[200px] w-full">
                <iframe
                  width="100%"
                  height="200"
                  frameBorder="0"
                  scrolling="no"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${(safeProfile.longitude || -4.88) - 0.18}%2C${(safeProfile.latitude || 36.51) - 0.12}%2C${(safeProfile.longitude || -4.88) + 0.18}%2C${(safeProfile.latitude || 36.51) + 0.12}&layer=mapnik&marker=${safeProfile.latitude || 36.51}%2C${safeProfile.longitude || -4.88}`}
                  style={{ border: "none" }}
                />
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (The Sticky Sidebar) */}
          <div className="relative">
            <div className="sticky top-[100px] space-y-6">
              {/* Contact Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-[#0a1f44] mb-4">
                  Contact Business
                </h3>

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Available for Quotes
                  </span>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/post-job/results?category=${encodeURIComponent(safeProfile.tradeCategory)}&option=General%20Enquiry&postcode=${encodeURIComponent(safeProfile.location)}`}
                  >
                    <Button className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold h-12 text-base shadow-sm">
                      Request a Quote
                    </Button>
                  </Link>

                  <a href={`https://wa.me/${safeProfile.phone?.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"><Button className="w-full bg-[#25D366] hover:bg-[#1ebc57] text-white font-bold h-12 text-base shadow-sm flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5 fill-current" />
                    Chat on WhatsApp
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" /> Protected by Costa Trades
                    Guarantee
                  </p>
                </div>
              </div>

              {/* SECTION 3: THE "UNCLAIMED" VARIANT (Visual Test) */}
              <div className="bg-[#FFF7ED] border border-[#FF8A00] rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0a1f44] mb-2">
                  Is this your business?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Claim it to manage reviews and receive job leads.
                </p>
                <Button className="w-full bg-[#FF8A00] hover:bg-[#e67c00] text-white font-bold h-10">
                  Claim for Free
                </Button>
              </div>

              <div className="text-xs text-gray-400 text-left px-2">
                Costa Trades validates digital contact details. Customers are
                advised to request specific insurance documents directly from
                the trade before work commences.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
