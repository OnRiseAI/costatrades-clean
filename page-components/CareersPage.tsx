"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Rocket, Sun, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function CareersPage() {
  return (
    <>
      <SEO
        title="Careers | CostaTrades"
        description="Join the team redefining professional standards on the Costa del Sol."
      />

      <div className="min-h-screen font-sans">
        {/* Section 1: The Hero (Status Update) */}
        <section className="bg-[#0A1E40] text-white py-24 md:py-32 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight">
              Help us redefine professional standards on the Costa del Sol.
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-light">
              Our team is currently fully staffed. However, we are always
              interested in connecting with exceptional talent for future
              opportunities.
            </p>
          </div>
        </section>

        {/* Section 2: "Why Us" (Culture) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] text-center mb-16">
              The CostaTrades Culture
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-[#0A1E40]">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1E40] mb-3">
                  International Mindset
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A diverse team serving British, German, Scandinavian, and
                  Spanish clients.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-[#0A1E40]">
                  <Rocket className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1E40] mb-3">
                  High Impact
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We are modernizing an entire industry, not just building a
                  directory.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-[#0A1E40]">
                  <Sun className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0A1E40] mb-3">
                  Balance & Focus
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hard work on a premium product, without forgetting the Costa
                  lifestyle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Past Roles (The "Closed" List) */}
        <section className="py-20 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2f2f2f] mb-4">
                How we have grown
              </h2>
              <p className="text-gray-500 text-lg">
                A look at key roles we have recently filled.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Senior React Developer (Remote)",
                "B2B Partnership Manager (Marbella)",
                "Customer Success German/English (Estepona)",
              ].map((role, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between opacity-60 grayscale select-none"
                >
                  <span className="font-medium text-gray-500 text-lg">
                    {role}
                  </span>
                  <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gray-200">
                    Filled
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Talent Pool CTA */}
        <section className="py-24 bg-blue-50/50">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1E40] mb-8">
              Be the first to know.
            </h2>

            <form
              className="flex flex-col sm:flex-row gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-12 bg-white border-gray-200 text-lg"
                required
              />
              <Button
                type="submit"
                className="h-12 px-8 bg-[#0A1E40] hover:bg-[#0A1E40]/90 text-white font-semibold text-lg whitespace-nowrap"
              >
                Join Talent Pool
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              We'll only contact you when relevant positions open up. No spam.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
