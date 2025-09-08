
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingChatButton from "./chat/FloatingChatButton";
import CookiePolicy from "./CookiePolicy";
import HeroCTA from "./HeroCTA";
import { useLocation } from "react-router-dom";
import { NavigationProvider } from "./navbar/context/NavigationContext";
import { navItems } from "./navbar/navigationData";

const RootLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <NavigationProvider navItems={navItems}>
      <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
        <Navbar />
        <main className="flex-grow w-full">
          {/* Removed pt-16 to eliminate gap between navbar and content */}
          <Outlet />
          {isHomePage && <HeroCTA />}
        </main>
        <FloatingChatButton />
        <CookiePolicy />
        <Footer />
      </div>
    </NavigationProvider>
  );
};

export default RootLayout;
