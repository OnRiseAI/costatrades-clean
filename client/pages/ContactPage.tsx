"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SEO } from "@/components/SEO";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SEO
        title="Contact CostaTrades"
        description="Need help? Contact our support team in Marbella. We are here to assist homeowners and professionals 7 days a week with your account or project."
      />

      {/* Hero Section */}
      <section className="relative bg-[#0a1f44] text-white py-20 md:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        </div>

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-100">
              We're here to help
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight animate-fade-in-up">
            Get in touch with our team
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            Whether you have a question about features, pricing, or need
            support, we're ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-12 -mt-16 relative z-20 px-4">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Email Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-blue-900/5 border border-gray-100 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0a1f44] transition-colors duration-300">
                <Mail className="w-7 h-7 text-[#0a1f44] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-2">
                Email Support
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                For general inquiries and support questions. We usually respond
                within 24 hours.
              </p>
              <a
                href="mailto:hi@costatrades.com"
                className="text-[#0a1f44] font-semibold hover:text-blue-600 transition-colors flex items-center gap-2 group/link"
              >
                hi@costatrades.com
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-blue-900/5 border border-gray-100 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0a1f44] transition-colors duration-300">
                <Phone className="w-7 h-7 text-[#0a1f44] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-2">
                Phone Support
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Speak directly with our team. Available Mon-Fri from 9am to 6pm
                CET.
              </p>
              <a
                href="tel:+34604288426"
                className="text-[#0a1f44] font-semibold hover:text-blue-600 transition-colors flex items-center gap-2 group/link"
              >
                +34 604 288 426
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl shadow-blue-900/5 border border-green-100 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">
                  <Clock className="w-3 h-3" /> Fastest
                </span>
              </div>
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <MessageCircle className="w-7 h-7 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-2">
                WhatsApp
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Chat with us instantly for quick questions and immediate
                assistance.
              </p>
              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 rounded-xl h-12 font-semibold"
              >
                <a
                  href="https://wa.me/34604288426"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Chat
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom pb-20 md:pb-32 px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a1f44] mb-3">
                  Send us a message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-semibold">
                    Subject
                  </Label>
                  <div className="relative">
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all"
                      required
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="partnership">
                        Partnership Opportunities
                      </option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="min-h-[150px] resize-none bg-gray-50 border-gray-200 focus:bg-white rounded-xl p-4 transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0a1f44] hover:bg-[#0a1f44]/90 text-white h-14 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* FAQ Teaser */}
            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1f44] mb-3">
                Have a quick question?
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Check our Frequently Asked Questions to find answers to common
                questions about payments, account management, and more.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full bg-white border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800 h-12 rounded-xl font-semibold"
              >
                <Link href="/about">Visit FAQ Page</Link>
              </Button>
            </div>

            {/* Office Info */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0a1f44] mb-6">
                Our Offices
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 text-gray-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Marbella HQ
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Ave de las Cumbres, Elviria Business Center
                      <br />
                      Office 4-6, 29604 Marbella
                      <br />
                      Malaga, Spain
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 text-gray-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      London Office
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      72 Shelton Street
                      <br />
                      Covent Garden, WC2H 9JQ
                      <br />
                      London, United Kingdom
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
