
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
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
      <Navbar />
      <main className="flex-grow w-full">
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
