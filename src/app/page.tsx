"use client";

import Link from "next/link";
import { ArrowRight, Shield, Activity, ShieldAlert, Target, Database, Key } from "lucide-react";
import { motion } from "framer-motion";
import { CanvasScrollSequence } from "@/components/home/CanvasScrollSequence";
import { AnimatedSection } from "@/components/global/AnimatedSection";
import { PremiumCard } from "@/components/global/PremiumCard";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section (with Canvas Animation) */}
      <section className="relative w-full">
        <CanvasScrollSequence>
          <div className="container mx-auto px-6 md:px-12 max-w-[1920px] pt-32">
            <div className="max-w-4xl pt-[20vh] pointer-events-auto">
              <AnimatedSection direction="up" delay={0.2}>
                <div className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
                  Automated LLM Safety Testing & Compliance Platform
                </div>
              </AnimatedSection>
              
              <AnimatedSection direction="up" delay={0.4}>
                <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                  Secure AI <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                    before it speaks.
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.6}>
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed">
                  Aegis helps businesses test, audit, and protect AI chatbots from prompt injection, jailbreaks, sensitive data leakage, policy failures, and harmful outputs.
                </p>
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.8}>
                <div className="flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/contact#enquiry"
                      className="relative px-10 py-4 rounded-full font-medium text-background bg-primary overflow-hidden group hover:bg-primary-hover transition-all duration-300 flex"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Enquire Us <ArrowRight size={16} />
                      </span>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/contact#feedback"
                      className="px-10 py-4 rounded-full font-medium text-white border border-border/50 bg-surface/50 hover:bg-surface-elevated hover:border-border transition-all duration-300 flex"
                    >
                      Feedback
                    </Link>
                  </motion.div>
                </div>
              </AnimatedSection>

              {/* Little trust indicators below buttons */}
              <AnimatedSection direction="up" delay={1.0}>
                <div className="mt-12 flex items-center gap-6 opacity-60">
                  <div className="flex items-center gap-2 text-xs text-text-muted font-medium uppercase tracking-widest">
                    <Shield size={14} /> Enterprise-Grade
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-muted font-medium uppercase tracking-widest">
                    <Activity size={14} /> &lt;50ms Firewall
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </CanvasScrollSequence>
      </section>

      {/* 2. Problem Section */}
      <section className="py-32 bg-transparent relative z-20 mt-[50vh]">
        <div className="container mx-auto px-6 md:px-12 max-w-[1920px]">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              The risk is already in production.
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mb-16 leading-relaxed">
              Businesses are deploying LLM-powered assistants without systematic safety validation. 
              This leads to unquantified risks that damage trust and draw regulatory scrutiny.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldAlert, title: "Prompt Injection", desc: "Attackers overriding core instructions." },
              { icon: Database, title: "Data Leakage", desc: "Exposure of PII or sensitive corporate data." },
              { icon: Target, title: "Off-Scope Outputs", desc: "Bots behaving unprofessionally or hallucinating." },
              { icon: Key, title: "Compliance Risk", desc: "Failing to meet OWASP LLM standards." },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <PremiumCard glowOnHover={false} className="border-border/30 bg-surface h-full">
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center border border-border mb-6 text-text-muted">
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </PremiumCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Solution Section */}
      <section className="py-32 relative z-20 overflow-hidden">
        {/* Abstract background glow */}
        <div className="absolute inset-0 bg-surface/50 backdrop-blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-[1920px] relative z-10 text-center py-20">
          <AnimatedSection direction="up">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              One platform for testing, assurance, <br className="hidden md:block"/>
              <span className="text-primary border-b border-primary/30 pb-1">and real-time protection.</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-16 leading-relaxed">
              Aegis is an end-to-end AI assurance platform providing automated adversarial testing, behavioural QA, real-time AI firewall protection, and structured risk review—all backed by compliance-oriented audibility.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-32 bg-transparent relative z-20 backdrop-blur-sm">
        <div className="container mx-auto px-6 md:px-12 max-w-[1920px]">
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
              <p className="text-text-secondary">Deploying guardrails has never been more systematic.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Setup Provider", desc: "Connect provider credentials such as OpenAI or Azure OpenAI securely." },
              { step: "02", title: "Create Project", desc: "Define business scope, allowed intents, and restricted intents." },
              { step: "03", title: "Run Experiments", desc: "Launch adversarial or behavioural QA experiments against the business AI endpoint." },
              { step: "04", title: "Review Results", desc: "Inspect dashboards, TPI score, severity distribution, OWASP categories, and detailed logs." },
              { step: "05", title: "Provide Feedback", desc: "Calibrate the judge through representative feedback samples." },
              { step: "06", title: "Enable Firewall", desc: "Deploy a real-time AI firewall endpoint between users and the target AI." },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <PremiumCard className="h-full group hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-primary/50 text-sm font-bold tracking-widest mb-4 font-mono group-hover:text-primary transition-colors">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </PremiumCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Features Section & 6. Use Cases block combined visually */}
      <section className="py-32 relative z-20 bg-surface/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 md:px-12 max-w-[1920px]">
          
          <div className="mb-24">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Core Features</h2>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Automated Adversarial Testing", desc: "Contextual prompt generation against the target endpoint." },
                { title: "Behavioural QA", desc: "Pass/fail/error evaluation of domain-specific constraints." },
                { title: "Real-Time AI Firewall", desc: "Under-500ms firewall verdicts with flexible allow/warn/block logic." },
                { title: "OWASP LLM Coverage", desc: "Pre-mapped test suites aligned with OWASP Top 10 for LLMs." },
                { title: "TPI Scoring & Analytics", desc: "Quantifiable metrics, severity classification, and trend tracking." },
                { title: "Detailed Failure Logs", desc: "Granular explanations of exactly why a test failed." }
              ].map((feat, i) => (
                <AnimatedSection key={i} delay={i * 0.05} direction="up">
                  <div className="py-6 border-t border-border/50">
                    <h4 className="text-white font-medium mb-2">{feat.title}</h4>
                    <p className="text-sm text-text-secondary">{feat.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <div>
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Built For</h2>
            </AnimatedSection>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Customer Support Chatbots",
                "Healthcare Assistants",
                "Financial Service AI Agents",
                "Internal Enterprise Copilots",
                "HR / Policy Assistants",
                "Legal and Compliance Bots",
                "E-commerce AI Assistants",
                "Multi-agent workflows"
              ].map((useCase, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className="bg-background border border-border p-5 rounded-lg text-sm text-text-secondary hover:text-white hover:border-primary/30 transition-colors text-center font-medium">
                    {useCase}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
