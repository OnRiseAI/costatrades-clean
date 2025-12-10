"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// AEO-optimized: Natural language phrases matching voice search queries
const popularSearches = [
  { label: "Best Electricians in Marbella", href: "/locations/marbella-area/marbella/electrician" },
  { label: "Top Rated Plumbers in Estepona", href: "/locations/estepona-manilva/estepona-town/plumber" },
  { label: "Emergency AC Repair Fuengirola", href: "/locations/fuengirola-area/fuengirola-town/ac-repair" },
  { label: "Trusted Builders in Mijas Costa", href: "/locations/mijas-costa/la-cala-de-mijas/builder" },
  { label: "Reliable Pool Service Marbella", href: "/locations/marbella-area/marbella/pool-maintenance" },
  { label: "Professional Gardeners Benalmádena", href: "/locations/benalmadena-area/benalmadena-costa/gardener" },
  { label: "24 Hour Locksmith Nerja", href: "/locations/malaga-east-axarquia/nerja/locksmith" },
  { label: "Quality Painters Sotogrande", href: "/locations/sotogrande-san-roque/sotogrande-costa/painter-decorator" },
  { label: "Expert Roofers Torremolinos", href: "/locations/benalmadena-area/torremolinos/roofer" },
  { label: "Local Handyman Calahonda", href: "/locations/mijas-costa/calahonda/handyman" },
  { label: "Solar Panel Installers Estepona", href: "/locations/estepona-manilva/estepona-town/solar-installation" },
  { label: "Bathroom Renovation Experts Marbella", href: "/locations/marbella-area/marbella/bathroom-fitter" },
];

// AEO: "Near Me" queries are top voice searches
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

// AEO: Question-based content for featured snippets
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

const locations = [
  { name: "Marbella Area", href: "/locations/marbella-area" },
  { name: "Estepona & Manilva", href: "/locations/estepona-manilva" },
  { name: "Fuengirola Area", href: "/locations/fuengirola-area" },
  { name: "Benalmádena Area", href: "/locations/benalmadena-area" },
  { name: "Mijas Costa", href: "/locations/mijas-costa" },
  { name: "Sotogrande & San Roque", href: "/locations/sotogrande-san-roque" },
  { name: "Málaga East & Axarquía", href: "/locations/malaga-east-axarquia" },
  { name: "Inland Sierra Region", href: "/locations/inland-sierra-region" },
];

export function FooterSEOLinks() {
  const [activeTab, setActiveTab] = useState("popular");
  const [locationsOpen, setLocationsOpen] = useState(false);

  const tabs = [
    { id: "popular", label: "Popular Searches" },
    { id: "find", label: "Find Tradespeople" },
    { id: "costs", label: "Cost Guides" },
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
    <section className="bg-gray-50 border-t border-gray-200" aria-label="Find tradespeople and services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Expandable Locations - AEO: Geographic targeting */}
        <button
          onClick={() => setLocationsOpen(!locationsOpen)}
          className="w-full flex items-center justify-between px-6 py-4 bg-white border border-gray-200 rounded-lg mb-8 hover:border-[#0a1f44] transition-colors"
          aria-expanded={locationsOpen}
          aria-controls="locations-list"
        >
          <span className="font-semibold text-[#0a1f44]">
            View local tradespeople in your area
          </span>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-[#0a1f44] transition-transform",
              locationsOpen && "rotate-180"
            )}
          />
        </button>

        {locationsOpen && (
          <nav id="locations-list" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 px-2" aria-label="Browse by location">
            {locations.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="text-sm text-[#0a1f44] hover:text-blue-600 hover:underline"
              >
                {loc.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6" role="tablist">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors relative",
                  activeTab === tab.id
                    ? "text-[#0a1f44]"
                    : "text-gray-500 hover:text-[#0a1f44]"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0a1f44]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <nav
          id={`${activeTab}-panel`}
          role="tabpanel"
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3"
          aria-label={tabs.find(t => t.id === activeTab)?.label}
        >
          {getActiveContent().map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-600 hover:text-[#0a1f44] hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
