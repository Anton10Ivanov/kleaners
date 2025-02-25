
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 mt-16">
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
