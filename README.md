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
Architecture 

DSAchatbot
├── backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Business logic & prompts
│   ├── routes/          # API endpoints
│   └── server.js        # Express server
└── frontend
    ├── public/          # Static assets
    └── src/
        ├── components/  # React components
        ├── styles/      # CSS modules
        └── api.jsx      # API service layer


Key Components

1. Prompt Engineering: controllers/prompts.js uses structured templates

2. AI Integration: Gemini API handler in config/gemini.js

3. State Management: React hooks for conversation flow

4. Security: Input sanitization and rate limiting

Usage Guide 🚀
- Enter Problem URL

- Paste a LeetCode/HackerRank problem link

Example: https://leetcode.com/problems/two-sum/

- Ask Your Question

-Type specific queries about:

 1 Algorithm approaches

 2 Time complexity analysis

 3 Code structure questions

 4 Optimization strategies

 AI Interaction Flow

User Question → Prompt Engineering → Gemini API → Response Validation → Formatted Output

UI Features

💬 Real-time chat interface

⚡ Quick response suggestions

📜 Conversation history

⚠️ Input validation indicators

Gemini AI Integration 🧠
Architecture Flow

sequenceDiagram
    Frontend->>Backend: POST /api/ask {problemUrl, question}
    Backend->>Gemini: Structured Prompt
    Gemini->>Backend: Raw Response
    Backend->>Frontend: Validated & Formatted Response

Prompt Engineering
// controllers/prompts.js
const createPrompt = (problemUrl, userQuestion) => {
  return `You are an expert DSA mentor...`;
}

Contextual Prompts: Maintains conversation history

Response Constraints: Enforces 3-sentence maximum

Learning Scaffolding: Progressive hint system

Contributing 🤝
Fork the repository

Create feature branch: git checkout -b feature/your-feature

Commit changes: git commit -m 'Add some feature'

Push to branch: git push origin feature/your-feature

Open a Pull Request
