import { CheckCircle } from "lucide-react";

export function TrustBadges() {
  const topPillars = [
    {
      title: "Verified",
      description:
        "Every specialist undergoes ID checks, insurance validation, and business verification",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Reviewed",
      description:
        "Over 2,400 verified reviews from real customers across Costa del Sol",
      icon: CheckCircle,
      color: "text-blue-600",
    },
    {
      title: "Local Experts",
      description:
        "Connect with professionals who know Costa del Sol inside out",
      icon: CheckCircle,
      color: "text-orange-600",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-trust/5 to-white py-20 md:py-28 border-y border-border/50 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/40 via-blue-50/40 to-green-50/40"></div>
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-trust/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at center, currentColor 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose CostaTrade?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Costa del Sol's most trusted platform for finding reliable
              professionals
            </p>
          </div>

          {/* Top Row - Headline Pillars */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
            {topPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const content = (
                <>
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-trust/20 to-trust/5 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:from-trust/30 transition-all duration-300">
                    <Icon className="w-12 h-12 text-trust" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-trust transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {pillar.description}
                  </p>
                </>
              );

              const isVerifiedPillar = pillar.title === "Verified";

              return (
                <div
                  key={index}
                  className="text-center group hover:scale-105 transition-transform duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {isVerifiedPillar ? (
                    <a
                      href="https://costatrades.com/verification-promise"
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-trust/60 rounded-2xl"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
