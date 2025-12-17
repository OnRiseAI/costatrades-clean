"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Star,
  CheckCircle,
  Building2,
  ArrowLeft,
  Shield,
  Loader2,
  Camera,
  Upload,
  Eye,
  EyeOff,
  User,
  Lock,
  Phone,
  Mail,
  Globe,
  AlertCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

interface BusinessData {
  id: string;
  slug: string;
  businessName: string;
  tradeCategory: string;
  tradeCategorySlug: string;
  location: string;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  email?: string;
  website?: string;
  bio?: string;
  profilePhoto?: string;
  coverImage?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phone: string;
  website: string;
  bio: string;
  callOutFee: string;
  dayRate: string;
}

export default function ClaimBusinessVerify() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const slug = searchParams.get("slug");

  const [business, setBusiness] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
    website: "",
    bio: "",
    callOutFee: "",
    dayRate: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");

  useEffect(() => {
    async function verifyTokenAndFetchBusiness() {
      if (!token || !slug) {
        setLoading(false);
        setVerifying(false);
        return;
      }

      try {
        // TODO: Verify token in Supabase
        // const { data: claimData, error: claimError } = await supabase
        //   .from("business_claims")
        //   .select("*")
        //   .eq("verification_token", token)
        //   .eq("business_slug", slug)
        //   .eq("status", "pending")
        //   .single();

        // For now, simulate verification success
        setVerified(true);

        // Fetch business data
        const { data, error } = await supabase
          .from("tradespeople")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error || !data) {
          // Fallback to mock data
          const mockData: BusinessData = {
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
            phone: "",
            email: "",
            website: "",
            bio: "",
            profilePhoto: "",
            coverImage:
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=400&fit=crop",
          };
          setBusiness(mockData);
        } else {
          setBusiness(data as BusinessData);
          // Pre-fill form with existing data
          setFormData((prev) => ({
            ...prev,
            phone: data.phone || "",
            website: data.website || "",
            bio: data.bio || "",
          }));
        }
      } catch (err) {
        console.error("Error verifying:", err);
        setError("Verification failed. Please try again.");
      } finally {
        setLoading(false);
        setVerifying(false);
      }
    }

    verifyTokenAndFetchBusiness();
  }, [token, slug]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // TODO: Create user account with Supabase Auth
      // const { data: authData, error: authError } = await supabase.auth.signUp({
      //   email: claimEmail,
      //   password: formData.password,
      //   options: {
      //     data: {
      //       first_name: formData.firstName,
      //       last_name: formData.lastName,
      //     }
      //   }
      // });

      // TODO: Upload profile image if provided
      // if (profileImage) {
      //   const { data: uploadData, error: uploadError } = await supabase.storage
      //     .from("profiles")
      //     .upload(`${slug}/profile.jpg`, profileImage);
      // }

      // TODO: Update business record
      // const { error: updateError } = await supabase
      //   .from("tradespeople")
      //   .update({
      //     owner_id: authData.user.id,
      //     phone: formData.phone,
      //     website: formData.website,
      //     bio: formData.bio,
      //     call_out_fee: formData.callOutFee,
      //     day_rate: formData.dayRate,
      //     is_claimed: true,
      //     verified: true,
      //   })
      //   .eq("slug", slug);

      // TODO: Update claim status
      // await supabase
      //   .from("business_claims")
      //   .update({ status: "completed" })
      //   .eq("verification_token", token);

      // Simulate success
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      console.error("Error completing claim:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0a1f44] mx-auto mb-4" />
          <p className="text-gray-600">Verifying your email...</p>
        </div>
      </div>
    );
  }

  if (!token || !slug || !verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Invalid or Expired Link
          </h1>
          <p className="text-gray-600 mb-4">
            This verification link is invalid or has expired. Please request a
            new verification email.
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

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#0a1f44] mb-3">
              Welcome to CostaTrades!
            </h1>
            <p className="text-gray-600 mb-6">
              Your business profile has been claimed successfully. You can now
              manage your listing, respond to enquiries, and receive job leads.
            </p>

            <div className="space-y-3">
              <Link href="/pro/dashboard" className="block">
                <Button className="w-full bg-[#0a1f44] hover:bg-[#1a3a5c] text-white font-bold h-12">
                  Go to Dashboard
                </Button>
              </Link>
              <Link
                href={`/tradesperson/${slug}`}
                className="block text-[#0066CC] hover:underline text-sm"
              >
                View Your Profile
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
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Complete Your Profile
          </h1>
          <p className="text-blue-200 mt-2">
            {business?.businessName} - Step {currentStep} of 2
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 1
                    ? "bg-[#0a1f44] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= 1 ? "text-[#0a1f44]" : "text-gray-500"
                }`}
              >
                Account Setup
              </span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded">
              <div
                className={`h-full bg-[#0a1f44] rounded transition-all ${
                  currentStep > 1 ? "w-full" : "w-0"
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= 2
                    ? "bg-[#0a1f44] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep >= 2 ? "text-[#0a1f44]" : "text-gray-500"
                }`}
              >
                Business Details
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Account Setup */}
          {currentStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#0a1f44] mb-6">
                Create Your Account
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-6">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-[#0a1f44] hover:bg-[#1a3a5c] text-white font-bold h-12"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Business Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#0a1f44] mb-6">
                  Profile Photo
                </h2>

                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-[#0a1f44] flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : business?.profilePhoto ? (
                      <img
                        src={business.profilePhoto}
                        alt={business.businessName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      business?.businessName.charAt(0) || "B"
                    )}
                  </div>

                  <div>
                    <label htmlFor="profileImage" className="cursor-pointer">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                        <Camera className="w-4 h-4" />
                        {profileImagePreview ? "Change Photo" : "Upload Photo"}
                      </div>
                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended: Square image, at least 200x200px
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#0a1f44] mb-6">
                  Contact Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+34 XXX XXX XXX"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        placeholder="https://www.yourwebsite.com"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#0a1f44] mb-6">
                  About Your Business
                </h2>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell potential customers about your business, experience, and what makes you different..."
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.bio.length}/500 characters
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#0a1f44] mb-2">
                  Pricing (Optional)
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Help customers understand your rates
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="callOutFee"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Call Out Fee
                    </label>
                    <Input
                      id="callOutFee"
                      name="callOutFee"
                      type="text"
                      placeholder="e.g. €50 - €80"
                      value={formData.callOutFee}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dayRate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Day Rate
                    </label>
                    <Input
                      id="dayRate"
                      name="dayRate"
                      type="text"
                      placeholder="e.g. €150 - €200"
                      value={formData.dayRate}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#FF8A00] hover:bg-[#e67c00] text-white font-bold h-12"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Complete Setup"
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
