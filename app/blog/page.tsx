import { Metadata } from "next";
import BlogPage from "@/pages/BlogPage";

export const metadata: Metadata = {
  title: "The Homeowner's Journal | Expert Guides for Costa del Sol",
  description:
    "Expert guides on renovations, maintenance, legal changes and costs for international homeowners across the Costa del Sol. Updated for 2025.",
  openGraph: {
    title: "The Homeowner's Journal | CostaTrades Blog",
    description:
      "Expert insights, cost guides, and local knowledge for living on the Costa del Sol.",
    type: "website",
    url: "https://costatrades.com/blog",
  },
  alternates: {
    canonical: "https://costatrades.com/blog",
  },
};

// Blog schema data
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "The Homeowner's Journal",
  description:
    "Expert guides on renovations, maintenance, legal changes and costs for international homeowners across the Costa del Sol.",
  url: "https://costatrades.com/blog",
  publisher: {
    "@type": "Organization",
    name: "CostaTrades",
    url: "https://costatrades.com",
  },
  blogPost: [
    {
      "@type": "BlogPosting",
      headline: "The Ultimate Guide to Renovation Permits in Andalucia",
      url: "https://costatrades.com/blog/renovation-permits-andalucia-2025",
      datePublished: "2025-12-10",
      author: { "@type": "Person", name: "Carlos Rodriguez" },
    },
    {
      "@type": "BlogPosting",
      headline: "Costa del Sol Water Update 2025: Can I Finally Fill My Pool?",
      url: "https://costatrades.com/blog/pool-water-update-2025",
      datePublished: "2025-12-08",
      author: { "@type": "Person", name: "Maria Santos" },
    },
    {
      "@type": "BlogPosting",
      headline: "New Rental Laws April 2025: Can Your Neighbors Ban Your Airbnb?",
      url: "https://costatrades.com/blog/new-rental-laws-2025",
      datePublished: "2025-12-05",
      author: { "@type": "Person", name: "Carlos Rodriguez" },
    },
  ],
};

// ItemList schema for article listing
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CostaTrades Blog Articles",
  description: "Expert guides for homeowners on the Costa del Sol",
  numberOfItems: 15,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "The Ultimate Guide to Renovation Permits in Andalucia",
      url: "https://costatrades.com/blog/renovation-permits-andalucia-2025",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Costa del Sol Water Update 2025",
      url: "https://costatrades.com/blog/pool-water-update-2025",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "New Rental Laws April 2025",
      url: "https://costatrades.com/blog/new-rental-laws-2025",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Why Renovating an Older Villa is the Smartest Investment",
      url: "https://costatrades.com/blog/renovating-older-villa-2025",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Is Solar Power Worth It on the Costa del Sol?",
      url: "https://costatrades.com/blog/solar-panels-costa-del-sol-roi",
    },
  ],
};

// BreadcrumbList schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://costatrades.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://costatrades.com/blog" },
  ],
};

// Combined schema
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [blogSchema, itemListSchema, breadcrumbSchema],
};

export default function Blog() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <BlogPage />
    </>
  );
}
