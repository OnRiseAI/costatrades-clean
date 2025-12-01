"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { TradespersonProgress } from "@/components/TradespersonProgress";
import {
  Wrench,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Info,
  ListChecks,
  FileText,
  Languages,
  ArrowLeft,
} from "lucide-react";

const APPLICATION_STORAGE_KEY = "costatrade.tradespersonApplication";

type TradespersonApplication = {
  tradeSlug?: string;
  tradeLabel?: string;
  businessName?: string;
  website?: string;
  postcode?: string;
  mainTown?: string;
  radius?: string;
  yearsInBusiness?: string;
  businessType?: string;
  employeeRange?: string;
  firstName?: string;
  lastName?: string;
  businessEmail?: string;
  businessPhone?: string;
  mobilePhone?: string;
  aboutBusiness?: string;
  services?: string[];
  documents?: string[];
  pricingInfo?: string;
  languages?: string[];
};

function formatList(values?: string[]): string {
  if (!values || values.length === 0) {
    return "Not provided";
  }
  return values.join(", ");
}

function formatValue(value?: string): string {
  return value && value.trim() ? value : "Not provided";
}

export default function TradespersonReview() {
  const router = useRouter();
  const [application, setApplication] =
    useState<TradespersonApplication | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(APPLICATION_STORAGE_KEY);
      if (!stored) {
        setError(
          "We could not find your application details. Please go back and enter your information again.",
        );
        return;
      }
      const parsed = JSON.parse(stored) as TradespersonApplication;
      setApplication(parsed);
    } catch {
      setError("Something went wrong loading your details. Please try again.");
    }
  }, []);

  const handleSubmit = () => {
    setError("");

    if (!application) {
      setError(
        "Your application details are missing. Please go back and try again.",
      );
      return;
    }

    if (
      !application.tradeLabel ||
      !application.businessName ||
      !application.postcode ||
      !application.firstName ||
      !application.lastName ||
      !application.businessEmail ||
      !application.businessPhone
    ) {
      setError(
        "Some required information is missing. Please edit your details before submitting.",
      );
      return;
    }

    navigate("/tradesperson/submitted");
  };

  const handleEditTrade = () => {
    navigate("/join-as-tradesperson");
  };

  const handleEditBusiness = () => {
    const tradeQuery = application?.tradeSlug
      ? `?trade=${encodeURIComponent(application.tradeSlug)}`
      : "";
    navigate(`/tradesperson/details${tradeQuery}`);
  };

  const handleBack = () => {
    handleEditBusiness();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SEO
        title="Submit Application | CostaTrades"
        description="Check your trade, business and contact details before submitting your specialist application to CostaTrades."
      />
      <TradespersonProgress currentStep={3} />

      <div className="container-custom py-12 md:py-16 max-w-5xl">
        <button
          type="button"
          onClick={handleBack}
          className="group flex items-center gap-2 text-muted-foreground hover:text-[#0a1f44] mb-8 text-sm font-medium transition-colors"
        >
          <div className="p-1 rounded-full bg-white border border-gray-200 group-hover:border-[#0a1f44] transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span>Back to details</span>
        </button>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4 tracking-tight">
            Review your details
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Please check everything is correct before sending your application.
            Our team will review your profile within 24 hours.
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 text-red-800">
            <div className="p-1 bg-red-100 rounded-full">
              <Info className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Card className="rounded-3xl border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
            <div className="p-6 md:p-8 flex items-start justify-between gap-4">
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-[#0a1f44] group-hover:text-white transition-colors duration-300">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <h2 className="font-bold text-lg text-[#0a1f44]">
                    Trade chosen
                  </h2>
                </div>
                <div className="pl-13">
                  <p className="text-base font-medium text-gray-700">
                    {formatValue(application?.tradeLabel)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleEditTrade}
                className="text-sm font-semibold text-blue-600 hover:text-[#0a1f44] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit
              </button>
            </div>
          </Card>

          <Card className="rounded-3xl border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
            <div className="p-6 md:p-8 flex items-start justify-between gap-4">
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-[#0a1f44] group-hover:text-white transition-colors duration-300">
                    <User className="h-5 w-5" />
                  </div>
                  <h2 className="font-bold text-lg text-[#0a1f44]">
                    Full name
                  </h2>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-muted-foreground">
                      First name
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.firstName)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-sm text-muted-foreground">
                      Surname
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.lastName)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleEditBusiness}
                className="text-sm font-semibold text-blue-600 hover:text-[#0a1f44] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit
              </button>
            </div>
          </Card>

          <Card className="rounded-3xl border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group md:col-span-2 lg:col-span-1">
            <div className="p-6 md:p-8 flex items-start justify-between gap-4">
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-[#0a1f44] group-hover:text-white transition-colors duration-300">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h2 className="font-bold text-lg text-[#0a1f44]">
                    Business details
                  </h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-muted-foreground">
                      Business name
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.businessName)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-muted-foreground">
                      Website
                    </span>
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                      {formatValue(application?.website)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-muted-foreground">
                      Time in business
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.yearsInBusiness)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-muted-foreground">
                      Business type
                    </span>
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {formatValue(application?.businessType)?.replace(
                        "-",
                        " ",
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-sm text-muted-foreground">
                      Employees
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.employeeRange)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleEditBusiness}
                className="text-sm font-semibold text-blue-600 hover:text-[#0a1f44] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit
              </button>
            </div>
          </Card>

          <Card className="rounded-3xl border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group md:col-span-2 lg:col-span-1">
            <div className="p-6 md:p-8 flex items-start justify-between gap-4">
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-[#0a1f44] group-hover:text-white transition-colors duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h2 className="font-bold text-lg text-[#0a1f44]">
                    Contact details
                  </h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                      {formatValue(application?.businessEmail)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-muted-foreground">
                      Business phone
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.businessPhone)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-sm text-muted-foreground">
                      Mobile phone
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.mobilePhone || "Not provided")}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleEditBusiness}
                className="text-sm font-semibold text-blue-600 hover:text-[#0a1f44] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit
              </button>
            </div>
          </Card>

          <Card className="rounded-3xl border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
            <div className="p-6 md:p-8 flex items-start justify-between gap-4">
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-[#0a1f44] group-hover:text-white transition-colors duration-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h2 className="font-bold text-lg text-[#0a1f44]">
                    Service areas
                  </h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-muted-foreground">
                      Postcode
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.postcode)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-sm text-muted-foreground">
                      Main town
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.mainTown)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-sm text-muted-foreground">
                      Service radius
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatValue(application?.radius)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleEditBusiness}
                className="text-sm font-semibold text-blue-600 hover:text-[#0a1f44] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit
              </button>
            </div>
          </Card>

          <Card className="rounded-3xl border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
            <div className="p-6 md:p-8 flex items-start justify-between gap-4">
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-[#0a1f44] group-hover:text-white transition-colors duration-300">
                    <Languages className="h-5 w-5" />
                  </div>
                  <h2 className="font-bold text-lg text-[#0a1f44]">
                    Languages
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {application?.languages &&
                  application.languages.length > 0 ? (
                    application.languages.map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        {lang}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm font-medium text-gray-900">
                      Not provided
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleEditBusiness}
                className="text-sm font-semibold text-blue-600 hover:text-[#0a1f44] px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit
              </button>
            </div>
          </Card>

          <Card className="rounded-3xl border-gray-100 bg-gray-50/50 shadow-none md:col-span-2">
            <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="h-4 w-4 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">
                    About your business
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2 text-xs text-gray-500">
                  <span
                    className="h-2 w-2 rounded-full bg-amber-400"
                    aria-hidden="true"
                  />
                  <span>Available after approval</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">
                    Documents / images
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2 text-xs text-gray-500">
                  <span
                    className="h-2 w-2 rounded-full bg-amber-400"
                    aria-hidden="true"
                  />
                  <span>Available after approval</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <h3 className="font-semibold text-gray-900">
                    Pricing information
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2 text-xs text-gray-500">
                  <span
                    className="h-2 w-2 rounded-full bg-amber-400"
                    aria-hidden="true"
                  />
                  <span>Available after approval</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <section className="bg-[#0a1f44] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to submit your application?
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Once submitted, our team will review your information and
                activate your profile. You'll receive an email confirmation
                shortly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button
                type="button"
                className="bg-white text-[#0a1f44] hover:bg-blue-50 rounded-full px-8 py-6 text-base font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                onClick={handleSubmit}
              >
                Submit application
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
