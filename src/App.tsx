
import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

// Import routes
import AppRoutes from '@/AppRoutes';

function App() {
  const location = useLocation();

  // Set body class based on route
  const path = location.pathname.split('/')[1] || 'root';
  document.body.className = ''; // Clear previous classes
  document.body.classList.add(`${path}-route`);

  // Apply container class to admin panel routes
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.className = '';
    if (['admin', 'client', 'provider'].includes(path)) {
      rootElement.classList.add('admin-panel-container');
    }
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
