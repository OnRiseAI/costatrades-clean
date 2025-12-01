"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50">
      <Link href="/post-job">
        <Button className="w-full bg-[#E31E24] hover:bg-[#C41218] text-white font-bold h-12 text-lg rounded-xl shadow-md">
          Post a Job for Free
        </Button>
      </Link>
    </div>
  );
}
