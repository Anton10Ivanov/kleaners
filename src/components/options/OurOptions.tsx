
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/animated-tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const optionsData = [
  {
    category: "Cleaning Types",
    options: [
      {
        title: "Regular Cleaning",
        description: "Our standard cleaning service covers all the essentials to keep your home fresh and tidy.",
        features: ["Dusting all surfaces", "Vacuuming and mopping floors", "Kitchen and bathroom cleaning", "Bed making"],
        path: "/services/regular-cleaning"
      },
      {
        title: "Move In/Out Cleaning",
        description: "Start fresh in your new home or leave your old one spotless with our specialized cleaning service.",
        features: ["Interior window cleaning", "Inside cabinet cleaning", "Appliance interior cleaning", "Wall mark cleaning"],
        path: "/services/move-in-out"
      },
      {
        title: "Business Cleaning",
        description: "Customized cleaning solutions for offices, retail spaces, and other commercial properties.",
        features: ["Reception and common area cleaning", "Restroom sanitization", "Break room cleaning", "Trash removal and recycling"],
        path: "/services/business-cleaning"
      }
    ]
  },
  {
    category: "By Property",
    options: [
      {
        title: "Residential Cleaning",
        description: "Tailored cleaning services for homes, apartments, and condos of any size.",
        features: ["Customized cleaning plans", "Regular or one-time services", "Eco-friendly options", "Pet-friendly cleaning"],
        path: "/services/regular-cleaning"
      },
      {
        title: "Business Cleaning",
        description: "Customized cleaning solutions for offices, retail spaces, and other commercial properties.",
        features: ["Reception and common area cleaning", "Restroom sanitization", "Break room cleaning", "Trash removal and recycling"],
        path: "/services/business-cleaning"
      },
      {
        title: "Post-Construction",
        description: "Specialized cleaning after construction or renovation projects.",
        features: ["Dust and debris removal", "Paint and adhesive cleanup", "Fixture and surface cleaning", "Final polish and detail work"],
        path: "/services/construction-cleaning"
      }
    ]
  },
  {
    category: "Special Services",
    options: [
      {
        title: "Eco-Friendly Cleaning",
        description: "Environmentally conscious cleaning services using sustainable products and methods.",
        features: ["Natural cleaning agents", "Microfiber technology", "Reduced water usage", "Minimal waste generation"],
        path: "/services/regular-cleaning"
      },
      {
        title: "Vacation Rental Cleaning",
        description: "Specialized cleaning and turnaround services for Airbnb and other short-term rental properties.",
        features: ["Quick turnarounds", "Linen changes", "Restocking essentials", "Inspection services"],
        path: "/services/business-cleaning"
      },
      {
        title: "Custom Cleaning",
        description: "Bespoke cleaning solutions for unique properties or special requirements.",
        features: ["Personalized consultation", "Custom cleaning plan", "Specialized equipment if needed", "Flexible scheduling"],
        path: "/services/business-cleaning"
      }
    ]
  }
];

export const OurOptions = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = React.useState("Cleaning Types");
  
  return (
    <section id="options" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Our Options</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our variety of cleaning options to find the perfect match for your specific needs.
          </p>
        </motion.div>
        
        <Tabs 
          defaultValue="Cleaning Types" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className={`${isMobile ? 'w-full' : 'w-auto'}`}>
              {optionsData.map((category) => (
                <TabsTrigger 
                  key={category.category} 
                  value={category.category}
                  className="px-4 py-2"
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
              className="mt-6 space-y-4"
            >
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
                {category.options.map((option, index) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-serif">{option.title}</CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow pt-0">
                        <ul className="space-y-2">
                          {option.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Link to={option.path} className="w-full">
                          <Button variant="outline" className="w-full">Learn More</Button>
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

export default OurOptions;
