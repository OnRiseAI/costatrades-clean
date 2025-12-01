"use client";

import { Droplets, Zap, Wind, Wrench } from "lucide-react";
import Link from "next/link";

export function MostBookedCarousel() {
  const bookedServices = [
    {
      category: "Pool Services",
      tag: "Popular this month",
      subtext: "Frequently booked in Marbella and Mijas",
      imageUrl:
        "https://images.pexels.com/photos/6684752/pexels-photo-6684752.jpeg?auhref=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      cta: "View professionals",
      slug: "pool-maintenance",
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      category: "Electrician",
      tag: "High demand",
      subtext: "Trusted help for repairs and installations",
      imageUrl:
        "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?auhref=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      cta: "View professionals",
      slug: "electricians",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      category: "Air Con",
      tag: "Trending",
      subtext: "Seasonal demand across the Costa del Sol",
      imageUrl:
        "https://images.pexels.com/photos/6639226/pexels-photo-6639226.jpeg?auhref=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      cta: "View professionals",
      slug: "air-conditioning",
      icon: Wind,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      category: "Plumber",
      tag: "Popular",
      subtext: "Reliable help for leaks and blockages",
      imageUrl:
        "https://images.pexels.com/photos/8486928/pexels-photo-8486928.jpeg?auhref=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      cta: "View professionals",
      slug: "plumbers",
      icon: Wrench,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white via-blue-50/5 to-white">
      {/* Subtle Background Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-blue-100/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-cyan-100/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Most Booked This Month
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            Your most requested trades across the Costa del Sol
          </p>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden pb-4">
          <div className="flex gap-4 md:gap-6 snap-x snap-mandatory overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-0">
            {bookedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  href={`/trades/${service.slug}`}
                  className="flex-shrink-0 snap-start group"
                >
                  <div
                    className="relative w-56 h-36 md:w-60 md:h-40 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-white/60 hover:border-white/80"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image Background */}
                    <img
                      src={service.imageUrl}
                      alt={service.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-7 h-7 ${service.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon
                            className={`w-4 h-4 ${service.color}`}
                            strokeWidth={2}
                          />
                        </div>
                        <span className="text-xs font-semibold text-white uppercase tracking-wide drop-shadow">
                          {service.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white drop-shadow-lg mb-0.5">
                        {service.category}
                      </h3>
                      <p className="text-xs text-white/85 drop-shadow leading-tight mb-2 line-clamp-2">
                        {service.subtext}
                      </p>
                      <div className="text-xs text-white font-medium underline hover:text-white/90 transition-colors drop-shadow">
                        {service.cta}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
