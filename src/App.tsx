
import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import RootLayout from '@/components/RootLayout';
import UserLayout from '@/components/user/UserLayout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';

// Import pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Contact from '@/pages/Contact';
import JoinTeam from '@/pages/JoinTeam';

// Admin pages
import AdminHome from '@/pages/admin/AdminHome';
import AdminLayout from '@/components/admin/AdminLayout';

// User pages
import UserDashboard from '@/pages/user/UserDashboard';
import UserBookings from '@/pages/user/UserBookings';
import UserProfile from '@/pages/user/UserProfile';
import UserInvoices from '@/pages/user/UserInvoices';
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
import ProviderProfile from '@/pages/provider/ProviderProfile';
import ProviderLayout from '@/components/provider/ProviderLayout';
import ProviderBookings from '@/pages/provider/ProviderBookings';
import ProviderSettings from '@/pages/provider/ProviderSettings';
import ProviderAvailability from '@/pages/provider/ProviderAvailability';
import ProviderMessages from '@/pages/provider/ProviderMessages';

// Create a Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const location = useLocation();

  // Set body class based on route for styling purposes
  const path = location.pathname.split('/')[1] || 'root';
  document.body.className = ''; // Clear previous classes
  document.body.classList.add(`${path}-route`);

  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.className = '';
    if (['admin', 'user', 'provider'].includes(path)) {
      rootElement.classList.add('admin-panel-container');
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/join-team" element={<JoinTeam />} />
              
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              
              <Route path="/about/values" element={<CompanyValues />} />
              <Route path="/about/faq" element={<FAQ />} />
              
              <Route path="/services/regular-cleaning" element={<RegularCleaning />} />
              <Route path="/services/business-cleaning" element={<BusinessCleaning />} />
              <Route path="/services/move-in-out" element={<MoveInOut />} />
              <Route path="/services/post-construction-cleaning" element={<PostConstructionCleaning />} />
              
              <Route path="/legal/terms" element={<TermsOfService />} />
              <Route path="/legal/privacy" element={<PrivacyPolicy />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              {/* Removed empty routes */}
            </Route>
            
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="bookings" element={<UserBookings />} />
              <Route path="messages" element={<UserMessages />} />
              <Route path="invoices" element={<UserInvoices />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>
            
            <Route path="/provider" element={<ProviderLayout />}>
              <Route index element={<ProviderProfile />} />
              <Route path="profile" element={<ProviderProfile />} />
              <Route path="bookings" element={<ProviderBookings />} />
              <Route path="messages" element={<ProviderMessages />} />
              <Route path="settings" element={<ProviderSettings />} />
              <Route path="availability" element={<ProviderAvailability />} />
            </Route>
          </Routes>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
