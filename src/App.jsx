import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Timeline from './components/Timeline';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="app-wrapper">
      {/* Background Decor */}
      <div className="bg-decor orb-1"></div>
      <div className="bg-decor orb-2"></div>
      
      <Header />
      
      <main className="main-content">
        <Hero />
        <StatsBar />
        <Timeline />
        <Chatbot />
      </main>

      <Footer />
    </div>
  );
}

export default App;
