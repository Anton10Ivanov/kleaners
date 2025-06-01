
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/animated-tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { motion } from 'framer-motion';
import { CheckCircle, LucideIcon } from 'lucide-react';

interface ServiceCategory {
  title: string;
  icon: LucideIcon;
  services: Array<{
    title: string;
    href: string;
    description: string;
  }>;
}

interface ServiceCategoriesSectionProps {
  serviceCategories: ServiceCategory[];
  showHeader?: boolean;
  className?: string;
}

// Group categories into tabs for better organization
const organizeCategories = (categories: ServiceCategory[]) => {
  // Split categories into groups of 3 for better tab organization
  const groups = [];
  for (let i = 0; i < categories.length; i += 3) {
    groups.push({
      name: `Services ${Math.floor(i / 3) + 1}`,
      categories: categories.slice(i, i + 3)
    });
  }
  return groups;
};

export const ServiceCategoriesSection = ({ 
  serviceCategories, 
  showHeader = true, 
  className = "" 
}: ServiceCategoriesSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = React.useState("Services 1");
  
  const categoryGroups = organizeCategories(serviceCategories);
  
  return (
    <section className={`py-16 bg-theme-lightblue dark:bg-gray-900 transition-colors duration-300 ${className}`}>
      <div className="container mx-auto px-4">
        {showHeader && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-[#1C1C1C] dark:text-white">Our Service Categories</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our comprehensive range of professional cleaning services, each tailored to meet specific requirements and standards.
            </p>
          </motion.div>
        )}
        
        <Tabs 
          defaultValue="Services 1" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className={`${isMobile ? 'w-full' : 'w-auto'} bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm`}>
              {categoryGroups.map((group) => (
                <TabsTrigger 
                  key={group.name} 
                  value={group.name}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 data-[state=active]:text-primary data-[state=active]:dark:text-primary"
                >
                  {group.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categoryGroups.map((group) => (
            <TabsContent 
              key={group.name} 
              value={group.name}
              className="mt-6 space-y-4"
            >
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
                {group.categories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <category.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl font-serif text-[#1C1C1C] dark:text-white">{category.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow pt-0">
                        <ul className="space-y-2">
                          {category.services.slice(0, 4).map((service, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <Link 
                                to={service.href}
                                className="hover:text-primary transition-colors"
                              >
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {category.services.length > 4 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                            +{category.services.length - 4} more services
                          </p>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Link to="/services" className="w-full">
                          <Button variant="outline" className="w-full dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                            View All {category.title}
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
