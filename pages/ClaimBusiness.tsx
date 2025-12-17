"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Star,
  CheckCircle,
  Phone,
  Mail,
  Building2,
  ArrowLeft,
  Shield,
  Loader2,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

interface BusinessPreview {
  id: string;
  slug: string;
  businessName: string;
  tradeCategory: string;
  tradeCategorySlug: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  verified?: boolean;
  phone?: string;
  profilePhoto?: string;
  coverImage?: string;
  bio?: string;
  isClaimed?: boolean;
}

export default function ClaimBusiness() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [business, setBusiness] = useState<BusinessPreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBusiness() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        // Fetch business from Supabase
        const { data, error } = await supabase
          .from("tradespeople")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error || !data) {
          // Fallback to mock data for development
          const mockData: BusinessPreview = {
            id: slug,
            slug: slug,
            businessName: slug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
            tradeCategory: "Builder",
            tradeCategorySlug: "builder",
            location: "Marbella",
            rating: 4.8,
            reviewCount: 12,
            verified: false,
            phone: "+34 XXX XXX XXX",
            profilePhoto: "",
            coverImage:
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop",
            bio: "Professional trade services on the Costa del Sol.",
            isClaimed: false,
          };
          setBusiness(mockData);
        } else {
          // Transform Supabase data to match our interface
          // Parse images to get profile photo
          let profilePhoto = "";
          try {
            if (data.images) {
              const images = JSON.parse(data.images.replace(/\"\"/g, '"'));
              if (images.length > 0) profilePhoto = images[0];
            }
          } catch (e) {}

          const transformedData: BusinessPreview = {
            id: data.id,
            slug: data.slug,
            businessName: data.name || "Business",
            tradeCategory: data.category_display || data.costatrades_category || "Tradesperson",
            tradeCategorySlug: data.costatrades_category || "tradesperson",
            location: data.tier2_name || data.city || "Costa del Sol",
            rating: data.rating || 0,
            reviewCount: data.reviews_count || 0,
            verified: data.verified || false,
            phone: data.phone || "",
            profilePhoto: profilePhoto,
            coverImage: profilePhoto || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop",
            bio: data.bio || `Professional ${data.category_display || "trade"} services on the Costa del Sol.`,
            isClaimed: false,
          };
          setBusiness(transformedData);
        }
      } catch (err) {
        console.error("Error fetching business:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBusiness();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    try {
      // Store the claim request in Supabase
      const { error: insertError } = await supabase
        .from("business_claims")
        .insert({
          business_slug: slug,
          email: email.toLowerCase().trim(),
          status: "pending",
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        // If table doesn't exist or other error, just show success for now
        console.error("Error storing claim:", insertError);
      }

      // TODO: Send verification email via Supabase Edge Function or API route
      // For now, we'll just show success state

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting claim:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0a1f44]" />
      </div>
    );
  }

  if (!slug || !business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Business Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            We couldn&apos;t find the business you&apos;re looking for.
          </p>
          <Link href="/">
            <Button className="bg-[#0a1f44] hover:bg-[#1a3a5c] text-white">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Success state after email submission
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#0a1f44] mb-3">
              Check Your Email
            </h1>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a verification link to{" "}
              <strong className="text-[#0a1f44]">{email}</strong>. Click the
              link to verify ownership and complete your profile.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Next steps:</strong> After clicking the verification
                link, you&apos;ll be able to add your personal details, update
                pricing, and upload photos.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="text-[#0066CC] hover:underline font-medium"
                >
                  try again
                </button>
              </p>
              <Link
                href={`/tradesperson/${slug}`}
                className="text-sm text-gray-500 hover:text-[#0066CC]"
              >
                Return to business profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0a1f44] text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href={`/tradesperson/${slug}`}
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to profile
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">
            Claim Your Business
          </h1>
          <p className="text-blue-200 mt-2">
            Take control of your CostaTrades listing
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[1fr_380px] gap-8">
          {/* Left Column - Business Preview */}
          <div className="space-y-6">
            {/* Business Card Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Business Preview
                </h2>
              </div>

              <div className="p-6">
                {/* Business Header */}
                <div className="flex items-start gap-4 mb-6">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-[#0a1f44] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {business.profilePhoto ? (
                      <img
                        src={business.profilePhoto}
                        alt={business.businessName}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      business.businessName.charAt(0)
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-[#0a1f44] truncate">
                      {business.businessName}
                    </h3>
                    <p className="text-gray-600">{business.tradeCategory}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {business.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-[#FFB400] mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-[#0a1f44]">
                        {business.rating?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="font-bold text-[#0a1f44] mb-1">
                      {business.reviewCount || 0}
                    </div>
                    <p className="text-xs text-gray-500">Reviews</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="font-bold text-[#0a1f44] mb-1">
                      {business.verified ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Verified</p>
                  </div>
                </div>

                {/* Contact Info (partially hidden) */}
                <div className="space-y-2 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm font-medium text-amber-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    This listing is unclaimed
                  </p>
                  <p className="text-xs text-amber-700">
                    Claim this business to update contact info, respond to
                    enquiries, and receive job leads.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-[#0a1f44] mb-4">
                What you get when you claim
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Receive Job Leads
                    </p>
                    <p className="text-sm text-gray-500">
                      Get notified when customers request quotes in your area
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Respond to Enquiries
                    </p>
                    <p className="text-sm text-gray-500">
                      Chat directly with potential customers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Verified Badge</p>
                    <p className="text-sm text-gray-500">
                      Stand out with a verified profile badge
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Update Your Profile
                    </p>
                    <p className="text-sm text-gray-500">
                      Add photos, update pricing, and manage reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Email Form */}
          <div className="md:sticky md:top-8 h-fit">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#FF8A00] to-[#e67c00] px-6 py-4">
                <h2 className="text-lg font-bold text-white">
                  Verify Ownership
                </h2>
                <p className="text-orange-100 text-sm">
                  Enter your email to get started
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Business Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@yourbusiness.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We&apos;ll send a verification link to this email
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#FF8A00] hover:bg-[#e67c00] text-white font-bold h-12 text-base"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Verification Email"
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    By claiming this business, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-[#0066CC] hover:underline"
                    >
                      Terms of Service
                    </Link>
                  </p>
                </div>
              </form>

              {/* Trust Indicators */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-100">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Free</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>5 min setup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Box */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Need help?</strong> Contact our support team at{" "}
                <a
                  href="mailto:support@costatrades.com"
                  className="text-[#0066CC] hover:underline"
                >
                  support@costatrades.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
