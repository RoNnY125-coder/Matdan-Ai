import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendToAI } from '../services/groqApi';

// Mock the environment variable
const mockEnv = {
  VITE_GROQ_API_KEY: 'test-key',
  VITE_GEMINI_API_KEY: 'test-gemini-key'
};

vi.stubEnv('VITE_GROQ_API_KEY', mockEnv.VITE_GROQ_API_KEY);
vi.stubEnv('VITE_GEMINI_API_KEY', mockEnv.VITE_GEMINI_API_KEY);

vi.stubGlobal('fetch', vi.fn());

describe('groqApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('successful response returns text', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Hello World' } }]
      })
    });

    const response = await sendToAI([{ sender: 'user', text: 'Hi' }]);
    expect(response).toBe('Hello World');
  });

  it('empty response throws error and triggers fallback', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '' } }]
      })
    });

    // We expect it to try Gemini, so let's mock Gemini to fail too to get the fallback error
    const response = await sendToAI([{ sender: 'user', text: 'Hi' }]);
    expect(response).toContain('Network error: Both Groq and Gemini APIs failed');
  });

  it('network error triggers fallback', async () => {
    globalThis.fetch.mockRejectedValueOnce(new Error('Network error'));
    const response = await sendToAI([{ sender: 'user', text: 'Hi' }]);
    expect(response).toContain('Network error: Both Groq and Gemini APIs failed');
  });

  it('rate limit exceeded triggers fallback', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ error: { message: 'Rate limit exceeded' } })
    });
    const response = await sendToAI([{ sender: 'user', text: 'Hi' }]);
    expect(response).toContain('Network error: Both Groq and Gemini APIs failed');
  });

  it('missing API key triggers fallback directly', async () => {
    vi.stubEnv('VITE_GROQ_API_KEY', '');
    const response = await sendToAI([{ sender: 'user', text: 'Hi' }]);
    expect(response).toContain('Gemini fallback also failed');
    vi.stubEnv('VITE_GROQ_API_KEY', 'test-key'); // restore
  });
});
