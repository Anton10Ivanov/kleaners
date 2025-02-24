
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const Login = () => {
  const [isResetMode, setIsResetMode] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 mt-16">
        {isResetMode ? (
          <ResetPasswordForm onBackToLogin={() => setIsResetMode(false)} />
        ) : (
          <LoginForm onResetMode={() => setIsResetMode(true)} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
