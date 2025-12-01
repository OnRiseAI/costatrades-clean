export interface Tradesperson {
  slug: string;
  businessName: string;
  tradeCategory: string;
  tradeCategorySlug: string;
  location: string;
  rating: number;
  reviewCount: number;
  profilePhoto?: string;
  verified: boolean;
  jobsCompleted: number;
  yearsInBusiness: number;
  services?: string[];
  phone?: string;
}

export const demoTradespeople: Tradesperson[] = [
  // Pool Maintenance & Repair
  {
    slug: "miguel-pool-services",
    businessName: "Miguel Pool Services",
    tradeCategory: "Pool Maintenance & Repair",
    tradeCategorySlug: "pool-maintenance",
    location: "Marbella",
    rating: 4.9,
    reviewCount: 87,
    profilePhoto:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    verified: true,
    jobsCompleted: 156,
    yearsInBusiness: 8,
    services: [
      "Pool Maintenance",
      "Pool Cleaning",
      "Chemical Balancing",
      "Equipment Repair",
    ],
    phone: "+34-952-123-456",
  },
  {
    slug: "aqua-masters-costa",
    businessName: "Aqua Masters Costa",
    tradeCategory: "Pool Maintenance & Repair",
    tradeCategorySlug: "pool-maintenance",
    location: "Estepona",
    rating: 4.8,
    reviewCount: 64,
    profilePhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    verified: true,
    jobsCompleted: 142,
    yearsInBusiness: 6,
  },
  {
    slug: "blue-wave-pools",
    businessName: "Blue Wave Pools",
    tradeCategory: "Pool Maintenance & Repair",
    tradeCategorySlug: "pool-maintenance",
    location: "Mijas",
    rating: 5.0,
    reviewCount: 52,
    verified: true,
    jobsCompleted: 98,
    yearsInBusiness: 12,
  },
  {
    slug: "precision-pool-care",
    businessName: "Precision Pool Care",
    tradeCategory: "Pool Maintenance & Repair",
    tradeCategorySlug: "pool-maintenance",
    location: "Fuengirola",
    rating: 4.7,
    reviewCount: 43,
    verified: true,
    jobsCompleted: 87,
    yearsInBusiness: 5,
  },

  // Air Conditioning
  {
    slug: "cool-air-solutions",
    businessName: "Cool Air Solutions",
    tradeCategory: "Air Conditioning",
    tradeCategorySlug: "air-conditioning",
    location: "Malaga",
    rating: 4.8,
    reviewCount: 76,
    verified: true,
    jobsCompleted: 134,
    yearsInBusiness: 7,
  },
  {
    slug: "climate-control-experts",
    businessName: "Climate Control Experts",
    tradeCategory: "Air Conditioning",
    tradeCategorySlug: "air-conditioning",
    location: "Marbella",
    rating: 4.9,
    reviewCount: 91,
    profilePhoto:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    verified: true,
    jobsCompleted: 167,
    yearsInBusiness: 10,
  },
  {
    slug: "fresh-air-systems",
    businessName: "Fresh Air Systems",
    tradeCategory: "Air Conditioning",
    tradeCategorySlug: "air-conditioning",
    location: "Torremolinos",
    rating: 4.7,
    reviewCount: 58,
    verified: true,
    jobsCompleted: 103,
    yearsInBusiness: 5,
  },
  {
    slug: "costa-cool-ac",
    businessName: "Costa Cool AC",
    tradeCategory: "Air Conditioning",
    tradeCategorySlug: "air-conditioning",
    location: "Benalmadena",
    rating: 4.6,
    reviewCount: 47,
    verified: true,
    jobsCompleted: 89,
    yearsInBusiness: 4,
  },

  // Plumbers
  {
    slug: "rapid-response-plumbing",
    businessName: "Rapid Response Plumbing",
    tradeCategory: "Plumbers",
    tradeCategorySlug: "plumbers",
    location: "Malaga",
    rating: 4.9,
    reviewCount: 102,
    profilePhoto:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    verified: true,
    jobsCompleted: 189,
    yearsInBusiness: 11,
    services: [
      "Plumbers",
      "Emergency Plumbing",
      "Bathroom Installation",
      "Boiler Repair",
    ],
    phone: "+34-952-234-567",
  },
  {
    slug: "costa-plumbing-pros",
    businessName: "Costa Plumbing Pros",
    tradeCategory: "Plumbers",
    tradeCategorySlug: "plumbers",
    location: "Marbella",
    rating: 4.8,
    reviewCount: 83,
    verified: true,
    jobsCompleted: 156,
    yearsInBusiness: 9,
    services: [
      "Plumbers",
      "Pipe Installation",
      "Water Heater Repair",
      "Drain Cleaning",
    ],
    phone: "+34-952-567-890",
  },
  {
    slug: "aquafix-plumbers",
    businessName: "AquaFix Plumbers",
    tradeCategory: "Plumbers",
    tradeCategorySlug: "plumbers",
    location: "Fuengirola",
    rating: 4.7,
    reviewCount: 71,
    verified: true,
    jobsCompleted: 134,
    yearsInBusiness: 7,
    services: [
      "Plumbers",
      "Kitchen Plumbing",
      "Bathroom Renovation",
      "Emergency Services",
    ],
    phone: "+34-952-678-901",
  },
  {
    slug: "express-plumbing-services",
    businessName: "Express Plumbing Services",
    tradeCategory: "Plumbers",
    tradeCategorySlug: "plumbers",
    location: "Estepona",
    rating: 4.9,
    reviewCount: 95,
    verified: true,
    jobsCompleted: 178,
    yearsInBusiness: 10,
    services: [
      "Plumbers",
      "24/7 Emergency",
      "Gas Fitting",
      "Commercial Plumbing",
    ],
    phone: "+34-952-789-012",
  },

  // Electricians
  {
    slug: "german-precision-electric",
    businessName: "German Precision Electric",
    tradeCategory: "Electricians",
    tradeCategorySlug: "electricians",
    location: "Fuengirola",
    rating: 5.0,
    reviewCount: 52,
    verified: true,
    jobsCompleted: 98,
    yearsInBusiness: 12,
    services: [
      "Electricians",
      "Solar Panel Installation",
      "Smart Home Systems",
      "Electrical Inspections",
    ],
    phone: "+34-952-890-123",
  },
  {
    slug: "bright-spark-electrical",
    businessName: "Bright Spark Electrical",
    tradeCategory: "Electricians",
    tradeCategorySlug: "electricians",
    location: "Marbella",
    rating: 4.9,
    reviewCount: 88,
    profilePhoto:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    verified: true,
    jobsCompleted: 145,
    yearsInBusiness: 8,
    services: [
      "Rewiring",
      "Fuse Box Upgrades",
      "Lighting Installation",
      "Emergency Repairs",
    ],
    phone: "+34-952-345-678",
  },
  {
    slug: "power-solutions-costa",
    businessName: "Power Solutions Costa",
    tradeCategory: "Electricians",
    tradeCategorySlug: "electricians",
    location: "Malaga",
    rating: 4.8,
    reviewCount: 76,
    verified: true,
    jobsCompleted: 128,
    yearsInBusiness: 6,
  },
  {
    slug: "safe-electrical-services",
    businessName: "Safe Electrical Services",
    tradeCategory: "Electricians",
    tradeCategorySlug: "electricians",
    location: "Nerja",
    rating: 4.7,
    reviewCount: 61,
    verified: true,
    jobsCompleted: 112,
    yearsInBusiness: 9,
  },

  // Builders & Renovations
  {
    slug: "costa-construction-group",
    businessName: "Costa Construction Group",
    tradeCategory: "Builders & Renovations",
    tradeCategorySlug: "builders",
    location: "Marbella",
    rating: 4.9,
    reviewCount: 67,
    verified: true,
    jobsCompleted: 84,
    yearsInBusiness: 15,
  },
  {
    slug: "mediterranean-builders",
    businessName: "Mediterranean Builders",
    tradeCategory: "Builders & Renovations",
    tradeCategorySlug: "builders",
    location: "Estepona",
    rating: 4.8,
    reviewCount: 54,
    verified: true,
    jobsCompleted: 71,
    yearsInBusiness: 12,
  },
  {
    slug: "renovation-masters",
    businessName: "Renovation Masters",
    tradeCategory: "Builders & Renovations",
    tradeCategorySlug: "builders",
    location: "Malaga",
    rating: 4.7,
    reviewCount: 48,
    verified: true,
    jobsCompleted: 63,
    yearsInBusiness: 10,
  },
  {
    slug: "quality-build-services",
    businessName: "Quality Build Services",
    tradeCategory: "Builders & Renovations",
    tradeCategorySlug: "builders",
    location: "Mijas",
    rating: 4.9,
    reviewCount: 59,
    verified: true,
    jobsCompleted: 76,
    yearsInBusiness: 13,
  },

  // Painters & Decorators
  {
    slug: "brush-masters-painting",
    businessName: "Brush Masters Painting",
    tradeCategory: "Painters & Decorators",
    tradeCategorySlug: "painters",
    location: "Marbella",
    rating: 4.8,
    reviewCount: 72,
    profilePhoto:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    verified: true,
    jobsCompleted: 156,
    yearsInBusiness: 8,
    services: [
      "Interior Painting",
      "Exterior Painting",
      "Wallpapering",
      "Commercial Projects",
    ],
    phone: "+34-952-456-789",
  },
  {
    slug: "color-perfect-decorators",
    businessName: "Color Perfect Decorators",
    tradeCategory: "Painters & Decorators",
    tradeCategorySlug: "painters",
    location: "Fuengirola",
    rating: 4.9,
    reviewCount: 64,
    profilePhoto:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    verified: true,
    jobsCompleted: 134,
    yearsInBusiness: 7,
    services: [
      "Painters & Decorators",
      "Interior Design Consultation",
      "Color Matching",
      "Texture Finishes",
    ],
    phone: "+34-952-901-234",
  },
  {
    slug: "pristine-painting-services",
    businessName: "Pristine Painting Services",
    tradeCategory: "Painters & Decorators",
    tradeCategorySlug: "painters",
    location: "Torremolinos",
    rating: 4.7,
    reviewCount: 53,
    verified: true,
    jobsCompleted: 118,
    yearsInBusiness: 6,
  },

  // Locksmiths
  {
    slug: "24-7-locksmith-services",
    businessName: "24/7 Locksmith Services",
    tradeCategory: "Locksmiths",
    tradeCategorySlug: "locksmiths",
    location: "Malaga",
    rating: 4.9,
    reviewCount: 118,
    verified: true,
    jobsCompleted: 234,
    yearsInBusiness: 9,
  },
  {
    slug: "secure-lock-solutions",
    businessName: "Secure Lock Solutions",
    tradeCategory: "Locksmiths",
    tradeCategorySlug: "locksmiths",
    location: "Marbella",
    rating: 4.8,
    reviewCount: 97,
    verified: true,
    jobsCompleted: 198,
    yearsInBusiness: 7,
  },
  {
    slug: "quick-key-locksmiths",
    businessName: "Quick Key Locksmiths",
    tradeCategory: "Locksmiths",
    tradeCategorySlug: "locksmiths",
    location: "Estepona",
    rating: 4.7,
    reviewCount: 81,
    verified: true,
    jobsCompleted: 176,
    yearsInBusiness: 6,
  },

  // Gardeners & Landscaping
  {
    slug: "green-paradise-gardens",
    businessName: "Green Paradise Gardens",
    tradeCategory: "Gardeners & Landscaping",
    tradeCategorySlug: "gardeners",
    location: "Marbella",
    rating: 4.9,
    reviewCount: 68,
    verified: true,
    jobsCompleted: 142,
    yearsInBusiness: 11,
  },
  {
    slug: "mediterranean-landscapes",
    businessName: "Mediterranean Landscapes",
    tradeCategory: "Gardeners & Landscaping",
    tradeCategorySlug: "gardeners",
    location: "Mijas",
    rating: 4.8,
    reviewCount: 57,
    verified: true,
    jobsCompleted: 124,
    yearsInBusiness: 9,
  },
  {
    slug: "costa-garden-care",
    businessName: "Costa Garden Care",
    tradeCategory: "Gardeners & Landscaping",
    tradeCategorySlug: "gardeners",
    location: "Fuengirola",
    rating: 4.7,
    reviewCount: 49,
    verified: true,
    jobsCompleted: 103,
    yearsInBusiness: 7,
  },
  {
    slug: "expert-lawn-services",
    businessName: "Expert Lawn Services",
    tradeCategory: "Gardeners & Landscaping",
    tradeCategorySlug: "gardeners",
    location: "Benalmadena",
    rating: 4.8,
    reviewCount: 62,
    verified: true,
    jobsCompleted: 117,
    yearsInBusiness: 8,
  },

  // Pest Control
  {
    slug: "pest-free-costa-del-sol",
    businessName: "Pest Free Costa del Sol",
    tradeCategory: "Pest Control",
    tradeCategorySlug: "pest-control",
    location: "Malaga",
    rating: 4.9,
    reviewCount: 92,
    verified: true,
    jobsCompleted: 187,
    yearsInBusiness: 10,
  },
  {
    slug: "eco-pest-solutions",
    businessName: "Eco Pest Solutions",
    tradeCategory: "Pest Control",
    tradeCategorySlug: "pest-control",
    location: "Marbella",
    rating: 4.8,
    reviewCount: 73,
    verified: true,
    jobsCompleted: 156,
    yearsInBusiness: 8,
  },
  {
    slug: "safe-guard-pest-control",
    businessName: "SafeGuard Pest Control",
    tradeCategory: "Pest Control",
    tradeCategorySlug: "pest-control",
    location: "Estepona",
    rating: 4.7,
    reviewCount: 64,
    verified: true,
    jobsCompleted: 138,
    yearsInBusiness: 7,
  },

  // Property Maintenance
  {
    slug: "complete-property-services",
    businessName: "Complete Property Services",
    tradeCategory: "Property Maintenance",
    tradeCategorySlug: "property-maintenance",
    location: "Marbella",
    rating: 4.9,
    reviewCount: 86,
    verified: true,
    jobsCompleted: 203,
    yearsInBusiness: 12,
  },
  {
    slug: "all-in-one-maintenance",
    businessName: "All-in-One Maintenance",
    tradeCategory: "Property Maintenance",
    tradeCategorySlug: "property-maintenance",
    location: "Malaga",
    rating: 4.8,
    reviewCount: 71,
    verified: true,
    jobsCompleted: 178,
    yearsInBusiness: 9,
  },
  {
    slug: "property-care-specialists",
    businessName: "Property Care Specialists",
    tradeCategory: "Property Maintenance",
    tradeCategorySlug: "property-maintenance",
    location: "Fuengirola",
    rating: 4.7,
    reviewCount: 58,
    verified: true,
    jobsCompleted: 145,
    yearsInBusiness: 8,
  },
  {
    slug: "handyman-express",
    businessName: "Handyman Express",
    tradeCategory: "Property Maintenance",
    tradeCategorySlug: "property-maintenance",
    location: "Torremolinos",
    rating: 4.8,
    reviewCount: 79,
    verified: true,
    jobsCompleted: 167,
    yearsInBusiness: 10,
  },
];

export function getTradespeopleByCategory(
  categorySlug: string,
): Tradesperson[] {
  return demoTradespeople.filter((tp) => tp.tradeCategorySlug === categorySlug);
}

export function getTradespeopleByLocation(location: string): Tradesperson[] {
  return demoTradespeople.filter((tp) =>
    tp.location.toLowerCase().includes(location.toLowerCase()),
  );
}

export function searchTradespeople(
  trade?: string,
  location?: string,
): Tradesperson[] {
  let results = [...demoTradespeople];

  if (trade) {
    const tradeLower = trade.toLowerCase();
    results = results.filter(
      (tp) =>
        tp.tradeCategory.toLowerCase().includes(tradeLower) ||
        tp.tradeCategorySlug.toLowerCase().includes(tradeLower) ||
        tp.businessName.toLowerCase().includes(tradeLower),
    );
  }

  if (location) {
    results = results.filter((tp) =>
      tp.location.toLowerCase().includes(location.toLowerCase()),
    );
  }

  return results;
}

export function getFeaturedTradespeople(limit: number = 3): Tradesperson[] {
  // Get highest rated from different categories
  const featured = demoTradespeople
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
  return featured;
}
