import {
  Droplets,
  Wind,
  Wrench,
  Zap,
  Hammer,
  PaintBucket,
  Key,
  Leaf,
} from "lucide-react";

("use client");

import Link from "next/link";

export function RandomCategoriesCarousel() {
  const randomCategories = [
    {
      name: "Air Con",
      slug: "air-conditioning",
      icon: Wind,
      count: 4,
      imageUrl:
        "https://images.pexels.com/photos/32497161/pexels-photo-32497161.jpeg?auhref=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Electricians",
      slug: "electricians",
      icon: Zap,
      count: 4,
      imageUrl:
        "https://images.pexels.com/photos/442160/pexels-photo-442160.jpeg?auhref=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Locksmiths",
      slug: "locksmiths",
      icon: Key,
      count: 3,
      imageUrl:
        "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auhref=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Gardeners & Landscaping",
      slug: "gardeners",
      icon: Leaf,
      count: 4,
      imageUrl:
        "https://images.pexels.com/photos/26827231/pexels-photo-26827231.jpeg?auhref=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Builders & Renovations",
      slug: "builders",
      icon: Hammer,
      count: 4,
      imageUrl:
        "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auhref=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Plumbers",
      slug: "plumbers",
      icon: Wrench,
      count: 4,
      imageUrl:
        "https://images.pexels.com/photos/8486928/pexels-photo-8486928.jpeg?auhref=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Pool Services",
      slug: "pool-maintenance",
      icon: Droplets,
      count: 4,
      imageUrl:
        "https://images.pexels.com/photos/6684752/pexels-photo-6684752.jpeg?auhref=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Painters",
      slug: "painters",
      icon: PaintBucket,
      count: 3,
      imageUrl:
        "https://images.pexels.com/photos/7217966/pexels-photo-7217966.jpeg?auhref=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-white">
      <div className="container-custom relative z-10">
        {/* Carousel Container with right-to-left scroll direction */}
        <div className="overflow-hidden pb-4">
          <div
            className="flex gap-6 md:gap-8 snap-x snap-mandatory overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-0"
            dir="rtl"
          >
            {randomCategories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/trades/${category.slug}`}
                className="flex-shrink-0 snap-start group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-48 h-56 md:w-56 md:h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Image Background */}
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/90 drop-shadow-lg">
                      {category.count} professionals
                    </p>
                  </div>
                </div>
              </Link>
            ))}
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
