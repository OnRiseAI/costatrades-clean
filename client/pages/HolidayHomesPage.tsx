"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import {
  MessageCircle,
  Key,
  Languages,
  Sun,
  Umbrella,
  Paintbrush,
  Quote,
  ArrowRight,
} from "lucide-react";

export default function HolidayHomesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEO
        title="Holiday Home Maintenance | Key Holding"
        description="Reliable specialists for holiday rentals in Costa del Sol. Emergency repairs for guests and key holding services."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Holiday Home Property Maintenance",
          provider: {
            "@type": "Organization",
            name: "CostaTrades",
          },
          areaServed: {
            "@type": "Place",
            name: "Costa del Sol",
          },
        }}
      />
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-32 px-4 text-center overflow-hidden bg-[#0a1f44] text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f44] to-[#0d2550]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        </div>

        <div className="container-custom max-w-4xl relative z-10 mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
            <Umbrella className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-100">
              For Holiday Home Owners
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Manage Your Costa del Sol <br className="hidden md:block" />
            <span className="text-blue-400">Property from Anywhere.</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Find trusted specialists who specialize in working with non-resident
            owners. English-speaking, reliable, and photo-verified updates.
          </p>

          <Link href="/post-job">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-900/20 w-full sm:w-auto flex items-center gap-2 mx-auto"
            >
              Find a Remote-Friendly Pro
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. The "Remote Owner" Promise */}
      <section className="py-20 px-4 -mt-10 relative z-20">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Languages className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-3">
                English Speaking
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Communication is key. Filter for specialists who speak your
                language to ensure nothing gets lost in translation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-3">
                WhatsApp Updates
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Get photo and video updates of the work as it happens. See the
                problem and the solution without being there.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
                <Key className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-3">
                Key Holding
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Connect with professionals accustomed to collecting keys from
                agents, neighbors, or key safes securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Common Services */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1f44] mb-12 text-center">
            Common Services for You
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm group-hover:scale-110 transition-transform">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[#0a1f44]">
                  Pre-Season Checks
                </h3>
              </div>
              <p className="text-slate-600">
                Ensure your AC is cooling and your pool is sparkling before you
                or your guests arrive.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm group-hover:scale-110 transition-transform">
                  <Umbrella className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[#0a1f44]">
                  Emergency Repairs
                </h3>
              </div>
              <p className="text-slate-600">
                Storm damage, leaks, or power cuts? Get a trusted pro on site
                quickly to prevent further damage.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm group-hover:scale-110 transition-transform">
                  <Paintbrush className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-[#0a1f44]">
                  Refresh & Paint
                </h3>
              </div>
              <p className="text-slate-600">
                Freshen up the villa between guests or seasons. Interior and
                exterior painting services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonial */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200 relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-blue-100 -z-0" />
            <div className="relative z-10 text-center">
              <p className="text-xl md:text-2xl text-[#0a1f44] font-medium italic mb-8 leading-relaxed">
                "Living in London, it was a nightmare trying to get my boiler
                fixed in Marbella. CostaTrades found me a pro who sent me a
                video of the fix. Amazing."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  SJ
                </div>
                <div className="text-left">
                  <div className="font-bold text-[#0a1f44]">Sarah J.</div>
                  <div className="text-sm text-slate-500">
                    Holiday Home Owner, UK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 px-4 bg-[#0a1f44] text-white text-center">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to relax?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Stop worrying about your property and start enjoying it. Find your
            trusted maintenance team today.
          </p>
          <Link href="/post-job">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-7 text-xl rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all flex items-center gap-3 mx-auto"
            >
              Find a Remote-Friendly Pro <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
