
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import RootLayout from '@/components/RootLayout';
import UserLayout from '@/components/user/UserLayout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';

// Import pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Contact from '@/pages/Contact';
import JoinTeam from '@/pages/JoinTeam';
import LayoutDemo from '@/pages/LayoutDemo';

// Admin pages
import AdminPanel from '@/pages/admin/AdminPanel';
import { AdminBookings } from '@/pages/admin/AdminBookings';
import { AdminCustomers } from '@/pages/admin/AdminCustomers';
import { AdminProviders } from '@/pages/admin/AdminProviders';
import { AdminSettings } from '@/pages/admin/AdminSettings';
import Dashboard from '@/pages/admin/Dashboard';

// User pages
import UserDashboard from '@/pages/user/UserDashboard';
import UserBookings from '@/pages/user/UserBookings';
import UserProfile from '@/pages/user/UserProfile';
import UserInvoices from '@/pages/user/UserInvoices';
import UserNotifications from '@/pages/user/UserNotifications';
import UserMessages from '@/pages/user/UserMessages';

// Auth pages
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';

// About pages
import CompanyValues from '@/pages/about/CompanyValues';
import FAQ from '@/pages/about/FAQ';

// Service pages
import RegularCleaning from '@/pages/services/RegularCleaning';
import BusinessCleaning from '@/pages/services/BusinessCleaning';
import MoveInOut from '@/pages/services/MoveInOut';
import PostConstructionCleaning from '@/pages/services/PostConstructionCleaning';

// Legal pages
import TermsOfService from '@/pages/legal/TermsOfService';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';

// Provider pages
import ProviderDashboard from '@/pages/provider/ProviderDashboard';
import ProviderProfile from '@/pages/provider/ProviderProfile';
import ProviderLayout from '@/components/provider/ProviderLayout';
import ProviderBookings from '@/pages/provider/ProviderBookings';
import ProviderSettings from '@/pages/provider/ProviderSettings';
import ProviderAvailability from '@/pages/provider/ProviderAvailability';
import AdminLayout from '@/components/admin/AdminLayout';

function App() {
  const location = useLocation();

  // Add route-specific class to body for CSS targeting
  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'root';
    document.body.className = ''; // Clear previous classes
    document.body.classList.add(`${path}-route`);

    // Also add a specific class to #root for admin/user/provider routes
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.className = '';
      if (['admin', 'user', 'provider'].includes(path)) {
        rootElement.classList.add('admin-panel-container');
      }
    }
  }, [location]);

  return (
    <Routes>
      {/* Root Layout Routes */}
      <Route element={<RootLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join-team" element={<JoinTeam />} />
        <Route path="/layout-demo" element={<LayoutDemo />} />
        
        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        
        {/* About Routes */}
        <Route path="/about/values" element={<CompanyValues />} />
        <Route path="/about/faq" element={<FAQ />} />
        
        {/* Service Routes */}
        <Route path="/services/regular-cleaning" element={<RegularCleaning />} />
        <Route path="/services/business-cleaning" element={<BusinessCleaning />} />
        <Route path="/services/move-in-out" element={<MoveInOut />} />
        <Route path="/services/post-construction-cleaning" element={<PostConstructionCleaning />} />
        
        {/* Legal Routes */}
        <Route path="/legal/terms" element={<TermsOfService />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        
        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Routes - Note: no longer nested under RootLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="providers" element={<AdminProviders />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      
      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/bookings" element={<UserBookings />} />
        <Route path="/user/messages" element={<UserMessages />} />
        <Route path="/user/invoices" element={<UserInvoices />} />
        <Route path="/user/notifications" element={<UserNotifications />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Route>
      
      {/* Provider Routes */}
      <Route path="/provider" element={<ProviderLayout />}>
        <Route path="dashboard" element={<ProviderDashboard />} />
        <Route path="profile" element={<ProviderProfile />} />
        <Route path="bookings" element={<ProviderBookings />} />
        <Route path="settings" element={<ProviderSettings />} />
        <Route path="availability" element={<ProviderAvailability />} />
      </Route>
    </Routes>
  );
}

export default App;
