
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusinessCleaning = () => {
  const navigate = useNavigate();

  const cleaningServices = [
    "Workstation Cleaning",
    "Common Area Maintenance",
    "Restroom Cleaning & Sanitization",
    "Floor Care",
    "Trash & Recycling Management",
    "Kitchen & Breakroom Cleaning",
    "High-Touch Surface Disinfection",
    "Glass & Window Spot Cleaning"
  ];

  const benefits = [
    {
      title: "Consistent & Reliable",
      description: "Scheduled cleaning plans keep your workplace fresh at all times"
    },
    {
      title: "Customizable Plans",
      description: "Choose daily, weekly, or custom cleaning frequencies based on your needs"
    },
    {
      title: "Trained Professionals",
      description: "Our cleaning staff is skilled in handling office and commercial spaces efficiently"
    },
    {
      title: "Discreet & Non-Disruptive",
      description: "We work around your business hours to avoid interruptions"
    },
    {
      title: "Eco-Friendly Options",
      description: "We offer environmentally friendly cleaning products upon request"
    }
  ];

  const reasons = [
    {
      title: "Maintain a Professional Appearance",
      description: "A clean workplace boosts your company's image and reassures clients and visitors"
    },
    {
      title: "Improve Employee Productivity",
      description: "A tidy, organized space reduces distractions and creates a healthier, more comfortable work environment"
    },
    {
      title: "Ensure Hygiene & Reduce Sick Days",
      description: "Regular disinfection of shared spaces and high-touch surfaces helps prevent the spread of germs"
    },
    {
      title: "Comply with Health & Safety Standards",
      description: "Offices, retail spaces, and commercial properties must meet cleanliness regulations"
    },
    {
      title: "Save Time & Resources",
      description: "Instead of relying on employees to handle cleaning, a professional service allows them to focus on their work"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Business Cleaning Service
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              A Business Cleaning Service ensures that your office or commercial space remains consistently clean, presentable, and hygienic. Regular cleaning contributes to a productive work environment, enhances professionalism, and helps maintain a positive impression for employees and clients alike.
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-primary hover:bg-primary/90"
            >
              Price Options <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Why You Need It */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Why Do You Need a Regular Business Cleaning Service?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-2">{reason.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* What's Included */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              What's Included in Our Business Cleaning Service?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We provide a thorough and consistent cleaning routine to keep your business space fresh and welcoming:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {cleaningServices.map((service, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{service}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Why Choose Our Regular Business Cleaning Service?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">1</div>
                <p className="text-gray-700 dark:text-gray-300">Enter details about your place in our Booking estimator</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">2</div>
                <p className="text-gray-700 dark:text-gray-300">Set a Cleaning Schedule – Select the best time and frequency for your business needs</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">3</div>
                <p className="text-gray-700 dark:text-gray-300">Professional Cleaning – Our trained team arrives and ensures a spotless workspace</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">4</div>
                <p className="text-gray-700 dark:text-gray-300">Ongoing Maintenance – Keep your space fresh with recurring service</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessCleaning;
