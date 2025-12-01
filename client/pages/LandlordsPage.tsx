"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import {
  Clock,
  Banknote,
  FileText,
  Key,
  Sparkles,
  Wrench,
  Paintbrush,
  ArrowRight,
  Building2,
} from "lucide-react";

export default function LandlordsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEO
        title="Landlord Services Costa del Sol | Rental Maintenance"
        description="Fast repairs for rental properties. Certified electricians and plumbers for certificates and urgent fixes."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Landlord Property Maintenance",
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
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        </div>

        <div className="container-custom max-w-4xl relative z-10 mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
            <Building2 className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-100">
              For Landlords & Property Managers
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Reliable Maintenance for <br className="hidden md:block" />
            <span className="text-blue-400">Your Rental Portfolio.</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Minimize void periods and keep tenants happy. Fast-response
            specialists for landlords and property managers.
          </p>

          <Link href="/post-job">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-900/20 w-full sm:w-auto flex items-center gap-2 mx-auto"
            >
              Find Maintenance Pros
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. The "Landlord" Advantage */}
      <section className="py-20 px-4 -mt-10 relative z-20">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-600">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-3">
                Fast Response
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Filter by 'Emergency Availability' to fix issues before they
                become complaints. Speed is everything when a tenant has no hot
                water.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Banknote className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-3">
                Fair Pricing
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Market-standard rates with no 'gringo tax'. Get competitive
                quotes from multiple pros to ensure you're getting the best
                deal.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-600">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-3">
                Invoicing
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Proper legal invoices (Facturas) for your tax returns. Work with
                registered professionals who understand compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0a1f44] mb-12 text-center">
            Essential Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0a1f44] mb-2">
                End of Tenancy Cleaning
              </h3>
              <p className="text-sm text-slate-600">
                Get the property spotless for the next tenant.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0a1f44] mb-2">
                Lock Changes
              </h3>
              <p className="text-sm text-slate-600">
                Secure the property between tenancies.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0a1f44] mb-2">
                Appliance Repair
              </h3>
              <p className="text-sm text-slate-600">
                Fix washing machines and boilers fast.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple-500 shadow-sm mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Paintbrush className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0a1f44] mb-2">
                Painting & Decorating
              </h3>
              <p className="text-sm text-slate-600">
                Refresh walls and fix wear and tear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 px-4 bg-[#0a1f44] text-white text-center">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Streamline your maintenance.
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join hundreds of property managers who trust CostaTrades to keep
            their portfolios running smoothly.
          </p>
          <Link href="/join-as-tradesperson">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-7 text-xl rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all flex items-center gap-3 mx-auto"
            >
              Register Your Portfolio <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
