"use client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY"
);

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ChevronRight,
  Phone,
  MapPin,
  Star,
  CheckCircle,
  Shield,
  Search,
  Clock,
  Filter,
  User,
  Calendar,
  MessageSquare,
  ArrowLeft,
  Info,
  Loader2,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";

export default function PostJobResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams?.get("category") || "";
  const option = searchParams?.get("option") || "";
  const postcode = searchParams?.get("postcode") || "";
  const [jobDescription, setJobDescription] = useState("");
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedTradesperson, setSelectedTradesperson] = useState<any>(null);
  const [timing, setTiming] = useState("flexible");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSentSuccess, setQuoteSentSuccess] = useState(false);

  // Scroll to top when the quote form view is shown (e.g. on mobile)
  useEffect(() => {
    if (showQuoteForm && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [showQuoteForm]);

  // Phone Modal State
  const [tradespeople, setTradespeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTradespeople() {
      setLoading(true);
      let query = supabase.from("tradespeople").select("*");
      if (category) {
        query = query.ilike("category_display", `%${category}%`);
      }
      if (postcode) {
        query = query.or(`tier2_name.ilike.%${postcode}%,tier1_name.ilike.%${postcode}%`);
      }
      const { data, error } = await query.limit(20);
      if (data) {
        const mapped = data.map((tp: any) => ({
          slug: tp.slug,
          businessName: tp.name,
          tradeCategory: tp.category_display,
          tradeCategorySlug: tp.costatrades_category,
          location: tp.tier2_name,
          rating: tp.rating || 0,
          reviewCount: tp.reviews_count || 0,
          verified: tp.verified || false,
          phone: tp.phone,
          profilePhoto: tp.images ? JSON.parse(tp.images)[0] : null,
          url_path: tp.url_path,
        }));
        setTradespeople(mapped);
      }
      setLoading(false);
    }
    fetchTradespeople();
  }, [category, postcode]);

  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [phoneModalData, setPhoneModalData] = useState<any>(null);

  const [tradespeople, setTradespeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTradespeople() {
      setLoading(true);
      let query = supabase.from("tradespeople").select("*");
      
      if (category) {
        query = query.ilike("category_display", `%${category}%`);
      }
      if (postcode) {
        query = query.or(`tier2_name.ilike.%${postcode}%,tier1_name.ilike.%${postcode}%`);
      }
      
      const { data, error } = await query.limit(20);
      
      if (data) {
        const mapped = data.map((tp: any) => ({
          slug: tp.slug,
          businessName: tp.name,
          tradeCategory: tp.category_display,
          tradeCategorySlug: tp.costatrades_category,
          location: tp.tier2_name,
          rating: tp.rating || 0,
          reviewCount: tp.reviews_count || 0,
          verified: tp.verified || false,
          phone: tp.phone,
          profilePhoto: tp.images ? JSON.parse(tp.images)[0] : null,
          url_path: tp.url_path,
        }));
        setTradespeople(mapped);
      }
      setLoading(false);
    }
    fetchTradespeople();
  }, [category, postcode]);

  const handleRequestQuote = (tradesperson: any) => {
    setSelectedTradesperson(tradesperson);
    setShowQuoteForm(true);
  };

  const handleShowNumber = (tradesperson: any) => {
    setPhoneModalData(tradesperson);
    setPhoneModalOpen(true);
  };

  const handleSubmitQuote = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setQuoteSentSuccess(true);
    }, 1500);
  };

  const handleCloseSuccess = () => {
    setQuoteSentSuccess(false);
    setShowQuoteForm(false);
    setJobDescription("");
    setTiming("flexible");
  };

  if (showQuoteForm && selectedTradesperson) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <SEO
          title="Request a Quote | CostaTrades"
          description="Describe your job and send a free quote request to a verified specialist on the Costa del Sol."
        />
        {/* Success Modal */}
        <Dialog open={quoteSentSuccess} onOpenChange={setQuoteSentSuccess}>
          <DialogContent className="sm:max-w-md bg-white rounded-2xl">
            <DialogHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-center text-2xl font-bold text-[#0a1f44]">
                Quote Request Sent!
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600 pt-2">
                Your request has been sent to{" "}
                <span className="font-bold text-[#0a1f44]">
                  {selectedTradesperson.businessName}
                </span>
                . They will receive a notification immediately.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 text-center space-y-4">
              <p className="text-sm text-gray-500">
                You will receive a notification when they respond to your
                request.
              </p>

              <Button
                className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white font-bold py-6 rounded-xl shadow-lg"
                onClick={handleCloseSuccess}
              >
                Message another {category || "Professional"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="container-custom py-4 flex items-center justify-between">
            <button
              onClick={() => setShowQuoteForm(false)}
              className="text-gray-600 hover:text-[#0a1f44] flex items-center gap-2 font-medium transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to results
            </button>
            <div className="text-sm font-medium text-gray-500">Step 1 of 2</div>
          </div>
        </div>

        <div className="container-custom py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#0a1f44] w-1/2 rounded-full"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#0a1f44] mb-2">
                    Request a quote
                  </h1>
                  <p className="text-gray-600">
                    Provide details about your job to get an accurate quote.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <label className="block text-lg font-bold text-[#0a1f44] mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Describe your job
                  </label>
                  <div className="relative">
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Hi, I need help with... (e.g. fixing a leaking tap in the kitchen, installing a new light fixture)"
                      className="w-full border-2 border-gray-200 rounded-xl p-4 min-h-[180px] focus:border-[#0a1f44] focus:ring-0 focus:outline-none resize-none text-lg placeholder:text-gray-400 transition-colors"
                    />
                    <div className="absolute bottom-4 right-4 text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-500">
                      {jobDescription.length}/500
                    </div>
                  </div>

                  {jobDescription.length > 0 && jobDescription.length < 50 && (
                    <div className="mt-3 flex items-center gap-2 text-amber-600 text-sm bg-amber-50 p-3 rounded-lg">
                      <Info className="h-4 w-4" />
                      Please enter at least 50 characters to help the specialist
                      understand your needs.
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <label className="block text-lg font-bold text-[#0a1f44] mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    When would you like the job to start?
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      {
                        value: "flexible",
                        label: "I'm flexible",
                        desc: "Whenever available",
                      },
                      {
                        value: "urgent",
                        label: "Urgent",
                        desc: "Within 48 hours",
                      },
                      {
                        value: "2weeks",
                        label: "Within 2 weeks",
                        desc: "Specific dates",
                      },
                      {
                        value: "budgeting",
                        label: "Just budgeting",
                        desc: "Planning phase",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          timing === option.value
                            ? "border-[#0a1f44] bg-blue-50/30"
                            : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`font-bold ${timing === option.value ? "text-[#0a1f44]" : "text-gray-700"}`}
                          >
                            {option.label}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              timing === option.value
                                ? "border-[#0a1f44]"
                                : "border-gray-300"
                            }`}
                          >
                            {timing === option.value && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#0a1f44]" />
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {option.desc}
                        </span>
                        <input
                          type="radio"
                          name="timing"
                          value={option.value}
                          checked={timing === option.value}
                          onChange={(e) => setTiming(e.target.value)}
                          className="hidden"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    size="lg"
                    className="w-full text-lg font-bold py-7 rounded-xl bg-[#0a1f44] hover:bg-[#0a1f44]/90 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:shadow-none"
                    disabled={jobDescription.length < 50 || isSubmitting}
                    onClick={handleSubmitQuote}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        Send Quote Request
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    {selectedTradesperson.businessName} will receive your
                    request immediately via their phone and account.
                  </p>
                </div>
              </div>

              {/* Sidebar Summary */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                    You are contacting
                  </h3>

                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-4 border-4 border-white shadow-md">
                      {selectedTradesperson.profilePhoto ? (
                        <img
                          src={selectedTradesperson.profilePhoto}
                          alt={selectedTradesperson.businessName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                          {selectedTradesperson.businessName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-[#0a1f44] mb-1">
                      {selectedTradesperson.businessName}
                    </h2>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="h-3 w-3" />{" "}
                      {postcode || "Costa del Sol"}
                    </div>

                    {selectedTradesperson.verified && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                        <Shield className="h-3 w-3" /> Verified Pro
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Free to request quotes</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>No obligation to hire</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Your details are secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SEO
        title="Job Matches & Quotes | CostaTrades"
        description="Review matching specialists for your job, compare profiles and send quote requests or contact pros directly."
      />
      {/* Header Bar */}
      <div className="bg-[#0a1f44] py-6 shadow-md sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  defaultValue={option || category}
                  className="w-full h-12 pl-12 pr-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Trade or service"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  defaultValue={postcode}
                  className="w-full h-12 pl-12 pr-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Postcode"
                />
              </div>
            </div>
            <Button className="w-full md:w-auto h-12 px-8 bg-white text-[#0a1f44] hover:bg-blue-50 font-bold rounded-lg">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-[#0a1f44]" />
                <h3 className="font-bold text-gray-900">
                  When do you need it?
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { value: "flexible", label: "Flexible start date" },
                  { value: "urgent", label: "Urgent (< 48 hours)" },
                  { value: "2weeks", label: "Within 2 weeks" },
                  { value: "1month", label: "Within 1 month" },
                ].map((t) => (
                  <label
                    key={t.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${timing === t.value ? "border-[#0a1f44]" : "border-gray-300 group-hover:border-gray-400"}`}
                    >
                      {timing === t.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0a1f44]" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="sidebar-timing"
                      value={t.value}
                      checked={timing === t.value}
                      onChange={(e) => setTiming(e.target.value)}
                      className="hidden"
                    />
                    <span
                      className={`text-sm ${timing === t.value ? "font-medium text-[#0a1f44]" : "text-gray-600"}`}
                    >
                      {t.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-[#0a1f44]" />
                <h3 className="font-bold text-gray-900">Filter results</h3>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[#0a1f44] focus:ring-[#0a1f44]"
                  />
                  <span className="text-sm text-gray-600">Verified Only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[#0a1f44] focus:ring-[#0a1f44]"
                  />
                  <span className="text-sm text-gray-600">With Photos</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[#0a1f44] focus:ring-[#0a1f44]"
                  />
                  <span className="text-sm text-gray-600">With Reviews</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900">
                {tradespeople.length} {category} found in {postcode}
              </h1>
              <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0a1f44]">
                <option>Recommended</option>
                <option>Highest Rated</option>
                <option>Most Reviews</option>
              </select>
            </div>

            {tradespeople.map((tradesperson) => (
              <div
                key={tradesperson.slug}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left: Avatar */}
                  <div className="w-full md:w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 relative">
                    {tradesperson.profilePhoto ? (
                      <img
                        src={tradesperson.profilePhoto}
                        alt={tradesperson.businessName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400 bg-gray-100">
                        {tradesperson.businessName.charAt(0)}
                      </div>
                    )}
                    {tradesperson.verified && (
                      <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-tl-lg">
                        <Shield className="h-3 w-3" />
                      </div>
                    )}
                  </div>

                  {/* Middle: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h2 className="text-xl font-bold text-[#0a1f44] truncate pr-4">
                        {tradesperson.businessName}
                      </h2>
                      {tradesperson.rating && (
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                          <Star className="h-4 w-4 text-green-600 fill-current" />
                          <span className="font-bold text-green-700">
                            {Number(tradesperson.rating).toFixed(2)}
                          </span>
                          <span className="text-xs text-green-600">
                            ({tradesperson.reviewCount || 0})
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>Operates in {postcode} and surrounding areas</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {tradesperson.tradeCategory}
                      </span>
                      {tradesperson.verified && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 gap-1">
                          <CheckCircle className="h-3 w-3" /> Verified
                        </span>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        Fast response
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-3 w-full md:w-48 flex-shrink-0">
                    <Button
                      className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white font-bold py-6 rounded-xl shadow-sm"
                      onClick={() => handleRequestQuote(tradesperson)}
                    >
                      Request a quote
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-semibold py-6 rounded-xl"
                      onClick={() => handleShowNumber(tradesperson)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Show number
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phone Number Modal */}
      <Dialog open={phoneModalOpen} onOpenChange={setPhoneModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#0a1f44]">
              Contact Information
            </DialogTitle>
            <DialogDescription className="text-center">
              Get in touch with this professional directly
            </DialogDescription>
          </DialogHeader>

          {phoneModalData && (
            <div className="flex flex-col items-center space-y-6 py-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {phoneModalData.profilePhoto ? (
                  <img
                    src={phoneModalData.profilePhoto}
                    alt={phoneModalData.businessName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">
                    {phoneModalData.businessName.charAt(0)}
                  </span>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {phoneModalData.businessName}
                </h3>
                <p className="text-sm text-gray-500">
                  {phoneModalData.tradeCategory}
                </p>
              </div>

              <div className="w-full bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
                <p className="text-sm text-blue-600 mb-2 font-medium">
                  Phone Number
                </p>
                <a
                  href={`tel:${phoneModalData.phone || "+34 952 123 456"}`}
                  className="text-2xl font-bold text-[#0a1f44] hover:underline flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  {phoneModalData.phone || "+34 952 123 456"}
                </a>
              </div>

              <div className="text-center text-sm text-gray-500 max-w-xs">
                <p>
                  Please mention <strong>CostaTrade</strong> when you call to
                  ensure the best service.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
