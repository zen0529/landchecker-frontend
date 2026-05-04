import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import WatchlistItem from '@/features/watchlist/components/WatchlistItems';

// Mock the price formatter using the same alias the component uses
vi.mock('@/features/properties/utils/priceFormatter', () => ({
  formatPrice: (price) => `$${price}`
}));

describe('WatchlistItem', () => {
  const mockProperty = {
    id: 1,
    title: 'Modern Apartment',
    suburb: 'Richmond',
    price: 500000,
    images: ['test-image.jpg']
  };

  const mockOnRemove = vi.fn();

  it('renders property details correctly', () => {
    render(<WatchlistItem property={mockProperty} onRemove={mockOnRemove} />);
    
    expect(screen.getByText('Modern Apartment')).toBeInTheDocument();
    expect(screen.getByText('Richmond')).toBeInTheDocument();
    expect(screen.getByText('$500000')).toBeInTheDocument();
  });

  it('renders the property image', () => {
    render(<WatchlistItem property={mockProperty} onRemove={mockOnRemove} />);
    
    // Find the div with the background image
    const container = screen.getByText('Modern Apartment').closest('.group');
    // We can look for the div that has the style attribute with the image URL
    const imgDiv = container.querySelector('[style*="test-image.jpg"]');
    expect(imgDiv).toBeInTheDocument();
  });

  it('calls onRemove when clicking the X button', () => {
    render(<WatchlistItem property={mockProperty} onRemove={mockOnRemove} />);
    
    const removeButton = screen.getByTitle('Remove from watchlist');
    fireEvent.click(removeButton);
    
    expect(mockOnRemove).toHaveBeenCalledWith(1);
  });
});

// Helper for testing background images if needed
// Or just check the style attribute directly
import { within } from '@testing-library/react';
