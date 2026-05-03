import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero section" id="about">
      <div className="hero-content animate-fade-up">
        <span className="section-label" style={{ marginBottom: '16px' }}>Matdan AI Guide</span>
        <h1>Demystifying the World's Largest Democracy</h1>
        <p>Your intelligent guide to understanding India's complex election process. From voter registration to government formation, learn how 969 million citizens shape the nation.</p>
        <div className="hero-actions">
          <a href="#chat" className="btn-primary">Chat with Matdan AI</a>
          <a href="#process" className="btn-secondary">Explore the Process</a>
        </div>
      </div>
      <div className="hero-scroll animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <ArrowDown size={24} className="bounce-animation" />
      </div>
    </section>
  );
}
