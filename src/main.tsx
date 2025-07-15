
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { FeatureFlagProvider } from '@/contexts/FeatureFlagContext'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Failed to find the root element')

// Render the app normally
createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FeatureFlagProvider>
        <App />
      </FeatureFlagProvider>
    </BrowserRouter>
  </React.StrictMode>
)

console.log('App rendered')
