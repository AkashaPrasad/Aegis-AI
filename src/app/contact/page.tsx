"use client";

import { useRef, useState } from "react";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { PremiumCard } from "@/components/global/PremiumCard";
import { submitEnquiry, submitFeedback } from "./actions";

export default function ContactPage() {
  const [enquiryStatus, setEnquiryStatus] = useState<"idle" | "loading" | "success">("idle");
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "loading" | "success">("idle");
  
  const enquiryFormRef = useRef<HTMLFormElement>(null);
  const feedbackFormRef = useRef<HTMLFormElement>(null);

  async function handleEnquiry(formData: FormData) {
    setEnquiryStatus("loading");
    await submitEnquiry(formData);
    setEnquiryStatus("success");
    enquiryFormRef.current?.reset();
    setTimeout(() => setEnquiryStatus("idle"), 5000);
  }

  async function handleFeedback(formData: FormData) {
    setFeedbackStatus("loading");
    await submitFeedback(formData);
    setFeedbackStatus("success");
    feedbackFormRef.current?.reset();
    setTimeout(() => setFeedbackStatus("idle"), 5000);
  }

  return (
    <div className="w-full">
      {/* 1. Hero Intro */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1920px] text-center">
          <AnimatedSection direction="up">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Whether you need to secure a complex AI deployment, or just want to share your thoughts, we are here to listen.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-7xl pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* 2. Enquiry Form Section */}
          <section id="enquiry" className="scroll-mt-32">
            <AnimatedSection delay={0.1}>
              <PremiumCard glowOnHover={false} className="border-border">
                <h2 className="text-2xl font-bold mb-2">Talk to us about securing your AI.</h2>
                <p className="text-text-secondary mb-8 text-sm">Fill out the form below and our team will get back to you within 24 hours.</p>
                
                <form ref={enquiryFormRef} action={handleEnquiry} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Full Name</label>
                      <input required name="name" type="text" className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Company Name</label>
                      <input required name="company" type="text" className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Work Email</label>
                      <input required name="email" type="email" className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Phone Number</label>
                      <input name="phone" type="tel" className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Website URL</label>
                      <input name="website" type="url" className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Current AI Provider</label>
                      <select name="provider" className="w-full bg-background border border-border rounded px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                        <option value="openai">OpenAI</option>
                        <option value="azure">Azure OpenAI</option>
                        <option value="anthropic">Anthropic</option>
                        <option value="google">Google Gemini</option>
                        <option value="custom">Custom / Open Source</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted font-medium uppercase tracking-wider">What are you building?</label>
                    <input required name="building" type="text" className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Message</label>
                    <textarea required name="message" rows={4} className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"></textarea>
                  </div>

                  <button 
                    disabled={enquiryStatus === "loading"}
                    className="w-full py-3 mt-4 rounded font-medium text-background bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50"
                  >
                    {enquiryStatus === "loading" ? "Sending..." : "Reach Out"}
                  </button>
                  
                  {enquiryStatus === "success" && (
                    <p className="text-primary text-sm mt-2 text-center">Enquiry sent successfully!</p>
                  )}
                </form>
              </PremiumCard>
            </AnimatedSection>
          </section>

          {/* 3. Feedback Form Section */}
          <section id="feedback" className="scroll-mt-32">
            <AnimatedSection delay={0.2}>
              <PremiumCard glowOnHover={false} className="border-border">
                <h2 className="text-2xl font-bold mb-2">Share feedback</h2>
                <p className="text-text-secondary mb-8 text-sm">We are constantly improving. Let us know how we can do better.</p>
                
                <form ref={feedbackFormRef} action={handleFeedback} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Name</label>
                    <input required name="name" type="text" className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Email</label>
                    <input required name="email" type="email" className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-text-muted font-medium uppercase tracking-wider">Feedback Text</label>
                    <textarea required name="feedback" rows={6} className="w-full bg-background border border-border rounded px-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"></textarea>
                  </div>

                  <button 
                    disabled={feedbackStatus === "loading"}
                    className="w-full py-3 mt-4 rounded font-medium border border-border text-white bg-surface hover:bg-surface-elevated transition-colors disabled:opacity-50"
                  >
                    {feedbackStatus === "loading" ? "Sending..." : "Send Feedback"}
                  </button>
                  
                  {feedbackStatus === "success" && (
                    <p className="text-primary text-sm mt-2 text-center">Feedback sent successfully!</p>
                  )}
                </form>

                <div className="mt-12 pt-8 border-t border-border/50 text-center">
                  <p className="text-text-muted text-sm">
                    Prefer direct email? Reach us at <br/>
                    <a href="mailto:aegis.ai.redteam@gmail.com" className="text-white hover:text-primary transition-colors">aegis.ai.redteam@gmail.com</a>
                  </p>
                </div>
              </PremiumCard>
            </AnimatedSection>
          </section>

        </div>
      </div>
    </div>
  );
}
