"use client";

import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Zap,
  Droplets,
  Wrench,
  Paintbrush,
  Thermometer,
  Trees,
  Hammer,
  Key,
  Sun,
  Bath,
  Home,
  Shield,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Euro,
  Users,
  Star,
  Fence,
  Waves,
  Drill,
  Sparkle,
  Truck,
  Bug,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SEO } from "@/components/SEO";

// 15 Trade guides - 3x5 grid, all with image cards
// Pricing based on 2025 Spain market rates +20% for Costa del Sol premium
const tradeGuides = [
  {
    slug: "electrician",
    title: "Electrician",
    description: "Rewiring, installations, repairs & safety certificates",
    icon: Zap,
    image: "/images/trades/electrician-card.jpg",
    avgRate: "€42/hr",
    priceRange: "€30 - €55/hr",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    slug: "plumber",
    title: "Plumber",
    description: "Emergency repairs, installations & bathroom fitting",
    icon: Droplets,
    image: "/images/trades/plumber-card.jpg",
    avgRate: "€42/hr",
    priceRange: "€30 - €55/hr",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    slug: "builder",
    title: "Builder",
    description: "Extensions, renovations & structural work",
    icon: Hammer,
    image: "/images/trades/builder-card.jpg",
    avgRate: "€175/day",
    priceRange: "€145 - €220/day",
    gradient: "from-amber-600 to-orange-700",
  },
  {
    slug: "painter",
    title: "Painter & Decorator",
    description: "Interior & exterior painting, wallpapering",
    icon: Paintbrush,
    image: "/images/trades/painter-card.jpg",
    avgRate: "€36/hr",
    priceRange: "€25 - €50/hr",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    slug: "ac-repair",
    title: "AC & Climate Control",
    description: "Installation, servicing & repairs",
    icon: Thermometer,
    image: "/images/trades/ac-card.jpg",
    avgRate: "€50/hr",
    priceRange: "€42 - €60/hr",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    slug: "pool-maintenance",
    title: "Pool Maintenance",
    description: "Cleaning, repairs & equipment servicing",
    icon: Waves,
    image: "/images/trades/pool-card.jpg",
    avgRate: "€110/mo",
    priceRange: "€85 - €145/mo",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    slug: "gardener",
    title: "Gardener & Landscaper",
    description: "Garden maintenance, landscaping & irrigation",
    icon: Trees,
    image: "/images/trades/gardener-card.jpg",
    avgRate: "€22/hr",
    priceRange: "€18 - €28/hr",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    slug: "locksmith",
    title: "Locksmith",
    description: "Emergency access, lock changes & security",
    icon: Key,
    image: "/images/trades/locksmith-card.jpg",
    avgRate: "€180",
    priceRange: "€120 - €290",
    gradient: "from-slate-600 to-slate-800",
  },
  {
    slug: "solar-installation",
    title: "Solar Installation",
    description: "Panel installation, battery storage & maintenance",
    icon: Sun,
    image: "/images/trades/solar-card.jpg",
    avgRate: "€6,000",
    priceRange: "€4,800 - €8,500",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    slug: "bathroom-fitter",
    title: "Bathroom Fitter",
    description: "Full renovations, tiling & plumbing",
    icon: Bath,
    image: "/images/trades/bathroom-card.jpg",
    avgRate: "€7,200",
    priceRange: "€4,500 - €10,000",
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    slug: "handyman",
    title: "Handyman",
    description: "General repairs, odd jobs & maintenance",
    icon: Wrench,
    image: "/images/trades/handyman-card.jpg",
    avgRate: "€36/hr",
    priceRange: "€25 - €48/hr",
    gradient: "from-red-500 to-rose-600",
  },
  {
    slug: "roofer",
    title: "Roofer",
    description: "Repairs, replacements & waterproofing",
    icon: Home,
    image: "/images/trades/roofer-card.jpg",
    avgRate: "€220/day",
    priceRange: "€175 - €300/day",
    gradient: "from-stone-600 to-stone-800",
  },
  {
    slug: "tiler",
    title: "Tiler",
    description: "Floor & wall tiling, grouting & repairs",
    icon: Drill,
    image: "/images/trades/tiler-card.jpg",
    avgRate: "€38/m²",
    priceRange: "€28 - €52/m²",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    slug: "carpenter",
    title: "Carpenter",
    description: "Custom furniture, fitted wardrobes & repairs",
    icon: Hammer,
    image: "/images/trades/carpenter-card.jpg",
    avgRate: "€190/day",
    priceRange: "€150 - €250/day",
    gradient: "from-amber-700 to-yellow-800",
  },
  {
    slug: "fencing",
    title: "Fencing & Gates",
    description: "Installation, repairs & security gates",
    icon: Fence,
    image: "/images/trades/fencing-card.jpg",
    avgRate: "€95/m",
    priceRange: "€60 - €145/m",
    gradient: "from-emerald-600 to-green-700",
  },
  {
    slug: "cleaning-services",
    title: "Cleaning Services",
    description: "Domestic, commercial & end-of-tenancy cleaning",
    icon: Sparkle,
    image: "/images/trades/cleaning-card.jpg",
    avgRate: "€18/hr",
    priceRange: "€14 - €25/hr",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    slug: "removals",
    title: "Removals & Transport",
    description: "House moves, furniture delivery & storage",
    icon: Truck,
    image: "/images/trades/removals-card.jpg",
    avgRate: "€450",
    priceRange: "€280 - €850",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    slug: "security-alarms",
    title: "Security & Alarms",
    description: "CCTV, alarm systems & smart security",
    icon: Shield,
    image: "/images/trades/security-card.jpg",
    avgRate: "€1,200",
    priceRange: "€600 - €2,500",
    gradient: "from-slate-700 to-zinc-800",
  },
  {
    slug: "pest-control",
    title: "Pest Control",
    description: "Insects, rodents & preventive treatments",
    icon: Bug,
    image: "/images/trades/pest-card.jpg",
    avgRate: "€120",
    priceRange: "€75 - €220",
    gradient: "from-lime-600 to-green-700",
  },
];

