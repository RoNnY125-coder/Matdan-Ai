import React from 'react';
import { Users, Landmark, Map, Flag } from 'lucide-react';
import { electionData } from '../data/electionData';

export default function StatsBar() {
  return (
    <section className="section animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <div className="section-label" style={{ textAlign: 'center', marginBottom: '24px' }}>2024 Election By The Numbers</div>
      <div className="stats-grid">
        <div className="stat-card">
          <Users className="stat-icon" />
          <div className="stat-info">
            <h3>{electionData.overview.registeredVoters}</h3>
            <p>Registered Voters</p>
          </div>
        </div>
        <div className="stat-card">
          <Landmark className="stat-icon" />
          <div className="stat-info">
            <h3>{electionData.overview.totalSeats}</h3>
            <p>Lok Sabha Seats</p>
          </div>
        </div>
        <div className="stat-card">
          <Map className="stat-icon" />
          <div className="stat-info">
            <h3>{electionData.overview.phases}</h3>
            <p>Election Phases</p>
          </div>
        </div>
        <div className="stat-card">
          <Flag className="stat-icon" />
          <div className="stat-info">
            <h3>{electionData.overview.voterTurnout}</h3>
            <p>Voter Turnout (2024)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
