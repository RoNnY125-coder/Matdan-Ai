/**
 * @fileoverview Statistics bar displaying key election metrics.
 */

import React from 'react';
import { Users, Landmark, Map, Flag } from 'lucide-react';
import { electionData } from '../data/electionData';

/**
 * StatsBar component rendering a grid of key 2024 election statistics.
 * @returns {React.ReactElement} The rendered StatsBar component.
 */
const StatsBar = React.memo(() => {
  return (
    <section className="section animate-fade-up" style={{ animationDelay: '0.1s' }} aria-labelledby="stats-heading">
      <h2 className="section-label" id="stats-heading" style={{ textAlign: 'center', marginBottom: '24px' }}>2024 Election By The Numbers</h2>
      <div className="stats-grid">
        <div className="stat-card" tabIndex="0" aria-label={`Registered Voters: ${electionData.overview.registeredVoters}`}>
          <Users className="stat-icon" aria-hidden="true" />
          <div className="stat-info">
            <h3>{electionData.overview.registeredVoters}</h3>
            <p>Registered Voters</p>
          </div>
        </div>
        <div className="stat-card" tabIndex="0" aria-label={`Lok Sabha Seats: ${electionData.overview.totalSeats}`}>
          <Landmark className="stat-icon" aria-hidden="true" />
          <div className="stat-info">
            <h3>{electionData.overview.totalSeats}</h3>
            <p>Lok Sabha Seats</p>
          </div>
        </div>
        <div className="stat-card" tabIndex="0" aria-label={`Election Phases: ${electionData.overview.phases}`}>
          <Map className="stat-icon" aria-hidden="true" />
          <div className="stat-info">
            <h3>{electionData.overview.phases}</h3>
            <p>Election Phases</p>
          </div>
        </div>
        <div className="stat-card" tabIndex="0" aria-label={`Voter Turnout: ${electionData.overview.voterTurnout}`}>
          <Flag className="stat-icon" aria-hidden="true" />
          <div className="stat-info">
            <h3>{electionData.overview.voterTurnout}</h3>
            <p>Voter Turnout (2024)</p>
          </div>
        </div>
      </div>
    </section>
  );
});

StatsBar.displayName = 'StatsBar';

export default StatsBar;

