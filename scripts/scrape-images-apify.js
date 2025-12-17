/**
 * Apify Google Maps Images Scraper
 *
 * This script fetches images for tradespeople using their place_id
 * and updates the Supabase database.
 *
 * Prerequisites:
 * 1. Get an Apify API token from https://console.apify.com/account/integrations
 * 2. Set environment variable: APIFY_API_TOKEN=your_token
 *
 * Usage:
 * node scripts/scrape-images-apify.js
 */

const SUPABASE_URL = "https://tyzydfqfffxwvrrfhsdm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY";

// Apify Google Maps Scraper Actor ID
const APIFY_ACTOR_ID = "nwua9Gu5YrADL7ZDj"; // Google Maps Scraper

async function fetchTradespeople(offset = 0) {
  console.log(`Fetching tradespeople without images (offset: ${offset})...`);

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/tradespeople?select=id,name,place_id,images&or=(images.is.null,images.eq.[])&limit=100&offset=${offset}`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch tradespeople: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`Found ${data.length} tradespeople without images`);
  return data;
}

async function runApifyScraper(placeIds, apiToken) {
  console.log(`Starting Apify scraper for ${placeIds.length} place IDs...`);

  // Prepare input for Google Maps Scraper
  // Main image is FREE, additional images cost $0.0005 each + $0.002 per place
  // Setting maxImages to 0 = only get the free main image
  const input = {
    searchStringsArray: placeIds.map(id => `place_id:${id}`),
    maxCrawledPlacesPerSearch: 1,
    language: "en",
    maxImages: 0, // 0 = only main image (FREE), >0 = additional images ($0.002/place + $0.0005/image)
    scrapeReviewerName: false,
    scrapeReviewerId: false,
    scrapeReviewerUrl: false,
    scrapeReviewId: false,
    scrapeReviewUrl: false,
    scrapeResponseFromOwnerText: false,
  };

  // Start the actor run
  const runResponse = await fetch(
    `https://api.apify.com/v2/acts/${APIFY_ACTOR_ID}/runs?token=${apiToken}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  if (!runResponse.ok) {
    const error = await runResponse.text();
    throw new Error(`Failed to start Apify actor: ${error}`);
  }

  const runData = await runResponse.json();
  const runId = runData.data.id;
  console.log(`Apify run started: ${runId}`);

  // Wait for the run to complete
  console.log("Waiting for scraper to complete...");
  let status = "RUNNING";
  while (status === "RUNNING" || status === "READY") {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const statusResponse = await fetch(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${apiToken}`
    );
    const statusData = await statusResponse.json();
    status = statusData.data.status;
    console.log(`Status: ${status}`);
  }

  if (status !== "SUCCEEDED") {
    throw new Error(`Apify run failed with status: ${status}`);
  }

  // Get the results
  const datasetId = runData.data.defaultDatasetId;
  const resultsResponse = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${apiToken}`
  );

  if (!resultsResponse.ok) {
    throw new Error("Failed to fetch Apify results");
  }

  return await resultsResponse.json();
}

async function updateTradespersonImages(id, images) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/tradespeople?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        images: JSON.stringify(images),
      }),
    }
  );

  if (!response.ok) {
    console.error(`Failed to update tradesperson ${id}: ${response.statusText}`);
    return false;
  }
  return true;
}

async function main() {
  // Accept token from command line argument or environment variable
  const apiToken = process.argv[2] || process.env.APIFY_API_TOKEN;
  const offset = parseInt(process.argv[3] || "0", 10);

  if (!apiToken) {
    console.error("Error: Apify API token not provided");
    console.log("\nUsage:");
    console.log("  node scripts/scrape-images-apify.js YOUR_API_TOKEN [offset]");
    console.log("\nExamples:");
    console.log("  node scripts/scrape-images-apify.js YOUR_TOKEN      # Start from 0");
    console.log("  node scripts/scrape-images-apify.js YOUR_TOKEN 100  # Start from offset 100");
    console.log("  node scripts/scrape-images-apify.js YOUR_TOKEN 200  # Start from offset 200");
    process.exit(1);
  }

  try {
    // Fetch tradespeople without images
    const tradespeople = await fetchTradespeople(offset);

    if (tradespeople.length === 0) {
      console.log("All tradespeople already have images!");
      return;
    }

    // Get place_ids
    const placeIdMap = new Map();
    tradespeople.forEach((tp) => {
      if (tp.place_id) {
        placeIdMap.set(tp.place_id, tp.id);
      }
    });

    const placeIds = Array.from(placeIdMap.keys());
    console.log(`Found ${placeIds.length} place IDs to scrape`);

    if (placeIds.length === 0) {
      console.log("No place IDs found to scrape");
      return;
    }

    // Run Apify scraper
    const results = await runApifyScraper(placeIds, apiToken);
    console.log(`Got ${results.length} results from Apify`);

    // Update database
    let updated = 0;
    let skipped = 0;

    for (const result of results) {
      const placeId = result.placeId;
      const tradespersonId = placeIdMap.get(placeId);

      if (!tradespersonId) {
        console.log(`No tradesperson found for place_id: ${placeId}`);
        skipped++;
        continue;
      }

      const images = result.imageUrls || result.images || [];

      if (images.length === 0) {
        console.log(`No images found for: ${result.title || placeId}`);
        skipped++;
        continue;
      }

      console.log(`Updating ${result.title}: ${images.length} images`);
      const success = await updateTradespersonImages(tradespersonId, images);

      if (success) {
        updated++;
      }
    }

    console.log("\n--- Summary ---");
    console.log(`Updated: ${updated}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Total processed: ${results.length}`);

  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
