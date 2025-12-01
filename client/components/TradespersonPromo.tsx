import {
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Headphones,
  Star,
} from "lucide-react";

("use client");

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TradespersonPromo() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Get more work",
      description:
        "Access thousands of local homeowners looking for your skills.",
    },
    {
      icon: ShieldCheck,
      title: "Build trust",
      description:
        "Showcase your verified profile and reviews to win more jobs.",
    },
    {
      icon: Headphones,
      title: "We're here to help",
      description: "Our dedicated team supports you in growing your business.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0a1f44] relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f44] via-[#0f2952] to-[#0a1f44]"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="text-white order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-100">
                Join for free today
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Are you a Top-Rated Professional? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-white">
                Grow your business with premium clients.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-blue-100/70 mb-10 leading-relaxed max-w-xl font-light">
              Join the Costa del Sol's only curated network for high-value Expat
              clients. We help you stand out with verified leads and a premium
              reputation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/join-as-tradesperson">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-[#0a1f44] hover:bg-blue-50 font-semibold text-base px-8 h-14 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300"
                >
                  Apply to Join
                </Button>
              </Link>
              <Link href="/how-it-works-trades">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/10 bg-white/5 text-white hover:bg-white/10 font-semibold text-base px-8 h-14 rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  How it works
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 border-t border-white/10 pt-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="group">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors duration-300 border border-blue-500/10">
                      <Icon className="w-6 h-6 text-blue-300" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-lg">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-blue-100/50 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative lg:h-[700px] hidden lg:block order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[40px] blur-2xl transform translate-x-4 translate-y-4"></div>
            <div className="relative h-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#0f2952]">
              <img
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auhref=compress&cs=tinysrgb&w=800"
                alt="Specialist"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44] via-transparent to-transparent opacity-60"></div>

              {/* Floating Stats Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-[#0a1f44] bg-gray-200 overflow-hidden"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-[#0a1f44] bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                      +2k
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/20">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs font-medium text-green-400">
                      +12% this week
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-white">500+ New Jobs</p>
                  <p className="text-sm text-blue-100/60">
                    Posted by homeowners in your area this week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
