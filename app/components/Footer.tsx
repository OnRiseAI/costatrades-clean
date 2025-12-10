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
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setOpenSection(openSection === title ? null : title);
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#0a1f44] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">CT</span>
              </div>
              <span className="font-bold text-xl text-[#0a1f44]">CostaTrade</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-green-700 text-xs font-semibold">Trusted by 500+ Pros</span>
            </div>
            
            <p className="text-sm text-slate-500 leading-relaxed">
              Costa del Sol's most trusted platform connecting homeowners with verified professionals.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-[#0a1f44] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#0a1f44] transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#0a1f44] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-[#0a1f44] transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="border-b border-slate-100 md:border-none pb-4 md:pb-0">
            <button onClick={() => toggleSection("company")} className="flex items-center justify-between w-full md:cursor-default">
              <h4 className="font-bold text-[#0a1f44] text-xs uppercase tracking-wider">Company</h4>
              <ChevronDown className={cn("w-4 h-4 md:hidden text-slate-400 transition-transform", openSection === "company" && "rotate-180")} />
            </button>
            <ul className={cn("space-y-3 mt-4 overflow-hidden transition-all md:block", openSection === "company" ? "max-h-48" : "max-h-0 md:max-h-full")}>
              <li><Link href="/about" className="text-sm text-slate-500 hover:text-[#0a1f44]">About Us</Link></li>
              <li><Link href="/verification-promise" className="text-sm text-slate-500 hover:text-[#0a1f44]">Our Vetting Process</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-500 hover:text-[#0a1f44]">Contact</Link></li>
              <li><Link href="/blog" className="text-sm text-slate-500 hover:text-[#0a1f44]">Blog</Link></li>
              <li><Link href="/faq" className="text-sm text-slate-500 hover:text-[#0a1f44]">FAQ</Link></li>
              <li><Link href="/careers" className="text-sm text-slate-500 hover:text-[#0a1f44]">Careers</Link></li>
            </ul>
          </div>

          <div className="border-b border-slate-100 md:border-none pb-4 md:pb-0">
            <button onClick={() => toggleSection("homeowners")} className="flex items-center justify-between w-full md:cursor-default">
              <h4 className="font-bold text-[#0a1f44] text-xs uppercase tracking-wider">Homeowners</h4>
              <ChevronDown className={cn("w-4 h-4 md:hidden text-slate-400 transition-transform", openSection === "homeowners" && "rotate-180")} />
            </button>
            <ul className={cn("space-y-3 mt-4 overflow-hidden transition-all md:block", openSection === "homeowners" ? "max-h-48" : "max-h-0 md:max-h-full")}>
              <li><Link href="/post-job" className="text-sm text-slate-500 hover:text-[#0a1f44]">Post a Job</Link></li>
              <li><Link href="/cost-guides" className="text-sm text-slate-500 hover:text-[#0a1f44]">Cost Guides</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-slate-500 hover:text-[#0a1f44]">How it Works</Link></li>
              <li><Link href="/holiday-homes" className="text-sm text-slate-500 hover:text-[#0a1f44]">Holiday Homes</Link></li>
            </ul>
          </div>

          <div className="border-b border-slate-100 md:border-none pb-4 md:pb-0">
            <button onClick={() => toggleSection("pros")} className="flex items-center justify-between w-full md:cursor-default">
              <h4 className="font-bold text-[#0a1f44] text-xs uppercase tracking-wider">For Professionals</h4>
              <ChevronDown className={cn("w-4 h-4 md:hidden text-slate-400 transition-transform", openSection === "pros" && "rotate-180")} />
            </button>
            <ul className={cn("space-y-3 mt-4 overflow-hidden transition-all md:block", openSection === "pros" ? "max-h-48" : "max-h-0 md:max-h-full")}>
              <li><Link href="/join-as-tradesperson" className="text-sm text-slate-500 hover:text-[#0a1f44]">Apply to Join</Link></li>
              <li><Link href="/pro/dashboard" className="text-sm text-slate-500 hover:text-[#0a1f44]">Pro Dashboard</Link></li>
              <li><Link href="/login" className="text-sm text-slate-500 hover:text-[#0a1f44]">Login</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-slate-400">© {new Date().getFullYear()} CostaTrades. All rights reserved.</p>
            <div className="flex items-center gap-6 text-slate-400">
              <Link href="/privacy-policy" className="hover:text-[#0a1f44] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#0a1f44] transition-colors">Terms of Service</Link>
              <Link href="/cookie-policy" className="hover:text-[#0a1f44] transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}