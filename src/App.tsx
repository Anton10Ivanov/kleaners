
import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
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
        <Route path="/legal/terms" element={<TermsOfService />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
