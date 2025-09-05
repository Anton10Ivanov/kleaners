
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { FeatureFlagProvider } from '@/contexts/FeatureFlagContext'
<<<<<<< HEAD
import { QueryProvider } from '@/providers/QueryProvider'
import { registerSW } from '@/utils/serviceWorker'
=======
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Failed to find the root element')

// Render the app normally
createRoot(rootElement).render(
  <React.StrictMode>
<<<<<<< HEAD
    <QueryProvider>
      <BrowserRouter>
        <FeatureFlagProvider>
          <App />
        </FeatureFlagProvider>
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
)

// App rendered - removed console.log for production

// Register service worker for PWA functionality
registerSW({
  onSuccess: () => {
    console.log('Service Worker: Content cached for offline use');
  },
  onUpdate: () => {
    console.log('Service Worker: New content available, please refresh');
  },
  onOfflineReady: () => {
    console.log('Service Worker: App ready for offline use');
  },
});
=======
    <BrowserRouter>
      <FeatureFlagProvider>
        <App />
      </FeatureFlagProvider>
    </BrowserRouter>
  </React.StrictMode>
)

console.log('App rendered')
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
