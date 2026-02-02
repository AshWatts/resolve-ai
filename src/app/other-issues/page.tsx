"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AIChatbot } from "@/components/AIChatbot";

const quickPrompts = [
    { icon: "🏥", label: "Medical Emergency", prompt: "I need help with a medical emergency situation" },
    { icon: "🏠", label: "Property Dispute", prompt: "I have a property or real estate dispute" },
    { icon: "💼", label: "Employment Issue", prompt: "I'm facing an employment or workplace issue" },
    { icon: "🎓", label: "Education Related", prompt: "I need help with an education-related problem" },
    { icon: "✈️", label: "Travel Issue", prompt: "I have a travel or transportation problem" },
    { icon: "📄", label: "Document/ID Issue", prompt: "I need help with documents or ID cards" },
];

export default function OtherIssuesPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="gradient-bg" />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 nav-blur backdrop-blur-lg border-b border-white/5">
                <div className="container-main flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">R</span>
                        </div>
                        <span className="text-xl font-bold text-primary">Resolve<span className="gradient-text">.Ai</span></span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Modules
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 pt-20 flex flex-col">
                <div className="container-main max-w-4xl flex-1 flex flex-col py-6">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
                            <span className="text-2xl">🤖</span>
                            <span className="text-sm text-gray-300">AI-Powered Assistance</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                            Other Issues? <span className="gradient-text">Ask AI</span>
                        </h1>
                        <p className="text-gray-400 text-sm max-w-xl mx-auto">
                            Describe any crisis situation and our AI assistant will guide you with actionable steps.
                        </p>
                    </div>

                    {/* Quick Prompts */}
                    <div className="glass-card p-4 mb-4">
                        <p className="text-xs text-gray-400 mb-3">Quick topics:</p>
                        <div className="flex flex-wrap gap-2">
                            {quickPrompts.map((prompt) => (
                                <button
                                    key={prompt.label}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 hover:border-purple-500/30 transition-all"
                                >
                                    <span>{prompt.icon}</span>
                                    <span>{prompt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chat Interface */}
                    <div className="flex-1 glass-card overflow-hidden min-h-[400px]">
                        <AIChatbot
                            welcomeMessage="Hi! I'm your AI crisis assistant. I can help you navigate various challenging situations that may not fit into our main categories.

Whether it's a medical emergency, property dispute, employment issue, or any other crisis - describe your situation, and I'll provide step-by-step guidance on how to resolve it.

What can I help you with today?"
                            placeholder="Describe your situation... (e.g., 'My landlord is refusing to return my security deposit')"
                        />
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                        <p className="text-xs text-orange-400/80 text-center">
                            <strong>Disclaimer:</strong> AI assistance is for guidance only. For emergencies, contact relevant authorities immediately.
                            Always verify advice with qualified professionals.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
