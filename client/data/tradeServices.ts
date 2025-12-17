export interface TradeService {
  id: string;
  label: string;
  description?: string;
  subServices?: TradeService[];
}

export interface TradeServices {
  [key: string]: {
    title: string;
    services: TradeService[];
  };
}

export const tradeServices: TradeServices = {
  plumbers: {
    title: "What do you need a plumber to help with?",
    services: [
      {
        id: "boilers",
        label: "Boilers, heating & radiators",
        description: "e.g. installation, repairs, maintenance",
        subServices: [
          {
            id: "boiler",
            label: "Boilers",
          },
          {
            id: "radiators",
            label: "Radiators",
          },
          {
            id: "gas-central-heating",
            label: "Gas central heating",
          },
          {
            id: "unvented-cylinders",
            label: "Unvented hot water cylinders",
          },
          {
            id: "underfloor-heating",
            label: "Underfloor heating",
          },
          {
            id: "thermal-dynamics",
            label: "Thermal dynamics",
          },
        ],
      },
      {
        id: "bathroom",
        label: "Bathroom appliances & fixtures",
        description: "e.g. showers, baths, sinks, toilets",
        subServices: [
          {
            id: "bathroom-leak",
            label: "I have a leak",
          },
          {
            id: "bathroom-replaced",
            label: "I need an item replaced",
          },
          {
            id: "bathroom-repair",
            label: "I need an item repaired",
          },
          {
            id: "bathroom-install",
            label: "I need an item installed",
          },
          {
            id: "bathroom-sealant",
            label: "I need sealant replaced",
          },
          {
            id: "bathroom-fitted",
            label: "I need my whole bathroom fitted",
          },
        ],
      },
      {
        id: "kitchen",
        label: "Kitchen appliances & fixtures",
        description: "e.g. cookers, dishwashers, washing machines",
        subServices: [
          {
            id: "kitchen-leak",
            label: "I have a leak",
          },
          {
            id: "kitchen-install",
            label: "I need an item installed",
          },
          {
            id: "kitchen-replace",
            label: "I need an item replaced",
          },
          {
            id: "kitchen-repair",
            label: "I need an appliance repaired",
          },
          {
            id: "kitchen-fitted",
            label: "I need my entire kitchen fitted",
          },
        ],
      },
      {
        id: "leaks",
        label: "Leaks, pipework & water pumps",
        description: "e.g. burst pipes, water pressure",
        subServices: [
          {
            id: "leak",
            label: "A leak",
          },
          {
            id: "pipes",
            label: "Pipes",
          },
          {
            id: "drainage",
            label: "Drainage investigation",
          },
          {
            id: "water-pumps",
            label: "Water pumps",
          },
        ],
      },
      {
        id: "emergency",
        label: "An emergency",
        description: "e.g. urgent repairs needed",
        subServices: [
          {
            id: "emergency-boiler",
            label: "Boiler/Central heating",
            description: "e.g. boiler fault, central heating not working",
          },
          {
            id: "emergency-plumbing",
            label: "Plumbing",
            description: "e.g. emergency leaks, water issues",
          },
        ],
      },
      {
        id: "blockages",
        label: "Blockages & power flushing",
        description: "e.g. drains, toilets",
        subServices: [
          {
            id: "blocked-toilets",
            label: "Blocked toilets",
          },
          {
            id: "drain-sewer",
            label: "Drain or sewer clearance",
          },
          {
            id: "power-flushing",
            label: "Power flushing",
          },
          {
            id: "blocked-sinks",
            label: "Blocked sinks",
          },
          {
            id: "blocked-drains",
            label: "Blocked drains",
          },
          {
            id: "blocked-baths",
            label: "Blocked baths",
          },
        ],
      },
      {
        id: "taps",
        label: "Outside taps",
        description: "e.g. garden taps, hose connections",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
  electricians: {
    title: "What do you need an electrician to help with?",
    services: [
      {
        id: "wiring",
        label: "General wiring & installation",
        description: "e.g. new circuits, outlets, fixtures",
      },
      {
        id: "lighting",
        label: "Lighting installation & repair",
        description: "e.g. lights, switches, dimmers",
      },
      {
        id: "testing",
        label: "Testing & inspection",
        description: "e.g. safety checks, EICR",
      },
      {
        id: "repair",
        label: "Repair & fault finding",
        description: "e.g. circuit issues, appliance repairs",
      },
      {
        id: "ev",
        label: "EV charging point installation",
        description: "e.g. electric car chargers",
      },
      {
        id: "solar",
        label: "Solar panels & renewable energy",
        description: "e.g. installation, maintenance",
      },
      {
        id: "emergency",
        label: "An emergency",
        description: "e.g. power outages, electrical hazards",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
  builders: {
    title: "What do you need a builder to help with?",
    services: [
      {
        id: "extensions",
        label: "Extensions & loft conversions",
        description: "e.g. house extensions, attic conversions",
      },
      {
        id: "renovation",
        label: "Full renovation & refurbishment",
        description: "e.g. property makeovers",
      },
      {
        id: "roofing",
        label: "Roofing & structural work",
        description: "e.g. roof repairs, structural changes",
      },
      {
        id: "brickwork",
        label: "Brickwork & pointing",
        description: "e.g. wall repairs, chimney work",
      },
      {
        id: "patio",
        label: "Patios, driveways & landscaping",
        description: "e.g. outdoor spaces, garden features",
      },
      {
        id: "general",
        label: "General building work",
        description: "e.g. repairs, alterations",
      },
      {
        id: "foundations",
        label: "Foundations & basements",
        description: "e.g. underpinning, cellar work",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
  "air-conditioning": {
    title: "What do you need with your air conditioning?",
    services: [
      {
        id: "installation",
        label: "Installation",
        description: "e.g. new air con systems",
      },
      {
        id: "maintenance",
        label: "Maintenance & servicing",
        description: "e.g. regular checks, cleaning",
      },
      {
        id: "repair",
        label: "Repair & troubleshooting",
        description: "e.g. not cooling, leaks",
      },
      {
        id: "upgrade",
        label: "Upgrade & replacement",
        description: "e.g. newer model",
      },
      {
        id: "gas",
        label: "Gas recharge",
        description: "e.g. refrigerant refill",
      },
      {
        id: "cleaning",
        label: "Cleaning & filter replacement",
        description: "e.g. filter changes, coil cleaning",
      },
      {
        id: "energy",
        label: "Energy efficiency optimization",
        description: "e.g. cost reduction",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
  painters: {
    title: "What painting work do you need?",
    services: [
      {
        id: "interior",
        label: "Interior painting",
        description: "e.g. walls, ceilings, rooms",
      },
      {
        id: "exterior",
        label: "Exterior painting",
        description: "e.g. house exterior, doors, trim",
      },
      {
        id: "decorating",
        label: "Decorating & wallpapering",
        description: "e.g. wallpaper, feature walls",
      },
      {
        id: "furniture",
        label: "Furniture & cabinet painting",
        description: "e.g. cupboards, tables",
      },
      {
        id: "varnishing",
        label: "Varnishing & staining",
        description: "e.g. wood finishes",
      },
      {
        id: "sandblasting",
        label: "Preparation & surface work",
        description: "e.g. sanding, priming",
      },
      {
        id: "specialty",
        label: "Specialty finishes",
        description: "e.g. faux painting, effects",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
  gardeners: {
    title: "What gardening services do you need?",
    services: [
      {
        id: "maintenance",
        label: "Garden maintenance",
        description: "e.g. mowing, weeding, pruning",
      },
      {
        id: "landscaping",
        label: "Landscaping & design",
        description: "e.g. new garden design, planting",
      },
      {
        id: "trees",
        label: "Tree surgery",
        description: "e.g. felling, stump removal",
      },
      {
        id: "fencing",
        label: "Fencing & decking",
        description: "e.g. installation, repairs",
      },
      {
        id: "patio",
        label: "Patio & driveway cleaning",
        description: "e.g. jet washing",
      },
      {
        id: "irrigation",
        label: "Irrigation systems",
        description: "e.g. sprinklers, drip systems",
      },
      {
        id: "waste",
        label: "Garden waste removal",
        description: "e.g. clearance",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
  "pool-maintenance": {
    title: "What pool services do you need?",
    services: [
      {
        id: "cleaning",
        label: "Pool cleaning & maintenance",
        description: "e.g. weekly/monthly service",
      },
      {
        id: "repairs",
        label: "Pool repairs & leak detection",
        description: "e.g. damaged liners, leaks",
      },
      {
        id: "equipment",
        label: "Equipment repair & replacement",
        description: "e.g. pumps, filters, heaters",
      },
      {
        id: "chemical",
        label: "Chemical balancing & testing",
        description: "e.g. pH, chlorine levels",
      },
      {
        id: "renovation",
        label: "Pool renovation & resurfacing",
        description: "e.g. replastering, new tiles",
      },
      {
        id: "opening",
        label: "Opening & closing services",
        description: "e.g. seasonal preparation",
      },
      {
        id: "spa",
        label: "Spa & hot tub services",
        description: "e.g. cleaning, maintenance",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
  locksmiths: {
    title: "What locksmith services do you need?",
    services: [
      {
        id: "locks",
        label: "Lock installation & replacement",
        description: "e.g. door locks, windows",
      },
      {
        id: "emergency",
        label: "Emergency lockout",
        description: "e.g. locked out, lost keys",
      },
      {
        id: "repair",
        label: "Lock repair & maintenance",
        description: "e.g. jammed, broken locks",
      },
      {
        id: "security",
        label: "Security upgrades",
        description: "e.g. anti-snap, high-security locks",
      },
      {
        id: "keys",
        label: "Key cutting & rekeying",
        description: "e.g. duplicate keys, master keys",
      },
      {
        id: "safes",
        label: "Safe & vault services",
        description: "e.g. installation, opening",
      },
      {
        id: "gates",
        label: "Gate & barrier locks",
        description: "e.g. security gates, bollards",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
  cleaning: {
    title: "What cleaning services do you need?",
    services: [
      {
        id: "regular",
        label: "Regular domestic cleaning",
        description: "e.g. weekly, fortnightly, monthly",
      },
      {
        id: "deep",
        label: "Deep cleaning",
        description: "e.g. thorough house clean",
      },
      {
        id: "oven",
        label: "Oven & appliance cleaning",
        description: "e.g. kitchen deep clean",
      },
      {
        id: "carpet",
        label: "Carpet & upholstery cleaning",
        description: "e.g. sofas, rugs, curtains",
      },
      {
        id: "windows",
        label: "Window & gutter cleaning",
        description: "e.g. exterior windows, gutters",
      },
      {
        id: "end",
        label: "End of tenancy cleaning",
        description: "e.g. move-out clean",
      },
      {
        id: "commercial",
        label: "Commercial cleaning",
        description: "e.g. offices, shops",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
  handyman: {
    title: "What handyman services do you need?",
    services: [
      {
        id: "assembly",
        label: "Furniture assembly & installation",
        description: "e.g. IKEA, shelving, mounting",
      },
      {
        id: "repairs",
        label: "General repairs & fixes",
        description: "e.g. doors, frames, seals",
      },
      {
        id: "hanging",
        label: "Hanging & mounting",
        description: "e.g. TVs, mirrors, pictures",
      },
      {
        id: "caulking",
        label: "Caulking & sealant work",
        description: "e.g. gaps, joints, waterproofing",
      },
      {
        id: "drywall",
        label: "Drywall & plastering",
        description: "e.g. patches, finishing",
      },
      {
        id: "small-plumbing",
        label: "Small plumbing tasks",
        description: "e.g. tap washers, toilet fixes",
      },
      {
        id: "small-electrical",
        label: "Small electrical tasks",
        description: "e.g. light bulbs, outlet covers",
      },
      {
        id: "other",
        label: "Other/I'm not sure",
        description: "",
      },
    ],
  },
};

export function getTradeServices(slug: string) {
  return tradeServices[slug] || null;
}
