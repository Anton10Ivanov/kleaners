import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

console.log('🚀 Starting Kleaners Application');

const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Failed to find the root element');
  throw new Error('Failed to find the root element');
}

console.log('Creating React root...');

try {
  const root = createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  
  console.log('✅ Application rendered successfully!');
} catch (error) {
  console.error('❌ Error during render:', error);
  
  // Fallback rendering
  const fallbackRoot = createRoot(rootElement);
  fallbackRoot.render(
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🧹 Kleaners</h1>
      <h2>❌ Application Error</h2>
      <p>Failed to load the application.</p>
      <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
      <button 
        onClick={() => window.location.reload()}
        style={{
          background: 'white',
          color: '#667eea',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
          marginTop: '20px'
        }}
      >
        Refresh Page
      </button>
    </div>
  );
}