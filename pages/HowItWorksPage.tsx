"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Image,
  CheckCircle,
  Shield,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { SEO } from "@/components/SEO";

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is it really free?",
      answer:
        "Yes. Using CostaTrades is 100% free for homeowners. There are no sign-up fees, hidden charges or mark-ups on quotes. You only pay the professional directly for the work done.",
    },
    {
      question: "How many quotes will I get?",
      answer:
        "For most jobs you will receive between 3–5 quotes from available specialists. Sometimes more, sometimes fewer, depending on the type of work and your location.",
    },
    {
      question: "What if I don't like the quotes?",
      answer:
        "There is absolutely no obligation to hire. If the quotes or professionals don't feel like the right fit, you can simply decline and post again later or look elsewhere.",
    },
    {
      question: "How do you verify specialists?",
      answer:
        "We perform rigorous checks including ID verification, business registration status, and insurance coverage. We also collect real reviews from homeowners like you to ensure ongoing quality.",
    },
    {
      question: "What areas of Costa del Sol do you cover?",
      answer:
        "We cover the entire Costa del Sol region, including major hubs like Marbella, Estepona, Mijas, Fuengirola, Benalmadena, and Sotogrande, as well as inland areas.",
    },
    {
      question: "Do the tradespeople speak English?",
      answer:
        "Yes, many of our professionals are multilingual. You can filter for English-speaking specialists when you post your job or review their profiles.",
    },
    {
      question: "Can I see examples of previous work?",
      answer:
        "Absolutely. Specialist profiles feature photo galleries of their past projects, so you can see the quality of their craftsmanship before you hire.",
    },
    {
      question: "How quickly can I get a job done?",
      answer:
        "Many specialists offer same-day or next-day availability for urgent tasks. When you post your job, you can specify your timeline, and we'll match you with professionals who are available when you need them.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/10" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        </div>

        <div className="container-custom relative z-10">
          <SEO
            title="How It Works | CostaTrades"
            description="Post a job in your language and get proposals from multilingual experts. The safe, fast, and verified way to hire professionals on the Costa del Sol."
          />
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Copy */}
            <div className="max-w-xl animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                How It Works
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a1f44] mb-6 leading-[1.1] tracking-tight">
                Find a Specialist in 3 Steps
              </h1>

              <p className="text-xl text-slate-600 mb-10 font-light leading-relaxed">
                From posting a job to getting it done—here is how CostaTrades
                makes home improvement stress-free.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  "Post your job once and let interested local professionals come to you.",
                  "Compare quotes, ratings and past work so you can choose with confidence.",
                  "Sit back while a verified specialist gets the job done.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="mt-1 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      {i + 1}
                    </div>
                    <p className="text-slate-600 text-lg group-hover:text-slate-900 transition-colors">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link href="/post-job">
                  <Button className="bg-[#E31E24] hover:bg-[#C41218] text-white px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold">
                    Post a Job Now
                  </Button>
                </Link>
                <p className="text-sm text-slate-500 max-w-[200px] leading-tight">
                  No fees for homeowners. No obligation to hire.
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="relative lg:h-[600px] flex items-center justify-center animate-scale-in delay-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-cyan-50/50 rounded-[3rem] rotate-3 transform scale-95 opacity-70"></div>

              <div className="relative w-full h-full max-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.pexels.com/photos/7415126/pexels-photo-7415126.jpeg"
                  alt="Happy family in their new home"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Testimonial Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                      <Image className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-800 font-medium text-lg leading-snug mb-2">
                        "I posted my job in minutes and had three quotes from
                        local pros by the afternoon."
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-slate-500 font-medium">
                          — Sarah, Marbella
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process (Core) */}
      <section className="relative py-24 bg-white">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1f44] mb-6 tracking-tight">
              How it works in 3 simple steps
            </h2>
            <p className="text-xl text-slate-600 font-light">
              Show, don't just tell. Here's exactly what happens when you use
              CostaTrades.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-12">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 -z-10"></div>

            {/* Step 1 */}
            <div className="relative group text-center">
              <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-blue-50 shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-blue-100 transition-all duration-300 relative z-10">
                <span className="text-4xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0a1f44]">
                Tell us what you need
              </h3>
              <p className="text-slate-600 leading-relaxed px-4">
                Describe your project in plain language, add optional photos and
                set your preferred timeline. It's free and takes less than 2
                minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group text-center">
              <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-blue-50 shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-blue-100 transition-all duration-300 relative z-10">
                <span className="text-4xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0a1f44]">
                Receive interest from locals
              </h3>
              <p className="text-slate-600 leading-relaxed px-4">
                Available specialists in your area review your job and send you
                quotes or request a quick visit if they need more details.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group text-center">
              <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-blue-50 shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-blue-100 transition-all duration-300 relative z-10">
                <span className="text-4xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0a1f44]">
                Choose the best fit
              </h3>
              <p className="text-slate-600 leading-relaxed px-4">
                Compare profiles, read real reviews and see past work. Hire the
                professional who suits your budget and gives you peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use CostaTrades? */}
      <section className="py-24 bg-slate-50 border-y border-slate-200/60">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1f44] mb-6 tracking-tight">
              Why use CostaTrades?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified professionals",
                desc: "We check IDs and key details so you don't have to, helping keep doorstep scams and time-wasters away.",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                icon: MapPin,
                title: "Local expertise",
                desc: "Professionals who actually know Costa del Sol homes—from terraces and pools to old town apartments.",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: CheckCircle,
                title: "Zero cost to you",
                desc: "CostaTrades is completely free for homeowners. You only pay the professional you choose.",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
              >
                <div
                  className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon
                    className={`w-8 h-8 ${item.color}`}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#0a1f44]">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1f44] mb-6 tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-xl text-slate-600 font-light">
              Straightforward answers so you know exactly what to expect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-blue-200 hover:shadow-md h-fit"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-[#0a1f44] pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={cn(
                    "px-6 text-slate-600 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out",
                    openFaq === index
                      ? "max-h-48 pb-6 opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0a1f44] text-white text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="container-custom max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            Ready to get started?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 font-light max-w-2xl mx-auto">
            Post your first job in minutes and start receiving quotes from
            trusted local professionals.
          </p>
          <Link href="/post-job">
            <Button className="bg-[#E31E24] hover:bg-[#C41218] text-white px-12 py-8 text-xl rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Post a Job Now
            </Button>
          </Link>
          <p className="mt-6 text-sm text-blue-300/60">
            Join thousands of happy homeowners on the Costa del Sol
          </p>
        </div>
      </section>
    </div>
  );
}
