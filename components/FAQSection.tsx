"use client";

import { ChevronDown } from "lucide-react";

export const faqData = [
  {
    question: "How are tradespeople verified?",
    answer:
      "We rely on a strong community-driven verification system. Professionals are rated and reviewed by real homeowners like you. We also verify their identity and encourage them to upload insurance and license documents for transparency.",
  },
  {
    question: "Can I request quotes in English?",
    answer:
      "Absolutely. We highlight language proficiency on every profile. You can filter specifically for English-speaking professionals to ensure clear communication throughout your project.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We cover the entire Costa del Sol region, from Sotogrande to Nerja, including major hubs like Marbella, Estepona, Mijas, Fuengirola, Benalmadena, Torremolinos, and Malaga City.",
  },
  {
    question: "Is this service free for homeowners?",
    answer:
      "Yes, CostaTrades is 100% free for homeowners. You can search, post jobs, and request quotes without any cost. We are supported by the professionals who use our platform to find work.",
  },
  {
    question: "Do I need a license for renovations?",
    answer:
      "Yes, most renovations in Spain require a license. Minor works ('Obra Menor') often need a simple declaration, while major structural changes ('Obra Mayor') require a full project license. Always check with your chosen professional.",
  },
  {
    question: "How do I pay the tradesperson?",
    answer:
      "You pay the tradesperson directly. CostaTrades does not handle payments or take commissions from your project fees. We recommend agreeing on payment terms in writing before work begins.",
  },
];

export function FAQSection() {
  return (
    <div className="bg-slate-50 py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Everything you need to know about hiring on CostaTrades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqData.map((faq, index) => (
            <details
              key={index}
              className="group border border-slate-200 rounded-xl bg-white open:shadow-md transition-all duration-200 h-fit"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-[#0a1f44] list-none select-none text-lg">
                {faq.question}
                <ChevronDown className="w-5 h-5 text-blue-600 transition-transform duration-200 group-open:rotate-180 flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
