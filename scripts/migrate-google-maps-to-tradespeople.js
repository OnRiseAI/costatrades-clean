/**
 * Migration Script: google_maps_businesses -> tradespeople
 *
 * Transfers scraped Google Maps data to the main tradespeople table
 * with proper location tier assignments and category mappings.
 *
 * Usage:
 * node scripts/migrate-google-maps-to-tradespeople.js
 */

const SUPABASE_URL = "https://tyzydfqfffxwvrrfhsdm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY";

// Location tier mappings
const LOCATION_TIERS = {
  // Benalmádena Area
  "Benalmádena": { tier1_slug: "benalmadena-area", tier1_name: "Benalmádena Area", tier2_slug: "benalmadena", tier2_name: "Benalmádena" },
  "Benalmadena": { tier1_slug: "benalmadena-area", tier1_name: "Benalmádena Area", tier2_slug: "benalmadena", tier2_name: "Benalmádena" },
  "Arroyo de la Miel": { tier1_slug: "benalmadena-area", tier1_name: "Benalmádena Area", tier2_slug: "arroyo-de-la-miel", tier2_name: "Arroyo de la Miel" },
  "Arroyo De La Miel-Benalmádena Costa": { tier1_slug: "benalmadena-area", tier1_name: "Benalmádena Area", tier2_slug: "arroyo-de-la-miel", tier2_name: "Arroyo de la Miel" },
  "Arroyo de la Miel - Benalmádena Costa": { tier1_slug: "benalmadena-area", tier1_name: "Benalmádena Area", tier2_slug: "arroyo-de-la-miel", tier2_name: "Arroyo de la Miel" },
  "Benalmadena Costa": { tier1_slug: "benalmadena-area", tier1_name: "Benalmádena Area", tier2_slug: "benalmadena-costa", tier2_name: "Benalmádena Costa" },

  // Torremolinos Area
  "Torremolinos": { tier1_slug: "torremolinos-area", tier1_name: "Torremolinos Area", tier2_slug: "torremolinos", tier2_name: "Torremolinos" },

  // Fuengirola Area
  "Fuengirola": { tier1_slug: "fuengirola-area", tier1_name: "Fuengirola Area", tier2_slug: "fuengirola", tier2_name: "Fuengirola" },
  "Las Lagunas": { tier1_slug: "mijas-area", tier1_name: "Mijas Area", tier2_slug: "las-lagunas", tier2_name: "Las Lagunas" },

  // Estepona Area
  "Estepona": { tier1_slug: "estepona-area", tier1_name: "Estepona Area", tier2_slug: "estepona", tier2_name: "Estepona" },
  "Cancelada": { tier1_slug: "estepona-area", tier1_name: "Estepona Area", tier2_slug: "cancelada", tier2_name: "Cancelada" },
  "El Paraíso": { tier1_slug: "estepona-area", tier1_name: "Estepona Area", tier2_slug: "el-paraiso", tier2_name: "El Paraíso" },
  "Atalaya Isdabe": { tier1_slug: "estepona-area", tier1_name: "Estepona Area", tier2_slug: "atalaya-isdabe", tier2_name: "Atalaya Isdabe" },
  "Buenas Noches": { tier1_slug: "estepona-area", tier1_name: "Estepona Area", tier2_slug: "buenas-noches", tier2_name: "Buenas Noches" },
  "Casares": { tier1_slug: "estepona-area", tier1_name: "Estepona Area", tier2_slug: "casares", tier2_name: "Casares" },
  "Casares Costa": { tier1_slug: "estepona-area", tier1_name: "Estepona Area", tier2_slug: "casares-costa", tier2_name: "Casares Costa" },
  "Costalita": { tier1_slug: "estepona-area", tier1_name: "Estepona Area", tier2_slug: "costalita", tier2_name: "Costalita" },

  // Málaga Area
  "Málaga": { tier1_slug: "malaga-area", tier1_name: "Málaga Area", tier2_slug: "malaga", tier2_name: "Málaga" },
  "Malaga": { tier1_slug: "malaga-area", tier1_name: "Málaga Area", tier2_slug: "malaga", tier2_name: "Málaga" },
  "Churriana": { tier1_slug: "malaga-area", tier1_name: "Málaga Area", tier2_slug: "churriana", tier2_name: "Churriana" },
  "Alhaurín de la Torre": { tier1_slug: "malaga-area", tier1_name: "Málaga Area", tier2_slug: "alhaurin-de-la-torre", tier2_name: "Alhaurín de la Torre" },
  "Campanillas": { tier1_slug: "malaga-area", tier1_name: "Málaga Area", tier2_slug: "campanillas", tier2_name: "Campanillas" },

  // Default
  "default": { tier1_slug: "costa-del-sol", tier1_name: "Costa del Sol", tier2_slug: "costa-del-sol", tier2_name: "Costa del Sol" }
};

