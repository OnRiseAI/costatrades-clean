"use client";

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Search,
  MessageSquare,
  ShieldCheck,
  Globe,
  Euro,
  ArrowRight,
  Eye,
  MessageCircle,
  CheckCircle,
  CheckCircle2,
  TrendingUp,
  Users,
  Wallet,
  MapPin,
  Quote,
  ChevronDown,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Shovel,
  Droplets,
  Snowflake,
  Key,
  Clock,
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Testimonial rotation
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("popular");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/post-job?option=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/post-job");
    }
  };

  const testimonials = [
    {
      text: "Found a brilliant electrician within 24 hours. Spoke perfect English and fixed the issue immediately.",
      author: "Marcus",
      location: "Mijas Costa",
      initial: "M",
      color: "bg-[#E31E24]",
    },
    {
      text: "Finally a platform where I can find reliable tradespeople who actually show up. Highly recommended!",
      author: "Sarah",
      location: "Marbella",
      initial: "S",
      color: "bg-[#F59E0B]",
    },
    {
      text: "Great experience finding a pool maintenance service. The quotes were transparent and fair.",
      author: "David",
      location: "Estepona",
      initial: "D",
      color: "bg-[#10B981]",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const rates = [
    { service: "Plumber", rate: "€80 - €100 / hr", action: "Get a Plumber", slug: "plumbers" },
    { service: "Electrician", rate: "€70 - €90 / hr", action: "Find Electrician", slug: "electricians" },
    { service: "AC Service", rate: "€120 - €150 (Full Service)", action: "Book Service", slug: "air-conditioning" },
    { service: "Painter", rate: "€18 - €25 / sqm", action: "Get Quote", slug: "painters" },
  ];

  const popularCategories = [
    { name: "Plumber", slug: "plumbers", icon: Wrench, isMostRequested: true },
    { name: "Electrician", slug: "electricians", icon: Zap },
    { name: "Air Con", slug: "air-conditioning", icon: Snowflake, isMostRequested: true },
    { name: "Builder", slug: "builders", icon: Hammer },
    { name: "Painter", slug: "painters", icon: Paintbrush },
    { name: "Gardener", slug: "gardeners", icon: Shovel },
    { name: "Pool Services", slug: "pool-maintenance", icon: Droplets },
    { name: "Locksmith", slug: "locksmiths", icon: Key },
  ];

  const steps = [
    { icon: Search, title: "Search & Filter", description: "Filter by trade, language and location" },
    { icon: Eye, title: "Compare Profiles", description: "Scan photos, reviews and completion rate" },
    { icon: MessageCircle, title: "Direct Chat", description: "Chat or WhatsApp pros in real time" },
    { icon: CheckCircle, title: "Hire & Rate", description: "Book your favourite, pay them directly" },
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Profiles", sub: "Verified & Claimable" },
    { icon: Wallet, value: "100%", label: "Free", sub: "For Homeowners" },
    { icon: MapPin, value: "15", label: "Towns", sub: "Coastal Coverage" },
  ];

  const faqs = [
    { question: "How are tradespeople verified?", answer: "We rely on a strong community-driven verification system. Professionals are rated and reviewed by real homeowners like you. We also verify their identity and encourage them to upload insurance and license documents for transparency." },
    { question: "Can I request quotes in English?", answer: "Absolutely. We highlight language proficiency on every profile. You can filter specifically for English-speaking professionals to ensure clear communication throughout your project." },
    { question: "What areas do you cover?", answer: "We cover the entire Costa del Sol region, from Sotogrande to Nerja, including major hubs like Marbella, Estepona, Mijas, Fuengirola, Benalmadena, Torremolinos, and Malaga City." },
    { question: "Is this service free for homeowners?", answer: "Yes, CostaTrades is 100% free for homeowners. You can search, post jobs, and request quotes without any cost. We are supported by the professionals who use our platform to find work." },
    { question: "Do I need a license for renovations?", answer: "Yes, most renovations in Spain require a license. Minor works ('Obra Menor') often need a simple declaration, while major structural changes ('Obra Mayor') require a full project license. Always check with your chosen professional." },
    { question: "How do I pay the tradesperson?", answer: "You pay the tradesperson directly. CostaTrades does not handle payments or take commissions from your project fees. We recommend agreeing on payment terms in writing before work begins." },
  ];

  const locations = [
    { name: "Marbella", slug: "marbella" },
    { name: "Estepona", slug: "estepona" },
    { name: "Mijas", slug: "mijas" },
    { name: "Fuengirola", slug: "fuengirola" },
    { name: "Benalmadena", slug: "benalmadena" },
    { name: "Torremolinos", slug: "torremolinos" },
    { name: "Malaga", slug: "malaga" },
    { name: "Nerja", slug: "nerja" },
    { name: "Sotogrande", slug: "sotogrande" },
    { name: "San Pedro", slug: "san-pedro" },
    { name: "Benahavis", slug: "benahavis" },
    { name: "Calahonda", slug: "calahonda" },
  ];

  const popularSearches = [
    { label: "Best Electricians in Marbella", href: "/locations/marbella-area/marbella/electrician" },
    { label: "Reliable Pool Service Marbella", href: "/locations/marbella-area/marbella/pool-maintenance" },
    { label: "Expert Roofers Torremolinos", href: "/locations/benalmadena-area/torremolinos/roofer" },
    { label: "Top Rated Plumbers in Estepona", href: "/locations/estepona-manilva/estepona-town/plumber" },
    { label: "Professional Gardeners Benalmadena", href: "/locations/benalmadena-area/benalmadena-costa/gardener" },
    { label: "Local Handyman Calahonda", href: "/locations/mijas-costa/calahonda/handyman" },
    { label: "Emergency AC Repair Fuengirola", href: "/locations/fuengirola-area/fuengirola-town/ac-repair" },
    { label: "24 Hour Locksmith Nerja", href: "/locations/malaga-east-axarquia/nerja/locksmith" },
    { label: "Solar Panel Installers Estepona", href: "/locations/estepona-manilva/estepona-town/solar-installation" },
    { label: "Trusted Builders in Mijas Costa", href: "/locations/mijas-costa/la-cala-de-mijas/builder" },
    { label: "Quality Painters Sotogrande", href: "/locations/sotogrande-san-roque/sotogrande-costa/painter-decorator" },
    { label: "Bathroom Renovation Experts Marbella", href: "/locations/marbella-area/marbella/bathroom-fitter" },
  ];

  const findTradespeople = [
    { label: "Find a Plumber Near Me", href: "/post-job?option=Plumber" },
    { label: "Electrician Near Me Costa del Sol", href: "/post-job?option=Electrician" },
    { label: "Builder Near Me Spain", href: "/post-job?option=Builder" },
    { label: "AC Repair Service Near Me", href: "/post-job?option=AC%20Service" },
    { label: "Garden Maintenance Near Me", href: "/post-job?option=Gardener" },
    { label: "Pool Cleaning Service Near Me", href: "/post-job?option=Pool%20Maintenance" },
    { label: "Emergency Locksmith Near Me", href: "/post-job?option=Locksmith" },
    { label: "House Painter Near Me", href: "/post-job?option=Painter" },
    { label: "Handyman Services Near Me", href: "/post-job?option=Handyman" },
    { label: "Roof Repair Near Me", href: "/post-job?option=Roofer" },
    { label: "Solar Installation Near Me", href: "/post-job?option=Solar" },
    { label: "Bathroom Fitter Near Me", href: "/post-job?option=Bathroom" },
  ];

  const costGuides = [
    { label: "How Much Does an Electrician Cost?", href: "/cost-guides#electrician" },
    { label: "What Do Plumbers Charge in Spain?", href: "/cost-guides#plumber" },
    { label: "AC Installation Price Guide", href: "/cost-guides#ac" },
    { label: "Pool Maintenance Monthly Cost", href: "/cost-guides#pool" },
    { label: "Builder Day Rates Costa del Sol", href: "/cost-guides#builder" },
    { label: "Painting a House Cost Calculator", href: "/cost-guides#painter" },
    { label: "Gardener Hourly Rates Spain", href: "/cost-guides#gardener" },
    { label: "Locksmith Call Out Fee Guide", href: "/cost-guides#locksmith" },
    { label: "Solar Panel ROI Calculator", href: "/cost-guides#solar" },
    { label: "Bathroom Renovation Cost Guide", href: "/cost-guides#bathroom" },
    { label: "Roof Repair vs Replacement Cost", href: "/cost-guides#roofer" },
    { label: "Handyman Price List 2025", href: "/cost-guides#handyman" },
  ];

  const getActiveTabContent = () => {
    switch (activeTab) {
      case "popular":
        return popularSearches;
      case "trades":
        return findTradespeople;
      case "guides":
        return costGuides;
      default:
        return popularSearches;
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // SEO & AEO SCHEMAS
  // ══════════════════════════════════════════════════════════════════════════

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CostaTrades",
    url: "https://costatrades.com",
    description: "The leading marketplace for verified English-speaking tradespeople on the Costa del Sol, Spain.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Marbella",
      addressRegion: "Malaga",
      addressCountry: "ES",
    },
    areaServed: {
      "@type": "Place",
      name: "Costa del Sol",
    },
    sameAs: [
      "https://www.facebook.com/costatrades",
      "https://www.instagram.com/costatrades",
      "https://twitter.com/costatrades",
    ],
  };

  // LocalBusiness Schema - AEO optimized for "near me" searches
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CostaTrades",
    description: "CostaTrades is a directory of verified tradespeople on the Costa del Sol, Spain. Find electricians, plumbers, builders, and request free quotes.",
    url: "https://costatrades.com",
    telephone: "+34-604-288-426",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Costa del Sol",
      addressLocality: "Marbella",
      addressRegion: "Malaga",
      postalCode: "29600",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.5100",
      longitude: "-4.8860",
    },
    areaServed: [
      { "@type": "City", name: "Marbella" },
      { "@type": "City", name: "Estepona" },
      { "@type": "City", name: "Fuengirola" },
      { "@type": "City", name: "Mijas" },
      { "@type": "City", name: "Benalmadena" },
      { "@type": "City", name: "Torremolinos" },
      { "@type": "City", name: "Nerja" },
      { "@type": "City", name: "Malaga" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "€€",
  };

  // FAQ Schema - AEO optimized for voice search / featured snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Service Schema - AEO for service-based searches
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Tradesperson Directory",
    provider: {
      "@type": "Organization",
      name: "CostaTrades",
    },
    areaServed: {
      "@type": "Place",
      name: "Costa del Sol, Spain",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tradespeople Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Electrician Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Plumbing Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air Conditioning Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Building & Construction" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Painting & Decorating" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garden Maintenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool Maintenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Locksmith Services" } },
      ],
    },
  };

  // WebSite Schema with SearchAction - AEO for sitelinks search box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CostaTrades",
    url: "https://costatrades.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://costatrades.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://costatrades.com",
      },
    ],
  };

  // Combine all schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      localBusinessSchema,
      faqSchema,
      serviceSchema,
      websiteSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      
    <div className="min-h-screen bg-white font-sans pb-20 md:pb-0">
      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO SECTION
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
  <Image
  src="https://images.pexels.com/photos/4186560/pexels-photo-4186560.jpeg?auto=compress&cs=tinysrgb&w=1920"
  alt="Modern Spanish villa"
  fill
  priority
  className="object-cover"
  sizes="100vw"
