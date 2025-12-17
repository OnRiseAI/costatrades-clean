"use client";

import Link from "next/link";
import { Construction, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{description}</p>
          <p className="text-muted-foreground mb-8">
            This page is under construction. Continue exploring or return to the
            homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Home className="h-5 w-5" />
                Back to Homepage
              </Button>
            </Link>
            <Link href="/post-job">
              <Button size="lg" variant="outline">
                Find Professionals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
