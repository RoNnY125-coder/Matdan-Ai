import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Chatbot from '../components/Chatbot';

describe('Chatbot Component', () => {
  it('renders chat input field', () => {
    render(<Chatbot />);
    const input = screen.getByPlaceholderText(/Ask about elections/i);
    expect(input).toBeInTheDocument();
  });

  it('renders send button', () => {
    render(<Chatbot />);
    const button = screen.getByRole('button', { name: /Send message/i });
    expect(button).toBeInTheDocument();
  });

  it('does not send empty message', () => {
    render(<Chatbot />);
    const input = screen.getByPlaceholderText(/Ask about elections/i);
    const button = screen.getByRole('button', { name: /Send message/i });
    
    expect(button).toBeDisabled();
    
    fireEvent.change(input, { target: { value: '   ' } });
    expect(button).toBeDisabled();
  });

  it('displays user message after sending', () => {
    render(<Chatbot />);
    const input = screen.getByPlaceholderText(/Ask about elections/i);
    const button = screen.getByRole('button', { name: /Send message/i });
    
    // Using fake timers if debouncing is complex, but our local state is immediate
    fireEvent.change(input, { target: { value: 'How do I vote?' } });
    expect(button).not.toBeDisabled();
    
    fireEvent.click(button);
    expect(screen.getByText('How do I vote?')).toBeInTheDocument();
  });

  it('shows typing indicator while loading', () => {
    render(<Chatbot />);
    const input = screen.getByPlaceholderText(/Ask about elections/i);
    const button = screen.getByRole('button', { name: /Send message/i });
    
    fireEvent.change(input, { target: { value: 'What is EVM?' } });
    fireEvent.click(button);
    
    const indicator = screen.getByLabelText(/Matdan AI is typing/i);
    expect(indicator).toBeInTheDocument();
  });

  it('displays error message on API failure', async () => {
    // Stub the env variable so we bypass the missing key check
    vi.stubEnv('VITE_GROQ_API_KEY', 'fake-key');

    // Mock global fetch to return an error
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: { message: "Unauthorized" } }),
      })
    );

    render(<Chatbot />);
    const input = screen.getByPlaceholderText(/Ask about elections/i);
    const button = screen.getByRole('button', { name: /Send message/i });
    
    fireEvent.change(input, { target: { value: 'Fail test' } });
    fireEvent.click(button);
    
    // Wait for async state update
    const errorMsg = await screen.findByText(/Both Groq and Gemini APIs failed/i, {}, { timeout: 3000 });
    expect(errorMsg).toBeInTheDocument();
    
    vi.unstubAllEnvs();
  });
});
