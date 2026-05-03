/**
 * @fileoverview Quick prompt chips for the chatbot.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { electionData } from '../data/electionData';

/**
 * QuickChips component rendering suggested prompts for the user.
 * @param {Object} props
 * @param {Function} props.onSelect - Callback fired when a prompt is clicked.
 * @returns {React.ReactElement} The rendered QuickChips component.
 */
const QuickChips = React.memo(({ onSelect }) => {
  const handleKeyDown = (e, prompt, idx) => {
    const chips = document.querySelectorAll('.prompt-chip');
    if (e.key === 'ArrowRight') {
      const next = chips[idx + 1] || chips[0];
      next.focus();
    } else if (e.key === 'ArrowLeft') {
      const prev = chips[idx - 1] || chips[chips.length - 1];
      prev.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(prompt);
    }
  };

  const handleClick = (prompt) => {
    if (window.gtag) {
      window.gtag('event', 'chip_clicked', { chip_text: prompt });
    }
    onSelect(prompt);
  };

  return (
    <div className="quick-prompts" aria-label="Suggested Prompts" role="group">
      {electionData.quickPrompts.map((prompt, idx) => (
        <button 
          key={idx} 
          className="prompt-chip"
          onClick={() => handleClick(prompt)}
          onKeyDown={(e) => handleKeyDown(e, prompt, idx)}
          aria-label={`Ask: ${prompt}`}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
});

QuickChips.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

QuickChips.displayName = 'QuickChips';

export default QuickChips;

