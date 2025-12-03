/**
 * SEO & AEO Image Localization Generator
 * Generates image search queries and alt text for all location/trade combinations
 */

const LOCATIONS = [
  { slug: "alcaidesa", name: "Alcaidesa", region: "Sotogrande", description: "hillside golf community with sea views" },
  { slug: "alhaurin-el-grande", name: "Alhaurín el Grande", region: "Inland Málaga", description: "traditional white village in mountain foothills" },
  { slug: "alozaina", name: "Alozaina", region: "Sierra de las Nieves", description: "rustic mountain village with olive groves" },
  { slug: "arroyo-de-la-miel", name: "Arroyo de la Miel", region: "Benalmádena", description: "bustling commercial center near coast" },
  { slug: "benalmadena-area", name: "Benalmádena", region: "Costa del Sol", description: "coastal resort town with marina and cable car" },
  { slug: "benalmadena-costa", name: "Benalmádena Costa", region: "Benalmádena", description: "beachfront promenade with modern apartments" },
  { slug: "benalmadena-pueblo", name: "Benalmádena Pueblo", region: "Benalmádena", description: "charming whitewashed hilltop village" },
  { slug: "calahonda", name: "Calahonda", region: "Mijas Costa", description: "hillside residential area near beach" },
  { slug: "cancelada", name: "Cancelada", region: "Estepona", description: "quiet residential village with local shops" },
  { slug: "casares-costa", name: "Casares Costa", region: "Casares", description: "coastal urbanization with golf courses" },
  { slug: "coin", name: "Coín", region: "Guadalhorce Valley", description: "authentic Spanish market town inland" },
  { slug: "el-chaparral", name: "El Chaparral", region: "Mijas Costa", description: "woodland residential area near golf" },
  { slug: "el-rosario", name: "El Rosario", region: "Marbella East", description: "established beachside residential area" },
  { slug: "elviria", name: "Elviria", region: "Marbella East", description: "upscale residential area with dune beach" },
  { slug: "estepona-town", name: "Estepona Town", region: "Estepona", description: "picturesque old town with flower streets" },
  { slug: "frigiliana", name: "Frigiliana", region: "Axarquía", description: "stunning white village with Moorish heritage" },
  { slug: "guadiaro", name: "Guadiaro", region: "Sotogrande", description: "peaceful riverside village near polo grounds" },
  { slug: "guaro", name: "Guaro", region: "Sierra de las Nieves", description: "small mountain village with panoramic views" },
  { slug: "inland-sierra-region", name: "Inland Sierra", region: "Málaga Mountains", description: "scenic mountain range with white villages" },
  { slug: "la-cala-de-mijas", name: "La Cala de Mijas", region: "Mijas Costa", description: "family-friendly beach town with boardwalk" },
  { slug: "la-cala-del-moral", name: "La Cala del Moral", region: "Rincón de la Victoria", description: "traditional fishing village turned resort" },
  { slug: "la-carihuela", name: "La Carihuela", region: "Torremolinos", description: "authentic fishing quarter with seafood restaurants" },
  { slug: "la-reserva", name: "La Reserva", region: "Sotogrande", description: "exclusive gated community with golf" },
  { slug: "las-chapas", name: "Las Chapas", region: "Marbella East", description: "prestigious residential area with pine forests" },
  { slug: "malaga-east-axarquia", name: "Málaga East & Axarquía", region: "Eastern Costa del Sol", description: "dramatic coastal cliffs and white villages" },
  { slug: "manilva", name: "Manilva", region: "Western Costa del Sol", description: "wine-producing town with Roman ruins" },
  { slug: "marbella-area", name: "Marbella", region: "Costa del Sol", description: "glamorous resort city with golden mile" },
  { slug: "mijas-costa", name: "Mijas Costa", region: "Mijas", description: "long sandy beaches with family resorts" },
  { slug: "mijas-pueblo", name: "Mijas Pueblo", region: "Mijas", description: "iconic white village with donkey taxis" },
  { slug: "miraflores", name: "Miraflores", region: "Mijas Costa", description: "quiet residential area with golf views" },
  { slug: "nerja", name: "Nerja", region: "Axarquía", description: "dramatic balcony of Europe with caves" },
  { slug: "nueva-andalucia", name: "Nueva Andalucía", region: "Marbella", description: "golf valley with luxury villas" },
  { slug: "ojen", name: "Ojén", region: "Marbella Mountains", description: "charming mountain village above Marbella" },
  { slug: "pueblo-nuevo", name: "Pueblo Nuevo", region: "Sotogrande", description: "local Spanish village near golf resorts" },
  { slug: "puerto-banus", name: "Puerto Banús", region: "Marbella", description: "luxury marina with superyachts and boutiques" },
  { slug: "puerto-de-la-duquesa", name: "Puerto de la Duquesa", region: "Manilva", description: "charming marina village with restaurants" },
  { slug: "rincon-de-la-victoria", name: "Rincón de la Victoria", region: "Eastern Málaga", description: "family beach town near Málaga city" },
  { slug: "riviera-del-sol", name: "Riviera del Sol", region: "Mijas Costa", description: "hillside residential area with sea views" },
  { slug: "sabinillas", name: "Sabinillas", region: "Manilva", description: "authentic Spanish coastal village" },
  { slug: "san-pedro", name: "San Pedro de Alcántara", region: "Marbella West", description: "local town with boulevard and beach" },
  { slug: "san-roque-club", name: "San Roque Club", region: "San Roque", description: "prestigious golf resort community" },
  { slug: "selwo", name: "Selwo", region: "Estepona", description: "hillside community near safari park" },
  { slug: "sotogrande-alto", name: "Sotogrande Alto", region: "Sotogrande", description: "elevated exclusive residential area" },
  { slug: "sotogrande-costa", name: "Sotogrande Costa", region: "Sotogrande", description: "luxury marina and polo grounds" },
  { slug: "tolox", name: "Tolox", region: "Sierra de las Nieves", description: "spa village in national park" },
  { slug: "torre-del-mar", name: "Torre del Mar", region: "Axarquía", description: "popular beach resort with promenade" },
  { slug: "torremolinos", name: "Torremolinos", region: "Costa del Sol", description: "vibrant resort town with diverse beaches" },
  { slug: "torrox", name: "Torrox", region: "Axarquía", description: "best climate in Europe with Roman ruins" },
  { slug: "velez-malaga", name: "Vélez-Málaga", region: "Axarquía", description: "historic capital of Axarquía region" },
];

