"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Briefcase,
  AlertCircle,
  Bell,
  MessageCircle,
  Smartphone,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { RoleSelectionGateway } from "@/components/RoleSelectionGateway";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, loading } = useAuth();

  const [step, setStep] = useState<0 | 1 | 2>(0); // 0 = Role Selection, 1 = Account Details, 2 = Preferences

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    user_type: "customer", // customer or tradesperson
    phone: "",
    business_name: "",
    trade_category: "",
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    push: true,
    whatsapp: true,
    email: false,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role: "customer" | "tradesperson") => {
    setFormData((prev) => ({ ...prev, user_type: role }));
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Step 1 validation (account details)
    if (step === 1) {
      if (!formData.full_name || !formData.email || !formData.password) {
        setError("Please fill in all required fields");
        return;
      }

      if (formData.password !== formData.confirm_password) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      setStep(2);
      return;
    }

    // Step 2 validation (additional details)
    if (formData.user_type === "tradesperson" && !formData.trade_category) {
      setError("Please select a trade category");
      return;
    }

    setIsLoading(true);

    const { error: signupError } = await signUp(
      formData.email,
      formData.password,
      {
        full_name: formData.full_name,
        phone: formData.phone,
        user_type: formData.user_type,
        business_name: formData.business_name,
        trade_category: formData.trade_category,
      },
    );

    if (signupError) {
      setError(signupError.message || "Failed to sign up");
      setIsLoading(false);
      return;
    }

    try {
      const prefs = {
        push: notificationPrefs.push,
        whatsapp: notificationPrefs.whatsapp,
        email: notificationPrefs.email,
      };
      window.localStorage.setItem(
        "costatrade.notificationPrefs",
        JSON.stringify(prefs),
      );
    } catch {
      // If storing preferences fails, continue without blocking signup
    }

    router.push("/customer-dashboard");
  };

  // If step is 0, show the Role Selection Gateway
  if (step === 0) {
    return (
      <>
        <SEO
          title="Join CostaTrades | Select Account Type"
          description="Choose how you want to use CostaTrades: as a homeowner or a professional."
        />
        <RoleSelectionGateway onSelectRole={handleRoleSelect} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2">
      <SEO
        title="Create an Account | CostaTrades"
        description="Join CostaTrades as a homeowner or specialist."
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Sign Up",
          description:
            "Create a CostaTrades account as a homeowner or specialist to access the platform.",
        }}
      />

      {/* Left Side – Story / Benefits */}
      <div className="hidden lg:block relative bg-[#0a1f44] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between p-12 xl:p-16 text-white">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-blue-100">
                Free account · No hidden fees
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Join CostaTrade in minutes
            </h1>
            <p className="text-lg text-blue-100/90 max-w-xl mb-8 leading-relaxed">
              One account to post jobs, compare quotes and save your favourite
              specialists across the Costa del Sol.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-300">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">Verified local pros only</p>
                  <p className="text-sm text-blue-100/80">
                    Every specialist goes through checks before appearing on the
                    platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-200">
                  <Star className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">Reviews from real homeowners</p>
                  <p className="text-sm text-blue-100/80">
                    See ratings and feedback from people with homes just like
                    yours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-200">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">Stay in control of alerts</p>
                  <p className="text-sm text-blue-100/80">
                    Choose how we contact you about new quotes and job updates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-blue-100/80">Trusted by homeowners</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                4.9
                <span className="flex gap-1 text-yellow-300">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </span>
              </p>
            </div>
            <p className="text-sm text-blue-100/80 max-w-[180px]">
              "The easiest way to find reliable trades on the coast."
            </p>
          </div>
        </div>
      </div>

      {/* Right Side – Form */}
      <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-16 xl:px-24 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center lg:text-left">
            <button
              onClick={() => setStep(0)}
              className="inline-block mb-4 text-sm text-muted-foreground hover:text-[#0a1f44] transition-colors"
            >
              ← Back to selection
            </button>
            <h2 className="text-3xl font-bold text-[#0a1f44] mb-2 tracking-tight">
              Create your account
            </h2>
            <p className="text-sm text-muted-foreground">
              Step {step} of 2 · It takes less than 2 minutes.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-xs font-medium">
                <span
                  className={`px-3 py-1 rounded-full ${step === 1 ? "bg-[#0a1f44] text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  1. Account details
                </span>
                <span
                  className={`px-3 py-1 rounded-full ${step === 2 ? "bg-[#0a1f44] text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  2. Preferences
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <>
                  {/* User Type Display (Read Only) */}
                  <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0a1f44]/10 flex items-center justify-center text-[#0a1f44]">
                        {formData.user_type === "customer" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Briefcase className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0a1f44] capitalize">
                          {formData.user_type === "customer"
                            ? "Homeowner Account"
                            : "Professional Account"}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="text-xs text-muted-foreground hover:text-[#0a1f44] underline"
                    >
                      Change
                    </button>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full h-11 px-4 border border-input rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1f44]"
                      placeholder="John Smith"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full h-11 pl-9 pr-4 border border-input rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1f44]"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full h-11 pl-9 pr-4 border border-input rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1f44]"
                        placeholder="Create a password"
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      At least 6 characters. Use something you don’t use
                      elsewhere.
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Confirm password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className="w-full h-11 pl-9 pr-4 border border-input rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1f44]"
                        placeholder="Repeat your password"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || loading}
                    className="w-full h-11 bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    Continue
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-11 px-4 border border-input rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1f44]"
                      placeholder="+34 950 123 456"
                    />
                  </div>

                  {/* Tradesperson Fields */}
                  {formData.user_type === "tradesperson" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Business name
                        </label>
                        <input
                          type="text"
                          name="business_name"
                          value={formData.business_name}
                          onChange={handleChange}
                          className="w-full h-11 px-4 border border-input rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1f44]"
                          placeholder="Smith Plumbing Services"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Trade category
                        </label>
                        <select
                          name="trade_category"
                          value={formData.trade_category}
                          onChange={handleChange}
                          className="w-full h-11 px-4 border border-input rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a1f44] text-sm"
                        >
                          <option value="">Select a trade</option>
                          <option value="plumbers">Plumbers</option>
                          <option value="electricians">Electricians</option>
                          <option value="builders">
                            Builders & Renovations
                          </option>
                          <option value="painters">
                            Painters & Decorators
                          </option>
                          <option value="pool-maintenance">
                            Pool Services
                          </option>
                          <option value="air-conditioning">Air Con</option>
                          <option value="locksmiths">Locksmiths</option>
                          <option value="gardeners">Gardeners</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Notification preferences */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        How should we notify you?
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        You can change these any time in your dashboard.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl divide-y divide-slate-200">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Bell className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Push notifications
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Alerts when you receive new quotes.
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notificationPrefs.push}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs((prev) => ({
                              ...prev,
                              push: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              WhatsApp alerts
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Get messages straight to your phone.
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notificationPrefs.whatsapp}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs((prev) => ({
                              ...prev,
                              whatsapp: checked,
                            }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Email summaries
                            </p>
                            <p className="text-xs text-muted-foreground">
                              A daily digest of jobs and quotes.
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={notificationPrefs.email}
                          onCheckedChange={(checked) =>
                            setNotificationPrefs((prev) => ({
                              ...prev,
                              email: checked,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 rounded-full"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || loading}
                      className="flex-1 h-11 bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white text-sm font-semibold rounded-full"
                    >
                      {isLoading || loading
                        ? "Creating account..."
                        : "Create Account"}
                    </Button>
                  </div>
                </>
              )}
            </form>

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center mt-6">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and <span className="text-primary">Privacy Policy</span>
            </p>

            {/* Sign In Link */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
