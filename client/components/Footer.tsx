"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MegaFooter } from "@/components/MegaFooter";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    if (window.innerWidth < 768) {
      setOpenSection(openSection === title ? null : title);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Col 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0a1f44] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CT</span>
              </div>
              <span className="font-bold text-xl text-[#0a1f44]">
                CostaTrade
              </span>
            </div>
            <p className="text-sm font-medium text-green-600 bg-green-50 inline-block px-3 py-1 rounded-full">
              Trusted by 500+ Pros
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Costa del Sol's most trusted platform connecting homeowners with
              verified professionals.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              
                href="#"
                aria-label="Facebook"
                className="text-gray-600 hover:text-[#0a1f44] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              
                href="#"
                aria-label="Twitter"
                className="text-gray-600 hover:text-[#0a1f44] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              
                href="#"
                aria-label="Instagram"
                className="text-gray-600 hover:text-[#0a1f44] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              
                href="#"
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-[#0a1f44] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Company */}
          <div className="border-b border-gray-100 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection("company")}
              className="flex items-center justify-between w-full md:cursor-default group"
            >
              <p className="font-bold text-[#0a1f44] text-sm uppercase tracking-wider">
                Company
              </p>
              <ChevronDown
                className={cn(
                  "w-4 h-4 md:hidden text-gray-600 transition-transform",
                  openSection === "company" ? "rotate-180" : "",
                )}
              />
            </button>
            <ul
              className={cn(
                "space-y-3 mt-4 overflow-hidden transition-all md:block",
                openSection === "company"
                  ? "max-h-48"
                  : "max-h-0 md:max-h-full",
              )}
            >
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  About Us
                </Link>
              </li>
              <li>
                
                  href="https://costatrades.com/verification-promise"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Our Vetting Process
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Homeowners */}
          <div className="border-b border-gray-100 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection("homeowners")}
              className="flex items-center justify-between w-full md:cursor-default group"
            >
              <p className="font-bold text-[#0a1f44] text-sm uppercase tracking-wider">
                Homeowners
              </p>
              <ChevronDown
                className={cn(
                  "w-4 h-4 md:hidden text-gray-600 transition-transform",
                  openSection === "homeowners" ? "rotate-180" : "",
                )}
              />
            </button>
            <ul
              className={cn(
                "space-y-3 mt-4 overflow-hidden transition-all md:block",
                openSection === "homeowners"
                  ? "max-h-48"
                  : "max-h-0 md:max-h-full",
              )}
            >
              <li>
                <Link
                  href="/post-job"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/cost-guides"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Cost Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="/holiday-homes"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Holiday Homes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Pros */}
          <div className="border-b border-gray-100 md:border-none pb-4 md:pb-0">
            <button
              onClick={() => toggleSection("pros")}
              className="flex items-center justify-between w-full md:cursor-default group"
            >
              <p className="font-bold text-[#0a1f44] text-sm uppercase tracking-wider">
                For Professionals
              </p>
              <ChevronDown
                className={cn(
                  "w-4 h-4 md:hidden text-gray-600 transition-transform",
                  openSection === "pros" ? "rotate-180" : "",
                )}
              />
            </button>
            <ul
              className={cn(
                "space-y-3 mt-4 overflow-hidden transition-all md:block",
                openSection === "pros" ? "max-h-48" : "max-h-0 md:max-h-full",
              )}
            >
              <li>
                <Link
                  href="/join-as-tradesperson"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Apply to Join
                </Link>
              </li>
              <li>
                <Link
                  href="/pro/dashboard"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Pro Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-[#0a1f44]"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mega Footer (SEO Drawer) */}
      <MegaFooter />

      {/* Bottom Bar */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-gray-600">
              © {new Date().getFullYear()} CostaTrade. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-gray-600">
              <Link
                href="/terms"
                className="hover:text-[#0a1f44] transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-[#0a1f44] transition-colors"
              >
                Privacy & Cookies
              </Link>
              
                href="/sitemap.xml"
                className="hover:text-[#0a1f44] transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}