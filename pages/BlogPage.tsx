"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import {
  ArrowRight,
  Clock,
  Calendar,
  ChevronRight,
  BookOpen,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";

// Mock data for the blog
const featuredPost = {
  id: 1,
  title: "The Ultimate Guide to Renovation Permits in Andalucia",
  excerpt:
    "Navigating the complex world of 'Licencia de Obra' can be daunting. This comprehensive guide breaks down everything you need to know about major and minor permits, costs, and timelines.",
  image:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop",
  category: "Legal/Permits",
  readTime: "12 min read",
  author: "Carlos Rodriguez",
  authorRole: "Legal Expert",
  date: "Dec 10, 2025",
  slug: "renovation-permits-andalucia-2025",
};

const editorsPicks = [
  {
    title: "Is Solar Power Worth It?",
    slug: "solar-panels-costa-del-sol-roi",
    category: "Cost Guides",
    readTime: "8 min",
  },
  {
    title: "Emergency Plumber Guide",
    slug: "emergency-plumber-costa-del-sol",
    category: "Guide",
    readTime: "6 min",
  },
  {
    title: "Protecting from Squatters",
    slug: "protecting-home-squatters-2025",
    category: "Legal",
    readTime: "6 min",
  },
];

const categories = [
  { name: "All", count: 15 },
  { name: "Renovation", count: 3 },
  { name: "Maintenance", count: 4 },
  { name: "Legal/Permits", count: 4 },
  { name: "Cost Guides", count: 4 },
];

