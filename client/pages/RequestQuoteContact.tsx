"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { demoTradespeople } from "@/data/tradespeople";

export default function RequestQuoteContact() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tradespersonSlug = searchParams?.get("tradesperson") || "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [showManualAddress, setShowManualAddress] = useState(false);

  const tradesperson = demoTradespeople.find(
    (tp) => tp.slug === tradespersonSlug,
  );

  // Get job details from query params (Next.js doesn't support location.state)
  const jobDescription = searchParams?.get("jobDescription") || "";
  const timing = searchParams?.get("timing") || "";

  useEffect(() => {
    if (!tradesperson) {
      router.push("/");
    }
  }, [tradesperson, router]);

  if (!tradesperson) {
    return null;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = firstName && lastName && email && phone && postcode;

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tradesperson: {
            businessName: tradesperson.businessName,
            slug: tradesperson.slug,
          },
          customer: {
            firstName,
            lastName,
            email,
            phone,
            postcode,
          },
          jobDetails: {
            description: jobDescription,
            timing,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Show preview URL in development
        if (data.previewUrl) {
          console.log("Email preview:", data.previewUrl);
        }

        alert(
          `Quote request sent to ${tradesperson.businessName}! They will contact you soon.`,
        );
        router.push("/");
      } else {
        throw new Error(data.message || "Failed to send quote request");
      }
    } catch (error) {
      console.error("Error sending quote:", error);
      alert("Failed to send quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            {/* Header */}
            <div className="mb-8">
              <p className="text-lg text-muted-foreground mb-2">Final step!</p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Add your contact details
              </h1>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* First Name */}
              <div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-base focus:border-primary focus:outline-none"
                />
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-base focus:border-primary focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-base focus:border-primary focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-base focus:border-primary focus:outline-none"
                />
              </div>

              {/* Postcode */}
              <div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                    placeholder="Please start typing your postcode"
                    className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-base focus:border-primary focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setShowManualAddress(!showManualAddress)}
                  className="text-primary hover:underline text-sm mt-2"
                >
                  Or enter your address manually
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                size="lg"
                className="w-full text-lg py-6 bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isFormValid || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Sending..." : "Request a quote"}
              </Button>
            </div>

            {/* Terms Notice */}
            <div className="mt-6 text-sm text-muted-foreground">
              <p>
                If you're new to TradeFinder, we'll set up an account for you
                with your email above. This will make it easier to access your
                conversations with trades and manage your jobs. Read our{" "}
                <a href="/terms" className="text-primary hover:underline">
                  terms of use
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  privacy notice
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
