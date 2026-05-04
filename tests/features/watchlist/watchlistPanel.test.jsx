import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import WatchlistPanel from '@/features/watchlist/components/watchlistPanel';

// Mock the sub-component WatchlistItem
vi.mock('@/features/watchlist/components/WatchlistItems', () => ({
  default: ({ property, onRemove }) => (
    <div data-testid="watchlist-item">
      <span>{property.address}</span>
      <button onClick={() => onRemove(property.id)}>Remove</button>
    </div>
  )
}));

describe('WatchlistPanel', () => {
  const mockItems = [
    { property_id: 1, property: { id: 1, address: '123 Main St' } },
    { property_id: 2, property: { id: 2, address: '456 Oak Ave' } }
  ];

  const mockOnRemove = vi.fn();

  it('renders the empty state when there are no items', () => {
    render(
      <WatchlistPanel 
        items={[]} 
        allProperties={[]} 
        onRemove={mockOnRemove} 
      />
    );
    
    expect(screen.getByText(/your list is empty/i)).toBeInTheDocument();
    expect(screen.queryByTestId('watchlist-item')).not.toBeInTheDocument();
  });

  it('renders the correct number of items', () => {
    render(
      <WatchlistPanel 
        items={mockItems} 
        allProperties={[]} 
        onRemove={mockOnRemove} 
      />
    );
    
    const items = screen.getAllByTestId('watchlist-item');
    expect(items).toHaveLength(2);
  });
});
