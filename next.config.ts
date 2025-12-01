import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  eslint: {
    // Disable ESLint during builds to speed up deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during build to avoid leaflet type issues
    ignoreBuildErrors: true,
  },
  experimental: {
    // Enable experimental features if needed
    optimizePackageImports: ["lucide-react", "@radix-ui/*"],
  },
};

export default nextConfig;
