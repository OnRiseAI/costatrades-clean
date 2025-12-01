"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Quote,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  Star,
  Users,
  Search,
  Briefcase,
  Award,
} from "lucide-react";

const HERO_TRADES = [
  { slug: "electrician", label: "Electrician" },
  { slug: "plumber", label: "Plumber" },
  { slug: "builder", label: "Builder" },
  { slug: "roofer", label: "Roofer" },
  { slug: "painter", label: "Painter" },
  { slug: "gardener", label: "Gardener" },
  { slug: "cleaner", label: "Cleaner" },
  { slug: "mechanic", label: "Mechanic" },
];

const TRUST_BADGES = [
  "Free qualified leads",
  "Fast sign up",
  "Verified directory listing",
];

const HOW_IT_WORKS_STEPS = [
  {
    title: "Create your free profile",
    description:
      "Tell us about your business, services and the areas you cover in Costa del Sol.",
    icon: Users,
  },
  {
    title: "Get enquiries from local homeowners",
    description:
      "We show your profile to homeowners looking for your trade and location.",
    icon: Search,
  },
  {
    title: "Build a trusted reputation",
    description:
      "Collect reviews and build a track record that helps you win more of the right work.",
    icon: Star,
  },
];

const KEY_BENEFITS = [
  {
    title: "Improve your visibility",
    description:
      "Appear in local searches when homeowners are actively looking for your trade.",
    icon: Search,
  },
  {
    title: "Save time on admin",
    description: "Spend less time chasing work and more time on paid jobs.",
    icon: Clock,
  },
  {
    title: "Get featured in local searches",
    description:
      "Stand out with a rich profile, photos of your work and verified reviews.",
    icon: Award,
  },
  {
    title: "Build your reputation",
    description:
      "Showcase your experience, qualifications and feedback from real customers.",
    icon: ShieldCheck,
  },
];

const TRADES_GRID = HERO_TRADES;

const GETTING_STARTED_STEPS = [
  "Choose your trade",
  "Create your profile",
  "Add your details",
  "Start receiving enquiries",
];

const TESTIMONIALS = [
  {
    quote:
      "CostaTrade sends me regular enquiries from homeowners in my area. I spend less time looking for work.",
    name: "Miguel Rodriguez",
    role: "Electrician in Marbella",
    image: "https://i.pravatar.cc/100?img=33",
  },
  {
    quote:
      "The best platform for finding quality leads on the coast. My business has grown 40% since joining.",
    name: "Sarah Jenkins",
    role: "Interior Designer in Mijas",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    quote:
      "Finally a site that actually verifies specialists. It makes homeowners trust us more from day one.",
    name: "David Mueller",
    role: "Plumber in Fuengirola",
    image: "https://i.pravatar.cc/100?img=11",
  },
];

