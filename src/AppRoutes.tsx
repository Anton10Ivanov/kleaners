
import React from 'react';
import { BrowserRouter, Navigate } from 'react-router-dom';

// This component is deprecated and now only redirects to the main app
const AppRoutes = () => {
  return <Navigate to="/" replace />;
};

export default AppRoutes;
