"use client";

import { Zap, Wrench, Wind, Hammer, PaintBucket, Droplets } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PopularServices() {
  const services = [
    {
      icon: Zap,
      heading: "Electrician",
      text: "Lighting, wiring and electrical repairs",
      slug: "electricians",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      imageUrl:
        "https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      icon: Wrench,
      heading: "Plumber",
      text: "Leaks, blockages and installations",
      slug: "plumbers",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      imageUrl:
        "https://images.pexels.com/photos/8486928/pexels-photo-8486928.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      icon: Wind,
      heading: "Air Con",
      text: "Install, service or repair your AC",
      slug: "air-conditioning",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      imageUrl:
        "https://images.pexels.com/photos/6639226/pexels-photo-6639226.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      icon: Hammer,
      heading: "Builder and Renovation",
      text: "Home improvements and structural work",
      slug: "builders",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      imageUrl:
        "https://images.pexels.com/photos/3964048/pexels-photo-3964048.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      icon: PaintBucket,
      heading: "Painter and Decorator",
      text: "Refresh or transform your home interior",
      slug: "painters",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      imageUrl:
        "https://images.pexels.com/photos/7217966/pexels-photo-7217966.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
    {
      icon: Droplets,
      heading: "Pool Services",
      text: "Cleaning, repair and seasonal care",
      slug: "pool-maintenance",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      imageUrl:
        "https://images.pexels.com/photos/6684752/pexels-photo-6684752.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/10 to-white">
      {/* Subtle Background Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-cyan-100/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Popular Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light">
            Your most requested trades across the Costa del Sol
          </p>
        </div>

        {/* Services Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={`/trades/${service.slug}`}
                className="group"
              >
                <div
                  className="h-full flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/80 group-hover:border-primary/20 overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                    <img
                      src={service.imageUrl}
                      alt={service.heading}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-grow p-6 md:p-8 items-center text-center">
                    {/* Icon Container */}
                    <div
                      className={`w-14 h-14 ${service.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon
                        className={`w-7 h-7 ${service.color}`}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Heading */}
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.heading}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                      {service.text}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
