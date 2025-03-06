
import ServiceLayout from "@/components/services/ServiceLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Tool, Shield, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PostConstructionCleaning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white animate-fadeIn">
                Post-Construction Cleaning
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Professional cleaning services for newly constructed or renovated spaces, ensuring your property is spotless and ready for use.
              </p>
            </section>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Comprehensive Clean-Up
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  After construction or renovation work, our specialized team ensures your space is thoroughly cleaned and ready for use.
                </p>
                <div className="space-y-4">
                  {[
                    "Removal of construction dust and debris",
                    "Deep cleaning of all surfaces",
                    "Window and glass cleaning",
                    "Floor cleaning and polishing",
                    "HVAC vent cleaning",
                    "Paint overspray removal"
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
                    { icon: Tool, text: "Specialized equipment for construction cleanup" },
                    { icon: Shield, text: "Trained professionals with safety protocols" },
                    { icon: Check, text: "Detailed cleaning checklist tailored for construction" },
                    { icon: Calendar, text: "Flexible scheduling around your project timeline" },
                    { icon: Clock, text: "Fast turnaround to minimize project delays" }
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
                    title: "Initial Assessment",
                    description: "We assess the construction site to determine cleaning requirements."
                  },
                  {
                    title: "Customized Plan",
                    description: "We create a cleaning plan specific to your construction project."
                  },
                  {
                    title: "Professional Execution",
                    description: "Our team executes the plan with specialized equipment and techniques."
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
                Ready to transform your construction site into a clean, move-in ready space?
              </p>
              <Button
                onClick={() => navigate('/contact')}
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostConstructionCleaning;
