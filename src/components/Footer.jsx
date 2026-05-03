import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="brand-icon">🏛️</span>
          <span className="brand-title">Matdan AI</span>
        </div>
        <p className="footer-disclaimer">
          Matdan AI is an educational tool. Information is based on the Knowledge Base provided and may not reflect real-time updates.
        </p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
