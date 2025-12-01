"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  LogOut,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Star,
  MessageSquare,
  Heart,
  User,
  Bell,
  Settings,
  ChevronRight,
  Eye,
  FileText,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Mail,
  Smartphone,
  Home,
  Droplets,
  PaintRoller,
  Wrench,
  Hammer,
  Zap,
  Key,
  Fan,
  Flower2,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth, getSupabase } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import { SEO } from "@/components/SEO";
import { TradespersonCard } from "@/components/TradespersonCard";
import { demoTradespeople } from "@/data/tradespeople";

const NOTIFICATION_PREFS_KEY = "costatrade.notificationPrefs";

interface NotificationPreferences {
  push: boolean;
  whatsapp: boolean;
  email: boolean;
}

// Mock data for demonstration
const mockJobs = [
  {
    id: "1",
    title: "Villa Renovation",
    description:
      "Kitchen tap is dripping constantly. Need a plumber to fix or replace it.",
    location: "Marbella",
    status: "open",
    created_at: "2 days ago",
    quotes_count: 3,
    views_count: 12,
    budget: "€100 - €200",
    category: "builders",
    image: null,
  },
  {
    id: "2",
    title: "Paint Living Room",
    description:
      "Need to paint a 30sqm living room. Walls and ceiling. White paint.",
    location: "Estepona",
    status: "in_progress",
    created_at: "1 week ago",
    quotes_count: 5,
    views_count: 24,
    budget: "€300 - €500",
    category: "painters",
    image: null,
  },
  {
    id: "3",
    title: "Install Ceiling Fan",
    description: "Installation of a new ceiling fan in the bedroom.",
    location: "Mijas",
    status: "completed",
    created_at: "1 month ago",
    quotes_count: 2,
    views_count: 8,
    budget: "€50 - €100",
    category: "electricians",
    image: null,
  },
];

const mockQuotes = [
  {
    id: "q1",
    tradesperson: {
      name: "Juan Perez",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      reviews: 24,
      phone: "34600000001",
    },
    price: "€150",
    message:
      "Hi, I can come tomorrow at 10am. I have the tools and parts needed.",
    date: "Yesterday",
  },
  {
    id: "q2",
    tradesperson: {
      name: "David Smith",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.9,
      reviews: 56,
      phone: "34600000002",
    },
    price: "€120",
    message: "Available this weekend. Price includes basic parts.",
    date: "Today",
  },
  {
    id: "q3",
    tradesperson: {
      name: "Maria Garcia",
      photo: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 4.7,
      reviews: 12,
      phone: "34600000003",
    },
    price: "€180",
    message:
      "I specialize in plumbing repairs. Can guarantee the work for 1 year.",
    date: "2 days ago",
  },
];

