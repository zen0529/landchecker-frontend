import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWebSocket } from '@/features/watchlist/hooks/useWebSocket';
import { createConsumer } from '@rails/actioncable';
import { toast } from 'sonner';

// Mock ActionCable
vi.mock('@rails/actioncable', () => ({
  createConsumer: vi.fn(() => ({
    subscriptions: {
      create: vi.fn((channel, handlers) => ({
        channel,
        handlers, // Store handlers for manual triggering in tests
        perform: vi.fn(),
        unsubscribe: vi.fn()
      }))
    },
    disconnect: vi.fn()
  }))
}));

// Mock Sonner toast
vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

describe('useWebSocket', () => {
  const mockOnInitialState = vi.fn();
  const mockOnPropertyUpdated = vi.fn();
  const token = 'fake-token';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not create a consumer if no token is provided', () => {
    renderHook(() => useWebSocket({ token: null }));
    expect(createConsumer).not.toHaveBeenCalled();
  });

  it('should create a consumer and subscription when token is provided', () => {
    renderHook(() => useWebSocket({ token, onInitialState: mockOnInitialState }));
    
    expect(createConsumer).toHaveBeenCalled();
    const consumer = vi.mocked(createConsumer).mock.results[0].value;
    expect(consumer.subscriptions.create).toHaveBeenCalledWith(
      'WatchlistChannel',
      expect.any(Object)
    );
  });

  it('should update wsConnected state when connected/disconnected', () => {
    const { result } = renderHook(() => useWebSocket({ token }));
    
    const consumer = vi.mocked(createConsumer).mock.results[0].value;
    const subscription = consumer.subscriptions.create.mock.results[0].value;
    const { connected, disconnected } = subscription.handlers;

    act(() => {
      connected();
    });
    expect(result.current.wsConnected).toBe(true);

    act(() => {
      disconnected();
    });
    expect(result.current.wsConnected).toBe(false);
  });

  it('should call onInitialState when receiving initial_state event', () => {
    renderHook(() => useWebSocket({ token, onInitialState: mockOnInitialState }));
    
    const consumer = vi.mocked(createConsumer).mock.results[0].value;
    const subscription = consumer.subscriptions.create.mock.results[0].value;
    const { received } = subscription.handlers;

    const mockData = {
      event: 'initial_state',
      watchlist: [{ id: 1, title: 'Property 1' }]
    };

    act(() => {
      received(mockData);
    });

    expect(mockOnInitialState).toHaveBeenCalledWith(mockData.watchlist);
  });

  it('should show a toast when receiving a message', () => {
    renderHook(() => useWebSocket({ token }));
    
    const consumer = vi.mocked(createConsumer).mock.results[0].value;
    const subscription = consumer.subscriptions.create.mock.results[0].value;
    const { received } = subscription.handlers;

    act(() => {
      received({ message: 'Price dropped!', type: 'PRICE_DROP', event: 'info' });
    });

    expect(toast).toHaveBeenCalledWith('Price dropped!', expect.any(Object));
  });

  it('should clean up on unmount', () => {
    const { unmount } = renderHook(() => useWebSocket({ token }));
    
    const consumer = vi.mocked(createConsumer).mock.results[0].value;
    const subscription = consumer.subscriptions.create.mock.results[0].value;

    unmount();

    expect(subscription.unsubscribe).toHaveBeenCalled();
    expect(consumer.disconnect).toHaveBeenCalled();
  });
});
