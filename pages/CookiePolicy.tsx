"use client";

import {
  ArrowLeft,
  Cookie,
  Settings,
  BarChart,
  ShieldCheck,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

export default function CookiePolicy() {
  const lastUpdated = "November 2025";
  const contactEmail = "hi@costatrades.com";

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 md:px-8">
      <SEO
        title="Cookie Policy | Privacy Preferences"
        description="How we use cookies to improve your experience. Manage your settings here."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Cookie Policy",
          description:
            "How we use cookies to improve your experience on CostaTrades. Manage your settings here.",
        }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="pl-0 hover:bg-transparent text-slate-500 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-[#0a1f44] text-white p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4 text-blue-300">
              <Cookie className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Legal Compliance
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Cookie Policy
            </h1>
            <p className="text-blue-100">Last Updated: {lastUpdated}</p>
          </div>

          <div className="p-8 md:p-12 space-y-10 text-slate-700 leading-relaxed">
            {/* 1. What Are Cookies? */}
            <section>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4 flex items-center gap-2">
                1. What Are Cookies?
              </h2>
              <p className="mb-4">
                Cookies are small text files stored on your device (computer,
                tablet, or mobile) when you visit our website. They help us make
                the site work better, improve your experience, and understand
                how you use our platform.
              </p>
              <p>
                Cookies do not typically contain any information that personally
                identifies a user, but personal information that we store about
                you may be linked to the information stored in and obtained from
                cookies.
              </p>
            </section>

            {/* 2. How We Use Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-6 flex items-center gap-2">
                2. How We Use Cookies
              </h2>

              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                    <h3 className="font-bold text-[#0a1f44] text-lg">
                      Strictly Necessary Cookies
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    These are essential for the website to function properly.
                    Without these cookies, services like logging in, posting a
                    job, or navigating secure areas cannot be provided.
                  </p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Status: Always Active (Cannot be switched off)
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart className="w-6 h-6 text-blue-600" />
                    <h3 className="font-bold text-[#0a1f44] text-lg">
                      Performance & Analytics Cookies
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    We use tools like Google Analytics to collect anonymous data
                    on how visitors use our site (e.g., which pages are most
                    popular, how long users stay). This helps us improve the
                    performance and design of CostaTrades.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="w-6 h-6 text-purple-600" />
                    <h3 className="font-bold text-[#0a1f44] text-lg">
                      Functional Cookies
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    These cookies allow the website to remember choices you make
                    (such as your preferred language, region, or login details)
                    to provide a more personalized experience.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Managing Your Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4 flex items-center gap-2">
                3. Managing Your Cookies
              </h2>
              <p className="mb-4">
                You have the right to accept or reject cookies. You can control
                and/or delete cookies as you wish. You can delete all cookies
                that are already on your computer and you can set most browsers
                to prevent them from being placed.
              </p>
              <p className="mb-4">
                However, if you do this, you may have to manually adjust some
                preferences every time you visit a site and some services and
                functionalities may not work.
              </p>

              <div className="mt-6">
                <h3 className="font-bold text-[#0a1f44] mb-3">
                  How to manage cookies in your browser:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Google Chrome
                  </a>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Safari
                  </a>
                  <a
                    href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Mozilla Firefox
                  </a>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Microsoft Edge
                  </a>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="pt-8 border-t border-slate-100">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-bold text-[#0a1f44] mb-1">
                    Questions about cookies?
                  </h3>
                  <p className="text-slate-600 mb-2">
                    If you have any questions about our use of cookies, please
                    contact us at:
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
