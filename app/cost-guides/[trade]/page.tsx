"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Phone,
  Star,
  Shield,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Zap,
  Droplets,
  Hammer,
  Wind,
  Paintbrush,
  Wrench,
  Sun,
  Leaf,
  Lock,
  Home,
  Euro,
  Users,
  BadgeCheck,
  Sparkles,
  Target,
  FileText,
  ThumbsUp,
  CircleDollarSign,
  Award,
  Timer,
} from "lucide-react";
import { useState, use } from "react";
import { cn } from "@/lib/utils";

// Trade data configuration - 2025 Costa del Sol rates (+20% standard, +40% premium areas)
const tradeData: Record<string, TradeGuide> = {
  electrician: {
    slug: "electrician",
    title: "Electrician",
    metaTitle: "Electrician Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does an electrician cost in Spain? Complete 2025 price guide for electrical work on the Costa del Sol. Call-out fees, rewiring costs, and hourly rates.",
    icon: Zap,
    heroImage: "/images/trades/electrician-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Electrical work costs on the Costa del Sol typically range from €30-55/hour for standard work, with call-out fees between €95-180. Full rewiring of a 2-bed apartment costs €3,600-6,000.",
    avgHourlyRate: { low: 30, high: 55, avg: 42 },
    callOutFee: { low: 95, high: 180, avg: 145 },
    commonJobs: [
      { job: "Call-out / Diagnosis", lowPrice: 95, highPrice: 180, avgPrice: 145, timeEstimate: "1 hour", popular: true },
      { job: "Socket/Outlet Installation", lowPrice: 72, highPrice: 145, avgPrice: 108, timeEstimate: "1-2 hours", popular: false },
      { job: "Light Fitting Installation", lowPrice: 48, highPrice: 120, avgPrice: 84, timeEstimate: "30-60 mins", popular: false },
      { job: "Consumer Unit (Fuse Box) Replacement", lowPrice: 480, highPrice: 960, avgPrice: 720, timeEstimate: "Half day", popular: true },
      { job: "Full Rewire (2-Bed Apartment)", lowPrice: 3600, highPrice: 6000, avgPrice: 5040, timeEstimate: "3-5 days", popular: true },
      { job: "Full Rewire (3-Bed Villa)", lowPrice: 6000, highPrice: 10800, avgPrice: 8400, timeEstimate: "5-7 days", popular: false },
      { job: "EV Charger Installation", lowPrice: 600, highPrice: 1440, avgPrice: 960, timeEstimate: "Half day", popular: true },
      { job: "Boletin Electrico (Certificate)", lowPrice: 180, highPrice: 360, avgPrice: 265, timeEstimate: "2-3 hours", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates due to high demand", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average rates", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition, slightly lower", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Property Age", description: "Older properties often need more extensive work due to outdated wiring that doesn't meet current EU standards.", icon: Home },
      { factor: "Access Difficulty", description: "Hard-to-reach areas, high ceilings, or properties without easy crawl space access will increase labour time.", icon: Target },
      { factor: "Permit Requirements", description: "Some electrical work requires a Boletin (electrical certificate) which adds €180-360 to the total cost.", icon: FileText },
      { factor: "Emergency Call-outs", description: "Weekend or after-hours emergency calls typically cost 50-100% more than standard rates.", icon: Clock },
    ],
    whatToExpect: [
      { step: 1, title: "Initial Assessment", description: "The electrician will inspect your current installation, identify issues, and discuss your requirements." },
      { step: 2, title: "Written Quote", description: "You should receive a detailed written quote breaking down labour, materials, and any permit costs." },
      { step: 3, title: "Scheduled Work", description: "Work is scheduled at a mutually convenient time. Larger jobs may require multiple visits." },
      { step: 4, title: "Testing & Certification", description: "All work should be tested and you should receive appropriate certificates (Boletin) where required." },
    ],
    warningSignsPoorQuality: [
      "No written quote or contract provided",
      "Unwilling to show qualifications or insurance",
      "Significantly cheaper than other quotes (often means cutting corners)",
      "Refuses to provide a Boletin for work that requires one",
      "Uses second-hand or non-CE marked materials",
    ],
    questionsToAsk: [
      "Are you a registered electrician with valid insurance?",
      "Will you provide a Boletin Electrico after the work?",
      "Is the quote all-inclusive or are there potential extras?",
      "What warranty do you offer on your work?",
      "Can you provide references from recent jobs in the area?",
    ],
    faqs: [
      {
        question: "Do I need a Boletin Electrico?",
        answer: "A Boletin (electrical installation certificate) is required for new installations, major modifications, or when selling/renting a property. It certifies your electrical system meets Spanish safety standards and is valid for 20 years."
      },
      {
        question: "How long does rewiring a property take?",
        answer: "A 2-bedroom apartment typically takes 3-5 working days. A 3-4 bedroom villa can take 5-7 days. This includes running new cables, installing a new consumer unit, and testing."
      },
      {
        question: "Can I use UK electrical appliances in Spain?",
        answer: "Yes, but you'll need plug adapters. Spain uses Type C and F plugs (round pins) at 230V. Most modern UK appliances are compatible with the voltage, but older appliances should be checked."
      },
      {
        question: "What's the difference between 1-phase and 3-phase power?",
        answer: "Most Spanish apartments have single-phase (up to 10kW). Villas with pools, AC, or high energy needs may require 3-phase power (up to 43kW). Upgrading requires an application to Endesa/Iberdrola and can cost €600-2,400+."
      },
    ],
    relatedTrades: ["ac-repair", "solar-installation", "builder"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.8, totalJobs: 2847, verifiedPros: 156 },
  },
  plumber: {
    slug: "plumber",
    title: "Plumber",
    metaTitle: "Plumber Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does a plumber cost in Spain? Complete 2025 price guide for plumbing on the Costa del Sol. Emergency call-outs, leak repairs, and bathroom installations.",
    icon: Droplets,
    heroImage: "/images/trades/plumber-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Plumbing costs on the Costa del Sol range from €30-55/hour for standard work. Emergency call-outs are €95-215. A full bathroom renovation costs €4,800-9,600 for labour.",
    avgHourlyRate: { low: 30, high: 55, avg: 42 },
    callOutFee: { low: 95, high: 215, avg: 165 },
    commonJobs: [
      { job: "Emergency Call-out", lowPrice: 95, highPrice: 215, avgPrice: 165, timeEstimate: "1 hour", popular: true },
      { job: "Tap Replacement", lowPrice: 72, highPrice: 145, avgPrice: 102, timeEstimate: "1 hour", popular: false },
      { job: "Toilet Repair/Replacement", lowPrice: 95, highPrice: 240, avgPrice: 168, timeEstimate: "1-2 hours", popular: true },
      { job: "Water Heater Installation", lowPrice: 180, highPrice: 420, avgPrice: 300, timeEstimate: "2-4 hours", popular: true },
      { job: "Leak Detection & Repair", lowPrice: 180, highPrice: 480, avgPrice: 336, timeEstimate: "2-4 hours", popular: true },
      { job: "Boiler Service", lowPrice: 95, highPrice: 180, avgPrice: 132, timeEstimate: "1-2 hours", popular: false },
      { job: "Full Bathroom Plumbing", lowPrice: 1800, highPrice: 4200, avgPrice: 3000, timeEstimate: "3-5 days", popular: false },
      { job: "Pool Pump Repair", lowPrice: 120, highPrice: 360, avgPrice: 216, timeEstimate: "1-3 hours", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Emergency vs Scheduled", description: "Weekend or after-hours emergency calls cost 50-100% more than scheduled appointments.", icon: Clock },
      { factor: "Access to Pipes", description: "Hidden pipes behind walls or under floors significantly increase labour time and cost.", icon: Target },
      { factor: "Water Hardness", description: "The Costa del Sol has very hard water which causes limescale buildup, often requiring descaling work.", icon: Droplets },
      { factor: "Parts Availability", description: "Some older Spanish fittings require specific parts that may need ordering.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Diagnosis", description: "The plumber will assess the issue and provide an estimated cost before starting work." },
      { step: 2, title: "Quote Approval", description: "For larger jobs, you should receive a written quote detailing labour and materials." },
      { step: 3, title: "Work Completion", description: "Work is carried out with minimal disruption. Water may need to be turned off temporarily." },
      { step: 4, title: "Testing", description: "All work is tested for leaks and proper function before the job is signed off." },
    ],
    warningSignsPoorQuality: [
      "No diagnosis before starting work",
      "Verbal-only quotes for significant work",
      "Unable to explain what caused the problem",
      "Doesn't test the work before leaving",
      "No warranty on parts or labour",
    ],
    questionsToAsk: [
      "What's causing the problem and how will you fix it?",
      "Is this a temporary fix or permanent solution?",
      "Are parts included in the quote?",
      "Do you offer a warranty on your work?",
      "Will this fix prevent future issues?",
    ],
    faqs: [
      {
        question: "Why is water pressure low in my Spanish property?",
        answer: "Common causes include limescale buildup (very common on the Costa del Sol), undersized pipes in older properties, or issues with the main supply. A plumber can diagnose and recommend solutions like descaling or pipe upgrades."
      },
      {
        question: "How often should I service my boiler?",
        answer: "Annual servicing is recommended, typically before winter. This costs €95-180 and helps prevent breakdowns, ensures efficiency, and extends the boiler's lifespan."
      },
      {
        question: "Can a plumber fix my pool pump?",
        answer: "Many plumbers on the Costa del Sol have experience with pool equipment. However, for complex pool systems, a specialist pool technician may be more appropriate."
      },
    ],
    relatedTrades: ["bathroom-fitter", "pool-maintenance", "builder"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.7, totalJobs: 3521, verifiedPros: 189 },
  },
  builder: {
    slug: "builder",
    title: "Builder",
    metaTitle: "Builder Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does a builder cost in Spain? Complete 2025 price guide for construction work on the Costa del Sol. Extensions, renovations, and structural work.",
    icon: Hammer,
    heroImage: "/images/trades/builder-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Builder costs on the Costa del Sol range from €145-220/day for general work. Extensions cost €1,200-1,800/m². A full villa renovation can range from €50,000-150,000+.",
    avgHourlyRate: { low: 26, high: 42, avg: 33 },
    callOutFee: { low: 145, high: 220, avg: 175 },
    commonJobs: [
      { job: "Daily Rate (General Builder)", lowPrice: 145, highPrice: 220, avgPrice: 175, timeEstimate: "8 hours", popular: true },
      { job: "Wall Construction (per m²)", lowPrice: 85, highPrice: 145, avgPrice: 110, timeEstimate: "Varies", popular: false },
      { job: "Extension (per m²)", lowPrice: 1200, highPrice: 1800, avgPrice: 1500, timeEstimate: "6-12 weeks", popular: true },
      { job: "Terrace/Patio Construction", lowPrice: 3600, highPrice: 12000, avgPrice: 7200, timeEstimate: "1-3 weeks", popular: true },
      { job: "Swimming Pool Construction", lowPrice: 18000, highPrice: 42000, avgPrice: 28000, timeEstimate: "4-8 weeks", popular: true },
      { job: "Kitchen Renovation (labour)", lowPrice: 4800, highPrice: 12000, avgPrice: 7800, timeEstimate: "2-4 weeks", popular: false },
      { job: "Full Villa Renovation", lowPrice: 50000, highPrice: 150000, avgPrice: 95000, timeEstimate: "3-6 months", popular: false },
      { job: "Structural Repair Work", lowPrice: 2400, highPrice: 12000, avgPrice: 6000, timeEstimate: "1-4 weeks", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium area, high demand", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average rates", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Project Size", description: "Larger projects often benefit from economies of scale, reducing the per-square-metre cost.", icon: Home },
      { factor: "Materials Quality", description: "Premium materials (marble, imported tiles) significantly increase total project costs.", icon: Target },
      { factor: "Permits Required", description: "Planning permissions (licencia de obra) can add €500-3,000+ and several weeks to timelines.", icon: FileText },
      { factor: "Site Access", description: "Difficult access for machinery and materials can add 10-20% to labour costs.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Site Survey", description: "The builder will visit your property to assess the scope of work and take measurements." },
      { step: 2, title: "Detailed Quote", description: "You should receive a comprehensive quote with itemised costs for labour, materials, and timeline." },
      { step: 3, title: "Contract & Permits", description: "A formal contract is signed and any necessary building permits are applied for." },
      { step: 4, title: "Construction Phase", description: "Work proceeds in stages with regular progress updates and quality checks." },
    ],
    warningSignsPoorQuality: [
      "No formal contract or vague terms",
      "Demanding full payment upfront",
      "Unable to provide licencia de obra when required",
      "No portfolio or references from local projects",
      "Unrealistically low quotes compared to competitors",
    ],
    questionsToAsk: [
      "Do you have experience with similar projects in this area?",
      "Will you handle the building permits?",
      "What's included in the quote and what might be extra?",
      "What's the payment schedule and terms?",
      "Do you provide a guarantee on your work?",
    ],
    faqs: [
      {
        question: "Do I need a building permit for renovations?",
        answer: "For structural work, extensions, or major renovations, you need a licencia de obra mayor. Minor works like painting or replacing windows may only need a licencia de obra menor or comunicación previa. Your builder should advise on requirements."
      },
      {
        question: "How long does it take to build an extension?",
        answer: "A typical single-storey extension takes 6-12 weeks once permits are approved. Permit approval can add 2-6 months depending on your municipality."
      },
      {
        question: "Should I use a project manager?",
        answer: "For major renovations (€50,000+), a project manager or architect can save money by coordinating trades, ensuring quality, and managing timelines. They typically charge 8-15% of the project cost."
      },
    ],
    relatedTrades: ["electrician", "plumber", "tiler"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.6, totalJobs: 1823, verifiedPros: 98 },
  },
  painter: {
    slug: "painter",
    title: "Painter & Decorator",
    metaTitle: "Painter Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does a painter cost in Spain? Complete 2025 price guide for painting and decorating on the Costa del Sol. Interior, exterior, and specialist finishes.",
    icon: Paintbrush,
    heroImage: "/images/trades/painter-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Painting costs on the Costa del Sol range from €25-50/hour or €14-22/m² for interior walls. A full apartment repaint costs €1,500-4,000 depending on size.",
    avgHourlyRate: { low: 25, high: 50, avg: 36 },
    callOutFee: { low: 120, high: 180, avg: 150 },
    commonJobs: [
      { job: "Interior Painting (per m²)", lowPrice: 14, highPrice: 22, avgPrice: 17, timeEstimate: "Varies", popular: true },
      { job: "Exterior Painting (per m²)", lowPrice: 18, highPrice: 28, avgPrice: 22, timeEstimate: "Varies", popular: true },
      { job: "Single Room (walls & ceiling)", lowPrice: 250, highPrice: 500, avgPrice: 360, timeEstimate: "1-2 days", popular: true },
      { job: "2-Bed Apartment (full repaint)", lowPrice: 1500, highPrice: 3000, avgPrice: 2100, timeEstimate: "3-5 days", popular: true },
      { job: "3-Bed Villa (interior)", lowPrice: 3000, highPrice: 6000, avgPrice: 4200, timeEstimate: "5-8 days", popular: false },
      { job: "Villa Exterior (200m²)", lowPrice: 3600, highPrice: 7200, avgPrice: 5000, timeEstimate: "4-7 days", popular: false },
      { job: "Kitchen Cabinet Respray", lowPrice: 800, highPrice: 1800, avgPrice: 1200, timeEstimate: "2-3 days", popular: false },
      { job: "Wallpaper Hanging (per roll)", lowPrice: 24, highPrice: 48, avgPrice: 35, timeEstimate: "30 mins/roll", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Surface Condition", description: "Walls needing extensive prep work (filling, sanding, priming) add 30-50% to the total cost.", icon: Target },
      { factor: "Paint Quality", description: "Premium paints like Tollens or Valentine cost 2-3x more than basic paints but last longer.", icon: Paintbrush },
      { factor: "Height & Access", description: "High ceilings, staircases, and exterior work requiring scaffolding significantly increases costs.", icon: Home },
      { factor: "Specialist Finishes", description: "Decorative techniques (Venetian plaster, faux finishes) command premium rates.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Viewing & Quote", description: "The painter will visit to assess surface condition, measure areas, and discuss colour choices." },
      { step: 2, title: "Preparation", description: "Furniture is covered or moved, surfaces are cleaned, holes filled, and masking tape applied." },
      { step: 3, title: "Painting", description: "Usually 2-3 coats are applied. Quality painters allow proper drying time between coats." },
      { step: 4, title: "Finishing", description: "Touch-ups completed, masking removed, and a final inspection before sign-off." },
    ],
    warningSignsPoorQuality: [
      "Not preparing surfaces properly before painting",
      "Using cheap, diluted paint",
      "Only applying one coat when two or more are needed",
      "Rushing the job without proper drying time",
      "Not protecting furniture and floors adequately",
    ],
    questionsToAsk: [
      "What brand and type of paint will you use?",
      "How many coats will be applied?",
      "Is surface preparation included in the quote?",
      "Do you move furniture or should I clear the rooms?",
      "What's the expected drying time between coats?",
    ],
    faqs: [
      {
        question: "How often should I repaint my property in Spain?",
        answer: "Interior: every 5-7 years. Exterior: every 3-5 years due to the harsh sun. South-facing walls may need repainting more frequently. Quality exterior paint with UV protection lasts longer."
      },
      {
        question: "What's the best paint for Spanish climate?",
        answer: "For exteriors, look for paints with high UV resistance and breathability (like Jotun or Valentine). For interiors, washable matt or satin finishes work well. Ask your painter for recommendations."
      },
      {
        question: "Should I paint before or after summer?",
        answer: "Spring or autumn is ideal. Summer heat can cause paint to dry too quickly (affecting finish), while winter rain delays exterior work. Early morning work is best in summer."
      },
    ],
    relatedTrades: ["builder", "tiler", "handyman"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.7, totalJobs: 2156, verifiedPros: 134 },
  },
  "ac-repair": {
    slug: "ac-repair",
    title: "AC & Climate Control",
    metaTitle: "AC Repair & Installation Costs Costa del Sol 2025 | Price Guide",
    metaDescription: "How much does AC installation and repair cost in Spain? Complete 2025 price guide for air conditioning on the Costa del Sol. Split units, ducted systems, and servicing.",
    icon: Wind,
    heroImage: "/images/trades/ac-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "AC service costs on the Costa del Sol range from €42-60/hour. A split unit installation costs €660-1,800. Annual servicing costs €85-150 per unit.",
    avgHourlyRate: { low: 42, high: 60, avg: 50 },
    callOutFee: { low: 85, high: 145, avg: 110 },
    commonJobs: [
      { job: "Annual Service (per unit)", lowPrice: 85, highPrice: 150, avgPrice: 110, timeEstimate: "1 hour", popular: true },
      { job: "Split Unit Installation (supply & fit)", lowPrice: 660, highPrice: 1800, avgPrice: 1100, timeEstimate: "Half day", popular: true },
      { job: "Multi-Split System (2-3 units)", lowPrice: 2400, highPrice: 4800, avgPrice: 3400, timeEstimate: "1-2 days", popular: true },
      { job: "Ducted System Installation", lowPrice: 6000, highPrice: 15000, avgPrice: 9600, timeEstimate: "2-4 days", popular: false },
      { job: "Gas Recharge (R32/R410A)", lowPrice: 120, highPrice: 250, avgPrice: 180, timeEstimate: "1-2 hours", popular: true },
      { job: "Compressor Replacement", lowPrice: 600, highPrice: 1200, avgPrice: 850, timeEstimate: "Half day", popular: false },
      { job: "Thermostat/Control Replacement", lowPrice: 150, highPrice: 400, avgPrice: 260, timeEstimate: "1-2 hours", popular: false },
      { job: "Heat Pump Installation", lowPrice: 3600, highPrice: 9600, avgPrice: 6000, timeEstimate: "1-2 days", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Unit Capacity (BTU)", description: "Larger rooms need more powerful units. A 3,500W unit costs less than a 7,000W unit.", icon: Wind },
      { factor: "Installation Complexity", description: "Long pipe runs, difficult mounting positions, or electrical upgrades add to costs.", icon: Target },
      { factor: "Brand Choice", description: "Premium brands (Daikin, Mitsubishi) cost 30-50% more than budget options but are more efficient.", icon: Home },
      { factor: "Seasonal Demand", description: "Summer installations can be rushed. Book in spring for better availability and prices.", icon: Clock },
    ],
    whatToExpect: [
      { step: 1, title: "Site Assessment", description: "The technician will assess room sizes, insulation, and the best placement for units." },
      { step: 2, title: "Quotation", description: "You'll receive a quote covering equipment, installation, and any electrical work needed." },
      { step: 3, title: "Installation", description: "Units are mounted, pipes connected, electrical work completed, and the system tested." },
      { step: 4, title: "Commissioning", description: "The system is configured, you're shown how to use it, and a service schedule is recommended." },
    ],
    warningSignsPoorQuality: [
      "Not sizing the system properly for the space",
      "Leaving pipe work exposed rather than channelling it",
      "Not vaccuuming the system before charging with refrigerant",
      "Using incorrect refrigerant type",
      "No F-Gas certification (required by law in Spain)",
    ],
    questionsToAsk: [
      "Are you F-Gas certified for refrigerant handling?",
      "What brand and model do you recommend for my space?",
      "Is the electrical work included in the quote?",
      "What's the warranty on equipment and installation?",
      "Do you offer a maintenance contract?",
    ],
    faqs: [
      {
        question: "How do I size an AC unit for my room?",
        answer: "As a rule of thumb: 100W per m² for well-insulated rooms, 125W per m² for average insulation, 150W+ per m² for poorly insulated or south-facing rooms. A 25m² room typically needs a 2.5-3.5kW unit."
      },
      {
        question: "How often should I service my AC?",
        answer: "Annual servicing is recommended, ideally before summer. Regular servicing maintains efficiency, extends lifespan, and prevents costly breakdowns during peak season."
      },
      {
        question: "Is it worth getting an inverter AC?",
        answer: "Yes. Inverter units adjust their speed rather than cycling on/off, using 30-50% less electricity. The higher upfront cost is typically recovered within 2-3 years through energy savings."
      },
    ],
    relatedTrades: ["electrician", "builder", "plumber"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.8, totalJobs: 3245, verifiedPros: 167 },
  },
  "pool-maintenance": {
    slug: "pool-maintenance",
    title: "Pool Maintenance",
    metaTitle: "Pool Maintenance Costs Costa del Sol 2025 | Price Guide",
    metaDescription: "How much does pool maintenance cost in Spain? Complete 2025 price guide for pool cleaning, repairs, and servicing on the Costa del Sol.",
    icon: Droplets,
    heroImage: "/images/trades/pool-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Pool maintenance on the Costa del Sol costs €85-145/month for regular service. One-off cleaning starts at €90. Equipment repairs vary from €120-1,200+.",
    avgHourlyRate: { low: 36, high: 55, avg: 45 },
    callOutFee: { low: 72, high: 145, avg: 100 },
    commonJobs: [
      { job: "Monthly Maintenance Contract", lowPrice: 85, highPrice: 145, avgPrice: 110, timeEstimate: "Weekly visits", popular: true },
      { job: "One-off Deep Clean", lowPrice: 90, highPrice: 180, avgPrice: 130, timeEstimate: "2-3 hours", popular: true },
      { job: "Green Pool Recovery", lowPrice: 180, highPrice: 420, avgPrice: 280, timeEstimate: "1-2 weeks", popular: true },
      { job: "Pump Repair/Replacement", lowPrice: 240, highPrice: 720, avgPrice: 450, timeEstimate: "Half day", popular: false },
      { job: "Filter Sand Change", lowPrice: 180, highPrice: 360, avgPrice: 260, timeEstimate: "2-3 hours", popular: false },
      { job: "Pool Liner Replacement", lowPrice: 3600, highPrice: 9600, avgPrice: 6000, timeEstimate: "1-2 weeks", popular: false },
      { job: "Pool Tiling Repair (per m²)", lowPrice: 85, highPrice: 180, avgPrice: 120, timeEstimate: "Varies", popular: false },
      { job: "Salt Chlorinator Installation", lowPrice: 960, highPrice: 2400, avgPrice: 1600, timeEstimate: "Half day", popular: true },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Inland areas", modifier: "+10-15%", note: "Travel time added", trend: "up" },
    ],
    factorsAffectingCost: [
      { factor: "Pool Size", description: "Larger pools require more chemicals and longer service time, increasing monthly costs.", icon: Home },
      { factor: "Pool Type", description: "Saltwater pools have lower chemical costs but higher equipment costs. Heated pools need more attention.", icon: Droplets },
      { factor: "Usage Frequency", description: "Holiday rentals with high usage need more frequent servicing than private pools.", icon: Clock },
      { factor: "Equipment Age", description: "Older pumps and filters are less efficient and more prone to breakdowns.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Initial Inspection", description: "The pool technician will test water chemistry, inspect equipment, and assess overall condition." },
      { step: 2, title: "Service Agreement", description: "You'll agree on service frequency, what's included, and pricing for chemicals and parts." },
      { step: 3, title: "Regular Visits", description: "Typically weekly visits to test water, adjust chemicals, clean filters, and check equipment." },
      { step: 4, title: "Seasonal Services", description: "Opening in spring and winterising in autumn, plus any repairs identified during the season." },
    ],
    warningSignsPoorQuality: [
      "Not testing water chemistry at each visit",
      "Using cheap or incorrect chemicals",
      "Missing scheduled visits without communication",
      "Not reporting equipment issues promptly",
      "No written service report after visits",
    ],
    questionsToAsk: [
      "What's included in the monthly service?",
      "Are chemicals included in the price?",
      "How quickly can you respond to emergencies?",
      "Do you provide a written report after each visit?",
      "What's your experience with my type of pool system?",
    ],
    faqs: [
      {
        question: "How often should my pool be serviced?",
        answer: "Weekly during swimming season (May-October) is standard. In winter, fortnightly is usually sufficient. Holiday rentals may need more frequent attention."
      },
      {
        question: "Should I get a salt chlorinator?",
        answer: "Salt systems reduce ongoing chemical costs and provide softer water. Installation costs €960-2,400 but saves €400-800/year in chlorine. Most people recoup costs within 2-3 years."
      },
      {
        question: "Why did my pool turn green?",
        answer: "Usually caused by insufficient chlorine, poor filtration, or unbalanced pH. Recovery typically costs €180-420 and takes 1-2 weeks. Regular maintenance prevents this."
      },
    ],
    relatedTrades: ["plumber", "electrician", "builder"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.7, totalJobs: 2678, verifiedPros: 89 },
  },
  gardener: {
    slug: "gardener",
    title: "Gardener & Landscaper",
    metaTitle: "Gardener Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does a gardener cost in Spain? Complete 2025 price guide for garden maintenance and landscaping on the Costa del Sol.",
    icon: Leaf,
    heroImage: "/images/trades/gardener-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Gardening costs on the Costa del Sol range from €18-28/hour. Monthly maintenance contracts start at €85. Landscaping projects cost €48-85/m².",
    avgHourlyRate: { low: 18, high: 28, avg: 22 },
    callOutFee: { low: 60, high: 95, avg: 75 },
    commonJobs: [
      { job: "Hourly Rate", lowPrice: 18, highPrice: 28, avgPrice: 22, timeEstimate: "Per hour", popular: true },
      { job: "Monthly Maintenance (small garden)", lowPrice: 85, highPrice: 145, avgPrice: 110, timeEstimate: "Fortnightly", popular: true },
      { job: "Monthly Maintenance (large villa)", lowPrice: 180, highPrice: 360, avgPrice: 260, timeEstimate: "Weekly", popular: true },
      { job: "One-off Garden Clearance", lowPrice: 180, highPrice: 600, avgPrice: 350, timeEstimate: "1-2 days", popular: false },
      { job: "Lawn Installation (per m²)", lowPrice: 18, highPrice: 36, avgPrice: 26, timeEstimate: "Varies", popular: false },
      { job: "Irrigation System Install", lowPrice: 960, highPrice: 3000, avgPrice: 1800, timeEstimate: "1-3 days", popular: true },
      { job: "Tree Pruning (per tree)", lowPrice: 60, highPrice: 240, avgPrice: 130, timeEstimate: "1-4 hours", popular: false },
      { job: "Full Garden Design & Landscaping", lowPrice: 4800, highPrice: 18000, avgPrice: 9600, timeEstimate: "2-6 weeks", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Inland/Rural areas", modifier: "-10-15%", note: "Slightly lower rates", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Garden Size", description: "Larger properties require more time and may need a team rather than an individual gardener.", icon: Home },
      { factor: "Plant Selection", description: "Native Mediterranean plants require less water and maintenance than exotic species.", icon: Leaf },
      { factor: "Irrigation Needs", description: "Properties without automatic irrigation require more frequent manual watering.", icon: Droplets },
      { factor: "Access & Terrain", description: "Steep slopes or difficult access increase labour time and may require specialist equipment.", icon: Target },
    ],
    whatToExpect: [
      { step: 1, title: "Garden Assessment", description: "The gardener will tour your property to understand the scope of work and your preferences." },
      { step: 2, title: "Service Proposal", description: "You'll receive a proposal outlining visit frequency, tasks included, and pricing." },
      { step: 3, title: "Regular Maintenance", description: "Scheduled visits for mowing, pruning, weeding, and general upkeep." },
      { step: 4, title: "Seasonal Work", description: "Additional services like fertilising, pest control, and replanting as needed." },
    ],
    warningSignsPoorQuality: [
      "Over-pruning trees and shrubs",
      "Not adjusting irrigation for seasonal changes",
      "Using excessive pesticides instead of integrated pest management",
      "Damaging plants with incorrect cutting techniques",
      "Not clearing debris properly after visits",
    ],
    questionsToAsk: [
      "What's included in the monthly service?",
      "Do you have experience with Mediterranean gardens?",
      "How do you handle irrigation management?",
      "Can you advise on drought-resistant planting?",
      "Do you dispose of green waste or is that extra?",
    ],
    faqs: [
      {
        question: "What plants work best on the Costa del Sol?",
        answer: "Mediterranean natives like bougainvillea, oleander, lavender, and olive trees thrive with minimal water. Avoid water-hungry plants like lawns in large areas - consider artificial grass or gravel alternatives."
      },
      {
        question: "How often should my garden be maintained?",
        answer: "Small gardens: fortnightly. Large properties: weekly. During peak summer growth, more frequent visits may be needed. Winter visits can often be reduced."
      },
      {
        question: "Is automatic irrigation worth installing?",
        answer: "Absolutely. Installation costs €960-3,000 depending on garden size, but saves water, time, and keeps plants healthy during hot summers. It's essential if you're away for extended periods."
      },
    ],
    relatedTrades: ["pool-maintenance", "builder", "fencing"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.6, totalJobs: 1987, verifiedPros: 112 },
  },
  locksmith: {
    slug: "locksmith",
    title: "Locksmith",
    metaTitle: "Locksmith Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does a locksmith cost in Spain? Complete 2025 price guide for emergency access, lock changes, and security on the Costa del Sol.",
    icon: Lock,
    heroImage: "/images/trades/locksmith-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Locksmith services on the Costa del Sol start at €60 for simple jobs. Emergency call-outs cost €120-290. Lock changes range from €90-180 per lock.",
    avgHourlyRate: { low: 48, high: 85, avg: 65 },
    callOutFee: { low: 120, high: 290, avg: 180 },
    commonJobs: [
      { job: "Emergency Call-out (daytime)", lowPrice: 120, highPrice: 200, avgPrice: 150, timeEstimate: "30-60 mins", popular: true },
      { job: "Emergency Call-out (night/weekend)", lowPrice: 180, highPrice: 350, avgPrice: 250, timeEstimate: "30-60 mins", popular: true },
      { job: "Standard Lock Change", lowPrice: 90, highPrice: 180, avgPrice: 130, timeEstimate: "30-60 mins", popular: true },
      { job: "High-Security Lock Installation", lowPrice: 180, highPrice: 420, avgPrice: 280, timeEstimate: "1-2 hours", popular: false },
      { job: "Full Property Lock Change", lowPrice: 360, highPrice: 840, avgPrice: 550, timeEstimate: "2-4 hours", popular: false },
      { job: "Safe Opening", lowPrice: 180, highPrice: 480, avgPrice: 300, timeEstimate: "1-3 hours", popular: false },
      { job: "Car Lockout", lowPrice: 90, highPrice: 180, avgPrice: 130, timeEstimate: "20-60 mins", popular: true },
      { job: "Key Cutting (standard)", lowPrice: 6, highPrice: 18, avgPrice: 12, timeEstimate: "5 mins", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Time of Call", description: "Night, weekend, and holiday call-outs typically cost 50-100% more than daytime rates.", icon: Clock },
      { factor: "Lock Type", description: "High-security locks, anti-bump cylinders, and smart locks cost more to supply and fit.", icon: Lock },
      { factor: "Entry Method", description: "Non-destructive entry (picking) costs more but preserves your lock. Drilling is cheaper but requires replacement.", icon: Target },
      { factor: "Property Type", description: "Villas with multiple entry points and garages cost more for full security upgrades.", icon: Home },
    ],
    whatToExpect: [
      { step: 1, title: "Initial Contact", description: "Describe your situation. A reputable locksmith will give an estimated price range over the phone." },
      { step: 2, title: "Assessment", description: "The locksmith assesses the situation and confirms the price before starting work." },
      { step: 3, title: "Work Completion", description: "The lock is opened/changed and the locksmith ensures everything is working properly." },
      { step: 4, title: "Payment & Receipt", description: "You receive a receipt detailing the work done and any warranty on new locks installed." },
    ],
    warningSignsPoorQuality: [
      "No upfront price estimate",
      "Unmarked van or no identification",
      "Immediately suggests drilling without trying non-destructive methods",
      "Dramatically increases price once work has started",
      "Cannot provide a receipt or invoice",
    ],
    questionsToAsk: [
      "What's the total cost including call-out and labour?",
      "Can you open it without damaging the lock?",
      "What brand of locks do you recommend?",
      "Is there a warranty on the new lock?",
      "Do you provide an invoice/receipt?",
    ],
    faqs: [
      {
        question: "What should I do if I'm locked out at night?",
        answer: "Call a 24-hour locksmith. Expect to pay €180-350 for night/weekend service. Always ask for a price estimate before they arrive. Keep a spare key with a trusted neighbour to avoid future lockouts."
      },
      {
        question: "Should I change locks when buying a property?",
        answer: "Yes, always. You don't know how many copies of keys exist. A full property lock change costs €360-840 but provides peace of mind. Consider high-security locks for main entry points."
      },
      {
        question: "What are anti-snap locks?",
        answer: "Euro cylinder locks can be snapped from outside, a common burglary technique in Spain. Anti-snap locks have reinforced break points. They cost €90-150 per lock and are highly recommended."
      },
    ],
    relatedTrades: ["electrician", "builder", "handyman"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.5, totalJobs: 1456, verifiedPros: 67 },
  },
  "solar-installation": {
    slug: "solar-installation",
    title: "Solar Installation",
    metaTitle: "Solar Panel Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much do solar panels cost in Spain? Complete 2025 price guide for solar installation on the Costa del Sol. Panels, batteries, and maintenance.",
    icon: Sun,
    heroImage: "/images/trades/solar-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Solar installation on the Costa del Sol costs €4,800-8,500 for a standard home system. With battery storage, expect €9,600-18,000. ROI is typically 5-8 years.",
    avgHourlyRate: { low: 48, high: 72, avg: 60 },
    callOutFee: { low: 120, high: 180, avg: 145 },
    commonJobs: [
      { job: "3kW System (6-8 panels)", lowPrice: 4800, highPrice: 6600, avgPrice: 5600, timeEstimate: "1-2 days", popular: true },
      { job: "5kW System (10-12 panels)", lowPrice: 6600, highPrice: 9000, avgPrice: 7600, timeEstimate: "1-2 days", popular: true },
      { job: "10kW System (20-24 panels)", lowPrice: 12000, highPrice: 18000, avgPrice: 14500, timeEstimate: "2-3 days", popular: false },
      { job: "Battery Storage (5kWh)", lowPrice: 3600, highPrice: 6000, avgPrice: 4600, timeEstimate: "1 day", popular: true },
      { job: "Battery Storage (10kWh)", lowPrice: 6600, highPrice: 10800, avgPrice: 8400, timeEstimate: "1 day", popular: false },
      { job: "Hybrid Inverter Upgrade", lowPrice: 1800, highPrice: 3600, avgPrice: 2600, timeEstimate: "Half day", popular: false },
      { job: "Annual Maintenance", lowPrice: 120, highPrice: 240, avgPrice: 170, timeEstimate: "2-3 hours", popular: true },
      { job: "Panel Cleaning (per visit)", lowPrice: 90, highPrice: 180, avgPrice: 130, timeEstimate: "1-2 hours", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+20-30%", note: "Premium installations", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+10-20%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Inland areas", modifier: "-5-10%", note: "Slightly lower", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "System Size", description: "Larger systems have better value per kW but require higher upfront investment.", icon: Sun },
      { factor: "Roof Type", description: "Flat roofs may need mounting frames. Tile roofs require careful installation.", icon: Home },
      { factor: "Battery Choice", description: "Lithium batteries (LiFePO4) cost more but last 10+ years vs 5-7 for lead-acid.", icon: Target },
      { factor: "Grid Connection", description: "Connecting to sell excess power requires permits and approved inverters, adding €300-600.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Site Survey", description: "The installer assesses roof orientation, shading, electrical capacity, and your energy usage." },
      { step: 2, title: "System Design", description: "A tailored proposal with expected energy production, costs, and ROI calculations." },
      { step: 3, title: "Installation", description: "Panels mounted, inverter installed, and system connected. Usually 1-3 days." },
      { step: 4, title: "Commissioning", description: "System tested, monitoring set up, and you're trained on how to track performance." },
    ],
    warningSignsPoorQuality: [
      "No site survey before quoting",
      "Unable to explain system sizing calculations",
      "Using unknown brand panels or inverters",
      "No structural assessment of roof",
      "Won't provide performance guarantees",
    ],
    questionsToAsk: [
      "What brands of panels and inverters do you use?",
      "What's the expected annual energy production?",
      "Is the price including permits and grid connection?",
      "What warranties are provided?",
      "Can you show me similar installations you've completed?",
    ],
    faqs: [
      {
        question: "How much can I save with solar in Spain?",
        answer: "A typical 5kW system produces 7,500-8,500 kWh/year on the Costa del Sol. With electricity at €0.15-0.25/kWh, savings are €1,100-2,100/year. Most systems pay for themselves in 5-8 years."
      },
      {
        question: "Do I need batteries?",
        answer: "Not necessarily. Without batteries, you use solar during the day and grid at night. Batteries add €3,600-10,800 but provide backup power and maximize self-consumption. Best for properties with evening/night usage."
      },
      {
        question: "Can I sell excess electricity to the grid?",
        answer: "Yes, through 'compensación simplificada'. You won't get paid cash, but excess energy reduces your bill. Maximum compensation is limited to your consumption, so oversizing isn't beneficial for profit."
      },
    ],
    relatedTrades: ["electrician", "builder", "ac-repair"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.9, totalJobs: 1234, verifiedPros: 78 },
  },
  "bathroom-fitter": {
    slug: "bathroom-fitter",
    title: "Bathroom Fitter",
    metaTitle: "Bathroom Renovation Costs Costa del Sol 2025 | Price Guide",
    metaDescription: "How much does a bathroom renovation cost in Spain? Complete 2025 price guide for bathroom fitting on the Costa del Sol. Full renovations, tiling, and plumbing.",
    icon: Home,
    heroImage: "/images/trades/bathroom-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Bathroom renovation on the Costa del Sol costs €4,500-10,000+ for a complete refit. A basic refresh costs €1,800-3,600. Labour typically accounts for 40-50% of total costs.",
    avgHourlyRate: { low: 30, high: 50, avg: 38 },
    callOutFee: { low: 120, high: 180, avg: 145 },
    commonJobs: [
      { job: "Full Bathroom Renovation (small)", lowPrice: 4500, highPrice: 7200, avgPrice: 5600, timeEstimate: "1-2 weeks", popular: true },
      { job: "Full Bathroom Renovation (large)", lowPrice: 7200, highPrice: 12000, avgPrice: 9000, timeEstimate: "2-3 weeks", popular: true },
      { job: "Luxury Bathroom Refit", lowPrice: 12000, highPrice: 24000, avgPrice: 17000, timeEstimate: "3-4 weeks", popular: false },
      { job: "Shower Room Installation", lowPrice: 2400, highPrice: 4800, avgPrice: 3400, timeEstimate: "4-7 days", popular: true },
      { job: "Walk-in Shower Conversion", lowPrice: 1800, highPrice: 4200, avgPrice: 2800, timeEstimate: "3-5 days", popular: true },
      { job: "Bathroom Tiling (per m²)", lowPrice: 48, highPrice: 85, avgPrice: 65, timeEstimate: "Varies", popular: false },
      { job: "Vanity Unit Installation", lowPrice: 300, highPrice: 720, avgPrice: 480, timeEstimate: "Half day", popular: false },
      { job: "Underfloor Heating (bathroom)", lowPrice: 600, highPrice: 1200, avgPrice: 850, timeEstimate: "1 day", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Fixture Quality", description: "Budget sanitaryware costs €500-1,000. Premium brands like Roca or Duravit cost €2,000-5,000+.", icon: Home },
      { factor: "Layout Changes", description: "Moving plumbing locations significantly increases costs. Keeping existing layout saves money.", icon: Target },
      { factor: "Tile Choice", description: "Basic tiles cost €15-30/m². Natural stone or designer tiles can cost €80-200/m².", icon: Wrench },
      { factor: "Waterproofing", description: "Proper tanking (waterproofing) is essential in wet areas and adds €300-600 to the job.", icon: Droplets },
    ],
    whatToExpect: [
      { step: 1, title: "Design Consultation", description: "Discuss your vision, budget, and requirements. The fitter will measure and assess existing plumbing." },
      { step: 2, title: "Detailed Quote", description: "Receive a breakdown of labour, materials, and fixtures with a timeline for completion." },
      { step: 3, title: "Strip Out & Prep", description: "Old fixtures removed, walls prepared, and any plumbing modifications made." },
      { step: 4, title: "Installation & Finishing", description: "New fixtures installed, tiling completed, and final connections made." },
    ],
    warningSignsPoorQuality: [
      "Not waterproofing wet areas properly",
      "Poor tile work with uneven grout lines",
      "Visible plumbing connections that should be concealed",
      "Not testing all fixtures before sign-off",
      "No attention to ventilation requirements",
    ],
    questionsToAsk: [
      "Will you handle all trades (plumbing, tiling, electrical)?",
      "What waterproofing method do you use?",
      "Are fixtures and materials included in the quote?",
      "How long will my bathroom be out of use?",
      "What warranty do you provide on the work?",
    ],
    faqs: [
      {
        question: "How long does a bathroom renovation take?",
        answer: "A small bathroom typically takes 1-2 weeks. Larger bathrooms or those with layout changes take 2-3 weeks. Add time if you're waiting for specific fixtures to be ordered."
      },
      {
        question: "Should I buy fixtures myself or through the fitter?",
        answer: "Either works. Buying yourself gives more control but means coordinating deliveries. Many fitters offer trade discounts that offset their markup. Ensure sizes and specs are agreed before purchasing."
      },
      {
        question: "Is underfloor heating worth it?",
        answer: "In a bathroom, absolutely. Electric mats cost €600-1,200 installed and provide comfortable warmth. Running costs are minimal for a small bathroom space."
      },
    ],
    relatedTrades: ["plumber", "tiler", "electrician"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.7, totalJobs: 1678, verifiedPros: 94 },
  },
  handyman: {
    slug: "handyman",
    title: "Handyman",
    metaTitle: "Handyman Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does a handyman cost in Spain? Complete 2025 price guide for general repairs and odd jobs on the Costa del Sol.",
    icon: Wrench,
    heroImage: "/images/trades/handyman-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Handyman services on the Costa del Sol cost €25-48/hour. Minimum call-out is typically €60-95 for the first hour. Most jobs can be completed in 2-4 hours.",
    avgHourlyRate: { low: 25, high: 48, avg: 36 },
    callOutFee: { low: 60, high: 95, avg: 75 },
    commonJobs: [
      { job: "First Hour (minimum charge)", lowPrice: 60, highPrice: 95, avgPrice: 75, timeEstimate: "1 hour", popular: true },
      { job: "Additional Hours", lowPrice: 25, highPrice: 48, avgPrice: 36, timeEstimate: "Per hour", popular: true },
      { job: "Furniture Assembly", lowPrice: 48, highPrice: 120, avgPrice: 80, timeEstimate: "1-3 hours", popular: true },
      { job: "TV/Shelf Mounting", lowPrice: 48, highPrice: 95, avgPrice: 70, timeEstimate: "1-2 hours", popular: true },
      { job: "Door Repair/Adjustment", lowPrice: 60, highPrice: 145, avgPrice: 95, timeEstimate: "1-2 hours", popular: false },
      { job: "Minor Plumbing (tap washer, etc)", lowPrice: 48, highPrice: 95, avgPrice: 70, timeEstimate: "30-60 mins", popular: false },
      { job: "Picture/Mirror Hanging", lowPrice: 36, highPrice: 72, avgPrice: 50, timeEstimate: "30-60 mins", popular: false },
      { job: "Half Day Rate (4 hours)", lowPrice: 145, highPrice: 220, avgPrice: 175, timeEstimate: "4 hours", popular: true },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Job Complexity", description: "Simple jobs are charged hourly. Complex jobs may require a fixed quote.", icon: Target },
      { factor: "Materials", description: "Basic materials (screws, brackets) often included. Larger items charged extra.", icon: Wrench },
      { factor: "Property Access", description: "High-rise apartments or difficult access may incur additional charges.", icon: Home },
      { factor: "Multiple Jobs", description: "Booking multiple small jobs in one visit is more cost-effective than separate calls.", icon: Clock },
    ],
    whatToExpect: [
      { step: 1, title: "Job Description", description: "Describe the work needed. Simple jobs can be quoted over the phone; complex jobs may need a visit." },
      { step: 2, title: "Pricing Agreement", description: "Agree on hourly rate or fixed price before work begins. Ask about material costs." },
      { step: 3, title: "Work Completion", description: "The handyman completes the job, tests everything, and cleans up." },
      { step: 4, title: "Payment", description: "Pay on completion. Request a receipt for your records." },
    ],
    warningSignsPoorQuality: [
      "No clear pricing before starting work",
      "Taking on jobs beyond their competence",
      "Not bringing proper tools for the job",
      "Rushing and leaving mess behind",
      "Unable to provide references or reviews",
    ],
    questionsToAsk: [
      "What's your hourly rate and minimum charge?",
      "Are basic materials included?",
      "Can you handle all the jobs I've listed?",
      "How long do you estimate it will take?",
      "Do you have insurance?",
    ],
    faqs: [
      {
        question: "What's the difference between a handyman and a specialist?",
        answer: "Handymen handle general repairs and odd jobs. For specialist work (electrical, plumbing, gas), use a qualified tradesperson. Good handymen know their limits and will recommend specialists when needed."
      },
      {
        question: "How do I get the best value from a handyman?",
        answer: "Batch multiple small jobs into one visit to maximize the minimum call-out fee. Prepare a clear list of what needs doing and have any materials ready if possible."
      },
      {
        question: "Should I buy materials or let the handyman supply them?",
        answer: "For specific items (particular shelf, fixture), buy yourself. For basic supplies (screws, brackets, fillers), handymen usually include these or charge cost price."
      },
    ],
    relatedTrades: ["painter", "carpenter", "builder"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.5, totalJobs: 4532, verifiedPros: 234 },
  },
  roofer: {
    slug: "roofer",
    title: "Roofer",
    metaTitle: "Roofer Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does a roofer cost in Spain? Complete 2025 price guide for roof repairs, replacements, and waterproofing on the Costa del Sol.",
    icon: Home,
    heroImage: "/images/trades/roofer-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Roofing work on the Costa del Sol costs €175-300/day for general repairs. Flat roof waterproofing costs €36-72/m². A full roof replacement costs €85-145/m².",
    avgHourlyRate: { low: 30, high: 48, avg: 38 },
    callOutFee: { low: 120, high: 200, avg: 155 },
    commonJobs: [
      { job: "Daily Rate (Roofer)", lowPrice: 175, highPrice: 300, avgPrice: 220, timeEstimate: "8 hours", popular: true },
      { job: "Tile Replacement (per tile)", lowPrice: 24, highPrice: 48, avgPrice: 35, timeEstimate: "15-30 mins", popular: false },
      { job: "Flat Roof Waterproofing (per m²)", lowPrice: 36, highPrice: 72, avgPrice: 52, timeEstimate: "Varies", popular: true },
      { job: "Terrace Waterproofing (per m²)", lowPrice: 42, highPrice: 85, avgPrice: 60, timeEstimate: "Varies", popular: true },
      { job: "Gutter Cleaning & Repair", lowPrice: 120, highPrice: 300, avgPrice: 200, timeEstimate: "2-4 hours", popular: false },
      { job: "Full Roof Replacement (per m²)", lowPrice: 85, highPrice: 145, avgPrice: 110, timeEstimate: "1-2 weeks", popular: false },
      { job: "Chimney Repair", lowPrice: 240, highPrice: 720, avgPrice: 450, timeEstimate: "1-2 days", popular: false },
      { job: "Solar Panel Flashing", lowPrice: 180, highPrice: 360, avgPrice: 260, timeEstimate: "2-4 hours", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Inland/Rural", modifier: "-5-10%", note: "Slightly lower", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Roof Type", description: "Flat roofs are easier to access. Pitched tile roofs require more skill and safety equipment.", icon: Home },
      { factor: "Access Height", description: "Multi-storey buildings may require scaffolding, adding €1,000-3,000+ to the project.", icon: Target },
      { factor: "Material Choice", description: "Traditional Spanish tiles cost more than concrete tiles. Premium waterproofing materials cost 50-100% more.", icon: Wrench },
      { factor: "Extent of Damage", description: "Surface repairs are cheaper than structural work. Water damage often reveals hidden issues.", icon: Droplets },
    ],
    whatToExpect: [
      { step: 1, title: "Roof Inspection", description: "The roofer will safely access your roof to assess the condition and identify all issues." },
      { step: 2, title: "Detailed Report", description: "You'll receive a report outlining problems found and recommended repairs with costs." },
      { step: 3, title: "Work Schedule", description: "Weather-dependent work is scheduled. Most roofing is best done in dry conditions." },
      { step: 4, title: "Completion & Testing", description: "Work is completed and tested (water test for flat roofs) before sign-off." },
    ],
    warningSignsPoorQuality: [
      "Not inspecting the roof before quoting",
      "Using incompatible waterproofing materials",
      "Not addressing underlying causes of leaks",
      "Leaving debris in gutters or on roof",
      "No guarantee on waterproofing work",
    ],
    questionsToAsk: [
      "Can you show me exactly where the problem is?",
      "What waterproofing system do you recommend?",
      "How long will the repair last?",
      "Do you guarantee the work against leaks?",
      "Will you check and clean the gutters too?",
    ],
    faqs: [
      {
        question: "Why does my flat roof keep leaking?",
        answer: "Spanish flat roofs often have inadequate waterproofing. Common issues include cracked membranes, failed flashings around pipes/walls, and poor drainage. A comprehensive waterproofing system costs €36-72/m² but solves the problem long-term."
      },
      {
        question: "How often should I check my roof?",
        answer: "Annual inspections are recommended, ideally before the rainy season (October-November). Check after storms for visible damage. Prevention is much cheaper than emergency repairs."
      },
      {
        question: "Can damaged tiles be matched?",
        answer: "Traditional Spanish tiles can often be matched, though aged patina may differ. Some areas have reclamation yards with old tiles. Modern tiles are easier to match. Your roofer can advise on the best approach."
      },
    ],
    relatedTrades: ["builder", "plumber", "painter"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.6, totalJobs: 987, verifiedPros: 56 },
  },
  tiler: {
    slug: "tiler",
    title: "Tiler",
    metaTitle: "Tiler Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does a tiler cost in Spain? Complete 2025 price guide for floor and wall tiling on the Costa del Sol.",
    icon: Home,
    heroImage: "/images/trades/tiler-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Tiling costs on the Costa del Sol range from €28-52/m² for labour. Premium tile installation costs €48-85/m². A bathroom retile costs €960-2,400 for labour.",
    avgHourlyRate: { low: 28, high: 45, avg: 35 },
    callOutFee: { low: 120, high: 180, avg: 145 },
    commonJobs: [
      { job: "Standard Floor Tiling (per m²)", lowPrice: 28, highPrice: 42, avgPrice: 35, timeEstimate: "Varies", popular: true },
      { job: "Wall Tiling (per m²)", lowPrice: 32, highPrice: 52, avgPrice: 40, timeEstimate: "Varies", popular: true },
      { job: "Large Format Tiles (60x60+)", lowPrice: 38, highPrice: 60, avgPrice: 48, timeEstimate: "Varies", popular: false },
      { job: "Natural Stone Tiling (per m²)", lowPrice: 48, highPrice: 85, avgPrice: 65, timeEstimate: "Varies", popular: false },
      { job: "Bathroom Floor & Walls", lowPrice: 960, highPrice: 2400, avgPrice: 1600, timeEstimate: "3-5 days", popular: true },
      { job: "Kitchen Splashback", lowPrice: 360, highPrice: 720, avgPrice: 500, timeEstimate: "1 day", popular: true },
      { job: "Terrace/Outdoor Tiling (per m²)", lowPrice: 38, highPrice: 60, avgPrice: 48, timeEstimate: "Varies", popular: false },
      { job: "Grout Cleaning/Renewal (per m²)", lowPrice: 12, highPrice: 24, avgPrice: 17, timeEstimate: "Varies", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Tile Size", description: "Large format tiles (60x60+) require more skill and specialist tools, increasing labour costs.", icon: Target },
      { factor: "Tile Type", description: "Porcelain and natural stone are harder to cut and lay than ceramic, adding to costs.", icon: Wrench },
      { factor: "Surface Preparation", description: "Uneven floors need screeding (€18-36/m²). Old tiles may need removal (€12-24/m²).", icon: Home },
      { factor: "Pattern Complexity", description: "Diagonal layouts, borders, and intricate patterns increase labour time by 20-50%.", icon: Clock },
    ],
    whatToExpect: [
      { step: 1, title: "Site Visit & Quote", description: "The tiler assesses the area, discusses tile choice, and provides a detailed quote." },
      { step: 2, title: "Surface Preparation", description: "Existing surfaces are prepared - old tiles removed, floors levelled, walls made flat." },
      { step: 3, title: "Tiling", description: "Tiles are laid from the centre outwards for symmetry. Cuts are made for edges and obstacles." },
      { step: 4, title: "Grouting & Finishing", description: "Grout is applied, cleaned off, and the area is sealed if required." },
    ],
    warningSignsPoorQuality: [
      "Uneven tile spacing or lippage (edges not flush)",
      "Hollow-sounding tiles (inadequate adhesive)",
      "Crooked grout lines",
      "Chips or cracks from poor cutting",
      "Not waterproofing wet areas before tiling",
    ],
    questionsToAsk: [
      "Is surface preparation included in the quote?",
      "Do you supply adhesive and grout or should I?",
      "How will you handle cuts around obstacles?",
      "What wastage percentage should I allow for?",
      "Will you seal the grout afterwards?",
    ],
    faqs: [
      {
        question: "How much tile wastage should I allow?",
        answer: "For straight layouts, allow 10% extra. For diagonal or complex patterns, allow 15-20%. Keep a few spare tiles for future repairs - matching tiles can be impossible years later."
      },
      {
        question: "Can I tile over existing tiles?",
        answer: "Yes, if existing tiles are firmly attached and level. The surface needs grinding for adhesion. This saves €12-24/m² removal costs but raises the floor height by ~10mm."
      },
      {
        question: "What size grout joints should I have?",
        answer: "For most tiles, 2-3mm joints are standard. Large format tiles often use 1.5-2mm. Outdoor tiles need wider joints (3-5mm) to allow for expansion. Your tiler can advise."
      },
    ],
    relatedTrades: ["bathroom-fitter", "builder", "painter"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.7, totalJobs: 1567, verifiedPros: 89 },
  },
  carpenter: {
    slug: "carpenter",
    title: "Carpenter",
    metaTitle: "Carpenter Costs Costa del Sol 2025 | Price Guide & Rates",
    metaDescription: "How much does a carpenter cost in Spain? Complete 2025 price guide for carpentry on the Costa del Sol. Fitted furniture, doors, and custom work.",
    icon: Hammer,
    heroImage: "/images/trades/carpenter-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Carpentry costs on the Costa del Sol range from €150-250/day. Fitted wardrobes cost €600-1,800/linear metre. Custom kitchen cabinets cost €2,400-6,000+.",
    avgHourlyRate: { low: 28, high: 42, avg: 34 },
    callOutFee: { low: 150, high: 250, avg: 190 },
    commonJobs: [
      { job: "Daily Rate (Carpenter)", lowPrice: 150, highPrice: 250, avgPrice: 190, timeEstimate: "8 hours", popular: true },
      { job: "Fitted Wardrobe (per linear metre)", lowPrice: 600, highPrice: 1800, avgPrice: 1100, timeEstimate: "Varies", popular: true },
      { job: "Internal Door Supply & Fit", lowPrice: 240, highPrice: 480, avgPrice: 340, timeEstimate: "2-4 hours", popular: true },
      { job: "Custom Shelving Unit", lowPrice: 480, highPrice: 1200, avgPrice: 800, timeEstimate: "1-2 days", popular: false },
      { job: "Kitchen Cabinet Installation", lowPrice: 1200, highPrice: 3600, avgPrice: 2200, timeEstimate: "2-5 days", popular: true },
      { job: "Wooden Deck/Terrace (per m²)", lowPrice: 120, highPrice: 240, avgPrice: 175, timeEstimate: "Varies", popular: false },
      { job: "Window/Door Frame Repair", lowPrice: 120, highPrice: 360, avgPrice: 220, timeEstimate: "2-4 hours", popular: false },
      { job: "Custom Furniture (bespoke)", lowPrice: 960, highPrice: 4800, avgPrice: 2400, timeEstimate: "1-4 weeks", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Malaga City", modifier: "-5-10%", note: "More competition", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Material Choice", description: "MDF/chipboard is cheapest. Solid wood costs 2-3x more. Premium hardwoods even more.", icon: Wrench },
      { factor: "Finish Quality", description: "Paint-grade finish is cheapest. Lacquer, veneer, or natural wood finish costs more.", icon: Target },
      { factor: "Complexity", description: "Simple box construction is cheaper than curved elements, intricate details, or unusual shapes.", icon: Home },
      { factor: "Installation Location", description: "Awkward spaces (sloped ceilings, alcoves) require more custom work and time.", icon: Clock },
    ],
    whatToExpect: [
      { step: 1, title: "Consultation & Measure", description: "The carpenter visits to discuss your requirements and take precise measurements." },
      { step: 2, title: "Design & Quote", description: "You receive drawings or 3D renders with a detailed breakdown of costs." },
      { step: 3, title: "Fabrication", description: "Items are made in the workshop to your specifications." },
      { step: 4, title: "Installation", description: "Fitted on-site, adjusted for perfect fit, and any finishing touches completed." },
    ],
    warningSignsPoorQuality: [
      "Gaps between fitted furniture and walls",
      "Doors that don't close properly",
      "Visible screw heads that should be concealed",
      "Poor quality hinges and fittings",
      "Uneven surfaces or rough finishes",
    ],
    questionsToAsk: [
      "What materials will you use?",
      "Can I see examples of similar work?",
      "Are soft-close hinges and runners included?",
      "How long is the warranty on the work?",
      "Will you dispose of old furniture/materials?",
    ],
    faqs: [
      {
        question: "Bespoke or flat-pack fitted wardrobes?",
        answer: "Flat-pack (IKEA, etc.) is cheaper (€200-600/metre installed) but limited in configurations. Bespoke costs €600-1,800/metre but maximizes space, matches any style, and lasts longer. For awkward spaces, bespoke is usually better value."
      },
      {
        question: "How long do fitted wardrobes take to install?",
        answer: "A single wardrobe typically takes 1-2 days to install. A full bedroom of built-ins takes 3-5 days. Workshop fabrication adds 2-4 weeks lead time."
      },
      {
        question: "What wood is best for outdoor use?",
        answer: "Teak, iroko, and accoya are naturally rot-resistant. Treated pine is cheaper but needs regular maintenance. Composite decking (wood/plastic mix) requires minimal maintenance but has a different aesthetic."
      },
    ],
    relatedTrades: ["builder", "painter", "handyman"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.6, totalJobs: 1234, verifiedPros: 78 },
  },
  fencing: {
    slug: "fencing",
    title: "Fencing & Gates",
    metaTitle: "Fencing & Gates Costs Costa del Sol 2025 | Price Guide",
    metaDescription: "How much does fencing cost in Spain? Complete 2025 price guide for fencing and gate installation on the Costa del Sol.",
    icon: Home,
    heroImage: "/images/trades/fencing-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Fencing on the Costa del Sol costs €60-145/linear metre depending on type. Metal railings cost €120-240/m. Electric gates cost €2,400-6,000 installed.",
    avgHourlyRate: { low: 28, high: 42, avg: 34 },
    callOutFee: { low: 120, high: 180, avg: 145 },
    commonJobs: [
      { job: "Chain Link Fencing (per m)", lowPrice: 42, highPrice: 72, avgPrice: 55, timeEstimate: "Varies", popular: false },
      { job: "Wooden Panel Fencing (per m)", lowPrice: 72, highPrice: 145, avgPrice: 100, timeEstimate: "Varies", popular: true },
      { job: "Metal Railing Fencing (per m)", lowPrice: 120, highPrice: 240, avgPrice: 170, timeEstimate: "Varies", popular: true },
      { job: "Block Wall with Railings (per m)", lowPrice: 180, highPrice: 360, avgPrice: 260, timeEstimate: "Varies", popular: false },
      { job: "Single Pedestrian Gate", lowPrice: 360, highPrice: 960, avgPrice: 600, timeEstimate: "1 day", popular: true },
      { job: "Double Driveway Gate (manual)", lowPrice: 1200, highPrice: 3000, avgPrice: 2000, timeEstimate: "1-2 days", popular: false },
      { job: "Electric Gate System", lowPrice: 2400, highPrice: 6000, avgPrice: 3800, timeEstimate: "2-3 days", popular: true },
      { job: "Gate Motor Installation", lowPrice: 960, highPrice: 2400, avgPrice: 1600, timeEstimate: "1 day", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+30-40%", note: "Premium rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-30%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Rural/Inland", modifier: "-10-15%", note: "Slightly lower", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Fence Type", description: "Chain link is cheapest, wooden panels mid-range, ornamental metal most expensive.", icon: Home },
      { factor: "Ground Conditions", description: "Rocky soil requires more work for post holes. Slopes need stepped or raked panels.", icon: Target },
      { factor: "Height & Security", description: "Taller fences (2m+) cost more. Security features like anti-climb spikes add €24-48/m.", icon: Lock },
      { factor: "Gate Automation", description: "Electric gates require electrical work, intercom integration, and safety features.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Site Survey", description: "The installer assesses the terrain, measures the perimeter, and discusses style options." },
      { step: 2, title: "Quotation", description: "You receive a detailed quote covering materials, labour, and any groundwork needed." },
      { step: 3, title: "Installation", description: "Posts are set in concrete, panels/rails attached, and gates hung and adjusted." },
      { step: 4, title: "Finishing", description: "Gates tested, locks fitted, and electric systems commissioned if applicable." },
    ],
    warningSignsPoorQuality: [
      "Posts not set deep enough in concrete",
      "Panels not level or properly aligned",
      "Gates that don't swing freely",
      "Electric gates without safety sensors",
      "Using untreated wood for outdoor fencing",
    ],
    questionsToAsk: [
      "How deep will the posts be set?",
      "What's the warranty on materials and workmanship?",
      "For electric gates, what safety features are included?",
      "Will the fence cope with the local winds?",
      "What maintenance will be required?",
    ],
    faqs: [
      {
        question: "Do I need planning permission for a fence?",
        answer: "In Spain, fences under 2m generally don't need permission. Higher fences or those on boundaries may require neighbour agreement or permits. In urbanizations, community rules often dictate fence styles. Always check before installing."
      },
      {
        question: "What's the best fencing for coastal areas?",
        answer: "Salt air corrodes untreated metal quickly. Galvanized and powder-coated steel, aluminium, or composite materials work best. Traditional wrought iron needs regular painting. Wood should be hardwood or treated softwood."
      },
      {
        question: "How long do electric gates last?",
        answer: "Quality systems (BFT, CAME, Nice) last 15-20+ years with proper maintenance. Annual servicing (€95-180) extends lifespan. Budget systems may fail within 5-7 years. Motors typically need replacement before the gates themselves."
      },
    ],
    relatedTrades: ["builder", "electrician", "gardener"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.6, totalJobs: 876, verifiedPros: 45 },
  },
  "cleaning-services": {
    slug: "cleaning-services",
    title: "Cleaning Services",
    metaTitle: "Cleaning Services Costs Costa del Sol 2025 | Price Guide",
    metaDescription: "How much do cleaning services cost in Spain? Complete 2025 price guide for domestic, commercial & end-of-tenancy cleaning on the Costa del Sol.",
    icon: Sparkles,
    heroImage: "/images/trades/cleaning-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Cleaning services on the Costa del Sol range from €14-25/hour for domestic cleaning. End-of-tenancy cleans cost €180-480. Commercial cleaning starts from €0.80/m².",
    avgHourlyRate: { low: 14, high: 25, avg: 18 },
    callOutFee: { low: 0, high: 0, avg: 0 },
    commonJobs: [
      { job: "Regular Domestic Cleaning (per hour)", lowPrice: 14, highPrice: 25, avgPrice: 18, timeEstimate: "2-4 hours", popular: true },
      { job: "Deep Clean (2-Bed Apartment)", lowPrice: 145, highPrice: 290, avgPrice: 200, timeEstimate: "4-6 hours", popular: true },
      { job: "Deep Clean (3-Bed Villa)", lowPrice: 240, highPrice: 480, avgPrice: 340, timeEstimate: "6-8 hours", popular: true },
      { job: "End of Tenancy Clean (Apartment)", lowPrice: 180, highPrice: 360, avgPrice: 260, timeEstimate: "4-6 hours", popular: true },
      { job: "End of Tenancy Clean (Villa)", lowPrice: 300, highPrice: 600, avgPrice: 420, timeEstimate: "6-10 hours", popular: false },
      { job: "After-Builders Clean", lowPrice: 240, highPrice: 720, avgPrice: 420, timeEstimate: "6-12 hours", popular: false },
      { job: "Oven Deep Clean", lowPrice: 48, highPrice: 95, avgPrice: 72, timeEstimate: "1-2 hours", popular: false },
      { job: "Window Cleaning (per window)", lowPrice: 6, highPrice: 14, avgPrice: 9, timeEstimate: "Varies", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+25-35%", note: "Premium area rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+15-25%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Inland Areas", modifier: "-10-15%", note: "Lower cost of living", trend: "down" },
    ],
    factorsAffectingCost: [
      { factor: "Property Size", description: "Larger properties take more time. Most cleaners quote per hour or by property size.", icon: Home },
      { factor: "Cleaning Frequency", description: "Regular weekly cleans often get 10-15% discount vs one-off bookings.", icon: Clock },
      { factor: "Level of Dirt", description: "End of tenancy, after-builders, or neglected properties require more time.", icon: Target },
      { factor: "Supplies Included", description: "Some cleaners bring supplies (+10-15%), others use yours.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Initial Visit/Quote", description: "Most cleaners visit first to assess the property and provide an accurate quote." },
      { step: 2, title: "Agreement", description: "Agree on frequency, tasks covered, and whether supplies are provided." },
      { step: 3, title: "Cleaning Day", description: "Cleaner arrives at agreed time. You can be present or provide key access." },
      { step: 4, title: "Quality Check", description: "Walk-through to ensure satisfaction. Good cleaners welcome feedback." },
    ],
    warningSignsPoorQuality: [
      "No references or reviews available",
      "Significantly below market rates",
      "No clear list of what's included",
      "Unable to provide proof of insurance",
      "Reluctant to show ID or provide contract",
    ],
    questionsToAsk: [
      "What's included in the standard clean?",
      "Do you bring your own supplies and equipment?",
      "Are you insured for working in properties?",
      "What's your cancellation policy?",
      "Can you provide references from local clients?",
    ],
    faqs: [
      {
        question: "Should I tip my cleaner in Spain?",
        answer: "Tipping isn't expected but appreciated for excellent work. If you're happy with regular service, many clients give a bonus at Christmas (equivalent to one week's pay is common). For one-off jobs, rounding up or €10-20 extra for exceptional work is appreciated."
      },
      {
        question: "What's the difference between a deep clean and regular clean?",
        answer: "Regular cleans maintain cleanliness - dusting, vacuuming, mopping, bathroom/kitchen cleaning. Deep cleans are more intensive - inside appliances, behind furniture, limescale removal, detailed window frames, etc. Most properties need a deep clean first, then regular maintenance."
      },
      {
        question: "Do cleaners work autonomos (self-employed) in Spain?",
        answer: "Professional cleaners should be registered as autonomo or work for a registered company. This ensures they have liability insurance and legal status. Cheaper 'cash in hand' options exist but offer no protection if things go wrong."
      },
    ],
    relatedTrades: ["handyman", "gardener", "pool-maintenance"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.8, totalJobs: 4521, verifiedPros: 71 },
  },
  removals: {
    slug: "removals",
    title: "Removals & Transport",
    metaTitle: "Removals Costs Costa del Sol 2025 | Moving Price Guide",
    metaDescription: "How much do removals cost in Spain? Complete 2025 price guide for house moves, furniture delivery & storage on the Costa del Sol.",
    icon: Home,
    heroImage: "/images/trades/removals-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Local removals on the Costa del Sol cost €280-850 for a typical apartment move. UK to Spain moves cost €3,600-9,600. Storage starts from €60/month.",
    avgHourlyRate: { low: 35, high: 55, avg: 42 },
    callOutFee: { low: 0, high: 0, avg: 0 },
    commonJobs: [
      { job: "Studio/1-Bed Local Move", lowPrice: 180, highPrice: 360, avgPrice: 260, timeEstimate: "2-4 hours", popular: false },
      { job: "2-Bed Apartment Local Move", lowPrice: 280, highPrice: 540, avgPrice: 400, timeEstimate: "4-6 hours", popular: true },
      { job: "3-Bed Villa Local Move", lowPrice: 480, highPrice: 960, avgPrice: 680, timeEstimate: "6-10 hours", popular: true },
      { job: "Single Item Delivery", lowPrice: 48, highPrice: 145, avgPrice: 85, timeEstimate: "1-2 hours", popular: true },
      { job: "Man & Van (per hour)", lowPrice: 35, highPrice: 55, avgPrice: 42, timeEstimate: "Per hour", popular: true },
      { job: "UK to Costa del Sol Move", lowPrice: 3600, highPrice: 9600, avgPrice: 6000, timeEstimate: "1-2 weeks", popular: false },
      { job: "Packing Service (per room)", lowPrice: 60, highPrice: 120, avgPrice: 85, timeEstimate: "1-2 hours", popular: false },
      { job: "Storage (per month, 10m²)", lowPrice: 60, highPrice: 145, avgPrice: 95, timeEstimate: "Monthly", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+20-30%", note: "Premium area", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+15-20%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Long Distance (Madrid, Barcelona)", modifier: "+€600-1,200", note: "Based on distance", trend: "up" },
    ],
    factorsAffectingCost: [
      { factor: "Volume of Items", description: "More furniture and boxes means bigger truck and more staff needed.", icon: Home },
      { factor: "Access Difficulty", description: "No lift, narrow stairs, or limited parking adds time and complexity.", icon: Target },
      { factor: "Distance", description: "Local moves are cheaper. Interregional or international moves cost significantly more.", icon: Clock },
      { factor: "Packing Required", description: "Professional packing adds €60-120 per room but protects valuables.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Survey/Quote", description: "Most companies visit or do a video call to assess volume and access." },
      { step: 2, title: "Booking", description: "Confirm date, deposit paid, and access details for both properties arranged." },
      { step: 3, title: "Moving Day", description: "Team arrives with appropriate vehicle(s). Furniture protected and loaded carefully." },
      { step: 4, title: "Delivery", description: "Items placed in correct rooms at destination. Walk-through to check for damage." },
    ],
    warningSignsPoorQuality: [
      "Quote significantly cheaper than competitors",
      "No insurance or unwilling to show proof",
      "Requesting full payment upfront",
      "No written contract or inventory",
      "Poor or no reviews available online",
    ],
    questionsToAsk: [
      "What's your insurance cover for damage?",
      "Will you provide an inventory list?",
      "What happens if something is damaged?",
      "Are there any additional charges (stairs, long carry)?",
      "How many staff will be on the move?",
    ],
    faqs: [
      {
        question: "How far in advance should I book a removal?",
        answer: "For local moves, 1-2 weeks is usually sufficient. For international moves (UK to Spain), book 4-8 weeks ahead, especially during busy seasons (spring/autumn). End of month is always busiest - mid-month dates offer more availability."
      },
      {
        question: "Do I need to empty drawers and wardrobes?",
        answer: "Most movers prefer drawers emptied as it makes furniture lighter and safer to carry. Wardrobe rails can usually stay as-is if items are secure. Ask your specific company - some include this in their service."
      },
      {
        question: "What about moving my car to Spain?",
        answer: "Car transport from the UK costs €960-1,800 depending on collection/delivery points. Alternatively, drive it yourself (budget €200-400 for fuel/tolls). You'll need to re-register the car in Spain within 30 days of becoming resident."
      },
    ],
    relatedTrades: ["handyman", "cleaning-services", "builder"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.7, totalJobs: 2134, verifiedPros: 54 },
  },
  "security-alarms": {
    slug: "security-alarms",
    title: "Security & Alarms",
    metaTitle: "Security & Alarm Costs Costa del Sol 2025 | Price Guide",
    metaDescription: "How much do security systems cost in Spain? Complete 2025 price guide for CCTV, alarm systems & smart security on the Costa del Sol.",
    icon: Lock,
    heroImage: "/images/trades/security-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Alarm systems on the Costa del Sol cost €600-2,500 installed. CCTV systems range from €720-3,600. Monitored alarm services cost €25-65/month.",
    avgHourlyRate: { low: 42, high: 65, avg: 52 },
    callOutFee: { low: 95, high: 180, avg: 132 },
    commonJobs: [
      { job: "Basic Alarm System (4 zones)", lowPrice: 600, highPrice: 1200, avgPrice: 850, timeEstimate: "Half day", popular: true },
      { job: "Full Alarm System (8+ zones)", lowPrice: 1200, highPrice: 2500, avgPrice: 1700, timeEstimate: "1 day", popular: true },
      { job: "CCTV System (4 cameras)", lowPrice: 720, highPrice: 1800, avgPrice: 1150, timeEstimate: "1 day", popular: true },
      { job: "CCTV System (8 cameras)", lowPrice: 1440, highPrice: 3600, avgPrice: 2300, timeEstimate: "1-2 days", popular: false },
      { job: "Video Doorbell Installation", lowPrice: 180, highPrice: 420, avgPrice: 280, timeEstimate: "2-3 hours", popular: true },
      { job: "Smart Lock Installation", lowPrice: 240, highPrice: 600, avgPrice: 380, timeEstimate: "2-3 hours", popular: false },
      { job: "Alarm Monitoring (monthly)", lowPrice: 25, highPrice: 65, avgPrice: 42, timeEstimate: "Monthly", popular: true },
      { job: "Annual Alarm Service", lowPrice: 95, highPrice: 180, avgPrice: 132, timeEstimate: "1-2 hours", popular: false },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+25-35%", note: "High demand area", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+20-25%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Rural Properties", modifier: "+10-20%", note: "Travel time added", trend: "up" },
    ],
    factorsAffectingCost: [
      { factor: "Property Size", description: "Larger properties need more sensors, cameras, and zones to cover adequately.", icon: Home },
      { factor: "Wired vs Wireless", description: "Wireless is faster to install. Wired is more reliable but requires more labour.", icon: Target },
      { factor: "Monitoring Required", description: "Professional monitoring adds €25-65/month but provides rapid response.", icon: Clock },
      { factor: "Integration", description: "Integrating with smart home systems or existing systems adds complexity.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Security Survey", description: "Installer assesses property vulnerabilities and recommends appropriate system." },
      { step: 2, title: "Quote & Design", description: "Detailed quote with equipment specifications and placement plan." },
      { step: 3, title: "Installation", description: "Equipment installed, programmed, and tested. User codes created." },
      { step: 4, title: "Training", description: "Full demonstration of system operation, app setup, and what to do in emergencies." },
    ],
    warningSignsPoorQuality: [
      "Pushing unnecessary equipment",
      "No mention of Grade 2/3 certification",
      "Very cheap Chinese equipment with no local support",
      "No written maintenance agreement",
      "Unable to explain monitoring response times",
    ],
    questionsToAsk: [
      "Is the system Grade 2 certified for insurance purposes?",
      "What's the monitoring centre response time?",
      "What happens if the internet/power goes out?",
      "Can I access the system remotely?",
      "What's included in annual maintenance?",
    ],
    faqs: [
      {
        question: "Do I need a Grade 2 alarm for insurance?",
        answer: "Many Spanish insurers require Grade 2 EN 50131 certified alarms for full cover, especially for higher-value properties. Grade 2 systems have battery backup, tamper detection, and certified components. Always check with your insurer before installing."
      },
      {
        question: "Are smart doorbells worth it in Spain?",
        answer: "Absolutely. With many expats splitting time between countries, video doorbells (Ring, Eufy, Aqara) let you see visitors remotely. They also record package deliveries. Budget €180-420 installed, or DIY for €120-240."
      },
      {
        question: "Should I choose monitored or self-monitored?",
        answer: "Monitored alarms (€25-65/month) mean professionals respond to alerts 24/7 and contact emergency services. Self-monitored saves the monthly fee but you're responsible for responding. For holiday homes, monitoring is strongly recommended."
      },
    ],
    relatedTrades: ["electrician", "locksmith", "builder"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.8, totalJobs: 1567, verifiedPros: 51 },
  },
  "pest-control": {
    slug: "pest-control",
    title: "Pest Control",
    metaTitle: "Pest Control Costs Costa del Sol 2025 | Price Guide",
    metaDescription: "How much does pest control cost in Spain? Complete 2025 price guide for insect, rodent & preventive treatments on the Costa del Sol.",
    icon: Target,
    heroImage: "/images/trades/pest-hero.jpg",
    color: "teal",
    accentColor: "#0d9488",
    summary: "Pest control on the Costa del Sol costs €75-220 for single treatments. Annual contracts for preventive treatment cost €180-480/year. Termite treatment costs €600-2,400.",
    avgHourlyRate: { low: 0, high: 0, avg: 0 },
    callOutFee: { low: 75, high: 145, avg: 108 },
    commonJobs: [
      { job: "General Pest Treatment (one-off)", lowPrice: 75, highPrice: 180, avgPrice: 120, timeEstimate: "1-2 hours", popular: true },
      { job: "Cockroach Treatment", lowPrice: 95, highPrice: 180, avgPrice: 132, timeEstimate: "1-2 hours", popular: true },
      { job: "Ant Treatment", lowPrice: 75, highPrice: 145, avgPrice: 102, timeEstimate: "1-2 hours", popular: true },
      { job: "Wasp Nest Removal", lowPrice: 72, highPrice: 180, avgPrice: 120, timeEstimate: "1 hour", popular: true },
      { job: "Rodent Treatment", lowPrice: 120, highPrice: 290, avgPrice: 190, timeEstimate: "Multiple visits", popular: false },
      { job: "Termite Inspection", lowPrice: 120, highPrice: 240, avgPrice: 168, timeEstimate: "2-3 hours", popular: false },
      { job: "Termite Treatment", lowPrice: 600, highPrice: 2400, avgPrice: 1320, timeEstimate: "1-3 days", popular: false },
      { job: "Annual Prevention Contract", lowPrice: 180, highPrice: 480, avgPrice: 300, timeEstimate: "3-4 visits/year", popular: true },
    ],
    regionalPricing: [
      { area: "Marbella / Puerto Banus", modifier: "+20-30%", note: "Premium area rates", trend: "up" },
      { area: "Estepona / Sotogrande", modifier: "+15-20%", note: "Above average", trend: "up" },
      { area: "Fuengirola / Benalmadena", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Mijas / La Cala", modifier: "Standard", note: "Baseline pricing", trend: "neutral" },
      { area: "Rural/Countryside", modifier: "Standard to +10%", note: "May need travel supplement", trend: "neutral" },
    ],
    factorsAffectingCost: [
      { factor: "Pest Type", description: "Cockroaches and ants are cheaper. Termites and bed bugs require specialist treatment.", icon: Target },
      { factor: "Property Size", description: "Larger properties need more product and time for thorough treatment.", icon: Home },
      { factor: "Infestation Severity", description: "Heavy infestations may require multiple treatments at additional cost.", icon: Clock },
      { factor: "Access Requirements", description: "Difficult access areas (crawl spaces, roof voids) add to the cost.", icon: Wrench },
    ],
    whatToExpect: [
      { step: 1, title: "Inspection", description: "Technician identifies pest type, entry points, and severity of problem." },
      { step: 2, title: "Treatment Plan", description: "Recommendations for treatment type and frequency explained." },
      { step: 3, title: "Treatment", description: "Products applied safely with guidance on any precautions needed." },
      { step: 4, title: "Follow-up", description: "Recheck visit if needed. Advice on preventing future infestations." },
    ],
    warningSignsPoorQuality: [
      "Won't explain what products they're using",
      "No proper protective equipment worn",
      "Promises instant results for complex problems",
      "No written report or treatment record",
      "Not registered with health authorities",
    ],
    questionsToAsk: [
      "What products will you use and are they safe for pets?",
      "How many treatments will be needed?",
      "Is there a warranty if pests return?",
      "What precautions do I need to take?",
      "Are you registered with local health authorities?",
    ],
    faqs: [
      {
        question: "Are cockroaches common on the Costa del Sol?",
        answer: "Yes, the warm Mediterranean climate suits cockroaches. They're especially active in summer. Regular preventive treatment (3-4 times yearly) is common for ground floor properties. Don't be embarrassed - it's normal here regardless of cleanliness."
      },
      {
        question: "How do I know if I have termites?",
        answer: "Signs include hollow-sounding wood, mud tubes on walls, discarded wings near windows, and frass (termite droppings). Spanish homes with wooden beams are particularly vulnerable. Annual inspections cost €120-240 and are recommended for older properties."
      },
      {
        question: "Is pest control safe for my pets?",
        answer: "Modern treatments are generally pet-safe once dry (usually 2-4 hours). Gel baits and traps are safer around pets than sprays. Always inform your technician about pets - they can use pet-friendly products and advise on any precautions."
      },
    ],
    relatedTrades: ["gardener", "builder", "cleaning-services"],
    popularLocations: ["marbella", "estepona", "fuengirola", "mijas", "benalmadena"],
    stats: { avgRating: 4.7, totalJobs: 1892, verifiedPros: 10 },
  },
};

// Type definitions
interface PriceRange {
  low: number;
  high: number;
  avg: number;
}

interface CommonJob {
  job: string;
  lowPrice: number;
  highPrice: number;
  avgPrice: number;
  timeEstimate: string;
  popular: boolean;
}

interface RegionalPrice {
  area: string;
  modifier: string;
  note: string;
  trend: "up" | "down" | "neutral";
}

interface CostFactor {
  factor: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TradeStats {
  avgRating: number;
  totalJobs: number;
  verifiedPros: number;
}

interface TradeGuide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  heroImage: string;
  color: string;
  accentColor: string;
  summary: string;
  avgHourlyRate: PriceRange;
  callOutFee: PriceRange;
  commonJobs: CommonJob[];
  regionalPricing: RegionalPrice[];
  factorsAffectingCost: CostFactor[];
  whatToExpect: ProcessStep[];
  warningSignsPoorQuality: string[];
  questionsToAsk: string[];
  faqs: FAQ[];
  relatedTrades: string[];
  popularLocations: string[];
  stats: TradeStats;
}

// Color configurations - Premium teal/cyan theme for Costa del Sol
const colorConfig: Record<string, { bg: string; bgLight: string; bgGradient: string; text: string; border: string; ring: string }> = {
  teal: {
    bg: "bg-teal-600",
    bgLight: "bg-teal-50",
    bgGradient: "from-teal-600 to-cyan-600",
    text: "text-teal-700",
    border: "border-teal-200",
    ring: "ring-teal-500/20"
  },
  cyan: {
    bg: "bg-cyan-600",
    bgLight: "bg-cyan-50",
    bgGradient: "from-cyan-600 to-blue-600",
    text: "text-cyan-700",
    border: "border-cyan-200",
    ring: "ring-cyan-500/20"
  },
  emerald: {
    bg: "bg-emerald-600",
    bgLight: "bg-emerald-50",
    bgGradient: "from-emerald-600 to-teal-600",
    text: "text-emerald-700",
    border: "border-emerald-200",
    ring: "ring-emerald-500/20"
  },
  slate: {
    bg: "bg-slate-700",
    bgLight: "bg-slate-50",
    bgGradient: "from-slate-700 to-slate-900",
    text: "text-slate-700",
    border: "border-slate-200",
    ring: "ring-slate-500/20"
  },
  blue: {
    bg: "bg-blue-600",
    bgLight: "bg-blue-50",
    bgGradient: "from-blue-600 to-indigo-600",
    text: "text-blue-700",
    border: "border-blue-200",
    ring: "ring-blue-500/20"
  },
};

export default function TradeCostGuidePage({ params }: { params: Promise<{ trade: string }> }) {
  const { trade: tradeSlug } = use(params);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all");

  const trade = tradeData[tradeSlug];

  if (!trade) {
    notFound();
  }

  const colors = colorConfig[trade.color] || colorConfig.sky;
  const Icon = trade.icon;
  const filteredJobs = activeTab === "popular"
    ? trade.commonJobs.filter(j => j.popular)
    : trade.commonJobs;

  return (
    <div className="min-h-screen bg-white">
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": trade.metaTitle,
            "description": trade.metaDescription,
            "author": { "@type": "Organization", "name": "CostaTrades" },
            "publisher": {
              "@type": "Organization",
              "name": "CostaTrades"
            },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://costatrades.com/cost-guides/${trade.slug}` }
          })
        }}
      />

      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />

        <div className="relative">
          {/* Top bar with breadcrumb */}
          <div className="border-b border-white/10">
            <div className="container-custom py-4">
              <nav className="flex items-center gap-2 text-sm">
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <Link href="/cost-guides" className="text-slate-400 hover:text-white transition-colors">Cost Guides</Link>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className="text-white font-medium">{trade.title}</span>
              </nav>
            </div>
          </div>

          {/* Main hero content */}
          <div className="container-custom py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left column - Content */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-3">
                  <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", colors.bgGradient)}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-white">2025 Price Guide</span>
                  </div>
                </div>

                {/* Main heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                    How Much Does an{" "}
                    <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", colors.bgGradient)}>
                      {trade.title}
                    </span>{" "}
                    Cost?
                  </h1>
                  <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                    Complete pricing guide for {trade.title.toLowerCase()} services on the Costa del Sol, Spain.
                  </p>
                </div>

                {/* Key stats row */}
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Euro className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">€{trade.avgHourlyRate.avg}<span className="text-base font-normal text-slate-400">/hr</span></p>
                      <p className="text-sm text-slate-400">Average rate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{trade.stats.avgRating}</p>
                      <p className="text-sm text-slate-400">Avg. rating</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{trade.stats.verifiedPros}+</p>
                      <p className="text-sm text-slate-400">Verified pros</p>
                    </div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/post-job">
                    <Button size="lg" className={cn("bg-gradient-to-r text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all px-8 py-6 text-lg font-semibold rounded-xl", colors.bgGradient)}>
                      Get Free Quotes
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0a1f44] px-8 py-6 text-lg rounded-xl transition-colors"
                    onClick={() => document.getElementById("price-table")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    View All Prices
                  </Button>
                </div>
              </div>

              {/* Right column - Price summary card */}
              <div className="relative">
                {/* Floating decorative card */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl opacity-20 blur-xl" />

                <div className="relative bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
                  {/* Card header */}
                  <div className={cn("bg-gradient-to-r p-6", colors.bgGradient)}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-sm font-medium">Quick Price Summary</p>
                        <p className="text-white text-2xl font-bold mt-1">{trade.title} Costs</p>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Calculator className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 space-y-4">
                    {/* Price rows */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", colors.bgLight)}>
                          <Timer className={cn("w-5 h-5", colors.text)} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Hourly Rate</p>
                          <p className="text-sm text-slate-500">Standard work</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-slate-900">€{trade.avgHourlyRate.low}-{trade.avgHourlyRate.high}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", colors.bgLight)}>
                          <Phone className={cn("w-5 h-5", colors.text)} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Call-out Fee</p>
                          <p className="text-sm text-slate-500">First visit</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-slate-900">€{trade.callOutFee.low}-{trade.callOutFee.high}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Average Cost</p>
                          <p className="text-sm text-slate-500">Per hour</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-emerald-600">€{trade.avgHourlyRate.avg}</p>
                    </div>

                    {/* Trust badges */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <BadgeCheck className="w-4 h-4 text-emerald-500" />
                          <span>Verified professionals</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span>Fully insured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="container-custom py-6">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">ID Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">4.8 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">Fast Response</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                <Award className="w-4 h-4 text-violet-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">{trade.stats.totalJobs.toLocaleString()}+ Jobs Completed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICE TABLE SECTION ============ */}
      <section id="price-table" className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4", colors.bgLight)}>
                <CircleDollarSign className={cn("w-4 h-4", colors.text)} />
                <span className={cn("text-sm font-semibold", colors.text)}>Detailed Pricing</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {trade.title} Price List 2025
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Transparent pricing for common {trade.title.toLowerCase()} services on the Costa del Sol
              </p>
            </div>

            {/* Tab filters */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setActiveTab("all")}
                  className={cn(
                    "px-6 py-2.5 rounded-lg text-sm font-medium transition-all",
                    activeTab === "all" ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  All Services
                </button>
                <button
                  onClick={() => setActiveTab("popular")}
                  className={cn(
                    "px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                    activeTab === "popular" ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </button>
              </div>
            </div>

            {/* Price table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-4 p-5 bg-slate-50 border-b border-slate-200">
                <div className="col-span-5 md:col-span-5">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</span>
                </div>
                <div className="col-span-2 text-center hidden md:block">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">From</span>
                </div>
                <div className="col-span-2 text-center hidden md:block">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">To</span>
                </div>
                <div className="col-span-5 md:col-span-2 text-center">
                  <span className={cn("text-xs font-semibold uppercase tracking-wider", colors.text)}>Average</span>
                </div>
                <div className="col-span-2 md:col-span-1 text-center hidden md:block">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</span>
                </div>
              </div>

              {/* Table body */}
              <div className="divide-y divide-slate-100">
                {filteredJobs.map((job, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 p-5 hover:bg-slate-50/50 transition-colors items-center group"
                  >
                    <div className="col-span-5 md:col-span-5">
                      <div className="flex items-center gap-3">
                        {job.popular && (
                          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-500" />
                        )}
                        <span className="font-medium text-slate-900 group-hover:text-slate-700">{job.job}</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-center hidden md:block">
                      <span className="text-slate-500">€{job.lowPrice}</span>
                    </div>
                    <div className="col-span-2 text-center hidden md:block">
                      <span className="text-slate-500">€{job.highPrice}</span>
                    </div>
                    <div className="col-span-5 md:col-span-2 text-center">
                      <span className={cn("inline-flex items-center justify-center px-3 py-1.5 rounded-lg font-bold text-lg", colors.bgLight, colors.text)}>
                        €{job.avgPrice}
                      </span>
                    </div>
                    <div className="col-span-2 md:col-span-1 text-center hidden md:block">
                      <span className="text-sm text-slate-400">{job.timeEstimate}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">
                    * Prices are estimates for Costa del Sol. Actual costs may vary by location and requirements.
                  </p>
                  <Link href="/post-job">
                    <Button className={cn("bg-gradient-to-r text-white", colors.bgGradient)}>
                      Get Exact Quote
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ REGIONAL PRICING ============ */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center", colors.bgGradient)}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className={cn("px-3 py-1 rounded-full text-xs font-semibold", colors.bgLight, colors.text)}>
                    Location Guide
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  Regional Price Variations
                </h2>
                <p className="text-lg text-slate-600">
                  Prices vary across the Costa del Sol based on demand and location
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trade.regionalPricing.map((region, idx) => (
                <div
                  key={idx}
                  className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors flex-shrink-0">
                      <MapPin className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{region.area}</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 flex-1">{region.note}</p>
                  <div className="flex items-center justify-end">
                    <span className={cn(
                      "text-sm font-bold px-4 py-2 rounded-lg min-w-[90px] text-center",
                      region.trend === "up" ? "bg-rose-100 text-rose-700" :
                      region.trend === "down" ? "bg-emerald-100 text-emerald-700" :
                      "bg-slate-100 text-slate-700"
                    )}>
                      {region.modifier}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FACTORS AFFECTING COST ============ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4", colors.bgLight)}>
                <TrendingUp className={cn("w-4 h-4", colors.text)} />
                <span className={cn("text-sm font-semibold", colors.text)}>Cost Factors</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                What Affects the Price?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Understanding these factors helps you budget accurately for your project
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {trade.factorsAffectingCost.map((factor, idx) => {
                const FactorIcon = factor.icon;
                return (
                  <div
                    key={idx}
                    className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all"
                  >
                    <div className="flex gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform", colors.bgGradient)}>
                        <FactorIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{factor.factor}</h3>
                        <p className="text-slate-600 leading-relaxed">{factor.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT TO EXPECT ============ */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-4">
                <FileText className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">The Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What to Expect When Hiring
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                A typical {trade.title.toLowerCase()} job follows these steps
              </p>
            </div>

            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden lg:block" />

              <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
                {trade.whatToExpect.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Step number */}
                    <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl font-bold text-white mb-6 mx-auto lg:mx-0", colors.bgGradient)}>
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center lg:text-left">{step.title}</h3>
                    <p className="text-slate-400 text-center lg:text-left leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RED FLAGS & QUESTIONS ============ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Warning Signs */}
              <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-8 border border-rose-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 text-rose-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Red Flags</h2>
                    <p className="text-slate-600">Warning signs to watch for</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {trade.warningSignsPoorQuality.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                      </div>
                      <span className="text-slate-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Questions to Ask */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <HelpCircle className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Questions to Ask</h2>
                    <p className="text-slate-600">Before hiring a {trade.title.toLowerCase()}</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {trade.questionsToAsk.map((question, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-white/60 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ SECTION ============ */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4", colors.bgLight)}>
                <HelpCircle className={cn("w-4 h-4", colors.text)} />
                <span className={cn("text-sm font-semibold", colors.text)}>FAQs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600">
                Common questions about {trade.title.toLowerCase()} costs in Spain
              </p>
            </div>

            {/* FAQ Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": trade.faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
                  }))
                })
              }}
            />

            <div className="space-y-4">
              {trade.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                      openFaq === idx ? colors.bg + " text-white" : "bg-slate-100 text-slate-600"
                    )}>
                      <ChevronDown className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        openFaq === idx && "rotate-180"
                      )} />
                    </div>
                  </button>
                  <div className={cn(
                    "overflow-hidden transition-all duration-300",
                    openFaq === idx ? "max-h-96" : "max-h-0"
                  )}>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-24 overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-br", colors.bgGradient)} />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />

        {/* Decorative blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Free & No Obligation</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Quotes from Verified {trade.title}s?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Post your job for free and receive competitive quotes from trusted professionals on the Costa del Sol.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/post-job">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all w-full sm:w-auto">
                  Post Your Job Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href={`/post-job?trade=${trade.slug}`}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0a1f44] px-10 py-6 text-lg rounded-xl w-full sm:w-auto transition-colors">
                  Find {trade.title}s Near You
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">No obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Verified pros only</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5" />
                <span className="text-sm">Compare quotes easily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RELATED GUIDES ============ */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Related Cost Guides
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(tradeData)
                .filter(([key]) => key !== trade.slug)
                .slice(0, 5)
                .map(([key, t]) => (
                  <Link
                    key={key}
                    href={`/cost-guides/${key}`}
                    className="group px-6 py-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-slate-700 hover:text-slate-900 font-medium"
                  >
                    <span className="flex items-center gap-2">
                      {t.title} Costs
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </Link>
                ))
              }
              <Link
                href="/cost-guides"
                className={cn("px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r hover:shadow-lg transition-all", colors.bgGradient)}
              >
                View All Guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
