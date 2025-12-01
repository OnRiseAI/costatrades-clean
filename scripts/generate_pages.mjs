import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

// --- CONFIGURATION ---
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;
const BUILDER_KEY = process.env.BUILDER_PRIVATE_KEY;
const BUILDER_MODEL = 'page'; 

if (!SUPABASE_URL || !SUPABASE_KEY || !BUILDER_KEY) {
  console.error("❌ Missing API Keys. Check your .env file.");
  process.exit(1);
}

// Initialize Database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  console.log("🚀 Starting Page Generator...");

  // 1. Fetch Data from Supabase
  const { data: locations, error: locError } = await supabase.from('location_profiles').select('*');
  const { data: trades, error: tradeError } = await supabase.from('trade_profiles').select('*');

  if (locError || tradeError) {
    console.error("❌ Database Error:", locError || tradeError);
    return;
  }

  console.log(`📊 Found ${locations.length} Locations and ${trades.length} Trades.`);
  
  // 2. The Loop
  for (const location of locations) {
    for (const trade of trades) {
      
      const urlPath = `/locations/${location.slug}/${trade.service_slug}`;
      const pageTitle = `${trade.service_name} in ${location.region_name}`;

      // 3. The Payload to Builder.io
      const body = {
        name: pageTitle,
        published: 'published', 
        query: [
          {
            property: 'urlPath',
            operator: 'is',
            value: urlPath
          }
        ],
        data: {
          // --- FIX: NO 'inputs' WRAPPER ---
          // We put the data directly at the root of the data object.
          // Your component will read props.locationData and props.tradeData
          locationData: location,
          tradeData: trade
        }
      };

      try {
        await axios.post(`https://builder.io/api/v1/write/${BUILDER_MODEL}`, body, {
          headers: {
            Authorization: `Bearer ${BUILDER_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(`✅ Created: ${urlPath}`);
      } catch (error) {
        if (error.response?.data?.message?.includes('already exists')) {
             console.log(`⚠️ Exists: ${urlPath}`);
        } else {
             // Log the specific error message to help debugging
             console.error(`❌ Failed: ${urlPath}`, JSON.stringify(error.response?.data || error.message));
        }
      }

      // Small delay to be nice to the API
      await new Promise(r => setTimeout(r, 100));
    }
  }
  console.log("🎉 MISSION COMPLETE.");
}

run();