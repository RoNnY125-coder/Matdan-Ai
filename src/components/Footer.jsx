/**
 * @fileoverview Application footer component.
 */

import React from 'react';

/**
 * Footer component containing brand info and legal links.
 * @returns {React.ReactElement} The rendered Footer component.
 */
const Footer = React.memo(() => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="brand-icon" aria-hidden="true">🏛️</span>
          <span className="brand-title">Matdan AI</span>
        </div>
        <p className="footer-disclaimer">
          Matdan AI is an educational tool. Information is based on the Knowledge Base provided and may not reflect real-time updates.
        </p>
        <div className="footer-links" aria-label="Footer links">
          <a href="#" aria-label="Privacy Policy">Privacy Policy</a>
          <a href="#" aria-label="Terms of Service">Terms of Service</a>
          <a href="#" aria-label="Contact">Contact</a>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

