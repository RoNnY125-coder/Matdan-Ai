/**
 * @fileoverview Main App component.
 */

import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Footer from './components/Footer';
import './index.css';

// Lazy loaded components for efficiency
const Timeline = lazy(() => import('./components/Timeline'));
const Chatbot = lazy(() => import('./components/Chatbot'));

/**
 * App component rendering the main application layout.
 * @returns {React.ReactElement} The rendered App component.
 */
const App = React.memo(() => {
  return (
    <div className="app-wrapper">
      {/* Background Decor */}
      <div className="bg-decor orb-1" aria-hidden="true"></div>
      <div className="bg-decor orb-2" aria-hidden="true"></div>
      
      <Header />
      
      <main className="main-content" role="main">
        <Hero />
        <StatsBar />
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem', color: 'var(--slate)' }}>Loading section...</div>}>
          <Timeline />
          <Chatbot />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
});

App.displayName = 'App';

export default App;
