import { AnimatedSection } from "@/components/global/AnimatedSection";
import { PremiumCard } from "@/components/global/PremiumCard";
import { Shield, Users, GlobeLock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* 1. Mission / Vision Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,240,61,0.03)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 max-w-[1920px] relative z-10 text-center">
          <AnimatedSection direction="up">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              AI should be powerful. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">And provably safe.</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-12">
              As businesses adopt AI rapidly, safety, reliability, and policy alignment can no longer be optional. Aegis AI exists to help teams ship useful AI systems without exposing users, data, or trust to preventable failures.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. Why this matters section */}
      <section className="py-24 bg-surface border-y border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-8">Why AI Guardrails Matter Now</h2>
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>
                AI is being deployed faster than it is being secured. Unsafe outputs damage trust instantly. 
                Whether it's a customer support bot hallucinating a non-existent refund policy, or an internal 
                copilot leaking sensitive HR data, the risks are immediate and quantifiable.
              </p>
              <p>
                Enterprises need auditability and due diligence. Regulation and procurement increasingly require 
                evidence of controls. We believe that guardrails are not just a compliance checkbox—they are 
                becoming foundational infrastructure for the next generation of software.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. Founder Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1920px]">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-16 text-center">Our Leadership</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ujjwal Kumar Rai",
                role: "Co-Founder, CTO & Head of Growth & Marketing",
                initials: "UR",
                points: [
                  "Growth-driven operator combining marketing intelligence with product thinking.",
                  "Specializes in scaling user acquisition, engagement, and brand ecosystems.",
                  "Executes high-impact strategies across content, growth loops, and MVPs."
                ]
              },
              {
                name: "Akasha A Prasad",
                role: "Co-Founder, CEO & CFO",
                initials: "AP",
                points: [
                  "Systems thinker blending cybersecurity, architecture, and product strategy.",
                  "Builds scalable solutions with strong real-world problem-solving focus.",
                  "Rapid learner driving execution across tech and business domains."
                ]
              },
              {
                name: "Ranit Laha",
                role: "Co-Founder & Head of DevOps & Infrastructure",
                initials: "RL",
                points: [
                  "AI systems specialist focused on LLM architecture and scalable deployments.",
                  "Designs robust pipelines for model evaluation, safety, and optimization.",
                  "Leads development of AI red-teaming and guardrail validation systems."
                ]
              }
            ].map((founder, i) => (
              <AnimatedSection key={i} delay={i * 0.1} direction="up" className="flex">
                <PremiumCard className="pb-12 pt-12 flex-1 flex flex-col items-center">
                  <div className="w-24 h-24 bg-surface-elevated border border-border rounded-full flex items-center justify-center text-3xl font-bold text-text-muted mb-6 shadow-inner tracking-wider">
                    {founder.initials}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 text-center">{founder.name}</h3>
                  <div className="text-primary text-xs font-semibold uppercase tracking-widest mb-6 text-center h-8 px-4 flex items-center justify-center whitespace-normal">{founder.role}</div>
                  <ul className="text-sm text-text-secondary w-5/6 mx-auto space-y-3 text-left list-disc list-outside pl-4">
                    {founder.points.map((point, ptIdx) => (
                      <li key={ptIdx}>{point}</li>
                    ))}
                  </ul>
                </PremiumCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Founder Summary Section */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-text-secondary leading-relaxed italic border-l-2 border-primary/50 pl-6 text-left">
              "We built Aegis AI because we constantly saw engineering teams hesitating to deploy incredibly useful AI models purely out of fear. By providing a quantifiable, auditable safety layer, we aren't slowing down AI adoption—we're allowing enterprises to accelerate it with confidence."
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
