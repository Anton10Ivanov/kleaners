import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const MoveInOut = () => {
  const navigate = useNavigate();
  const serviceFeatures = ["Grout & Tile Scrubbing", "Appliance Interiors", "Behind/Under Furniture", "Cabinets/Drawers", "Window Tracks & Frames", "Light Fixtures", "Delicate Surfaces", "Upholstery Care", "Wall Spot Cleaning", "3-Step Disinfection"];
  const benefits = [{
    title: "Thoroughness",
    description: "Clean overlooked areas like baseboards, vents, and under appliances"
  }, {
    title: "Time-Saving",
    description: "Let professionals handle labor-intensive tasks"
  }, {
    title: "Healthier Spaces",
    description: "Reduce allergens and bacteria with advanced sanitization"
  }, {
    title: "Customizable",
    description: "Focus on problem areas or add tasks (e.g., curtain dusting)"
  }, {
    title: "Eco-Friendly Options",
    description: "Non-toxic products available upon request"
  }];
  const scenarios = [{
    title: "Moving In",
    description: "Ensure your new home is spotless and free from previous occupants' dust, dirt, and germs"
  }, {
    title: "Moving Out",
    description: "Leave the property in pristine condition to meet lease agreements or impress buyers"
  }, {
    title: "Post-Construction/Renovation",
    description: "Remove dust and debris after remodeling"
  }, {
    title: "Neglected Spaces",
    description: "Address areas untouched by routine cleaning"
  }, {
    title: "Health Concerns",
    description: "Eliminate allergens, mold, and bacteria for a healthier environment"
  }];
  return <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-bold mb-4 text-3xl text-zinc-950">Move In/Out Service</h1>
            <p className="mb-8 text-sm text-zinc-600">A deeper cleaning for such times when regular cleaning is just not enough.</p>
            <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 font-semibold py-[25px] my-0 mx-0 text-center rounded-xl px-[36px]">
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Service Difference */}
          

          {/* When You Need It */}
          <section className="mb-16">
            <h2 className="font-semibold mb-6 text-lg text-zinc-950">When should you book this?</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {scenarios.map((scenario, index) => <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-2">{scenario.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {scenario.description}
                  </p>
                </div>)}
            </div>
          </section>

          {/* What's Included */}
          <section className="mb-16">
            <h2 className="font-semibold mb-6 text-lg text-zinc-950">What are the usual tasks included?</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {serviceFeatures.map((feature, index) => <div key={index} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>)}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Why should you trust us?</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => <div key={index} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </div>)}
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">The process:</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">1</div>
                <p className="text-gray-700 dark:text-gray-300">Simply open our intuitive Booking estimator and complete the process.</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">2</div>
                <p className="text-gray-700 dark:text-gray-300">You recieve a booking confimation E-Mail and a Text message with more details. Our trained team arrives with professional tools and supplies</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">3</div>
                <p className="text-gray-700 dark:text-gray-300">Our trained team arrives with professional tools and supplies
Approve the work and settle into a spotless home</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>;
};
export default MoveInOut;