const TRADES = [
  { slug: "plumber", name: "Plumber", keywords: ["plumbing", "water", "pipes"] },
  { slug: "electrician", name: "Electrician", keywords: ["electrical", "wiring", "power"] },
  { slug: "builder", name: "Builder", keywords: ["construction", "building", "renovation"] },
  { slug: "ac-repair", name: "AC Repair Technician", keywords: ["air conditioning", "HVAC", "cooling"] },
  { slug: "bathroom-fitter", name: "Bathroom Fitter", keywords: ["bathroom", "installation", "fitting"] },
  { slug: "gardener", name: "Gardener", keywords: ["garden", "landscaping", "outdoor"] },
  { slug: "roofer", name: "Roofer", keywords: ["roofing", "tiles", "roof repair"] },
  { slug: "handyman", name: "Handyman", keywords: ["repairs", "maintenance", "general"] },
  { slug: "locksmith", name: "Locksmith", keywords: ["locks", "security", "keys"] },
  { slug: "renovation", name: "Renovation Specialist", keywords: ["renovation", "remodeling", "refurbishment"] },
  { slug: "solar-installation", name: "Solar Installer", keywords: ["solar panels", "renewable", "energy"] },
  { slug: "emergency-plumber", name: "Emergency Plumber", keywords: ["emergency", "urgent", "24/7 plumbing"] },
  { slug: "emergency-electrician", name: "Emergency Electrician", keywords: ["emergency", "urgent", "24/7 electrical"] },
  { slug: "emergency-locksmith", name: "Emergency Locksmith", keywords: ["emergency", "urgent", "24/7 lockout"] },
];

