
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Index from "./pages/Index";
import RegularCleaning from "./pages/services/RegularCleaning";
import BusinessCleaning from "./pages/services/BusinessCleaning";
import MoveInOut from "./pages/services/MoveInOut";
import PostConstructionCleaning from "./pages/services/PostConstructionCleaning";
import Contact from "./pages/Contact";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/about/FAQ";
import CompanyValues from "./pages/about/CompanyValues";
import { UserLayout } from "./components/user/UserLayout";
import UserBookings from "./pages/user/UserBookings";
import { UserProfile } from "./pages/user/UserProfile";
import UserSettings from "./pages/user/UserSettings";
import { AdminBookings } from "./pages/admin/AdminBookings";
import { AdminCustomers } from "./pages/admin/AdminCustomers";
import { AdminProviders } from "./pages/admin/AdminProviders";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminPanel } from "./pages/admin/AdminPanel";
import JoinTeam from "./pages/JoinTeam";
import { UserInvoices } from "./pages/user/UserInvoices";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Index />} />
        <Route path="/services/regular-cleaning" element={<RegularCleaning />} />
        <Route path="/services/business-cleaning" element={<BusinessCleaning />} />
        <Route path="/services/move-in-out" element={<MoveInOut />} />
        <Route path="/services/post-construction-cleaning" element={<PostConstructionCleaning />} />
        <Route path="/about/faq" element={<FAQ />} />
        <Route path="/about/values" element={<CompanyValues />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join-team" element={<JoinTeam />} />
        <Route path="/legal/terms" element={<TermsOfService />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      
      {/* Admin routes with simplified structure */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPanel />} /> {/* Single entry point for admin */}
        <Route path="dashboard" element={<AdminDashboard />} /> {/* Statistics and overview */}
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="providers" element={<AdminProviders />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      
      {/* User routes */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserBookings />} />
        <Route path="bookings" element={<UserBookings />} />
        <Route path="invoices" element={<UserInvoices />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
