"use client";

import {
  ArrowLeft,
  Scale,
  AlertTriangle,
  FileCheck,
  Gavel,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

export default function TermsOfService() {
  const lastUpdated = "November 2025";
  const companyName = "Onrisedigital LTD";

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 md:px-8">
      <SEO
        title="Terms of Service | CostaTrades Legal"
        description="User agreement and terms of use for the CostaTrades platform."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service",
          description:
            "User agreement and terms of use for the CostaTrades platform.",
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
              <Scale className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Legal Agreement
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Terms & Conditions
            </h1>
            <p className="text-blue-100">Last Updated: {lastUpdated}</p>
          </div>

          <div className="p-8 md:p-12 space-y-10 text-slate-700 leading-relaxed">
            {/* 1. The Service */}
            <section>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4">
                1. The Service
              </h2>
              <p className="mb-4">
                <strong>CostaTrades.com</strong> (operated by {companyName}) is
                a directory and connection platform designed to introduce
                homeowners to local professionals.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="font-medium text-blue-900">Important Notice:</p>
                <p className="text-blue-800 mt-1">
                  We are <strong>not</strong> a construction company. We do not
                  employ the professionals listed on our site. The contract for
                  any work performed is strictly between the Homeowner and the
                  Specialist.
                </p>
              </div>
            </section>

            {/* 2. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                2. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by law,{" "}
                <strong>{companyName}</strong> shall not be liable for any
                direct, indirect, incidental, special, consequential, or
                exemplary damages, including but not limited to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>
                  <strong>Quality of Work:</strong> Any defects, poor
                  workmanship, or failure to complete work by a specialist.
                </li>
                <li>
                  <strong>Financial Disputes:</strong> Any disputes regarding
                  payments, deposits, or final bills between users.
                </li>
                <li>
                  <strong>Damages:</strong> Property damage, theft, or personal
                  injury occurring during the course of a job.
                </li>
              </ul>
              <p>
                Our role is limited to facilitating the initial connection. We
                do not supervise, direct, or control the professionals.
              </p>
            </section>

            {/* 3. User Obligations */}
            <section>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4">
                3. User Obligations
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-[#0a1f44] mb-2">
                    For Homeowners
                  </h3>
                  <p>You agree to:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>
                      Provide accurate and truthful details about the job
                      requirements.
                    </li>
                    <li>
                      Treat professionals with respect and provide a safe
                      working environment.
                    </li>
                    <li>
                      Pay for agreed services in accordance with the terms
                      settled with the specialist.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[#0a1f44] mb-2">
                    For Professionals
                  </h3>
                  <p>You agree to:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>
                      Hold valid insurance and necessary licenses for your
                      trade.
                    </li>
                    <li>
                      Provide accurate quotes and not engage in misleading
                      pricing.
                    </li>
                    <li>
                      Perform work to a professional standard and comply with
                      local regulations.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Verification Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                4. Verification Disclaimer
              </h2>
              <p className="mb-4">
                While we conduct checks on professionals (including ID
                verification and insurance checks), these measures{" "}
                <strong>do not guarantee</strong> future performance or conduct.
              </p>
              <p className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-900">
                <strong>Due Diligence:</strong> Users are strongly advised to
                conduct their own due diligence, request references, and verify
                insurance coverage before hiring any professional.
              </p>
            </section>

            {/* 5. Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-4 flex items-center gap-2">
                <Gavel className="w-5 h-5 text-blue-600" />
                5. Governing Law
              </h2>
              <p>
                These terms are governed by and construed in accordance with the
                laws of <strong>England & Wales</strong>. However, we respect
                and acknowledge the application of local Spanish consumer
                protection laws where mandatory for services provided within
                Spain.
              </p>
            </section>

            {/* Contact */}
            <section className="pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                If you have any questions regarding these Terms & Conditions,
                please contact us at{" "}
                <a
                  href="mailto:hi@costatrades.com"
                  className="text-blue-600 hover:underline"
                >
                  hi@costatrades.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
