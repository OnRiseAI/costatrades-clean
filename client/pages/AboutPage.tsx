"use client";

import { Button } from "@/components/ui/button";
import {
  Shield,
  Globe,
  Wallet,
  Info,
  Home,
  Building2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { SEO } from "@/components/SEO";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="About CostaTrades | Our Mission"
        description="We connect international homeowners with trusted local experts. No language barriers, just quality work. We bridge the gap for expats in Spain."
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          mainEntity: {
            "@type": "Organization",
            name: "CostaTrades",
            foundingDate: "2024",
            description: "The safest way to hire professionals in Spain.",
          },
        }}
      />
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F30dab4e592724986a43fc4d20bfb2e27%2F964f2a624f4c449f9c4ca390ffab21c8?format=webp&width=800"
            alt="Sunny Mediterranean city pier view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="container-custom relative z-10 text-center text-white max-w-4xl px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-sm font-medium">
              Part of the OnRiseDigital network
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Connecting residents and holiday home owners to trusted
            professionals you can rely on.
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            CostaTrades was created by a small team who live on the Costa del
            Sol and understand the real challenges of finding dependable
            professionals.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-6">
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-6">
                Why CostaTrades was built
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  After years of hiring tradespeople for our own homes and
                  projects, we noticed how difficult it can be to find someone
                  who is reliable, skilled and available.
                </p>
                <p>
                  We've all heard the stories of no-shows, poor workmanship, and
                  language barriers. That first hand experience inspired us to
                  build a place where quality comes first.
                </p>
                <p>
                  We wanted to create a platform that brings transparency and
                  trust to the home services market on the Costa del Sol, making
                  it easier for everyone to build and maintain their dream home.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-blue-100 rounded-[40px] transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/3771055/pexels-photo-3771055.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Handshake after a job well done"
                className="relative rounded-[40px] shadow-2xl w-full object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are / The Team */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-6">
              Built by Locals, For Locals
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We live here. We deal with the same property challenges. That
              local experience lets us highlight the professionals who genuinely
              deliver good work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Co-Founder",
                image: "https://i.pravatar.cc/300?img=5",
              },
              {
                name: "David Mueller",
                role: "Head of Operations",
                image: "https://i.pravatar.cc/300?img=11",
              },
              {
                name: "Elena Rodriguez",
                role: "Community Manager",
                image: "https://i.pravatar.cc/300?img=9",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-blue-50 group-hover:border-blue-100 transition-colors">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#0a1f44] mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-6">
              What makes CostaTrades different?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Listings",
                desc: "Anyone listed on CostaTrades has chosen to be visible and accountable.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: Globe,
                title: "Language Friendly",
                desc: "Many of our professionals speak English and Spanish.",
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                icon: Wallet,
                title: "Every Budget",
                desc: "From small repairs to major villa renovations.",
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
              {
                icon: Info,
                title: "Clear Information",
                desc: "Every listing shows you exactly what the professional offers.",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a1f44] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 md:py-32 bg-[#0a1f44] text-white relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 font-semibold text-sm mb-6 backdrop-blur-sm">
                Our Community
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                Who We Serve
              </h2>
              <p className="text-xl text-blue-100/90 mb-10 font-light leading-relaxed">
                Whether you live here full-time or visit occasionally, we help
                you maintain and improve your property with confidence.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: Home,
                    title: "Residents",
                    desc: "For urgent repairs and home improvements.",
                  },
                  {
                    icon: Globe,
                    title: "Holiday Home Owners",
                    desc: "For reliable maintenance while you are abroad.",
                  },
                  {
                    icon: Building2,
                    title: "Landlords",
                    desc: "For quick turnovers and tenant services.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm group hover:translate-x-1"
                    >
                      <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                        <Icon className="w-6 h-6 text-blue-200 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-white group-hover:text-blue-200 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-blue-100/70 group-hover:text-blue-100 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-2xl -z-10"></div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6 translate-y-12">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F30dab4e592724986a43fc4d20bfb2e27%2Fa37c88abad5c48feb45d83e5b15c60fc?format=webp&width=800"
                    alt="Luxury villa terrace with ocean view"
                    className="rounded-2xl shadow-2xl w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-500 border border-white/10"
                  />
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="text-3xl font-bold text-blue-300 mb-1">
                      2,000+
                    </div>
                    <div className="text-sm text-blue-100/80">Jobs Posted</div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/80 to-blue-800/80 border border-white/10 backdrop-blur-md text-white shadow-xl">
                    <div className="text-3xl font-bold mb-1">500+</div>
                    <div className="text-sm text-blue-100">Verified Trades</div>
                  </div>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F30dab4e592724986a43fc4d20bfb2e27%2F9cecb7dfb8784f9aa6451e19d5a3ce79?format=webp&width=800"
                    alt="Modern minimalist apartment buildings"
                    className="rounded-2xl shadow-2xl w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-500 border border-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What areas does CostaTrades cover?",
                a: "We cover the entire Costa del Sol region, including Marbella, Mijas, Fuengirola, Benalmadena, Estepona, La Cala, San Pedro, and surrounding areas.",
              },
              {
                q: "What services can I find?",
                a: "You can find a wide range of professionals including electricians, plumbers, builders, handymen, painters, gardeners, pool maintenance experts, and more.",
              },
              {
                q: "Is CostaTrades free?",
                a: "Yes. Browsing listings and contacting tradespeople is completely free for homeowners.",
              },
              {
                q: "How do I contact a tradesperson?",
                a: "Each listing has clear contact details including phone numbers and a direct messaging option. You can also request a quote directly through the platform.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-100 py-6">
                <h3 className="text-lg font-semibold text-[#0a1f44] mb-2">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-blue-50">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-6">
            Ready to find a trusted professional?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of homeowners who trust CostaTrades for their home
            improvement needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/post-job">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white px-8 py-6 text-lg rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Post a Job
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/post-job">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-[#0a1f44] text-[#0a1f44] hover:bg-blue-50 hover:text-[#0a1f44] px-8 py-6 text-lg rounded-full font-bold"
              >
                Browse Specialists
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
