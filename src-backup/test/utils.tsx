import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Mock data factories
export const createMockUser = (overrides = {}) => ({
  id: 'mock-user-id',
  email: 'test@example.com',
  aud: 'authenticated',
  role: 'authenticated',
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {
    first_name: 'Test',
    last_name: 'User',
  },
  identities: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createMockSession = (user = createMockUser()) => ({
  access_token: 'mock-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: Date.now() + 3600000,
  refresh_token: 'mock-refresh-token',
  user,
});

export const createMockBooking = (overrides = {}) => ({
  id: 'mock-booking-id',
  user_id: 'mock-user-id',
  service_type: 'Regular Cleaning',
  date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  hours: 3,
  bedrooms: 2,
  bathrooms: 1,
  total_price: 150,
  status: 'pending',
  address: '123 Test Street',
  postal_code: '12345',
  frequency: 'weekly',
  first_name: 'Test',
  last_name: 'User',
  email: 'test@example.com',
  phone: '+1234567890',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

export const createMockProvider = (overrides = {}) => ({
  id: 'mock-provider-id',
  first_name: 'Provider',
  last_name: 'Test',
  email: 'provider@example.com',
  phone: '+1234567890',
  services: ['Regular Cleaning', 'Deep Cleaning'],
  username: 'provider_test',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  ...overrides,
});

// Auth state mock helpers
export const mockAuthState = {
  signedOut: () => ({
    session: null,
    user: null,
  }),
  signedInAsClient: () => ({
    session: createMockSession(createMockUser({ role: 'client' })),
    user: createMockUser({ role: 'client' }),
  }),
  signedInAsProvider: () => ({
    session: createMockSession(createMockUser({ role: 'provider' })),
    user: createMockUser({ role: 'provider' }),
  }),
  signedInAsAdmin: () => ({
    session: createMockSession(createMockUser({ role: 'admin' })),
    user: createMockUser({ role: 'admin' }),
  }),
};

// Supabase mock helpers
export const mockSupabaseQuery = (data: any, error: any = null) => ({
  data,
  error,
  status: error ? 400 : 200,
  statusText: error ? 'Bad Request' : 'OK',
});

export const mockSupabaseAuth = {
  getSession: vi.fn(),
  getUser: vi.fn(),
  signInWithPassword: vi.fn(),
  signInWithOAuth: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
  resetPasswordForEmail: vi.fn(),
};

// Export everything needed for testing
export * from '@testing-library/react';
export { customRender as render };
export { vi };