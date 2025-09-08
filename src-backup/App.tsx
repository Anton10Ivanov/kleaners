import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import RootLayout from '@/components/RootLayout';
import ClientLayout from '@/components/client/ClientLayout';
import ProviderLayout from '@/components/provider/ProviderLayout';
import AdminLayout from '@/components/admin/AdminLayout';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';

// Import critical pages (not lazy loaded for better initial performance)
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';
import BusinessSolutions from '@/pages/BusinessSolutions';

// Auth pages - lazy loaded
const Login = lazy(() => import('@/pages/auth/Login'));
const Signup = lazy(() => import('@/pages/auth/Signup'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));
const VerifyProvider = lazy(() => import('@/pages/auth/VerifyProvider'));
const AuthCallback = lazy(() => import('@/pages/auth/AuthCallback'));

// Booking pages - lazy loaded
const BookingRoutes = lazy(() => import('@/pages/booking/BookingRoutes'));

// Admin pages - lazy loaded with proper code splitting
const AdminPanel = lazy(() => import('@/pages/admin/AdminPanel'));
const AdminBookings = lazy(() => import('@/pages/admin/AdminBookings').then(m => ({ default: m.AdminBookings })));
const AdminCustomers = lazy(() => import('@/pages/admin/AdminCustomers').then(m => ({ default: m.AdminCustomers })));
const AdminProviders = lazy(() => import('@/pages/admin/AdminProviders').then(m => ({ default: m.AdminProviders })));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings').then(m => ({ default: m.AdminSettings })));
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminPendingBookingsPool = lazy(() => import('./pages/admin/PendingBookingsPool').then(m => ({ default: m.AdminPendingBookingsPool })));

// Client pages - lazy loaded
const ClientDashboard = lazy(() => import('@/pages/client/ClientDashboard'));
const ClientBookings = lazy(() => import('@/pages/client/ClientBookings'));
const ClientProfileSettings = lazy(() => import('@/pages/client/ClientProfileSettings'));
const ClientInvoices = lazy(() => import('@/pages/client/ClientInvoices'));
const ClientMessages = lazy(() => import('@/pages/client/ClientMessages'));

// About pages - lazy loaded
const About = lazy(() => import('@/pages/about/About'));
const CompanyValues = lazy(() => import('@/pages/about/CompanyValues'));
const FAQ = lazy(() => import('@/pages/about/FAQ'));

// Service pages - lazy loaded with chunk splitting
const ServicePageLoader = lazy(() => import('@/pages/services/ServicePageLoader'));

// Provider pages - lazy loaded
const ProviderDashboard = lazy(() => import('@/pages/provider/ProviderDashboard'));
const ProviderProfile = lazy(() => import('@/pages/provider/ProviderProfile'));
const ProviderSettings = lazy(() => import('@/pages/provider/ProviderSettings'));
const ProviderAvailability = lazy(() => import('@/pages/provider/ProviderAvailability'));
const ProviderBookings = lazy(() => import('@/pages/provider/ProviderBookings'));

// User pages - lazy loaded
const UserProfile = lazy(() => import('@/pages/user/UserProfile'));
const UserBookings = lazy(() => import('@/pages/user/UserBookings'));
const UserInvoices = lazy(() => import('@/pages/user/UserInvoices'));
const UserNotifications = lazy(() => import('@/pages/user/UserNotifications'));

// All service pages are now handled by ServicePageLoader for better code splitting

// Loading component for better UX
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

