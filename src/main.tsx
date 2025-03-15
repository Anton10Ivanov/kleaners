
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import { startMockServiceWorker } from './mocks/browser'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'

// Initialize mock service worker in development or if enabled via env var
const enableMocks = import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCK_API === 'true';

if (enableMocks) {
  startMockServiceWorker().catch(err => {
    console.warn('Error starting mock service worker:', err)
  })
}

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

// Using basename ensures proper routing in deployed environments
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="cleanly-theme">
          <App />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
