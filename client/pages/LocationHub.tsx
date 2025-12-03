"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import {
  Shield,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Phone,
  Wrench,
  Zap,
  Key,
  Hammer,
  Thermometer,
  Droplets,
  Shovel,
  Paintbrush,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { getSupabase } from "@/contexts/AuthContext";

interface LogisticsInfo {
  security_gate_clearance: boolean;
  vehicle_width_limit_meters: number | null;
  parking_risk_level: string;
  low_emission_zone_active: boolean;
}

interface SeasonalityInfo {
  summer_construction_ban: boolean;
  ban_months: string[];
  noise_sensitivity_score: number;
}

interface ContentInjects {
  provider_warning: string;
  customer_reassurance: string;
}

interface TownLogisticsProfile {
  cluster_type: string;
  logistics: LogisticsInfo;
  seasonality: SeasonalityInfo;
  content_injects: ContentInjects;
}

interface SubArea {
  name: string;
  slug: string;
}

interface LocationData {
  REGION_NAME: string;
  region_slug: string;
  CURRENT_DATE: string;
  SUB_AREAS: SubArea[];
  LAT: string;
  LON: string;
  TownLogisticsProfile: TownLogisticsProfile;
}

interface SupabaseLocationProfile {
  slug: string;
  region_name: string;
  sub_areas: string[] | null;
  logistics: any | null;
  content_injects: any | null;
}

const SPECIALIST_CATEGORIES = [
  { name: "Plumbers", slug: "plumber", icon: Droplets },
  { name: "Electricians", slug: "electrician", icon: Zap },
  { name: "Builders", slug: "builder", icon: Hammer },
  { name: "AC Repair", slug: "ac-repair", icon: Thermometer },
  { name: "Bathroom Fitters", slug: "bathroom-fitter", icon: Wrench },
  { name: "Gardeners", slug: "gardener", icon: Shovel },
  { name: "Roofers", slug: "roofer", icon: Hammer },
  { name: "Handymen", slug: "handyman", icon: Wrench },
  { name: "Locksmiths", slug: "locksmith", icon: Key },
  { name: "Renovation Specialists", slug: "renovation", icon: Paintbrush },
];

