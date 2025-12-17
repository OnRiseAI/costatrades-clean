"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  User,
  Banknote,
  Clock,
  MessageSquare,
  Search,
} from "lucide-react";

export default function JobPostedSuccess() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="Job Posted Successfully | CostaTrades"
        description="Your job has been sent to verified specialists near you on the Costa del Sol. Track responses and manage quotes from your CostaTrades dashboard."
      />
      {/* 1. The "Celebration" Hero */}
      <section className="py-20 px-4 text-center bg-slate-50 border-b border-slate-100">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#0a1f44] mb-6 tracking-tight">
            Job Posted! We're contacting specialists in your area now.
          </h1>
          <p className="text-xl text-slate-600 mb-10 font-light max-w-2xl mx-auto">
            Expect your first quote within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customer-dashboard">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-900/20 w-full sm:w-auto flex items-center gap-2"
              >
                Go to My Dashboard <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-4">
            We sent a confirmation email to your registered address.
          </p>
        </div>
      </section>

      {/* 2. The "What Happens Next?" Timeline */}
      <section className="py-16 px-4">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0a1f44] mb-12 text-center">
            What Happens Next?
          </h2>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 md:left-1/2 md:-ml-px"></div>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative flex items-center md:justify-between group">
                <div className="flex items-center order-1 md:w-1/2 md:justify-end md:pr-12">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-200 md:text-right w-full ml-16 md:ml-0">
                    <h3 className="font-bold text-[#0a1f44] text-lg mb-1">
                      Job Sent
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Your job has been sent to verified pros in your area.
                    </p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-green-100 rounded-full border-4 border-white flex items-center justify-center md:-ml-8 z-10">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div className="hidden md:block order-1 md:w-1/2"></div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center md:justify-between group">
                <div className="hidden md:block order-1 md:w-1/2"></div>
                <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-blue-50 rounded-full border-4 border-white flex items-center justify-center md:-ml-8 z-10">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex items-center order-1 md:w-1/2 md:pl-12">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full ml-16 md:ml-0">
                    <h3 className="font-bold text-[#0a1f44] text-lg mb-1">
                      Pros Review
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Specialists review your job details and availability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center md:justify-between group">
                <div className="flex items-center order-1 md:w-1/2 md:justify-end md:pr-12">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 md:text-right w-full ml-16 md:ml-0">
                    <h3 className="font-bold text-[#0a1f44] text-lg mb-1">
                      Receive Quotes
                    </h3>
                    <p className="text-slate-600 text-sm">
                      You'll get notifications when quotes arrive.
                    </p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-slate-100 rounded-full border-4 border-white flex items-center justify-center md:-ml-8 z-10">
                  <MessageSquare className="w-8 h-8 text-slate-400" />
                </div>
                <div className="hidden md:block order-1 md:w-1/2"></div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-center md:justify-between group">
                <div className="hidden md:block order-1 md:w-1/2"></div>
                <div className="absolute left-0 md:left-1/2 w-16 h-16 bg-slate-100 rounded-full border-4 border-white flex items-center justify-center md:-ml-8 z-10">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
                <div className="flex items-center order-1 md:w-1/2 md:pl-12">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full ml-16 md:ml-0">
                    <h3 className="font-bold text-[#0a1f44] text-lg mb-1">
                      Hire the Best
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Compare profiles, ratings, and prices to hire the best
                      match.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "While You Wait" (Engagement) */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container-custom max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0a1f44] mb-8 text-center">
            While You Wait
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/cost-guides"
              className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Banknote className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#0a1f44] text-lg mb-2">
                See What It Should Cost
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Don't overpay. Check our updated price guides for 2025.
              </p>
              <span className="text-blue-600 text-sm font-semibold flex items-center">
                View Guides <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            <Link
              href="/verification-promise"
              className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#0a1f44] text-lg mb-2">
                How to Hire Safely
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Learn about our verification process and tips for safe hiring.
              </p>
              <span className="text-green-600 text-sm font-semibold flex items-center">
                Read Safety Tips <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>

            <Link
              href="/customer-dashboard"
              className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#0a1f44] text-lg mb-2">
                Complete Your Profile
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Add a photo and details to get 2x more responses from pros.
              </p>
              <span className="text-purple-600 text-sm font-semibold flex items-center">
                Edit Profile <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
