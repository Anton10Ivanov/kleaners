import { lazy, Suspense } from 'react';
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
import Services from '@/pages/Services';
import BusinessSolutions from '@/pages/BusinessSolutions';

// Auth pages
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';
import VerifyProvider from "@/pages/auth/VerifyProvider";

// Booking pages
import BookingRoutes from '@/pages/booking/BookingRoutes';

// Admin pages - lazy loaded for code splitting
const AdminPanel = lazy(() => import('@/pages/admin/AdminPanel'));
const AdminBookings = lazy(() => import('@/pages/admin/AdminBookings').then(m => ({ default: m.AdminBookings })));
const AdminCustomers = lazy(() => import('@/pages/admin/AdminCustomers').then(m => ({ default: m.AdminCustomers })));
const AdminProviders = lazy(() => import('@/pages/admin/AdminProviders').then(m => ({ default: m.AdminProviders })));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings').then(m => ({ default: m.AdminSettings })));
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminPendingBookingsPool = lazy(() => import('./pages/admin/PendingBookingsPool').then(m => ({ default: m.AdminPendingBookingsPool })));

// Client pages - lazy loaded for code splitting
const ClientDashboard = lazy(() => import('@/pages/client/ClientDashboard'));
const ClientBookings = lazy(() => import('@/pages/client/ClientBookings'));
const ClientProfile = lazy(() => import('@/pages/client/ClientProfile'));
const ClientSettings = lazy(() => import('@/pages/client/ClientSettings'));
const ClientInvoices = lazy(() => import('@/pages/client/ClientInvoices'));
const ClientMessages = lazy(() => import('@/pages/client/ClientMessages'));

// About pages - lazy loaded
const About = lazy(() => import('@/pages/about/About'));
const CompanyValues = lazy(() => import('@/pages/about/CompanyValues'));
const FAQ = lazy(() => import('@/pages/about/FAQ'));

// Service pages - lazy loaded for better performance
const HomeCleaning = lazy(() => import('@/pages/services/HomeCleaning'));
const OfficeCleaning = lazy(() => import('@/pages/services/OfficeCleaning'));
const MoveInOut = lazy(() => import('@/pages/services/MoveInOut'));
const WindowCleaning = lazy(() => import('@/pages/services/WindowCleaning'));
const StairwellCleaning = lazy(() => import('@/pages/services/StairwellCleaning'));
const IndustrialCleaning = lazy(() => import('@/pages/services/IndustrialCleaning'));
const IntensiveCleaning = lazy(() => import('@/pages/services/IntensiveCleaning'));
const VentilationCleaning = lazy(() => import('@/pages/services/VentilationCleaning'));
const DisinfectionCleaning = lazy(() => import('@/pages/services/DisinfectionCleaning'));
const ConstructionCleaning = lazy(() => import('@/pages/services/ConstructionCleaning'));
const CareFacilityCleaning = lazy(() => import('@/pages/services/CareFacilityCleaning'));
const TradeFairCleaning = lazy(() => import('@/pages/services/TradeFairCleaning'));
const HoarderCleaning = lazy(() => import('@/pages/services/HoarderCleaning'));
const MultiSurfaceCleaning = lazy(() => import('@/pages/services/MultiSurfaceCleaning'));
const PoolCleaning = lazy(() => import('@/pages/services/PoolCleaning'));
const PetHairRemoval = lazy(() => import('@/pages/services/PetHairRemoval'));
const UndergroundGarageCleaning = lazy(() => import('@/pages/services/UndergroundGarageCleaning'));
const VehicleCleaning = lazy(() => import('@/pages/services/VehicleCleaning'));
const HolidayApartmentCleaning = lazy(() => import('@/pages/services/HolidayApartmentCleaning'));
const GlassCleaningWinterGarden = lazy(() => import('@/pages/services/GlassCleaningWinterGarden'));
const Gardening = lazy(() => import('@/pages/services/Gardening'));
const MedicalPracticeCleaning = lazy(() => import('@/pages/services/MedicalPracticeCleaning'));
const StoneSurfaceCleaning = lazy(() => import('@/pages/services/StoneSurfaceCleaning'));
const PipeCleaning = lazy(() => import('@/pages/services/PipeCleaning'));
const GraffitiRemoval = lazy(() => import('@/pages/services/GraffitiRemoval'));
const RoofCleaning = lazy(() => import('@/pages/services/RoofCleaning'));
const HouseholdClearance = lazy(() => import('@/pages/services/HouseholdClearance'));
const MoldRemoval = lazy(() => import('@/pages/services/MoldRemoval'));
const FacadeCleaning = lazy(() => import('@/pages/services/FacadeCleaning'));
const KindergartenCleaning = lazy(() => import('@/pages/services/KindergartenCleaning'));
const CarpetCleaning = lazy(() => import('@/pages/services/CarpetCleaning'));
const UpholsteryCleaning = lazy(() => import('@/pages/services/UpholsteryCleaning'));
const SidewalkCleaning = lazy(() => import('@/pages/services/SidewalkCleaning'));
const CrimeSceneCleaning = lazy(() => import('@/pages/services/CrimeSceneCleaning'));

