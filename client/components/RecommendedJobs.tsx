"use client";

import Link from "next/link";
import { X, Zap, Wrench, Home, Leaf, Droplets, Wind, Star } from "lucide-react";

interface Job {
  tag: string;
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
  rating?: number;
  reviews?: number;
}

const recommendedJobs: Job[] = [
  {
    tag: "Seasonal",
    title: "Smart Thermostats",
    description:
      "Ensure optimal warmth this winter with smart thermostat control",
    slug: "smart-thermostats",
    icon: <Zap className="h-5 w-5" />,
    rating: 4.8,
    reviews: 342,
  },
  {
    tag: "Seasonal",
    title: "Roofing Repairs",
    description: "Before the winter freezes, ensure your roof is leak-free",
    slug: "roofing-repairs",
    icon: <Home className="h-5 w-5" />,
    rating: 4.9,
    reviews: 287,
  },
  {
    tag: "Seasonal",
    title: "Chimney Sweep",
    description: "Ensure holiday warmth with a clean chimney sweep",
    slug: "chimney-sweep",
    icon: <Wind className="h-5 w-5" />,
    rating: 4.7,
    reviews: 156,
  },
  {
    tag: "Seasonal",
    title: "Gas Central Heating Servicing",
    description: "Secure compliance for winter nears",
    slug: "gas-heating-service",
    icon: <Zap className="h-5 w-5" />,
    rating: 4.9,
    reviews: 218,
  },
  {
    tag: "Popular",
    title: "Pool Winterization",
    description: "Protect your pool for the season ahead",
    slug: "pool-winterization",
    icon: <Droplets className="h-5 w-5" />,
    rating: 4.6,
    reviews: 124,
  },
  {
    tag: "Trending",
    title: "Solar Panel Installation",
    description: "Reduce energy costs with renewable solar",
    slug: "solar-panels",
    icon: <Zap className="h-5 w-5" />,
    rating: 4.8,
    reviews: 312,
  },
  {
    tag: "Popular",
    title: "Kitchen Renovation",
    description: "Transform your kitchen with modern upgrades",
    slug: "kitchen-renovation",
    icon: <Wrench className="h-5 w-5" />,
    rating: 4.7,
    reviews: 289,
  },
  {
    tag: "Trending",
    title: "Bathroom Remodel",
    description: "Create your dream bathroom retreat",
    slug: "bathroom-remodel",
    icon: <Wrench className="h-5 w-5" />,
    rating: 4.8,
    reviews: 205,
  },
];

export function RecommendedJobs() {
  const tagColors: Record<string, { bg: string; text: string }> = {
    Seasonal: { bg: "bg-blue-100", text: "text-blue-700" },
    Popular: { bg: "bg-amber-100", text: "text-amber-700" },
    Trending: { bg: "bg-green-100", text: "text-green-700" },
  };

  return (
    <div className="bg-gray-50 py-16 md:py-20 relative overflow-hidden">
      {/* Background Enhancement */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 via-gray-50 to-white"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10">
        <div className="container-custom flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Recommended jobs
            </h2>
            <p className="text-muted-foreground">
              Find verified professionals for popular services
            </p>
          </div>
          <button className="hidden md:block text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 lg:-mx-8"
          dir="rtl"
        >
          <div
            className="flex gap-4 pb-4 px-4 sm:px-6 lg:px-8 min-w-min"
            dir="ltr"
          >
            {recommendedJobs.map((job, index) => {
              const colors =
                tagColors[job.tag as keyof typeof tagColors] ||
                tagColors.Popular;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 relative flex-shrink-0 w-64 group overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300 z-0"></div>

                  <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10">
                    <X className="h-5 w-5" />
                  </button>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className={`inline-block ${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}
                      >
                        {job.tag}
                      </span>
                      <div className="bg-primary/10 text-primary p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        {job.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 pr-6 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Rating and Reviews */}
                    {job.rating && job.reviews && (
                      <div className="flex items-center gap-2 mb-4 pb-4 border-t border-gray-200">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < Math.floor(job.rating!)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">
                          {job.rating} ({job.reviews})
                        </span>
                      </div>
                    )}

                    <Link
                      href={`/post-job?service=${job.slug}`}
                      className="inline-block w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 text-center group-hover:shadow-md group-hover:scale-105"
                    >
                      Find a Specialist
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
