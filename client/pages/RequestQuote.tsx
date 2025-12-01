"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { demoTradespeople } from "@/data/tradespeople";

interface RequestQuoteProps {
  tradespersonSlug: string;
}

export default function RequestQuote({ tradespersonSlug }: RequestQuoteProps) {
  const router = useRouter();

  const [jobDescription, setJobDescription] = useState("");
  const [timing, setTiming] = useState("flexible");

  const tradesperson = demoTradespeople.find(
    (tp) => tp.slug === tradespersonSlug,
  );

  useEffect(() => {
    if (!tradesperson) {
      router.push("/");
    }
  }, [tradesperson, router]);

  if (!tradesperson) {
    return null;
  }

  const handleContinue = () => {
    if (jobDescription.length >= 50) {
      // Navigate to contact details page with job info
      router.push(`/request-quote/contact?tradesperson=${tradespersonSlug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            {/* Hero Image */}
            <div className="relative w-full h-40 md:h-48 overflow-hidden">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F30dab4e592724986a43fc4d20bfb2e27%2F89158a6460c14463b735f35d53a4b21a?format=webp&width=800"
                alt="Construction tools"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
            </div>

            <div className="p-8">
              {/* Tradesperson Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                  {tradesperson.profilePhoto ? (
                    <img
                      src={tradesperson.profilePhoto}
                      alt={tradesperson.businessName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                      {tradesperson.businessName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {tradesperson.businessName}
                  </h2>
                </div>
              </div>

              {/* Request a Quote Header */}
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
                Request a quote
              </h1>

              {/* Describe Your Job */}
              <div className="mb-8">
                <label className="block text-lg md:text-xl font-bold mb-3 text-foreground">
                  Describe your job
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) =>
                    setJobDescription(e.target.value.slice(0, 500))
                  }
                  placeholder="Tell us a bit about your job! Remember, do not include personal details like your name, phone number, address, or email at this stage."
                  className="w-full border-2 border-gray-200 rounded-xl p-4 min-h-[150px] focus:border-primary focus:outline-none resize-none text-base"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Min characters: 50</span>
                  <span>{jobDescription.length}/500</span>
                </div>
              </div>

              {/* When Would You Like the Job to Start */}
              <div className="mb-8">
                <label className="block text-lg md:text-xl font-bold mb-4 text-foreground">
                  When would you like the job to start?
                </label>
                <div className="space-y-3">
                  {[
                    {
                      value: "flexible",
                      label: "I'm flexible on the start date",
                    },
                    { value: "urgent", label: "It's urgent (within 48 hours)" },
                    { value: "2weeks", label: "Within 2 weeks" },
                    { value: "1month", label: "Within 1 month" },
                    {
                      value: "budgeting",
                      label: "I'm budgeting / researching",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-4 border-2 border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary transition-colors"
                    >
                      <input
                        type="radio"
                        name="timing"
                        value={option.value}
                        checked={timing === option.value}
                        onChange={(e) => setTiming(e.target.value)}
                        className="w-6 h-6 text-primary cursor-pointer"
                      />
                      <span className="text-base md:text-lg">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              <Button
                size="lg"
                className="w-full text-lg py-6 bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={jobDescription.length < 50}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