function generateImageQueries(location) {
  const { name, region, description } = location;
  
  const queries = [
    `${name} ${region} Spain residential street Mediterranean architecture`,
    `${name} Costa del Sol ${description} scenic view`,
    `aerial view ${name} Spain neighborhood homes`,
    `${name} ${region} local area sunny day palm trees`,
    `${name} Spain traditional architecture whitewashed buildings`,
  ];
  
  return queries;
}

function generateAltText(location, trade) {
  const { name, region, description } = location;
  const { name: tradeName } = trade;
  
  return {
    a_e_o_primary: `Verified ${tradeName.toLowerCase()} service area in ${name}, ${region}, Costa del Sol, Spain`,
    s_e_o_descriptive: `View of ${name} in ${region}, featuring ${description}, representing the service area for trusted local ${tradeName.toLowerCase()} professionals on the Costa del Sol`
  };
}

function generateAllCombinations() {
  const results = [];
  
  for (const location of LOCATIONS) {
    for (const trade of TRADES) {
      results.push({
        slug: `${location.slug}/${trade.slug}`,
        location_slug: location.slug,
        location_name: location.name,
        region: location.region,
        trade_slug: trade.slug,
        primary_service: trade.name,
        image_search_queries: generateImageQueries(location),
        alt_text_options: generateAltText(location, trade)
      });
    }
  }
  
  return results;
}

// Generate unique location images (one per location)
function generateLocationImages() {
  return LOCATIONS.map(location => ({
    slug: location.slug,
    name: location.name,
    region: location.region,
    description: location.description,
    image_search_queries: generateImageQueries(location),
    recommended_sources: [
      `https://unsplash.com/s/photos/${encodeURIComponent(location.name + ' spain')}`,
      `https://www.pexels.com/search/${encodeURIComponent(location.name + ' costa del sol')}/`,
    ]
  }));
}

// Main execution
const allCombinations = generateAllCombinations();
const locationImages = generateLocationImages();

console.log("=== SUMMARY ===");
console.log(`Total locations: ${LOCATIONS.length}`);
console.log(`Total trades: ${TRADES.length}`);
console.log(`Total page combinations: ${allCombinations.length}`);
console.log(`Unique location images needed: ${locationImages.length}`);
console.log("");

// Output files
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Write all combinations
writeFileSync(
  join(__dirname, '../seo-image-data-full.json'),
  JSON.stringify(allCombinations, null, 2)
);
console.log("✅ Written: seo-image-data-full.json (all page combinations)");

// Write location images only (what you actually need to source)
writeFileSync(
  join(__dirname, '../seo-location-images.json'),
  JSON.stringify(locationImages, null, 2)
);
console.log("✅ Written: seo-location-images.json (unique location images)");

// Write CSV for easy batch searching
const csvRows = ["location_slug,location_name,region,search_query_1,search_query_2,unsplash_url,pexels_url"];
for (const loc of locationImages) {
  csvRows.push([
    loc.slug,
    `"${loc.name}"`,
    `"${loc.region}"`,
    `"${loc.image_search_queries[0]}"`,
    `"${loc.image_search_queries[1]}"`,
    `"${loc.recommended_sources[0]}"`,
    `"${loc.recommended_sources[1]}"`
  ].join(","));
}
writeFileSync(
  join(__dirname, '../seo-location-images.csv'),
  csvRows.join("\n")
);
console.log("✅ Written: seo-location-images.csv (for batch searching)");

console.log("");
console.log("=== NEXT STEPS ===");
console.log("1. Use seo-location-images.csv to batch search for images");
console.log("2. Each location needs ONE hero image (reused across all trades)");
console.log("3. Alt text is generated dynamically per trade in the code");