export default function JoinAsTradesperson() {
  const router = useRouter();
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [selectedTradeSlug, setSelectedTradeSlug] = useState<string>("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const selectedTradeLabel =
    HERO_TRADES.find((trade) => trade.slug === selectedTradeSlug)?.label || "";

  const goToDetails = (tradeSlug: string) => {
    navigate(`/tradesperson/details?trade=${encodeURIComponent(tradeSlug)}`);
  };

  const handleGoClick = () => {
    if (!selectedTradeSlug) return;
    goToDetails(selectedTradeSlug);
  };

  const handleTradeSelect = (tradeSlug: string) => {
    setSelectedTradeSlug(tradeSlug);
    setTradeDialogOpen(false);
  };

  return (
    <div className="bg-white font-sans">
      <SEO
        title="Join CostaTrades | Get High-Value Expat Leads"
        description="Stop competing on price. Join the #1 directory for English, German, and Nordic clients in Spain. Grow your business with high-value, quality jobs."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Join CostaTrades",
          description:
            "Stop competing on price. Join the #1 directory for English, German, and Nordic clients in Spain. Grow your business with high-value, quality jobs.",
        }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a1f44] text-white py-20 md:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-blue-100">
                  Join for free today
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                Get High-Value Expat Leads
              </h1>

              <p className="text-lg md:text-xl text-blue-100/80 mb-10 leading-relaxed max-w-xl font-light">
                Join for free and receive genuine enquiries from local
                homeowners. Grow your business with verified leads and tools to
                manage your reputation.
              </p>

              <Dialog open={tradeDialogOpen} onOpenChange={setTradeDialogOpen}>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-2 md:p-3 max-w-xl">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => setTradeDialogOpen(true)}
                      className="flex-1 flex items-center justify-between rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-4 text-left transition-all duration-300 group"
                    >
                      <div>
                        <p className="text-xs font-medium text-blue-200 uppercase tracking-wider mb-1">
                          Your trade
                        </p>
                        <p className="text-lg font-medium text-white group-hover:text-blue-100 transition-colors">
                          {selectedTradeLabel || "Select your main trade"}
                        </p>
                      </div>
                      <ChevronDown className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors" />
                    </button>

                    <Button
                      type="button"
                      size="lg"
                      className="w-full sm:w-auto bg-white text-[#0a1f44] hover:bg-blue-50 rounded-xl px-8 py-4 h-auto text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={!selectedTradeSlug}
                      onClick={handleGoClick}
                    >
                      Get Started
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </div>

                <DialogContent className="max-w-2xl w-full max-h-[85vh] overflow-y-auto sm:rounded-2xl border-none shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      Select your main trade
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {HERO_TRADES.map((trade) => (
                      <button
                        key={trade.slug}
                        type="button"
                        onClick={() => handleTradeSelect(trade.slug)}
                        className="w-full border border-gray-100 rounded-xl p-4 hover:border-primary hover:bg-blue-50/50 transition-all flex items-center justify-between group text-left bg-white shadow-sm hover:shadow-md"
                      >
                        <span className="font-medium text-base text-gray-700 group-hover:text-primary">
                          {trade.label}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="mt-8 flex flex-wrap gap-4">
                {TRUST_BADGES.map((badge) => (
                  <div
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm text-blue-100"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block animate-fade-in-up">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[40px] blur-2xl opacity-30 transform rotate-6"></div>
                <div className="relative bg-white rounded-[32px] shadow-2xl overflow-hidden border-4 border-white/10">
                  <img
                    src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Specialist working"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                          >
                            <img
                              src={`https://i.pravatar.cc/100?img=${i + 20}`}
                              alt="User"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-white font-medium text-sm">
                        +2k homeowners joined this month
                      </span>
                    </div>
                    <p className="text-white/90 text-sm">
                      "Since joining CostaTrade, my calendar has been full with
                      quality jobs."
                    </p>
                  </div>
                </div>

                {/* Floating Stats Card */}
                <div className="absolute -right-8 top-12 bg-white p-5 rounded-2xl shadow-xl max-w-[200px] animate-bounce-slow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-xs font-bold text-green-600">
                      +15% Growth
                    </span>
                  </div>
                  <p className="text-gray-900 font-bold text-lg">150+ Leads</p>
                  <p className="text-gray-500 text-xs">Generated last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-6 tracking-tight">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join for free, create a strong profile and start receiving leads
              from homeowners who need your skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <Icon className="w-32 h-32 text-[#0a1f44]" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0a1f44] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#0a1f44] group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-600 mb-4">
                      Step 0{index + 1}
                    </div>

                    <h3 className="text-xl font-bold text-[#0a1f44] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key benefits */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-6 tracking-tight">
                Why specialists choose CostaTrade
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Built for busy professionals who want a steady flow of the right
                kind of work without the hassle.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {KEY_BENEFITS.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0a1f44] mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10">
                <Button
                  onClick={() => setTradeDialogOpen(true)}
                  size="lg"
                  className="bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white rounded-full px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Start growing your business
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-[40px] transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/5493691/pexels-photo-5493691.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy tradesperson"
                className="relative rounded-[40px] shadow-2xl w-full object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />

              {/* Testimonial Card Overlay */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl max-w-sm hidden md:block transition-all duration-500">
                <div className="flex gap-1 text-orange-400 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="h-24 relative overflow-hidden mb-4">
                  {TESTIMONIALS.map((testimonial, index) => (
                    <p
                      key={index}
                      className={`text-[#0a1f44] font-medium italic absolute top-0 left-0 w-full transition-all duration-500 ${
                        index === currentTestimonial
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      "{testimonial.quote}"
                    </p>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
                    {TESTIMONIALS.map((testimonial, index) => (
                      <img
                        key={index}
                        src={testimonial.image}
                        alt={testimonial.name}
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
                          index === currentTestimonial
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="relative h-10 w-48 overflow-hidden">
                    {TESTIMONIALS.map((testimonial, index) => (
                      <div
                        key={index}
                        className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                          index === currentTestimonial
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <p className="text-sm font-bold text-[#0a1f44]">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trades grid */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">
              Trades we specialise in
            </h2>
            <p className="text-muted-foreground text-lg">
              Select your trade to start your free profile.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {TRADES_GRID.map((trade) => (
              <button
                key={trade.slug}
                type="button"
                onClick={() => goToDetails(trade.slug)}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 text-left flex flex-col justify-between min-h-[140px]"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0a1f44] transition-colors duration-300">
                  <Briefcase className="w-5 h-5 text-[#0a1f44] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block font-bold text-lg text-[#0a1f44] mb-1">
                    {trade.label}
                  </span>
                  <span className="text-sm text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    Join now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-[#0a1f44] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to start winning work?
          </h2>
          <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto font-light">
            Join CostaTrade today, create your free profile and start receiving
            genuine enquiries from local homeowners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-auto bg-white text-[#0a1f44] hover:bg-blue-50 rounded-full px-10 h-16 text-lg font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
              onClick={() => {
                if (selectedTradeSlug) {
                  goToDetails(selectedTradeSlug);
                } else {
                  setTradeDialogOpen(true);
                }
              }}
            >
              Create my free profile
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          <p className="mt-6 text-sm text-blue-200/60">
            Free to join. No credit card required.
          </p>
        </div>
      </section>
    </div>
  );
}
