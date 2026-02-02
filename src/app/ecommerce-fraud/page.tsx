"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingChatButton, ChatDrawer } from "@/components/AIChatbot";

function PriorityBadge({ level }: { level: "critical" | "urgent" | "important" | "normal" }) {
    const colors = {
        critical: "bg-red-500/20 text-red-400 border-red-500/30",
        urgent: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        important: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        normal: "bg-green-500/20 text-green-400 border-green-500/30"
    };
    const labels = {
        critical: "🔴 Critical (0-24 hrs)",
        urgent: "🟠 Urgent (1-3 days)",
        important: "🟡 Important (Week 1)",
        normal: "🟢 Follow-up"
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[level]}`}>{labels[level]}</span>;
}

function StepCard({ stepNumber, title, description, priority, details, links, isCompleted, onToggle }: {
    stepNumber: number; title: string; description: string; priority: "critical" | "urgent" | "important" | "normal";
    details: string[]; links?: { text: string; url: string; }[]; isCompleted: boolean; onToggle: () => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={`glass-card p-6 transition-all ${isCompleted ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-4">
                <button onClick={onToggle} className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-1 ${isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-600 hover:border-gray-400'}`}>
                    {isCompleted && <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                </button>
                <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-gray-500 text-sm font-medium">Step {stepNumber}</span>
                        <PriorityBadge level={priority} />
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${isCompleted ? 'line-through text-gray-500' : 'text-white'}`}>{title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{description}</p>
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-purple-400 text-sm font-medium flex items-center gap-1 hover:text-purple-300">
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                        <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isExpanded && (
                        <div className="mt-4 space-y-4 animate-fade-in">
                            <ul className="space-y-2">{details.map((detail, index) => (<li key={index} className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400 mt-1">•</span><span>{detail}</span></li>))}</ul>
                            {links && links.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">{links.map((link, index) => (<a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-2 bg-purple-500/10 text-purple-400 rounded-lg text-sm hover:bg-purple-500/20">{link.text}<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>))}</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function IssueTypeSelector({ onSelect }: { onSelect: (type: string) => void }) {
    const [selected, setSelected] = useState<string | null>(null);
    const issueTypes = [
        { id: "empty", icon: "📦", label: "Empty Box", desc: "Received empty package" },
        { id: "wrong", icon: "🔄", label: "Wrong Item", desc: "Different product delivered" },
        { id: "fake", icon: "🚫", label: "Fake Product", desc: "Counterfeit/duplicate item" },
        { id: "nondelivery", icon: "❌", label: "Non-Delivery", desc: "Marked delivered but didn't receive" },
        { id: "norefund", icon: "💸", label: "Refund Not Received", desc: "Returned but no refund" },
        { id: "fakesite", icon: "🕸️", label: "Fake Website", desc: "Paid on fraudulent site" },
    ];
    return (
        <div className="glass-card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-2">What type of issue?</h2>
            <p className="text-gray-400 text-sm mb-6">This helps us customize your action plan</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {issueTypes.map((type) => (
                    <button key={type.id} onClick={() => { setSelected(type.id); onSelect(type.id); }} className={`p-4 rounded-xl border-2 transition-all text-left ${selected === type.id ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-gray-600'}`}>
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="font-semibold text-white text-sm">{type.label}</div>
                        <div className="text-xs text-gray-400">{type.desc}</div>
                    </button>
                ))}
            </div>
        </div>
    );
}

function PlatformSelector({ onSelect }: { onSelect: (platform: string) => void }) {
    const [selected, setSelected] = useState<string | null>(null);
    const platforms = [{ id: "amazon", name: "Amazon" }, { id: "flipkart", name: "Flipkart" }, { id: "meesho", name: "Meesho" }, { id: "myntra", name: "Myntra" }, { id: "other", name: "Other" }];
    return (
        <div className="glass-card p-6 md:p-8 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Which platform?</h2>
            <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (<button key={platform.id} onClick={() => { setSelected(platform.id); onSelect(platform.id); }} className={`px-4 py-2 rounded-lg border-2 font-medium text-sm ${selected === platform.id ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-gray-700 text-gray-400 hover:border-gray-600'}`}>{platform.name}</button>))}
            </div>
        </div>
    );
}