export default function CustomerDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signOut, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("jobs");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showQuotes, setShowQuotes] = useState(false);

  // Phone Modal State
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [phoneModalData, setPhoneModalData] = useState<any>(null);

  const savedPros = demoTradespeople.slice(0, 6);

  // Notification settings state
  const [pushEnabled, setPushEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const stored = window.localStorage.getItem(NOTIFICATION_PREFS_KEY);
      if (!stored) return true;
      const parsed = JSON.parse(stored) as NotificationPreferences;
      return parsed.push ?? true;
    } catch {
      return true;
    }
  });
  const [whatsappEnabled, setWhatsappEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const stored = window.localStorage.getItem(NOTIFICATION_PREFS_KEY);
      if (!stored) return true;
      const parsed = JSON.parse(stored) as NotificationPreferences;
      return parsed.whatsapp ?? true;
    } catch {
      return true;
    }
  });
  const [emailEnabled, setEmailEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const stored = window.localStorage.getItem(NOTIFICATION_PREFS_KEY);
      if (!stored) return false;
      const parsed = JSON.parse(stored) as NotificationPreferences;
      return parsed.email ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    try {
      const prefs: NotificationPreferences = {
        push: pushEnabled,
        whatsapp: whatsappEnabled,
        email: emailEnabled,
      };
      window.localStorage.setItem(
        NOTIFICATION_PREFS_KEY,
        JSON.stringify(prefs),
      );
    } catch {
      // If persisting preferences fails, continue without blocking the UI
    }
  }, [pushEnabled, whatsappEnabled, emailEnabled]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (!tab) return;
    const allowedTabs = [
      "jobs",
      "messages",
      "profile",
      "notifications",
      "saved",
    ];
    if (allowedTabs.includes(tab)) {
      setActiveTab(tab);
      if (tab !== "jobs") {
        setShowQuotes(false);
      }
    }
  }, [searchParams]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleShowNumber = (tradesperson: any) => {
    setPhoneModalData(tradesperson);
    setPhoneModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <span className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-medium tracking-wide border border-green-100">
            Accepting Proposals
          </span>
        );
      case "in_progress":
        return (
          <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-medium tracking-wide border border-blue-100">
            In Progress
          </span>
        );
      case "completed":
        return (
          <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-xs font-medium tracking-wide border border-slate-100">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "plumbers":
        return <Droplets className="w-10 h-10 text-[#0a1f44]" />;
      case "painters":
        return <PaintRoller className="w-10 h-10 text-[#0a1f44]" />;
      case "electricians":
        return <Zap className="w-10 h-10 text-[#0a1f44]" />;
      case "builders":
        return <Hammer className="w-10 h-10 text-[#0a1f44]" />;
      case "locksmiths":
        return <Key className="w-10 h-10 text-[#0a1f44]" />;
      case "air-conditioning":
        return <Fan className="w-10 h-10 text-[#0a1f44]" />;
      case "gardeners":
        return <Flower2 className="w-10 h-10 text-[#0a1f44]" />;
      default:
        return <Wrench className="w-10 h-10 text-[#0a1f44]" />;
    }
  };

  const renderSidebar = () => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0a1f44] rounded-full flex items-center justify-center text-white font-bold text-xl">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h3 className="font-bold text-[#0a1f44]">My Account</h3>
            <p className="text-xs text-slate-500 truncate max-w-[120px]">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>
      <nav className="p-4 space-y-1">
        <button
          onClick={() => {
            setActiveTab("jobs");
            setShowQuotes(false);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === "jobs" ? "bg-[#0a1f44] text-white" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <Briefcase className="w-5 h-5" />
          My Projects
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === "messages" ? "bg-[#0a1f44] text-white" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <MessageSquare className="w-5 h-5" />
          Messages
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === "saved" ? "bg-[#0a1f44] text-white" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <Heart className="w-5 h-5" />
          Saved Pros
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === "profile" ? "bg-[#0a1f44] text-white" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <User className="w-5 h-5" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === "notifications" ? "bg-[#0a1f44] text-white" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <Bell className="w-5 h-5" />
          Notifications
        </button>
      </nav>
      <div className="p-4 border-t border-slate-100 mt-4">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  const renderJobsList = () => (
    <div className="space-y-8">
      {/* Concierge Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#0a1f44] mb-2">
            Welcome back.
          </h2>
          <p className="text-slate-500 text-lg">
            You have 3 new proposals to review across your active projects.
          </p>
        </div>
        <Button
          onClick={() => router.push("/post-job")}
          className="bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white px-6 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5 mr-2" /> Start New Project
        </Button>
      </div>

      {mockJobs.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0a1f44]">
            <Home className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#0a1f44] mb-3">
            Ready to upgrade your home?
          </h3>
          <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
            Post your first project to connect with verified specialists.
          </p>
          <Button
            onClick={() => router.push("/post-job")}
            size="lg"
            className="bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white px-8 h-12 text-base"
          >
            Post a Job Now
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {mockJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Section (The Visual - 20% width) */}
                <div className="w-full md:w-[180px] h-48 md:h-auto bg-slate-100 flex items-center justify-center flex-shrink-0 border-b md:border-b-0 md:border-r border-slate-100 p-4">
                  {job.image ? (
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-[120px] h-[120px] rounded-xl object-cover shadow-sm"
                    />
                  ) : (
                    <div className="w-[120px] h-[120px] bg-slate-200/50 rounded-xl flex items-center justify-center">
                      {getCategoryIcon(job.category)}
                    </div>
                  )}
                </div>

                {/* Content Wrapper */}
                <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row gap-6">
                  {/* Middle Section (The Details - 50% width) */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0a1f44] mb-2 group-hover:text-blue-700 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                      <MapPin className="w-4 h-4 text-[#0a1f44]" />{" "}
                      {job.location}
                    </div>
                    <div className="text-sm font-medium text-slate-600 mb-4">
                      Est. Budget:{" "}
                      <span className="text-[#0a1f44] font-bold">
                        {job.budget}
                      </span>
                    </div>
                    <div>{getStatusBadge(job.status)}</div>
                  </div>

                  {/* Right Section (The Action - 30% width) */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:gap-6 md:pl-8 md:border-l border-slate-100 min-w-[200px]">
                    <div className="text-center md:text-right">
                      <div className="text-xl md:text-2xl font-bold text-[#0a1f44]">
                        {job.quotes_count} Proposals Received
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedJob(job.id);
                        setShowQuotes(true);
                      }}
                      className="bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white w-full md:w-auto px-6 py-2 h-auto font-semibold"
                    >
                      Review Proposals
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderQuotesDetail = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setShowQuotes(false)}
          className="text-slate-400 hover:text-[#0a1f44] transition-colors"
        >
          My Projects
        </button>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <span className="font-semibold text-[#0a1f44]">
          Proposals for "Villa Renovation"
        </span>
      </div>

      <div className="grid gap-6">
        {mockQuotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Tradesperson Info */}
              <div className="flex items-start gap-4 min-w-[200px]">
                <img
                  src={quote.tradesperson.photo}
                  alt={quote.tradesperson.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-[#0a1f44]">
                    {quote.tradesperson.name}
                  </h4>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold leading-none pt-0.5">
                      {quote.tradesperson.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-400 font-normal leading-none pt-0.5">
                      ({quote.tradesperson.reviews})
                    </span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </div>
                </div>
              </div>

              {/* Quote Details */}
              <div className="flex-1 border-l border-slate-100 pl-0 md:pl-6 pt-4 md:pt-0 border-t md:border-t-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-2xl font-bold text-[#0a1f44]">
                    {quote.price}{" "}
                    <span className="text-sm font-normal text-slate-500">
                      (Estimated)
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{quote.date}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 bg-slate-50 p-3 rounded-lg">
                  "{quote.message}"
                </p>
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                  {/* Primary Button: WhatsApp */}
                  <Button
                    className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold flex-1 md:flex-none gap-2"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${quote.tradesperson.phone}`,
                        "_blank",
                      )
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </Button>

                  {/* Secondary Button: Show Number */}
                  <Button
                    variant="outline"
                    className="bg-white border-[#0A1E40] text-[#0A1E40] hover:bg-slate-50 flex-1 md:flex-none gap-2"
                    onClick={() => handleShowNumber(quote.tradesperson)}
                  >
                    <Phone className="w-4 h-4" />
                    Show Number
                  </Button>

                  {/* Tertiary Action: Decline */}
                  <button className="text-slate-400 text-sm hover:underline hover:text-slate-600 mt-2 md:mt-0 md:ml-auto">
                    Decline Proposal
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSavedPros = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0a1f44]">Saved Pros</h2>
        <p className="text-sm text-slate-500">
          Quickly rehire specialists you trust.
        </p>
      </div>

      {savedPros.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0a1f44] mb-2">
            No saved pros yet
          </h3>
          <p className="text-slate-500 mb-6">
            Save specialists from your quotes or search results to find them
            again quickly.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedPros.map((pro) => (
            <TradespersonCard key={pro.slug} {...pro} />
          ))}
        </div>
      )}
    </div>
  );

  const renderNotifications = () => (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-[#0a1f44] mb-2">Stay Updated</h2>
      <p className="text-slate-500 mb-8">
        Manage how you receive updates about your jobs and quotes.
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        <div className="p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#0a1f44]">Push Notifications</h3>
              <p className="text-sm text-slate-500">
                Get instant alerts on your device when you get a quote.
              </p>
            </div>
          </div>
          <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#0a1f44]">WhatsApp Alerts</h3>
              <p className="text-sm text-slate-500">
                Receive quotes and messages directly to WhatsApp.
              </p>
            </div>
          </div>
          <Switch
            checked={whatsappEnabled}
            onCheckedChange={setWhatsappEnabled}
          />
        </div>

        <div className="p-6 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#0a1f44]">Email Summaries</h3>
              <p className="text-sm text-slate-500">
                Receive a daily digest of activity on your account.
              </p>
            </div>
          </div>
          <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans pb-20">
      <SEO
        title="My Dashboard | Manage Projects"
        description="Manage your home renovations, view proposals in your language, and message professionals directly. Control your projects from one secure dashboard."
      />
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-30 flex justify-between items-center">
        <h1 className="font-bold text-lg text-[#0a1f44]">
          Manage Your Projects
        </h1>
        <div className="w-8 h-8 bg-[#0a1f44] rounded-full flex items-center justify-center text-white font-bold text-sm">
          {user?.email?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>

      <div className="container-custom py-8 lg:py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">{renderSidebar()}</div>

          {/* Main Content */}
          <div className="min-h-[500px]">
            {activeTab === "jobs" && !showQuotes && renderJobsList()}
            {activeTab === "jobs" && showQuotes && renderQuotesDetail()}
            {activeTab === "saved" && renderSavedPros()}
            {activeTab === "notifications" && renderNotifications()}
            {activeTab === "messages" && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#0a1f44]">Messages</h3>
                <p className="text-slate-500">
                  Select a quote to start messaging a specialist.
                </p>
              </div>
            )}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#0a1f44]">
                  Profile Settings
                </h3>
                <p className="text-slate-500">
                  Profile management coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 z-30 flex justify-around">
        <button
          onClick={() => {
            setActiveTab("jobs");
            setShowQuotes(false);
          }}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "jobs" ? "text-[#0a1f44]" : "text-slate-400"}`}
        >
          <Briefcase className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Projects</span>
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "messages" ? "text-[#0a1f44]" : "text-slate-400"}`}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Chat</span>
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "notifications" ? "text-[#0a1f44]" : "text-slate-400"}`}
        >
          <Bell className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Alerts</span>
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "saved" ? "text-[#0a1f44]" : "text-slate-400"}`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Saved</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === "profile" ? "text-[#0a1f44]" : "text-slate-400"}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium mt-1">Profile</span>
        </button>
      </div>

      {/* Phone Number Modal */}
      <Dialog open={phoneModalOpen} onOpenChange={setPhoneModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#0a1f44]">
              Contact Information
            </DialogTitle>
            <DialogDescription className="text-center">
              Get in touch with this professional directly
            </DialogDescription>
          </DialogHeader>

          {phoneModalData && (
            <div className="flex flex-col items-center space-y-6 py-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {phoneModalData.photo ? (
                  <img
                    src={phoneModalData.photo}
                    alt={phoneModalData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">
                    {phoneModalData.name?.charAt(0)}
                  </span>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {phoneModalData.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {phoneModalData.tradeCategory || "Professional"}
                </p>
              </div>

              <div className="w-full bg-blue-50 rounded-xl p-6 text-center border border-blue-100">
                <p className="text-sm text-blue-600 mb-2 font-medium">
                  Phone Number
                </p>
                <a
                  href={`tel:${phoneModalData.phone || "+34 952 123 456"}`}
                  className="text-2xl font-bold text-[#0a1f44] hover:underline flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  {phoneModalData.phone || "+34 952 123 456"}
                </a>
              </div>

              <div className="text-center text-sm text-gray-500 max-w-xs">
                <p>
                  Please mention <strong>CostaTrade</strong> when you call to
                  ensure the best service.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
