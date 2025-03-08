
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingChatButton from "./chat/FloatingChatButton";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FloatingChatButton />
      <Footer />
    </div>
  );
};

export default RootLayout;
