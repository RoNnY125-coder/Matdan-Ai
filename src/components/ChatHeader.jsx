/**
 * @fileoverview Header component for the Chatbot.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, Maximize2 } from 'lucide-react';

/**
 * ChatHeader component with controls for expanding/collapsing the chat.
 * @param {Object} props
 * @param {boolean} props.isExpanded - Whether the chat is currently expanded.
 * @param {Function} props.setIsExpanded - Function to toggle expand state.
 * @returns {React.ReactElement} The rendered ChatHeader component.
 */
const ChatHeader = React.memo(({ isExpanded, setIsExpanded }) => {
  return (
    <div className="chat-header">
      <div className="header-left">
        {isExpanded && (
          <button 
            className="btn-back" 
            onClick={() => setIsExpanded(false)}
            aria-label="Collapse chat"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Back</span>
          </button>
        )}
      </div>

      <div className="chat-title">
        <span aria-hidden="true">🏛️</span>
        Matdan AI
      </div>

      <div className="header-right">
        {!isExpanded && (
          <button 
            className="btn-icon" 
            onClick={() => setIsExpanded(true)} 
            title="Expand Chat"
            aria-label="Expand chat"
          >
            <Maximize2 size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
});

ChatHeader.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  setIsExpanded: PropTypes.func.isRequired,
};

ChatHeader.displayName = 'ChatHeader';

export default ChatHeader;
