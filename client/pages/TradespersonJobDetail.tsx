"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Euro,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Camera,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock data for the job
const jobData = {
  id: "1",
  title: "Leaky Tap Repair",
  trade: "Plumbing",
  location: "Marbella (Elviria)",
  budget: "€100 - €200",
  postedTime: "2 hours ago",
  postedBy: "Sarah Jenkins",
  isUrgent: true,
  isVerified: true,
  description:
    "The kitchen tap has been dripping constantly for the last 2 days. It's a mixer tap. I've tried tightening the handle but it doesn't help. I think the washer might need replacing or the whole tap. Please include parts in your quote if possible.",
  photos: [
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1632759996438-63d920ee5d77?q=80&w=2864&auto=format&fit=crop",
  ],
  coordinates: { lat: 36.5101, lng: -4.8824 }, // Approx Marbella
};

const similarJobs = [
  {
    id: 2,
    title: "Bathroom Sink Blockage",
    location: "Marbella (Center)",
    budget: "€80 - €120",
    postedTime: "5 hours ago",
  },
  {
    id: 3,
    title: "Install Washing Machine",
    location: "Puerto Banus",
    budget: "€100 - €150",
    postedTime: "1 day ago",
  },
  {
    id: 4,
    title: "Replace Shower Head",
    location: "San Pedro",
    budget: "€50 - €80",
    postedTime: "1 day ago",
  },
];

export default function TradespersonJobDetail() {
  const params = useParams();
  const id = params?.id ?? "1"; // Default to "1" for static/mock data
  const router = useRouter();
  const [quotePrice, setQuotePrice] = useState("");
  const [quoteMessage, setQuoteMessage] = useState(
    "Hi, I can help with this. I have experience with mixer taps and can come take a look...",
  );

  const handleSendQuote = () => {
    // Logic to send quote would go here
    alert("Quote sent successfully!");
    router.push("/pro/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 md:pb-12">
      <SEO
        title="Job Details & Quote | CostaTrades"
        description="Review homeowner job details, budget and location, then send a professional quote from your CostaTrades pro dashboard."
      />
      {/* Mobile Header */}
      <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-30 flex items-center gap-4 md:hidden">
        <Link
          href="/pro/dashboard"
          className="text-slate-500 hover:text-[#0a1f44]"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-bold text-lg text-[#0a1f44] truncate">
          Job Details
        </h1>
      </div>

      {/* Desktop Back Button */}
      <div className="container-custom pt-8 hidden md:block">
        <Link
          href="/pro/dashboard"
          className="inline-flex items-center text-slate-500 hover:text-[#0a1f44] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
      </div>

      <div className="container-custom py-6 md:py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Column: Job Details */}
          <div className="space-y-8">
            {/* 1. Job Hero */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {jobData.trade}
                </span>
                {jobData.isUrgent && (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Urgent
                  </span>
                )}
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {jobData.location}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-[#0a1f44] mb-4">
                {jobData.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-slate-500 border-t border-slate-100 pt-6 mt-2">
                <div className="flex items-center gap-2">
                  <Euro className="w-5 h-5 text-slate-400" />
                  <span>
                    Client Budget:{" "}
                    <span className="font-bold text-[#0a1f44] text-lg">
                      {jobData.budget}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span>
                    Posted {jobData.postedTime} by{" "}
                    <span className="font-medium text-[#0a1f44]">
                      {jobData.postedBy}
                    </span>
                  </span>
                  {jobData.isVerified && (
                    <span className="text-green-600 flex items-center gap-0.5 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Description & Photos */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-[#0a1f44] mb-4">
                Description
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {jobData.description}
              </p>

              <h3 className="text-lg font-bold text-[#0a1f44] mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-slate-400" /> Photos
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {jobData.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
                  >
                    <img
                      src={photo}
                      alt={`Job photo ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-[#0a1f44] mb-4">
                Approximate Location
              </h2>
              <div className="bg-slate-100 rounded-xl h-64 flex items-center justify-center text-slate-400 border border-slate-200">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Map View</p>
                  <p className="text-xs">
                    (Exact address revealed after quote acceptance)
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Similar Jobs */}
            <div>
              <h2 className="text-xl font-bold text-[#0a1f44] mb-6">
                Other Jobs in Marbella
              </h2>
              <div className="grid gap-4">
                {similarJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex justify-between items-center group"
                  >
                    <div>
                      <h3 className="font-bold text-[#0a1f44] group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Euro className="w-3 h-3" /> {job.budget}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Quote Box */}
          <div className="relative">
            <div className="sticky top-24 space-y-6">
              {/* Quote Form */}
              <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200 overflow-hidden">
                <div className="bg-[#0a1f44] p-4 text-white text-center">
                  <h3 className="font-bold text-lg">Send a Quote</h3>
                  <p className="text-blue-200 text-xs">
                    This quote is free to send.
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Price (€)
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <Input
                        type="number"
                        placeholder="150"
                        className="pl-10 text-lg font-bold text-[#0a1f44]"
                        value={quotePrice}
                        onChange={(e) => setQuotePrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message to Client
                    </label>
                    <Textarea
                      placeholder="Hi, I can help with this..."
                      className="min-h-[120px] resize-none"
                      value={quoteMessage}
                      onChange={(e) => setQuoteMessage(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleSendQuote}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-semibold shadow-lg shadow-blue-600/20"
                  >
                    Send Quote
                  </Button>

                  <p className="text-xs text-center text-slate-400">
                    By sending a quote, you agree to our Terms of Service.
                  </p>
                </div>
              </div>

              {/* 3. Safety Block */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-800 text-sm">
                    0% Commission
                  </h4>
                  <p className="text-xs text-green-700 mt-1">
                    Payment is handled directly between you and the client.
                    CostaTrades takes no cut of your earnings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <p className="text-xs text-slate-500">Your Price</p>
            <div className="font-bold text-xl text-[#0a1f44]">
              €{quotePrice || "0"}
            </div>
          </div>
          <Button
            onClick={handleSendQuote}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 rounded-xl shadow-lg"
          >
            Send Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
