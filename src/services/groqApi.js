/**
 * @fileoverview API service for communicating with Groq and Gemini (fallback).
 */

import { SYSTEM_PROMPT } from '../data/electionData';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Validates the presence and basic format of the API key.
 * @param {string} key - The API key to validate.
 * @param {string} name - The name of the key (for error messaging).
 * @returns {boolean} True if valid, false otherwise.
 */
const validateApiKey = (key, name) => {
  if (!key || typeof key !== 'string' || key.trim() === '') {
    console.error(`⚠️ ${name} missing or invalid in environment variables.`);
    return false;
  }
  return true;
};

/**
 * Formats the conversation history for Groq.
 * @param {Array<{sender: string, text: string}>} history - The chat history.
 * @returns {Array<{role: string, content: string}>} Formatted messages array.
 */
const formatMessagesForGroq = (history) => {
  const messages = [{ role: "system", content: SYSTEM_PROMPT }];
  
  // We skip the first message if it's the welcome message, but since history
  // passed from useChat might already be sliced, let's assume history contains
  // actual messages to send. The caller will pass the sliced history.
  history.forEach(msg => {
    messages.push({
      role: msg.sender === 'ai' ? 'assistant' : 'user',
      content: msg.text
    });
  });

  return messages;
};

/**
 * Fallback to Gemini if Groq fails.
 * @param {Array<{sender: string, text: string}>} history - The chat history.
 * @returns {Promise<string>} The AI response.
 */
const fallbackToGemini = async (history) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!validateApiKey(apiKey, 'VITE_GEMINI_API_KEY')) {
    throw new Error('Gemini API key is invalid or missing.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMPT });

  // Format history for Gemini
  // Gemini expects history in { role: "user" | "model", parts: [{ text: "..." }] }
  const geminiHistory = [];
  const previousMessages = history.slice(0, -1);
  for (const msg of previousMessages) {
    if (geminiHistory.length === 0 && msg.sender === 'ai') continue;
    geminiHistory.push({
      role: msg.sender === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    });
  }

  const lastUserMessage = history[history.length - 1]?.text || "";

  const chat = model.startChat({
    history: geminiHistory,
  });

  const result = await chat.sendMessage(lastUserMessage);
  return result.response.text();
};

/**
 * Sends a message to the AI, using Groq by default and Gemini as a fallback.
 * @param {Array<{sender: string, text: string}>} history - The chat history including the new user message.
 * @returns {Promise<string>} The AI response text.
 */
export const sendToAI = async (history) => {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (!validateApiKey(API_KEY, 'VITE_GROQ_API_KEY')) {
    console.warn("Attempting to use Gemini fallback due to missing Groq API key.");
    try {
      return await fallbackToGemini(history);
    } catch {
      return "⚠️ VITE_GROQ_API_KEY missing, and Gemini fallback also failed.";
    }
  }

  try {
    const formattedMessages = formatMessagesForGroq(history);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 512,
        messages: formattedMessages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Groq API Error ${response.status}: ${data?.error?.message ?? JSON.stringify(data)}`);
    }

    const text = data?.choices?.[0]?.message?.content;

    if (!text || text.trim() === "") {
      throw new Error("Groq returned empty content.");
    }

    return text;

  } catch (err) {
    console.error("Groq fetch error:", err);
    console.warn("Attempting to use Gemini fallback...");
    
    try {
      return await fallbackToGemini(history);
    } catch (fallbackErr) {
      console.error("Gemini fallback error:", fallbackErr);
      return `⚠️ Network error: Both Groq and Gemini APIs failed. (${err.message})`;
    }
  }
};
