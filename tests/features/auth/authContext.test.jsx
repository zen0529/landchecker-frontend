import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';
import { AuthProvider, useAuth } from '@/context/authContext';

// Helper to wrap hook in provider
const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('authContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with no user and loading false after boot', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.user).toBe(null);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should sign in and update state', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    const mockData = {
      token: 'test-token',
      user: { id: 1, first_name: 'Test' }
    };

    act(() => {
      result.current.signIn(mockData);
    });

    expect(result.current.token).toBe('test-token');
    expect(result.current.user.first_name).toBe('Test');
    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorage.getItem('lc_token')).toBe('test-token');
  });

  it('should sign out and clear state', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.signIn({ token: 't', user: { id: 1 } });
    });
    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.signOut();
    });

    expect(result.current.token).toBe(null);
    expect(result.current.user).toBe(null);
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('lc_token')).toBe(null);
  });

  it('should auto-login if token is present on mount', async () => {
    localStorage.setItem('lc_token', 'fake-jwt-token');
    
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    // Should start loading
    expect(result.current.loading).toBe(true);
    
    // Wait for the auto-login (getMe call) to finish
    await waitFor(() => expect(result.current.loading).toBe(false));
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user.first_name).toBe('Test'); // From MSW mock
  });
});
