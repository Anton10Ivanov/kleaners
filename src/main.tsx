
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

// MSW completely disabled for now to fix application issues
console.log('Mock Service Worker disabled to fix application issues');

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
