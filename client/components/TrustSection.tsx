import { CheckCircle2, Shield, Star } from "lucide-react";

export function TrustSection() {
  const trustFeatures = [
    {
      icon: Shield,
      title: "Guarantee",
      description:
        "We guarantee Costa del Sol professionals' work, claim up to €1000",
      link: "T&Cs apply",
    },
    {
      icon: Star,
      title: "Reviewed",
      description: "Over 50,000 reviews have been published on our platform",
      link: null,
    },
    {
      icon: CheckCircle2,
      title: "Checked",
      description: "Every specialist has passed up to 12 checks",
      link: "Find out more",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-border p-6 md:p-8">
      <div className="space-y-8">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
                {feature.link && (
                  <a href="#" className="text-primary hover:underline ml-1">
                    {feature.link}
                  </a>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
