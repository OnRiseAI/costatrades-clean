"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import {
  Clock,
  Calendar,
  ChevronRight,
  Share2,
  Bookmark,
  CheckCircle2,
  Quote,
  ArrowRight,
  AlertTriangle,
  Droplets,
  ArrowUpFromLine,
  CloudRain,
  FileText,
} from "lucide-react";

// Mock data for all blog posts
const blogPosts = {
  "stop-damp-mold-spain": {
    title: "Stop Damp & Mold Spain: The 2025 Guide",
    metaDescription:
      "Damp or Mold in your Spanish villa? Diagnose Condensation vs. Rising Damp. See 2025 repair costs, chemical injection prices & legal rights.",
    category: "Maintenance",
    author: "Carlos Rodriguez",
    authorRole: "Senior Surveyor",
    date: "Nov 26, 2025",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop",
    keyTakeaways: [
      "90% of mold on the Costa del Sol is Condensation caused by thermal bridging in uninsulated Spanish construction.",
      "If you see white salts (Salitre) below 1 metre, you have Rising Damp—not condensation.",
      "Bleach feeds mold by adding water; use fungicidal wash instead.",
      "Structural damp from façades or foundations is the Community's responsibility under LPH law.",
    ],
    content: (
      <>
        {/* AEO Snippet */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
          <h3 className="font-bold text-[#0a1f44] mb-2 text-lg">
            Quick Verdict
          </h3>
          <p className="text-slate-700 leading-relaxed">
            90% of mold issues on the Costa del Sol are{" "}
            <strong>Condensation</strong> caused by 'Thermal Bridging' (lack of
            insulation). However, if you see white salts (<em>Salitre</em>)
            below 1 meter, you have <strong>Rising Damp</strong>. Bleach cleans
            the mold, but only ventilation or DPC Injection cures the cause.
          </p>
        </div>

        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          Damp is the silent destroyer of Spanish homes. Whether it's the black
          spots in the bathroom or the peeling paint near the skirting boards,
          ignoring it will only make it more expensive to fix.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6 text-2xl">
          Step 1: Diagnosis – Condensation vs. Rising Damp
        </h2>

        <p className="mb-6 text-slate-700">
          Before you spend a cent on treatments, you need to correctly identify
          the type of damp. Misdiagnosis is common and expensive���many
          homeowners spend thousands on DPC injection when the real problem is
          simply condensation from poor ventilation.
        </p>

        <p className="mb-8 text-slate-700">
          In Spanish construction (<em>Ladrillo</em>), lack of cavity wall
          insulation creates <strong>'Thermal Bridges'</strong> (
          <em>Puente Térmico</em>). This is why mold forms specifically on
          concrete pillars and corners—these cold spots cause warm indoor air to
          condense. Modern homes must follow the{" "}
          <a
            href="https://www.codigotecnico.org/pdf/Documentos/HS/DBHS.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            CTE Regulations
          </a>{" "}
          for ventilation, but older villas built before 2006 often lack these
          essential airflow systems.
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 className="font-bold text-[#0a1f44] mb-3 text-lg">
              1. Condensation (<em>Condensación</em>)
            </h3>
            <p className="text-slate-700 mb-3">
              <strong>Visible Signs:</strong> Black mold spots on walls and
              ceilings (especially in bathrooms and north-facing bedrooms),
              steaming windows in the morning, musty odour, water droplets on
              tiles and glass.
            </p>
            <p className="text-slate-700 mb-3">
              <strong>The Science:</strong> Condensation forms when warm,
              moisture-laden air meets a cold surface. Spanish homes with
              single-glazed windows and uninsulated concrete frames create
              perfect conditions. Every shower, every pot of boiling pasta, even
              breathing, adds moisture to the air. If that moisture has nowhere
              to escape, it settles on the coldest surfaces—typically exterior
              walls and window frames.
            </p>
            <p className="text-slate-700">
              <strong>Lifestyle Triggers:</strong> Drying clothes indoors,
              running hot showers without ventilation, cooking without
              extraction, or using portable gas heaters (which produce water
              vapour as a by-product).
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-amber-500">
            <h3 className="font-bold text-[#0a1f44] mb-3 text-lg">
              2. Rising Damp (<em>Humedad por Capilaridad</em>)
            </h3>
            <p className="text-slate-700 mb-3">
              <strong>Visible Signs:</strong> Horizontal tide marks typically up
              to 1 metre high from floor level, peeling paint and crumbling
              plaster near skirting boards, white crystalline salt deposits (
              <em>salitre</em>), damp patches that worsen in wet weather but
              never fully dry.
            </p>
            <p className="text-slate-700 mb-3">
              <strong>The Science:</strong> Ground moisture rises through porous
              building materials via capillary action—the same mechanism that
              lets plants draw water upwards. Traditional Spanish bricks (
              <em>ladrillo</em>) are particularly vulnerable because they were
              often laid without an effective damp-proof course (DPC). As water
              evaporates from the wall surface, it leaves behind mineral salts
              which then attract more moisture, creating a vicious cycle.
            </p>
            <p className="text-slate-700">
              <strong>Structural Cause:</strong> Failed or missing DPC
              (horizontal waterproof barrier), high water table, defective
              drainage around foundations, or breached membranes due to age.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-red-500">
            <h3 className="font-bold text-[#0a1f44] mb-3 text-lg">
              3. Penetrating Damp (<em>Filtración</em>)
            </h3>
            <p className="text-slate-700 mb-3">
              <strong>Visible Signs:</strong> Damp patches at any height on
              walls (not just low down), staining that appears or worsens after
              heavy rain, localised damage around windows, doors or roof
              junctions, green algae growth on external walls.
            </p>
            <p className="text-slate-700 mb-3">
              <strong>The Science:</strong> Unlike rising damp which is driven
              by capillary action, penetrating damp is caused by water forcing
              its way through defects in the building envelope. Spanish render (
              <em>monocapa</em>) can crack over time due to thermal expansion,
              creating pathways for rainwater to seep through.
            </p>
            <p className="text-slate-700">
              <strong>Common Entry Points:</strong> Blocked or leaking gutters
              and downpipes, cracked render or missing pointing, failed seals
              around windows, damaged roof tiles, or poorly installed air
              conditioning units.
            </p>
          </div>
        </div>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6 text-2xl">
          The Health Risk: Why Damp Isn't Just Cosmetic
        </h2>

        <p className="mb-4 text-slate-700">
          Many homeowners treat mold as an aesthetic problem—an ugly stain to be
          painted over. But prolonged exposure to damp conditions is a serious
          health issue, particularly for children, elderly residents, and anyone
          with existing respiratory conditions.
        </p>

        <p className="mb-6 text-slate-700">
          According to the{" "}
          <a
            href="https://www.who.int/publications/i/item/9789289041683"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            WHO Guidelines for Indoor Air Quality
          </a>
          , persistent dampness is directly linked to increased risk of
          respiratory infections, asthma, allergic rhinitis, and eczema. Mold
          spores become airborne and are easily inhaled, triggering immune
          responses even in otherwise healthy individuals.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-xl mb-8">
          <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Vulnerable Groups
          </h3>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li>
              <strong>Infants and children:</strong> Developing immune systems
              are more susceptible to mold-related illness.
            </li>
            <li>
              <strong>Asthma sufferers:</strong> Mold spores are a known trigger
              for asthma attacks and can worsen chronic symptoms.
            </li>
            <li>
              <strong>Immunocompromised individuals:</strong> People undergoing
              chemotherapy or with autoimmune conditions face higher infection
              risk.
            </li>
            <li>
              <strong>Elderly residents:</strong> Reduced lung capacity and
              slower healing make older adults more vulnerable to complications.
            </li>
          </ul>
        </div>

        <p className="mb-8 text-slate-700">
          If you or anyone in your household experiences persistent coughing,
          wheezing, skin rashes, or frequent colds that improve when away from
          the property, damp may be the underlying cause. In these cases,
          treating the problem becomes a medical necessity, not just a
          maintenance task.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6 text-2xl">
          2025 Price Guide: Cost to Fix Damp in Malaga
        </h2>

        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm font-sans">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-[#0a1f44]">Solution</th>
                <th className="p-4 font-bold text-[#0a1f44]">Estimated Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr className="even:bg-slate-50">
                <td className="p-4 font-medium">Anti-Mold Painting</td>
                <td className="p-4 text-slate-600">€12 - €18 / m��</td>
              </tr>
              <tr className="even:bg-slate-50">
                <td className="p-4 font-medium">Dehumidifier Unit</td>
                <td className="p-4 text-slate-600">€200 - €350</td>
              </tr>
              <tr className="even:bg-slate-50">
                <td className="p-4 font-medium">Chemical Injection (DPC)</td>
                <td className="p-4 text-slate-600">€80 - €120 / m</td>
              </tr>
              <tr className="even:bg-slate-50">
                <td className="p-4 font-medium">Tanking (Waterproofing)</td>
                <td className="p-4 text-slate-600">€60 - €100 / m²</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-8 text-slate-600 text-sm">
          <strong>Why do prices vary?</strong> Chemical injection (DPC) prices
          depend heavily on wall thickness and accessibility. A standard 30 cm
          brick wall requires significantly more fluid per linear metre than a
          thin partition wall. Similarly, tanking costs fluctuate based on
          whether the surface is smooth concrete or rough stone, and whether
          scaffolding or basement access is required. Always request a site
          visit for accurate pricing—quotes given over the phone are rarely
          reliable.
        </p>

        {/* IN-CONTENT CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 my-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold !text-white mb-3">
              Need a professional opinion?
            </h3>
            <p className="!text-blue-100 mb-6">
              Don't let mold spread. Get a free inspection from verified damp
              proofing experts.
            </p>
            <Link href="/trades/builders">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-6 rounded-xl text-lg">
                Find Damp Proofing Experts{" "}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6 text-2xl">
          Who Pays? (Renters & Communities)
        </h2>

        <p className="mb-4 text-slate-700">
          Damp problems in Spain are often complicated by legal questions of
          responsibility—especially in rental properties and apartment
          communities (<em>Comunidades de Propietarios</em>).
        </p>

        <h3 className="font-bold text-[#0a1f44] mb-3 text-lg">
          Community of Owners (LPH)
        </h3>
        <p className="mb-6 text-slate-700">
          Under the{" "}
          <a
            href="https://www.boe.es/buscar/act.php?id=BOE-A-1960-10906"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Ley de Propiedad Horizontal
          </a>{" "}
          (Horizontal Property Law), structural damp originating from common
          elements—such as the façade, foundations, or shared roofs—is the legal
          responsibility of the <strong>Community of Owners</strong>, not
          individual apartment owners. If rising damp is caused by a failed DPC
          in the building's external walls, the community must approve and fund
          the repair through shared fees (<em>cuotas</em>). However, damp caused
          by internal issues within your unit (such as a leaking shower tray or
          condensation from lack of ventilation) remains your responsibility.
        </p>

        <h3 className="font-bold text-[#0a1f44] mb-3 text-lg">
          Rental Properties
        </h3>
        <p className="mb-8 text-slate-700">
          Tenants are entitled to a habitable home free from structural defects.
          If damp is caused by a building defect (failed waterproofing, broken
          gutters, etc.), the <strong>landlord is responsible</strong> for the
          repair. However, if the damp is caused by tenant behaviour—such as
          refusing to ventilate, drying laundry indoors continuously, or
          blocking air vents—the tenant may be liable. Document the issue with
          photos and notify the landlord in writing (<em>burofax</em>) to
          establish a paper trail.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6 text-2xl">
          Case Study: Ground Floor Apartment in Calahonda
        </h2>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
          <h3 className="font-bold text-[#0a1f44] mb-3 text-lg">
            Real-World Example
          </h3>
          <ul className="space-y-2 text-slate-800 text-sm mb-4">
            <li>
              <strong>Property:</strong> 2-bedroom ground-floor apartment, built
              1998.
            </li>
            <li>
              <strong>Problem:</strong> Persistent black mold behind wardrobes,
              humidity readings of <strong>85%</strong> in the master bedroom,
              musty smell throughout.
            </li>
            <li>
              <strong>Initial Misdiagnosis:</strong> Owner was quoted €2,400 for
              DPC injection by a "specialist" who never tested for rising damp.
            </li>
            <li>
              <strong>Actual Cause:</strong> Condensation due to single-glazed
              windows, no trickle vents, and concrete thermal bridging in
              corners.
            </li>
          </ul>

          <p className="text-slate-700 mb-3">
            <strong>Solution Implemented:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm mb-4">
            <li>Installed 3 trickle vents on bedroom windows (€180 total)</li>
            <li>
              Applied thermal ceramic paint (<em>Pintura Térmica</em>) to cold
              corners (€220 for materials + labour)
            </li>
            <li>Purchased a small dehumidifier for the bedroom (€160)</li>
          </ul>

          <p className="text-slate-700 font-medium">
            <strong>Result:</strong> Within 4 weeks, humidity dropped to{" "}
            <strong>55%</strong>, mold stopped reappearing, and the musty smell
            disappeared. <strong>Total cost: €560</strong>—a fraction of the
            original quote.
          </p>
        </div>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6 text-2xl">
          3 Immediate DIY Fixes
        </h2>
        <p className="mb-6 text-slate-700">
          While these steps won't cure structural damp, they can significantly
          reduce condensation-related mold and buy you time while you arrange
          professional assessment.
        </p>

        <ol className="list-decimal pl-5 space-y-6 marker:text-blue-500 text-slate-700">
          <li>
            <div>
              <strong className="text-[#0a1f44] text-lg">
                Improve Ventilation
              </strong>
              <p className="mt-2">
                This is the single most effective DIY intervention for
                condensation. Install <strong>trickle vents</strong> on window
                frames to allow continuous background ventilation without losing
                security or heat. For whole-house solutions, consider a{" "}
                <strong>PIV (Positive Input Ventilation)</strong> unit installed
                in the loft space, which gently pressurises the home with
                filtered fresh air, forcing stale humid air out through natural
                gaps. Cost: €150–€400 depending on system.
              </p>
            </div>
          </li>
          <li>
            <div>
              <strong className="text-[#0a1f44] text-lg">
                Use Fungicidal Wash (Not Bleach)
              </strong>
              <p className="mt-2 mb-3">
                Many DIY guides recommend bleach, but this is problematic.
                Bleach is mostly water—and water feeds mold. While it removes
                surface staining temporarily, bleach cannot penetrate porous
                materials like plaster or grout to kill the root structure (
                <em>mycelium</em>). Within weeks, the mold returns.
              </p>
              <p className="mb-3">
                <strong>Better solution:</strong> Use a proper{" "}
                <strong>fungicidal wash</strong> (available at any{" "}
                <em>ferretería</em> or DIY store). These contain biocides that
                kill mold spores on contact and penetrate deeper into surfaces.
                Apply with a spray bottle, leave for 15 minutes, then wipe
                clean. Always wear gloves and ensure good ventilation.
              </p>
              <p className="text-sm text-slate-600">
                <em>Important:</em> Fungicidal treatments only address the
                symptom. If you don't fix the underlying moisture problem
                (ventilation, leaks, thermal bridging), the mold will return.
              </p>
            </div>
          </li>
          <li>
            <div>
              <strong className="text-[#0a1f44] text-lg">
                Check and Clear Gutters
              </strong>
              <p className="mt-2">
                Blocked gutters are one of the most common causes of penetrating
                damp in Spanish homes. Leaves, pine needles, and dirt accumulate
                quickly, especially after autumn storms. When gutters overflow,
                water cascades down the façade, saturating render and eventually
                penetrating through cracks. Inspect your gutters twice a
                year—ideally before and after the rainy season—and clear any
                debris. Check that downpipes are securely connected and
                discharging water away from the building's foundations, not
                straight into the ground next to the wall.
              </p>
            </div>
          </li>
        </ol>

        <div className="bg-blue-50 rounded-xl p-6 mt-8 border border-blue-100">
          <h3 className="font-bold text-[#0a1f44] mb-2">
            When DIY Isn't Enough
          </h3>
          <p className="text-slate-700">
            If you've tried ventilation improvements and the mold keeps coming
            back, or if you see signs of rising damp (tide marks, salt
            deposits), it's time to call a professional. Structural damp
            requires specialist equipment—moisture meters, thermal imaging
            cameras, and chemical treatments—that aren't available to DIYers.
            Delaying professional intervention can lead to structural damage
            costing tens of thousands to repair.
          </p>
        </div>
      </>
    ),
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What causes damp in Spanish homes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The most common cause is condensation (90% of cases) due to thermal bridging in uninsulated Spanish construction (Ladrillo). Rising damp occurs when groundwater rises through porous walls due to a failed damp-proof course. Penetrating damp is caused by external water entering through cracks, leaking gutters, or damaged render.",
          },
        },
        {
          "@type": "Question",
          name: "How much does damp proofing cost in Malaga?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Chemical DPC injection costs €80-€120 per linear meter (varies by wall thickness). Tanking costs €60-€100 per m². Anti-mold paint costs €12-€18 per m². Dehumidifier units cost €200-€350. Always get a site visit for accurate pricing.",
          },
        },
        {
          "@type": "Question",
          name: "Does bleach kill mold permanently?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Bleach is mostly water and cannot penetrate porous materials like plaster to kill mold roots (mycelium). Use a proper fungicidal wash instead, which contains biocides that kill spores and penetrate deeper into surfaces.",
          },
        },
        {
          "@type": "Question",
          name: "Who is responsible for damp in a Spanish apartment community?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Under the Ley de Propiedad Horizontal (LPH), structural damp from common elements like façades, foundations, or shared roofs is the Community of Owners' responsibility. Damp from issues within your unit (e.g., leaking shower, condensation) is your responsibility.",
          },
        },
        {
          "@type": "Question",
          name: "Is damp dangerous to health?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. According to WHO guidelines, persistent dampness is directly linked to respiratory infections, asthma, allergic rhinitis, and eczema. Children, elderly residents, asthma sufferers, and immunocompromised individuals are particularly vulnerable to mold-related illness.",
          },
        },
      ],
    },
  },
  "renovation-permits-andalucia-2025": {
    title: "The Ultimate Guide to Renovation Permits in Andalucia (2025)",
    metaDescription:
      "Renovation Permits in Andalucia (2025 Guide). Do you need a license? Learn the difference between Obra Mayor vs. Obra Menor to avoid fines.",
    category: "Legal/Permits",
    author: "Maria Gonzalez",
    authorRole: "Legal Consultant",
    date: "November 12, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop",
    keyTakeaways: [
      "Most minor renovations only require a 'Licencia de Obra Menor' which is faster to obtain.",
      "Structural changes always require an architect's project and a major permit.",
      "Starting work without a permit can lead to fines of up to 300% of the project value.",
    ],
    content: (
      <>
        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          Navigating the bureaucratic landscape of Spanish construction permits
          can feel like a full-time job. Whether you're planning a simple
          bathroom refresh or a complete villa overhaul, understanding the
          difference between a <em>Licencia de Obra Mayor</em> and{" "}
          <em>Menor</em> is critical to your project's success—and your wallet.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Do I really need a permit?
        </h2>
        <p>
          The short answer is: <strong>Yes, almost always.</strong> In Spain,
          nearly any work that generates rubble or changes the appearance of a
          property requires some form of notification to the Town Hall
          (Ayuntamiento).
        </p>
        <p>
          Many foreign homeowners fall into the trap of thinking that internal
          work doesn't need permission. This is a common misconception that can
          lead to work stoppages and hefty fines.
        </p>

        <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-10 bg-slate-50 rounded-r-lg not-italic">
          <div className="flex gap-4">
            <Quote className="w-8 h-8 text-blue-200 flex-shrink-0" />
            <div>
              <p className="text-lg font-medium text-[#0a1f44] mb-2 font-sans">
                "The most common mistake I see is homeowners skipping the permit
                for 'invisible' works like rewiring. If you ever want to sell,
                that lack of paperwork will come back to haunt you."
              </p>
              <cite className="text-sm text-slate-500 font-sans not-italic">
                — Carlos Rodriguez, Senior Architect at MalagaDesign
              </cite>
            </div>
          </div>
        </blockquote>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Major vs. Minor Permits: What's the difference?
        </h2>
        <p>
          Permits are generally categorized into two types based on the
          complexity and safety implications of the work.
        </p>

        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm font-sans">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-[#0a1f44]">Permit Type</th>
                <th className="p-4 font-bold text-[#0a1f44]">Typical Works</th>
                <th className="p-4 font-bold text-[#0a1f44]">
                  Est. Cost (Tax)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="p-4 font-medium">Obra Menor (Minor)</td>
                <td className="p-4 text-slate-600">
                  Tiling, painting, changing windows (same size), plumbing
                  updates.
                </td>
                <td className="p-4 text-slate-600">3-5% of budget</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Obra Mayor (Major)</td>
                <td className="p-4 text-slate-600">
                  Extensions, new pools, structural walls, changing use
                  (commercial to residential).
                </td>
                <td className="p-4 text-slate-600">4-6% + Architect Fees</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The Application Process
        </h2>
        <p>
          For a minor permit, the process is increasingly digital. Most Town
          Halls on the Costa del Sol now allow for online submissions via their
          "Sede Electrónica". You will typically need:
        </p>
        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
          <li>Detailed quote from your contractor.</li>
          <li>Photos of the current state.</li>
          <li>Payment of the administrative fee (Tasa).</li>
          <li>Payment of the construction tax (ICIO).</li>
        </ul>

        <p className="mt-8">
          Need help navigating the process?{" "}
          <Link
            href="/post-job"
            className="text-blue-600 hover:underline font-semibold"
          >
            Find a local architect or builder
          </Link>{" "}
          who can handle the paperwork for you.
        </p>
      </>
    ),
  },
  "pool-water-update-2025": {
    title: "Costa del Sol Water Update 2025: Can I Finally Fill My Pool?",
    metaDescription:
      "2025 Pool Water Rules: Can you fill your pool on the Costa del Sol? Latest drought restrictions and refilling updates for homeowners.",
    category: "Maintenance",
    author: "Sarah Jenkins",
    authorRole: "Local News Editor",
    date: "May 15, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2940&auto=format&fit=crop",
    keyTakeaways: [
      "The ban on filling private pools has been lifted as of May 2025.",
      "Strict limits are set at 250 litres per day per property.",
      "Wasting water is still a punishable offense with significant fines.",
    ],
    content: (
      <>
        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          Good news for villa owners! As of May 2025, the Junta de Andalucía has
          officially lifted the ban on filling private pools. However, before
          you reach for the hose, there are strict new limitations you need to
          be aware of. The drought situation remains critical, and responsible
          usage is not just encouraged—it's mandated by law.
        </p>
        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The New Rules Explained
        </h2>
        <p>
          While the total ban is gone, we are still in a drought alert phase.
          The new regulations allow for the refilling of swimming pools but cap
          water usage at <strong>250 litres per person per day</strong>. This
          limit applies to all domestic usage, including showers, washing
          machines, and garden irrigation.
        </p>
        <p>
          Local police are conducting spot checks, particularly in
          high-consumption urbanizations. Exceeding your quota can result in
          fines ranging from €600 to €3,000 depending on the severity of the
          infraction.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          How to Save Water (and Avoid Fines)
        </h2>
        <p>
          Maintaining a pool in a drought-prone region requires a shift in
          mindset. Here are the most effective ways to keep your pool full
          without breaking the law:
        </p>
        <ul className="list-disc pl-5 space-y-4 marker:text-blue-500">
          <li>
            <strong>Check for leaks:</strong> A dropping water line isn't always
            evaporation. A small crack can waste thousands of litres a week. If
            you suspect a leak,{" "}
            <Link
              href="/trades/plumbers"
              className="text-blue-600 hover:underline font-semibold"
            >
              hire a leak detection specialist
            </Link>{" "}
            immediately.
          </li>
          <li>
            <strong>Install a pool cover:</strong> This is the single most
            effective water-saving measure. A good cover can reduce evaporation
            by up to 70%, saving you money and water. It also keeps the pool
            warmer and cleaner.
          </li>
          <li>
            <strong>Recycle filter water:</strong> Modern filtration systems can
            clean and reuse backwash water, rather than dumping it into the
            drain.
          </li>
          <li>
            <strong>Lower the water level:</strong> Keeping the water level
            slightly lower reduces splash-out from swimming, which can account
            for significant water loss over a summer.
          </li>
        </ul>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The Future of Pools in Andalucia
        </h2>
        <p>
          Experts predict that water restrictions will become the new normal.
          Investing in water-saving technology now will future-proof your
          property. Consider converting to a saltwater system, which requires
          less backwashing, or installing a rainwater harvesting system for
          topping up.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-8">
          <h3 className="font-bold text-[#0a1f44] mb-2">
            Need a Pool Specialist?
          </h3>
          <p className="mb-4 text-slate-600">
            Don't risk fines or damage to your pool. Find verified pool
            maintenance professionals who understand the new regulations.
          </p>
          <Link href="/trades/pool-maintenance">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Find Pool Maintenance
            </Button>
          </Link>
        </div>
      </>
    ),
  },
  "new-rental-laws-2025": {
    title: "New Rental Laws April 2025: Can Your Neighbors Ban Your Airbnb?",
    metaDescription:
      "New Rental Laws Andalucia 2025: Tourist license changes and Airbnb crackdowns. What Costa del Sol property owners must know.",
    category: "Legal/Permits",
    author: "Antonio Ruiz",
    authorRole: "Property Lawyer",
    date: "April 10, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2940&auto=format&fit=crop",
    keyTakeaways: [
      "Community of Owners can now vote to ban holiday rentals with a 3/5ths majority.",
      "The new National Registry (VUD) goes live in July 2025.",
      "Properties must meet new 'Habitability' standards including AC and heating.",
    ],
    content: (
      <>
        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          The landscape for holiday rentals in Spain is shifting. The new
          Horizontal Property Law reform has empowered communities, and a new
          national registry is on the horizon. Here is what every Airbnb host
          needs to know to protect their investment.
        </p>
        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The 3/5ths Rule: A Game Changer
        </h2>
        <p>
          Previously, banning holiday rentals in a community of owners required
          a unanimous vote—a nearly impossible threshold to meet. Now, the law
          has changed. A simple <strong>3/5ths majority</strong> of owners
          (representing 3/5ths of the participation quotas) can vote to prohibit
          vacation rentals in the building.
        </p>
        <p>
          This vote is not retroactive, meaning existing licenses are generally
          safe, but it can prevent new licenses from being issued. However, some
          legal experts warn that communities may try to impose higher community
          fees (up to 20% more) on holiday rental properties, which also
          requires a 3/5ths vote.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The New National Registry (VUD)
        </h2>
        <p>
          Starting in July 2025, Spain will implement a single "Ventanilla Única
          Digital" (VUD) for short-term rentals. This national registry aims to
          crack down on illegal listings. Platforms like Airbnb and Booking.com
          will be required to share data directly with the tax authorities.
        </p>
        <p>
          If your property is not correctly registered or does not meet the
          requirements, you risk being delisted from these major platforms
          overnight.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          New Habitability Standards
        </h2>
        <p>
          The Junta de Andalucía has also updated the quality standards for
          tourist apartments. Key requirements now include:
        </p>
        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
          <li>
            <strong>Air Conditioning:</strong> Mandatory in all living areas and
            bedrooms for properties rented between May and September.
          </li>
          <li>
            <strong>Heating:</strong> Mandatory for properties rented between
            October and April.
          </li>
          <li>
            <strong>Ventilation:</strong> Direct ventilation to the exterior or
            a patio is required for all bedrooms.
          </li>
          <li>
            <strong>First Aid Kit:</strong> Must be available in the property.
          </li>
          <li>
            <strong>Complaint Forms:</strong> Official "Hojas de Quejas y
            Reclamaciones" must be available to guests.
          </li>
        </ul>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Action Plan for Hosts
        </h2>
        <ul className="list-disc pl-5 space-y-4 marker:text-blue-500">
          <li>
            <strong>Check your community statutes:</strong> Attend the next AGM
            and ensure you are aware of any proposed votes.
          </li>
          <li>
            <strong>Upgrade your climate control:</strong> If you lack AC or
            heating,{" "}
            <Link
              href="/trades/air-conditioning"
              className="text-blue-600 hover:underline font-semibold"
            >
              get a quote for installation
            </Link>{" "}
            immediately to meet the new standards.
          </li>
          <li>
            <strong>Verify your license:</strong> Ensure your "Licencia de
            Primera Ocupación" and tourist license are up to date and correctly
            filed.
          </li>
        </ul>

        <p className="mt-8">
          Worried about compliance?{" "}
          <Link
            href="/landlords"
            className="text-blue-600 hover:underline font-semibold"
          >
            Connect with property management professionals
          </Link>{" "}
          who can handle the legalities for you.
        </p>
      </>
    ),
  },
  "renovating-older-villa-2025": {
    title: "Why Renovating an Older Villa is the Smartest Investment in 2025",
    metaDescription:
      "Renovating an older villa in Spain? Watch for these 2025 issues: dodgy rewiring, hidden damp, and outdated plumbing.",
    category: "Renovation",
    author: "Elena Costa",
    authorRole: "Real Estate Analyst",
    date: "March 22, 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop",
    keyTakeaways: [
      "New build supply is limited and prices are rising.",
      "Older villas in prime locations offer better value per square meter.",
      "Budget €800-€1,200 per sqm for a full modernization.",
    ],
    content: (
      <>
        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          With new build prices in the 'Golden Triangle' (Marbella, Estepona,
          Benahavís) rising by 12% this year, savvy investors are turning their
          attention to older stock. Here is why buying a fixer-upper might be
          your best move in 2025.
        </p>
        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The 'Good Bones' Strategy
        </h2>
        <p>
          The best plots on the Costa del Sol were built on decades ago. Older
          villas in established areas like Elviria, Nueva Andalucia, and
          Nagüeles often boast larger gardens, better views, and more privacy
          than modern developments where density is maximized.
        </p>
        <p>
          By buying an older property, you are paying for the location and the
          land, rather than the developer's premium. With the right renovation,
          you can create a modern luxury home for significantly less than the
          cost of a new build.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Budgeting for Success
        </h2>
        <p>
          Renovation costs have stabilized after the post-pandemic spike, but
          budgeting correctly is crucial. For a full modernization of a 1980s or
          1990s villa, you should budget between{" "}
          <strong>€800 and €1,200 per square meter</strong>.
        </p>
        <p>This budget typically covers:</p>
        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
          <li>
            <strong>Structural changes:</strong> Opening up living spaces and
            removing partition walls.
          </li>
          <li>
            <strong>New systems:</strong> Complete rewiring and new plumbing
            (essential for older homes).
          </li>
          <li>
            <strong>Windows:</strong> Upgrading to double or triple glazing for
            energy efficiency.
          </li>
          <li>
            <strong>Finishes:</strong> New flooring (microcement or large format
            tiles), kitchen, and bathrooms.
          </li>
        </ul>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Hidden Costs to Watch For
        </h2>
        <p>
          When renovating in Spain, always set aside a contingency fund of
          10-15%. Common surprises in older villas include:
        </p>
        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
          <li>
            <strong>Damp issues:</strong> Often caused by poor original
            waterproofing or bridging of the damp proof course.
          </li>
          <li>
            <strong>Illegal extensions:</strong> Check that all parts of the
            building are registered in the Property Registry.
          </li>
          <li>
            <strong>Outdated septic tanks:</strong> You may need to connect to
            the mains sewage system if available.
          </li>
        </ul>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Finding the Right Team
        </h2>
        <p>
          A successful renovation relies on a trusted team of builders and
          architects. Don't rely on "a guy at the bar". You need verified
          professionals with a track record of delivering projects on time and
          on budget.
        </p>
        <div className="mt-8">
          <Link href="/post-job">
            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Find Verified Builders
            </Button>
          </Link>
        </div>
      </>
    ),
  },
  "malaga-hard-water-boiler": {
    title: "Malaga Hard Water: Boiler & Softener Guide",
    metaDescription:
      "Malaga hard water destroying your boiler? The 2025 guide to Limescale, Descaling costs, and the best Water Softeners for the Costa del Sol.",
    category: "Maintenance",
    author: "David Miller",
    authorRole: "Senior Plumber",
    date: "February 15, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1521207418485-99c705420785?q=80&w=2940&auto=format&fit=crop",
    keyTakeaways: [
      "Malaga has some of the highest calcium levels in Europe.",
      "Electric boilers can fail after just 2 years without maintenance.",
      "Installing a water softener is the most effective long-term solution.",
    ],
    content: (
      <>
        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          If you've noticed white scale on your taps, your shower pressure
          dropping, or your skin feeling dry after a wash, you're a victim of
          Malaga's hard water. It's not just an annoyance; it's a boiler killer
          that costs homeowners thousands in premature replacements.
        </p>
        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Why Calcium is the Enemy
        </h2>
        <p>
          The water in Malaga province is rich in calcium and magnesium, picked
          up as it flows through the region's limestone bedrock. When this water
          is heated, the minerals precipitate and form limescale—a rock-hard
          layer that coats heating elements.
        </p>
        <p>
          This scale acts as insulation, forcing your boiler to work harder and
          longer to heat the same amount of water. This not only increases your
          electricity bill but eventually causes the element to overheat and
          burn out. We often see electric boilers fail after just 2-3 years in
          areas like Marbella and Mijas.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Prevention Tips
        </h2>
        <ul className="list-disc pl-5 space-y-4 marker:text-blue-500">
          <li>
            <strong>Install a Water Softener (Descalcificador):</strong> This is
            the gold standard. Installed at the mains entry point, it removes
            minerals before they enter your home's pipework. It protects your
            boiler, washing machine, dishwasher, and taps.{" "}
            <Link
              href="/trades/plumbers"
              className="text-blue-600 hover:underline"
            >
              Get a quote for installation here.
            </Link>
          </li>
          <li>
            <strong>Replace the Anode:</strong> Every electric boiler has a
            "sacrificial anode"—a metal rod designed to corrode instead of the
            tank. In Malaga, this should be checked and replaced annually.
          </li>
          <li>
            <strong>Lower the Temperature:</strong> Limescale forms faster at
            higher temperatures. Setting your boiler to 55°C or 60°C instead of
            70°C can significantly reduce scale buildup.
          </li>
          <li>
            <strong>Regular Descaling:</strong> Use vinegar or specialized
            descaling solutions to clean taps and showerheads regularly to
            maintain flow.
          </li>
        </ul>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Signs You Need a Plumber
        </h2>
        <p>
          If your boiler is making banging noises (kettling), taking longer to
          heat up, or leaking, it's likely full of scale. Don't wait for it to
          burst.
        </p>
        <Link href="/trades/plumbers">
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Find a Plumber Near You
          </Button>
        </Link>
      </>
    ),
  },
  "cleaning-calima-dust": {
    title: "Cleaning Up After the Calima: Don't Ruin Your Facade",
    category: "Maintenance",
    author: "Sofia Marti",
    authorRole: "Cleaning Specialist",
    date: "March 05, 2025",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop",
    keyTakeaways: [
      "Do NOT pressure wash immediately; it turns dust into mud.",
      "Wash down gently with a hose first to remove loose particles.",
      "Use 'elastic' exterior paint to resist future staining.",
    ],
    content: (
      <>
        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          Another dust storm from the Sahara has turned the Costa del Sol
          orange. While the eerie skies make for great photos, the 'Calima'
          leaves behind a fine, sticky red dust that can cause permanent damage
          to your villa's facade if cleaned incorrectly.
        </p>
        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The Golden Rule: No Pressure
        </h2>
        <p>
          <strong>Never</strong> use a high-pressure washer (Karcher) directly
          on dry Calima dust. The high pressure drives the fine red particles
          deep into the pores of your render or paintwork, creating permanent
          stains that are almost impossible to remove without repainting.
        </p>
        <p>
          It also turns the dust into a thick mud that runs down the walls,
          staining terraces and pool decks below.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The Correct Method
        </h2>
        <ol className="list-decimal pl-5 space-y-4 marker:text-blue-500 font-medium text-slate-700">
          <li>
            <strong>Wait for it to pass:</strong> There is no point cleaning if
            more rain/dust is forecast for tomorrow. Check the weather report.
          </li>
          <li>
            <strong>The Gentle Rinse:</strong> Start by gently rinsing the
            facade with a garden hose from the top down. Use a wide spray
            setting, not a jet. The goal is to lift the loose dust and wash it
            away.
          </li>
          <li>
            <strong>Soft Wash:</strong> For stubborn areas, use a soft brush and
            a mild detergent. Avoid harsh chemicals that can react with the
            minerals in the dust.
          </li>
          <li>
            <strong>Pressure Wash (Last Resort):</strong> Only once the bulk of
            the mud is gone should you consider using a pressure washer, and
            only on a low setting to clean the floor or hard surfaces—not the
            painted walls.
          </li>
        </ol>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Long-Term Protection
        </h2>
        <p>
          If your villa is prone to staining, consider repainting with a
          high-quality "elastic" or silicone-based exterior paint. These paints
          seal the pores of the render, making it much easier to wash off the
          dust in the future.
        </p>
        <p>
          Need a professional refresh?{" "}
          <Link
            href="/trades/painters"
            className="text-blue-600 hover:underline font-semibold"
          >
            Find exterior painters
          </Link>{" "}
          who specialize in weather-resistant coatings.
        </p>
      </>
    ),
  },
  "protecting-home-squatters-2025": {
    title: "Protect Home from Okupas: 2025 Guide",
    metaDescription:
      "Protect your Spanish home from Okupas. 2025 Guide: Best anti-snap locks, alarm systems & legal eviction rules for non-resident owners.",
    category: "Legal/Permits",
    author: "James Wilson",
    authorRole: "Security Consultant",
    date: "January 20, 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=2940&auto=format&fit=crop",
    keyTakeaways: [
      "Prevention is far cheaper and faster than eviction.",
      "Install an 'Anti-Bumping' lock cylinder to prevent easy entry.",
      "A visible alarm connected to the police is a strong deterrent.",
    ],
    content: (
      <>
        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          With new housing laws making headlines, non-resident owners are
          understandably worried about squatters ('okupas'). While the media
          stories can be alarming, the reality is that squatters target easy
          targets. The key to peace of mind is proactive prevention.
        </p>
        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Hardening Your Defenses
        </h2>
        <p>
          Squatters rarely break windows to enter; they prefer to walk in
          through the front door. Most illegal entries happen using a technique
          called 'bumping', which opens older locks without leaving signs of
          forced entry.
        </p>
        <p>
          <strong>Upgrade your locks:</strong> Replacing your standard cylinder
          with a high-security "Anti-Bumping, Anti-Drill, Anti-Pick" cylinder is
          your first and most important line of defense.{" "}
          <Link
            href="/trades/locksmiths"
            className="text-blue-600 hover:underline"
          >
            Find a locksmith to upgrade your door security.
          </Link>
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The 48-Hour Rule
        </h2>
        <p>
          Spanish law distinguishes between a "burglary" (allanamiento de
          morada) and "usurpation" (usurpación). If police catch intruders in
          the act or within the first 48 hours, they can often evict them
          immediately. After that, it becomes a civil matter that can take
          months.
        </p>
        <p>
          <strong>Install an Alarm:</strong> Having an alarm system connected to
          a central monitoring station (CRA) provides immediate proof of the
          time of entry. This allows police to act immediately, treating the
          incident as a break-in rather than a squatting case.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The Human Element
        </h2>
        <p>
          An empty house is a target. Making the property look lived-in is
          crucial.
        </p>
        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
          <li>
            <strong>Hire a Key Holder:</strong> Have someone visit the property
            weekly to collect mail, open blinds, and check for signs of
            tampering.
          </li>
          <li>
            <strong>Smart Lighting:</strong> Use smart plugs to turn lights on
            and off on a schedule.
          </li>
          <li>
            <strong>Garden Maintenance:</strong> An overgrown garden is a clear
            sign of an empty home.{" "}
            <Link
              href="/trades/gardeners"
              className="text-blue-600 hover:underline"
            >
              Keep your garden maintained
            </Link>{" "}
            year-round.
          </li>
        </ul>

        <div className="mt-8">
          <Link href="/holiday-homes">
            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              Find Property Management Services
            </Button>
          </Link>
        </div>
      </>
    ),
  },
  "solar-panels-worth-it-2025": {
    title: "Electricity Bills 2025: Is Solar Finally Worth It?",
    category: "Cost Guides",
    author: "Miguel Angel",
    authorRole: "Energy Engineer",
    date: "April 02, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2942&auto=format&fit=crop",
    keyTakeaways: [
      "Andalucia gets over 320 days of sun per year.",
      "ROI for a standard system is now typically 4-5 years.",
      "You can sell surplus energy back to the grid (Compensación).",
    ],
    content: (
      <>
        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          With electricity prices stabilizing but still high, and new EU grants
          available, 2025 might be the tipping point for solar adoption on the
          Costa del Sol. If you have a roof in Andalucia, you are sitting on a
          goldmine of potential energy.
        </p>
        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The Numbers Don't Lie
        </h2>
        <p>
          The cost of solar panels has dropped significantly in the last decade.
          A typical 3kW to 5kW system for a villa costs between{" "}
          <strong>€5,000 and €8,000 installed</strong>.
        </p>
        <p>
          With current energy prices, most households save €1,000-€1,500 per
          year on their bills. This means the system pays for itself in just 4-5
          years. After that, you are essentially generating free electricity for
          the remaining 20+ year lifespan of the panels.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Selling Back to the Grid
        </h2>
        <p>
          Spain's "Compensación de Excedentes" (Surplus Compensation) allows you
          to sell the excess energy you produce during the day back to your
          energy provider. While they won't pay you cash, they will deduct this
          value from your bill, often reducing it to near zero (you still pay
          the fixed access charges).
        </p>
        <p>
          For even greater independence, consider adding a battery system. While
          this increases the upfront cost, it allows you to use your solar power
          at night, further insulating you from price hikes.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Grants and Tax Breaks
        </h2>
        <p>There are still incentives available in 2025:</p>
        <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
          <li>
            <strong>IBI Reduction:</strong> Many town halls (like Marbella and
            Estepona) offer a reduction in IBI tax (up to 50% for 3 years) for
            homes with solar panels.
          </li>
          <li>
            <strong>ICIO Reduction:</strong> A reduction in the construction tax
            for the installation works.
          </li>
          <li>
            <strong>NextGen Funds:</strong> EU subsidies are still available but
            are often oversubscribed. It's best to check with your installer.
          </li>
        </ul>

        <p className="mt-8">
          Ready to switch to solar?{" "}
          <Link
            href="/trades/electricians"
            className="text-blue-600 hover:underline font-semibold"
          >
            Get quotes from certified solar installers
          </Link>{" "}
          today.
        </p>
      </>
    ),
  },
  "solar-panels-costa-del-sol-roi": {
    title: "Solar Power Costa del Sol: 2025 ROI Guide",
    metaDescription:
      "Is Solar worth it in Andalucia? 2025 ROI Guide: Calculate savings, claim 40% NextGen grants & check IBI tax reductions for Malaga homeowners.",
    category: "Cost Guides",
    author: "Miguel Angel",
    authorRole: "Energy Engineer",
    date: "Updated Jan 2025",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2942&auto=format&fit=crop",
    keyTakeaways: [
      "With electricity prices around ���0.25/kWh, most Costa del Sol homes see solar payback in 3-5 years.",
      "The old 'Impuesto al Sol' (Sun Tax) was abolished in 2018 – modern systems are fully legal and incentivised.",
      "Owners in communities (LPH) can usually install panels for personal use even if some neighbours disagree.",
      "2025 grants and local tax discounts can cover up to 40% of installation costs for qualifying homes.",
    ],
    content: (
      <>
        {/* AEO / Verdict Snippet */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
          <div className="text-sm text-slate-500 mb-2">
            Updated Jan 2025 • 12 min read
          </div>
          <h2 className="font-bold text-[#0a1f44] mb-2 text-lg">
            The Quick Verdict
          </h2>
          <p className="text-slate-700 leading-relaxed">
            With <strong>3,200 hours of sun per year</strong>, the ROI for solar
            in Malaga is typically <strong>3.5–5 years</strong>. Homeowners can
            claim up to <strong>40% deductions on IRPF</strong> and get
            <strong> 50% off IBI (Council Tax)</strong> in towns like Mijas and
            Fuengirola.
          </p>
        </div>

        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          The Costa del Sol sits on one of the best solar resources in Europe,
          yet many homeowners still rely 100% on Endesa or Iberdrola for their
          electricity. In 2025, with high grid prices and generous tax breaks,
          well-designed solar systems have moved from "nice green upgrade" to a
          <strong>serious financial investment</strong>.
        </p>

        <p className="mb-6">
          This guide walks through the <strong>real Endesa bill math</strong>,
          explains how the old <em>"Sun Tax"</em> disappeared, and shows you
          what ROI to expect in 2025 – including a real case study from a villa
          in Elviria.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-4 text-2xl">
          The "Endesa" Problem
        </h2>
        <p className="mb-4">
          Current electricity rates in Malaga typically fluctuate between
          <strong> €0.20 and €0.30 per kWh</strong>, depending on your tariff
          and time of day. For a villa with air conditioning, a heated pool and
          regular year-round use, that quickly adds up to
          <strong> €3,000–€6,000+ per year</strong>.
        </p>
        <p className="mb-4">
          According to official{" "}
          <a
            href="https://re.jrc.ec.europa.eu/pvg_tools/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            PVGIS Data
          </a>
          , Malaga receives over
          <strong> 1,700 kWh/m² of solar irradiation per year</strong>. That
          means every square metre of well-oriented roof can generate far more
          energy than it consumes in a typical Spanish home.
        </p>
        <ul className="list-disc pl-5 space-y-3 marker:text-blue-500 mb-6">
          <li>
            <strong>Potencia contratada (Power capacity):</strong> The fixed
            charge for the maximum power (kW) your property can draw at any
            time. Think of it as the size of your "pipe" to the grid. This is
            charged per kW per day and <strong>does not disappear</strong>{" "}
            completely with solar.
          </li>
          <li>
            <strong>Consumo (Energy use):</strong> The variable part based on
            how many kWh you consume each month. This is where solar has the
            biggest impact.
          </li>
        </ul>

        <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
          <h3 className="font-bold text-[#0a1f44] mb-3">
            Example: Typical Endesa Bill on the Costa del Sol
          </h3>
          <ul className="space-y-2 text-slate-700 text-sm">
            <li>
              <strong>Potencia:</strong> 5.5 kW × ~€0.13/kW/day ≈{" "}
              <strong>€22–€24 / month</strong>
            </li>
            <li>
              <strong>Consumo:</strong> 400–600 kWh at ~€0.25/kWh ≈
              <strong> €100–€150 / month</strong>
            </li>
            <li>
              <strong>Other charges:</strong> taxes, meter rental, etc. ≈
              <strong> €20–€30 / month</strong>
            </li>
          </ul>
          <p className="mt-4 text-slate-700">
            In other words,{" "}
            <strong>60–70% of your bill is pure consumption</strong>. Solar
            attacks this Consumo line directly by generating free daytime
            electricity.
          </p>
        </div>

        <h3 className="font-sans text-[#0a1f44] font-bold mt-10 mb-3 text-xl">
          How Solar Shrinks the Consumo Line
        </h3>
        <p className="mb-4">
          A 5 kW system on the Costa del Sol typically produces around
          <strong> 7,500–8,500 kWh per year</strong>. If your home consumes
          8,000–10,000 kWh annually, solar can easily cover
          <strong> 60–80% of that usage</strong>.
        </p>
        <p className="mb-6">
          That means your Consumo line – often €120–€180 per month for a
          full-time villa – can drop to <strong>€20–€60</strong>. You will still
          pay Potencia and taxes, but the heavy variable part is dramatically
          reduced.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-4 text-2xl">
          The Sun Tax Myth
        </h2>
        <p className="mb-4">
          Many expats still believe Spain punishes solar owners with a special
          tax, known as the <em>Impuesto al Sol</em> or "Sun Tax". This used to
          be partly true for certain large installations under older
          regulations.
        </p>
        <p className="mb-4">
          <strong>Since 2018, that tax has been abolished.</strong> Royal Decree
          15/2018 and subsequent regulations completely removed the Sun Tax and
          simplified self-consumption rules. Today:
        </p>
        <ul className="list-disc pl-5 space-y-3 marker:text-blue-500 mb-6">
          <li>
            Residential systems under 100 kW do <strong>not</strong> pay any
            extra fee for self-consumption.
          </li>
          <li>
            You can connect your system legally with your supplier (Endesa,
            Iberdrola, etc.) and receive <strong>bill credits</strong> for
            surplus energy (<em>compensación de excedentes</em>).
          </li>
          <li>
            There is <strong>no requirement</strong> to install an expensive
            second meter just to be "taxed" on your own production.
          </li>
        </ul>
        <p className="mb-6">
          Any installer still mentioning the Sun Tax for residential systems is
          either using outdated information or trying to scare you into making a
          rushed decision. The "Sun Tax" was officially abolished in 2018 by{" "}
          <a
            href="https://www.boe.es/eli/es/rd/2019/04/05/244"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Real Decreto 244/2019
          </a>
          , which guarantees your right to legal self-consumption and simplified
          compensation for surplus energy.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-4 text-2xl">
          3. Living in a Community (LPH): Can Neighbours Block Solar?
        </h2>
        <p className="mb-4">
          If you own an apartment or townhouse in a{" "}
          <em>Comunidad de Propietarios</em>, the roof is usually a{" "}
          <strong>common element</strong>
          regulated by Spain's Horizontal Property Law (
          <em>Ley de Propiedad Horizontal</em>, LPH).
        </p>
        <p className="mb-4">
          The law was updated to make energy-efficiency works easier. In most
          cases:
        </p>
        <ul className="list-disc pl-5 space-y-3 marker:text-blue-500 mb-6">
          <li>
            For <strong>individual self-consumption</strong> (panels that only
            feed your apartment), communities cannot simply block you because a
            few neighbours "don't like the look".
          </li>
          <li>
            The community must allow access to common roofs, provided the
            installation is safe, respects technical limits and does not
            seriously affect the building's structure or other owners.
          </li>
          <li>
            A majority vote is usually required to formalise the use of common
            space and the distribution of any surplus production.
          </li>
        </ul>
        <p className="mb-6 text-sm text-slate-600">
          <strong>Important:</strong> Every building has its own statutes and
          layout. Always ask your administrator and, if needed, a specialist
          lawyer before signing an installation contract. But in broad terms, if
          you are installing panels <strong>for your own use</strong>, Spanish
          law is now on your side.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-4 text-2xl">
          Case Study: 4-Bed Villa in Mijas
        </h2>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-[#0a1f44] mb-3 text-lg">
            Real Numbers from a Mijas Family Home
          </h3>
          <ul className="space-y-2 text-slate-800 text-sm">
            <li>
              <strong>Property:</strong> 4-bedroom villa used as a main
              residence.
            </li>
            <li>
              <strong>System:</strong> 5 kW inverter with battery storage.
            </li>
            <li>
              <strong>Net Cost (after grant):</strong> €8,000.
            </li>
            <li>
              <strong>Annual Saving on Bills:</strong> approximately
              <strong> €3,660 per year</strong>.
            </li>
            <li>
              <strong>Simple Payback:</strong> around
              <strong> 2.1 years</strong>.
            </li>
          </ul>
          <p className="mt-4 text-slate-700">
            After the payback point, the owners effectively generate thousands
            of euros of electricity every year for the remaining life of the
            system, with only minor maintenance costs.
          </p>
        </div>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-4 text-2xl">
          2025 IBI Reductions in Malaga
        </h2>
        <p className="mb-4">
          Each Town Hall sets its own rules, but the following table summarises
          typical <strong>IBI discounts</strong> currently available for
          certified residential solar systems in parts of Malaga province:
        </p>

        <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm font-sans">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-[#0a1f44]">Municipality</th>
                <th className="p-4 font-bold text-[#0a1f44]">
                  Typical IBI Discount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="even:bg-slate-50">
                <td className="p-4 font-medium">Marbella</td>
                <td className="p-4">25% discount for 5 years</td>
              </tr>
              <tr className="even:bg-slate-50">
                <td className="p-4 font-medium">Mijas</td>
                <td className="p-4">50% discount for 3 years</td>
              </tr>
              <tr className="even:bg-slate-50">
                <td className="p-4 font-medium">Fuengirola</td>
                <td className="p-4">50% discount for 3 years</td>
              </tr>
              <tr className="even:bg-slate-50">
                <td className="p-4 font-medium">Malaga City</td>
                <td className="p-4">15% discount for 3 years</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-8 text-sm text-slate-600">
          These figures change over time and may depend on system size and
          administrative deadlines, so always confirm the current ordinance with
          your local <em>Ayuntamiento</em> before signing a contract.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-4 text-2xl">
          The 3 Hidden Savings (2025 Tax Rules)
        </h2>
        <p className="mb-4">
          The headline saving is obvious: lower monthly bills. But in 2025 there
          are <strong>three additional layers of savings</strong> available to
          many Costa del Sol homeowners:
        </p>
        <ol className="list-decimal pl-5 space-y-3 marker:text-blue-500 mb-6">
          <li>
            <strong>NextGen / Regional Grants:</strong> You can apply for
            subsidies covering up to{" "}
            <strong>40% of the installation cost</strong>
            via the{" "}
            <a
              href="https://www.agenciaandaluzadelaenergia.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Agencia Andaluza de la Energía
            </a>
            . These programmes open in waves and are often handled directly by
            reputable installers.
          </li>
          <li>
            <strong>IRPF Deductions:</strong> Certain energy-efficiency works
            allow you to deduct up to{" "}
            <strong>€3,000 from your income tax (IRPF)</strong> over several
            years, provided the works are properly certified and reduce your
            primary energy consumption.
          </li>
          <li>
            <strong>Local IBI / ICIO Discounts:</strong> Many municipalities
            offer reduced <em>Impuesto sobre Bienes Inmuebles</em> (IBI) and
            reduced <em>ICIO</em> construction tax for solar projects, directly
            cutting your annual running costs.
          </li>
        </ol>

        <p className="mb-8">
          When you layer these incentives on top of bill savings, it is common
          to see <strong>effective payback times drop below 4 years</strong> for
          full-time residences.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-4 text-2xl">
          7. Do You Need a Battery? (Especially for Holiday Homes)
        </h2>
        <p className="mb-4">
          Batteries are no longer a niche add-on, but they are not mandatory for
          a good ROI. Whether you need one depends mainly on how you use the
          property:
        </p>
        <ul className="list-disc pl-5 space-y-3 marker:text-blue-500 mb-6">
          <li>
            <strong>Full-time homes:</strong> A battery usually makes sense,
            shifting excess daytime production into the evening when AC, cooking
            and lighting demand is highest.
          </li>
          <li>
            <strong>Holiday homes:</strong> If the property is often empty, you
            may prefer a{" "}
            <strong>simple grid-tied system without battery</strong>
            and rely on surplus compensation instead.
          </li>
          <li>
            <strong>Rental villas:</strong> Batteries can smooth out guest
            consumption and protect you from peak pricing.
          </li>
        </ul>

        <p className="mb-8">
          For many occasional-use homes, it is smarter to start without a
          battery and add one later once you have 12 months of real production
          data.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-4 text-2xl">
          8. Frequently Asked Questions (2025)
        </h2>

        <div className="space-y-6 mb-12">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-[#0a1f44] mb-2 text-lg">
              Do I need a battery for a holiday home?
            </h3>
            <p className="text-slate-700">
              Not necessarily. If your Costa del Sol property is empty for long
              stretches, a battery may not charge and discharge efficiently
              enough to justify the cost. A standard grid-tied system without
              storage still reduces your bills when you are there and lets you
              benefit from surplus compensation the rest of the year. Many
              owners choose to <strong>add a battery later</strong> once they
              see real usage patterns.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-[#0a1f44] mb-2 text-lg">
              How do I claim the IBI tax reduction in Marbella?
            </h3>
            <p className="text-slate-700">
              Marbella Town Hall currently offers IBI discounts for certified
              solar installations, but you must{" "}
              <strong>apply proactively</strong>. After your system is legalised
              and registered, your installer or gestor should provide the
              documentation. You then submit the application at the{" "}
              <em>Oficina de Atención al Contribuyente</em>
              (tax office) or via the online <em>Sede Electrónica</em>, usually
              before <strong>31 December</strong> for the discount to apply to
              the following year's bill.
            </p>
          </div>
        </div>

        <div className="my-12">
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-blue-500/15 via-sky-400/10 to-emerald-400/10 blur-3xl" />

            <div className="relative rounded-[28px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800/80 shadow-xl md:shadow-[0_28px_70px_rgba(15,23,42,0.85)] px-6 py-9 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="absolute right-4 top-4 hidden md:flex items-center gap-2 text-[11px] font-medium text-slate-300">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Updated 2025 data</span>
              </div>

              <div className="relative max-w-xl">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-[11px] font-semibold tracking-wide uppercase !text-slate-200 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Solar ROI check • Costa del Sol
                </p>

                <h3 className="text-2xl md:text-3xl font-extrabold !text-white mb-3 leading-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)]">
                  Ready to see your own ROI?
                </h3>
                <p className="!text-white mb-6 text-sm md:text-base leading-relaxed">
                  Describe your property once and get tailored proposals from
                  vetted solar installers who understand Endesa bills, community
                  rules and 2025 grants on the Costa del Sol.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-[11px] sm:text-xs !text-white">
                  <div className="rounded-2xl bg-slate-900/70 border border-slate-800 px-3 py-3">
                    <div className="text-[10px] uppercase tracking-wide text-slate-300 mb-1">
                      Typical Payback
                    </div>
                    <div className="text-sm font-semibold text-emerald-400">
                      3.5–5 years
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-900/70 border border-slate-800 px-3 py-3">
                    <div className="text-[10px] uppercase tracking-wide text-slate-300 mb-1">
                      Grants
                    </div>
                    <div className="text-sm font-semibold text-sky-300">
                      Up to 40% cost
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-900/70 border border-slate-800 px-3 py-3 hidden sm:block">
                    <div className="text-[10px] uppercase tracking-wide text-slate-300 mb-1">
                      IBI Discounts
                    </div>
                    <div className="text-sm font-semibold text-indigo-300">
                      Up to 50% off
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col items-stretch md:items-end gap-3 min-w-[220px]">
                <Link href="/post-job" className="w-full md:w-auto">
                  <Button className="w-full md:w-auto bg-blue-500 hover:bg-blue-400 text-white font-semibold md:font-bold px-7 md:px-9 py-4 md:py-5 rounded-2xl text-sm md:text-lg shadow-[0_18px_45px_rgba(37,99,235,0.7)] flex items-center justify-center gap-2">
                    <span>Request Solar Quotes</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <p className="text-[11px] text-slate-300 mt-1 md:mt-2 max-w-xs text-right">
                  100% free service. We only match you with vetted installers
                  who work regularly across Malaga and the Costa del Sol.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need a battery for a holiday home?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most holiday homes on the Costa del Sol do not strictly need a battery. A standard grid-tied system still reduces bills when occupied and uses surplus compensation when empty. Many owners add a battery later once they understand their usage patterns.",
          },
        },
        {
          "@type": "Question",
          name: "How do I claim the IBI tax reduction in Marbella?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "After your solar installation is legalised, your installer or gestor should provide the documentation confirming it. You then submit an application for the IBI reduction at Marbella's tax office or via the Sede Electrónica, normally before 31 December so the discount applies to the next tax year.",
          },
        },
      ],
    },
  },
  "bathroom-reform-permit": {
    title: "Licencia de Obra Menor: Do You Need One for a Bathroom Reform?",
    category: "Legal/Permits",
    author: "Maria Gonzalez",
    authorRole: "Legal Consultant",
    date: "February 28, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2940&auto=format&fit=crop",
    keyTakeaways: [
      "Yes, even for tiling, you often need a 'Declaración Responsable'.",
      "Town halls are cracking down on unpermitted skips (cubas).",
      "The permit cost is small compared to the potential €3,000 fine.",
    ],
    content: (
      <>
        <p className="text-xl leading-relaxed text-slate-600 mb-8 font-sans font-light">
          It's a common question: "I'm just changing the tiles and the toilet,
          do I really need a permit?" The answer might surprise you. In the eyes
          of the Town Hall, almost any work is "Obra".
        </p>
        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The 'Declaración Responsable'
        </h2>
        <p>
          For minor works like bathroom reforms, kitchen upgrades, or tiling,
          you generally don't need a full "Licencia de Obra Menor" which can
          take months to approve. Instead, most Town Halls now use the{" "}
          <strong>Declaración Responsable</strong> (Responsible Declaration).
        </p>
        <p>
          This is a fast-track process. You submit the form, pay the taxes
          (usually around 4-5% of the budget), and you can start work
          immediately. You are essentially declaring that you comply with
          regulations and accept responsibility.
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          The Skip Trap
        </h2>
        <p>
          The most common way homeowners get caught doing unpermitted work is
          the skip (cuba) on the street. Local police regularly check the
          license of every skip they see. They will check the skip permit
          against the property address.
        </p>
        <p>
          If there is a skip but no building permit on file for that address,
          expect a knock on the door. The fines for working without a permit can
          start at €600 and go up to €3,000 or more, plus you will be forced to
          stop work until the paperwork is legalized (which costs more).
        </p>

        <h2 className="font-sans text-[#0a1f44] font-bold mt-12 mb-6">
          Don't Risk It
        </h2>
        <p>
          The cost of the permit is a small percentage of your renovation
          budget. It buys you peace of mind and ensures you have no issues when
          you eventually sell the property.
        </p>
        <p>
          Always ask your builder if they will handle the permits for you.{" "}
          <Link
            href="/post-job"
            className="text-blue-600 hover:underline font-semibold"
          >
            Find builders who handle the paperwork
          </Link>{" "}
          on CostaTrades.
        </p>
      </>
    ),
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post =
    blogPosts[slug as keyof typeof blogPosts] ||
    blogPosts["renovation-permits-andalucia-2025"];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title={`${post.title} | CostaTrades`}
        description={
          (post as any).metaDescription ||
          `In-depth ${post.category.toLowerCase()} advice for Costa del Sol homeowners. Detailed guidance from CostaTrades experts on ${post.title}.`
        }
        url={`https://costatrades.com/blog/${slug}`}
        schema={
          // @ts-ignore
          (post as any).faqSchema
            ? JSON.stringify((post as any).faqSchema)
            : undefined
        }
      />
      {/* Article Header */}
      <header className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f44]/70 via-[#0a1f44]/60 to-[#0a1f44]/90"></div>
        </div>

        <div className="container-custom max-w-4xl mx-auto relative z-10 text-center px-4 mt-10">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-blue-200/80 mb-8 animate-fade-in">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white bg-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-lg animate-slide-up">
            {post.title}
          </h1>

          <div
            className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-white/90 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center font-bold text-white shadow-inner">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold">{post.author}</div>
                <div className="text-xs text-blue-200">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-6 px-4 py-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-300" />
                {post.date}
              </div>
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-300" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-[1fr_380px] gap-16">
        {/* Content Area */}
        <article className="max-w-[720px] mx-auto lg:mx-0">
          {/* Key Takeaways */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-8 mb-12 border border-blue-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <h3 className="font-bold text-[#0a1f44] text-xl mb-6 flex items-center gap-3 relative z-10">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              Key Takeaways
            </h3>
            <ul className="space-y-4 relative z-10">
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div
            className="prose prose-lg prose-slate max-w-none font-serif text-slate-700 leading-loose 
            prose-headings:font-sans prose-headings:font-bold prose-headings:text-[#0a1f44] 
            prose-a:text-blue-600 prose-a:no-underline prose-a:border-b-2 prose-a:border-blue-200 hover:prose-a:border-blue-600 prose-a:transition-colors
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10
            prose-strong:text-[#0a1f44] prose-strong:font-bold"
          >
            {post.content}
          </div>

          {/* Share / Tags */}
          <div className="mt-16 pt-10 border-t border-slate-100 flex flex-wrap gap-6 justify-between items-center">
            <div className="flex gap-3">
              <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer">
                #{post.category.split("/")[0]}
              </span>
              <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer">
                #Spain
              </span>
              <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer">
                #CostaDelSol
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full border-slate-200 hover:border-blue-300 hover:text-blue-600"
              >
                <Share2 className="w-4 h-4" /> Share Article
              </Button>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block space-y-10">
          {/* Sticky Widget */}
          <div className="sticky top-28 space-y-10">
            {/* CTA Card */}
            <div className="bg-[#0a1f44] text-white rounded-[2rem] p-8 shadow-2xl shadow-blue-900/20 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/30 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -ml-10 -mb-10 group-hover:bg-purple-500/30 transition-colors duration-500"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <CheckCircle2 className="w-8 h-8 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Need a Pro?</h3>
                <p className="text-blue-100/80 mb-8 leading-relaxed">
                  Don't DIY it. Get 3 free quotes from verified local
                  professionals for your project.
                </p>
                <Link href="/post-job" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-white text-[#0a1f44] hover:bg-blue-50 font-bold h-14 text-lg shadow-lg"
                  >
                    Post a Job for Free
                  </Button>
                </Link>
                <p className="text-xs text-blue-300/60 mt-4 font-medium uppercase tracking-wider">
                  No obligation • 100% Free
                </p>
              </div>
            </div>

            {/* Newsletter (Optional addition for polish) */}
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200">
              <h4 className="font-bold text-[#0a1f44] mb-2">Weekly Insights</h4>
              <p className="text-sm text-slate-500 mb-4">
                Join 5,000+ homeowners getting local tips.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500 transition-colors"
                />
                <Button
                  size="sm"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700"
                >
                  Join
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Articles */}
      <section className="bg-slate-50 py-24 px-4 border-t border-slate-200">
        <div className="container-custom max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-[#0a1f44]">
              You might also like...
            </h3>
            <Link
              href="/blog"
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(blogPosts)
              .slice(0, 3)
              .map(([slug, p], i) => (
                <Link
                  href={`/blog/${slug}`}
                  key={i}
                  className="group cursor-pointer block hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="bg-slate-950 rounded-[2rem] overflow-hidden border border-slate-800/80 shadow-[0_18px_45px_rgba(15,23,42,0.85)] group-hover:border-sky-500/50">
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/30 to-transparent" />
                      <div className="absolute top-4 left-4 bg-slate-900/80 border border-slate-700/80 text-slate-50 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                        {p.category}
                      </div>
                    </div>
                    <div className="p-7 flex flex-col gap-3">
                      <h4 className="font-bold text-white text-lg leading-snug line-clamp-2 group-hover:text-sky-300 transition-colors">
                        {p.title}
                      </h4>
                      <div className="flex items-center text-xs font-medium text-slate-300/90 gap-2">
                        <Clock className="w-4 h-4 text-sky-300" />
                        <span>{p.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
