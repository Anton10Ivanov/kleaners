
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Euro, MapPin, Calendar, Star, X } from "lucide-react";

const RegularCleaning = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white animate-fadeIn">
                Regular Cleaning Service
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                At Kleaners.de, we know your time is valuable. That's why our Regular Cleaning Service is designed for busy individuals and families who want a clean, comfortable home without the hassle.
              </p>
            </section>

            {/* Why Choose Us Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Why Choose Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Flexibility Without Compromise</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We don't lock you into rigid packages based on the size of your home. Instead, our booking form lets you estimate the cleaning time needed for your property.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Transparent Pricing</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Unlike most companies, we offer fixed-price services for added peace of mind. No hidden fees, no surprises.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Local Professionals</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Our cleaners live in your area, thanks to our postal code-based system. This means no extra travel costs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* What's Included Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">What's Included?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Dusting and wiping all surfaces",
                  "Vacuuming all floors and carpets",
                  "Mopping all hard floors",
                  "Bathroom cleaning and sanitization",
                  "Kitchen cleaning and organization",
                  "Making beds and changing linens",
                  "Empty trash bins and replace bags",
                  "Interior window cleaning"
                ].map((task, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-gray-700 dark:text-gray-300">{task}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Advantages Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Our Unique Advantages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: MapPin, text: "No Travel Fees: Our cleaners are local" },
                  { icon: Euro, text: "Fixed Pricing: Know exactly what you're paying" },
                  { icon: Calendar, text: "Customizable Service: Adjust cleaning scope" },
                  { icon: Clock, text: "Mon-Sat Support: Always here to help" },
                  { icon: X, text: "No Contracts: Cancel anytime" },
                  { icon: Star, text: "95% Success Rate: Exceptional results" },
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <advantage.icon className="h-5 w-5 text-primary mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">{advantage.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* How It Works Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Book Online",
                    description: "Use our booking form to estimate cleaning time and schedule your service."
                  },
                  {
                    title: "Meet Your Cleaner",
                    description: "Discuss your needs and adjust the scope of work as needed."
                  },
                  {
                    title: "Enjoy a Spotless Home",
                    description: "Sit back, relax, and let us handle the rest."
                  }
                ].map((step, index) => (
                  <Card key={index} className="relative overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Need something specific? Customize your cleaning plan directly with your cleaner or through our user-friendly app.
              </p>
              <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Book Your Cleaning
              </button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegularCleaning;
