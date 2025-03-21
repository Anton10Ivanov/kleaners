import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Failed to find the root element')

// Check if the app has been pre-rendered with react-snap
const isPrerendered = rootElement.hasChildNodes()

if (isPrerendered) {
  // If the app was pre-rendered, hydrate it
  hydrateRoot(rootElement, 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  // Otherwise, render it normally
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
