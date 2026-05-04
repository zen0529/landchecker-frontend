import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import PropertyCard from '@/features/properties/components/PropertyCard';

// Mock constants
vi.mock('@/features/properties/constants/propertyConstants', () => ({
  TYPE_LABEL: { house: 'House', apartment: 'Apartment' },
  STATUS_COLOR: { active: '#000' }
}));

describe('PropertyCard', () => {
  const mockProperty = {
    id: 101,
    title: 'Beachfront Villa',
    suburb: 'Bondi',
    price: 2500000,
    images: ['img1.jpg'],
    status: 'active',
    property_type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    floor_area_sqm: 150
  };

  const mockOnToggleWatch = vi.fn();

  it('renders property details correctly', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        isWatched={false} 
        onToggleWatch={mockOnToggleWatch} 
        index={0} 
      />
    );
    
    expect(screen.getByText('Beachfront Villa')).toBeInTheDocument();
    expect(screen.getByText(/House · Bondi/)).toBeInTheDocument();
    // 2500000 should be formatted as $2.5M
    expect(screen.getByText('$2.5M')).toBeInTheDocument();
    
    // Stats
    expect(screen.getByText('3')).toBeInTheDocument(); // beds
    expect(screen.getByText('2')).toBeInTheDocument(); // baths
    expect(screen.getByText('150')).toBeInTheDocument(); // sqm
  });

  it('calls onToggleWatch when the heart button is clicked', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        isWatched={false} 
        onToggleWatch={mockOnToggleWatch} 
        index={0} 
      />
    );
    
    const heartButton = screen.getByTitle('Save to watchlist');
    fireEvent.click(heartButton);
    
    expect(mockOnToggleWatch).toHaveBeenCalledWith(mockProperty);
  });

  it('renders correctly when watched', () => {
    render(
      <PropertyCard 
        property={mockProperty} 
        isWatched={true} 
        onToggleWatch={mockOnToggleWatch} 
        index={0} 
      />
    );
    
    expect(screen.getByTitle('Remove from watchlist')).toBeInTheDocument();
  });
});
