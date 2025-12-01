"use client";

import Link from "next/link";
import { Menu, X, Heart, User, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    if (!isAppModalOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAppModalOpen]);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#0066CC] hover:text-[#0052A3]"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" strokeWidth={2} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={2} />
                )}
              </button>
              <Link href="/" className="hidden md:flex items-center">
                <img
                  src="/images/logo.webp"
                  alt="CostaTrades logo"
                  className="w-[48px] h-[48px] rounded-2xl"
                  width="48"
                  height="48"
                  loading="eager"
                  decoding="async"
                />
              </Link>
            </div>

            {/* Right: primary actions */}
            <div className="flex items-center gap-3">
              <Link href="/post-job" className="hidden md:block">
                <Button className="bg-[#E31E24] hover:bg-[#C41218] text-white px-5 md:px-7 h-[44px] text-[14px] md:text-[15px] font-semibold rounded-full whitespace-nowrap shadow-sm">
                  Post a job
                </Button>
              </Link>
              <Link href="/join-as-tradesperson" className="hidden md:block">
                <Button
                  variant="outline"
                  className="border border-[#0a1f44] text-[#0a1f44] hover:bg-gray-50 hover:text-[#0a1f44] bg-white px-5 md:px-7 h-[44px] text-[14px] md:text-[15px] font-medium rounded-full whitespace-nowrap"
                >
                  Join as Pro
                </Button>
              </Link>
              <Button
                variant="outline"
                className="hidden lg:inline-flex border-0 text-[#0a1f44] hover:bg-gray-50 hover:text-[#0a1f44] bg-white px-4 h-[40px] text-[13px] font-medium rounded-full whitespace-nowrap"
                onClick={() => setIsAppModalOpen(true)}
              >
                Download app
              </Button>
              <Link
                href="/saved-trades"
                className="hidden md:flex items-center justify-center"
              >
                <div className="hover:opacity-80 transition-opacity">
                  <Heart
                    className="h-[32px] w-[32px] text-[#E31E24]"
                    fill="#E31E24"
                    strokeWidth={0}
                  />
                </div>
              </Link>
              <Link href="/login" className="flex items-center justify-center">
                <div className="w-[48px] h-[48px] bg-[#0a1f44] rounded-full flex items-center justify-center hover:bg-[#0a1f44]/90 transition-colors shadow-sm">
                  <User
                    className="h-[22px] w-[22px] text-white"
                    strokeWidth={2}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* App Coming Soon Modal */}
      <Dialog open={isAppModalOpen} onOpenChange={setIsAppModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl border-0 shadow-2xl">
          <DialogHeader className="text-center pt-6">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Clock className="h-10 w-10 text-[#0a1f44]" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[#0a1f44]">
              Coming Soon!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 pt-2 text-base">
              We're putting the finishing touches on our mobile app. Get ready
              for the easiest way to find professionals on the Costa del Sol.
            </DialogDescription>
          </DialogHeader>

          <div className="py-8">
            <div className="flex justify-center gap-4 text-center">
              <div className="bg-[#0a1f44] text-white p-3 rounded-xl min-w-[70px]">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-xs uppercase opacity-70">Days</div>
              </div>
              <div className="text-2xl font-bold text-[#0a1f44] self-center">
                :
              </div>
              <div className="bg-[#0a1f44] text-white p-3 rounded-xl min-w-[70px]">
                <div className="text-2xl font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase opacity-70">Hours</div>
              </div>
              <div className="text-2xl font-bold text-[#0a1f44] self-center">
                :
              </div>
              <div className="bg-[#0a1f44] text-white p-3 rounded-xl min-w-[70px]">
                <div className="text-2xl font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase opacity-70">Mins</div>
              </div>
              <div className="text-2xl font-bold text-[#0a1f44] self-center">
                :
              </div>
              <div className="bg-[#0a1f44] text-white p-3 rounded-xl min-w-[70px]">
                <div className="text-2xl font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase opacity-70">Secs</div>
              </div>
            </div>
          </div>

          <div className="pb-6 px-4">
            <Button
              className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white font-bold py-6 rounded-xl"
              onClick={() => setIsAppModalOpen(false)}
            >
              Notify Me When It Launches
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Menu - Sidebar style */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-[72px] left-0 right-0 bottom-0 bg-black/20 z-30"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-[72px] left-0 w-80 max-h-[calc(100vh-72px)] bg-white border-r border-gray-200 overflow-y-auto z-40 shadow-lg">
            <div className="px-6 py-6 flex flex-col space-y-6">
              {/* Homeowner Section */}
              <div className="flex flex-col space-y-4">
                <h2 className="text-xl font-bold text-[#0a1f44]">
                  For homeowners
                </h2>
                <Link href="/post-job" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-[#E31E24] hover:bg-[#C41218] text-white px-6 py-3 text-base rounded-lg w-full">
                    Post a job
                  </Button>
                </Link>
                <div className="flex flex-col space-y-2 text-sm pl-2">
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How it works
                  </Link>
                  <Link
                    href="/cost-guides"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cost guides
                  </Link>
                  <Link
                    href="/holiday-homes"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Holiday homes
                  </Link>
                  <Link
                    href="/landlords"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Landlords
                  </Link>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/saved-trades"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Saved trades
                  </Link>
                  <Link
                    href="/review-trade"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Review a trade
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Trades Section */}
              <div className="flex flex-col space-y-4 pb-6">
                <h2 className="text-xl font-bold text-[#0a1f44]">Trades</h2>
                <Link
                  href="/join-as-tradesperson"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white px-6 py-3 text-base rounded-lg w-full">
                    Join as Pro
                  </Button>
                </Link>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm pl-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login To Members Area
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
