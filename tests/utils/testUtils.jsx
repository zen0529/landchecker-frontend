import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/authContext';
import { WatchlistProvider } from '@/context/watchlistContext';

/**
 * Custom render function that wraps components in all necessary providers.
 */
export function renderWithProviders(ui, { route = '/' } = {}) {
  // Create a new QueryClient for each test to avoid state bleeding
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for faster tests
      },
    },
  });

  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <AuthProvider>
            <WatchlistProvider>
              {children}
            </WatchlistProvider>
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper }),
    queryClient,
  };
}
