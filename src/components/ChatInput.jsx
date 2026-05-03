/**
 * @fileoverview Input area component for the Chatbot.
 */

import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Send } from 'lucide-react';
import QuickChips from './QuickChips';

/**
 * ChatInput component providing the text input and send functionality.
 * @param {Object} props
 * @param {string} props.input - Current input text.
 * @param {Function} props.setInput - Function to update input text.
 * @param {boolean} props.isLoading - Whether the AI is loading.
 * @param {Function} props.handleSend - Function to send the message.
 * @param {Function} props.setIsExpanded - Function to expand the chat.
 * @param {boolean} props.showQuickChips - Whether to show quick prompt chips.
 * @returns {React.ReactElement} The rendered ChatInput component.
 */
const ChatInput = React.memo(({ 
  input, 
  setInput, 
  isLoading, 
  handleSend, 
  setIsExpanded, 
  showQuickChips,
  isRateLimited
}) => {
  // Debounce input handling with 300ms delay
  const timeoutRef = useRef(null);

  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setInput(val);
    }, 300);
    // Alternatively, if they just mean debounce state update, we can update immediately
    // but the prompt asked to "Debounce input handling with a 300ms delay"
    // To not break typing, we could use local state and debounce the prop update
  }, [setInput]);

  // Use local state for immediate visual feedback while debouncing
  const [localInput, setLocalInput] = React.useState(input);

  const onLocalChange = useCallback((e) => {
    setLocalInput(e.target.value);
    handleInputChange(e);
  }, [handleInputChange]);

  // Sync local input if prop is cleared
  React.useEffect(() => {
    setLocalInput(input);
  }, [input]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isRateLimited && localInput.trim()) {
        handleSend(localInput);
      }
    }
  }, [handleSend, isRateLimited, localInput]);

  return (
    <div className="chat-input-area">
      {showQuickChips && <QuickChips onSelect={handleSend} />}
      
      <div className="input-wrapper">
        <input
          type="text"
          value={localInput}
          onFocus={() => setIsExpanded(true)}
          onChange={onLocalChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about elections, voter registration..."
          disabled={isLoading}
          aria-label="Ask a question about elections"
        />
        <button 
          className="btn-send" 
          onClick={() => handleSend(localInput)}
          disabled={!localInput.trim() || isLoading || isRateLimited}
          aria-label="Send message"
          aria-disabled={isLoading || isRateLimited ? "true" : "false"}
        >
          <Send size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

ChatInput.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleSend: PropTypes.func.isRequired,
  setIsExpanded: PropTypes.func.isRequired,
  showQuickChips: PropTypes.bool.isRequired,
  isRateLimited: PropTypes.bool.isRequired,
};

ChatInput.displayName = 'ChatInput';

export default ChatInput;
