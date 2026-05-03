import React from 'react';
import { electionData } from '../data/electionData';

export default function QuickChips({ onSelect }) {
  return (
    <div className="quick-prompts">
      {electionData.quickPrompts.map((prompt, idx) => (
        <button 
          key={idx} 
          className="prompt-chip"
          onClick={() => onSelect(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
