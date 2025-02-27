const express = require("express");
const { generateResponse } = require("../controllers/assistantController");
const { createPrompt } = require("../controllers/prompts");

const router = express.Router();

router.post("/ask", async (req, res) => {
  const { problemUrl, question } = req.body;
  
  const prompt = createPrompt(problemUrl, question);
  const response = await generateResponse(prompt);
  
  res.json({ response });
});

module.exports = router;