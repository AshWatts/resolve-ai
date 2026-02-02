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
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[level]}`}>
            {labels[level]}
        </span>
    );
}

function RBILiabilityInfo() {
    return (
        <div className="glass-card p-6 mb-8 border-green-500/20 bg-green-500/5">
            <div className="flex items-start gap-4">
                <div className="text-3xl">⚖️</div>
                <div>
                    <h3 className="font-bold text-green-400 text-lg mb-1">RBI Zero Liability Protection</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        Under RBI guidelines, if you report unauthorized transactions <span className="text-white font-semibold">within 3 working days</span>,
                        your liability is <span className="text-green-400 font-bold">₹0 (zero)</span> for amounts debited.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                        <div className="bg-green-500/10 rounded-lg p-3">
                            <div className="font-bold text-green-400">Within 3 Days</div>
                            <div className="text-gray-400">₹0 Liability</div>
                        </div>
                        <div className="bg-orange-500/10 rounded-lg p-3">
                            <div className="font-bold text-orange-400">4-7 Days</div>
                            <div className="text-gray-400">Limited Liability</div>
                        </div>
                        <div className="bg-red-500/10 rounded-lg p-3">
                            <div className="font-bold text-red-400">After 7 Days</div>
                            <div className="text-gray-400">As per bank policy</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
                            <ul className="space-y-2">
                                {details.map((detail, index) => (<li key={index} className="flex items-start gap-2 text-sm text-gray-300"><span className="text-purple-400 mt-1">•</span><span>{detail}</span></li>))}
                            </ul>
                            {links && links.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {links.map((link, index) => (<a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-2 bg-purple-500/10 text-purple-400 rounded-lg text-sm hover:bg-purple-500/20">{link.text}<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FraudTypeSelector({ onSelect }: { onSelect: (type: string) => void }) {
    const [selected, setSelected] = useState<string | null>(null);
    const fraudTypes = [
        { id: "phishing", icon: "🎣", label: "Phishing/Vishing", desc: "Fake calls or messages" },
        { id: "qr", icon: "📱", label: "QR Code Scam", desc: "Scanned malicious QR" },
        { id: "sim", icon: "📲", label: "SIM Swap", desc: "SIM taken over" },
        { id: "upi", icon: "💸", label: "UPI Fraud", desc: "Unauthorized UPI payment" },
        { id: "card", icon: "💳", label: "Card Fraud", desc: "Card used without consent" },
        { id: "other", icon: "❓", label: "Other", desc: "Different type" },
    ];
    return (
        <div className="glass-card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-2">What type of fraud?</h2>
            <p className="text-gray-400 text-sm mb-6">This helps us customize your action plan</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {fraudTypes.map((type) => (
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

export default function BankFraudPage() {
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [, setFraudType] = useState<string | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const toggleStep = (stepNumber: number) => {
        const newCompleted = new Set(completedSteps);
        if (newCompleted.has(stepNumber)) { newCompleted.delete(stepNumber); } else { newCompleted.add(stepNumber); }
        setCompletedSteps(newCompleted);
    };
    const steps = [
        { stepNumber: 1, title: "Call Your Bank Immediately (24x7 Helpline)", description: "Report the fraud to your bank's dedicated fraud helpline right now.", priority: "critical" as const, details: ["SBI: 1800-111-211 | HDFC: 1800-267-6161", "ICICI: 1800-102-4242 | Axis: 1860-419-5555", "Note the complaint reference number", "Request immediate blocking of account/card"], links: [] },
        { stepNumber: 2, title: "Call 1930 - National Cyber Crime Helpline", description: "Report to the government's dedicated cyber fraud helpline within 24 hours.", priority: "critical" as const, details: ["1930 is the official cyber crime helpline", "Available 24x7 across India", "They can help freeze fraudulent transactions", "Get your complaint number"], links: [{ text: "Cyber Crime Portal", url: "https://cybercrime.gov.in" }] },
        { stepNumber: 3, title: "File Online Complaint at cybercrime.gov.in", description: "Submit a detailed written complaint on the national cyber crime portal.", priority: "critical" as const, details: ["Go to cybercrime.gov.in", "Select 'Financial Fraud' category", "Upload bank statement showing fraud", "Note your Acknowledgment Number"], links: [{ text: "Report Financial Fraud", url: "https://cybercrime.gov.in/Webform/Crime_OnlineFinancialFraud.aspx" }] },
        { stepNumber: 4, title: "Block UPI ID & Review Transactions", description: "Immediately block your UPI ID and check for other unauthorized transactions.", priority: "urgent" as const, details: ["GPay: Settings → UPI Settings → Deregister", "PhonePe: Profile → UPI Settings → Unlink", "Review last 7 days of transactions"], links: [{ text: "NPCI Dispute Process", url: "https://www.npci.org.in/what-we-do/upi/dispute-redressal-mechanism" }] },
        { stepNumber: 5, title: "Submit Written Complaint to Bank", description: "Send a formal written complaint to your bank's branch and grievance cell.", priority: "urgent" as const, details: ["Write to your home branch manager", "Include: Account number, transaction details", "Bank must respond within 30 days (RBI mandate)"], links: [] },
        { stepNumber: 6, title: "Change All Banking Credentials", description: "Update your net banking password, UPI PIN, and ATM PIN.", priority: "important" as const, details: ["Change net banking password immediately", "Change UPI PIN on all linked apps", "Set lower transaction limits temporarily"], links: [] },
        { stepNumber: 7, title: "Track Refund Status", description: "Follow up with bank on the refund as per RBI's TAT guidelines.", priority: "important" as const, details: ["Bank should acknowledge within 24 hours", "Shadow credit within 10 days for qualifying cases", "Escalate to nodal officer if no response"], links: [] },
        { stepNumber: 8, title: "Escalate to Banking Ombudsman (If Needed)", description: "If bank doesn't resolve in 30 days, escalate to RBI Banking Ombudsman.", priority: "normal" as const, details: ["Wait 30 days after bank complaint", "Visit cms.rbi.org.in", "Can claim up to ₹20 lakh compensation"], links: [{ text: "RBI CMS Portal", url: "https://cms.rbi.org.in" }] }
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
                        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6"><span className="text-2xl">💳</span><span className="text-sm text-gray-300">UPI / Bank Fraud Module</span></div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">UPI or Bank Fraud?</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Time is critical! Report within 3 days for zero liability protection.</p>
                    </div>
                    <RBILiabilityInfo />
                    <FraudTypeSelector onSelect={(type) => setFraudType(type)} />
                    <div className="glass-card p-4 mb-8">
                        <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-400">Progress</span><span className="text-sm font-medium text-white">{completedCount} of {totalSteps} completed</span></div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} /></div>
                    </div>
                    <div className="space-y-4">{steps.map((step) => (<StepCard key={step.stepNumber} {...step} isCompleted={completedSteps.has(step.stepNumber)} onToggle={() => toggleStep(step.stepNumber)} />))}</div>
                    <div className="mt-12 glass-card p-8 border-purple-500/20 bg-purple-500/5">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="text-5xl">⚡</div>
                            <div className="flex-grow text-center md:text-left"><h3 className="text-xl font-bold text-white mb-2">Let AI Handle the Paperwork</h3><p className="text-gray-400">Upgrade to Pro for AI-drafted bank complaint letters and automated follow-up reminders.</p></div>
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
                moduleContext="bank-fraud"
                welcomeMessage="Hi! I'm here to help with your UPI or bank fraud situation. If your case is unique or you need clarification on any step, describe your specific situation and I'll provide personalized guidance."
            />
        </div>
    );
}
