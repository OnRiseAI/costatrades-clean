"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TradespersonProgress } from "@/components/TradespersonProgress";
import { ChevronLeft, Loader2, Upload, X, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Dynamically import the map component with SSR disabled to prevent "Map container is already initialized" error
const ServiceAreaMap = dynamic(() => import("@/components/ServiceAreaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  ),
});

const TRADE_LABELS: Record<string, string> = {
  electrician: "Electrician",
  plumber: "Plumber",
  builder: "Builder",
  roofer: "Roofer",
  painter: "Painter",
  gardener: "Gardener",
  cleaner: "Cleaner",
  mechanic: "Mechanic",
};

const AREA_OPTIONS = [
  "Marbella",
  "Estepona",
  "Fuengirola",
  "Benalmadena",
  "Malaga",
  "Alhaurin el Grande",
  "Manilva",
  "Nerja",
  "Torre del Mar",
  "Sotogrande",
];

const AREA_COORDINATES: Record<string, { lat: number; lon: number }> = {
  Marbella: { lat: 36.5099, lon: -4.8854 },
  Estepona: { lat: 36.4256, lon: -5.151 },
  Fuengirola: { lat: 36.5396, lon: -4.6247 },
  Benalmadena: { lat: 36.5951, lon: -4.5734 },
  Malaga: { lat: 36.7213, lon: -4.4214 },
  "Alhaurin el Grande": { lat: 36.6428, lon: -4.6913 },
  Manilva: { lat: 36.377, lon: -5.25 },
  Nerja: { lat: 36.746, lon: -3.88 },
  "Torre del Mar": { lat: 36.74, lon: -4.095 },
  Sotogrande: { lat: 36.29, lon: -5.29 },
};

const RADIUS_OPTIONS = ["5 km", "10 km", "15 km", "20 km", "30 km", "50 km"];

const LANGUAGE_OPTIONS = [
  { value: "English", label: "English", flag: "🇬🇧" },
  { value: "Spanish", label: "Spanish", flag: "🇪🇸" },
  { value: "German", label: "German", flag: "🇩🇪" },
  { value: "French", label: "French", flag: "🇫🇷" },
  { value: "Dutch", label: "Dutch", flag: "🇳🇱" },
  { value: "Swedish", label: "Swedish", flag: "🇸🇪" },
  { value: "Norwegian", label: "Norwegian", flag: "🇳🇴" },
  { value: "Danish", label: "Danish", flag: "🇩🇰" },
  { value: "Russian", label: "Russian", flag: "🇷🇺" },
  { value: "Italian", label: "Italian", flag: "🇮🇹" },
  { value: "Portuguese", label: "Portuguese", flag: "🇵🇹" },
  { value: "Polish", label: "Polish", flag: "🇵🇱" },
  { value: "Ukrainian", label: "Ukrainian", flag: "🇺🇦" },
  { value: "Finnish", label: "Finnish", flag: "🇫🇮" },
  { value: "Arabic", label: "Arabic", flag: "🇦🇪" },
] as const;

const YEARS_IN_BUSINESS_OPTIONS = [
  "Under 1 year",
  "1-3 years",
  "3-5 years",
  "5+ years",
] as const;

type StoredApplication = {
  tradeSlug?: string;
  tradeLabel?: string;
  businessName?: string;
  website?: string;
  postcode?: string;
  mainTown?: string;
  radius?: string;
  businessType?: string;
  employeeRange?: string;
  yearsInBusiness?: string;
  firstName?: string;
  lastName?: string;
  businessEmail?: string;
  businessPhone?: string;
  mobilePhone?: string;
  languages?: string[];
};

const APPLICATION_STORAGE_KEY = "costatrade.tradespersonApplication";

export default function TradespersonDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tradeSlug = searchParams.get("trade") || "";
  const claimSlug = searchParams.get("claim") || ""; // For claiming existing profiles

  const tradeLabel = useMemo(
    () => TRADE_LABELS[tradeSlug] || "Tradesperson",
    [tradeSlug],
  );

  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [postcode, setPostcode] = useState("");
  const [mainTown, setMainTown] = useState<string>("");
  const [radius, setRadius] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [businessType, setBusinessType] = useState<string>("self-employed");
  const [employeeRange, setEmployeeRange] = useState<string>("1");
  const [yearsInBusiness, setYearsInBusiness] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  // New fields for claiming
  const [isClaimMode, setIsClaimMode] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimedBusinessData, setClaimedBusinessData] = useState<any>(null);
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");

  // Pricing fields
  const [callOutFee, setCallOutFee] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  // Images
  const [profileImages, setProfileImages] = useState<string[]>([]);

  // Map key for forcing remount when location/radius changes
  const [mapKey, setMapKey] = useState(0);

  // Fetch business data when claiming an existing profile
  useEffect(() => {
    async function fetchClaimData() {
      if (!claimSlug) return;

      setIsClaimMode(true);
      setClaimLoading(true);

      try {
        const { data, error } = await supabase
          .from("tradespeople")
          .select("*")
          .eq("slug", claimSlug)
          .single();

        if (data && !error) {
          setClaimedBusinessData(data);

          // Pre-fill form fields with existing data
          if (data.name) setBusinessName(data.name);
          if (data.website) setWebsite(data.website);
          if (data.phone) setBusinessPhone(data.phone);
          if (data.address) {
            setAddress(data.address);
            // Try to extract postcode from address
            const postcodeMatch = data.address.match(/\d{5}/);
            if (postcodeMatch) setPostcode(postcodeMatch[0]);
          }

          // Set main town from tier2_name
          if (data.tier2_name) {
            const matchingTown = AREA_OPTIONS.find(
              (area) => area.toLowerCase() === data.tier2_name.toLowerCase()
            );
            if (matchingTown) {
              setMainTown(matchingTown);
              const coords = AREA_COORDINATES[matchingTown];
              if (coords) setMapCenter(coords);
            }
          }

          // Set map center from coordinates if available
          if (data.latitude && data.longitude) {
            setMapCenter({ lat: data.latitude, lon: data.longitude });
          }

          // Parse and set images
          if (data.images) {
            try {
              let imageArray: string[] = [];
              if (typeof data.images === "string") {
                if (data.images.startsWith("[")) {
                  imageArray = JSON.parse(data.images);
                } else if (data.images.startsWith("http")) {
                  imageArray = data.images.split(",").map((s: string) => s.trim());
                }
              } else if (Array.isArray(data.images)) {
                imageArray = data.images;
              }
              setProfileImages(imageArray);
            } catch {
              // Ignore parsing errors
            }
          }
        }
      } catch (error) {
        console.error("Error fetching claim data:", error);
      }

      setClaimLoading(false);
    }

    fetchClaimData();
  }, [claimSlug]);

  // Load from session storage (for non-claim flow)
  useEffect(() => {
    if (claimSlug) return; // Skip if in claim mode

    try {
      const stored = window.sessionStorage.getItem(APPLICATION_STORAGE_KEY);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as StoredApplication;

      if (parsed.businessName) setBusinessName(parsed.businessName);
      if (parsed.website) setWebsite(parsed.website);
      if (parsed.postcode) setPostcode(parsed.postcode);
      if (parsed.mainTown) {
        setMainTown(parsed.mainTown);
        const coords = AREA_COORDINATES[parsed.mainTown];
        if (coords) setMapCenter(coords);
      }
      if (parsed.radius) setRadius(parsed.radius);
      if (parsed.businessType) setBusinessType(parsed.businessType);
      if (parsed.employeeRange) setEmployeeRange(parsed.employeeRange);
      if (parsed.yearsInBusiness) setYearsInBusiness(parsed.yearsInBusiness);
      if (parsed.firstName) setFirstName(parsed.firstName);
      if (parsed.lastName) setLastName(parsed.lastName);
      if (parsed.businessEmail) setBusinessEmail(parsed.businessEmail);
      if (parsed.businessPhone) setBusinessPhone(parsed.businessPhone);
      if (parsed.mobilePhone) setMobilePhone(parsed.mobilePhone);
      if (parsed.languages) setLanguages(parsed.languages);
    } catch {
      // If reading stored data fails, continue with empty defaults
    }
  }, [claimSlug]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !businessName ||
      !postcode ||
      !firstName ||
      !lastName ||
      !businessEmail ||
      !businessPhone
    ) {
      return;
    }

    if (!mainTown || !radius) {
      window.alert("Please select a main town and service radius.");
      return;
    }

    const application = {
      tradeSlug,
      tradeLabel,
      businessName,
      postcode,
      mainTown,
      radius,
      businessType,
      employeeRange,
      yearsInBusiness,
      firstName,
      lastName,
      businessEmail,
      businessPhone,
      mobilePhone,
      languages,
      website,
    };

    window.sessionStorage.setItem(
      "costatrade.tradespersonApplication",
      JSON.stringify(application),
    );

    router.push("/tradesperson-review");
  };

  const handlePostcodeBlur = async () => {
    const query = postcode.trim();
    if (!query) {
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=es&q=${encodeURIComponent(query + " costa del sol")}`,
      );
      const results: Array<{ lat: string; lon: string }> =
        await response.json();

      if (results.length > 0) {
        const first = results[0];
        const lat = parseFloat(first.lat);
        const lon = parseFloat(first.lon);
        if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
          setMapCenter({ lat, lon });
        }
      }
    } catch {
      // If geocoding fails, keep the existing map centre
    }
  };

  // Show loading state while fetching claim data
  if (claimLoading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#0a1f44] mx-auto mb-4" />
          <p className="text-gray-600">Loading your business details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {!isClaimMode && <TradespersonProgress currentStep={2} />}

      <div className="container-custom py-12 md:py-16 max-w-4xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-muted-foreground hover:text-[#0a1f44] mb-8 text-sm font-medium transition-colors"
        >
          <div className="p-1 rounded-full bg-white border border-gray-200 group-hover:border-[#0a1f44] transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </div>
          <span>{isClaimMode ? "Back to profile" : "Back to previous step"}</span>
        </button>

        <div className="mb-10">
          {isClaimMode ? (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF8A00]/10 text-[#FF8A00] text-sm font-bold rounded-full mb-4">
                <span className="w-2 h-2 bg-[#FF8A00] rounded-full animate-pulse"></span>
                Claim Your Profile
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4 tracking-tight">
                Verify & complete your profile
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                We found your business <span className="font-semibold text-[#0a1f44]">{businessName}</span>.
                Please verify your details and complete your profile to start receiving leads.
                An email will be sent to verify your account.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4 tracking-tight">
                Tell us about your business
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                You selected{" "}
                <span className="font-semibold text-[#0a1f44]">{tradeLabel}</span>.
                We use these details to create your CostaTrade profile and match you
                with local homeowners.
              </p>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a1f44] mb-8 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                1
              </span>
              Business details
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Business name*
                </label>
                <Input
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                  placeholder="Enter your business name"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Business website (optional)
                </label>
                <Input
                  type="text"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  placeholder="e.g. www.mybusiness.com"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Business postcode*
                </label>
                <Input
                  value={postcode}
                  onChange={(event) => setPostcode(event.target.value)}
                  onBlur={handlePostcodeBlur}
                  placeholder="Enter postcode"
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Service areas
                </label>
                <p className="text-sm text-muted-foreground">
                  Choose the main town you work from and how far you travel.
                </p>
              </div>

              <Card className="overflow-hidden rounded-2xl border-gray-200 bg-white shadow-none ring-1 ring-gray-200">
                <div className="relative w-full h-64 md:h-80 bg-gray-100 z-0">
                  <ServiceAreaMap
                    mapCenter={mapCenter}
                    radius={radius}
                    mapKey={mapKey}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-[400]">
                    <div className="w-12 h-12 rounded-full bg-[#0a1f44]/90 border-4 border-white shadow-xl flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Select
                        value={mainTown}
                        onValueChange={(value) => {
                          setMainTown(value);
                          setMapKey((k) => k + 1); // Force map remount
                          const coords = AREA_COORDINATES[value];
                          if (coords) {
                            setMapCenter(coords);
                          }
                        }}
                      >
                        <SelectTrigger className="h-12 bg-white border-gray-200 focus:border-[#0a1f44] transition-all rounded-xl">
                          <SelectValue placeholder="Select town" />
                        </SelectTrigger>
                        <SelectContent>
                          {AREA_OPTIONS.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground pl-1">
                        Select the town you are based in.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Select value={radius} onValueChange={(value) => {
                        setRadius(value);
                        setMapKey((k) => k + 1); // Force map remount
                      }}>
                        <SelectTrigger className="h-12 bg-white border-gray-200 focus:border-[#0a1f44] transition-all rounded-xl">
                          <SelectValue placeholder="Select radius" />
                        </SelectTrigger>
                        <SelectContent>
                          {RADIUS_OPTIONS.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground pl-1">
                        We’ll show your profile to customers within this
                        distance.
                      </p>
                    </div>
                  </div>

                  {mainTown && radius && (
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-blue-800 text-sm font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      You will appear for customers up to {radius} away from{" "}
                      {mainTown}.
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a1f44] mb-8 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                2
              </span>
              Business profile
            </h2>

            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Business type
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { value: "self-employed", label: "Self employed" },
                    { value: "limited-company", label: "SL company" },
                    {
                      value: "starting-business",
                      label: "Starting a business",
                    },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`relative flex items-center justify-between gap-3 border-2 rounded-2xl px-5 py-4 cursor-pointer transition-all duration-200 ${
                        businessType === type.value
                          ? "border-[#0a1f44] bg-blue-50/30"
                          : "border-gray-100 bg-white hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium ${businessType === type.value ? "text-[#0a1f44]" : "text-gray-600"}`}
                      >
                        {type.label}
                      </span>
                      <input
                        type="radio"
                        name="businessType"
                        value={type.value}
                        checked={businessType === type.value}
                        onChange={(event) =>
                          setBusinessType(event.target.value)
                        }
                        className="h-5 w-5 border-gray-300 text-[#0a1f44] focus:ring-[#0a1f44]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Number of employees
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["1", "2-5", "6-9", "10+"].map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setEmployeeRange(range)}
                      className={`flex flex-col items-center justify-center border-2 rounded-2xl px-4 py-3 text-sm transition-all duration-200 ${
                        employeeRange === range
                          ? "border-[#0a1f44] bg-blue-50/30 text-[#0a1f44]"
                          : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-bold text-lg">{range}</span>
                      <span className="text-xs opacity-80">
                        {range === "1" ? "Employee" : "Employees"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  Years in business
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {YEARS_IN_BUSINESS_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setYearsInBusiness(option)}
                      className={`flex items-center justify-center border-2 rounded-2xl px-4 py-4 text-sm transition-all duration-200 ${
                        yearsInBusiness === option
                          ? "border-[#0a1f44] bg-blue-50/30 text-[#0a1f44] font-medium"
                          : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a1f44] mb-8 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                3
              </span>
              Contact information
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  First name*
                </label>
                <Input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Surname*
                </label>
                <Input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Business email*
                </label>
                <Input
                  type="email"
                  value={businessEmail}
                  onChange={(event) => setBusinessEmail(event.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Business phone*
                </label>
                <Input
                  type="tel"
                  value={businessPhone}
                  onChange={(event) => setBusinessPhone(event.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Mobile phone (optional)
                </label>
                <Input
                  type="tel"
                  value={mobilePhone}
                  onChange={(event) => setMobilePhone(event.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-700">
                  Languages you speak
                </p>
                <p className="text-xs text-muted-foreground">
                  Select all languages you can communicate in.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {LANGUAGE_OPTIONS.map((language) => {
                  const isSelected = languages.includes(language.value);

                  const handleClick = () => {
                    setLanguages((current) => {
                      if (current.includes(language.value)) {
                        return current.filter(
                          (item) => item !== language.value,
                        );
                      }

                      return [...current, language.value];
                    });
                  };

                  return (
                    <button
                      key={language.value}
                      type="button"
                      onClick={handleClick}
                      className={`px-3 py-2.5 rounded-xl text-sm border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                        isSelected
                          ? "border-[#0a1f44] bg-blue-50/30 text-[#0a1f44] font-medium"
                          : "border-gray-100 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-lg" aria-hidden="true">
                        {language.flag}
                      </span>
                      <span>{language.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4: Pricing (shown for claim mode or optionally for new registrations) */}
          {isClaimMode && (
            <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a1f44] mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                  4
                </span>
                Your rates (optional)
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Help customers understand your pricing. You can update these anytime.
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Call out fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                    <Input
                      type="number"
                      value={callOutFee}
                      onChange={(event) => setCallOutFee(event.target.value)}
                      placeholder="e.g. 30"
                      className="h-12 pl-8 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Initial visit fee</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Hourly rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                    <Input
                      type="number"
                      value={hourlyRate}
                      onChange={(event) => setHourlyRate(event.target.value)}
                      placeholder="e.g. 35"
                      className="h-12 pl-8 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Per hour labour</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Daily rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                    <Input
                      type="number"
                      value={dailyRate}
                      onChange={(event) => setDailyRate(event.target.value)}
                      placeholder="e.g. 200"
                      className="h-12 pl-8 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#0a1f44] transition-all rounded-xl"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Full day (8 hours)</p>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 5: Photos (shown for claim mode) */}
          {isClaimMode && (
            <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-[#0a1f44] mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                  5
                </span>
                Photos & portfolio
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Showcase your work to attract more customers. You can add up to 10 photos.
              </p>

              {/* Existing images from the profile */}
              {profileImages.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Current photos</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {profileImages.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                        <img
                          src={image}
                          alt={`Business photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setProfileImages(profileImages.filter((_, i) => i !== index))}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload new photos placeholder */}
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#0a1f44] transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Upload photos of your work
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  PNG, JPG up to 5MB each
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#0a1f44] text-[#0a1f44] hover:bg-[#0a1f44] hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add photos
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Photos will be reviewed before being published. You can add more photos after your profile is verified.
              </p>
            </section>
          )}

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              className="w-full md:w-auto px-12 py-6 bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              {isClaimMode ? "Submit & verify email" : "Review application"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
