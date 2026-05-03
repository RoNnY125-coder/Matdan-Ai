import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Maximize2 } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import QuickChips from './QuickChips';
import { SYSTEM_PROMPT } from '../data/electionData';

marked.setOptions({
  breaks: true,
  gfm: true
});

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
console.log("API KEY loaded:", API_KEY ? "YES" : "MISSING");

const sendToAI = async (userMessage) => {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  console.log("Key loaded:", API_KEY ? "YES" : "NO");

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
    console.log("Groq full response:", JSON.stringify(data));

    if (!response.ok) {
      return `⚠️ API Error ${response.status}: ${data?.error?.message ?? JSON.stringify(data)}`;
    }

    const text = data?.choices?.[0]?.message?.content;
    console.log("Extracted text:", text);

    if (!text || text.trim() === "") {
      return "⚠️ Groq returned empty content. Check console for full response.";
    }

    return text;

  } catch (err) {
    console.error("Fetch error:", err);
    return `⚠️ Network error: ${err.message}`;
  }
};

export default function Chatbot() {
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
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInput('');

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const historyString = messages
        .slice(1)
        .map(m => `${m.sender === 'ai' ? 'Matdan AI' : 'User'}: ${m.text}`)
        .join('\n\n');
        
      const fullPromptContext = historyString 
        ? `${historyString}\n\nUser: ${userMessage}` 
        : `User: ${userMessage}`;

      const reply = await sendToAI(fullPromptContext);
      
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'ai', text: reply }
      ]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { id: Date.now(), sender: 'ai', text: "⚠️ Could not reach the AI. Check your API key in .env or your network." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMarkdown = (text) => {
    const rawMarkup = marked(text);
    const cleanMarkup = DOMPurify.sanitize(rawMarkup);
    return { __html: cleanMarkup };
  };

  return (
    <section className="section animate-fade-up" style={{ animationDelay: '0.2s' }} id="chat">
      <div className="section-header">
        <span className="section-label">Interactive Guide</span>
        <h2>Ask Matdan AI</h2>
      </div>
      
      {isExpanded && <div className="chatbot-backdrop" onClick={() => setIsExpanded(false)} />}
      <div className={`chatbot-container ${isExpanded ? 'expanded' : ''}`}>
        <div className="chat-header">
          <div className="header-left">
            {isExpanded && (
              <button className="btn-back" onClick={() => setIsExpanded(false)}>
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="chat-title">
            <span>🏛️</span>
            Matdan AI
          </div>

          <div className="header-right">
            {!isExpanded && (
              <button className="btn-icon" onClick={() => setIsExpanded(true)} title="Expand Chat">
                <Maximize2 size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="chat-messages" ref={messagesContainerRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.sender}`}>
              <div className={`message-bubble ${msg.sender}`}>
                <div className="message-info">
                  <div className="message-avatar">
                    {msg.sender === 'ai' ? '🏛️' : 'U'}
                  </div>
                  <span className="message-author">
                    {msg.sender === 'ai' ? 'Matdan AI' : 'You'}
                  </span>
                </div>
                {msg.sender === 'ai' ? (
                   <div 
                     className="markdown-body" 
                     dangerouslySetInnerHTML={renderMarkdown(msg.text)} 
                   />
                ) : (
                  <div>{msg.text}</div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message-row ai">
              <div className="message-bubble ai loading">
                <div className="message-info">
                  <div className="message-avatar">🏛️</div>
                  <span className="message-author">Matdan AI</span>
                </div>
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          {messages.length === 1 && <QuickChips onSelect={handleSend} />}
          
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onFocus={() => setIsExpanded(true)}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about elections, voter registration..."
              disabled={isLoading}
            />
            <button 
              className="btn-send" 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
