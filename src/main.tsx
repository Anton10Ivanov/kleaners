
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from 'next-themes'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Attempt to load MSW only if explicitly enabled (disabled by default for now)
const enableMSW = false;
if (enableMSW && import.meta.env.DEV) {
  import('./mocks/browser').then(({ startMockServiceWorker }) => {
    startMockServiceWorker().catch(err => {
      console.warn('Error starting mock service worker:', err)
      // Continue with the app even if MSW fails
    });
  }).catch(err => {
    console.warn('Failed to load MSW module:', err);
  });
}

// Using basename ensures proper routing in deployed environments
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="cleanly-theme">
          <App />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