export default function EcommerceFraudPage() {
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [, setIssueType] = useState<string | null>(null);
    const [, setPlatform] = useState<string | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const toggleStep = (stepNumber: number) => {
        const newCompleted = new Set(completedSteps);
        if (newCompleted.has(stepNumber)) { newCompleted.delete(stepNumber); } else { newCompleted.add(stepNumber); }
        setCompletedSteps(newCompleted);
    };
    const steps = [
        { stepNumber: 1, title: "Document Everything Immediately", description: "Collect evidence BEFORE contacting the platform - they can modify listings.", priority: "critical" as const, details: ["Screenshot the product listing page", "Take photos of the received item", "Photograph the packaging including weight sticker", "Save chat history with seller if any"], links: [] },
        { stepNumber: 2, title: "Raise Complaint on Platform", description: "Use the official complaint process within the platform first.", priority: "critical" as const, details: ["Amazon: Help → Orders → Select Order → Problem with order", "Flipkart: Help Center → Order Issues → Raise Request", "Be specific: Mention order ID, issue, and expected resolution"], links: [{ text: "Amazon Help", url: "https://www.amazon.in/gp/help/contact-us" }, { text: "Flipkart Help", url: "https://www.flipkart.com/helpcentre" }] },
        { stepNumber: 3, title: "Request Chargeback (For Card Payments)", description: "Dispute the charge with your bank if you paid by card.", priority: "urgent" as const, details: ["Call your credit/debit card issuing bank", "Request 'Chargeback' for the transaction", "Valid reasons: 'Goods not as described' or 'Not received'"], links: [] },
        { stepNumber: 4, title: "Call National Consumer Helpline - 14404", description: "Free government helpline that escalates to companies directly.", priority: "urgent" as const, details: ["Call 1800-11-4000 or 14404 (toll-free)", "Or WhatsApp 'Hi' to 8800001915", "Get Docket Number for tracking", "Company must respond within 15 days"], links: [{ text: "NCH Portal", url: "https://consumerhelpline.gov.in" }] },
        { stepNumber: 5, title: "Escalate via Social Media", description: "Public pressure often gets faster response than regular channels.", priority: "important" as const, details: ["Tweet at @AmazonHelp, @flipabortsupport", "Include order ID (mask middle digits)", "Attach photos of the issue", "Tag with #ConsumerRights"], links: [{ text: "Amazon Help Twitter", url: "https://twitter.com/AmazonHelp" }] },
        { stepNumber: 6, title: "File on e-Daakhil (Consumer Forum Online)", description: "Official online consumer court for claims up to ₹2 Crore.", priority: "important" as const, details: ["Visit edaakhil.nic.in", "Filing fee: ₹100-500 based on claim amount", "Hearing can be online", "Cases typically resolved in 60-90 days"], links: [{ text: "e-Daakhil Portal", url: "https://edaakhil.nic.in" }] },
        { stepNumber: 7, title: "File Cyber Crime (For Fake Website Fraud)", description: "If you were scammed by a fake/lookalike website, report as cyber crime.", priority: "important" as const, details: ["Visit cybercrime.gov.in → Report Other Cyber Crime", "Or call 1930 helpline", "Select 'Online Financial Fraud' category"], links: [{ text: "Cyber Crime Portal", url: "https://cybercrime.gov.in" }] },
        { stepNumber: 8, title: "Send Legal Notice (For Large Amounts)", description: "A legal notice often gets attention when other methods fail.", priority: "normal" as const, details: ["Consider for claims above ₹10,000", "Can be sent via registered post (no lawyer mandatory)", "Many companies settle after receiving legal notice"], links: [] }
    ];
    const completedCount = completedSteps.size;
    const totalSteps = steps.length;
    const progressPercent = (completedCount / totalSteps) * 100;
    return (
        <div className="min-h-screen">
            <div className="gradient-bg" />
            <nav className="fixed top-0 left-0 right-0 z-50 nav-blur backdrop-blur-lg border-b border-white/5">
                <div className="container-main flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center"><span className="text-white font-bold text-sm">R</span></div>
                        <span className="text-xl font-bold text-primary">Resolve<span className="gradient-text">.Ai</span></span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to Modules
                        </Link>
                    </div>
                </div>
            </nav>
            <main className="pt-24 md:pt-32 pb-20">
                <div className="container-main max-w-4xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6"><span className="text-2xl">📦</span><span className="text-sm text-gray-300">E-Commerce Fraud Module</span></div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">E-Commerce Problem?</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Wrong item, empty box, or no delivery? Get your money back with this step-by-step guide.</p>
                    </div>
                    <IssueTypeSelector onSelect={(type) => setIssueType(type)} />
                    <PlatformSelector onSelect={(p) => setPlatform(p)} />
                    <div className="glass-card p-4 mb-8">
                        <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-400">Progress</span><span className="text-sm font-medium text-white">{completedCount} of {totalSteps} completed</span></div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} /></div>
                    </div>
                    <div className="space-y-4">{steps.map((step) => (<StepCard key={step.stepNumber} {...step} isCompleted={completedSteps.has(step.stepNumber)} onToggle={() => toggleStep(step.stepNumber)} />))}</div>
                    <div className="mt-12 glass-card p-8 border-purple-500/20 bg-purple-500/5">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="text-5xl">⚡</div>
                            <div className="flex-grow text-center md:text-left"><h3 className="text-xl font-bold text-white mb-2">Let AI Draft Your Complaints</h3><p className="text-gray-400">Upgrade to Pro for auto-drafted complaint letters and e-Daakhil filing assistance.</p></div>
                            <button className="btn-primary whitespace-nowrap">Upgrade to Pro - ₹199</button>
                        </div>
                    </div>
                </div>
            </main>

            {/* AI Chat */}
            <FloatingChatButton onClick={() => setIsChatOpen(true)} />
            <ChatDrawer
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                moduleContext="ecommerce-fraud"
                welcomeMessage="Hi! I'm here to help with your e-commerce issue. If you're dealing with a unique situation not covered by the steps above, describe it here and I'll provide personalized guidance."
            />
        </div>
    );
}
