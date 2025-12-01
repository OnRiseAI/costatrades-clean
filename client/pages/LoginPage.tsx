"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Star } from "lucide-react";
import { useAuth, getSupabase } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginType = searchParams?.get("type"); // 'tradesperson' or 'homeowner' (optional)

  const isFormValid = email && password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (isFormValid) {
      const { data, error: signInError } = await signIn(email, password);

      if (signInError) {
        setError(signInError.message || "Failed to sign in");
        setIsLoading(false);
        return;
      }

      let redirectPath = "/customer-dashboard";

      try {
        const userId = (data as any)?.user?.id;

        if (userId) {
          const client = getSupabase();
          if (client) {
            const { data: profile } = await client
              .from("users")
              .select("user_type")
              .eq("id", userId)
              .single();

            if (profile?.user_type === "tradesperson") {
              redirectPath = "/pro/dashboard";
            }
          }
        }
      } catch {
        // If profile lookup fails, default redirect is used
      }

      router.push(redirectPath);
    }
  };

  return (
    <div className="min-h-screen bg-white grid lg:grid-cols-2">
      <SEO
        title="Login | CostaTrades"
        description="Sign in to your homeowner or tradesperson account."
      />
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 py-12">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div className="mb-10">
            <Link href="/" className="inline-block mb-8">
              <span className="text-2xl font-bold text-[#0a1f44]">
                CostaTrade
              </span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-3 tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-lg">
              Sign in to manage your{" "}
              {loginType === "tradesperson" ? "business" : "projects"} and
              account.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0a1f44] focus:ring-0 transition-all outline-none"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#0a1f44] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0a1f44] focus:ring-0 transition-all outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#0a1f44] focus:ring-[#0a1f44]"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-600"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white rounded-full text-base font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              disabled={!isFormValid || isLoading || loading}
            >
              {isLoading || loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-foreground font-medium"
              onClick={() => alert("Google login will be implemented soon")}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-foreground font-medium"
              onClick={() => alert("Apple login will be implemented soon")}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#0a1f44] hover:underline"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image & Testimonial */}
      <div className="hidden lg:block relative bg-[#0a1f44] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        </div>

        <img
          src="https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Modern home interior"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44] via-[#0a1f44]/60 to-transparent"></div>

        <div className="relative z-10 h-full flex flex-col justify-end p-16 text-white">
          <div className="mb-8">
            <div className="flex gap-1 text-orange-400 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl font-medium leading-relaxed mb-6">
              "CostaTrade has completely transformed how I manage my business.
              The quality of leads is unmatched, and the platform is so easy to
              use."
            </blockquote>
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/100?img=33"
                alt="Miguel Rodriguez"
                className="w-12 h-12 rounded-full border-2 border-white/20"
              />
              <div>
                <p className="font-bold text-lg">Miguel Rodriguez</p>
                <p className="text-blue-200">Electrician in Marbella</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-3xl font-bold mb-1">2k+</p>
              <p className="text-sm text-blue-200">Active Trades</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">15k+</p>
              <p className="text-sm text-blue-200">Jobs Posted</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-1">4.9/5</p>
              <p className="text-sm text-blue-200">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
