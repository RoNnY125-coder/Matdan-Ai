import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="brand-icon">🏛️</span>
        <div>
          <span className="brand-title">Matdan AI</span>
          <span className="brand-subtitle">Civic Education Guide</span>
        </div>
      </div>
      <nav className="header-nav">
        <a href="#about">About</a>
        <a href="#process">Process</a>
        <a href="#chat">Ask AI</a>
      </nav>
    </header>
  );
}
