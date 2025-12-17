"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, MapPin, Search, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

// Main Location Hubs (Tier 1)
const locations = [
  { name: "Marbella Area", href: "/locations/marbella-area" },
  { name: "Estepona & Manilva", href: "/locations/estepona-manilva" },
  { name: "Mijas Costa", href: "/locations/mijas-costa" },
  { name: "Fuengirola Area", href: "/locations/fuengirola-area" },
  { name: "Benalmadena Area", href: "/locations/benalmadena-area" },
  { name: "Sotogrande & San Roque", href: "/locations/sotogrande-san-roque" },
  { name: "Malaga East & Axarquia", href: "/locations/malaga-east-axarquia" },
  { name: "Malaga City", href: "/locations/malaga-city" },
];

const popularSearches = [
  { label: "Best Electricians in Marbella", href: "/locations/marbella-area/marbella/electrician" },
  { label: "Top Rated Plumbers in Estepona", href: "/locations/estepona-manilva/estepona-town/plumber" },
  { label: "Emergency AC Repair Fuengirola", href: "/locations/fuengirola-area/fuengirola-town/ac-repair" },
  { label: "Trusted Builders in Mijas Costa", href: "/locations/mijas-costa/la-cala-de-mijas/builder" },
  { label: "Reliable Pool Service Marbella", href: "/locations/marbella-area/marbella/pool-maintenance" },
  { label: "Professional Gardeners Benalmadena", href: "/locations/benalmadena-area/benalmadena-costa/gardener" },
  { label: "24 Hour Locksmith Nerja", href: "/locations/malaga-east-axarquia/nerja/locksmith" },
  { label: "Quality Painters Sotogrande", href: "/locations/sotogrande-san-roque/sotogrande-costa/painter-decorator" },
  { label: "Expert Roofers Torremolinos", href: "/locations/benalmadena-area/torremolinos/roofer" },
  { label: "Local Handyman Calahonda", href: "/locations/mijas-costa/calahonda/handyman" },
  { label: "Solar Panel Installers Estepona", href: "/locations/estepona-manilva/estepona-town/solar-installation" },
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
  { label: "How Much Does an Electrician Cost?", href: "/cost-guides/electrician" },
  { label: "What Do Plumbers Charge in Spain?", href: "/cost-guides/plumber" },
  { label: "AC Installation Price Guide", href: "/cost-guides/ac-repair" },
  { label: "Pool Maintenance Monthly Cost", href: "/cost-guides/pool-maintenance" },
  { label: "Builder Day Rates Costa del Sol", href: "/cost-guides/builder" },
  { label: "Painting a House Cost Calculator", href: "/cost-guides/painter" },
  { label: "Gardener Hourly Rates Spain", href: "/cost-guides/gardener" },
  { label: "Locksmith Call Out Fee Guide", href: "/cost-guides/locksmith" },
  { label: "Solar Panel ROI Calculator", href: "/cost-guides/solar-installation" },
  { label: "Bathroom Renovation Cost Guide", href: "/cost-guides/bathroom-fitter" },
  { label: "Roof Repair vs Replacement Cost", href: "/cost-guides/roofer" },
  { label: "Handyman Price List 2025", href: "/cost-guides/handyman" },
];

export function FooterSEOLinks() {
  const [activeTab, setActiveTab] = useState("popular");
  const [locationsOpen, setLocationsOpen] = useState(false);

  const tabs = [
    { id: "popular", label: "Popular Searches", icon: Search },
    { id: "find", label: "Find Tradespeople", icon: MapPin },
    { id: "costs", label: "Cost Guides", icon: Calculator },
  ];

  const getActiveContent = () => {
    switch (activeTab) {
      case "popular":
        return popularSearches;
      case "find":
        return findTradespeople;
      case "costs":
        return costGuides;
      default:
        return popularSearches;
    }
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200">
      <div className="container-custom py-8 md:py-12">

        {/* ===== DESKTOP VIEW ===== */}
        <div className="hidden md:block">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-[#0a1f44] mb-2">
              Explore Tradespeople Across Costa del Sol
            </h3>
            <p className="text-sm text-slate-500">
              Find trusted professionals in your area
            </p>
          </div>

          {/* Location Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {locations.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-[#0a1f44] hover:text-[#0a1f44] hover:shadow-sm transition-all duration-200"
              >
                {loc.name}
              </Link>
            ))}
          </div>

          {/* Tabs with Icons */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-xl p-1.5 shadow-sm border border-slate-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      activeTab === tab.id
                        ? "bg-[#0a1f44] text-white shadow-sm"
                        : "text-slate-600 hover:text-[#0a1f44] hover:bg-slate-50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Links Grid with Card Background */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <nav className="grid grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
              {getActiveContent().map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-600 hover:text-[#0a1f44] transition-colors py-1 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-[#0a1f44] transition-colors" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* ===== MOBILE VIEW ===== */}
        <div className="md:hidden">
          {/* Locations Accordion */}
          <button
            onClick={() => setLocationsOpen(!locationsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl mb-6 hover:border-slate-300 transition-colors shadow-sm"
          >
            <span className="font-medium text-slate-700 text-sm">
              View local tradespeople in your area
            </span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-2",
                locationsOpen && "rotate-180"
              )}
            />
          </button>

          <div
            className={cn(
              "grid grid-cols-2 gap-x-6 gap-y-3 mb-8 px-1 overflow-hidden transition-all duration-300",
              locationsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 mb-0"
            )}
          >
            {locations.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="text-sm text-slate-600 hover:text-[#0a1f44] transition-colors py-1"
              >
                {loc.name}
              </Link>
            ))}
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-slate-200 mb-5 overflow-x-auto scrollbar-hide">
            <nav className="flex gap-4 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "pb-3 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap px-1",
                    activeTab === tab.id
                      ? "text-[#0a1f44] border-[#0a1f44] font-semibold"
                      : "text-slate-400 border-transparent hover:text-slate-600 hover:border-slate-300"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Links Grid */}
          <nav className="grid grid-cols-1 gap-y-2 text-sm">
            {getActiveContent().map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-[#0a1f44] transition-colors py-1.5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
