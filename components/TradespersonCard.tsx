"use client";

import Link from "next/link";
import { Star, MapPin, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface TradespersonCardProps {
  slug: string;
  businessName: string;
  tradeCategory: string;
  location: string;
  rating: number;
  reviewCount: number;
  profilePhoto?: string;
  verified?: boolean;
  jobsCompleted?: number;
  yearsInBusiness?: number;
  services?: string[];
  phone?: string;
}

export function TradespersonCard({
  slug,
  businessName,
  tradeCategory,
  location,
  rating,
  reviewCount,
  profilePhoto,
  verified = false,
  jobsCompleted,
  yearsInBusiness,
  services = [],
}: TradespersonCardProps) {
  const { t } = useLanguage();

  const defaultServices = services.length > 0 ? services : [tradeCategory];

  return (
    <div className="bg-white rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          {/* Profile Photo */}
          <div className="relative">
            <div className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt={businessName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                  {businessName.charAt(0)}
                </div>
              )}
            </div>
            {verified && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center bg-green-500 rounded-full">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl text-foreground mb-2">
              {businessName}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Verification Badges */}
        {verified && (
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
              <CheckCircle className="h-4 w-4" />
              <span>Verified</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
              <Shield className="h-4 w-4" />
              <span>Guaranteed</span>
            </div>
          </div>
        )}

        {/* Rating */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-lg leading-none pt-0.5">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm leading-none pt-0.5">
              ({reviewCount} {t("common.reviews")})
            </span>
          </div>
        </div>

        {/* Stats */}
        {(jobsCompleted || yearsInBusiness) && (
          <div className="flex gap-6 mb-4 text-sm text-muted-foreground">
            {jobsCompleted && (
              <div>
                <span className="font-bold text-foreground text-lg">
                  {jobsCompleted}
                </span>{" "}
                jobs completed
              </div>
            )}
            {yearsInBusiness && (
              <div>
                <span className="font-bold text-foreground text-lg">
                  {yearsInBusiness}
                </span>{" "}
                years
              </div>
            )}
          </div>
        )}

        {/* Services & Skills */}
        {defaultServices.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-base mb-3">Services & skills</h4>
            <div className="flex flex-wrap gap-2">
              {defaultServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 text-sm text-primary"
                >
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="mt-auto pt-6 border-t border-border">
          <Link href={`/tradesperson/${slug}`} className="w-full">
            <Button className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white text-lg py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
