"use client";

import { Users, Wallet, MapPin, Quote } from "lucide-react";
import { useState, useEffect } from "react";

export function WhyCostaTrades() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Profiles",
      sub: "Verified & Claimable",
    },
    {
      icon: Wallet,
      value: "100%",
      label: "Free",
      sub: "For Homeowners",
    },
    {
      icon: MapPin,
      value: "15",
      label: "Towns",
      sub: "Coastal Coverage",
    },
  ];

  const testimonials = [
    {
      text: "Found a brilliant electrician within 24 hours. Spoke perfect English and fixed the issue immediately.",
      author: "Marcus",
      location: "Mijas Costa",
      initial: "M",
      color: "bg-[#E31E24]", // Red
    },
    {
      text: "Finally a platform where I can find reliable tradespeople who actually show up. Highly recommended!",
      author: "Sarah",
      location: "Marbella",
      initial: "S",
      color: "bg-[#F59E0B]", // Amber
    },
    {
      text: "Great experience finding a pool maintenance service. The quotes were transparent and fair.",
      author: "David",
      location: "Estepona",
      initial: "D",
      color: "bg-[#10B981]", // Emerald
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 500); // Wait for fade out
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const activeTestimonial = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">
            Why CostaTrades?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            The most trusted way to find professionals on the Costa del Sol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200 hover:border-blue-200 transition-colors"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-[#0a1f44]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-3xl text-[#0a1f44] mb-1">
                    {stat.value}
                  </div>
                  <div className="font-bold text-[#E31E24] uppercase tracking-wider text-sm mb-1">
                    {stat.label}
                  </div>
                  <div className="text-slate-500 text-xs font-medium">
                    {stat.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Testimonial - Rotating */}
          <div className="bg-[#0a1f44] rounded-2xl p-8 md:p-10 text-white relative overflow-hidden min-h-[280px] flex flex-col justify-center">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-white/10" />

            {/* Background decoration */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

            <div
              className={`relative z-10 transition-opacity duration-500 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"}`}
            >
              <p className="text-xl md:text-2xl italic leading-relaxed mb-8 text-blue-50">
                "{activeTestimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 ${activeTestimonial.color} rounded-full flex items-center justify-center font-bold text-white shadow-lg`}
                >
                  {activeTestimonial.initial}
                </div>
                <div>
                  <div className="font-bold text-white text-lg">
                    {activeTestimonial.author}
                  </div>
                  <div className="text-blue-200 text-sm font-medium">
                    {activeTestimonial.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-6 right-8 flex gap-2">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentTestimonial ? "w-6 bg-white" : "w-1.5 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
