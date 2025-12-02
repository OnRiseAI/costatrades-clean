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
  LayoutDashboard,
  FileText,
  User,
  Settings,
  Bell,
  Search,
  Filter,
  Clock,
  Euro,
  MessageSquare,
  ChevronRight,
  AlertTriangle,
  ShieldCheck,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, getSupabase } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";

// Mock data for leads
const mockLeads = [
  {
    id: 1,
    title: "Leaky Tap Repair",
    location: "Marbella (Elviria)",
    budget: "100 - 200",
    postedTime: "2 hours ago",
    description:
      "Kitchen tap is dripping constantly. Need a plumber to fix or replace it.",
    urgent: true,
    highValue: false,
  },
  {
    id: 2,
    title: "Villa Renovation - Full Interior",
    location: "Estepona",
    budget: "15,000 - 25,000",
    postedTime: "5 hours ago",
    description:
      "Complete renovation of a 3-bedroom villa. New floors, painting, and kitchen installation.",
    urgent: false,
    highValue: true,
  },
  {
    id: 3,
    title: "Garden Maintenance",
    location: "Mijas Costa",
    budget: "500 / month",
    postedTime: "1 day ago",
    description:
      "Looking for a gardener for weekly maintenance of a large villa garden.",
    urgent: false,
    highValue: false,
  },
];

// Mock data for quotes
const mockQuotes = [
  {
    id: 1,
    jobTitle: "Bathroom Tiling",
    clientName: "Sarah Jenkins",
    status: "pending",
    price: "1,200",
    date: "Yesterday",
  },
  {
    id: 2,
    jobTitle: "AC Installation",
    clientName: "Mike Ross",
    status: "accepted",
    price: "850",
    date: "2 days ago",
  },
  {
    id: 3,
    jobTitle: "Pool Repair",
    clientName: "Elena Costa",
    status: "declined",
    price: "300",
    date: "Last week",
  },
];

const mockReviews = [
  {
    id: 1,
    clientName: "Sarah M.",
    jobTitle: "Full villa rewire",
    location: "Marbella",
    rating: 5,
    date: "2 days ago",
    text: "Fantastic work, very professional and tidy. Would happily recommend to friends.",
  },
  {
    id: 2,
    clientName: "David R.",
    jobTitle: "Air conditioning installation",
    location: "Mijas",
    rating: 4.8,
    date: "Last week",
    text: "Job completed on time and as quoted. Great communication throughout.",
  },
  {
    id: 3,
    clientName: "Elena C.",
    jobTitle: "Pool pump replacement",
    location: "Estepona",
    rating: 5,
    date: "3 weeks ago",
    text: "Solved a problem three other companies could not fix. Highly recommended.",
  },
];

