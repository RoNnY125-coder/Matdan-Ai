/**
 * @fileoverview Messages container component for the Chatbot.
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({
  breaks: true,
  gfm: true
});

/**
 * Renders markdown text safely.
 * @param {string} text - The markdown text to render.
 * @returns {Object} An object with __html property.
 */
const renderMarkdown = (text) => {
  const rawMarkup = marked(text);
  const cleanMarkup = DOMPurify.sanitize(rawMarkup);
  return { __html: cleanMarkup };
};

/**
 * ChatMessages component displaying the chat history.
 * @param {Object} props
 * @param {Array} props.messages - List of message objects.
 * @param {boolean} props.isLoading - Whether the AI is currently generating a response.
 * @returns {React.ReactElement} The rendered ChatMessages component.
 */
const ChatMessages = React.memo(({ messages, isLoading }) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div 
      className="chat-messages" 
      ref={messagesContainerRef}
      role="log"
      aria-live="polite"
    >
      {messages.map((msg) => (
        <div key={msg.id} className={`message-row ${msg.sender}`}>
          <div className={`message-bubble ${msg.sender}`}>
            <div className="message-info">
              <div className="message-avatar" aria-hidden="true">
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
              <div className="message-avatar" aria-hidden="true">🏛️</div>
              <span className="message-author">Matdan AI</span>
            </div>
            <div className="typing-dots" aria-label="Matdan AI is typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

ChatMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

ChatMessages.displayName = 'ChatMessages';

export default ChatMessages;
