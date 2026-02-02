# 🚀 Resolve.Ai

**AI-Powered Crisis Navigation Platform for India**

> From Panic to Plan in 2 Minutes

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)

## 🎯 Problem Statement

When Indians face a crisis—phone theft, bank fraud, or e-commerce scams—they're overwhelmed with scattered information. Resolve.Ai provides **step-by-step, priority-based action plans** tailored for Indian users, with direct links to official portals and helplines.

## ✨ Features

### 📱 Mobile Theft / Loss Module
- Remote lock & wipe guidance (Find My Device)
- SIM blocking with carrier-specific steps
- CEIR IMEI blocking (gov.in portal)
- e-FIR filing assistance
- UPI & banking security checklist

### 💳 UPI / Bank Fraud Module
- RBI Zero Liability rule explained
- 1930 Cyber Crime helpline integration
- Bank-specific complaint processes
- Banking Ombudsman escalation path
- Refund tracking guidance

### 📦 E-Commerce Fraud Module
- Platform-specific complaint guides (Amazon, Flipkart, etc.)
- National Consumer Helpline (14404)
- e-Daakhil consumer court filing
- Chargeback process for cards

### 🤖 AI Assistant (Other Issues)
- Gemini-powered chatbot for unique cases
- Handles medical, property, employment, and other crises
- Available as floating chat on all module pages

### 🌓 Dark/Light Mode
- System preference detection
- Persistent theme with localStorage
- Smooth transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + Custom Glassmorphism
- **AI**: Gemini API (integration ready)
- **State**: React Hooks + Context API

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/samardpatil19-rgb/resolve-ai.git

# Navigate to project
cd resolve-ai

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
resolve-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── mobile-theft/         # Mobile theft module
│   │   ├── bank-fraud/           # Bank fraud module
│   │   ├── ecommerce-fraud/      # E-commerce module
│   │   ├── other-issues/         # AI chatbot module
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Design system
│   ├── components/
│   │   ├── AIChatbot.tsx         # AI chat component
│   │   └── ThemeToggle.tsx       # Theme switcher
│   └── context/
│       └── ThemeContext.tsx      # Theme provider
├── public/
└── package.json
```

## 🎨 Design Highlights

- **Glassmorphism UI** with animated gradients
- **Priority-based steps** (Critical → Urgent → Important → Follow-up)
- **Interactive checklists** with progress tracking
- **Direct external links** to official Indian portals
- **Mobile-responsive** design

## 👥 Team

Built for Hackathon 2026

## 📄 License

MIT License - feel free to use and modify!

---

**Made with ❤️ for India**