export default function TradespersonDashboard() {
  const router = useRouter();
  const { user, signOut, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("find-jobs");
  const [isVerified, setIsVerified] = useState(false); // Mock verification state
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  // Stats
  const stats = {
    newLeads: 12,
    activeQuotes: 3,
    profileViews: 45,
    rating: 4.8,
  };

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const renderSidebar = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24 h-fit">
      <div className="p-6 border-b border-slate-100 bg-[#0a1f44] text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-xl border border-white/20">
            {user?.email?.charAt(0).toUpperCase() || "J"}
          </div>
          <div>
            <h3 className="font-bold text-lg">Hola, Juan</h3>
            <p className="text-xs text-blue-200 truncate max-w-[120px]">
              Pro Member
            </p>
          </div>
        </div>
      </div>
      <nav className="p-4 space-y-1">
        <button
          onClick={() => setActiveTab("find-jobs")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "find-jobs" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <Search className="w-5 h-5" />
          Find Jobs
        </button>
        <button
          onClick={() => setActiveTab("my-quotes")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "my-quotes" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <FileText className="w-5 h-5" />
          My Quotes
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "reviews" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <Star className="w-5 h-5" />
          Reviews
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "profile" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <User className="w-5 h-5" />
          Profile & Portfolio
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "settings" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </nav>
      <div className="p-4 border-t border-slate-100 mt-4">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  const renderStatsHeader = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer group">
        <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
          New Leads
        </p>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-[#0a1f44] group-hover:text-blue-600 transition-colors">
            {stats.newLeads}
          </span>
          <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Search className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
          Active Quotes
        </p>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-[#0a1f44]">
            {stats.activeQuotes}
          </span>
          <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
            <FileText className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
          Profile Views
        </p>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-[#0a1f44]">
            {stats.profileViews}
          </span>
          <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-600">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
          Rating
        </p>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-[#0a1f44]">
            {stats.rating}
          </span>
          <div className="w-8 h-8 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerificationBanner = () => {
    if (isVerified) return null;
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-amber-900">Verify your profile</h4>
            <p className="text-sm text-amber-800">
              You are currently unverified. Verify your phone to unlock 3 free
              quotes.
            </p>
          </div>
        </div>
        <Button
          onClick={() => setShowVerificationModal(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white whitespace-nowrap w-full sm:w-auto"
        >
          Verify Now
        </Button>
      </div>
    );
  };

  const renderLeadFeed = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-[#0a1f44]">
          Jobs in Marbella matching Plumber
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0a1f44] whitespace-nowrap"
          >
            All Jobs
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0a1f44] whitespace-nowrap"
          >
            Urgent
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0a1f44] whitespace-nowrap"
          >
            High Value
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {mockLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-2 mb-2">
                {lead.urgent && (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                    Urgent
                  </span>
                )}
                {lead.highValue && (
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                    High Value
                  </span>
                )}
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                  New
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> {lead.postedTime}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#0a1f44] mb-2">
              {lead.title}
            </h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
              {lead.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" /> {lead.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Euro className="w-4 h-4 text-slate-400" /> Budget:{" "}
                <span className="font-semibold text-[#0a1f44]">
                  {lead.budget}
                </span>
              </div>
            </div>

            <Button
              onClick={() => router.push(`/pro/job/${lead.id}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl shadow-lg shadow-blue-900/10"
            >
              View & Quote
            </Button>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          Load More Jobs
        </Button>
      </div>
    </div>
  );

  const renderMyQuotes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#0a1f44]">My Quotes</h2>

      <div className="space-y-4">
        {mockQuotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-[#0a1f44] text-lg">
                  {quote.jobTitle}
                </h3>
                <p className="text-sm text-slate-500">
                  Client: {quote.clientName}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  quote.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : quote.status === "declined"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {quote.status}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-sm font-medium text-slate-600">
                Your Price:{" "}
                <span className="text-[#0a1f44] font-bold">{quote.price}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="w-4 h-4" /> Message
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#0a1f44]">Reviews</h2>

      <div className="space-y-4">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div>
                <p className="text-sm text-slate-500 mb-1">
                  {review.jobTitle} b7 {review.location}
                </p>
                <h3 className="font-semibold text-[#0a1f44]">
                  {review.clientName}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${index < Math.round(review.rating) ? "fill-current" : "text-slate-200"}`}
                  />
                ))}
                <span className="font-semibold text-amber-600">
                  {review.rating.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400">{review.date}</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-4">"{review.text}"</p>

            <div className="flex flex-wrap gap-3">
              <Button size="sm" className="gap-2">
                <MessageSquare className="w-4 h-4" /> Reply
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <AlertTriangle className="w-4 h-4" /> Report
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <SEO
        title="Pro Dashboard | CostaTrades for Pros"
        description="Manage your leads, send quotes, and update your profile."
      />
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#0a1f44] text-white p-4 sticky top-0 z-30 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
            {user?.email?.charAt(0).toUpperCase() || "J"}
          </div>
          <span className="font-bold">Dashboard</span>
        </div>
        <Bell className="w-6 h-6" />
      </div>

      <div className="container-custom py-6 lg:py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">{renderSidebar()}</div>

          {/* Main Content */}
          <div className="min-h-[500px]">
            {renderStatsHeader()}
            {renderVerificationBanner()}

            {activeTab === "find-jobs" && renderLeadFeed()}
            {activeTab === "my-quotes" && renderMyQuotes()}
            {activeTab === "reviews" && renderReviews()}

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Camera className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#0a1f44]">
                  Profile & Portfolio
                </h3>
                <p className="text-slate-500 mb-6">
                  Upload photos of your work to get more leads.
                </p>
                <Button>Upload Photos</Button>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#0a1f44]">
                  Account Settings
                </h3>
                <p className="text-slate-500 mb-6">
                  Manage your subscription and verification status.
                </p>
                <Button variant="outline">Manage Subscription</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 z-30 flex justify-around shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setActiveTab("find-jobs")}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "find-jobs" ? "text-blue-600" : "text-slate-400"}`}
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Jobs</span>
        </button>
        <button
          onClick={() => setActiveTab("my-quotes")}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "my-quotes" ? "text-blue-600" : "text-slate-400"}`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Quotes</span>
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "reviews" ? "text-blue-600" : "text-slate-400"}`}
        >
          <Star className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Reviews</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "profile" ? "text-blue-600" : "text-slate-400"}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Profile</span>
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "settings" ? "text-blue-600" : "text-slate-400"}`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Settings</span>
        </button>
      </div>

      {/* Verification Modal Mock */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowVerificationModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-center text-[#0a1f44] mb-2">
              Verify Your Account
            </h3>
            <p className="text-center text-slate-600 mb-6">
              Upload your ID and business documents to get the "Verified Pro"
              badge and unlock 3 free quotes.
            </p>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg"
              onClick={() => {
                setIsVerified(true);
                setShowVerificationModal(false);
              }}
            >
              Start Verification
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function XCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}
