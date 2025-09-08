import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Test utilities
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'client' as const,
  avatar: undefined,
  phone: '+1234567890',
  address: '123 Test St',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createMockBooking = (overrides = {}) => ({
  id: '1',
  serviceType: 'home-cleaning',
  status: 'pending' as const,
  clientId: '1',
  providerId: undefined,
  scheduledDate: '2024-01-15T10:00:00Z',
  duration: 2,
  price: 100,
  address: '123 Test St',
  specialInstructions: 'Test instructions',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

export const createMockNotification = (overrides = {}) => ({
  id: '1',
  type: 'info' as const,
  title: 'Test Notification',
  message: 'This is a test notification',
  read: false,
  createdAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

// Mock data generators
export const generateMockUsers = (count: number) =>
  Array.from({ length: count }, (_, i) => createMockUser({
    id: (i + 1).toString(),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
  }));

export const generateMockBookings = (count: number) =>
  Array.from({ length: count }, (_, i) => createMockBooking({
    id: (i + 1).toString(),
    serviceType: ['home-cleaning', 'deep-cleaning', 'move-in-out', 'office-cleaning'][i % 4],
    status: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'][i % 5] as any,
  }));

export const generateMockNotifications = (count: number) =>
  Array.from({ length: count }, (_, i) => createMockNotification({
    id: (i + 1).toString(),
    title: `Notification ${i + 1}`,
    message: `This is notification ${i + 1}`,
  }));

// Wait for async operations
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockApiResponse = <T>(data: T, delay = 0) =>
  new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay);
  });

// Mock API error
export const mockApiError = (message = 'API Error', delay = 0) =>
  new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
