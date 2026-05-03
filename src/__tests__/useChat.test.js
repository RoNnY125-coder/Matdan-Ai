import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChat } from '../hooks/useChat';
import * as groqApi from '../services/groqApi';

vi.mock('../services/groqApi', () => ({
  sendToAI: vi.fn()
}));

describe('useChat hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initial state is correct', () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.messages).toHaveLength(1); // Welcome message
    expect(result.current.messages[0].sender).toBe('ai');
    expect(result.current.input).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isExpanded).toBe(false);
  });

  it('handleSend adds user message and triggers loading', async () => {
    groqApi.sendToAI.mockResolvedValueOnce('AI Response');
    const { result } = renderHook(() => useChat());
    
    act(() => {
      result.current.setInput('Hello');
    });

    await act(async () => {
      await result.current.handleSend('Hello');
    });

    expect(result.current.messages).toHaveLength(3); // Welcome + User + AI
    expect(result.current.messages[1].sender).toBe('user');
    expect(result.current.messages[1].text).toBe('Hello');
    expect(result.current.messages[2].sender).toBe('ai');
    expect(result.current.messages[2].text).toBe('AI Response');
    expect(result.current.isLoading).toBe(false);
  });

  it('rate limit blocks rapid sends', async () => {
    const { result } = renderHook(() => useChat());
    
    // Simulate 10 rapid messages
    for (let i = 0; i < 10; i++) {
      await act(async () => {
        result.current.handleSend(`Message ${i}`);
      });
    }

    // 11th message should trigger rate limit
    await act(async () => {
      result.current.handleSend('Message 11');
    });

    expect(result.current.isRateLimited).toBe(true);
    expect(result.current.rateLimitMessage).toBe('You are sending messages too fast. Please wait a moment.');
    
    // Check that it clears after timeout
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    
    expect(result.current.isRateLimited).toBe(false);
    expect(result.current.rateLimitMessage).toBe('');
  });
});
