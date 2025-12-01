"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  MapPin,
  Search,
  ArrowRight,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Shovel,
  Droplets,
  Snowflake,
  Key,
  Sparkles,
  PenTool,
  HardHat,
  Ruler,
  Truck,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { getTradeServices, tradeServices } from "@/data/tradeServices";
import { SEO } from "@/components/SEO";
import { extractTradeAndLocation } from "@/lib/searchParser";
import { SEARCH_PLACEHOLDERS } from "@/data/searchPlaceholders";
import { useTypewriterPlaceholder } from "@/hooks/useTypewriterPlaceholder";
import { townGroups, allTowns } from "@/data/towns";

const categories = [
  {
    slug: "plumbers",
    name: "Plumber",
    icon: Wrench,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    slug: "electricians",
    name: "Electrician",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    slug: "builders",
    name: "Builder",
    icon: Hammer,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    slug: "painters",
    name: "Painter",
    icon: Paintbrush,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    slug: "gardeners",
    name: "Gardener",
    icon: Shovel,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    slug: "pool-maintenance",
    name: "Pool Services",
    icon: Droplets,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    slug: "air-conditioning",
    name: "Air Con",
    icon: Snowflake,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    slug: "locksmiths",
    name: "Locksmith",
    icon: Key,
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    icon: Sparkles,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    slug: "handyman",
    name: "Handyman",
    icon: PenTool,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

export default function PostJob() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubTask, setSelectedSubTask] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("option") || "",
  );
  const [openCombobox, setOpenCombobox] = useState(false);
  const [townSearch, setTownSearch] = useState("");
  const typewriterPlaceholder = useTypewriterPlaceholder(SEARCH_PLACEHOLDERS, {
    typeSpeed: 80,
    deleteSpeed: 40,
    pauseMs: 2000,
  });

  useEffect(() => {
    const option = searchParams.get("option");
    const locationFromParam =
      searchParams.get("location") || searchParams.get("postcode") || "";

    // Ensure we update state if params exist
    if (option) {
      setSearchQuery(option);
    }

    if (locationFromParam) {
      setPostcode(locationFromParam);
    }

    // Only trigger search if we have parameters
    if (option || locationFromParam) {
      const combinedQuery = locationFromParam
        ? `${option || ""} ${locationFromParam}`
        : option || "";
      handleHeroSearch(combinedQuery);
    }
  }, [searchParams]);

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setStep(1);
    setIsModalOpen(true);
  };

  const handleSubTaskSelect = (subTaskLabel: string) => {
    setSelectedSubTask(subTaskLabel);
    setStep(2);
  };

  const towns = allTowns;

  const handleHeroSearch = (overrideQuery?: string | any) => {
    const queryToUse =
      typeof overrideQuery === "string" ? overrideQuery : searchQuery;
    if (typeof queryToUse !== "string") return;

    const trimmed = queryToUse.trim();
    if (!trimmed) return;

    const { tradeSlug, location } = extractTradeAndLocation(
      trimmed,
      categories,
      towns,
    );

    if (tradeSlug && location) {
      handleCategorySelect(tradeSlug);
      setPostcode(location);
      return;
    }

    if (tradeSlug) {
      handleCategorySelect(tradeSlug);
      return;
    }

    if (location) {
      setPostcode(location);
      setStep(1);
      setIsModalOpen(true);
      return;
    }

    const query = trimmed.toLowerCase();

    const matchedCategory = categories.find(
      (c) => c.name.toLowerCase().includes(query) || c.slug.includes(query),
    );

    if (matchedCategory) {
      handleCategorySelect(matchedCategory.slug);
      return;
    }

    for (const [slug, data] of Object.entries(tradeServices)) {
      const matchedService = data.services.find(
        (s) =>
          s.label.toLowerCase().includes(query) ||
          (s.description && s.description.toLowerCase().includes(query)),
      );

      if (matchedService) {
        setSelectedCategory(slug);
        setSelectedSubTask(matchedService.label);
        setStep(2);
        setIsModalOpen(true);
        return;
      }
    }

    const grid = document.getElementById("categories-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    if (postcode) {
      setIsModalOpen(false);
      router.push(
        `/post-job/results?category=${selectedCategory}&option=${encodeURIComponent(selectedSubTask)}&postcode=${encodeURIComponent(postcode)}`,
      );
    }
  };

  const tradeData = getTradeServices(selectedCategory);
  const selectedCategoryName =
    categories.find((c) => c.slug === selectedCategory)?.name || "Trade";

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Post a Job for Free | Find Local Specialists"
        description="Describe your project details and get free proposals from trusted tradespeople on the Costa del Sol. Connect with the right expert for your job."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Home Improvement Marketplace",
          provider: {
            "@type": "Organization",
            name: "CostaTrades",
          },
        }}
      />
      {/* Hero Section */}
      <div className="bg-[#0a1f44] text-white py-20 md:py-32 relative overflow-hidden">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 opacity-10 animate-float-slow">
            <Wrench className="w-24 h-24 text-blue-300" />
          </div>
          <div className="absolute top-20 right-20 opacity-10 animate-float-medium">
            <Hammer className="w-32 h-32 text-purple-300" />
          </div>
          <div className="absolute bottom-10 left-1/4 opacity-5 animate-float-fast">
            <Paintbrush className="w-20 h-20 text-green-300" />
          </div>
          <div className="absolute top-1/3 right-1/4 opacity-5 animate-pulse-slow">
            <Zap className="w-16 h-16 text-yellow-300" />
          </div>
          <div className="absolute bottom-20 right-10 opacity-10 animate-float-slow">
            <HardHat className="w-28 h-28 text-orange-300" />
          </div>
          <div className="absolute top-1/2 left-10 opacity-5 animate-float-medium">
            <Ruler className="w-20 h-20 text-cyan-300" />
          </div>
          <div className="absolute bottom-1/3 right-1/3 opacity-5 animate-float-fast">
            <Truck className="w-24 h-24 text-red-300" />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f44]/50 to-[#0a1f44] pointer-events-none"></div>

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Find the right{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              specialist
            </span>{" "}
            for your job
          </h1>
          <p className="text-xl md:text-2xl text-blue-100/90 mb-12 font-light max-w-2xl mx-auto">
            Get quotes from trusted local professionals in minutes.
          </p>

          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
            <div className="relative bg-white rounded-full shadow-2xl flex items-center p-2 transition-transform duration-300 hover:scale-[1.01]">
              <div className="pl-6 pr-4 text-gray-400 flex-shrink-0">
                <Search className="h-6 w-6" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleHeroSearch()}
                placeholder={
                  typewriterPlaceholder || "Villa Renovation in Marbella"
                }
                className="flex-1 min-w-0 h-14 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent transition-opacity duration-500"
              />
              <button
                onClick={() => handleHeroSearch()}
                className="bg-[#0a1f44] text-white px-8 h-14 rounded-full font-bold text-lg hover:bg-blue-900 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center flex-shrink-0"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-blue-200/60">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Free to post
            </span>
            <span className="w-1 h-1 rounded-full bg-blue-200/30"></span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> No obligation
            </span>
            <span className="w-1 h-1 rounded-full bg-blue-200/30"></span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Verified trades
            </span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div
        id="categories-grid"
        className="container-custom py-20 bg-slate-50/50"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">
            What do you need help with?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Select a category to get started. We'll ask a few questions to match
            you with the right professionals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.slug}
                onClick={() => handleCategorySelect(category.slug)}
                className="group relative bg-white rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-blue-200 flex flex-col items-center justify-center gap-5 min-h-[200px] text-center hover:-translate-y-1"
              >
                <div
                  className={`w-20 h-20 rounded-2xl ${category.bg} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-sm group-hover:shadow-md`}
                >
                  <Icon
                    className={`w-10 h-10 ${category.color}`}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-gray-800 group-hover:text-[#0a1f44] text-lg block">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 block">
                    Get Quotes
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wizard Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden gap-0 bg-white rounded-2xl">
          <div className="bg-[#0a1f44] p-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-bold text-center">
                {step === 1
                  ? `What do you need help with?`
                  : "Where is the job located?"}
              </DialogTitle>
              <DialogDescription className="text-blue-200 text-center">
                {step === 1
                  ? `Select the type of ${selectedCategoryName.toLowerCase()} work you need`
                  : "We need this to find specialists in your area"}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {tradeData?.services ? (
                  tradeData.services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleSubTaskSelect(service.label)}
                      className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#0a1f44] hover:bg-blue-50 transition-all duration-200 group flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">
                          {service.label}
                        </div>
                        {service.description && (
                          <div className="text-sm text-gray-500 mt-0.5">
                            {service.description}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-[#0a1f44]" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No specific services found for this category.</p>
                    <Button
                      onClick={() => handleSubTaskSelect("General Enquiry")}
                      className="mt-4 bg-[#0a1f44] text-white"
                    >
                      Continue with General Enquiry
                    </Button>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 py-4">
                <div className="relative">
                  <Popover
                    open={openCombobox}
                    onOpenChange={(open) => {
                      setOpenCombobox(open);
                      if (!open) setTownSearch("");
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCombobox}
                        className="w-full justify-between h-14 text-lg rounded-xl border-gray-300 hover:border-[#0a1f44] hover:bg-white text-left font-normal"
                      >
                        {postcode ? (
                          <span className="text-gray-900">
                            {towns.find(
                              (town) =>
                                town.toLowerCase() === postcode.toLowerCase(),
                            ) || postcode}
                          </span>
                        ) : (
                          <span className="text-gray-500">Select town...</span>
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command shouldFilter={true}>
                        <CommandInput
                          placeholder="Search town..."
                          value={townSearch}
                          onValueChange={setTownSearch}
                        />
                        <CommandList>
                          <CommandEmpty>No town found.</CommandEmpty>
                          {Object.entries(townGroups).map(([group, towns]) => (
                            <CommandGroup key={group} heading={group}>
                              {towns.map((town) => (
                                <CommandItem
                                  key={town}
                                  value={town}
                                  onSelect={(currentValue) => {
                                    // cmdk returns the value lowercased if not specified otherwise
                                    // We want to use the original town name
                                    setPostcode(
                                      currentValue.toLowerCase() ===
                                        postcode.toLowerCase()
                                        ? ""
                                        : town,
                                    );
                                    setOpenCombobox(false);
                                    setTownSearch("");
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      postcode.toLowerCase() ===
                                        town.toLowerCase()
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {town}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <Button
                  onClick={handleSearch}
                  className="w-full h-14 text-lg font-bold bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  disabled={!postcode}
                >
                  See Results
                </Button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-gray-500 hover:text-[#0a1f44] font-medium"
                >
                  Back to services
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
