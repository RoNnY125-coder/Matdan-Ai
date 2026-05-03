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
  return (
    <div className="quick-prompts" aria-label="Suggested Prompts">
      {electionData.quickPrompts.map((prompt, idx) => (
        <button 
          key={idx} 
          className="prompt-chip"
          onClick={() => onSelect(prompt)}
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

