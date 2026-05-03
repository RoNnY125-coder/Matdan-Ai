/**
 * @fileoverview Hero section of the application landing page.
 */

import React from 'react';
import { ArrowDown } from 'lucide-react';

/**
 * Hero component displaying the main title, description, and call-to-action buttons.
 * @returns {React.ReactElement} The rendered Hero component.
 */
const Hero = React.memo(() => {
  return (
    <section className="hero section" id="about" aria-labelledby="hero-title">
      <div className="hero-content animate-fade-up">
        <span className="section-label" style={{ marginBottom: '16px' }}>Matdan AI Guide</span>
        <h1 id="hero-title">Demystifying the World's Largest Democracy</h1>
        <p>Your intelligent guide to understanding India's complex election process. From voter registration to government formation, learn how 969 million citizens shape the nation.</p>
        <div className="hero-actions">
          <a href="#chat" className="btn-primary" aria-label="Chat with Matdan AI">Chat with Matdan AI</a>
          <a href="#process" className="btn-secondary" aria-label="Explore the election process">Explore the Process</a>
        </div>
      </div>
      <div className="hero-scroll animate-fade-up" style={{ animationDelay: '0.2s' }} aria-hidden="true">
        <ArrowDown size={24} className="bounce-animation" aria-label="Scroll down" />
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;

