"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface AIChatbotProps {
    moduleContext?: string; // e.g., "mobile-theft", "bank-fraud", etc.
    placeholder?: string;
    welcomeMessage?: string;
}

export function AIChatbot({
    moduleContext,
    placeholder = "Describe your issue in detail...",
    welcomeMessage = "Hi! I'm your AI assistant. Tell me about your situation and I'll help you find the best solution."
}: AIChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: welcomeMessage,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const simulateAIResponse = (userMessage: string) => {
        // Simulate AI thinking
        setIsTyping(true);

        setTimeout(() => {
            const responses = [
                "I understand your concern. Based on what you've described, here are some steps you can take:\n\n1. **Document everything** - Save all relevant screenshots and communications\n2. **Contact the relevant authority** - This could be the police, consumer forum, or regulatory body\n3. **Follow up regularly** - Keep track of your complaint and follow up every few days\n\nWould you like more specific guidance on any of these steps?",
                "That's a challenging situation. Let me help you navigate this:\n\n• First, make sure you have all your documentation in order\n• Consider reaching out to the appropriate helpline for immediate assistance\n• You may also want to file a formal complaint online\n\nCan you tell me more about the specific circumstances?",
                "I can help with that! Here's what I recommend:\n\n1. **Immediate Action**: Secure any affected accounts or assets\n2. **Report**: File a complaint with the relevant authority\n3. **Document**: Keep records of all communications\n4. **Follow Up**: Check status regularly and escalate if needed\n\nWhat aspect would you like me to elaborate on?"
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const aiMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: moduleContext
                    ? `[${moduleContext.toUpperCase()} Context]\n\n${randomResponse}`
                    : randomResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        simulateAIResponse(input.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                    : "glass-card"
                                }`}
                        >
                            {message.role === "assistant" && (
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                        <span className="text-white text-xs">AI</span>
                                    </div>
                                    <span className="text-xs text-gray-400">Resolve.Ai Assistant</span>
                                </div>
                            )}
                            <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                {message.content}
                            </div>
                            <div className={`text-xs mt-2 ${message.role === "user" ? "text-white/60" : "text-gray-500"}`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="glass-card rounded-2xl px-4 py-3">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                    <span className="text-white text-xs">AI</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/5 p-4">
                <form onSubmit={handleSubmit} className="flex gap-3">
                    <div className="flex-1 relative">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            rows={1}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none text-sm"
                            style={{ minHeight: "48px", maxHeight: "120px" }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="btn-primary px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </form>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by Gemini AI • Your data is secure and private
                </p>
            </div>
        </div>
    );
}

// Floating chat button for module pages
export function FloatingChatButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-110 flex items-center justify-center z-40"
            title="Chat with AI Assistant"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        </button>
    );
}

// Chat modal/drawer for module pages
export function ChatDrawer({ isOpen, onClose, moduleContext, welcomeMessage }: {
    isOpen: boolean;
    onClose: () => void;
    moduleContext?: string;
    welcomeMessage?: string;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-full sm:w-[480px] h-[70vh] sm:h-[600px] sm:rounded-2xl overflow-hidden glass-card border border-white/10 animate-fade-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">AI</span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">AI Assistant</h3>
                            <p className="text-xs text-gray-400">Powered by Gemini</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Chat Content */}
                <div className="h-[calc(100%-72px)]">
                    <AIChatbot
                        moduleContext={moduleContext}
                        welcomeMessage={welcomeMessage}
                    />
                </div>
            </div>
        </div>
    );
}
