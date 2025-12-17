import { Metadata } from "next";
import BlogPostPage from "@/pages/BlogPostPage";

interface BlogParams {
  params: Promise<{
    slug: string;
  }>;
}

// Blog post metadata for SEO
const blogPostsMeta: Record<string, {
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  image: string;
}> = {
  "stop-damp-mold-spain": {
    title: "Stop Damp & Mold Spain: The 2025 Guide",
    description: "Damp or Mold in your Spanish villa? Diagnose Condensation vs. Rising Damp. See 2025 repair costs, chemical injection prices & legal rights.",
    author: "Carlos Rodriguez",
    date: "2025-11-26",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop",
  },
  "renovation-permits-andalucia-2025": {
    title: "The Ultimate Guide to Renovation Permits in Andalucia",
    description: "Navigate Licencia de Obra permits in Andalucia. Complete guide to major and minor permits, costs, timelines and requirements for 2025.",
    author: "Carlos Rodriguez",
    date: "2025-12-10",
    category: "Legal/Permits",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop",
  },
  "pool-water-update-2025": {
    title: "Costa del Sol Water Update 2025: Can I Finally Fill My Pool?",
    description: "Good news! Pool filling ban lifted in May 2025. Learn the new rules, daily limits, and how to stay compliant with Junta de Andalucía regulations.",
    author: "Maria Santos",
    date: "2025-12-08",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2940&auto=format&fit=crop",
  },
  "new-rental-laws-2025": {
    title: "New Rental Laws April 2025: Can Your Neighbors Ban Your Airbnb?",
    description: "The new Horizontal Property Law reform allows Communities to vote on banning holiday rentals. Understand your rights and the 3/5ths majority rule.",
    author: "Carlos Rodriguez",
    date: "2025-12-05",
    category: "Legal/Permits",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop",
  },
  "renovating-older-villa-2025": {
    title: "Why Renovating an Older Villa is the Smartest Investment in 2025",
    description: "With new build supply limited and Golden Triangle prices up 12%, renovating older stock in prime locations is the smart strategy for 2025.",
    author: "James Mitchell",
    date: "2025-12-02",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
  },
  "malaga-hard-water-boiler": {
    title: "The Silent Boiler Killer: Dealing with Malaga's Hard Water",
    description: "Malaga has the highest calcium levels in Europe. Learn how to protect your boiler and water heater from limescale damage.",
    author: "Pedro Garcia",
    date: "2025-11-28",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2940&auto=format&fit=crop",
  },
  "solar-panels-costa-del-sol-roi": {
    title: "Is Solar Power Worth It on the Costa del Sol? (2025 Data)",
    description: "With electricity at €0.25/kWh and new 2025 grants, solar panels can pay for themselves in 3-5 years. See real ROI calculations.",
    author: "Elena Fernandez",
    date: "2025-11-15",
    category: "Cost Guides",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2942&auto=format&fit=crop",
  },
  "emergency-plumber-costa-del-sol": {
    title: "Emergency Plumber Costa del Sol: What to Expect (2025)",
    description: "Need an emergency plumber in Marbella or Estepona? See 2025 call-out costs, what counts as an emergency, and how to find 24/7 plumbers fast.",
    author: "Pedro Garcia",
    date: "2025-11-08",
    category: "Cost Guides",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2940&auto=format&fit=crop",
  },
  "air-conditioning-cost-spain-2025": {
    title: "How Much Does Air Conditioning Cost in Spain? (2025 Guide)",
    description: "AC installation costs in Spain 2025. Compare split system, ducted & portable unit prices. See running costs, best brands & find verified installers.",
    author: "Pedro Garcia",
    date: "2025-11-12",
    category: "Cost Guides",
    image: "https://images.unsplash.com/photo-1631545308938-b587e9b9b8b9?q=80&w=2940&auto=format&fit=crop",
  },
  "protecting-home-squatters-2025": {
    title: "Protecting Your Holiday Home from Okupas (Squatters) in 2025",
    description: "With new housing laws, non-resident owners need to act. Learn about anti-bumping locks, alarms, and legal prevention strategies.",
    author: "Carlos Rodriguez",
    date: "2025-11-22",
    category: "Legal/Permits",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop",
  },
  "cleaning-calima-dust": {
    title: "Cleaning Up After the Calima: Don't Ruin Your Facade",
    description: "Another Saharan dust storm has turned the Costa orange. Learn how to clean it correctly without damaging your paintwork.",
    author: "Sofia Marti",
    date: "2025-11-25",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940&auto=format&fit=crop",
  },
  "electrician-costa-del-sol-guide": {
    title: "Finding a Reliable Electrician on the Costa del Sol (2025)",
    description: "How to find a qualified electrician in Marbella, Estepona & the Costa del Sol. Understand Spanish electrical certificates, costs & what questions to ask.",
    author: "Carlos Rodriguez",
    date: "2025-11-10",
    category: "Cost Guides",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2940&auto=format&fit=crop",
  },
  "pool-maintenance-cost-spain-2025": {
    title: "Pool Maintenance Costs in Spain 2025: Complete Guide",
    description: "How much does pool maintenance cost? See 2025 prices for weekly cleaning, chemicals, repairs & winterization on the Costa del Sol.",
    author: "Maria Santos",
    date: "2025-11-05",
    category: "Cost Guides",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2940&auto=format&fit=crop",
  },
  "painting-house-cost-spain-2025": {
    title: "Painting Your Spanish Villa: Costs & Best Time (2025)",
    description: "How much does it cost to paint a house in Spain? 2025 prices for interior & exterior, best time of year, and tips for hiring painters.",
    author: "Sofia Marti",
    date: "2025-11-02",
    category: "Cost Guides",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2940&auto=format&fit=crop",
  },
};

export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsMeta[slug];

  if (!post) {
    return {
      title: "Blog Post Not Found | CostaTrades",
      description: "The blog post you are looking for does not exist.",
    };
  }

  const url = `https://costatrades.com/blog/${slug}`;

  return {
    title: `${post.title} | CostaTrades`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPost({ params }: BlogParams) {
  const { slug } = await params;
  const post = blogPostsMeta[slug];

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://costatrades.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://costatrades.com/blog" },
      { "@type": "ListItem", position: 3, name: post?.title || slug, item: `https://costatrades.com/blog/${slug}` },
    ],
  };

  // Article Schema for AEO
  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "CostaTrades",
      url: "https://costatrades.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://costatrades.com/blog/${slug}`,
    },
    articleSection: post.category,
    inLanguage: "en",
  } : null;

  // FAQ Schema for AEO - common questions about the topic
  const faqSchema = post ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does this guide about ${post.category.toLowerCase()} cover?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: post.description,
        },
      },
      {
        "@type": "Question",
        name: "Is this guide updated for 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, this guide was published on ${post.date} and contains the latest information for Costa del Sol homeowners in 2025.`,
        },
      },
    ],
  } : null;

  // Combined schema
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, articleSchema, faqSchema].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <BlogPostPage />
    </>
  );
}
