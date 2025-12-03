/**
 * Pexels Image Downloader with Fallback Chain
 * 
 * SETUP:
 * 1. Get free API key from https://www.pexels.com/api/
 * 2. Run: PEXELS_API_KEY=your_key_here node scripts/download-location-images.mjs
 * 
 * FALLBACK CHAIN:
 * 1. Try: "{location_name} Spain" (e.g., "Cancelada Spain")
 * 2. Fallback: "{region} Spain" (e.g., "Estepona Spain")  
 * 3. Fallback: "Costa del Sol Spain Mediterranean"
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

if (!PEXELS_API_KEY) {
  console.error('❌ Missing PEXELS_API_KEY environment variable');
  console.log('');
  console.log('Get your free API key from: https://www.pexels.com/api/');
  console.log('Then run:');
  console.log('  PEXELS_API_KEY=your_key_here node scripts/download-location-images.mjs');
  process.exit(1);
}

const LOCATIONS = [
  { slug: "alcaidesa", name: "Alcaidesa", region: "Sotogrande", fallback: "Gibraltar coast" },
  { slug: "alhaurin-el-grande", name: "Alhaurín el Grande", region: "Malaga mountains", fallback: "Andalucia white village" },
  { slug: "alozaina", name: "Alozaina", region: "Sierra de las Nieves", fallback: "Andalucia mountain village" },
  { slug: "arroyo-de-la-miel", name: "Arroyo de la Miel", region: "Benalmadena", fallback: "Costa del Sol" },
  { slug: "benalmadena-area", name: "Benalmadena", region: "Costa del Sol", fallback: "Malaga coast" },
  { slug: "benalmadena-costa", name: "Benalmadena Costa", region: "Benalmadena marina", fallback: "Costa del Sol beach" },
  { slug: "benalmadena-pueblo", name: "Benalmadena Pueblo", region: "Benalmadena", fallback: "Andalucia white village" },
  { slug: "calahonda", name: "Calahonda", region: "Mijas Costa", fallback: "Costa del Sol residential" },
  { slug: "cancelada", name: "Cancelada", region: "Estepona", fallback: "Costa del Sol village" },
  { slug: "casares-costa", name: "Casares Costa", region: "Casares", fallback: "Costa del Sol golf" },
  { slug: "coin", name: "Coin", region: "Guadalhorce Valley", fallback: "Andalucia inland town" },
  { slug: "el-chaparral", name: "El Chaparral", region: "Mijas Costa", fallback: "Costa del Sol golf" },
  { slug: "el-rosario", name: "El Rosario", region: "Marbella", fallback: "Marbella beach" },
  { slug: "elviria", name: "Elviria", region: "Marbella", fallback: "Marbella beach dunes" },
  { slug: "estepona-town", name: "Estepona", region: "Estepona old town", fallback: "Costa del Sol flowers" },
  { slug: "frigiliana", name: "Frigiliana", region: "Frigiliana", fallback: "Andalucia white village Moorish" },
  { slug: "guadiaro", name: "Guadiaro", region: "Sotogrande", fallback: "Costa del Sol river" },
  { slug: "guaro", name: "Guaro", region: "Sierra de las Nieves", fallback: "Andalucia mountain village" },
  { slug: "inland-sierra-region", name: "Sierra de las Nieves", region: "Malaga mountains", fallback: "Andalucia mountains" },
  { slug: "la-cala-de-mijas", name: "La Cala de Mijas", region: "Mijas Costa beach", fallback: "Costa del Sol beach promenade" },
  { slug: "la-cala-del-moral", name: "La Cala del Moral", region: "Rincon de la Victoria", fallback: "Malaga coast fishing" },
  { slug: "la-carihuela", name: "La Carihuela", region: "Torremolinos", fallback: "Costa del Sol fishing village" },
  { slug: "la-reserva", name: "La Reserva Sotogrande", region: "Sotogrande golf", fallback: "Costa del Sol luxury" },
  { slug: "las-chapas", name: "Las Chapas", region: "Marbella", fallback: "Marbella pine forest" },
  { slug: "malaga-east-axarquia", name: "Axarquia", region: "Nerja coast", fallback: "Costa del Sol cliffs" },
  { slug: "manilva", name: "Manilva", region: "Manilva vineyards", fallback: "Costa del Sol wine" },
  { slug: "marbella-area", name: "Marbella", region: "Marbella Golden Mile", fallback: "Costa del Sol luxury" },
  { slug: "mijas-costa", name: "Mijas Costa", region: "Mijas beach", fallback: "Costa del Sol beach" },
  { slug: "mijas-pueblo", name: "Mijas Pueblo", region: "Mijas white village", fallback: "Andalucia donkey village" },
  { slug: "miraflores", name: "Miraflores", region: "Mijas Costa golf", fallback: "Costa del Sol residential" },
  { slug: "nerja", name: "Nerja", region: "Nerja Balcon de Europa", fallback: "Costa del Sol cliffs" },
  { slug: "nueva-andalucia", name: "Nueva Andalucia", region: "Marbella golf valley", fallback: "Costa del Sol golf villas" },
  { slug: "ojen", name: "Ojen", region: "Ojen village", fallback: "Andalucia mountain village Marbella" },
  { slug: "pueblo-nuevo", name: "Pueblo Nuevo Sotogrande", region: "Sotogrande", fallback: "Costa del Sol Spanish village" },
  { slug: "puerto-banus", name: "Puerto Banus", region: "Puerto Banus marina", fallback: "Marbella marina yachts" },
  { slug: "puerto-de-la-duquesa", name: "Puerto de la Duquesa", region: "Duquesa marina", fallback: "Costa del Sol marina" },
  { slug: "rincon-de-la-victoria", name: "Rincon de la Victoria", region: "Malaga beach", fallback: "Costa del Sol family beach" },
  { slug: "riviera-del-sol", name: "Riviera del Sol", region: "Mijas Costa", fallback: "Costa del Sol hillside" },
  { slug: "sabinillas", name: "Sabinillas", region: "Manilva coast", fallback: "Costa del Sol Spanish beach" },
  { slug: "san-pedro", name: "San Pedro de Alcantara", region: "San Pedro Marbella", fallback: "Costa del Sol boulevard" },
  { slug: "san-roque-club", name: "San Roque golf", region: "San Roque", fallback: "Costa del Sol golf resort" },
  { slug: "selwo", name: "Selwo Estepona", region: "Estepona hills", fallback: "Costa del Sol nature" },
  { slug: "sotogrande-alto", name: "Sotogrande Alto", region: "Sotogrande golf", fallback: "Costa del Sol luxury villas" },
  { slug: "sotogrande-costa", name: "Sotogrande", region: "Sotogrande marina polo", fallback: "Costa del Sol luxury marina" },
  { slug: "tolox", name: "Tolox", region: "Sierra de las Nieves spa", fallback: "Andalucia mountain spa" },
  { slug: "torre-del-mar", name: "Torre del Mar", region: "Torre del Mar beach", fallback: "Costa del Sol promenade" },
  { slug: "torremolinos", name: "Torremolinos", region: "Torremolinos beach", fallback: "Costa del Sol resort" },
  { slug: "torrox", name: "Torrox", region: "Torrox Costa", fallback: "Costa del Sol Roman ruins" },
  { slug: "velez-malaga", name: "Velez Malaga", region: "Velez Malaga", fallback: "Axarquia historic town" },
];

const OUTPUT_DIR = join(__dirname, '../public/images/locations');

async function searchPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': PEXELS_API_KEY
    }
  });
  
  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.photos?.[0] || null;
}

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  writeFileSync(filepath, Buffer.from(buffer));
}

async function getImageForLocation(location) {
  const searches = [
    `${location.name} Spain`,
    `${location.region} Spain`,
    `${location.fallback} Spain`,
    `Costa del Sol Spain Mediterranean coast`
  ];
  
  for (const query of searches) {
    console.log(`  🔍 Searching: "${query}"`);
    const photo = await searchPexels(query);
    
    if (photo) {
      return {
        url: photo.src.large2x || photo.src.large,
        query: query,
        photographer: photo.photographer,
        pexelsUrl: photo.url
      };
    }
    
    // Rate limit: 200 requests/hour, so small delay
    await new Promise(r => setTimeout(r, 300));
  }
  
  return null;
}

async function main() {
  console.log('🖼️  Pexels Location Image Downloader');
  console.log('=====================================');
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`📍 Locations: ${LOCATIONS.length}`);
  console.log('');
  
  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const results = [];
  let success = 0;
  let failed = 0;
  
  for (let i = 0; i < LOCATIONS.length; i++) {
    const location = LOCATIONS[i];
    console.log(`[${i + 1}/${LOCATIONS.length}] ${location.name}`);
    
    try {
      const image = await getImageForLocation(location);
      
      if (image) {
        const filename = `${location.slug}.jpg`;
        const filepath = join(OUTPUT_DIR, filename);
        
        console.log(`  ✅ Found: ${image.query}`);
        console.log(`  📥 Downloading...`);
        
        await downloadImage(image.url, filepath);
        
        results.push({
          slug: location.slug,
          name: location.name,
          filename: filename,
          searchQuery: image.query,
          photographer: image.photographer,
          pexelsUrl: image.pexelsUrl,
          status: 'success'
        });
        
        success++;
        console.log(`  💾 Saved: ${filename}`);
      } else {
        console.log(`  ❌ No image found`);
        results.push({
          slug: location.slug,
          name: location.name,
          status: 'failed',
          reason: 'No images found for any search query'
        });
        failed++;
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      results.push({
        slug: location.slug,
        name: location.name,
        status: 'error',
        reason: error.message
      });
      failed++;
    }
    
    console.log('');
    
    // Small delay between locations
    await new Promise(r => setTimeout(r, 500));
  }
  
  // Write results log
  const logPath = join(__dirname, '../seo-image-download-log.json');
  writeFileSync(logPath, JSON.stringify(results, null, 2));
  
  console.log('=====================================');
  console.log('📊 SUMMARY');
  console.log(`  ✅ Success: ${success}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`  📄 Log: seo-image-download-log.json`);
  console.log(`  📁 Images: public/images/locations/`);
}

main().catch(console.error);
