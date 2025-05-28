
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/animated-tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, DollarSign, Star } from 'lucide-react';

const optionsData = [
  {
    category: "Service Frequency",
    options: [
      {
        title: "One-Time Deep Clean",
        description: "Perfect for special occasions, seasonal cleaning, or first-time service.",
        features: ["Interior window cleaning", "Inside cabinet cleaning", "Appliance deep clean", "Detailed surface cleaning"],
        pricing: "From €35/visit",
        duration: "3-5 hours",
        path: "/services/regular-cleaning",
        recommended: false
      },
      {
        title: "Regular Cleaning",
        description: "Weekly, bi-weekly, or monthly recurring service to maintain your home's cleanliness.",
        features: ["Consistent schedule", "Dusting all surfaces", "Vacuuming and mopping", "Kitchen and bathroom cleaning"],
        pricing: "From €27/visit",
        duration: "1-3 hours",
        path: "/services/regular-cleaning",
        recommended: true
      },
      {
        title: "Emergency Cleaning",
        description: "Same-day or next-day cleaning service for urgent situations.",
        features: ["Available 24/7", "Quick response time", "Focus on priority areas", "Flexible scheduling"],
        pricing: "From €45/visit",
        duration: "2-4 hours",
        path: "/services/regular-cleaning"
      }
    ]
  },
  {
    category: "Property Type",
    options: [
      {
        title: "Residential Homes",
        description: "Tailored cleaning services for houses, apartments, and condos of any size.",
        features: ["Customized cleaning plans", "Pet-friendly products", "Eco-friendly options", "Flexible scheduling"],
        pricing: "From €27/visit",
        duration: "1-4 hours",
        path: "/services/regular-cleaning"
      },
      {
        title: "Office & Commercial",
        description: "Professional cleaning solutions for offices, coworking spaces, and businesses.",
        features: ["After-hours cleaning", "Restroom sanitization", "Common area maintenance", "Supply restocking"],
        pricing: "From €40/visit",
        duration: "2-6 hours",
        path: "/services/business-cleaning"
      },
      {
        title: "Specialized Properties",
        description: "Expert cleaning for vacation rentals, medical facilities, and unique spaces.",
        features: ["Quick turnarounds", "Industry-specific protocols", "Specialized equipment", "Compliance standards"],
        pricing: "Custom quote",
        duration: "Variable",
        path: "/services/business-cleaning"
      }
    ]
  },
  {
    category: "Service Depth",
    options: [
      {
        title: "Maintenance Clean",
        description: "Light cleaning to maintain your space between deep cleans.",
        features: ["Surface cleaning", "Quick vacuum", "Bathroom touch-up", "Kitchen maintenance"],
        pricing: "From €25/visit",
        duration: "1-2 hours",
        path: "/services/regular-cleaning"
      },
      {
        title: "Deep Cleaning",
        description: "Thorough cleaning that reaches every corner and hidden area.",
        features: ["Detailed scrubbing", "Inside appliances", "Baseboards and moldings", "Light fixture cleaning"],
        pricing: "From €35/visit",
        duration: "3-6 hours",
        path: "/services/regular-cleaning"
      },
      {
        title: "Post-Construction",
        description: "Specialized cleaning after construction, renovation, or major repairs.",
        features: ["Dust and debris removal", "Paint splatter cleanup", "Window and fixture cleaning", "Final detailing"],
        pricing: "Custom quote",
        duration: "4-8 hours",
        path: "/services/construction-cleaning"
      }
    ]
  }
];

export const OptimizedOurOptions = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = React.useState("Service Frequency");
  
  return (
    <section id="options" className="py-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif text-[#1C1C1C] dark:text-white">Our Cleaning Services</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Choose the perfect cleaning solution based on your schedule, property type, and cleaning needs.
          </p>
        </motion.div>
        
        <Tabs 
          defaultValue="Service Frequency" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-4">
            <TabsList className={`${isMobile ? 'w-full' : 'w-auto'} bg-gray-100 dark:bg-gray-800`}>
              {optionsData.map((category) => (
                <TabsTrigger 
                  key={category.category} 
                  value={category.category}
                  className="px-2 py-1.5 text-xs md:text-sm text-gray-700 dark:text-gray-300 data-[state=active]:text-primary data-[state=active]:dark:text-primary data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700"
                >
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {optionsData.map((category) => (
            <TabsContent 
              key={category.category} 
              value={category.category}
              className="mt-3"
            >
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'md:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
                {category.options.map((option, index) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 ${option.recommended ? 'ring-2 ring-primary' : ''}`}>
                      {option.recommended && (
                        <div className="bg-primary text-white text-xs font-semibold px-3 py-1 text-center flex items-center justify-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Most Popular
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base md:text-lg font-serif text-[#1C1C1C] dark:text-white">
                          {option.title}
                        </CardTitle>
                        <CardDescription className="dark:text-gray-400 text-xs md:text-sm">{option.description}</CardDescription>
                        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mt-2">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            <span>{option.pricing}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{option.duration}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow pt-0">
                        <ul className="space-y-1.5">
                          {option.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start text-xs text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="pt-1 pb-3">
                        <Link to={option.path} className="w-full">
                          <Button variant={option.recommended ? "default" : "outline"} size="sm" className="w-full">
                            Book Now
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default OptimizedOurOptions;
