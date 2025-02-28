import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, User, Bot, Link } from "lucide-react"; 
import { askQuestion } from "../api";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [problemUrl, setProblemUrl] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (text, isUser) => {
    setMessages((prev) => [...prev, { text, isUser, timestamp: new Date() }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !problemUrl.trim()) return;

    addMessage(input, true);
    setIsTyping(true);

    try {
      addMessage("AI Assistant is thinking...", false);
      const { response } = await askQuestion(problemUrl, input);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: response, isUser: false, timestamp: new Date() },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "Error connecting to assistant", isUser: false, timestamp: new Date() },
      ]);
    }

    setIsTyping(false);
    setInput("");
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <motion.div className="header">
          <h3>DSA Chat Assistant</h3>
        </motion.div>

        {/* URL Input Field */}
        <motion.div className="url-container">
          <Link size={22} className="url-icon" />
          <input
            type="text"
            value={problemUrl}
            onChange={(e) => setProblemUrl(e.target.value)}
            placeholder="🔗 Enter problem URL..."
            className="url-input"
          />
        </motion.div>

        {/* Chat Messages */}
        <div className="chat-area">
          {messages.map(({ text, isUser, timestamp }, i) => (
            <motion.div key={i} className={`message ${isUser ? "user" : "bot"}`}>
              {isUser ? <User size={22} className="icon" /> : <Bot size={22} className="icon" />}
              <div className="message-content">
                <span className="message-text">{text}</span>
                <span className="timestamp">
                  {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </motion.div>
          ))}
          {isTyping && <div className="typing-indicator">AI Assistant is thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="input-form">
          <motion.input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="💬 Type your question..."
            className="text-input"
            disabled={!problemUrl.trim()}
          />
          {!isTyping && (
            <motion.button type="submit" className="send-button" disabled={!input.trim() || !problemUrl.trim()}>
              <Send size={20} />
            </motion.button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