const LOCATION_CONFIG: LocationData[] = [
  {
    REGION_NAME: "Malaga East & Axarquia",
    region_slug: "malaga-east-axarquia",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [
      { name: "Rincon de la Victoria", slug: "rincon-de-la-victoria" },
      { name: "La Cala del Moral", slug: "la-cala-del-moral" },
      { name: "Torre del Mar", slug: "torre-del-mar" },
      { name: "Nerja", slug: "nerja" },
      { name: "Frigiliana", slug: "frigiliana" },
      { name: "Torrox", slug: "torrox" },
      { name: "Velez Malaga", slug: "velez-malaga" },
    ],
    LAT: "36.7460",
    LON: "-4.2801",
    TownLogisticsProfile: {
      cluster_type: "Mixed_Coastal_Rural",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 2.2,
        parking_risk_level: "High",
        low_emission_zone_active: true,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Some old-town areas like Nerja and Frigiliana have narrow streets with strict width limits and difficult parking.",
        customer_reassurance:
          "CostaTrades recommends early scheduling so specialists can navigate restricted historic zones without delay.",
      },
    },
  },
  {
    REGION_NAME: "Inland Sierra Region",
    region_slug: "inland-sierra-region",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [
      { name: "Alhaurin el Grande", slug: "alhaurin-el-grande" },
      { name: "Coin", slug: "coin" },
      { name: "Mijas Pueblo", slug: "mijas-pueblo" },
      { name: "Ojen", slug: "ojen" },
      { name: "Tolox", slug: "tolox" },
      { name: "Guaro", slug: "guaro" },
      { name: "Alozaina", slug: "alozaina" },
    ],
    LAT: "36.6634",
    LON: "-4.6875",
    TownLogisticsProfile: {
      cluster_type: "Rural_Mountain",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 4,
      },
      content_injects: {
        provider_warning:
          "Some hillside roads in mountain villages are steep, winding, and can affect estimated arrival times.",
        customer_reassurance:
          "CostaTrades specialists plan mountain access routes in advance for smooth and reliable service.",
      },
    },
  },
  {
    REGION_NAME: "Marbella Area",
    region_slug: "marbella-area",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [
      { name: "Puerto Banus", slug: "puerto-banus" },
      { name: "Nueva Andalucia", slug: "nueva-andalucia" },
      { name: "San Pedro", slug: "san-pedro" },
      { name: "Elviria", slug: "elviria" },
      { name: "Las Chapas", slug: "las-chapas" },
      { name: "El Rosario", slug: "el-rosario" },
    ],
    LAT: "36.5099",
    LON: "-4.8858",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 9,
      },
      content_injects: {
        provider_warning:
          "Some gated communities in Marbella require pre-approved access for specialists.",
        customer_reassurance:
          "CostaTrades handles all access permissions on your behalf.",
      },
    },
  },
  {
    REGION_NAME: "Puerto Banus",
    region_slug: "puerto-banus",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.4840",
    LON: "-4.9520",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: 2.1,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 9,
      },
      content_injects: {
        provider_warning:
          "Access near the marina and front-line zones can be restricted during peak seasons.",
        customer_reassurance:
          "CostaTrades specialists plan access windows around high traffic to avoid delays.",
      },
    },
  },
  {
    REGION_NAME: "Nueva Andalucia",
    region_slug: "nueva-andalucia",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5093",
    LON: "-4.9590",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 8,
      },
      content_injects: {
        provider_warning:
          "Some neighbourhoods around the golf valleys have controlled gate access during high season.",
        customer_reassurance:
          "CostaTrades verifies community access requirements ahead of time to avoid delays.",
      },
    },
  },
  {
    REGION_NAME: "San Pedro",
    region_slug: "san-pedro",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.4870",
    LON: "-4.9938",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 7,
      },
      content_injects: {
        provider_warning:
          "Traffic around the boulevard and beach side can slow arrival times during peak hours.",
        customer_reassurance:
          "CostaTrades specialists plan time windows around local congestion patterns.",
      },
    },
  },
  {
    REGION_NAME: "Elviria",
    region_slug: "elviria",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.4990",
    LON: "-4.7913",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Many hillside residential areas require pre-registered access for service vehicles.",
        customer_reassurance:
          "CostaTrades confirms all gate and community requirements before dispatch.",
      },
    },
  },
  {
    REGION_NAME: "Las Chapas",
    region_slug: "las-chapas",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.4971",
    LON: "-4.8128",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Several luxury communities require identification or pre-authorization for specialist entry.",
        customer_reassurance:
          "CostaTrades handles all access permissions so your appointment runs smoothly.",
      },
    },
  },
  {
    REGION_NAME: "La Cala de Mijas",
    region_slug: "la-cala-de-mijas",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5052",
    LON: "-4.6822",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 7,
      },
      content_injects: {
        provider_warning:
          "Beachfront zones and central village streets can be congested during weekends and summers.",
        customer_reassurance:
          "CostaTrades specialists schedule arrival windows to avoid local bottlenecks.",
      },
    },
  },
  {
    REGION_NAME: "Calahonda",
    region_slug: "calahonda",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5039",
    LON: "-4.7086",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Hilly areas in upper Calahonda can extend arrival times, especially for larger vehicles.",
        customer_reassurance:
          "CostaTrades specialists plan hillside access routes in advance for smooth arrivals.",
      },
    },
  },
  {
    REGION_NAME: "Riviera del Sol",
    region_slug: "riviera-del-sol",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5015",
    LON: "-4.6994",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Some residential streets are narrow, which can limit manoeuvring for service vehicles.",
        customer_reassurance:
          "CostaTrades assigns appropriately sized specialists to avoid any access issues.",
      },
    },
  },
  {
    REGION_NAME: "Miraflores",
    region_slug: "miraflores",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5046",
    LON: "-4.6928",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 5,
      },
      content_injects: {
        provider_warning:
          "Gated urbanisations in Miraflores may require visitor entry registration.",
        customer_reassurance:
          "CostaTrades handles all gate access with your community to keep visits hassle-free.",
      },
    },
  },
  {
    REGION_NAME: "El Chaparral",
    region_slug: "el-chaparral",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5220",
    LON: "-4.6548",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 5,
      },
      content_injects: {
        provider_warning:
          "Woodland surroundings can make certain properties harder to locate for first-time visitors.",
        customer_reassurance:
          "CostaTrades specialists use precise GPS routing to ensure accurate arrival.",
      },
    },
  },
  {
    REGION_NAME: "Estepona Town",
    region_slug: "estepona-town",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.4217",
    LON: "-5.1459",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 8,
      },
      content_injects: {
        provider_warning:
          "Old Town and beachfront streets are narrow and often pedestrian-restricted.",
        customer_reassurance:
          "CostaTrades specialists schedule parking and pedestrian-zone access in advance to prevent delays.",
      },
    },
  },
  {
    REGION_NAME: "Selwo",
    region_slug: "selwo",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.4657",
    LON: "-5.0390",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 4,
      },
      content_injects: {
        provider_warning:
          "Some hillside gated communities require visitor registration before entry.",
        customer_reassurance:
          "CostaTrades manages all community-access requirements before dispatch.",
      },
    },
  },
  {
    REGION_NAME: "Cancelada",
    region_slug: "cancelada",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.4482",
    LON: "-5.0147",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Village-centre streets can be busy during school drop-off and pickup hours.",
        customer_reassurance:
          "CostaTrades specialists plan service timings to avoid local congestion windows.",
      },
    },
  },
  {
    REGION_NAME: "Casares Costa",
    region_slug: "casares-costa",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.3890",
    LON: "-5.2201",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 5,
      },
      content_injects: {
        provider_warning:
          "Some hillside urbanisations require pre-registered entry for service providers.",
        customer_reassurance:
          "CostaTrades handles access permissions with each community ahead of arrival.",
      },
    },
  },
  {
    REGION_NAME: "Manilva",
    region_slug: "manilva",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.3765",
    LON: "-5.2502",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Manilva’s hilly terrain can extend travel times during peak visitors’ season.",
        customer_reassurance:
          "CostaTrades specialists plan optimal routes to ensure timely arrival.",
      },
    },
  },
  {
    REGION_NAME: "Sabinillas",
    region_slug: "sabinillas",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.3761",
    LON: "-5.2268",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 7,
      },
      content_injects: {
        provider_warning:
          "Beachfront areas and the promenade become busy, limiting vehicle access during peak times.",
        customer_reassurance:
          "CostaTrades specialists arrange early or late service windows to avoid crowds.",
      },
    },
  },
  {
    REGION_NAME: "Puerto de la Duquesa",
    region_slug: "puerto-de-la-duquesa",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.3816",
    LON: "-5.2307",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: 2.0,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 7,
      },
      content_injects: {
        provider_warning:
          "Port-side zones have restricted loading areas and limited turning radius for large vans.",
        customer_reassurance:
          "CostaTrades assigns appropriately sized vehicles and schedules optimal arrival times.",
      },
    },
  },
  {
    REGION_NAME: "Rincon de la Victoria",
    region_slug: "rincon-de-la-victoria",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.7170",
    LON: "-4.2810",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 8,
      },
      content_injects: {
        provider_warning:
          "Central streets near the beachfront can become congested during weekends and summer evenings.",
        customer_reassurance:
          "CostaTrades specialists schedule arrivals outside peak hours to ensure smooth service.",
      },
    },
  },
  {
    REGION_NAME: "La Cala del Moral",
    region_slug: "la-cala-del-moral",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.7140",
    LON: "-4.3090",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 7,
      },
      content_injects: {
        provider_warning:
          "Beachfront lanes narrow significantly during high traffic periods.",
        customer_reassurance:
          "CostaTrades specialists select the best routes for steady arrival times.",
      },
    },
  },
  {
    REGION_NAME: "Torre del Mar",
    region_slug: "torre-del-mar",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.7424",
    LON: "-4.0927",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 8,
      },
      content_injects: {
        provider_warning:
          "Promenade and beachfront areas become highly congested in summer.",
        customer_reassurance:
          "CostaTrades schedules specialist visits early or late to avoid peak hours.",
      },
    },
  },
  {
    REGION_NAME: "Nerja",
    region_slug: "nerja",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.7487",
    LON: "-3.8737",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 1.9,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 7,
      },
      content_injects: {
        provider_warning:
          "Old Town has narrow streets where larger vans cannot access properties.",
        customer_reassurance:
          "CostaTrades assigns appropriately sized vehicles for Old Town and hillside properties.",
      },
    },
  },
  {
    REGION_NAME: "Frigiliana",
    region_slug: "frigiliana",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.7929",
    LON: "-3.8970",
    TownLogisticsProfile: {
      cluster_type: "Mountain_Village",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 1.8,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 8,
      },
      content_injects: {
        provider_warning:
          "Village-centre streets are extremely narrow and steep, limiting vehicle access.",
        customer_reassurance:
          "CostaTrades specialists use small service vehicles to navigate Frigiliana’s mountain streets.",
      },
    },
  },
  {
    REGION_NAME: "Torrox",
    region_slug: "torrox",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.7583",
    LON: "-3.9520",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Some hillside urbanisations have steep gradients affecting arrival times.",
        customer_reassurance:
          "CostaTrades specialists plan appropriate vehicle selection and timing for hillside properties.",
      },
    },
  },
  {
    REGION_NAME: "Velez Malaga",
    region_slug: "velez-malaga",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.7797",
    LON: "-4.0990",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Some residential pockets have dense street parking that can slow specialist arrival.",
        customer_reassurance:
          "CostaTrades specialists plan parking and access routes in advance.",
      },
    },
  },
  {
    REGION_NAME: "Sotogrande Costa",
    region_slug: "sotogrande-costa",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.2933",
    LON: "-5.2752",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: 2.2,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Many streets in Sotogrande Costa require pre-approved vehicle access during peak seasons.",
        customer_reassurance:
          "CostaTrades handles all gate permissions to ensure smooth specialist entry.",
      },
    },
  },
  {
    REGION_NAME: "Sotogrande Alto",
    region_slug: "sotogrande-alto",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.3105",
    LON: "-5.2854",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 5,
      },
      content_injects: {
        provider_warning:
          "Properties around golf estates often require identity verification for service entry.",
        customer_reassurance:
          "CostaTrades coordinates with estate security for authorised access.",
      },
    },
  },
  {
    REGION_NAME: "La Reserva",
    region_slug: "la-reserva",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.3037",
    LON: "-5.2718",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: 2.1,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 5,
      },
      content_injects: {
        provider_warning:
          "High-security gated estates in La Reserva require pre-authorised entry for specialists.",
        customer_reassurance:
          "CostaTrades arranges all access protocols to avoid delays.",
      },
    },
  },
  {
    REGION_NAME: "Guadiaro",
    region_slug: "guadiaro",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.2862",
    LON: "-5.2853",
    TownLogisticsProfile: {
      cluster_type: "Golf_Estate",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 5,
      },
      content_injects: {
        provider_warning:
          "Village-centre parking can be limited during school and weekend hours.",
        customer_reassurance:
          "CostaTrades specialists schedule visits to avoid high-traffic periods.",
      },
    },
  },
  {
    REGION_NAME: "Pueblo Nuevo",
    region_slug: "pueblo-nuevo",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.2904",
    LON: "-5.2877",
    TownLogisticsProfile: {
      cluster_type: "Golf_Estate",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Local commercial zones can have busy parking during the morning rush.",
        customer_reassurance:
          "CostaTrades specialists choose optimal time windows for visits.",
      },
    },
  },
  {
    REGION_NAME: "San Roque Club",
    region_slug: "san-roque-club",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.3172",
    LON: "-5.3241",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: 2.1,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 5,
      },
      content_injects: {
        provider_warning:
          "Access to golf communities may require prior identity verification.",
        customer_reassurance:
          "CostaTrades coordinates with estate management for authorised access.",
      },
    },
  },
  {
    REGION_NAME: "Alcaidesa",
    region_slug: "alcaidesa",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.2850",
    LON: "-5.3312",
    TownLogisticsProfile: {
      cluster_type: "Luxury_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: 2.0,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: true,
        ban_months: ["July", "August"],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Elevated hillside properties may require precise routing for safe arrival.",
        customer_reassurance:
          "CostaTrades uses accurate GPS mapping to plan hillside access.",
      },
    },
  },
  {
    REGION_NAME: "Alhaurin el Grande",
    region_slug: "alhaurin-el-grande",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.6416",
    LON: "-4.6867",
    TownLogisticsProfile: {
      cluster_type: "Rural_Mountain",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 5,
      },
      content_injects: {
        provider_warning:
          "Some urbanisation roads are steep and narrow, affecting arrival time for large service vehicles.",
        customer_reassurance:
          "CostaTrades specialists plan mountain access routes and select suitable vehicles for each job.",
      },
    },
  },
  {
    REGION_NAME: "Coin",
    region_slug: "coin",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.6594",
    LON: "-4.7561",
    TownLogisticsProfile: {
      cluster_type: "Rural_Mountain",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 4,
      },
      content_injects: {
        provider_warning:
          "Country roads around Coín can be winding with limited passing space.",
        customer_reassurance:
          "CostaTrades specialists plan rural access routes to ensure punctual arrival.",
      },
    },
  },
  {
    REGION_NAME: "Mijas Pueblo",
    region_slug: "mijas-pueblo",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5954",
    LON: "-4.6372",
    TownLogisticsProfile: {
      cluster_type: "Rural_Mountain",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 1.9,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 7,
      },
      content_injects: {
        provider_warning:
          "Village-centre streets are very narrow, limiting access for medium and large vans.",
        customer_reassurance:
          "CostaTrades assigns smaller vehicles for Mijas Pueblo properties and plans parking in advance.",
      },
    },
  },
  {
    REGION_NAME: "Ojen",
    region_slug: "ojen",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5682",
    LON: "-4.8560",
    TownLogisticsProfile: {
      cluster_type: "Rural_Mountain",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 1.9,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 7,
      },
      content_injects: {
        provider_warning:
          "Ojén’s steep streets and sharp turns can restrict larger vans.",
        customer_reassurance:
          "CostaTrades specialists use suitable vehicles and route planning for safe arrival.",
      },
    },
  },
  {
    REGION_NAME: "Tolox",
    region_slug: "tolox",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.6853",
    LON: "-4.9050",
    TownLogisticsProfile: {
      cluster_type: "Rural_Mountain",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 1.8,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 5,
      },
      content_injects: {
        provider_warning:
          "Mountain roads leading to Tolox can be tight and slow-moving, especially in winter or rain.",
        customer_reassurance:
          "CostaTrades plans safe arrival routes with weather-adjusted timing.",
      },
    },
  },
  {
    REGION_NAME: "Guaro",
    region_slug: "guaro",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.6592",
    LON: "-4.8341",
    TownLogisticsProfile: {
      cluster_type: "Rural_Mountain",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 1.8,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Guaro’s narrow village streets require precise vehicle selection.",
        customer_reassurance:
          "CostaTrades assigns compact service vehicles for better access in village centres.",
      },
    },
  },
  {
    REGION_NAME: "Alozaina",
    region_slug: "alozaina",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.7336",
    LON: "-4.8507",
    TownLogisticsProfile: {
      cluster_type: "Rural_Mountain",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 1.8,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6,
      },
      content_injects: {
        provider_warning:
          "Winding rural roads and village gradients can delay arrival for large vehicles.",
        customer_reassurance:
          "CostaTrades specialists use optimal routes and appropriate vehicles for mountain access.",
      },
    },
  },
  {
    REGION_NAME: "Benalmadena Area",
    region_slug: "benalmadena-area",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5972",
    LON: "-4.5203",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Residential",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "High",
        low_emission_zone_active: true,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 7,
      },
      content_injects: {
        provider_warning:
          "Coastal roads and marina areas can be heavily congested during summer months.",
        customer_reassurance:
          "CostaTrades specialists allow extra travel time for coastal routes.",
      },
    },
  },
  {
    REGION_NAME: "Benalmadena Pueblo",
    region_slug: "benalmadena-pueblo",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5958",
    LON: "-4.5539",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Mixed",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 2.1,
        parking_risk_level: "Medium",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6, // Inferred default
      },
      content_injects: {
        provider_warning: "Traditional village streets are narrow and winding.",
        customer_reassurance:
          "We assign appropriately sized vehicles for village access.",
      },
    },
  },
  {
    REGION_NAME: "Arroyo de la Miel",
    region_slug: "arroyo-de-la-miel",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5994",
    LON: "-4.5348",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Mixed",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6, // Inferred default
      },
      content_injects: {
        provider_warning: "High density town centre with limited parking.",
        customer_reassurance: "We plan parking and loading zones in advance.",
      },
    },
  },
  {
    REGION_NAME: "Benalmadena Costa",
    region_slug: "benalmadena-costa",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5936",
    LON: "-4.5262",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Mixed",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6, // Inferred default
      },
      content_injects: {
        provider_warning: "Coastal road traffic heavy in summer.",
        customer_reassurance: "We optimise routes to ensure punctual arrival.",
      },
    },
  },
  {
    REGION_NAME: "Torremolinos",
    region_slug: "torremolinos",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.6206",
    LON: "-4.4996",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Mixed",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: null,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6, // Inferred default
      },
      content_injects: {
        provider_warning: "Busy tourist zones with pedestrian restrictions.",
        customer_reassurance:
          "We schedule visits to avoid peak pedestrian hours.",
      },
    },
  },
  {
    REGION_NAME: "La Carihuela",
    region_slug: "la-carihuela",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.6167",
    LON: "-4.5050",
    TownLogisticsProfile: {
      cluster_type: "Coastal_Mixed",
      logistics: {
        security_gate_clearance: false,
        vehicle_width_limit_meters: 2.0,
        parking_risk_level: "High",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6, // Inferred default
      },
      content_injects: {
        provider_warning: "Extremely narrow beachfront streets.",
        customer_reassurance: "Small vans assigned for tight access.",
      },
    },
  },
  {
    REGION_NAME: "El Rosario",
    region_slug: "el-rosario",
    CURRENT_DATE: "2025-11-27",
    SUB_AREAS: [],
    LAT: "36.5050",
    LON: "-4.8150",
    TownLogisticsProfile: {
      cluster_type: "Hillside_Gated",
      logistics: {
        security_gate_clearance: true,
        vehicle_width_limit_meters: null,
        parking_risk_level: "Low",
        low_emission_zone_active: false,
      },
      seasonality: {
        summer_construction_ban: false,
        ban_months: [],
        noise_sensitivity_score: 6, // Inferred default
      },
      content_injects: {
        provider_warning:
          "Hillside access roads are winding and may require security clearance at the main gate.",
        customer_reassurance:
          "CostaTrades specialists are familiar with El Rosario security protocols.",
      },
    },
  },
];

