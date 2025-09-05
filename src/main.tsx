
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { FeatureFlagProvider } from '@/contexts/FeatureFlagContext'
import { QueryProvider } from '@/providers/QueryProvider'
import { registerSW } from '@/utils/serviceWorker'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Failed to find the root element')

// Render the app normally
createRoot(rootElement).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <FeatureFlagProvider>
          <App />
        </FeatureFlagProvider>
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
)

// Register service worker for PWA functionality
registerSW({
  onSuccess: () => {
    console.log('Service Worker: Content cached for offline use')
  },
  onUpdate: () => {
    console.log('Service Worker: New content available, please refresh')
  },
  onOfflineReady: () => {
    console.log('Service Worker: App ready for offline use')
  },
})
