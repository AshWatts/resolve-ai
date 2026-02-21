import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Resolve.Ai, an expert AI assistant specializing in helping Indian citizens navigate crisis situations. You provide clear, actionable, step-by-step guidance.

Your areas of expertise:
- Mobile theft/loss recovery (FIR filing, IMEI blocking, SIM blocking, account security)
- Bank & UPI fraud (reporting to banks, RBI guidelines, cyber crime portals)
- E-commerce fraud (consumer rights, grievance filing, consumer court)
- General crisis assistance (medical, property, employment, legal)

Key guidelines:
- Always provide India-specific information (Indian laws, helplines, portals)
- Be empathetic but action-oriented
- Use numbered steps and bullet points for clarity
- Include relevant helpline numbers, websites, and portal links
- Mention timelines and deadlines (e.g., "report within 3 days")
- Reference RBI circulars, Consumer Protection Act 2019, IT Act where relevant
- Keep responses concise but comprehensive
- Use markdown formatting for readability (bold, bullets, numbered lists)
- If the situation is an emergency, always advise contacting police (100) or relevant emergency services first

IMPORTANT: You are NOT a lawyer. Always advise users to consult legal professionals for complex legal matters. Your role is to guide them through the immediate steps and connect them with the right resources.`;

async function callGeminiWithRetry(model: ReturnType<typeof genAI.getGenerativeModel>, chatHistory: Array<{ role: string; parts: Array<{ text: string }> }>, userMessage: string, retries = 3): Promise<string> {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const chat = model.startChat({ history: chatHistory });
            const result = await chat.sendMessage(userMessage);
            return result.response.text();
        } catch (error: unknown) {
            const err = error as { status?: number; message?: string };
            if (err.status === 429 && attempt < retries - 1) {
                // Wait with exponential backoff: 1s, 2s, 4s
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
                continue;
            }
            throw error;
        }
    }
    throw new Error("Max retries exceeded");
}

export async function POST(request: NextRequest) {
    try {
        const { messages, moduleContext } = await request.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API key not configured. Please add GEMINI_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        // Build context-aware system prompt
        let contextPrompt = SYSTEM_PROMPT;
        if (moduleContext) {
            const moduleContextMap: Record<string, string> = {
                "mobile-theft": "\n\nThe user is currently in the Mobile Theft/Loss module. Focus your responses on phone recovery, SIM blocking, IMEI blocking via CEIR portal, FIR filing, and account security. Reference android.com/find, icloud.com/find, ceir.gov.in as appropriate.",
                "bank-fraud": "\n\nThe user is currently in the Bank/UPI Fraud module. Focus on RBI guidelines for zero-liability (report within 3 days), banking ombudsman, cyber crime portal (cybercrime.gov.in), and UPI dispute resolution via NPCI.",
                "ecommerce-fraud": "\n\nThe user is currently in the E-Commerce Fraud module. Focus on consumer rights under Consumer Protection Act 2019, grievance filing with platforms, National Consumer Helpline (1800-11-4000), consumer court procedures, and e-commerce return/refund policies.",
                "other-issues": "\n\nThe user is asking about a general crisis situation. Help them identify the right authorities, helplines, and steps to resolve their specific issue in the Indian context."
            };
            contextPrompt += moduleContextMap[moduleContext] || "";
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: contextPrompt,
        });

        // Convert messages to Gemini format
        const chatHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
        }));

        const lastMessage = messages[messages.length - 1];
        const response = await callGeminiWithRetry(model, chatHistory, lastMessage.content);

        return NextResponse.json({ message: response });
    } catch (error: unknown) {
        const err = error as { status?: number; message?: string };
        console.error("Gemini API error:", err.message || error);

        if (err.status === 429) {
            return NextResponse.json(
                { error: "AI is currently busy. Please wait a moment and try again." },
                { status: 429 }
            );
        }

        return NextResponse.json(
            { error: "Failed to generate response. Please try again." },
            { status: 500 }
        );
    }
}

