/**
 * Extract images from Apify Google Places CSV and update Supabase
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = "https://tyzydfqfffxwvrrfhsdm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY";

// Simple CSV parser that handles quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);

  return result;
}

async function main() {
  const csvPath = 'A:/Downloads/dataset_crawler-google-places_2025-12-17_00-53-12-004.csv';

  console.log('Reading CSV file...');
  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split('\n');

  console.log('Total lines:', lines.length);

  // Parse header
  const header = parseCSVLine(lines[0]);
  console.log('Total columns:', header.length);

  // Find key columns
  const placeIdIdx = header.indexOf('placeId');
  const titleIdx = header.indexOf('title');
  const imageUrlIdx = header.indexOf('imageUrl');

  // Find all imageUrls columns
  const imageUrlsIndices = [];
  header.forEach((h, i) => {
    if (h.match(/^imageUrls\/\d+$/)) {
      imageUrlsIndices.push(i);
    }
  });

  console.log('\nColumn indices:');
  console.log('  placeId:', placeIdIdx);
  console.log('  title:', titleIdx);
  console.log('  imageUrl:', imageUrlIdx);
  console.log('  imageUrls:', imageUrlsIndices);

  // Extract data
  const businesses = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const row = parseCSVLine(lines[i]);
    const placeId = row[placeIdIdx];
    const title = row[titleIdx];

    // Collect all images
    const images = [];

    // Main image
    if (row[imageUrlIdx] && row[imageUrlIdx].startsWith('http')) {
      images.push(row[imageUrlIdx]);
    }

    // Additional images
    for (const idx of imageUrlsIndices) {
      if (row[idx] && row[idx].startsWith('http') && !images.includes(row[idx])) {
        images.push(row[idx]);
      }
    }

    if (placeId && images.length > 0) {
      businesses.push({ placeId, title, images });
    }
  }

  console.log('\nBusinesses with images:', businesses.length);

  // Show sample
  console.log('\nSample data (first 5):');
  businesses.slice(0, 5).forEach(b => {
    console.log(`  ${b.title}: ${b.images.length} images`);
    console.log(`    placeId: ${b.placeId}`);
    console.log(`    first image: ${b.images[0].substring(0, 60)}...`);
  });

  // Output as JSON for SQL update
  const outputPath = path.join(__dirname, 'images-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(businesses, null, 2));
  console.log('\nSaved to:', outputPath);

  // Generate SQL for updating
  console.log('\n--- Generating SQL updates ---');

  let updateCount = 0;
  const sqlStatements = [];

  for (const b of businesses) {
    const imagesJson = JSON.stringify(b.images).replace(/'/g, "''");
    sqlStatements.push(`UPDATE google_maps_businesses SET images = '${imagesJson}'::jsonb WHERE place_id = '${b.placeId}';`);
    updateCount++;
  }

  // Save SQL to file
  const sqlPath = path.join(__dirname, 'update-images.sql');
  fs.writeFileSync(sqlPath, sqlStatements.join('\n'));
  console.log('SQL file saved to:', sqlPath);
  console.log('Total UPDATE statements:', updateCount);
}

main().catch(console.error);