// Error boundary for lazy loaded components
const LazyErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<PageLoading />}>
      {children}
    </Suspense>
  );
};

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes location={location}>
        {/* Public Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Index />} />
          <Route path="contact" element={<Contact />} />
          <Route path="services" element={<Services />} />
          <Route path="business-solutions" element={<BusinessSolutions />} />
          
          {/* About Routes */}
          <Route path="about" element={<LazyErrorBoundary><About /></LazyErrorBoundary>} />
          <Route path="about/company-values" element={<LazyErrorBoundary><CompanyValues /></LazyErrorBoundary>} />
          <Route path="about/faq" element={<LazyErrorBoundary><FAQ /></LazyErrorBoundary>} />
          
          {/* Dynamic Service Routes - All services handled by ServicePageLoader for better code splitting */}
          <Route path="services/:serviceType" element={<LazyErrorBoundary><ServicePageLoader /></LazyErrorBoundary>} />
          
          {/* Auth Routes */}
          <Route path="login" element={<LazyErrorBoundary><Login /></LazyErrorBoundary>} />
          <Route path="signup" element={<LazyErrorBoundary><Signup /></LazyErrorBoundary>} />
          <Route path="auth/reset-password" element={<LazyErrorBoundary><ResetPassword /></LazyErrorBoundary>} />
          <Route path="forgot-password" element={<LazyErrorBoundary><ResetPassword /></LazyErrorBoundary>} />
          <Route path="verify-provider" element={<LazyErrorBoundary><VerifyProvider /></LazyErrorBoundary>} />
          <Route path="auth/callback" element={<LazyErrorBoundary><AuthCallback /></LazyErrorBoundary>} />
          
          {/* Booking Routes */}
          <Route path="booking/*" element={<LazyErrorBoundary><BookingRoutes /></LazyErrorBoundary>} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Client Routes */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Navigate to="/client/dashboard" replace />} />
          <Route path="dashboard" element={<LazyErrorBoundary><ClientDashboard /></LazyErrorBoundary>} />
          <Route path="bookings" element={<LazyErrorBoundary><ClientBookings /></LazyErrorBoundary>} />
          <Route path="profile-settings" element={<LazyErrorBoundary><ClientProfileSettings /></LazyErrorBoundary>} />
          <Route path="invoices" element={<LazyErrorBoundary><ClientInvoices /></LazyErrorBoundary>} />
          <Route path="messages" element={<LazyErrorBoundary><ClientMessages /></LazyErrorBoundary>} />
        </Route>

        {/* Provider Routes */}
        <Route path="/provider" element={<ProviderLayout />}>
          <Route index element={<Navigate to="/provider/dashboard" replace />} />
          <Route path="dashboard" element={<LazyErrorBoundary><ProviderDashboard /></LazyErrorBoundary>} />
          <Route path="profile" element={<LazyErrorBoundary><ProviderProfile /></LazyErrorBoundary>} />
          <Route path="settings" element={<LazyErrorBoundary><ProviderSettings /></LazyErrorBoundary>} />
          <Route path="availability" element={<LazyErrorBoundary><ProviderAvailability /></LazyErrorBoundary>} />
          <Route path="bookings" element={<LazyErrorBoundary><ProviderBookings /></LazyErrorBoundary>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<LazyErrorBoundary><AdminPanel /></LazyErrorBoundary>} />
          <Route path="analytics" element={<LazyErrorBoundary><Dashboard /></LazyErrorBoundary>} />
          <Route path="bookings" element={<LazyErrorBoundary><AdminBookings /></LazyErrorBoundary>} />
          <Route path="customers" element={<LazyErrorBoundary><AdminCustomers /></LazyErrorBoundary>} />
          <Route path="providers" element={<LazyErrorBoundary><AdminProviders /></LazyErrorBoundary>} />
          <Route path="settings" element={<LazyErrorBoundary><AdminSettings /></LazyErrorBoundary>} />
          <Route path="pending-bookings" element={<LazyErrorBoundary><AdminPendingBookingsPool /></LazyErrorBoundary>} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<RootLayout />}>
          <Route index element={<Navigate to="/user/profile" replace />} />
          <Route path="profile" element={<LazyErrorBoundary><UserProfile /></LazyErrorBoundary>} />
          <Route path="bookings" element={<LazyErrorBoundary><UserBookings /></LazyErrorBoundary>} />
          <Route path="invoices" element={<LazyErrorBoundary><UserInvoices /></LazyErrorBoundary>} />
          <Route path="notifications" element={<LazyErrorBoundary><UserNotifications /></LazyErrorBoundary>} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