// Legal pages
import TermsOfService from '@/pages/legal/TermsOfService';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';

// Provider pages - lazy loaded for code splitting
const ProviderDashboard = lazy(() => import('@/pages/provider/ProviderDashboard'));
const ProviderProfile = lazy(() => import('@/pages/provider/ProviderProfile'));
const ProviderBookings = lazy(() => import('@/pages/provider/ProviderBookings'));
const ProviderSettings = lazy(() => import('@/pages/provider/ProviderSettings'));
const ProviderAvailability = lazy(() => import('@/pages/provider/ProviderAvailability'));
const ProviderMessages = lazy(() => import('@/pages/provider/ProviderMessages'));

function App() {
  const location = useLocation();

  // Effect for setting body classes based on route
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

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Root layout with nested routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-team" element={<Navigate to="/contact?tab=join" replace />} />
          <Route path="/services" element={<Services />} />
          <Route path="/business-solutions" element={<BusinessSolutions />} />
          
          {/* FIXED: Direct service routes that were causing 404s */}
          <Route path="/home-cleaning" element={<Navigate to="/services/home-cleaning" replace />} />
          <Route path="/office-cleaning" element={<Navigate to="/services/office-cleaning" replace />} />
          <Route path="/deep-cleaning" element={<Navigate to="/services/deep-cleaning" replace />} />
          <Route path="/move-in-out" element={<Navigate to="/services/move-in-out" replace />} />
          
          {/* Booking routes */}
          <Route path="/booking/*" element={<BookingRoutes />} />
          
          {/* Auth routes - consolidated (no individual Navbar/Footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<Login />} />
          <Route path="/reset-password" element={<Login />} />
          <Route path="/verify-provider" element={<VerifyProvider />} />
          
          {/* About routes - lazy loaded */}
          <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
          <Route path="/about/values" element={<Suspense fallback={<div>Loading...</div>}><CompanyValues /></Suspense>} />
          <Route path="/about/faq" element={<Suspense fallback={<div>Loading...</div>}><FAQ /></Suspense>} />
          
          {/* Service routes - lazy loaded with Suspense */}
          <Route path="/services/home-cleaning" element={<Suspense fallback={<div>Loading...</div>}><HomeCleaning /></Suspense>} />
          <Route path="/services/office-cleaning" element={<Suspense fallback={<div>Loading...</div>}><OfficeCleaning /></Suspense>} />
          <Route path="/services/move-in-out" element={<Suspense fallback={<div>Loading...</div>}><MoveInOut /></Suspense>} />
          <Route path="/services/window-cleaning" element={<Suspense fallback={<div>Loading...</div>}><WindowCleaning /></Suspense>} />
          <Route path="/services/stairwell-cleaning" element={<Suspense fallback={<div>Loading...</div>}><StairwellCleaning /></Suspense>} />
          <Route path="/services/industrial-cleaning" element={<Suspense fallback={<div>Loading...</div>}><IndustrialCleaning /></Suspense>} />
          <Route path="/services/intensive-cleaning" element={<Suspense fallback={<div>Loading...</div>}><IntensiveCleaning /></Suspense>} />
          <Route path="/services/ventilation-cleaning" element={<Suspense fallback={<div>Loading...</div>}><VentilationCleaning /></Suspense>} />
          <Route path="/services/disinfection-cleaning" element={<Suspense fallback={<div>Loading...</div>}><DisinfectionCleaning /></Suspense>} />
          <Route path="/services/construction-cleaning" element={<Suspense fallback={<div>Loading...</div>}><ConstructionCleaning /></Suspense>} />
          <Route path="/services/care-facility-cleaning" element={<Suspense fallback={<div>Loading...</div>}><CareFacilityCleaning /></Suspense>} />
          <Route path="/services/trade-fair-cleaning" element={<Suspense fallback={<div>Loading...</div>}><TradeFairCleaning /></Suspense>} />
          <Route path="/services/hoarder-cleaning" element={<Suspense fallback={<div>Loading...</div>}><HoarderCleaning /></Suspense>} />
          <Route path="/services/multi-surface-cleaning" element={<Suspense fallback={<div>Loading...</div>}><MultiSurfaceCleaning /></Suspense>} />
          <Route path="/services/pool-cleaning" element={<Suspense fallback={<div>Loading...</div>}><PoolCleaning /></Suspense>} />
          <Route path="/services/pet-hair-removal" element={<Suspense fallback={<div>Loading...</div>}><PetHairRemoval /></Suspense>} />
          <Route path="/services/underground-garage-cleaning" element={<Suspense fallback={<div>Loading...</div>}><UndergroundGarageCleaning /></Suspense>} />
          <Route path="/services/vehicle-cleaning" element={<Suspense fallback={<div>Loading...</div>}><VehicleCleaning /></Suspense>} />
          <Route path="/services/holiday-apartment-cleaning" element={<Suspense fallback={<div>Loading...</div>}><HolidayApartmentCleaning /></Suspense>} />
          <Route path="/services/glass-cleaning-winter-garden" element={<Suspense fallback={<div>Loading...</div>}><GlassCleaningWinterGarden /></Suspense>} />
          <Route path="/services/gardening" element={<Suspense fallback={<div>Loading...</div>}><Gardening /></Suspense>} />
          <Route path="/services/medical-practice-cleaning" element={<Suspense fallback={<div>Loading...</div>}><MedicalPracticeCleaning /></Suspense>} />
          <Route path="/services/stone-surface-cleaning" element={<Suspense fallback={<div>Loading...</div>}><StoneSurfaceCleaning /></Suspense>} />
          <Route path="/services/pipe-cleaning" element={<Suspense fallback={<div>Loading...</div>}><PipeCleaning /></Suspense>} />
          <Route path="/services/graffiti-removal" element={<Suspense fallback={<div>Loading...</div>}><GraffitiRemoval /></Suspense>} />
          <Route path="/services/roof-cleaning" element={<Suspense fallback={<div>Loading...</div>}><RoofCleaning /></Suspense>} />
          <Route path="/services/household-clearance" element={<Suspense fallback={<div>Loading...</div>}><HouseholdClearance /></Suspense>} />
          <Route path="/services/mold-removal" element={<Suspense fallback={<div>Loading...</div>}><MoldRemoval /></Suspense>} />
          <Route path="/services/facade-cleaning" element={<Suspense fallback={<div>Loading...</div>}><FacadeCleaning /></Suspense>} />
          <Route path="/services/kindergarten-cleaning" element={<Suspense fallback={<div>Loading...</div>}><KindergartenCleaning /></Suspense>} />
          <Route path="/services/carpet-cleaning" element={<Suspense fallback={<div>Loading...</div>}><CarpetCleaning /></Suspense>} />
          <Route path="/services/upholstery-cleaning" element={<Suspense fallback={<div>Loading...</div>}><UpholsteryCleaning /></Suspense>} />
          <Route path="/services/sidewalk-cleaning" element={<Suspense fallback={<div>Loading...</div>}><SidewalkCleaning /></Suspense>} />
          <Route path="/services/crime-scene-cleaning" element={<Suspense fallback={<div>Loading...</div>}><CrimeSceneCleaning /></Suspense>} />
          
          {/* Legacy redirects for old service URLs */}
          <Route path="/services/regular-cleaning" element={<Navigate to="/services/home-cleaning" replace />} />
          <Route path="/services/business-cleaning" element={<Navigate to="/services/office-cleaning" replace />} />
          
          {/* Legal routes */}
          <Route path="/legal/terms" element={<TermsOfService />} />
          <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        </Route>

        {/* Admin routes - lazy loaded with Suspense */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Suspense fallback={<div>Loading...</div>}><AdminPanel /></Suspense>} />
          <Route path="analytics" element={<Suspense fallback={<div>Loading...</div>}><Dashboard /></Suspense>} />
          <Route path="bookings" element={<Suspense fallback={<div>Loading...</div>}><AdminBookings /></Suspense>} />
          <Route path="pending-pool" element={<Suspense fallback={<div>Loading...</div>}><AdminPendingBookingsPool /></Suspense>} />
          <Route path="customers" element={<Suspense fallback={<div>Loading...</div>}><AdminCustomers /></Suspense>} />
          <Route path="providers" element={<Suspense fallback={<div>Loading...</div>}><AdminProviders /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<div>Loading...</div>}><AdminSettings /></Suspense>} />
        </Route>
        
        {/* Client routes - lazy loaded with Suspense */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<Suspense fallback={<div>Loading...</div>}><ClientDashboard /></Suspense>} />
          <Route path="bookings" element={<Suspense fallback={<div>Loading...</div>}><ClientBookings /></Suspense>} />
          <Route path="messages" element={<Suspense fallback={<div>Loading...</div>}><ClientMessages /></Suspense>} />
          <Route path="invoices" element={<Suspense fallback={<div>Loading...</div>}><ClientInvoices /></Suspense>} />
          <Route path="profile" element={<Suspense fallback={<div>Loading...</div>}><ClientProfile /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<div>Loading...</div>}><ClientSettings /></Suspense>} />
        </Route>
        
        {/* Provider routes - lazy loaded with Suspense */}
        <Route path="/provider" element={<ProviderLayout />}>
          <Route index element={<Suspense fallback={<div>Loading...</div>}><ProviderDashboard /></Suspense>} />
          <Route path="profile" element={<Suspense fallback={<div>Loading...</div>}><ProviderProfile /></Suspense>} />
          <Route path="bookings" element={<Suspense fallback={<div>Loading...</div>}><ProviderBookings /></Suspense>} />
          <Route path="messages" element={<Suspense fallback={<div>Loading...</div>}><ProviderMessages /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<div>Loading...</div>}><ProviderSettings /></Suspense>} />
          <Route path="availability" element={<Suspense fallback={<div>Loading...</div>}><ProviderAvailability /></Suspense>} />
          <Route path="pending-pool" element={<Suspense fallback={<div>Loading...</div>}><AdminPendingBookingsPool /></Suspense>} />
        </Route>

        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;