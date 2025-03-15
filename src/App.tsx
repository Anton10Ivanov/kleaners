
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import RootLayout from '@/components/RootLayout';
import ClientLayout from '@/components/client/ClientLayout';
import ProviderLayout from '@/components/provider/ProviderLayout';
import AdminLayout from '@/components/admin/AdminLayout';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';

// Import pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Contact from '@/pages/Contact';
import JoinTeam from '@/pages/JoinTeam';

// Auth pages
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import VerifyProvider from "@/pages/auth/VerifyProvider";

// Admin pages
import AdminPanel from '@/pages/admin/AdminPanel';
import { AdminBookings } from '@/pages/admin/AdminBookings';
import { AdminCustomers } from '@/pages/admin/AdminCustomers';
import { AdminProviders } from '@/pages/admin/AdminProviders';
import { AdminSettings } from '@/pages/admin/AdminSettings';
import Dashboard from '@/pages/admin/Dashboard';
import { AdminPendingBookingsPool } from './pages/admin/PendingBookingsPool';

// Client pages
import ClientDashboard from '@/pages/client/ClientDashboard';
import ClientBookings from '@/pages/client/ClientBookings';
import ClientProfile from '@/pages/client/ClientProfile';
import ClientSettings from '@/pages/client/ClientSettings';
import ClientInvoices from '@/pages/client/ClientInvoices';
import ClientMessages from '@/pages/client/ClientMessages';

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
import ProviderBookings from '@/pages/provider/ProviderBookings';
import ProviderSettings from '@/pages/provider/ProviderSettings';
import ProviderAvailability from '@/pages/provider/ProviderAvailability';
import ProviderMessages from '@/pages/provider/ProviderMessages';

function App() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'root';
    document.body.className = ''; // Clear previous classes
    document.body.classList.add(`${path}-route`);

    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.className = '';
      if (['admin', 'client', 'provider'].includes(path)) {
        rootElement.classList.add('admin-panel-container');
      }
    }
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Root layout with nested routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-team" element={<JoinTeam />} />
          
          {/* Auth routes - consolidated */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<Login />} />
          <Route path="/reset-password" element={<Login />} />
          <Route path="/verify-provider" element={<VerifyProvider />} />
          
          {/* About routes */}
          <Route path="/about/values" element={<CompanyValues />} />
          <Route path="/about/faq" element={<FAQ />} />
          
          {/* Service routes */}
          <Route path="/services/regular-cleaning" element={<RegularCleaning />} />
          <Route path="/services/business-cleaning" element={<BusinessCleaning />} />
          <Route path="/services/move-in-out" element={<MoveInOut />} />
          <Route path="/services/post-construction-cleaning" element={<PostConstructionCleaning />} />
          
          {/* Legal routes */}
          <Route path="/legal/terms" element={<TermsOfService />} />
          <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPanel />} />
          <Route path="analytics" element={<Dashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="pending-pool" element={<AdminPendingBookingsPool />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="providers" element={<AdminProviders />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        
        {/* Client routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="bookings" element={<ClientBookings />} />
          <Route path="messages" element={<ClientMessages />} />
          <Route path="invoices" element={<ClientInvoices />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="settings" element={<ClientSettings />} />
        </Route>
        
        {/* Provider routes */}
        <Route path="/provider" element={<ProviderLayout />}>
          <Route index element={<ProviderDashboard />} />
          <Route path="dashboard" element={<ProviderDashboard />} />
          <Route path="profile" element={<ProviderProfile />} />
          <Route path="bookings" element={<ProviderBookings />} />
          <Route path="messages" element={<ProviderMessages />} />
          <Route path="settings" element={<ProviderSettings />} />
          <Route path="availability" element={<ProviderAvailability />} />
          <Route path="pending-pool" element={<AdminPendingBookingsPool />} />
        </Route>

        {/* Legacy redirects - properly configured to handle any path after the base */}
        <Route path="/auth/*" element={<Navigate to="/login" replace />} />
        <Route path="/user/*" element={<Navigate to="/client" replace />} />
        
        {/* Catch-all route for SPA routing */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
