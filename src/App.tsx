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
import JoinTeam from '@/pages/JoinTeam';
import Services from '@/pages/Services';

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
          <Route path="/join-team" element={<JoinTeam />} />
          <Route path="/services" element={<Services />} />
          
          {/* Auth routes - consolidated */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<Login />} />
          <Route path="/reset-password" element={<Login />} />
          <Route path="/verify-provider" element={<VerifyProvider />} />
          
          {/* About routes */}
          <Route path="/about/values" element={<CompanyValues />} />
          <Route path="/about/faq" element={<FAQ />} />
          
          {/* Service routes - updated paths */}
          <Route path="/services/home-cleaning" element={<HomeCleaning />} />
          <Route path="/services/office-cleaning" element={<OfficeCleaning />} />
          <Route path="/services/move-in-out" element={<MoveInOut />} />
          
          {/* Redirect old service URLs to new ones */}
          <Route path="/services/regular-cleaning" element={<Navigate to="/services/home-cleaning" replace />} />
          <Route path="/services/business-cleaning" element={<Navigate to="/services/office-cleaning" replace />} />
          
          {/* ... keep existing code (other service routes) */}
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
