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
  ];

  // Fetch all tradespeople from Supabase
  const { data: tradespeople, error } = await supabase
    .from("tradespeople")
    .select("url_path, updated_at");

  if (error) {
    console.error("Error fetching tradespeople for sitemap:", error);
    return staticPages;
  }

  // Generate tradesperson pages
  const tradespersonPages = tradespeople.map((tp) => ({
    url: `${baseUrl}${tp.url_path}`,
    lastModified: tp.updated_at ? new Date(tp.updated_at) : new Date(),
    priority: 0.8,
  }));

  return [...staticPages, ...tradespersonPages];
}