const RELATED_AREAS_BY_CLUSTER: Record<string, SubArea[]> = {
  Mixed_Coastal_Rural: [
    { name: "Torre del Mar", slug: "torre-del-mar" },
    { name: "Nerja", slug: "nerja" },
    { name: "Velez Malaga", slug: "velez-malaga" },
    { name: "Frigiliana", slug: "frigiliana" },
    { name: "Rincon de la Victoria", slug: "rincon-de-la-victoria" },
  ],
  Rural_Mountain: [
    { name: "Mijas Pueblo", slug: "mijas-pueblo" },
    { name: "Coin", slug: "coin" },
    { name: "Alhaurin el Grande", slug: "alhaurin-el-grande" },
    { name: "Tolox", slug: "tolox" },
    { name: "Guaro", slug: "guaro" },
  ],
  Luxury_Gated: [
    { name: "Marbella Area", slug: "marbella-area" },
    { name: "Nueva Andalucia", slug: "nueva-andalucia" },
    { name: "San Pedro", slug: "san-pedro" },
  ],
  Coastal_Residential: [
    { name: "Mijas Costa", slug: "mijas-costa" },
    { name: "La Cala de Mijas", slug: "la-cala-de-mijas" },
    { name: "Calahonda", slug: "calahonda" },
    { name: "Estepona Town", slug: "estepona-town" },
    { name: "Sabinillas", slug: "sabinillas" },
    { name: "Rincon de la Victoria", slug: "rincon-de-la-victoria" },
    { name: "Torre del Mar", slug: "torre-del-mar" },
    { name: "Nerja", slug: "nerja" },
  ],
  Mountain_Village: [
    { name: "Frigiliana", slug: "frigiliana" },
    { name: "Mijas Pueblo", slug: "mijas-pueblo" },
    { name: "Ojen", slug: "ojen" },
  ],
  Golf_Estate: [
    { name: "Sotogrande Costa", slug: "sotogrande-costa" },
    { name: "San Roque Club", slug: "san-roque-club" },
    { name: "La Reserva", slug: "la-reserva" },
  ],
  Coastal_Mixed: [
    { name: "Benalmadena Area", slug: "benalmadena-area" },
    { name: "Mijas Pueblo", slug: "mijas-pueblo" },
    { name: "Mijas Costa", slug: "mijas-costa" },
  ],
};

