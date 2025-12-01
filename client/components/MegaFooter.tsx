"use client";

import Link from "next/link";
import { ShieldCheck, ChevronDown, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MegaFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    if (window.innerWidth < 768) {
      setOpenSection(openSection === title ? null : title);
    }
  };

  const sections = [
    {
      title: "POPULAR TRADES",
      links: [
        { name: "Plumbers in Marbella", href: "/trades/plumber/marbella" },
        {
          name: "Electricians in Marbella",
          href: "/trades/electrician/marbella",
        },
        { name: "AC Repair in Marbella", href: "/trades/ac-repair/marbella" },
        { name: "Builders in Marbella", href: "/trades/builder/marbella" },
        { name: "Pool Services", href: "/trades/pool-maintenance/marbella" },
        { name: "Painters", href: "/trades/painter/marbella" },
        { name: "Locksmiths", href: "/trades/locksmith/marbella" },
        { name: "Handyman", href: "/trades/handyman/marbella" },
      ],
    },
    {
      title: "SPECIALIST SERVICES",
      links: [
        {
          name: "Solar Panels",
          href: "/trades/solar-panel-installer/marbella",
        },
        { name: "Leak Detection", href: "/trades/leak-detection/marbella" },
        { name: "Roofers", href: "/trades/roofer/marbella" },
        { name: "Tilers", href: "/trades/tiler/marbella" },
        { name: "Bathroom Fitters", href: "/trades/bathroom-fitter/marbella" },
        { name: "Kitchens", href: "/trades/kitchen-installer/marbella" },
        { name: "Pest Control", href: "/trades/pest-control/marbella" },
      ],
    },
    {
      title: "AREAS COVERED",
      links: [
        { name: "Pros in Marbella", href: "/trades/plumber/marbella" },
        { name: "Pros in Estepona", href: "/trades/plumber/estepona" },
        { name: "Pros in Mijas", href: "/trades/plumber/mijas" },
        { name: "Pros in Fuengirola", href: "/trades/plumber/fuengirola" },
        { name: "Pros in Benalmadena", href: "/trades/plumber/benalmadena" },
        { name: "Pros in Sotogrande", href: "/trades/plumber/sotogrande" },
        { name: "Pros in Manilva", href: "/trades/plumber/manilva" },
      ],
    },
    {
      title: "LOCAL AREAS",
      links: [
        { name: "Puerto Banus", href: "/locations/puerto-banus" },
        { name: "Nueva Andalucia", href: "/locations/nueva-andalucia" },
        { name: "San Pedro", href: "/locations/san-pedro" },
        { name: "La Cala", href: "/locations/la-cala-de-mijas" },
        { name: "Calahonda", href: "/locations/calahonda" },
        { name: "Elviria", href: "/locations/elviria" },
      ],
    },
    {
      title: "URGENT HELP",
      links: [
        { name: "24/7 Emergency Plumber", href: "/trades/plumber/marbella" },
        { name: "Emergency Electrician", href: "/trades/electrician/marbella" },
        { name: "Emergency Locksmith", href: "/trades/locksmith/marbella" },
      ],
      extra: (
        <div className="mt-4 flex items-center gap-2 text-green-400">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-medium">Verified by CostaTrades</span>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#111827] text-[#9CA3AF] border-t border-gray-800 transition-all duration-500 ease-in-out">
      {/* Toggle Bar */}
      <div
        className="container-custom py-4 flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer hover:bg-gray-900/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm font-medium text-gray-400">
          Serving Marbella, Estepona, Mijas, and beyond.
        </p>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-gray-800 gap-2 text-xs uppercase tracking-wider"
        >
          {isOpen ? "Hide Areas & Services" : "View All Areas & Services"}
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Expandable Content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-[2000px] opacity-100 pb-12" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-custom pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-5 gap-8 md:gap-4">
            {sections.map((section) => (
              <div
                key={section.title}
                className="border-b border-gray-800 md:border-none pb-4 md:pb-0"
              >
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full md:cursor-default group"
                >
                  <h4 className="text-sm font-bold text-white mb-2 md:mb-4 uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 md:hidden transition-transform duration-200",
                      openSection === section.title ? "rotate-180" : "",
                    )}
                  />
                </button>

                <ul
                  className={cn(
                    "space-y-2 overflow-hidden transition-all duration-300 md:block",
                    openSection === section.title
                      ? "max-h-96 mt-2"
                      : "max-h-0 md:max-h-full",
                  )}
                >
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-[13px] hover:text-[#F3F4F6] transition-colors block py-1 md:py-0"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  {section.extra}
                </ul>
              </div>
            ))}
          </div>

          {/* AEO Context Block */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500 max-w-3xl mx-auto">
              CostaTrades connects homeowners on the Costa del Sol with verified
              local professionals. Serving Marbella, Estepona, Mijas, and
              beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
