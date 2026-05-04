import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { server } from './mocks/server';

// Start server before all tests
beforeAll(() => {
  console.log(`[SETUP] Starting MSW Server for test file...`);
  server.listen({ onUnhandledRequest: 'error' });
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for independent tests`
afterEach(() => server.resetHandlers());

// Mock ActionCable globally
vi.mock('@rails/actioncable', () => ({
  createConsumer: vi.fn(() => ({
    subscriptions: {
      create: vi.fn(() => ({
        perform: vi.fn(),
        unsubscribe: vi.fn()
      }))
    },
    disconnect: vi.fn()
  }))
}));

// Mock Sonner toast globally
vi.mock('sonner', () => ({
  toast: vi.fn(),
}));

// Mock window.location to prevent "Not implemented: navigation" error in JSDOM
let currentHref = 'http://localhost:3000';
const locationMock = {
  get href() { return currentHref; },
  set href(val) { 
    currentHref = val; 
  },
  assign: vi.fn((val) => { currentHref = val; }),
  replace: vi.fn(),
  search: '',
  pathname: '/',
  origin: 'http://localhost:3000',
};

Object.defineProperty(window, 'location', {
  value: locationMock,
  writable: true,
});
