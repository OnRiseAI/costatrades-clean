"use client";

import Link from "next/link";
import {
  Home,
  Search,
  Wrench,
  Hammer,
  AlertTriangle,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <SEO
        title="Page Not Found | CostaTrades"
        description="This page does not exist. Find verified tradespeople or return to the CostaTrades homepage to start a new search."
      />
      <div className="container-custom max-w-3xl mx-auto text-center">
        {/* 1. The Visual (Humor) */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          {/* Background blob */}
          <div className="absolute inset-0 bg-yellow-100 rounded-full animate-pulse"></div>

          {/* Icons composition */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Wrench className="w-16 h-16 text-slate-400 -rotate-45 transform translate-x-2" />
            <Hammer className="w-16 h-16 text-slate-400 rotate-12 transform -translate-x-2" />
          </div>

          {/* Warning badge */}
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg border-4 border-white animate-bounce">
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>

        {/* 2. The Joke (Brand Voice) */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a1f44] mb-6 tracking-tight">
          Whoops! Looks like a broken link.
        </h1>

        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          We can't fix this page... but we{" "}
          <span className="italic font-medium text-blue-600">can</span> help you
          fix that broken pipe, flickering light, or leaky roof.
        </p>

        {/* 3. The Recovery (Navigation) */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-12">
          <p className="text-slate-500 font-medium mb-6 uppercase tracking-wide text-sm">
            Let's get you back on track
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/post-job">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-900/20 w-full sm:w-auto flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Find a Verified Specialist
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg rounded-xl w-full sm:w-auto flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>

        {/* 4. "Popular Destinations" (SEO Recovery) */}
        <div className="text-left max-w-2xl mx-auto">
          <h3 className="text-center text-slate-400 font-medium mb-6 uppercase tracking-wide text-sm">
            Were you looking for?
          </h3>

          <div className="grid sm:grid-cols-3 gap-4">
            <Link
              href="/trades/plumbers/marbella"
              className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                Plumbers in <br />
                Marbella
              </div>
            </Link>

            <Link
              href="/trades/electricians/estepona"
              className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                Electricians in <br />
                Estepona
              </div>
            </Link>

            <Link
              href="/post-job"
              className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-md transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="text-sm font-medium text-slate-700 group-hover:text-green-700">
                Post a Job <br />
                for Free
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
