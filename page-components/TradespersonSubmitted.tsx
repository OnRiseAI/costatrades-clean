"use client";

import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TradespersonSubmitted() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a1f44] flex items-center justify-center relative overflow-hidden font-sans">
      <SEO
        title="Application Submitted | CostaTrades for Pros"
        description="Your specialist application has been sent. Our team will review your details and email you when your CostaTrades profile goes live."
      />
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="container-custom max-w-xl relative z-10 px-4">
        <div className="bg-white rounded-[32px] shadow-2xl p-8 md:p-12 text-center animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4 tracking-tight">
            Application submitted!
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Thank you for applying to join CostaTrade. Our team will review your
            details and let you know as soon as your profile is live.
          </p>

          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-[#0a1f44] mb-2">
              What happens next?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                  1
                </span>
                <span>
                  We review your business details and qualifications (usually
                  within 24h)
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                  2
                </span>
                <span>
                  You'll receive an email when your account is approved
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                  3
                </span>
                <span>
                  Log in to complete your profile and start receiving leads
                </span>
              </li>
            </ul>
          </div>

          <Button
            type="button"
            className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white rounded-full py-6 text-base font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            onClick={() => router.push("/")}
          >
            Back to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
