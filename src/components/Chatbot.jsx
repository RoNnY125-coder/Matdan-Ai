/**
 * @fileoverview Main Chatbot component for Matdan AI.
 */

import React, { useState, useCallback } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { SYSTEM_PROMPT } from '../data/electionData';

// API call function is defined outside to prevent recreation
const sendToAI = async (userMessage) => {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (!API_KEY) {
    return "⚠️ VITE_GROQ_API_KEY missing in .env file.";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 512,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return `⚠️ API Error ${response.status}: ${data?.error?.message ?? JSON.stringify(data)}`;
    }

    const text = data?.choices?.[0]?.message?.content;

    if (!text || text.trim() === "") {
      return "⚠️ Groq returned empty content. Check console for full response.";
    }

    return text;

  } catch (err) {
    console.error("Fetch error:", err);
    return `⚠️ Network error: ${err.message}`;
  }
};

/**
 * Chatbot component integrating header, messages, and input.
 * @returns {React.ReactElement} The rendered Chatbot component.
 */
const Chatbot = React.memo(() => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Namaskar! 🙏 I am **Matdan AI**, your expert guide to India's Election Process. I can help you understand how elections work, voter registration, or answer questions about the Election Commission of India. What would you like to explore today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleSend = useCallback(async (text = input) => {
    const rawMessage = text || input;
    
    // Validate that message is not empty or whitespace
    if (!rawMessage.trim() || isLoading || isRateLimited) return;

    // Input sanitization: limit to 500 characters
    const sanitized = rawMessage.trim().slice(0, 500);
    setInput('');

    setMessages(prev => [...prev, { id: Date.now() + Math.random(), sender: 'user', text: sanitized }]);
    setIsLoading(true);
    
    // Rate limiting: disable send button for 2 seconds
    setIsRateLimited(true);
    setTimeout(() => {
      setIsRateLimited(false);
    }, 2000);

    try {
      const historyString = messages
        .slice(1)
        .map(m => `${m.sender === 'ai' ? 'Matdan AI' : 'User'}: ${m.text}`)
        .join('\n\n');
        
      const fullPromptContext = historyString 
        ? `${historyString}\n\nUser: ${sanitized}` 
        : `User: ${sanitized}`;

      const reply = await sendToAI(fullPromptContext);
      
      setMessages(prev => [
        ...prev,
        { id: Date.now() + Math.random(), sender: 'ai', text: reply }
      ]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + Math.random(), sender: 'ai', text: "⚠️ Could not reach the AI. Check your API key or network." }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, isRateLimited, messages]);

  return (
    <section className="section animate-fade-up" style={{ animationDelay: '0.2s' }} id="chat" aria-labelledby="chat-heading">
      <div className="section-header">
        <span className="section-label">Interactive Guide</span>
        <h2 id="chat-heading">Ask Matdan AI</h2>
      </div>
      
      {isExpanded && <div className="chatbot-backdrop" onClick={() => setIsExpanded(false)} aria-hidden="true" />}
      <div className={`chatbot-container ${isExpanded ? 'expanded' : ''}`}>
        <ChatHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput 
          input={input} 
          setInput={setInput} 
          isLoading={isLoading} 
          handleSend={handleSend}
          setIsExpanded={setIsExpanded}
          showQuickChips={messages.length === 1}
          isRateLimited={isRateLimited}
        />
      </div>
    </section>
  );
});

Chatbot.displayName = 'Chatbot';

export default Chatbot;