const recentPosts = [
  {
    id: 1,
    title: "Costa del Sol Water Update 2025: Can I Finally Fill My Pool?",
    excerpt:
      "Good news! As of May 2025, the Junta de Andalucía has lifted the ban on filling private pools. However, with limits set at 250 litres/day, wasting water is still a crime.",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2940&auto=format&fit=crop",
    category: "Maintenance",
    readTime: "5 min read",
    author: "Maria Santos",
    date: "Dec 8, 2025",
    slug: "pool-water-update-2025",
  },
  {
    id: 2,
    title: "New Rental Laws April 2025: Can Your Neighbors Ban Your Airbnb?",
    excerpt:
      "The new Horizontal Property Law reform allows Community of Owners to vote on banning holiday rentals with a 3/5ths majority.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop",
    category: "Legal/Permits",
    readTime: "6 min read",
    author: "Carlos Rodriguez",
    date: "Dec 5, 2025",
    slug: "new-rental-laws-2025",
  },
  {
    id: 3,
    title: "Why Renovating an Older Villa is the Smartest Investment in 2025",
    excerpt:
      "With new build supply limited and prices in the 'Golden Triangle' rising by 12%, buying older stock in prime locations is the new strategy.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop",
    category: "Renovation",
    readTime: "7 min read",
    author: "James Mitchell",
    date: "Dec 2, 2025",
    slug: "renovating-older-villa-2025",
  },
  {
    id: 4,
    title: "The Silent Boiler Killer: Dealing with Malaga's Hard Water",
    excerpt:
      "Malaga has some of the highest calcium levels in Europe. We are seeing boilers fail after just 2 years. Here is how to protect your home.",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2940&auto=format&fit=crop",
    category: "Maintenance",
    readTime: "4 min read",
    author: "Pedro Garcia",
    date: "Nov 28, 2025",
    slug: "malaga-hard-water-boiler",
  },
  {
    id: 5,
    title: "Cleaning Up After the Calima: Don't Ruin Your Facade",
    excerpt:
      "Another dust storm from the Sahara has turned the Costa orange. Here is how to clean it correctly without damaging your paintwork.",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940&auto=format&fit=crop",
    category: "Maintenance",
    readTime: "3 min read",
    author: "Sofia Marti",
    date: "Nov 25, 2025",
    slug: "cleaning-calima-dust",
  },
  {
    id: 6,
    title: "Protecting Your Holiday Home from 'Okupas' (Squatters) in 2025",
    excerpt:
      "With the new housing laws, non-resident owners are worried. Prevention is cheaper than eviction. Learn about anti-bumping locks and alarms.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop",
    category: "Legal/Permits",
    readTime: "6 min read",
    author: "Carlos Rodriguez",
    date: "Nov 22, 2025",
    slug: "protecting-home-squatters-2025",
  },
  {
    id: 7,
    title: "How to Stop Damp & Mold in Your Spanish Home (2025 Guide)",
    excerpt:
      "Learn how to diagnose condensation vs rising damp, what it costs to fix in Malaga, and when to call a damp proofing specialist.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2940&auto=format&fit=crop",
    category: "Maintenance",
    readTime: "5 min read",
    author: "Carlos Rodriguez",
    date: "Nov 20, 2025",
    slug: "stop-damp-mold-spain",
  },
  {
    id: 8,
    title: "Is Solar Power Worth It on the Costa del Sol? (2025 Data)",
    excerpt:
      "With electricity at around €0.25/kWh and new 2025 grants, solar on the Costa del Sol can pay for itself in as little as 3–5 years.",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2942&auto=format&fit=crop",
    category: "Cost Guides",
    readTime: "12 min read",
    author: "Elena Fernandez",
    date: "Nov 15, 2025",
    slug: "solar-panels-costa-del-sol-roi",
  },
  {
    id: 9,
    title: "How Much Does Air Conditioning Cost in Spain? (2025 Guide)",
    excerpt:
      "AC installation costs in Spain 2025. Compare split system, ducted & portable unit prices. See running costs, best brands & find verified installers.",
    image:
      "https://images.unsplash.com/photo-1631545308938-b587e9b9b8b9?q=80&w=2940&auto=format&fit=crop",
    category: "Cost Guides",
    readTime: "10 min read",
    author: "Pedro Garcia",
    date: "Nov 12, 2025",
    slug: "air-conditioning-cost-spain-2025",
  },
  {
    id: 10,
    title: "Finding a Reliable Electrician on the Costa del Sol (2025)",
    excerpt:
      "How to find a qualified electrician in Marbella, Estepona & the Costa del Sol. Understand Spanish electrical certificates, costs & what questions to ask.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2940&auto=format&fit=crop",
    category: "Cost Guides",
    readTime: "8 min read",
    author: "Carlos Rodriguez",
    date: "Nov 10, 2025",
    slug: "electrician-costa-del-sol-guide",
  },
  {
    id: 11,
    title: "Emergency Plumber Costa del Sol: What to Expect (2025)",
    excerpt:
      "Need an emergency plumber in Marbella or Estepona? See 2025 call-out costs, what counts as an emergency, and how to find 24/7 plumbers fast.",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=2940&auto=format&fit=crop",
    category: "Cost Guides",
    readTime: "6 min read",
    author: "Pedro Garcia",
    date: "Nov 8, 2025",
    slug: "emergency-plumber-costa-del-sol",
  },
  {
    id: 12,
    title: "Pool Maintenance Costs in Spain 2025: Complete Guide",
    excerpt:
      "How much does pool maintenance cost? See 2025 prices for weekly cleaning, chemicals, repairs & winterization on the Costa del Sol.",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2940&auto=format&fit=crop",
    category: "Cost Guides",
    readTime: "9 min read",
    author: "Maria Santos",
    date: "Nov 5, 2025",
    slug: "pool-maintenance-cost-spain-2025",
  },
  {
    id: 13,
    title: "Painting Your Spanish Villa: Costs & Best Time (2025)",
    excerpt:
      "How much does it cost to paint a house in Spain? 2025 prices for interior & exterior, best time of year, and tips for hiring painters.",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2940&auto=format&fit=crop",
    category: "Cost Guides",
    readTime: "8 min read",
    author: "Sofia Marti",
    date: "Nov 2, 2025",
    slug: "painting-house-cost-spain-2025",
  },
];

