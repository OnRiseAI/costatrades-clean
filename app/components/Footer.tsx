"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FooterSEOLinks } from "./FooterSEOLinks";

const footerSections = [
  {
    id: "homeowners",
    title: "For Homeowners",
    links: [
      { label: "Post a Job", href: "/post-job" },
      { label: "How it Works", href: "/how-it-works" },
      { label: "Cost Guides", href: "/cost-guides" },
      { label: "Find Tradespeople", href: "/locations" },
    ],
  },
  {
    id: "pros",
    title: "For Professionals",
    links: [
      { label: "Join as a Pro", href: "/join-as-tradesperson" },
      { label: "Pro Dashboard", href: "/pro/dashboard" },
      { label: "Login", href: "/login" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Vetting Process", href: "/verification-promise" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    id: "helpful",
    title: "Helpful Info",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* ===== SEO LINKS (All Pages) ===== */}
      <FooterSEOLinks />

      {/* ===== MOBILE FOOTER ===== */}
      <div className="md:hidden">
        {/* Accordion Sections */}
        <div className="p-4 space-y-3">
          {footerSections.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full px-5 py-4 bg-white"
              >
                <span className="font-semibold text-[#0a1f44] text-[15px]">
                  {section.title}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#0a1f44] transition-transform duration-200",
                    openSection === section.id && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200 bg-gray-50",
                  openSection === section.id ? "max-h-64" : "max-h-0"
                )}
              >
                <ul className="px-5 py-3 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-[#0a1f44] text-sm block py-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Social Section */}
        <div className="px-5 py-6 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Find Us On Socials
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 bg-[#0a1f44] rounded-full flex items-center justify-center hover:bg-[#1a3a6e] transition-colors"
            >
              <Twitter className="h-5 w-5 text-white" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 bg-[#0a1f44] rounded-full flex items-center justify-center hover:bg-[#1a3a6e] transition-colors"
            >
              <Facebook className="h-5 w-5 text-white" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 bg-[#0a1f44] rounded-full flex items-center justify-center hover:bg-[#1a3a6e] transition-colors"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-10 h-10 bg-[#0a1f44] rounded-full flex items-center justify-center hover:bg-[#1a3a6e] transition-colors"
            >
              <Youtube className="h-5 w-5 text-white" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-10 h-10 bg-[#0a1f44] rounded-full flex items-center justify-center hover:bg-[#1a3a6e] transition-colors"
            >
              <Linkedin className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="px-5 py-6 border-t border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} CostaTrades.com all rights reserved
          </p>
        </div>
      </div>

      {/* ===== DESKTOP FOOTER ===== */}
      <div className="hidden md:block bg-[#0a1f44]">
        <div className="container-custom py-12">
          {/* Main Footer Grid - All in one row */}
          <div className="flex gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="w-72 flex-shrink-0 space-y-4">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white">CostaTrades</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Costa del Sol's most trusted platform connecting homeowners with verified professionals.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-white text-xs font-medium">Trusted by 500+ Pros</span>
              </div>
              {/* Social Icons */}
              <div className="flex items-center gap-2 pt-2">
                <a href="#" aria-label="Facebook" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#0a1f44] text-white transition-all">
                  <Facebook className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="Twitter" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#0a1f44] text-white transition-all">
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="Instagram" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#0a1f44] text-white transition-all">
                  <Instagram className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="YouTube" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#0a1f44] text-white transition-all">
                  <Youtube className="h-3.5 w-3.5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#0a1f44] text-white transition-all">
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Link Columns - Flex grow to fill remaining space */}
            <div className="flex-1 grid grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.id}>
                  <p className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
                    {section.title}
                  </p>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Bottom Bar */}
        <div className="border-t border-white/10 py-5">
          <div className="container-custom">
            <div className="flex justify-between items-center text-sm">
              <p className="text-slate-500">
                © {new Date().getFullYear()} CostaTrades. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/privacy-policy" className="text-slate-500 hover:text-white transition-colors">
                  Privacy & Cookies
                </Link>
                <a href="/sitemap.xml" className="text-slate-500 hover:text-white transition-colors">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
