const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithAI = async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        if (!req.body || !req.body.message) {
            console.error("Error: Message field is missing in request body");
            return res.status(400).json({ error: "Message is required" });
        }

        // ✅ Use the correct model name
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // ✅ Use correct request format
        const result = await model.generateContent({
            contents: [{ parts: [{ text: req.body.message }] }]
        });

        const response = result.response;
        
        // ✅ Ensure response is valid before accessing text
        if (!response || !response.candidates || response.candidates.length === 0) {
            throw new Error("No response received from Gemini API");
        }

        const replyText = response.candidates[0].content.parts[0].text;

        return res.json({ reply: replyText });

    } catch (error) {
        console.error("Error in chatWithAI:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { chatWithAI };
