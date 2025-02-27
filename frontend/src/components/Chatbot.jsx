import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot } from 'lucide-react';
import { askQuestion } from '../api';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [problemUrl, setProblemUrl] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text, isUser) => {
    setMessages((prev) => [
      ...prev,
      { text, isUser, timestamp: new Date() },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !problemUrl.trim()) return;

    addMessage(input, true);
    setIsTyping(true);

    try {
      addMessage('Thinking...', false);
      const { response } = await askQuestion(problemUrl, input);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: response, isUser: false, timestamp: new Date() },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: 'Error connecting to assistant', isUser: false, timestamp: new Date() },
      ]);
    }

    setIsTyping(false);
    setInput('');
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="header">
        <h3>DSA Chat Assistant</h3>
      </div>

      {/* Problem URL Input */}
      <input
        type="text"
        value={problemUrl}
        onChange={(e) => setProblemUrl(e.target.value)}
        placeholder="🔗 Enter problem URL..."
        className="url-input"
      />

      {/* Chat Messages */}
      <div className="chat-area">
        {messages.map(({ text, isUser, timestamp }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`message ${isUser ? 'user' : 'bot'}`}
          >
            {isUser ? <User size={22} className="icon" /> : <Bot size={22} className="icon" />}
            <div className="message-text">
              {text}
              <span className="timestamp">{new Date(timestamp).toLocaleTimeString()}</span>
            </div>
          </motion.div>
        ))}
        {isTyping && <div className="typing-indicator">Assistant is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="input-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="💬 Type your question..."
          className="text-input"
          disabled={!problemUrl.trim()}
        />
        <button type="submit" className="send-button" disabled={!input.trim() || !problemUrl.trim()}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
