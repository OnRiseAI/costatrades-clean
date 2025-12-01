"use client";

import { Button } from "@/components/ui/button";
import {
  Search,
  MessageCircle,
  ChevronDown,
  Home,
  Briefcase,
  Scale,
  HelpCircle,
  Info,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "For Homeowners",
      icon: Home,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      questions: [
        {
          q: "Is CostaTrades free to use?",
          a: "Yes, CostaTrades is 100% free for homeowners. You can post jobs, receive quotes, and contact professionals without paying any fees.",
        },
        {
          q: "How do I know the professionals are reliable?",
          a: "We prioritize accountability. Every specialist has a public profile with verified reviews from real customers, ensuring transparency and trust.",
        },
        {
          q: "What areas do you cover?",
          a: "We cover the entire Costa del Sol, including Marbella, Estepona, Mijas, Fuengirola, Benalmadena, and Sotogrande.",
        },
        {
          q: "Can I get a quote without posting a job?",
          a: "Yes. You can browse our directory and contact tradespeople directly via phone or WhatsApp to request a quote.",
        },
        {
          q: "How do I leave a review?",
          a: "After a job is completed, you can leave a review on the tradesperson's profile. Your feedback helps maintain our high standards of quality and trust.",
        },
        {
          q: "What if I'm not satisfied with the work?",
          a: "We recommend first discussing the issue with the tradesperson. If unresolved, please contact our support team. While we don't directly manage jobs, we investigate all reports of poor service.",
        },
      ],
    },
    {
      title: "For Professionals",
      icon: Briefcase,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      questions: [
        {
          q: "Is it free to join CostaTrades?",
          a: "Yes, CostaTrades is completely free for professionals. There are no subscription fees, lead fees, or commissions on the jobs you secure.",
        },
        {
          q: "Do you take a commission on my earnings?",
          a: "No. You keep 100% of what you earn. We are a free directory designed to connect you with local homeowners.",
        },
        {
          q: "How do I get verified?",
          a: "Simply create your profile and complete the verification steps, which include confirming your identity and business details to build trust with clients.",
        },
        {
          q: "How do I get more leads?",
          a: "Complete your profile with a professional photo, detailed description of services, and photos of past work. Verified profiles with positive reviews also rank higher in search results.",
        },
        {
          q: "Can I list multiple services?",
          a: "Yes, you can select multiple trade categories that match your skills, such as plumbing, electrical work, and general maintenance, ensuring you appear in all relevant searches.",
        },
        {
          q: "Do I need to be a Spanish resident?",
          a: "You need to be legally allowed to work in Spain. We may ask for your NIE/NIF during the verification process to ensure compliance with local regulations.",
        },
      ],
    },
    {
      title: "Costs & Regulations",
      icon: Scale,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      questions: [
        {
          q: "How much does a plumber cost in Marbella?",
          a: "The average call-out fee for a plumber in Marbella is approximately €150, though this varies by urgency and location.",
        },
        {
          q: "Do I need a permit for renovation in Spain?",
          a: "Yes, most renovations require a 'Licencia de Obra' (Building Permit) from your local Town Hall (Ayuntamiento). Minor works need a 'Licencia de Obra Menor'.",
        },
        {
          q: "What is the average hourly rate for an electrician?",
          a: "Electricians on the Costa del Sol typically charge between €40 and €70 per hour, depending on the complexity of the work and urgency.",
        },
        {
          q: "Do I need an architect for a small extension?",
          a: "For structural changes or extensions, you generally need an architect ('Arquitecto') to prepare the project for the Town Hall building permit.",
        },
        {
          q: "What is IVA and do I have to pay it?",
          a: "IVA is the Spanish VAT. Standard rate is 21% for most goods and services. Renovation works may qualify for a reduced rate of 10% under specific conditions.",
        },
        {
          q: "How much does a painter charge per square meter?",
          a: "Painters typically charge between €8 and €15 per square meter for interior walls, including materials. Exterior painting may cost more depending on access and surface condition.",
        },
      ],
    },
    {
      title: "General & Account",
      icon: Info,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      questions: [
        {
          q: "How do I reset my password?",
          a: "You can reset your password by clicking 'Forgot Password' on the login page and following the email instructions sent to your registered address.",
        },
        {
          q: "Can I change my email address?",
          a: "Yes, you can update your email address and other personal details in your profile settings dashboard after logging in.",
        },
        {
          q: "Is my personal data safe?",
          a: "Absolutely. We use industry-standard encryption and strictly adhere to GDPR regulations to ensure your personal data is protected at all times.",
        },
        {
          q: "How do I delete my account?",
          a: "You can request account deletion from your profile settings or by contacting our support team. We will process your request in accordance with GDPR guidelines.",
        },
        {
          q: "Is there a mobile app?",
          a: "We are currently developing our mobile app. For now, our website is fully responsive and works perfectly on all mobile devices and tablets.",
        },
        {
          q: "How can I contact customer support?",
          a: "You can reach our support team via the 'Contact Us' page, email, or directly through WhatsApp for urgent inquiries. We aim to respond within 24 hours.",
        },
      ],
    },
  ];

  // Filter questions based on search
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((cat) =>
      cat.questions.map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.a,
        },
      })),
    ),
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEO
        title="Help Center | FAQs"
        description="Find answers about hiring vetted tradespeople, pricing, verification and using CostaTrades for homeowners and professionals on the Costa del Sol."
      />
      {/* Schema Markup */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

      {/* 1. Hero Section */}
      <section className="relative py-24 md:py-32 px-4 text-center overflow-hidden bg-[#0a1f44]">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f44] to-[#0d2550]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent"></div>
        </div>

        <div className="container-custom max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 animate-fade-in">
            <HelpCircle className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium tracking-wide uppercase text-blue-100">
              Help Center
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight animate-slide-up">
            How can we help you?
          </h1>
          <p
            className="text-xl md:text-2xl text-blue-100 mb-12 font-light max-w-2xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Find answers about hiring tradespeople, costs, and our verification
            process.
          </p>

          {/* Search Bar */}
          <div
            className="max-w-2xl mx-auto relative animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-2xl text-lg transition-all duration-300 hover:shadow-blue-900/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 2. The "AEO Answer Bank" */}
      <section className="py-24 -mt-10 relative z-20">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-white animate-fade-in"
                    style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                      <div
                        className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44]">
                        {category.title}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {category.questions.map((item, qIdx) => (
                        <details
                          key={qIdx}
                          className="group [&_summary::-webkit-details-marker]:hidden bg-slate-50 rounded-xl overflow-hidden transition-all duration-300 hover:bg-slate-100 open:bg-white open:shadow-md open:ring-1 open:ring-slate-200/50"
                        >
                          <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-slate-900 transition-colors focus:outline-none">
                            <h3 className="font-semibold text-lg text-[#0a1f44] leading-snug">
                              {item.q}
                            </h3>
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-open:bg-blue-50 group-open:border-blue-100 group-open:rotate-180">
                              <ChevronDown className="h-5 w-5 text-slate-400 group-open:text-blue-600" />
                            </div>
                          </summary>
                          <div className="px-5 pb-6 pt-2 leading-relaxed text-slate-600 text-lg border-t border-transparent group-open:border-slate-100">
                            <p>{item.a}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="md:col-span-2 text-center py-20 bg-white rounded-[2rem] shadow-sm">
                <p className="text-xl text-slate-500">
                  No answers found for "{searchQuery}"
                </p>
                <Button
                  variant="link"
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-blue-600 font-semibold"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. "Still have questions?" CTA */}
      <section className="py-24 bg-white text-center border-t border-slate-100">
        <div className="container-custom max-w-2xl">
          <div className="w-24 h-24 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 rotate-3 hover:rotate-6 transition-transform duration-300">
            <MessageCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold text-[#0a1f44] mb-6 tracking-tight">
            Still have questions?
          </h2>
          <p className="text-xl text-slate-600 mb-10 font-light leading-relaxed">
            Can't find what you're looking for? Our support team is here to help
            you via WhatsApp.
          </p>
          <a
            href="https://wa.me/34123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:-translate-y-1 transition-transform duration-300"
          >
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-7 text-xl rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all flex items-center gap-3">
              <MessageCircle className="w-6 h-6" />
              Chat with Support
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
