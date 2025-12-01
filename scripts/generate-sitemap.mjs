import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const DOMAIN = 'https://www.costatrades.com';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase Keys in .env file.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function generateSitemap() {
  console.log('🗺️  Fetching data from Supabase...');

  // Only fetch the minimal fields to avoid extra data
  const { data: locations, error: locError } = await supabase
    .from('location_profiles')
    .select('slug');

  const { data: trades, error: tradeError } = await supabase
    .from('trade_profiles')
    .select('service_slug');

  if (locError || tradeError) {
    console.error('❌ Database Error:', locError || tradeError);
    return;
  }

  const today = new Date().toISOString();
  const urls = [];

  // Static pages
  const staticPaths = [
    '/',
    '/home',
    '/how-it-works',
    '/verification-promise',
    '/why-us',
    '/faq',
    '/cost-guides',
    '/holiday-homes',
    '/landlords',
    '/about',
    '/contact',
    '/blog',
    '/join-as-tradesperson',
    '/login',
    '/post-job'
  ];

  staticPaths.forEach((p) => {
    urls.push({ loc: `${DOMAIN}${p}`, lastmod: today, priority: '1.0' });
  });

  // Locations (hub pages)
  locations.forEach((loc) => {
    urls.push({ loc: `${DOMAIN}/locations/${loc.slug}`, lastmod: today, priority: '0.9' });
  });

  // Location + service pages
  locations.forEach((loc) => {
    trades.forEach((trade) => {
      urls.push({
        loc: `${DOMAIN}/locations/${loc.slug}/${trade.service_slug}`,
        lastmod: today,
        priority: '0.8'
      });
    });
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>`;

  const outputPath = path.resolve('public', 'sitemap.xml');

  try {
    fs.writeFileSync(outputPath, sitemapContent, 'utf8');
    console.log(`✅ Sitemap generated with ${urls.length} URLs!`);
    console.log(`📂 Saved to: ${outputPath}`);
  } catch (err) {
    console.error("❌ Could not save file. Make sure a 'public' folder exists.", err);
  }
}

generateSitemap();