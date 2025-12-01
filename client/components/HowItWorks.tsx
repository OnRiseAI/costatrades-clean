"use client";

import { Search, Eye, MessageCircle, CheckCircle } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search & Filter",
      description:
        "Filter by trade, language and location to find the perfect specialist.",
    },
    {
      icon: Eye,
      title: "Compare Profiles",
      description:
        "Scan photos, reviews and completion rate. Shortlist the ones you trust.",
    },
    {
      icon: MessageCircle,
      title: "Direct Chat",
      description:
        "Chat or WhatsApp pros in real time. Share photos and agree the scope.",
    },
    {
      icon: CheckCircle,
      title: "Hire & Rate",
      description:
        "Book your favourite, pay them directly and leave a rating for the community.",
    },
  ];

  return (
    <section className="relative bg-slate-50 py-20 px-6 overflow-hidden antialiased">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
      </div>

      {/* Connecting line for desktop */}
      <div className="hidden lg:block absolute inset-x-0 top-1/2">
        <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-blue-100 via-blue-300/70 to-blue-100" />
      </div>

      <div className="container-custom relative max-w-6xl">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 shadow-sm mb-4">
            Simple costa trades flow
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44]">
            How it works
          </h2>
          <p className="mt-3 text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            A four–step journey from idea to finished job. No agencies, no
            friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <div key={step.title} className="relative group">
                <div className="relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-sm p-7 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl transform-gpu backface-hidden overflow-hidden">
                  {/* Big step number in the foreground corner */}
                  <div className="absolute -top-4 -right-4 text-8xl font-extrabold text-slate-100 pointer-events-none select-none z-0">
                    {stepNumber}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0a1f44] shadow-[0_6px_18px_rgba(15,23,42,0.08)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                        Step {stepNumber}
                      </span>
                    </div>

                    <h3 className="mb-2 text-base md:text-lg font-semibold text-[#0a1f44]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    {index === 0 && (
                      <span className="mt-5 inline-flex w-fit items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-800">
                        Start here
                        <span className="text-blue-500">•</span>
                        Ideal if you know roughly what you need
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
