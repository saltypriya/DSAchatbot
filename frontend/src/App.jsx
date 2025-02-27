import React, { useState } from "react";
import ChatBox from "./components/Chatbot.jsx";

export default function App() {
  return (
    <div className="container">
      <h2 className="text-center mt-4">Teaching Assistant AI</h2>
      <ChatBox />
    </div>
  );
}
