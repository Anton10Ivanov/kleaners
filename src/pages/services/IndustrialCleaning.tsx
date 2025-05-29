
import ServiceLayout from "@/components/services/ServiceLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Industry, Shield, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const IndustrialCleaning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white animate-fadeIn">
                Industrial Cleaning Services
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Specialized cleaning solutions for industrial facilities, warehouses, and manufacturing environments. We ensure compliance with safety and hygiene standards.
              </p>
            </section>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Heavy-Duty Industrial Solutions
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Our industrial cleaning services are designed to handle the unique challenges of manufacturing and industrial environments.
                </p>
                <div className="space-y-4">
                  {[
                    "Warehouse floor cleaning and maintenance",
                    "Industrial equipment cleaning",
                    "High-pressure washing services",
                    "Degreasing and chemical cleaning",
                    "Dust and debris removal",
                    "Safety compliance cleaning"
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
                    { icon: Industry, text: "Specialized industrial cleaning equipment" },
                    { icon: Shield, text: "OSHA compliance and safety protocols" },
                    { icon: Check, text: "Certified hazardous material handling" },
                    { icon: Calendar, text: "Scheduled maintenance programs" },
                    { icon: Clock, text: "24/7 emergency cleaning services" }
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
                    title: "Site Assessment",
                    description: "Comprehensive evaluation of industrial cleaning requirements and safety protocols."
                  },
                  {
                    title: "Custom Cleaning Plan",
                    description: "Tailored approach using appropriate equipment and cleaning agents for your facility."
                  },
                  {
                    title: "Quality Assurance",
                    description: "Post-cleaning inspection ensuring compliance with industry standards."
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
                Keep your industrial facility clean, safe, and compliant.
              </p>
              <Button
                onClick={() => navigate('/contact')}
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Request Industrial Cleaning Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndustrialCleaning;
