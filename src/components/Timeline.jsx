import React, { useEffect, useRef } from 'react';
import { electionData } from '../data/electionData';

export default function Timeline() {
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
    <section className="section" id="process">
      <div className="section-header animate-fade-up">
        <span className="section-label">How India Votes</span>
        <h2>The Election Process</h2>
      </div>
      <div className="timeline">
        {electionData.phases.map((phase, index) => (
          <div 
            className="timeline-item" 
            key={phase.id}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <div className="timeline-marker">
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
}