// Category display name mappings
const CATEGORY_DISPLAY = {
  "plumber": "Plumber",
  "electrician": "Electrician",
  "builder": "Builder",
  "roofer": "Roofer",
  "gardener": "Gardener",
  "handyman": "Handyman",
  "locksmith": "Locksmith",
  "renovation-specialist": "Renovation Specialist",
  "bathroom-fitter": "Bathroom Fitter",
  "ac-repair": "AC Repair Technician",
  "solar-installation": "Solar Installer",
  "painter": "Painter",
  "painter-decorator": "Painter & Decorator",
  "carpenter": "Carpenter",
  "architect": "Architect",
  "interior-designer": "Interior Designer",
  "pest-control": "Pest Control",
  "pool-maintenance": "Pool Maintenance",
  "security-alarms": "Security & Alarms",
  "appliance-repair": "Appliance Repair",
  "window-fitter": "Window Fitter",
  "tiler": "Tiler",
  "flooring": "Flooring Specialist",
  "kitchen-fitter": "Kitchen Fitter",
  "plasterer": "Plasterer",
  "general-contractor": "General Contractor"
};

// Google category to costatrades category mapping
const GOOGLE_TO_COSTATRADES = {
  "plumber": "plumber",
  "electrician": "electrician",
  "electrical installation service": "electrician",
  "builder": "builder",
  "building firm": "builder",
  "construction company": "builder",
  "general contractor": "general-contractor",
  "roofer": "roofer",
  "roofing contractor": "roofer",
  "gardener": "gardener",
  "landscape designer": "gardener",
  "landscaper": "gardener",
  "landscaping supply store": "gardener",
  "handyman": "handyman",
  "locksmith": "locksmith",
  "painter": "painter",
  "painting contractor": "painter",
  "house painter": "painter",
  "carpenter": "carpenter",
  "cabinetry": "carpenter",
  "cabinet maker": "carpenter",
  "woodworking": "carpenter",
  "architect": "architect",
  "interior designer": "interior-designer",
  "interior design studio": "interior-designer",
  "pest control service": "pest-control",
  "swimming pool contractor": "pool-maintenance",
  "swimming pool repair service": "pool-maintenance",
  "pool cleaning service": "pool-maintenance",
  "air conditioning contractor": "ac-repair",
  "hvac contractor": "ac-repair",
  "air conditioning repair service": "ac-repair",
  "solar energy contractor": "solar-installation",
  "solar energy equipment supplier": "solar-installation",
  "bathroom remodeler": "bathroom-fitter",
  "security system installer": "security-alarms",
  "alarm system installer": "security-alarms",
  "window installation service": "window-fitter",
  "tile contractor": "tiler",
  "flooring contractor": "flooring",
  "flooring store": "flooring",
  "kitchen remodeler": "kitchen-fitter",
  "plasterer": "plasterer",
  "home improvement store": "renovation-specialist",
  "remodeler": "renovation-specialist",
  "renovation contractor": "renovation-specialist"
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

function getLocationTier(city) {
  if (!city) return LOCATION_TIERS["default"];

  // Try exact match first
  if (LOCATION_TIERS[city]) return LOCATION_TIERS[city];

  // Try case-insensitive match
  const lowerCity = city.toLowerCase();
  for (const [key, value] of Object.entries(LOCATION_TIERS)) {
    if (key.toLowerCase() === lowerCity) return value;
  }

  // Try partial match
  for (const [key, value] of Object.entries(LOCATION_TIERS)) {
    if (lowerCity.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerCity)) {
      return value;
    }
  }

  return LOCATION_TIERS["default"];
}

function mapCategory(googleCategory, googleCategories) {
  if (!googleCategory && !googleCategories) return null;

  // Try main category
  if (googleCategory) {
    const lower = googleCategory.toLowerCase();
    if (GOOGLE_TO_COSTATRADES[lower]) {
      return GOOGLE_TO_COSTATRADES[lower];
    }
  }

  // Try categories array
  if (googleCategories && Array.isArray(googleCategories)) {
    for (const cat of googleCategories) {
      const lower = cat.toLowerCase();
      if (GOOGLE_TO_COSTATRADES[lower]) {
        return GOOGLE_TO_COSTATRADES[lower];
      }
    }
  }

  // Keyword-based fallback
  const allCats = [googleCategory, ...(googleCategories || [])].filter(Boolean).join(' ').toLowerCase();

  if (allCats.includes('plumb') || allCats.includes('fontaner')) return 'plumber';
  if (allCats.includes('electric') || allCats.includes('eléctric')) return 'electrician';
  if (allCats.includes('build') || allCats.includes('construct') || allCats.includes('reforma')) return 'builder';
  if (allCats.includes('garden') || allCats.includes('landscap') || allCats.includes('jardin')) return 'gardener';
  if (allCats.includes('paint') || allCats.includes('pintur')) return 'painter';
  if (allCats.includes('carpint') || allCats.includes('cabinet') || allCats.includes('wood')) return 'carpenter';
  if (allCats.includes('architect') || allCats.includes('arquitect')) return 'architect';
  if (allCats.includes('interior') || allCats.includes('design')) return 'interior-designer';
  if (allCats.includes('air condition') || allCats.includes('hvac') || allCats.includes('clima')) return 'ac-repair';
  if (allCats.includes('solar') || allCats.includes('photovoltaic')) return 'solar-installation';
  if (allCats.includes('pool') || allCats.includes('piscin')) return 'pool-maintenance';
  if (allCats.includes('pest') || allCats.includes('plaga')) return 'pest-control';
  if (allCats.includes('lock') || allCats.includes('cerraj')) return 'locksmith';
  if (allCats.includes('roof') || allCats.includes('tejad')) return 'roofer';
  if (allCats.includes('bathroom') || allCats.includes('baño')) return 'bathroom-fitter';
  if (allCats.includes('kitchen') || allCats.includes('cocina')) return 'kitchen-fitter';
  if (allCats.includes('tile') || allCats.includes('azulej')) return 'tiler';
  if (allCats.includes('floor') || allCats.includes('suelo') || allCats.includes('parquet')) return 'flooring';
  if (allCats.includes('window') || allCats.includes('ventana') || allCats.includes('pvc')) return 'window-fitter';
  if (allCats.includes('security') || allCats.includes('alarm') || allCats.includes('seguridad')) return 'security-alarms';

  return 'handyman'; // Default fallback
}

