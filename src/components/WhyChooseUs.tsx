import { MapPin, Euro, Settings, Calendar, X, Star } from "lucide-react";

const WhyChooseUs = () => {
  const advantages = [{
    icon: MapPin,
    title: "No Travel Fees",
    description: "Our cleaners are local"
  }, {
    icon: Euro,
    title: "Fixed Pricing",
    description: "Know exactly what you're paying"
  }, {
    icon: Settings,
    title: "Customizable Service",
    description: "Adjust cleaning scope"
  }, {
    icon: Calendar,
    title: "Mon-Sat Support",
    description: "Always here to help"
  }, {
    icon: X,
    title: "No Contracts",
    description: "Cancel anytime"
  }, {
    icon: Star,
    title: "95% Success Rate",
    description: "Exceptional results"
  }];

  return (
    <section id="about" className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Why Choose Kleaners.de
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Experience the difference with our professional cleaning service
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-transparent">
          {advantages.map(advantage => (
            <div
              key={advantage.title}
              className="group p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 rounded-2xl bg-inherit"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                  <advantage.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
