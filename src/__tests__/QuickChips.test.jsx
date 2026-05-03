import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuickChips from '../components/QuickChips';
import { electionData } from '../data/electionData';

describe('QuickChips', () => {
  it('renders chips and handles clicks', () => {
    const mockOnSelect = vi.fn();
    render(<QuickChips onSelect={mockOnSelect} />);
    
    const chip = screen.getByText(electionData.quickPrompts[0]);
    expect(chip).toBeInTheDocument();
    
    fireEvent.click(chip);
    expect(mockOnSelect).toHaveBeenCalledWith(electionData.quickPrompts[0]);
  });

  it('handles arrow key navigation', () => {
    const mockOnSelect = vi.fn();
    render(<QuickChips onSelect={mockOnSelect} />);
    
    const chips = screen.getAllByRole('button');
    const firstChip = chips[0];
    
    fireEvent.keyDown(firstChip, { key: 'ArrowRight' });
    fireEvent.keyDown(firstChip, { key: 'ArrowLeft' });
    fireEvent.keyDown(firstChip, { key: 'Enter' });
    
    expect(mockOnSelect).toHaveBeenCalledWith(electionData.quickPrompts[0]);
  });
});