/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1d3e]/95 via-[#0a1d3e]/85 to-[#0a1d3e]/95 z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-50">
              #1 Trusted Marketplace
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-white">
            Find Trusted Specialists on the Costa del Sol
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Connect with verified Home Improvement & Maintenance Professionals who speak your language.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-6 relative">
            <div className="absolute -top-10 left-4 md:-left-8 md:-top-6 z-20 animate-bounce">
              <svg width="56" height="56" viewBox="0 0 120 120" fill="none" className="text-yellow-400 rotate-12">
                <path d="M10 10 C 30 50, 50 50, 80 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M80 80 L 60 75 M 80 80 L 75 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
              </svg>
              <span className="absolute -top-2 left-12 text-yellow-400 text-lg font-bold whitespace-nowrap -rotate-6">
                Start here
              </span>
            </div>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Villa Renovation in Marbella"
                className="w-full py-5 px-6 pl-14 rounded-full text-lg bg-white shadow-2xl text-slate-800 placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-600" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E31E24] hover:bg-[#C41218] text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Search
              </button>
            </form>
          </div>

          {/* Concierge Link */}
          <div className="mb-12">
            <Link href="/post-job" className="text-blue-200 hover:text-white transition-colors text-lg font-medium inline-flex items-center gap-2 group">
              Or describe your project and let us match you
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <MessageSquare className="w-5 h-5 text-blue-300" />
              <span className="font-medium text-sm text-blue-200">Real customer reviews</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-blue-300" />
              <span className="font-medium text-sm text-blue-200">Transparent profiles</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Globe className="w-5 h-5 text-blue-300" />
              <span className="font-medium text-sm text-blue-200">Multilingual support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. PRICE GUIDE TABLE
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0a1f44] to-[#1e3a8a] px-6 py-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Euro className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">2025 Market Rates</h3>
                  <p className="text-xs text-blue-200">Costa del Sol Average</p>
                </div>
              </div>
              <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-white/10 text-xs font-medium border border-white/20">
                Updated Monthly
              </span>
            </div>

            {/* Table - Desktop */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-xs uppercase tracking-wider">Trade / Service</th>
                    <th className="px-6 py-4 text-left font-semibold text-xs uppercase tracking-wider">2025 Market Rate</th>
                    <th className="px-6 py-4 text-right font-semibold text-xs uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rates.map((item) => (
                    <tr key={item.service} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-5 font-semibold text-slate-700 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                        {item.service}
                      </td>
                      <td className="px-6 py-5 font-bold text-[#0a1f44]">{item.rate}</td>
                      <td className="px-6 py-5 text-right">
                        <Link href={`/post-job?option=${item.service}`} className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all">
                          {item.action} <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {/* Emergency Row */}
                  <tr className="bg-red-50/50 hover:bg-red-50 border-t border-red-100">
                    <td className="px-6 py-5 font-bold text-red-900 flex items-center gap-3">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                      </span>
                      Emergency Call-out (24/7)
                    </td>
                    <td className="px-6 py-5 font-bold text-red-900">€150 - €180 (Fixed)</td>
                    <td className="px-6 py-5 text-right">
                      <Link href="/post-job?option=Emergency" className="inline-flex items-center bg-[#E31E24] hover:bg-[#C41218] text-white font-bold py-2.5 px-5 rounded-lg text-sm transition-all shadow-sm hover:shadow-md">
                        Find Help Now
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {rates.map((item) => (
                <div key={item.service} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="font-semibold text-slate-900">{item.service}</span>
                    </div>
                    <p className="text-sm font-bold text-[#0a1f44] pl-3.5">{item.rate}</p>
                  </div>
                  <Link href={`/post-job?option=${item.service}`} className="bg-blue-50 text-blue-600 font-semibold text-xs px-4 py-2.5 rounded-lg">
                    Book
                  </Link>
                </div>
              ))}
              {/* Mobile Emergency */}
              <div className="p-4 bg-red-50/50 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </span>
                    <span className="font-bold text-red-900 text-sm">Emergency (24/7)</span>
                  </div>
                  <p className="text-sm font-bold text-red-900 pl-4">€150 - €180</p>
                </div>
                <Link href="/post-job?option=Emergency" className="bg-[#E31E24] text-white font-bold text-xs px-4 py-2.5 rounded-lg">
                  Help Now
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-600 mt-3">
            Estimates for licensed, English-speaking professionals. Final prices set by provider.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. HOW IT WORKS
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="hidden lg:block absolute inset-x-0 top-1/2">
          <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-blue-100 via-blue-300/70 to-blue-100" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 shadow-sm mb-4">
              Simple CostaTrades Flow
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44]">How it works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const stepNumber = String(index + 1).padStart(2, "0");
              return (
                <div key={step.title} className="relative group">
                  <div className="relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-7 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl overflow-hidden">
                    <div className="absolute -top-4 -right-4 text-8xl font-extrabold text-slate-100 pointer-events-none select-none">
                      {stepNumber}
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0a1f44]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                          Step {stepNumber}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-[#0a1f44]">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                      {index === 0 && (
                        <span className="mt-5 inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-800">
                          Start here <span className="text-blue-500">•</span> Ideal if you know roughly what you need
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. POPULAR TRADES
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">Popular Trades</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Find the right specialist for your home improvement project.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.slug} href={`/trades/${cat.slug}`} className="block h-full">
                  <div className="relative h-full bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 overflow-hidden">
                    {cat.isMostRequested && (
                      <div className="absolute top-3 right-3 bg-[#E31E24] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide z-10">
                        Most Requested
                      </div>
                    )}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 bg-blue-50 text-[#0a1f44] group-hover:bg-[#0a1f44] group-hover:text-white">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-bold text-lg text-[#0a1f44] mb-2 group-hover:text-[#E07A5F] transition-colors">
                        {cat.name}
                      </h3>
                      <div className="mt-auto pt-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-sm font-semibold text-[#0a1f44] flex items-center gap-2">
                          View Pros <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. PRO GROWTH BAND
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0a1f44] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium tracking-wide uppercase text-white">High Demand Area</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Stop chasing leads. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  Let the jobs come to you.
                </span>
              </h2>

              <p className="text-blue-200 text-lg md:text-xl font-light mb-8 leading-relaxed">
                Join 1500+ professionals on the Costa del Sol who are growing their business with zero upfront fees.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>100% Free to Join</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Direct Client Chat</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>No Commission Fees</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/join-as-tradesperson" className="bg-[#E31E24] hover:bg-[#C41218] text-white font-bold py-4 px-8 rounded-xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
                  Get More Leads Now
                </Link>
                <Link href="/join-as-tradesperson" className="bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-[#0a1f44] font-bold py-4 px-8 rounded-xl text-lg backdrop-blur-sm transition-all duration-300 text-center">
                  Create Free Profile
                </Link>
              </div>
            </div>

            {/* Right Stats Card */}
            <div className="relative w-full max-w-md lg:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-30 blur-lg" />
              <div className="relative bg-[#0d2550]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-200">Monthly Job Requests</div>
                    <div className="text-2xl font-bold text-white">1,240+</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-sm text-blue-200">Active Homeowners</div>
                    <div className="text-2xl font-bold text-white">8,500+</div>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-200">Average job value</span>
                    <span className="font-bold text-green-400">€450 - €2,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. WHY COSTATRADES
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">Why CostaTrades?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              The most trusted way to find professionals on the Costa del Sol.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200 hover:border-blue-200 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-[#0a1f44]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-3xl text-[#0a1f44] mb-1">{stat.value}</div>
                    <div className="font-semibold text-[#0a1f44] uppercase tracking-wider text-sm mb-1">{stat.label}</div>
                    <div className="text-slate-600 text-xs font-medium">{stat.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* Testimonial */}
            <div className="bg-[#0a1f44] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden min-h-[280px] flex flex-col justify-center">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-white/10" />
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className={`relative z-10 transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
                <p className="text-xl md:text-2xl italic leading-relaxed mb-8 text-blue-50">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${testimonials[currentTestimonial].color} rounded-full flex items-center justify-center font-bold text-white shadow-lg`}>
                    {testimonials[currentTestimonial].initial}
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonials[currentTestimonial].author}</div>
                    <div className="text-blue-200 text-sm font-medium">{testimonials[currentTestimonial].location}</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 right-8 flex gap-2">
                {testimonials.map((_, idx) => (
                  <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentTestimonial ? "w-6 bg-white" : "w-1.5 bg-white/30"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. FAQ SECTION
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Everything you need to know about hiring on CostaTrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-slate-200 rounded-xl bg-white open:shadow-md transition-all duration-200 h-fit">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-[#0a1f44] list-none select-none text-lg">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-blue-600 transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. BLOG / RESOURCES SECTION - PREMIUM EDITORIAL DESIGN
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#fafafa] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[2px] bg-[#0a1f44]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a1f44]/70">
                  Insights & Guides
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0a1f44] tracking-tight">
                The Costa del Sol<br />
                <span className="text-[#0a1f44]/40">Homeowner's Journal</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 text-[#0a1f44] font-semibold hover:gap-4 transition-all"
            >
              <span className="border-b-2 border-[#0a1f44]/20 group-hover:border-[#0a1f44] transition-colors pb-1">
                View all articles
              </span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Featured Article + Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Large Card */}
            <Link href="/blog/renovation-permits-andalucia-2025" className="group block">
              <article className="relative h-full min-h-[500px] rounded-3xl overflow-hidden bg-[#0a1f44] shadow-2xl shadow-slate-900/20">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
                  alt="Renovation permits guide"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44] via-[#0a1f44]/60 to-transparent" />

                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <div className="mb-auto pt-2">
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      Featured Guide
                    </span>
                  </div>

                  <div>
                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-3 block">
                      Legal & Permits
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                      Renovation Permits in Andalucia 2025
                    </h3>
                    <p className="text-blue-100/80 text-lg leading-relaxed mb-6 max-w-lg">
                      Everything you need to know about Licencia de Obra, costs, timelines, and avoiding common mistakes.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                          <span className="text-white font-bold text-sm">CR</span>
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">Carlos Rodriguez</p>
                          <p className="text-blue-200/60 text-xs">Legal Expert</p>
                        </div>
                      </div>
                      <span className="text-blue-200/40">•</span>
                      <span className="text-blue-200/60 text-sm">12 min read</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>

            {/* Right Column - Stacked Cards */}
            <div className="flex flex-col gap-8">
              {/* Card 2 */}
              <Link href="/blog/solar-panels-costa-del-sol-roi" className="group block flex-1">
                <article className="relative h-full min-h-[240px] rounded-3xl overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:border-slate-200 transition-all duration-500">
                  <div className="absolute inset-0 flex">
                    <div className="w-2/5 relative overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600&auto=format&fit=crop"
                        alt="Solar panels Costa del Sol"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                    </div>
                    <div className="flex-1 p-8 flex flex-col justify-center">
                      <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                        Cost Guides
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-[#0a1f44] mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                        Is Solar Power Worth It?
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        With new 2025 grants, solar can pay for itself in 3-5 years on the Costa del Sol.
                      </p>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mt-auto">
                        <Clock className="w-4 h-4" />
                        <span>8 min read</span>
                        <span className="mx-2">•</span>
                        <span>2025 Data</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>

              {/* Card 3 */}
              <Link href="/blog/renovating-older-villa-2025" className="group block flex-1">
                <article className="relative h-full min-h-[240px] rounded-3xl overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:border-slate-200 transition-all duration-500">
                  <div className="absolute inset-0 flex">
                    <div className="w-2/5 relative overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                        alt="Villa renovation Spain"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                    </div>
                    <div className="flex-1 p-8 flex flex-col justify-center">
                      <span className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-2">
                        Renovation
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-[#0a1f44] mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                        Why Renovating an Older Villa is Smart
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                        With new builds limited and prices rising 12%, older stock is the new strategy.
                      </p>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mt-auto">
                        <Clock className="w-4 h-4" />
                        <span>10 min read</span>
                        <span className="mx-2">•</span>
                        <span>Investment Guide</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="mt-16 pt-10 border-t border-slate-200/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#0a1f44]">15+</p>
                <p className="text-slate-500 text-sm mt-1">Expert Guides</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#0a1f44]">2025</p>
                <p className="text-slate-500 text-sm mt-1">Updated Data</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#0a1f44]">5k+</p>
                <p className="text-slate-500 text-sm mt-1">Monthly Readers</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#0a1f44]">100%</p>
                <p className="text-slate-500 text-sm mt-1">Local Expertise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          STICKY MOBILE CTA
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3 md:hidden shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <Link href="/post-job" className="flex-1 bg-[#E31E24] text-white text-center font-bold py-3 rounded-lg text-sm">
            Post a Job
          </Link>
          <Link href="/trades" className="flex-1 bg-[#0a1f44] text-white text-center font-bold py-3 rounded-lg text-sm">
            Find a Pro
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
