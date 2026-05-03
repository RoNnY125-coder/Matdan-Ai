/**
 * @fileoverview Application header component with navigation links.
 */

import React from 'react';

/**
 * Header component displaying the brand logo and navigation menu.
 * @returns {React.ReactElement} The rendered Header component.
 */
const Header = React.memo(() => {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="brand-icon" aria-hidden="true" alt="Brand Icon">🏛️</span>
        <div>
          <span className="brand-title">Matdan AI</span>
          <span className="brand-subtitle">Civic Education Guide</span>
        </div>
      </div>
      <nav className="header-nav" aria-label="Main Navigation">
        <a href="#about" aria-label="Navigate to About section">About</a>
        <a href="#process" aria-label="Navigate to Process section">Process</a>
        <a href="#chat" aria-label="Navigate to Ask AI section">Ask AI</a>
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