async function fetchGoogleMapsBusinesses() {
  console.log('Fetching businesses from google_maps_businesses...');

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/google_maps_businesses?select=*`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Range': '0-9999'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return await response.json();
}

async function fetchExistingPlaceIds() {
  console.log('Fetching existing place_ids from tradespeople...');

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/tradespeople?select=place_id`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Range': '0-9999'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const data = await response.json();
  return new Set(data.map(t => t.place_id).filter(Boolean));
}

async function insertTradesperson(record) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/tradespeople`,
    {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(record)
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to insert: ${error}`);
  }

  return true;
}

function transformRecord(business) {
  const locationTier = getLocationTier(business.city);
  const category = mapCategory(business.google_category, business.google_categories);
  const categoryDisplay = CATEGORY_DISPLAY[category] || category;

  const baseSlug = slugify(business.name);
  const placeIdSuffix = business.place_id ? `-${business.place_id.substring(0, 6)}` : '';
  const slug = `${baseSlug}${placeIdSuffix}`;

  const urlPath = `/locations/${locationTier.tier1_slug}/${locationTier.tier2_slug}/${category}/${slug}`;

  return {
    slug,
    name: business.name,
    costatrades_category: category,
    category_display: categoryDisplay,
    city: business.city,
    tier1_slug: locationTier.tier1_slug,
    tier1_name: locationTier.tier1_name,
    tier2_slug: locationTier.tier2_slug,
    tier2_name: locationTier.tier2_name,
    url_path: urlPath,
    address: business.address,
    phone: business.phone,
    website: business.website,
    rating: business.rating,
    reviews_count: business.reviews_count,
    latitude: business.latitude,
    longitude: business.longitude,
    verified: business.verified || false,
    images: business.images || '[]',
    opening_hours: business.opening_hours,
    google_maps_url: business.google_maps_url,
    place_id: business.place_id
  };
}

async function main() {
  console.log('=== Migration: google_maps_businesses -> tradespeople ===\n');

  try {
    // Fetch all data
    const businesses = await fetchGoogleMapsBusinesses();
    console.log(`Found ${businesses.length} businesses in google_maps_businesses\n`);

    const existingPlaceIds = await fetchExistingPlaceIds();
    console.log(`Found ${existingPlaceIds.size} existing place_ids in tradespeople\n`);

    // Filter new records
    const newBusinesses = businesses.filter(b => b.place_id && !existingPlaceIds.has(b.place_id));
    console.log(`${newBusinesses.length} new businesses to migrate\n`);

    if (newBusinesses.length === 0) {
      console.log('No new businesses to migrate!');
      return;
    }

    // Migrate
    let inserted = 0;
    let errors = 0;
    const categoryCount = {};
    const locationCount = {};

    for (const business of newBusinesses) {
      try {
        const record = transformRecord(business);
        await insertTradesperson(record);
        inserted++;

        // Track stats
        categoryCount[record.costatrades_category] = (categoryCount[record.costatrades_category] || 0) + 1;
        locationCount[record.tier1_name] = (locationCount[record.tier1_name] || 0) + 1;

        if (inserted % 50 === 0) {
          console.log(`Progress: ${inserted}/${newBusinesses.length} inserted`);
        }
      } catch (err) {
        console.error(`Error inserting ${business.name}: ${err.message}`);
        errors++;
      }
    }

    console.log('\n=== Migration Complete ===');
    console.log(`Inserted: ${inserted}`);
    console.log(`Errors: ${errors}`);

    console.log('\nBy Category:');
    Object.entries(categoryCount).sort((a,b) => b[1]-a[1]).forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });

    console.log('\nBy Location:');
    Object.entries(locationCount).sort((a,b) => b[1]-a[1]).forEach(([loc, count]) => {
      console.log(`  ${loc}: ${count}`);
    });

  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

main();
