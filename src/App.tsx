
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider } from "@/context/AdminContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminProviders } from "@/pages/admin/AdminProviders";
import { AdminBookings } from "@/pages/admin/AdminBookings";
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <AdminProvider>
        <Router>
          <Routes>
            {/* Redirect from / to /admin/dashboard */}
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Admin login */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
            <Route path="/admin/providers" element={<AdminLayout><AdminProviders /></AdminLayout>} />
            
            {/* Catch-all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </Router>
        <Toaster />
      </AdminProvider>
    </ThemeProvider>
  );
};

export default App;
