# 🗳️ Matdan AI — India's Election Guide

> **An interactive, AI-powered civic education platform that makes India's election process simple, accessible, and engaging for every citizen.**

![Matdan AI](https://img.shields.io/badge/Matdan-AI%20Powered-FF6B1A?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjwvc3ZnPg==)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203.3-F55036?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [AI & Data](#-ai--data)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🇮🇳 About

**Matdan** (Hindi: मतदान — meaning *"the act of voting"*) is a civic education web app built to demystify India's complex election process for first-time voters, students, journalists, and curious citizens.

India conducts the **world's largest democratic exercise** — 968 million+ registered voters, 7 phases, 543 seats, and a process that spans 44+ days. Yet most citizens don't fully understand how it works.

Matdan fixes that with an **agentic AI chatbot** trained on comprehensive, up-to-date Indian election data — covering voter registration, EVMs, the Model Code of Conduct, government formation, and everything in between.

> Built for a hackathon. Designed for democracy.

---

## ✨ Features

- 🤖 **AI Chatbot** — Ask anything about India's election process in plain language
- 📅 **Interactive Timeline** — Step-by-step visual walkthrough of the full election cycle
- 🗂️ **Phase Cards** — Tap any phase to deep-dive with the AI
- ⚡ **Quick Chips** — One-tap questions for common topics
- 📊 **Live Stats Bar** — Key 2024 election numbers at a glance
- 📱 **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop
- 🎨 **Minimalist Dark UI** — Clean saffron/navy palette with smooth animations
- 🔒 **Non-partisan** — Factual, neutral, and safe for all audiences

---

## 🚀 Live Demo

> 🔗 **[matdan.vercel.app](https://matdan.vercel.app)** *(update with your deployed URL)*

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Plain CSS (CSS Variables, animations) |
| AI Model | LLaMA 3.3 70B via Groq API |
| Fonts | Fraunces (serif) + DM Sans |
| Routing | React Router v6 |
| Deployment | Vercel / Netlify |

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A free [Groq API key](https://console.groq.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/matdan.git
cd matdan

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your Groq API key to .env (see Environment Variables below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
matdan/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Nav bar with logo + links
│   │   ├── Hero.jsx            # Landing hero section
│   │   ├── StatsBar.jsx        # 2024 election stats strip
│   │   ├── QuickChips.jsx      # One-tap question chips
│   │   ├── Chatbot.jsx         # AI chat interface (Groq)
│   │   ├── Timeline.jsx        # Interactive election timeline
│   │   ├── PhaseCards.jsx      # Clickable phase grid
│   │   └── Footer.jsx          # Footer with links
│   ├── data/
│   │   └── electionData.js     # AI system prompt + election knowledge base
│   ├── App.jsx                 # Root component + routing
│   ├── main.jsx                # Vite entry point
│   └── index.css               # Global styles + CSS variables
├── .env                        # API keys (never commit this)
├── .env.example                # Safe template to share
├── .gitignore
├── index.html
├── vite.config.js
└── package.json
```



---

## 🧠 AI & Data

The chatbot is powered by **LLaMA 3.3 70B** running on Groq's ultra-fast inference API.

The AI is grounded with a comprehensive system prompt (`src/data/electionData.js`) covering:

- ✅ Election Commission of India (ECI) structure & powers
- ✅ Lok Sabha, Rajya Sabha, State Assembly structure
- ✅ Voter eligibility & registration (Form 6, EPIC card)
- ✅ Candidate eligibility & nomination process
- ✅ All 8 steps of the election process
- ✅ Model Code of Conduct (MCC) rules
- ✅ EVM & VVPAT technology explained
- ✅ 2024 Lok Sabha complete data (968M voters, 7 phases, results)
- ✅ 12 valid voter ID types
- ✅ Full glossary of election terms

The AI is strictly **non-partisan** — it only answers questions about the election process and factual data, never political opinions.

---

## 🗺️ Roadmap

- [ ] Multilingual support (Hindi, Tamil, Bengali, Telugu)
- [ ] State-wise election explorer
- [ ] Voter registration status checker (ECI API)
- [ ] Constituency finder by pincode
- [ ] Election quiz / civic knowledge test
- [ ] PWA support for offline access
- [ ] Voice input for chatbot

---

## 🤝 Contributing

Contributions are welcome! Here's how:

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
# Open a Pull Request
```

Please keep all contributions **non-partisan and factual.**

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🙏 Acknowledgements

- [Election Commission of India](https://eci.gov.in) — official election data
- [Groq](https://groq.com) — fast LLM inference
- [voters.eci.gov.in](https://voters.eci.gov.in) — voter registration portal
- Built with ❤️ for India's democracy

---

<div align="center">
  <strong>मतदान करें। जागरूक रहें।</strong><br/>
  <em>Vote. Stay Informed.</em><br/><br/>
  Made for 🇮🇳 · Powered by AI · Built at Hackathon 2024
</div>
