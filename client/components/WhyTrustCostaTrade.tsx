import { Star, User, MapPin, Globe } from "lucide-react";

export function WhyTrustCostaTrade() {
  const trustPillars = [
    {
      icon: Star,
      heading: "Real customer reviews",
      text: "See honest feedback from homeowners across the Costa del Sol.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: User,
      heading: "Transparent profiles",
      text: "View experience, photos, areas covered and languages spoken before choosing.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: MapPin,
      heading: "Local professionals",
      text: "Find tradespeople who understand the region and deliver reliable workmanship.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Globe,
      heading: "Multilingual Experts",
      text: "Many professionals offer communication in English, Spanish, German, and Scandinavian.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-50">
      {/* Premium Soft Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-tr from-cyan-100/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a1f44] mb-6 tracking-tight">
            Why homeowners trust CostaTrade
          </h2>
        </div>

        {/* Four Trust Pillars Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {trustPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group animate-slide-up bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Container */}
                <div
                  className={`w-20 h-20 ${pillar.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <Icon
                    className={`w-10 h-10 ${pillar.color}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Heading */}
                <h3 className="text-xl md:text-2xl font-semibold text-[#0a1f44] mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {pillar.heading}
                </h3>

                {/* Text */}
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
