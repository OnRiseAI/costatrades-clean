"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTACards() {
  const { t } = useLanguage();

  const cards = [
    {
      title: "Leave a review",
      description:
        "Have you completed a project recently? Let your specialist know how they did.",
      buttonText: "Leave a review",
      buttonLink: "/review-trade",
      imageUrl:
        "/images/cta-1.webp",
    },
    {
      title: "Professional Application",
      description:
        "Join our network for free. We're here to help you find more work and grow your business.",
      buttonText: "Add your business for free",
      buttonLink: "/join-as-tradesperson",
      imageUrl:
        "/images/cta-2.webp",
    },
    {
      title: "Request a quote",
      description:
        "Tell us what you're looking for and we'll pass your request on to three approved specialists.",
      buttonText: "Request a quote",
      buttonLink: "/post-job",
      imageUrl:
        "/images/cta-3.webp",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image Container */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow p-8">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-base mb-6 flex-grow leading-relaxed">
                  {card.description}
                </p>

                {/* Button */}
                <Link href={card.buttonLink} className="w-full">
                  <Button className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white text-base font-semibold py-3 rounded-full">
                    {card.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
