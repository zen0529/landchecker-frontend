import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePropertyFilters } from '@/features/properties/hooks/usePropertyFilters';

// Mock filterBuilder
vi.mock('@/features/properties/utils/filterBuilder', () => ({
  countActiveFilters: (filters) => Object.keys(filters).length
}));

describe('usePropertyFilters', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePropertyFilters());
    
    expect(result.current.filters).toEqual({});
    expect(result.current.searchQuery).toBe("");
    expect(result.current.sortBy).toBe("created_at");
    expect(result.current.sortDir).toBe("desc");
  });

  it('should handle filter changes', () => {
    const { result } = renderHook(() => usePropertyFilters());
    
    act(() => {
      result.current.handleFilterChange('price_min', 500000);
    });
    
    expect(result.current.filters.price_min).toBe(500000);
    expect(result.current.activeFilterCount).toBe(1);
  });

  it('should reset filters', () => {
    const { result } = renderHook(() => usePropertyFilters());
    
    act(() => {
      result.current.handleFilterChange('price_min', 500000);
    });
    expect(result.current.activeFilterCount).toBe(1);
    
    act(() => {
      result.current.handleFilterChange('__reset__');
    });
    
    expect(result.current.filters).toEqual({});
    expect(result.current.activeFilterCount).toBe(0);
  });
});
