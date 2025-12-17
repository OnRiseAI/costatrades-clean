import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tyzydfqfffxwvrrfhsdm.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5enlkZnFmZmZ4d3ZycmZoc2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDQ3NjAsImV4cCI6MjA3OTAyMDc2MH0.F3oEdidvOP6ORwhjWLkYHfdkogY2isIW2IH10Wt7rjY"
);

export default async function sitemap() {
  const baseUrl = "https://costatrades.com";

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/post-job`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/join-as-tradesperson`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/how-it-works`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/cost-guides`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/locations`, lastModified: new Date(), priority: 0.8 },
  ];

  // Fetch all tradespeople from Supabase with location info
  const { data: tradespeople, error } = await supabase
    .from("tradespeople")
    .select("url_path, updated_at, tier1_slug, tier2_slug, costatrades_category");

  if (error) {
    console.error("Error fetching tradespeople for sitemap:", error);
    return staticPages;
  }

  // Use Sets to collect unique location URLs (prevents duplicates)
  const tier1Set = new Set<string>();
  const tier2Set = new Set<string>();
  const tradetypeSet = new Set<string>();
  const tradespersonUrlSet = new Set<string>();

  tradespeople.forEach((tp) => {
    // Collect unique tier1 locations
    if (tp.tier1_slug) {
      tier1Set.add(`/locations/${tp.tier1_slug}`);
    }
    // Collect unique tier2 locations
    if (tp.tier1_slug && tp.tier2_slug) {
      tier2Set.add(`/locations/${tp.tier1_slug}/${tp.tier2_slug}`);
    }
    // Collect unique tradetype pages
    if (tp.tier1_slug && tp.tier2_slug && tp.costatrades_category) {
      tradetypeSet.add(`/locations/${tp.tier1_slug}/${tp.tier2_slug}/${tp.costatrades_category}`);
    }
    // Collect unique tradesperson pages (using url_path)
    if (tp.url_path) {
      tradespersonUrlSet.add(tp.url_path);
    }
  });

  // Generate location hierarchy pages (high priority - hub pages)
  const tier1Pages = Array.from(tier1Set).map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    priority: 0.9,
  }));

  const tier2Pages = Array.from(tier2Set).map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    priority: 0.85,
  }));

  const tradetypePages = Array.from(tradetypeSet).map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  // Generate tradesperson pages (individual profiles)
  const tradespersonPages = Array.from(tradespersonUrlSet).map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  // Log counts for debugging
  console.log(`Sitemap: ${staticPages.length} static, ${tier1Pages.length} tier1, ${tier2Pages.length} tier2, ${tradetypePages.length} tradetype, ${tradespersonPages.length} tradesperson pages`);

  return [
    ...staticPages,
    ...tier1Pages,
    ...tier2Pages,
    ...tradetypePages,
    ...tradespersonPages,
  ];
}
