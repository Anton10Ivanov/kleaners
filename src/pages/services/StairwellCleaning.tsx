
import ServiceLayout from "@/components/services/ServiceLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Navigation, Shield, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StairwellCleaning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white animate-fadeIn">
                Professional Stairwell Cleaning
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Maintain safe, clean, and welcoming stairwells for your building. Our specialized cleaning services ensure high-traffic areas remain spotless and hygienic.
              </p>
            </section>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Comprehensive Stairwell Maintenance
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Regular stairwell cleaning ensures safety, hygiene, and a positive first impression for residents and visitors.
                </p>
                <div className="space-y-4">
                  {[
                    "Step and handrail sanitization",
                    "Wall and surface cleaning",
                    "Floor mopping and maintenance",
                    "Window and glass cleaning",
                    "Lighting fixture cleaning",
                    "Trash removal and disposal"
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
                    { icon: Navigation, text: "Specialized equipment for multi-level cleaning" },
                    { icon: Shield, text: "Safety-focused cleaning procedures" },
                    { icon: Check, text: "Regular maintenance schedules available" },
                    { icon: Calendar, text: "Flexible timing to minimize disruption" },
                    { icon: Clock, text: "Efficient service for high-traffic areas" }
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
                    title: "Safety Assessment",
                    description: "We evaluate the stairwell layout and identify cleaning priorities and safety considerations."
                  },
                  {
                    title: "Top-Down Cleaning",
                    description: "Systematic cleaning from top to bottom, ensuring thorough coverage of all surfaces."
                  },
                  {
                    title: "Final Inspection",
                    description: "Quality check to ensure all areas meet our cleanliness and safety standards."
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
                Keep your stairwells safe and welcoming for everyone.
              </p>
              <Button
                onClick={() => navigate('/contact')}
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Schedule Stairwell Cleaning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StairwellCleaning;
