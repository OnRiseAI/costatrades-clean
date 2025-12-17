"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, Users } from "lucide-react";

export function ProGrowthBand() {
  return (
    <section className="relative bg-[#0a1f44] py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide uppercase text-blue-100">
                High Demand Area
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Stop chasing leads. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Let the jobs come to you.
              </span>
            </h2>

            <p className="text-blue-100 text-lg md:text-xl font-light mb-8 leading-relaxed">
              Join 500+ professionals on the Costa del Sol who are growing their
              business with zero upfront fees.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>100% Free to Join</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>Direct Client Chat</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span>No Commission Fees</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                className="bg-[#E31E24] hover:bg-[#C41218] text-white font-bold py-7 px-8 rounded-xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link href="/join-as-tradesperson">Get More Leads Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white/5 border-2 border-white/20 text-white hover:bg-white hover:text-[#0a1f44] font-bold py-7 px-8 rounded-xl text-lg backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/join-as-tradesperson">Create Free Profile</Link>
              </Button>
            </div>
          </div>

          {/* Right Stats Card */}
          <div className="relative w-full max-w-md lg:w-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-30 blur-lg"></div>
            <div className="relative bg-[#0d2550]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <div className="text-sm text-blue-200">
                    Monthly Job Requests
                  </div>
                  <div className="text-2xl font-bold text-white">1,240+</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <div className="text-sm text-blue-200">Active Homeowners</div>
                  <div className="text-2xl font-bold text-white">8,500+</div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-200">Average job value</span>
                  <span className="font-bold text-green-400">
                    €450 - €2,500
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