const PAGE_SIZE = 6;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts =
    activeCategory === "All"
      ? recentPosts
      : recentPosts.filter((post) => post.category === activeCategory);

  const searchedPosts = searchQuery
    ? filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredPosts;

  const visiblePosts = searchedPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      prev + PAGE_SIZE >= searchedPosts.length
        ? searchedPosts.length
        : prev + PAGE_SIZE
    );
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="The Homeowner's Journal | CostaTrades"
        description="Expert guides on renovations, maintenance, legal changes and costs for international homeowners across the Costa del Sol."
      />

      {/* Premium Hero Section */}
      <section className="relative bg-[#0a1f44] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-white/40" />
              <span className="text-white/60 text-sm font-medium uppercase tracking-[0.2em]">
                Est. 2024
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                15+ Expert Guides
              </span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Updated for 2025
              </span>
            </div>
          </div>

          {/* Main hero content */}
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-8">
              The<br />
              Homeowner's<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-white">
                Journal
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/70 max-w-2xl leading-relaxed font-light">
              Expert insights, cost guides, and local knowledge for living on the Costa del Sol.
            </p>
          </div>

          {/* Search bar */}
          <div className="mt-12 max-w-xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article - Magazine Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-20">
        <Link href={`/blog/${featuredPost.slug}`} className="block group">
          <article className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-72 lg:h-[500px] overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/20" />

                {/* Featured badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-2 bg-white text-[#0a1f44] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="text-blue-600 text-sm font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0a1f44] leading-tight mb-6 group-hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-slate-600 text-lg leading-relaxed mb-8 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                {/* Author & meta */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {featuredPost.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0a1f44]">{featuredPost.author}</p>
                    <p className="text-slate-500 text-sm">{featuredPost.authorRole}</p>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <p>{featuredPost.date}</p>
                    <p className="flex items-center gap-1 justify-end">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </section>

      {/* Main content area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main column */}
          <div>
            {/* Category filters */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Filter className="w-5 h-5 text-slate-400" />
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.name
                      ? "bg-[#0a1f44] text-white shadow-lg"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  {cat.name}
                  <span className={`ml-2 text-xs ${activeCategory === cat.name ? 'text-blue-200' : 'text-slate-400'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Articles grid */}
            <div className="space-y-8">
              {visiblePosts.map((post, idx) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="group block"
                >
                  <article className={`bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500 ${idx === 0 ? 'shadow-lg' : 'shadow-md'}`}>
                    <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
                      {/* Image */}
                      <div className="relative h-48 md:h-full min-h-[200px] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10" />
                      </div>

                      {/* Content */}
                      <div className="p-6 lg:p-8 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-slate-400 text-xs flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-xl lg:text-2xl font-bold text-[#0a1f44] mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#0a1f44] font-semibold text-xs">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#0a1f44]">{post.author}</p>
                              <p className="text-xs text-slate-400">{post.date}</p>
                            </div>
                          </div>
                          <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Load more */}
            {visibleCount < searchedPosts.length && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  className="px-10 py-6 rounded-full border-slate-300 text-[#0a1f44] hover:bg-[#0a1f44] hover:text-white hover:border-[#0a1f44] text-base font-semibold transition-all duration-300"
                >
                  Load More Articles
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Editor's Picks */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0a1f44] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#0a1f44] rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </span>
                Editor's Picks
              </h3>
              <div className="space-y-4">
                {editorsPicks.map((pick, idx) => (
                  <Link
                    key={idx}
                    href={`/blog/${pick.slug}`}
                    className="group block p-4 rounded-xl hover:bg-slate-50 transition-colors -mx-2"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold text-slate-200 group-hover:text-blue-200 transition-colors">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-semibold text-[#0a1f44] group-hover:text-blue-600 transition-colors leading-snug mb-1">
                          {pick.title}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {pick.category} · {pick.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-[#0a1f44] to-[#1e3a5f] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="relative">
                <h3 className="text-lg font-bold mb-2">Weekly Insights</h3>
                <p className="text-blue-200/70 text-sm mb-6">
                  Join 5,000+ homeowners getting local tips delivered every Friday.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 mb-3"
                />
                <Button className="w-full bg-white text-[#0a1f44] hover:bg-blue-50 font-semibold py-3 rounded-xl">
                  Subscribe Free
                </Button>
                <p className="text-xs text-blue-200/50 mt-3 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0a1f44] mb-6">Browse Topics</h3>
              <div className="space-y-2">
                {categories.slice(1).map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="font-medium text-slate-700">{cat.name}</span>
                    <span className="text-sm text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
              <h3 className="font-bold text-[#0a1f44] mb-2">Need a Professional?</h3>
              <p className="text-slate-500 text-sm mb-4">
                Get free quotes from verified tradespeople.
              </p>
              <Link href="/post-job">
                <Button className="w-full bg-[#E31E24] hover:bg-[#C41218] text-white font-semibold py-3 rounded-xl">
                  Post a Job Free
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
