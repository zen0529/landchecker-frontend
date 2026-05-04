import { describe, it, expect, vi } from 'vitest';
import { getWatchlist, addToWatchlist, removeFromWatchlistApi } from '@/features/watchlist/api/watchlistApi';

describe('watchlistApi', () => {
  it('fetches the watchlist correctly', async () => {
    const data = await getWatchlist();
    
    expect(data).toHaveLength(2);
    expect(data[0].property.title).toBe('Mocked Property 1');
    expect(data[1].property.title).toBe('Mocked Property 2');
  });

  it('adds an item to the watchlist', async () => {
    const propertyId = 999;
    const result = await addToWatchlist(propertyId);
    
    expect(result.watchlist_item.property_id).toBe(propertyId);
    expect(result.watchlist_item.status).toBe('success');
  });

  it('removes an item from the watchlist', async () => {
    const propertyId = 1;
    const result = await removeFromWatchlistApi(propertyId);
    
    expect(result.message).toBe('Item 1 removed');
  });
});
