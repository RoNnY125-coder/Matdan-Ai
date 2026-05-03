/**
 * @fileoverview Custom hook for managing chatbot state and logic.
 */

import { useState, useCallback } from 'react';
import DOMPurify from 'dompurify';
import { sendToAI } from '../services/groqApi';

/**
 * Hook to manage chat state, history, rate limiting, and sending messages.
 * @returns {Object} Chat state and handler functions.
 */
export const useChat = () => {
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
  
  // Rate limiting state: store timestamps of recent user messages
  const [messageTimestamps, setMessageTimestamps] = useState([]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Keep only timestamps within the last minute
    const recentTimestamps = messageTimestamps.filter(ts => ts > oneMinuteAgo);
    
    if (recentTimestamps.length >= 10) {
      return { limited: true, count: recentTimestamps.length };
    }
    
    return { limited: false, recentTimestamps };
  }, [messageTimestamps]);

  const handleSend = useCallback(async (text = input) => {
    const rawMessage = text || input;
    
    if (!rawMessage.trim() || isLoading) return;

    const { limited, recentTimestamps } = checkRateLimit();

    if (limited) {
      setIsRateLimited(true);
      setRateLimitMessage('You are sending messages too fast. Please wait a moment.');
      setTimeout(() => {
        setIsRateLimited(false);
        setRateLimitMessage('');
      }, 5000); // clear UI message after 5 seconds
      return;
    }

    // Input sanitization and limiting
    const sanitizedInput = DOMPurify.sanitize(rawMessage.trim()).slice(0, 500);
    setInput('');
    
    // GA4 Tracking
    if (window.gtag) {
      window.gtag('event', 'chat_message_sent', { message_length: sanitizedInput.length });
    }

    // Update timestamps
    setMessageTimestamps([...(recentTimestamps || []), Date.now()]);

    const newUserMessage = { id: Date.now() + Math.random(), sender: 'user', text: sanitizedInput };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Build history for API (trim to last 10 messages to save tokens)
      // We skip the welcome message by slicing appropriately or just sending the last 10 actual exchanges
      // Let's take the last 10 messages total (user + ai)
      const currentMessages = [...messages, newUserMessage];
      const historyToSend = currentMessages.slice(-10);

      const reply = await sendToAI(historyToSend);
      
      setMessages(prev => [
        ...prev,
        { id: Date.now() + Math.random(), sender: 'ai', text: reply }
      ]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + Math.random(), sender: 'ai', text: "⚠️ Could not reach the AI. Please try again later." }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, checkRateLimit]);

  return {
    messages,
    input,
    setInput,
    isLoading,
    isExpanded,
    setIsExpanded,
    handleSend,
    isRateLimited,
    rateLimitMessage
  };
};
