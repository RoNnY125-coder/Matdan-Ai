import { describe, it, expect } from 'vitest';
import { SYSTEM_PROMPT } from '../data/electionData';

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