// Quick price summary for the table (2025 Costa del Sol rates +20%)
const quickPrices = [
  { service: "Electrician (Hourly)", low: "€30", high: "€55", avg: "€42" },
  { service: "Plumber (Call-out)", low: "€95", high: "€215", avg: "€165" },
  { service: "Builder (Daily)", low: "€145", high: "€220", avg: "€175" },
  { service: "Painter (Hourly)", low: "€25", high: "€50", avg: "€36" },
  { service: "AC Installation", low: "€660", high: "€1,800", avg: "€1,100" },
  { service: "Pool Maintenance (Monthly)", low: "€85", high: "€145", avg: "€110" },
];

export default function CostGuidesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEO
        title="2025 Trade Price Guide | Costa del Sol"
        description="2025 Costa del Sol Price Guides. How much should you pay for builders, plumbers, electricians and painters? Avoid the 'tourist tax' with real market rates."
      />

      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />

        <div className="relative">
          {/* Top bar with breadcrumb */}
          <div className="border-b border-white/10">
            <div className="container-custom py-4">
              <nav className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-white font-medium">Cost Guides</span>
              </nav>
            </div>
          </div>

          {/* Hero content */}
          <div className="container-custom py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">2025 Price Guides</span>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                Costa del Sol{" "}
                <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Trade Price Guide
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Know what to pay before you hire. Real market rates for electricians,
                plumbers, builders and more across Marbella, Estepona, and the Costa del Sol.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center gap-8 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Euro className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">19</p>
                    <p className="text-sm text-slate-400">Trade categories</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">2025</p>
                    <p className="text-sm text-slate-400">Updated rates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-white">500+</p>
                    <p className="text-sm text-slate-400">Verified pros</p>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/post-job">
                  <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-teal-500/25 w-full sm:w-auto">
                    Get Free Quotes
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0a1f44] px-8 py-6 text-lg rounded-xl w-full sm:w-auto transition-colors"
                  onClick={() => document.getElementById("guides")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Browse Guides
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ALL GUIDES SECTION - 3x5 Grid ============ */}
      <section id="guides" className="py-20 px-4 -mt-10 relative z-10">
        <div className="container-custom">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 mb-4">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700">Complete Price Directory</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              All Cost Guides
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Detailed pricing for every trade on the Costa del Sol. Click any card for the full breakdown.
            </p>
          </div>

          {/* 3x5 Grid of trade cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradeGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link key={guide.slug} href={`/cost-guides/${guide.slug}`} className="group">
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      {/* Gradient background (always visible as fallback) */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${guide.gradient}`} />

                      {/* Actual image */}
                      <Image
                        src={guide.image}
                        alt={guide.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 relative z-[1]"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />

                      {/* Overlay gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[2]" />

                      {/* Icon overlay */}
                      <div className="absolute bottom-4 left-4 z-[3]">
                        <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Price badge */}
                      <div className="absolute top-4 right-4 z-[3]">
                        <span className="px-3 py-1.5 rounded-lg bg-white/95 text-slate-900 text-sm font-bold shadow-sm">
                          {guide.avgRate}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-teal-600 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-slate-500 text-sm mb-4 flex-1">
                        {guide.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-400">Range: {guide.priceRange}</span>
                        <span className="flex items-center text-teal-600 font-medium text-sm group-hover:text-teal-700">
                          View Guide
                          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

      {/* ============ QUICK PRICE TABLE ============ */}
      <section className="py-16 px-4 bg-white border-y border-slate-200">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Quick Price Reference
            </h2>
            <p className="text-slate-600">
              Average rates at a glance — click any trade above for detailed breakdowns
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-5 font-semibold text-slate-700">Service</th>
                    <th className="p-5 font-semibold text-slate-700 text-center">Low</th>
                    <th className="p-5 font-semibold text-slate-700 text-center">High</th>
                    <th className="p-5 font-semibold text-teal-700 text-center bg-teal-50/50">Average</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {quickPrices.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white transition-colors">
                      <td className="p-5 font-medium text-slate-900">{item.service}</td>
                      <td className="p-5 text-slate-600 text-center">{item.low}</td>
                      <td className="p-5 text-slate-600 text-center">{item.high}</td>
                      <td className="p-5 font-bold text-teal-700 text-center bg-teal-50/30">{item.avg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 text-center text-sm text-slate-500 border-t border-slate-200">
              * Prices based on 2025 Costa del Sol market rates. Regional variations apply.
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST INDICATORS ============ */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">ID Verified Pros</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">4.8 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">500+ Tradespeople</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                <Euro className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">No Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />

        <div className="relative container-custom max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Accurate Quotes?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Post your job for free and receive competitive quotes from verified
            professionals across the Costa del Sol.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/post-job">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all w-full sm:w-auto">
                Post Your Job Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/for-tradespeople">
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0a1f44] px-10 py-6 text-lg rounded-xl w-full sm:w-auto transition-colors">
                Join as a Tradesperson
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
