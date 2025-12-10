"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const locations = [
  { name: "Marbella", href: "/locations/marbella" },
  { name: "Estepona", href: "/locations/estepona" },
  { name: "Mijas", href: "/locations/mijas" },
  { name: "Fuengirola", href: "/locations/fuengirola" },
  { name: "Benalmádena", href: "/locations/benalmadena" },
  { name: "Torremolinos", href: "/locations/torremolinos" },
  { name: "Malaga", href: "/locations/malaga" },
  { name: "Nerja", href: "/locations/nerja" },
  { name: "Sotogrande", href: "/locations/sotogrande" },
  { name: "San Pedro", href: "/locations/san-pedro" },
  { name: "Benahavis", href: "/locations/benahavis" },
  { name: "Calahonda", href: "/locations/calahonda" },
];

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

export function FooterSEOLinks() {
  const [activeTab, setActiveTab] = useState("popular");
  const [locationsOpen, setLocationsOpen] = useState(true);

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
    <section className="bg-white border-t border-slate-200">
      <div className="container-custom py-10">
        <button
          onClick={() => setLocationsOpen(!locationsOpen)}
          className="w-full flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-xl mb-8 hover:border-slate-300 transition-colors"
        >
          <span className="font-medium text-slate-700">
            View local tradespeople in your area
          </span>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-slate-400 transition-transform duration-200",
              locationsOpen && "rotate-180"
            )}
          />
        </button>

        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mb-10 px-2 overflow-hidden transition-all duration-300",
            locationsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 mb-0"
          )}
        >
          {locations.map((loc) => (
            <Link
              key={loc.href}
              href={loc.href}
              className="text-sm text-slate-600 hover:text-[#0a1f44] transition-colors"
            >
              {loc.name}
            </Link>
          ))}
        </div>

        <div className="border-b border-slate-200 mb-6">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-3 text-sm font-medium transition-colors border-b-2 -mb-px",
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

        <nav className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-3 text-sm">
          {getActiveContent().map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 hover:text-[#0a1f44] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}