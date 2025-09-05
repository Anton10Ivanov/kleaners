
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

<<<<<<< HEAD
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
const DeepCleaning = lazy(() => import('@/pages/services/DeepCleaning'));
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
=======
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
import About from '@/pages/about/About';
import CompanyValues from '@/pages/about/CompanyValues';
import FAQ from '@/pages/about/FAQ';

// Service pages - updated imports
import HomeCleaning from '@/pages/services/HomeCleaning';
import OfficeCleaning from '@/pages/services/OfficeCleaning';
import MoveInOut from '@/pages/services/MoveInOut';
import WindowCleaning from '@/pages/services/WindowCleaning';
import StairwellCleaning from '@/pages/services/StairwellCleaning';
import IndustrialCleaning from '@/pages/services/IndustrialCleaning';
import IntensiveCleaning from '@/pages/services/IntensiveCleaning';
import VentilationCleaning from '@/pages/services/VentilationCleaning';
import DisinfectionCleaning from '@/pages/services/DisinfectionCleaning';
import ConstructionCleaning from '@/pages/services/ConstructionCleaning';
import CareFacilityCleaning from '@/pages/services/CareFacilityCleaning';
import TradeFairCleaning from '@/pages/services/TradeFairCleaning';
import HoarderCleaning from '@/pages/services/HoarderCleaning';
import MultiSurfaceCleaning from '@/pages/services/MultiSurfaceCleaning';
import PoolCleaning from '@/pages/services/PoolCleaning';
import PetHairRemoval from '@/pages/services/PetHairRemoval';
import UndergroundGarageCleaning from '@/pages/services/UndergroundGarageCleaning';
import VehicleCleaning from '@/pages/services/VehicleCleaning';
import HolidayApartmentCleaning from '@/pages/services/HolidayApartmentCleaning';
import GlassCleaningWinterGarden from '@/pages/services/GlassCleaningWinterGarden';
import Gardening from '@/pages/services/Gardening';
import MedicalPracticeCleaning from '@/pages/services/MedicalPracticeCleaning';
import StoneSurfaceCleaning from '@/pages/services/StoneSurfaceCleaning';
import PipeCleaning from '@/pages/services/PipeCleaning';
import GraffitiRemoval from '@/pages/services/GraffitiRemoval';
import RoofCleaning from '@/pages/services/RoofCleaning';
import HouseholdClearance from '@/pages/services/HouseholdClearance';
import MoldRemoval from '@/pages/services/MoldRemoval';
import FacadeCleaning from '@/pages/services/FacadeCleaning';
import KindergartenCleaning from '@/pages/services/KindergartenCleaning';
import CarpetCleaning from '@/pages/services/CarpetCleaning';
import UpholsteryCleaning from '@/pages/services/UpholsteryCleaning';
import SidewalkCleaning from '@/pages/services/SidewalkCleaning';
import CrimeSceneCleaning from '@/pages/services/CrimeSceneCleaning';
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf

// Legal pages
import TermsOfService from '@/pages/legal/TermsOfService';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';

<<<<<<< HEAD
// Provider pages - lazy loaded for code splitting
const ProviderDashboard = lazy(() => import('@/pages/provider/ProviderDashboard'));
const ProviderProfile = lazy(() => import('@/pages/provider/ProviderProfile'));
const ProviderBookings = lazy(() => import('@/pages/provider/ProviderBookings'));
const ProviderSettings = lazy(() => import('@/pages/provider/ProviderSettings'));
const ProviderAvailability = lazy(() => import('@/pages/provider/ProviderAvailability'));
const ProviderMessages = lazy(() => import('@/pages/provider/ProviderMessages'));
=======
// Provider pages
import ProviderDashboard from '@/pages/provider/ProviderDashboard';
import ProviderProfile from '@/pages/provider/ProviderProfile';
import ProviderBookings from '@/pages/provider/ProviderBookings';
import ProviderSettings from '@/pages/provider/ProviderSettings';
import ProviderAvailability from '@/pages/provider/ProviderAvailability';
import ProviderMessages from '@/pages/provider/ProviderMessages';
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf

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
          
