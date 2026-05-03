/**
 * @fileoverview Main Chatbot component for Matdan AI.
 */

import React, { Suspense } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from '../hooks/useChat';

/**
 * Chatbot component integrating header, messages, and input.
 * Uses a custom hook for state management.
 * @returns {React.ReactElement} The rendered Chatbot component.
 */
const ChatbotContent = () => {
  const {
    messages,
    input,
    setInput,
    isLoading,
    isExpanded,
    setIsExpanded,
    handleSend,
    isRateLimited,
    rateLimitMessage
  } = useChat();

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, setIsExpanded]);

  return (
    <section 
      className="section animate-fade-up" 
      style={{ animationDelay: '0.2s' }} 
      id="chat" 
      aria-labelledby="chat-heading"
    >
      <div className="section-header">
        <span className="section-label">Interactive Guide</span>
        <h2 id="chat-heading">Ask Matdan AI</h2>
      </div>
      
      {isExpanded && (
        <div 
          className="chatbot-backdrop" 
          onClick={() => setIsExpanded(false)} 
          aria-hidden="true" 
        />
      )}
      
      <div 
        className={`chatbot-container ${isExpanded ? 'expanded' : ''}`}
        role="region"
        aria-label="Chat interface"
      >
        <ChatHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        
        {rateLimitMessage && (
          <div className="rate-limit-warning" role="alert" aria-live="assertive">
            {rateLimitMessage}
          </div>
        )}

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
};

const Chatbot = React.memo(() => (
  <Suspense fallback={<div className="loading-fallback" aria-live="polite">Loading Matdan AI...</div>}>
    <ChatbotContent />
  </Suspense>
));

Chatbot.displayName = 'Chatbot';

export default Chatbot;
