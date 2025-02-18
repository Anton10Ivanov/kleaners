
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Index from "./pages/Index";
import Services from "./pages/Services";
import RegularCleaning from "./pages/services/RegularCleaning";
import MoveInOut from "./pages/services/MoveInOut";
import BusinessCleaning from "./pages/services/BusinessCleaning";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/regular-cleaning" element={<RegularCleaning />} />
              <Route path="/services/move-in-out" element={<MoveInOut />} />
              <Route path="/services/business-cleaning" element={<BusinessCleaning />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
