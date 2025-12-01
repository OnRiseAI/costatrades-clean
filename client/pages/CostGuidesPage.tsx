"use client";

import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  AlertTriangle,
  Info,
  Hammer,
  Zap,
  Droplets,
  Paintbrush,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { SEO } from "@/components/SEO";

export default function CostGuidesPage() {
  const priceData = [
    { service: "Plumber (Call-out)", low: "€80", high: "€180", avg: "€140" },
    {
      service: "Electrician (Rewire 2-Bed)",
      low: "€3,000",
      high: "€5,000",
      avg: "€4,200",
    },
    {
      service: "Pool Maintenance (Monthly)",
      low: "€100",
      high: "€200",
      avg: "€130",
    },
    {
      service: "Painter (Exterior Villa)",
      low: "€2,500",
      high: "€6,000",
      avg: "€4,000",
    },
    {
      service: "Air Conditioning (Split Unit Install)",
      low: "€250",
      high: "€600",
      avg: "€400",
    },
    { service: "Tiler (Per m²)", low: "€25", high: "€45", avg: "€35" },
    {
      service: "Carpenter (Daily Rate)",
      low: "€150",
      high: "€250",
      avg: "€200",
    },
    { service: "Gardener (Hourly)", low: "€20", high: "€35", avg: "€25" },
    {
      service: "Locksmith (Emergency)",
      low: "€100",
      high: "€250",
      avg: "€160",
    },
    {
      service: "Solar Panel System (3kW)",
      low: "€4,000",
      high: "€6,000",
      avg: "€5,000",
    },
    {
      service: "Bathroom Renovation (Full)",
      low: "€4,000",
      high: "€8,000",
      avg: "€6,000",
    },
    {
      service: "Kitchen Installation (Labor only)",
      low: "€1,500",
      high: "€3,000",
      avg: "€2,200",
    },
    { service: "Handyman (Hourly)", low: "€30", high: "€50", avg: "€40" },
    {
      service: "Architect (Project Fee %)",
      low: "8%",
      high: "15%",
      avg: "12%",
    },
    { service: "Cleaner (Hourly)", low: "€12", high: "€18", avg: "€15" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEO
        title="2025 Trade Price Guide | Costa del Sol"
        description="2025 Costa del Sol Price Guides. How much should you pay for builders, plumbers, and painters? Avoid the 'tourist tax' with real market rates."
      />
      {/* 1. Hero & Summary */}
      <section className="relative py-20 md:py-28 px-4 text-center overflow-hidden bg-[#0a1f44] text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f44] to-[#0d2550]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        </div>

        <div className="container-custom max-w-4xl relative z-10 mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-100">
              Market Insights
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            2025 Costa del Sol{" "}
            <span className="text-blue-400">Trade Price Guide</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            The definitive guide to renovation and repair costs in Marbella,
            Estepona, and Mijas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/post-job">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-900/20 w-full sm:w-auto"
              >
                Get a Quote Now
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm w-full sm:w-auto"
              onClick={() =>
                document
                  .getElementById("price-list")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Price List
            </Button>
          </div>
        </div>
      </section>

      {/* 2. The "Master Price List" */}
      <section id="price-list" className="py-20 -mt-10 relative z-20 px-4">
        <div className="container-custom max-w-5xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-2">
                Master Price List
              </h2>
              <p className="text-slate-600">
                Average market rates for common trade services in Southern
                Spain.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-6 font-semibold text-slate-700 whitespace-nowrap">
                      Service
                    </th>
                    <th className="p-6 font-semibold text-slate-700 whitespace-nowrap">
                      Low Estimate
                    </th>
                    <th className="p-6 font-semibold text-slate-700 whitespace-nowrap">
                      High Estimate
                    </th>
                    <th className="p-6 font-semibold text-blue-700 bg-blue-50/50 whitespace-nowrap">
                      Average
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {priceData.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="p-6 font-medium text-[#0a1f44] whitespace-nowrap">
                        {item.service}
                      </td>
                      <td className="p-6 text-slate-600 whitespace-nowrap">
                        {item.low}
                      </td>
                      <td className="p-6 text-slate-600 whitespace-nowrap">
                        {item.high}
                      </td>
                      <td className="p-6 font-bold text-blue-700 bg-blue-50/30 whitespace-nowrap">
                        {item.avg}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-slate-50 text-sm text-slate-500 text-center border-t border-slate-200">
              * Prices are estimates based on 2024-2025 market data and may vary
              by location and specific requirements.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: Plumbing Costs */}
      <section className="py-16 px-4">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Droplets className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-[#0a1f44]">
              Detailed Plumbing Costs in 2025
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-slate-600 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-[#0a1f44] mb-4">
                The Call-Out Fee Explained
              </h3>
              <p>
                The standard call-out fee of <strong>€150</strong> might seem
                high, but it covers the tradesperson's travel time, vehicle
                costs, insurance, and the first hour of diagnosis or labor. In
                premium areas like Marbella or Sotogrande, this fee ensures you
                get a qualified professional to your door quickly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#0a1f44] mb-4">
                  Common Job Prices
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Tap Replacement</span>
                    <span className="font-semibold">€80 - €120 + parts</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Boiler Service</span>
                    <span className="font-semibold">€100 - €150</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Leak Detection</span>
                    <span className="font-semibold">€250 - €400</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0a1f44] mb-4">
                  Regional Variations
                </h3>
                <p>
                  Expect to pay approximately <strong>20% more</strong> in
                  Marbella and Puerto Banús compared to Fuengirola or
                  Benalmádena due to higher demand and operating costs in these
                  zones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Deep Dive: Renovation & Construction */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <Hammer className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-[#0a1f44]">
              Villa & Apartment Renovation Costs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-4">
                Cost Per Square Meter
              </h3>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">
                    Basic Renovation
                  </div>
                  <div className="text-3xl font-bold text-[#0a1f44] mb-2">
                    €500
                    <span className="text-lg text-slate-400 font-normal">
                      /m²
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Standard materials, cosmetic updates, painting, and minor
                    repairs.
                  </p>
                </div>
                <div className="p-6 bg-[#0a1f44] rounded-xl border border-slate-100 text-white">
                  <div className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-1">
                    Luxury Renovation
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    €1,500+
                    <span className="text-lg text-blue-300 font-normal">
                      /m²
                    </span>
                  </div>
                  <p className="text-sm text-blue-100">
                    High-end finishes, structural changes, smart home
                    integration, and premium materials.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-4">
                The 'Hidden' Costs
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold block text-[#0a1f44]">
                      Licencia de Obra (Permits)
                    </span>
                    <span className="text-slate-600">
                      Typically 4-6% of the total project budget, paid to the
                      local Town Hall.
                    </span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold block text-[#0a1f44]">
                      Architect Fees
                    </span>
                    <span className="text-slate-600">
                      Expect to pay 10-15% of the construction cost for project
                      management and design.
                    </span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <TrendingUp className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold block text-[#0a1f44]">
                      Rubbish Removal (Cubas)
                    </span>
                    <span className="text-slate-600">
                      €150 - €250 per skip. Essential for any demolition work.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Deep Dive: Electrical & AC */}
      <section className="py-16 px-4">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-[#0a1f44]">
              Electrical & Climate Control
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-[#0a1f44] mb-4">
                Rewiring Older Properties
              </h3>
              <p className="text-slate-600 mb-4">
                Many older Spanish properties have outdated electrical systems
                that don't meet current EU safety standards. Upgrading a
                2-bedroom apartment typically costs between{" "}
                <strong>€3,000 and €5,000</strong>.
              </p>
              <p className="text-slate-600">
                This includes a new consumer unit (fuse box), cabling, and
                certification (Boletín Eléctrico).
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-[#0a1f44] mb-4">
                AC Installation
              </h3>
              <div className="space-y-4">
                <p className="text-slate-600">
                  Installing a split AC unit (indoor + outdoor) including
                  electrical work and commissioning typically ranges from{" "}
                  <strong>€250 to €600</strong> depending on unit size, mounting
                  complexity, and required electrical upgrades.
                </p>
                <p className="text-slate-600">
                  Multi-split systems or ducted installations are significantly
                  more expensive, often starting at <strong>€1,500</strong> and
                  increasing with capacity and routing requirements.
                </p>
                <p className="text-slate-600">
                  Always request a full site survey to confirm mounting options,
                  refrigerant line routing, and any additional scaffolding or
                  licences required for installation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Materials vs Labour */}
      <section className="py-16 px-4 bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <Paintbrush className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-[#0a1f44]">
              Materials vs Labour: What You Pay For
            </h2>
          </div>

          <div className="prose prose-lg text-slate-600">
            <p>
              On most projects, labour accounts for a significant portion of the
              total cost — often 40-60% depending on the trade and complexity.
              Materials can vary widely in quality and price; always ask for a
              materials list and options (standard, premium, bespoke) so you can
              compare like-for-like.
            </p>
            <ul>
              <li>
                <strong>Ask for itemised quotes:</strong> This helps you
                understand where costs are being allocated and where savings can
                be made.
              </li>
              <li>
                <strong>Bulk discounts:</strong> For larger renovations,
                professionals can often secure discounts on materials which
                should be passed on to the client.
              </li>
              <li>
                <strong>Warranties:</strong> Check warranties on both materials
                and workmanship — reputable pros will stand behind their work.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-20 px-4">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-[#0a1f44] mb-4">
            Ready to get accurate prices for your project?
          </h3>
          <p className="text-slate-600 mb-6">
            Post a job with details and receive competitive quotes from vetted
            professionals across the Costa del Sol.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/post-job">
              <Button
                size="lg"
                className="bg-[#E31E24] hover:bg-[#C41218] text-white px-8"
              >
                Post a Job
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="px-8">
                Contact an Advisor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
