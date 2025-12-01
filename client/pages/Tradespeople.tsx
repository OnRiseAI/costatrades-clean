"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Award,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useAuth, getSupabase } from "@/contexts/AuthContext";

interface TradesPersonProfile {
  id: string;
  user_id: string;
  business_name: string;
  description: string;
  trade_category: string;
  avg_rating: number;
  total_reviews: number;
  total_jobs_completed: number;
  is_verified: boolean;
  years_in_business: number;
  service_areas: string[];
}

interface UserData {
  full_name: string;
  email: string;
  phone: string;
  profile_picture_url: string;
}

export default function Tradespeople() {
  const router = useRouter();
  const { user, signOut, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<TradesPersonProfile | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    business_name: "",
    description: "",
    service_areas: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchProfile();
  }, [isAuthenticated, user]);

  const fetchProfile = async () => {
    if (!user) return;

    const client = getSupabase();
    if (!client) return;

    // Fetch user data
    const { data: userRes, error: userError } = await client
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!userError) {
      setUserData(userRes);
    }

    // Fetch tradesperson profile
    const { data: tradeRes, error: tradeError } = await client
      .from("tradespeople")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!tradeError) {
      setProfile(tradeRes);
      setFormData({
        business_name: tradeRes.business_name || "",
        description: tradeRes.description || "",
        service_areas: tradeRes.service_areas?.join(", ") || "",
      });
    }

    setLoading(false);
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    const client = getSupabase();
    if (!client) return;

    const { error } = await client
      .from("tradespeople")
      .update({
        business_name: formData.business_name,
        description: formData.description,
        service_areas: formData.service_areas.split(",").map((s) => s.trim()),
      })
      .eq("id", profile.id);

    if (!error) {
      setEditing(false);
      fetchProfile();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO
        title="Manage Specialist Profile | CostaTrades"
        description="Update your business details, service areas and contact information so homeowners can find and trust your CostaTrades specialist profile."
      />
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Specialist Profile
              </h1>
              <p className="text-muted-foreground">
                Manage your profile and view opportunities
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {profile ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-primary to-accent p-6 text-white text-center">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-2xl text-primary">
                    {userData?.full_name?.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-bold text-xl">{profile.business_name}</h3>
                  <p className="text-white/80 text-sm">{userData?.email}</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Verification Status */}
                  <div className="text-center">
                    {profile.is_verified ? (
                      <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">
                          Verified Professional
                        </span>
                      </div>
                    ) : (
                      <div className="text-yellow-600 text-sm mb-4">
                        Pending verification
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="border-t border-gray-200 pt-6 space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Years in Business
                      </p>
                      <p className="text-2xl font-bold">
                        {profile.years_in_business || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Jobs Completed
                      </p>
                      <p className="text-2xl font-bold">
                        {profile.total_jobs_completed}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold">
                          {profile.avg_rating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          ({profile.total_reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="border-t border-gray-200 pt-6 space-y-3">
                    {userData?.phone && (
                      <a
                        href={`tel:${userData.phone}`}
                        className="flex items-center gap-3 text-sm text-primary hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        {userData.phone}
                      </a>
                    )}
                    <a
                      href={`mailto:${userData?.email}`}
                      className="flex items-center gap-3 text-sm text-primary hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {userData?.email}
                    </a>
                  </div>

                  <Button
                    onClick={() => setEditing(!editing)}
                    className="w-full mt-4"
                    variant={editing ? "outline" : "default"}
                  >
                    {editing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trade Category */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">Trade Category</h3>
                </div>
                <p className="text-foreground capitalize">
                  {profile.trade_category}
                </p>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">About</h3>
                </div>
                {editing ? (
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                    placeholder="Tell customers about your experience and services"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {profile.description || "No description added yet"}
                  </p>
                )}
              </div>

              {/* Service Areas */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">Service Areas</h3>
                </div>
                {editing ? (
                  <input
                    type="text"
                    value={formData.service_areas}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_areas: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Marbella, Estepona, Malaga (comma separated)"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.service_areas &&
                    profile.service_areas.length > 0 ? (
                      profile.service_areas.map((area, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {area}
                        </span>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No service areas added
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Business Name */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Business Name</h3>
                {editing ? (
                  <input
                    type="text"
                    value={formData.business_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        business_name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your business name"
                  />
                ) : (
                  <p className="text-foreground">{profile.business_name}</p>
                )}
              </div>

              {editing && (
                <div className="flex gap-3">
                  <Button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditing(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {/* Quote Opportunities */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Recent Opportunities</h3>
                <Button
                  onClick={() => navigate("/view-jobs")}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  View Available Jobs
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-muted-foreground mb-6">
              No specialist profile found. Please contact support.
            </p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
