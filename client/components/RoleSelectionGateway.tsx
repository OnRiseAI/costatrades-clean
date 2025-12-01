"use client";

import Link from "next/link";
import { Home, Briefcase } from "lucide-react";

interface RoleSelectionGatewayProps {
  onSelectRole?: (role: "customer" | "tradesperson") => void;
}

export function RoleSelectionGateway({
  onSelectRole,
}: RoleSelectionGatewayProps) {
  const handleRoleClick = (
    e: React.MouseEvent,
    role: "customer" | "tradesperson",
  ) => {
    if (onSelectRole) {
      e.preventDefault();
      onSelectRole(role);
    }
  };

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center bg-slate-50 py-16 md:py-24">
      <div className="container-custom max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-[2.5rem] font-bold text-[#0a1f44] mb-4 leading-tight">
            Welcome to CostaTrades
          </h1>
          <p className="text-lg text-slate-500 font-sans">
            Select your account type to continue.
          </p>
        </header>

        {/* The Selection Cards */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-6 mb-12">
          {/* Card A: Homeowner / Demand */}
          <Link
            href="/signup"
            onClick={(e) => handleRoleClick(e, "customer")}
            className="flex-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f44] focus-visible:ring-offset-2 rounded-xl"
          >
            <article className="h-full bg-white rounded-xl shadow-sm border border-gray-200 p-10 flex flex-col items-start text-left transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-[#0a1f44] group-hover:shadow-md">
              <div className="mb-8">
                <Home
                  className="w-10 h-10 text-[#0a1f44] stroke-[1.5]"
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-2xl font-bold text-[#0a1f44] mb-3">
                I need a Specialist
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Post jobs, compare proposals, and hire verified professionals.
              </p>
            </article>
          </Link>

          {/* Card B: Specialist / Supply - THE PREMIUM CARD */}
          <Link
            href="/tradesperson/details"
            onClick={(e) => handleRoleClick(e, "tradesperson")}
            className="flex-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a1f44] focus-visible:ring-offset-2 rounded-xl"
          >
            <article className="h-full bg-[#0A1E40] rounded-xl p-10 flex flex-col items-start text-left relative overflow-hidden transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:bg-[#0e2a55] group-hover:shadow-xl">
              {/* Badge */}
              <div className="absolute top-6 right-6 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-amber-400 tracking-wider">
                  PARTNER
                </span>
              </div>

              <div className="mb-8">
                <Briefcase
                  className="w-10 h-10 text-white stroke-[1.5]"
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                I am a Professional
              </h2>
              <p className="text-base text-gray-300 leading-relaxed">
                Join the exclusive network, find high-value clients, and grow
                your business.
              </p>
            </article>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center">
          <Link
            href="/login"
            className="text-base text-slate-500 hover:text-[#0a1f44] transition-colors font-medium"
          >
            Already a member? Log In
          </Link>
        </div>
      </div>
    </section>
  );
}
