
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingChatButton from "./chat/FloatingChatButton";
import CookiePolicy from "./CookiePolicy";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-theme-lightblue dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FloatingChatButton />
      <CookiePolicy />
      <Footer />
    </div>
  );
};

export default RootLayout;
