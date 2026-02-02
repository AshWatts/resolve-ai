"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

// Crisis Module Card Component
function CrisisCard({
  title,
  description,
  icon,
  iconClass,
  href,
  features,
  isComingSoon = false,
  delay = "delay-300"
}: {
  title: string;
  description: string;
  icon: string;
  iconClass: string;
  href: string;
  features: string[];
  isComingSoon?: boolean;
  delay?: string;
}) {
  return (
    <div className={`glass-card p-6 md:p-8 flex flex-col h-full animate-fade-slide-up ${delay} ${isComingSoon ? 'opacity-60' : ''}`}>
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl ${iconClass} flex items-center justify-center text-2xl mb-5`}>
        {icon}
      </div>

      {/* Title with Coming Soon badge */}
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
        {isComingSoon && <span className="coming-soon-badge">Coming Soon</span>}
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-5 leading-relaxed">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
            <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      {!isComingSoon ? (
        <Link href={href} className="btn-primary text-center w-full">
          Get Started →
        </Link>
      ) : (
        <button disabled className="btn-secondary w-full opacity-50 cursor-not-allowed">
          Notify Me
        </button>
      )}
    </div>
  );
}

// Glassmorphism Stats Card
function StatsSection() {
  const stats = [
    { value: "2 min", label: "Time to First Action", icon: "⚡" },
    { value: "24/7", label: "AI Assistance", icon: "🤖" },
    { value: "100%", label: "India-Specific", icon: "🇮🇳" },
    { value: "Free", label: "Core Features", icon: "✨" },
  ];

  return (
    <div className="stats-card animate-fade-slide-up delay-500">
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-3xl md:text-4xl font-bold gradient-text-static mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Trusted By Section (Optional - placeholder logos)
function TrustedBy() {
  return (
    <div className="animate-fade-slide-up delay-600">
      <p className="text-center text-gray-500 text-sm mb-6">Trusted by users across India</p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
        {["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"].map((city, i) => (
          <span key={i} className="text-gray-400 text-sm font-medium">{city}</span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Animated background */}
      <div className="gradient-bg" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl nav-blur border-b border-white/5">
        <div className="container-main flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 animate-fade-slide-down">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-primary">Resolve<span className="gradient-text-static">.Ai</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8 animate-fade-slide-down delay-100">
            <a href="#modules" className="text-gray-400 hover:text-white transition-colors text-sm">Modules</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How It Works</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
          </div>

          <div className="flex items-center gap-3 animate-fade-slide-down delay-200">
            <ThemeToggle />
            <button className="btn-secondary hidden md:block py-2 px-4 text-sm">Login</button>
            <button className="btn-primary py-2 px-4 text-sm">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="container-main text-center">
          {/* Crisis indicator badge */}
          <div className="badge-glass mb-8 animate-fade-slide-up">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-sm text-gray-300">Crisis? We&apos;ve got your back 24/7</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 animate-fade-slide-up delay-100">
            From <span className="gradient-text">Panic</span> to <span className="gradient-text">Plan</span>
            <br />
            <span className="text-gray-500">in 2 Minutes</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-slide-up delay-200">
            AI-powered crisis navigation for India. Phone stolen? Bank fraud? E-commerce scam?
            Get step-by-step guidance with priority-based action plans.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-slide-up delay-300">
            <Link href="#modules" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              <span>🚨</span> I Need Help Now
            </Link>
            <button className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </button>
          </div>

          {/* Stats Card */}
          <StatsSection />

          {/* Trusted By */}
          <div className="mt-12">
            <TrustedBy />
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-10">
        <div className="scroll-indicator text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-glow" />

      {/* Modules Section */}
      <section id="modules" className="py-20 md:py-32">
        <div className="container-main">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-slide-up">
              Choose Your <span className="gradient-text-static">Crisis Module</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto animate-fade-slide-up delay-100">
              Select the situation you&apos;re facing. Our AI will guide you through every step with
              India-specific helplines, portals, and procedures.
            </p>
          </div>

          {/* Main modules grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <CrisisCard
              title="Mobile Theft / Loss"
              description="Phone stolen or lost? Block SIM, IMEI, secure bank accounts, and file e-FIR in the right order."
              icon="📱"
              iconClass="icon-mobile"
              href="/mobile-theft"
              delay="delay-200"
              features={[
                "Remote lock & wipe guide",
                "CEIR IMEI blocking process",
                "State-wise e-FIR portals",
                "UPI & banking security checklist",
                "Social media lockdown steps"
              ]}
            />

            <CrisisCard
              title="UPI / Bank Fraud"
              description="Victim of a scam? Report to your bank within the RBI deadline and maximize your refund chances."
              icon="💳"
              iconClass="icon-bank"
              href="/bank-fraud"
              delay="delay-300"
              features={[
                "3-day zero liability rule guide",
                "1930 Cyber Crime helpline",
                "Bank-specific complaint process",
                "Banking Ombudsman escalation",
                "Refund tracking assistance"
              ]}
            />

            <CrisisCard
              title="E-Commerce Fraud"
              description="Empty box? Fake product? Non-delivery? Navigate platform complaints and consumer courts."
              icon="📦"
              iconClass="icon-ecommerce"
              href="/ecommerce-fraud"
              delay="delay-400"
              features={[
                "Platform-specific complaint guides",
                "National Consumer Helpline (14404)",
                "E-Daakhil consumer forum filing",
                "Chargeback process for cards",
                "Evidence collection checklist"
              ]}
            />

            <CrisisCard
              title="Other Issues"
              description="Don't see your problem listed? Our AI assistant can help you navigate any crisis situation."
              icon="🤖"
              iconClass="icon-ai"
              href="/other-issues"
              delay="delay-500"
              features={[
                "AI-powered crisis guidance",
                "Medical emergencies",
                "Property & legal disputes",
                "Employment issues",
                "Custom step-by-step plans"
              ]}
            />
          </div>

          {/* Coming Soon modules */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-400 mb-2">More Modules Coming Soon</h3>
            <p className="text-gray-500 text-sm">We&apos;re expanding to cover more crisis situations for India</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🏥", title: "Insurance Claims", desc: "Health, vehicle, life claims" },
              { icon: "🚗", title: "Accidents / RTO", desc: "FIR, claim, license issues" },
              { icon: "✈️", title: "Flight Issues", desc: "Delays, cancellations, refunds" },
              { icon: "📡", title: "Telecom Issues", desc: "Network, billing disputes" },
            ].map((item, index) => (
              <div key={index} className="glass-card p-5 opacity-50 hover:opacity-70 transition-opacity">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="coming-soon-badge">Soon</span>
                </div>
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-glow" />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How <span className="gradient-text-static">Resolve.Ai</span> Works
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Three simple steps to navigate any crisis with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Select Your Crisis",
                description: "Choose the module that matches your situation. Our AI understands the urgency.",
                icon: "🎯"
              },
              {
                step: "02",
                title: "Enter Time Details",
                description: "Tell us when it happened. We'll prioritize actions based on critical deadlines.",
                icon: "⏱️"
              },
              {
                step: "03",
                title: "Follow Your Plan",
                description: "Get a prioritized checklist with direct links, helplines, and templates ready to use.",
                icon: "✅"
              }
            ].map((item, index) => (
              <div key={index} className="glass-card p-8 text-center relative group hover-lift">
                <div className="text-5xl mb-6 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>{item.icon}</div>
                <div className="text-6xl font-bold text-white/5 absolute top-4 right-6 group-hover:text-white/10 transition-colors">{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-glow" />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple <span className="gradient-text-static">Pricing</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Core features are free forever. Upgrade only when you need automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="glass-card p-8 hover-lift">
              <div className="text-lg font-medium text-gray-400 mb-2">Free</div>
              <div className="text-5xl font-bold text-white mb-1">₹0</div>
              <div className="text-gray-500 mb-8">Forever free</div>

              <ul className="space-y-4 mb-8">
                {[
                  "Complete step-by-step guides",
                  "Time-based priority checklists",
                  "All government portal links",
                  "Helpline numbers & SMS codes",
                  "Template letters & emails",
                  "Progress tracking"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="btn-secondary w-full">Get Started Free</button>
            </div>

            {/* Premium Tier */}
            <div className="glass-card-premium p-8 hover-lift relative">
              <div className="absolute top-6 right-6">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  RECOMMENDED
                </span>
              </div>

              <div className="text-lg font-medium text-purple-400 mb-2">Pro</div>
              <div className="text-5xl font-bold text-white mb-1">₹199<span className="text-lg font-normal text-gray-400">/crisis</span></div>
              <div className="text-gray-500 mb-8">Pay only when you need it</div>

              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Free",
                  "AI auto-fills complaint forms",
                  "Personalized email drafts",
                  "Pre-filled PDF documents",
                  "Smart follow-up reminders",
                  "Priority support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="btn-primary w-full">Upgrade to Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-lg font-bold text-white">Resolve<span className="gradient-text-static">.Ai</span></span>
            </div>

            <div className="text-gray-500 text-sm">
              Made with ❤️ for India | © 2025 Resolve.Ai
            </div>

            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
