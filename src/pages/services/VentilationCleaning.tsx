
import ServiceLayout from "@/components/services/ServiceLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, AirVent, Shield, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VentilationCleaning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white animate-fadeIn">
                Professional Ventilation Cleaning
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Ensure clean, healthy air circulation with our specialized ventilation system cleaning services. Improve air quality and system efficiency.
              </p>
            </section>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Clean Air Systems
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Professional ventilation cleaning improves air quality, reduces allergens, and increases HVAC system efficiency.
                </p>
                <div className="space-y-4">
                  {[
                    "HVAC duct cleaning and sanitization",
                    "Air vent and register cleaning",
                    "Filter replacement and maintenance",
                    "Exhaust fan cleaning",
                    "Dryer vent cleaning",
                    "Commercial ventilation system maintenance"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                      <Check className="h-5 w-5 text-primary" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Why Choose Our Service?
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: AirVent, text: "Specialized ventilation cleaning equipment" },
                    { icon: Shield, text: "Certified technicians and safety protocols" },
                    { icon: Check, text: "Improved air quality and system efficiency" },
                    { icon: Calendar, text: "Regular maintenance programs available" },
                    { icon: Clock, text: "Minimal disruption to your operations" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                      <item.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Section */}
            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Our Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "System Inspection",
                    description: "Comprehensive assessment of your ventilation system and cleaning requirements."
                  },
                  {
                    title: "Professional Cleaning",
                    description: "Thorough cleaning using specialized equipment and industry-standard techniques."
                  },
                  {
                    title: "System Testing",
                    description: "Post-cleaning verification to ensure optimal airflow and system performance."
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
                Breathe easier with professionally cleaned ventilation systems.
              </p>
              <Button
                onClick={() => navigate('/contact')}
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Schedule Ventilation Cleaning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VentilationCleaning;
