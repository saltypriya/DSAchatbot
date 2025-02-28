# DSA Chat Assistant 🤖

An AI-powered tutoring system for Data Structures & Algorithms problem-solving, integrated with Google's Gemini AI to provide guided learning experiences.

## Features ✨

- 🧠 AI-guided problem solving with Gemini integration
- 🔗 Context-aware discussions based on problem URLs
- 💬 Interactive Socratic dialogue interface
- ⏱️ Real-time response streaming
- 📊 Structured learning progression tracking
- 🛡️ Input sanitization and AI response validation

## Setup Instructions 🛠️

### Prerequisites

- Node.js v18+
- Google Gemini API key
- npm v9+

### Installation

```bash
# Clone repository
git clone https://github.com/saltypriya/DSAchatbot.git
cd DSAchatbot

# Backend setup
cd backend
npm install
cp .env  # Add your Gemini API key

# Frontend setup
cd ../frontend
npm install

# Start both servers (in separate terminals)
# Backend:
cd ../backend && node server.js
# Frontend:
cd ../frontend && npm run dev
```
