import { describe, it, expect } from 'vitest';
import { SYSTEM_PROMPT, electionData } from '../data/electionData';

describe('electionData.js', () => {
  it('SYSTEM_PROMPT is defined and is a string', () => {
    expect(SYSTEM_PROMPT).toBeDefined();
    expect(typeof SYSTEM_PROMPT).toBe('string');
  });

  it('SYSTEM_PROMPT length is greater than 100 characters', () => {
    expect(SYSTEM_PROMPT.length).toBeGreaterThan(100);
  });

  it('SYSTEM_PROMPT contains the word "ECI"', () => {
    expect(SYSTEM_PROMPT).toContain('ECI');
  });

  it('SYSTEM_PROMPT contains the word "EVM"', () => {
    expect(SYSTEM_PROMPT).toContain('EVM');
  });
});

describe('electionData object', () => {
  it('overview has correct keys', () => {
    expect(Object.keys(electionData.overview)).toEqual(
      expect.arrayContaining(['registeredVoters', 'totalSeats', 'phases', 'voterTurnout'])
    );
  });

  it('phases has 7 items, each with id, title, and desc', () => {
    expect(electionData.phases).toHaveLength(7);
    electionData.phases.forEach(phase => {
      expect(phase).toHaveProperty('id');
      expect(phase).toHaveProperty('title');
      expect(phase).toHaveProperty('desc');
    });
  });
});
