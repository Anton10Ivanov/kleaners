
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Scenario item interface
 */
interface ScenarioItem {
  title: string;
  description: string;
}

/**
 * Benefit item interface
 */
interface BenefitItem {
  title: string;
  description: string;
}

/**
 * MoveInOut Service Page
 * 
 * Presents the Move In/Out cleaning service details and booking options
 * 
 * @returns {JSX.Element} Move In/Out service page
 */
const MoveInOut = (): JSX.Element => {
  const navigate = useNavigate();
  
  // Service features
  const serviceFeatures = [
    "Grout & Tile Scrubbing", 
    "Appliance Interiors", 
    "Behind/Under Furniture", 
    "Cabinets/Drawers", 
    "Window Tracks & Frames", 
    "Light Fixtures", 
    "Delicate Surfaces", 
    "Upholstery Care", 
    "Wall Spot Cleaning", 
    "3-Step Disinfection"
  ];
  
  // Benefits of the service
  const benefits: BenefitItem[] = [
    {
      title: "Thoroughness",
      description: "Clean overlooked areas like baseboards, vents, and under appliances"
    }, 
    {
      title: "Time-Saving",
      description: "Let professionals handle labor-intensive tasks"
    }, 
    {
      title: "Healthier Spaces",
      description: "Reduce allergens and bacteria with advanced sanitization"
    }, 
    {
      title: "Customizable",
      description: "Focus on problem areas or add tasks (e.g., curtain dusting)"
    }, 
    {
      title: "Eco-Friendly Options",
      description: "Non-toxic products available upon request"
    }
  ];
  
  // When to use this service
  const scenarios: ScenarioItem[] = [
    {
      title: "Moving In",
      description: "Ensure your new home is spotless and free from previous occupants' dust, dirt, and germs"
    }, 
    {
      title: "Moving Out",
      description: "Leave the property in pristine condition to meet lease agreements or impress buyers"
    }, 
    {
      title: "Post-Construction/Renovation",
      description: "Remove dust and debris after remodeling"
    }, 
    {
      title: "Neglected Spaces",
      description: "Address areas untouched by routine cleaning"
    }, 
    {
      title: "Health Concerns",
      description: "Eliminate allergens, mold, and bacteria for a healthier environment"
    }
  ];
  
  /**
   * Navigate to booking page
   */
  const handleBookNow = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="font-bold mb-4 text-3xl text-zinc-950">
              Move In/Out Service
            </h1>
            <p className="mb-8 text-sm text-zinc-600">
              A deeper cleaning for such times when regular cleaning is just not enough.
            </p>
            <Button 
              onClick={handleBookNow} 
              className="bg-primary hover:bg-primary/90 font-semibold py-[25px] my-0 mx-0 text-center rounded-xl px-[36px]"
              aria-label="Book now for Move In/Out cleaning service"
            >
              Book Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </section>

          {/* When You Need It */}
          <section className="mb-16">
            <h2 className="font-semibold mb-6 text-lg text-zinc-950" id="when-to-book">
              When should you book this?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scenarios.map((scenario, index) => (
                <Card key={index} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">{scenario.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {scenario.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What's Included */}
          <section className="mb-16">
            <h2 className="font-semibold mb-6 text-lg text-zinc-950" id="whats-included">
              What are the usual tasks included?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {serviceFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6" id="benefits">
              Why should you trust us?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6" id="process">
              The process:
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold"
                  aria-hidden="true"
                >
                  1
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Simply open our intuitive Booking estimator and complete the process.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div 
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold"
                  aria-hidden="true"
                >
                  2
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  You receive a booking confirmation E-Mail and a Text message with more details.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div 
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold"
                  aria-hidden="true"
                >
                  3
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Our trained team arrives with professional tools and supplies.
                  Approve the work and settle into a spotless home.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MoveInOut;
