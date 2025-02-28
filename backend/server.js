const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const cors = require('cors');
const { createPrompt } = require('../backend/controllers/prompts'); // Import the prompt generator

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest", // or "gemini-1.0-pro-latest"
    apiVersion: "v1beta" 
});

// API Endpoint
app.post('/api/ask', async (req, res) => {
  try {
    const { problemUrl, question } = req.body;
    
    if (!problemUrl || !question) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Use the imported prompt generator
    const prompt = createPrompt(problemUrl, question);

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    
    res.json({ response });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Error connecting to AI assistant',
      details: error.message
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});