<<<<<<< HEAD
          {/* About routes - lazy loaded */}
          <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
          <Route path="/about/values" element={<Suspense fallback={<div>Loading...</div>}><CompanyValues /></Suspense>} />
          <Route path="/about/faq" element={<Suspense fallback={<div>Loading...</div>}><FAQ /></Suspense>} />
          
          {/* Service routes - lazy loaded with Suspense */}
          <Route path="/services/home-cleaning" element={<Suspense fallback={<div>Loading...</div>}><HomeCleaning /></Suspense>} />
          <Route path="/services/deep-cleaning" element={<Suspense fallback={<div>Loading...</div>}><DeepCleaning /></Suspense>} />
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
=======
          {/* About routes */}
          <Route path="/about" element={<About />} />
          <Route path="/about/values" element={<CompanyValues />} />
          <Route path="/about/faq" element={<FAQ />} />
          
          {/* Service routes - consolidated */}
          <Route path="/services/home-cleaning" element={<HomeCleaning />} />
          <Route path="/services/office-cleaning" element={<OfficeCleaning />} />
          <Route path="/services/move-in-out" element={<MoveInOut />} />
          <Route path="/services/window-cleaning" element={<WindowCleaning />} />
          <Route path="/services/stairwell-cleaning" element={<StairwellCleaning />} />
          <Route path="/services/industrial-cleaning" element={<IndustrialCleaning />} />
          <Route path="/services/intensive-cleaning" element={<IntensiveCleaning />} />
          <Route path="/services/ventilation-cleaning" element={<VentilationCleaning />} />
          <Route path="/services/disinfection-cleaning" element={<DisinfectionCleaning />} />
          <Route path="/services/construction-cleaning" element={<ConstructionCleaning />} />
          <Route path="/services/care-facility-cleaning" element={<CareFacilityCleaning />} />
          <Route path="/services/trade-fair-cleaning" element={<TradeFairCleaning />} />
          <Route path="/services/hoarder-cleaning" element={<HoarderCleaning />} />
          <Route path="/services/multi-surface-cleaning" element={<MultiSurfaceCleaning />} />
          <Route path="/services/pool-cleaning" element={<PoolCleaning />} />
          <Route path="/services/pet-hair-removal" element={<PetHairRemoval />} />
          <Route path="/services/underground-garage-cleaning" element={<UndergroundGarageCleaning />} />
          <Route path="/services/vehicle-cleaning" element={<VehicleCleaning />} />
          <Route path="/services/holiday-apartment-cleaning" element={<HolidayApartmentCleaning />} />
          <Route path="/services/glass-cleaning-winter-garden" element={<GlassCleaningWinterGarden />} />
          <Route path="/services/gardening" element={<Gardening />} />
          <Route path="/services/medical-practice-cleaning" element={<MedicalPracticeCleaning />} />
          <Route path="/services/stone-surface-cleaning" element={<StoneSurfaceCleaning />} />
          <Route path="/services/pipe-cleaning" element={<PipeCleaning />} />
          <Route path="/services/graffiti-removal" element={<GraffitiRemoval />} />
          <Route path="/services/roof-cleaning" element={<RoofCleaning />} />
          <Route path="/services/household-clearance" element={<HouseholdClearance />} />
          <Route path="/services/mold-removal" element={<MoldRemoval />} />
          <Route path="/services/facade-cleaning" element={<FacadeCleaning />} />
          <Route path="/services/kindergarten-cleaning" element={<KindergartenCleaning />} />
          <Route path="/services/carpet-cleaning" element={<CarpetCleaning />} />
          <Route path="/services/upholstery-cleaning" element={<UpholsteryCleaning />} />
          <Route path="/services/sidewalk-cleaning" element={<SidewalkCleaning />} />
          <Route path="/services/crime-scene-cleaning" element={<CrimeSceneCleaning />} />
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
          
          {/* Legacy redirects for old service URLs */}
          <Route path="/services/regular-cleaning" element={<Navigate to="/services/home-cleaning" replace />} />
          <Route path="/services/business-cleaning" element={<Navigate to="/services/office-cleaning" replace />} />
          
          {/* Legal routes */}
          <Route path="/legal/terms" element={<TermsOfService />} />
          <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        </Route>

<<<<<<< HEAD
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
=======
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
        
        {/* Client routes - cleaned up duplicates */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="bookings" element={<ClientBookings />} />
          <Route path="messages" element={<ClientMessages />} />
          <Route path="invoices" element={<ClientInvoices />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="settings" element={<ClientSettings />} />
        </Route>
        
        {/* Provider routes */}
        <Route path="/provider" element={<ProviderLayout />}>
          <Route index element={<ProviderDashboard />} />
          <Route path="profile" element={<ProviderProfile />} />
          <Route path="bookings" element={<ProviderBookings />} />
          <Route path="messages" element={<ProviderMessages />} />
          <Route path="settings" element={<ProviderSettings />} />
          <Route path="availability" element={<ProviderAvailability />} />
          <Route path="pending-pool" element={<AdminPendingBookingsPool />} />
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
        </Route>

        {/* Legacy redirects - cleaned up */}
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
