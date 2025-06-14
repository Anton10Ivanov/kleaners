
import UnifiedNavbar from "./navbar/UnifiedNavbar";
import Footer from "./Footer";
import FloatingChatButton from "./chat/FloatingChatButton";
import CookiePolicy from "./CookiePolicy";
import HeroCTA from "./HeroCTA";
import { useLocation } from "react-router-dom";

const RootLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-theme-lightblue dark:bg-gray-900 transition-colors duration-300">
      <UnifiedNavbar />
      <main className="flex-grow w-full pt-16 sm:pt-16">
        {/* pt-16 ensures homepage elements are pushed below the navbar (64px) */}
        <Outlet />
        {isHomePage && <HeroCTA />}
      </main>
      <FloatingChatButton />
      <CookiePolicy />
      <Footer />
    </div>
  );
};

export default RootLayout;

