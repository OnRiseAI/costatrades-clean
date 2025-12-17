import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://tyzydfqfffxwvrrfhsdm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY'
);

async function getCategoryBreakdown() {
  // Get all records with their categories
  const { data, error } = await supabase
    .from('tradespeople')
    .select('costatrades_category, category_display');

  if (error) {
    console.log('Error:', error.message);
    return;
  }

  // Count by category
  const categoryCounts = {};
  data.forEach(record => {
    const cat = record.costatrades_category || 'Uncategorized';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  console.log('\n=== INDUSTRIES IN SUPABASE ===\n');
  console.log(`Total tradespeople: ${data.length}\n`);

  // Sort by count descending
  const sorted = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  sorted.forEach(([category, count]) => {
    console.log(`${category}: ${count}`);
  });
}

getCategoryBreakdown().then(() => process.exit(0));
