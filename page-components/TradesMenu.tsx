"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TradesMenu() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="flex flex-col items-center space-y-8">
          {/* Trades Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a1f44] text-center">
            Trades
          </h1>

          {/* Join Button */}
          <Link href="/join-as-tradesperson" className="w-full max-w-sm">
            <Button className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white px-12 py-7 text-xl font-medium rounded-full shadow-sm">
              Join CostaTrade
            </Button>
          </Link>

          {/* Menu Links */}
          <div className="flex flex-col items-center space-y-6 w-full">
            <Link
              href="/pro/dashboard"
              className="text-lg md:text-xl text-gray-600 hover:text-[#0a1f44] transition-colors text-center"
            >
              Login To Members Area
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