function formatRegionNameFromSlug(slug: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function LocationHub() {
  const params = useParams();
  const regionSlug =
    (params.slug as string | undefined) ??
    (params.region_slug as string | undefined) ??
    (params.location as string | undefined) ??
    (params.region as string | undefined);

  const [locationProfile, setLocationProfile] =
    useState<SupabaseLocationProfile | null>(null);
  
  // Emergency modal state
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [emergencyService, setEmergencyService] = useState<{
    title: string;
    phone: string;
    category: string;
  } | null>(null);

  const EMERGENCY_CONTACTS: Record<string, { phone: string; category: string }> = {
    "emergency-plumber": { phone: "+34-952-234-567", category: "Plumbers" },
    "emergency-electrician": { phone: "+34-952-234-568", category: "Electricians" },
    "emergency-locksmith": { phone: "+34-952-234-569", category: "Locksmiths" },
  };

  const handleEmergencyClick = (title: string, slug: string) => {
    const contact = EMERGENCY_CONTACTS[slug];
    if (contact) {
      setEmergencyService({ title, ...contact });
      setEmergencyModalOpen(true);
    }
  };

  const defaultRegion = LOCATION_CONFIG[0];

  const matchedRegion = regionSlug
    ? LOCATION_CONFIG.find((region) => region.region_slug === regionSlug)
    : defaultRegion;

  const baseData: LocationData =
    matchedRegion ||
    (regionSlug
      ? {
          ...defaultRegion,
          REGION_NAME: formatRegionNameFromSlug(regionSlug),
          region_slug: regionSlug,
        }
      : defaultRegion);

  useEffect(() => {
    if (!regionSlug) return;

    async function fetchLocationProfile() {
      const client = getSupabase();
      if (!client) return;

      try {
        const { data, error } = await client
          .from("location_profiles")
          .select("slug, region_name, sub_areas, logistics, content_injects")
          .eq("slug", regionSlug)
          .single();

        if (error) {
          console.warn("Error fetching location profile:", error);
          return;
        }

        if (data) {
          setLocationProfile(data as SupabaseLocationProfile);
        }
      } catch (err) {
        console.error("Unexpected error fetching location profile:", err);
      }
    }

    fetchLocationProfile();
  }, [regionSlug]);

  let displayData: LocationData = baseData;

  if (locationProfile) {
    const subAreasFromDb: SubArea[] = Array.isArray(locationProfile.sub_areas)
      ? locationProfile.sub_areas.map((raw) => {
          const trimmed = typeof raw === "string" ? raw.trim() : String(raw);

          let slug = trimmed.toLowerCase().replace(/\s+/g, "-");
          if (trimmed === "San Pedro de Alcantara") {
            slug = "san-pedro";
          }

          return {
            slug,
            name: trimmed,
          };
        })
      : [];

    displayData = {
      ...baseData,
      REGION_NAME: locationProfile.region_name || baseData.REGION_NAME,
      region_slug: locationProfile.slug || baseData.region_slug,
      SUB_AREAS:
        subAreasFromDb.length > 0 ? subAreasFromDb : baseData.SUB_AREAS,
      TownLogisticsProfile: {
        ...baseData.TownLogisticsProfile,
        logistics: {
          ...baseData.TownLogisticsProfile.logistics,
          ...(locationProfile.logistics || {}),
        },
        content_injects: {
          ...baseData.TownLogisticsProfile.content_injects,
          ...(locationProfile.content_injects || {}),
        },
      },
    };
  }

  const { TownLogisticsProfile } = displayData;

  const currentDate = displayData.CURRENT_DATE
    ? new Date(displayData.CURRENT_DATE)
    : new Date();

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  const isBanActive =
    TownLogisticsProfile.seasonality.summer_construction_ban &&
    TownLogisticsProfile.seasonality.ban_months.includes(currentMonth);

  const relatedAreas =
    RELATED_AREAS_BY_CLUSTER[TownLogisticsProfile.cluster_type] || [];

  const clusterLabel = TownLogisticsProfile.cluster_type.replace(/_/g, " ");

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `Specialists in ${displayData.REGION_NAME}`,
    areaServed: displayData.REGION_NAME,
    geo: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: displayData.LAT,
        longitude: displayData.LON,
      },
      geoRadius: "15000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Specialist Services in ${displayData.REGION_NAME}`,
      itemListElement: SPECIALIST_CATEGORIES.map((cat) => ({
        "@type": "OfferCatalog",
        name: cat.name,
      })),
    },
  };

  const hasBanMonths =
    TownLogisticsProfile.seasonality.ban_months &&
    TownLogisticsProfile.seasonality.ban_months.length > 0;

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title={`Verified Specialists in ${displayData.REGION_NAME} | CostaTrades (Official)`}
        description={`Find vetted plumbers, electricians, and home specialists in ${displayData.REGION_NAME}. 100% ID-verified, insured, and reviewed. View availability in ${displayData.REGION_NAME} now.`}
        schema={schemaData}
      />

      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5359370/pexels-photo-5359370.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-slate-900/70" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Find Verified Specialists in {displayData.REGION_NAME}.
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl font-light">
              The trusted network for {displayData.REGION_NAME} homeowners.
            </p>
            <Link href={`/post-job?location=${displayData.region_slug}`}>
              <Button
                size="lg"
                className="bg-[#E31E24] hover:bg-[#C41218] text-white h-14 px-8 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Post a Job in {displayData.REGION_NAME}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {displayData.SUB_AREAS.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-[#0a1f44] mb-8">
              Popular Areas in {displayData.REGION_NAME}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayData.SUB_AREAS.map((area) => (
                <Link
                  key={area.slug}
                  href={`/locations/${area.slug}`}
                  className="block group"
                >
                  <Card className="h-full p-6 hover:shadow-md transition-shadow border-gray-200">
                    <h3 className="text-xl font-bold text-[#0a1f44] mb-2 group-hover:text-blue-600 transition-colors">
                      {area.name}
                    </h3>
                    <p className="text-muted-foreground">
                      Find verified specialists in {area.name}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#0a1f44] mb-8">
            Specialists Available in {displayData.REGION_NAME}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SPECIALIST_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/post-job/results?category=${cat.slug}&postcode=${encodeURIComponent(displayData.REGION_NAME)}`}
                className="flex flex-col items-center p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#0a1f44] group-hover:text-white transition-colors">
                  <cat.icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-gray-900">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-[#0a1f44] mb-8">
            Emergency Help in {displayData.REGION_NAME}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Emergency Plumber",
                slug: "emergency-plumber",
                icon: Droplets,
              },
              {
                title: "Emergency Electrician",
                slug: "emergency-electrician",
                icon: Zap,
              },
              {
                title: "Emergency Locksmith",
                slug: "emergency-locksmith",
                icon: Key,
              },
            ].map((item) => (
              <button
                key={item.title}
                onClick={() => handleEmergencyClick(item.title, item.slug)}
                className="block text-left w-full"
              >
                <Card className="p-6 border border-red-200 shadow-sm hover:shadow-md transition-all bg-white h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    24/7
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-[#0a1f44]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Available 24/7 - Verified - Fast Response
                  </p>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact Modal */}
      <Dialog open={emergencyModalOpen} onOpenChange={setEmergencyModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <div className="text-center py-4">
            <h2 className="text-xl font-bold text-[#0a1f44] mb-2">Contact Information</h2>
            <p className="text-gray-500 text-sm mb-6">Get in touch with this professional directly</p>
            
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Phone className="w-8 h-8 text-[#0a1f44]" />
            </div>
            
            <h3 className="font-bold text-lg text-[#0a1f44]">{emergencyService?.title}</h3>
            <p className="text-gray-500 text-sm mb-6">{emergencyService?.category}</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-600 font-medium mb-1">Phone Number</p>
              <a 
                href={`tel:${emergencyService?.phone}`}
                className="text-xl font-bold text-[#0a1f44] flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {emergencyService?.phone}
              </a>
            </div>
            
            <p className="text-xs text-gray-500">
              Please mention <strong>CostaTrade</strong> when you call to ensure the best service.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#0a1f44] mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-blue-600" />
              Community Insights: {displayData.REGION_NAME}
            </h2>
            <ul className="space-y-4">
              {TownLogisticsProfile.logistics.vehicle_width_limit_meters !==
                null && (
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Vehicle width limit of{" "}
                    {TownLogisticsProfile.logistics.vehicle_width_limit_meters}{" "}
                    meters in some streets.
                  </span>
                </li>
              )}
              {TownLogisticsProfile.logistics.parking_risk_level && (
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Parking risk level is{" "}
                    {TownLogisticsProfile.logistics.parking_risk_level}.
                  </span>
                </li>
              )}
              {TownLogisticsProfile.logistics.low_emission_zone_active && (
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Low emission zone rules apply in parts of this region.
                  </span>
                </li>
              )}
              {TownLogisticsProfile.content_injects.provider_warning && (
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-amber-700">
                    {TownLogisticsProfile.content_injects.provider_warning}
                  </span>
                </li>
              )}
              {TownLogisticsProfile.content_injects.customer_reassurance && (
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-green-700">
                    {TownLogisticsProfile.content_injects.customer_reassurance}
                  </span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  {TownLogisticsProfile.seasonality.summer_construction_ban &&
                  hasBanMonths
                    ? `Summer construction ban applies during ${TownLogisticsProfile.seasonality.ban_months.join(
                        " & ",
                      )}.`
                    : "No fixed summer construction ban is currently in place, but some communities may have their own quiet hours."}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Noise sensitivity in this area is rated{" "}
                  {TownLogisticsProfile.seasonality.noise_sensitivity_score}/10,
                  so planning noisy works considerately is important.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {isBanActive && (
        <section className="py-8 bg-amber-50 border-y border-amber-200">
          <div className="container-custom">
            <div className="flex items-start gap-4 max-w-4xl mx-auto">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-800 mb-1">
                  Seasonal Construction Restriction
                </h3>
                <p className="text-amber-700">
                  Heavy construction and noise-generating work is restricted in{" "}
                  {displayData.REGION_NAME} during{" "}
                  {TownLogisticsProfile.seasonality.ban_months.join(" & ")}.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {relatedAreas.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-[#0a1f44] mb-6">
              Nearby {clusterLabel} Areas
            </h2>
            <div className="flex flex-wrap gap-4">
              {relatedAreas.map((area) => (
                <Link key={area.slug} href={`/locations/${area.slug}`}>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-50 flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    {area.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden relative">
            <iframe
              title={`Coverage map of verified specialists in ${displayData.REGION_NAME}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                parseFloat(displayData.LON) - 0.1
              },${parseFloat(displayData.LAT) - 0.1},${
                parseFloat(displayData.LON) + 0.1
              },${
                parseFloat(displayData.LAT) + 0.1
              }&layer=mapnik&marker=${displayData.LAT},${displayData.LON}`}
              className="w-full h-full border-0 grayscale-[20%]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1f44] text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">
              Your Safety Comes First
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              <div className="flex gap-4">
                <Shield className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">ID Verified</h3>
                  <p className="text-blue-100 text-sm">
                    All specialists are ID-verified for your peace of mind.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Background Checked</h3>
                  <p className="text-blue-100 text-sm">
                    Background screening performed on all professionals.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Insured</h3>
                  <p className="text-blue-100 text-sm">
                    Insurance checks completed for every business.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Local Reviews</h3>
                  <p className="text-blue-100 text-sm">
                    Real local reviews from {displayData.REGION_NAME}.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield className="w-8 h-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Trusted</h3>
                  <p className="text-blue-100 text-sm">
                    Trusted by homeowners across the Costa del Sol.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 text-center">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-[#0a1f44] mb-8">
            Ready to find a specialist in {displayData.REGION_NAME}?
          </h2>
          <Link href={`/post-job/results?area=${displayData.region_slug}`}>
            <Button
              size="lg"
              className="bg-[#E31E24] hover:bg-[#C41218] text-white h-16 px-12 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              Post a Job in {displayData.REGION_NAME}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
