/**
 * @fileoverview Timeline component outlining the election process phases.
 */

import React, { useEffect, useRef } from 'react';
import { electionData } from '../data/electionData';

/**
 * Timeline component displaying the steps of the Indian election process.
 * Uses an IntersectionObserver to animate items as they scroll into view.
 * @returns {React.ReactElement} The rendered Timeline component.
 */
const Timeline = React.memo(() => {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="process" aria-labelledby="timeline-heading">
      <div className="section-header animate-fade-up">
        <span className="section-label">How India Votes</span>
        <h2 id="timeline-heading">The Election Process</h2>
      </div>
      <div className="timeline" role="list">
        {electionData.phases.map((phase, index) => (
          <div 
            className="timeline-item" 
            key={phase.id}
            ref={(el) => (itemRefs.current[index] = el)}
            role="listitem"
            tabIndex="0"
          >
            <div className="timeline-marker" aria-hidden="true">
              <span>{phase.id}</span>
            </div>
            <div className="timeline-content">
              <h3>{phase.title}</h3>
              <p>{phase.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

Timeline.displayName = 'Timeline';

export default Timeline;

