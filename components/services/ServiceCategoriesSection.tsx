
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/animated-tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/use-media-query';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ServiceCategory {
  title: string;
  icon: LucideIcon;
  services: Array<{
    title: string;
    href: string;
    description: string;
    icon: LucideIcon;
  }>;
}

interface ServiceCategoriesSectionProps {
  serviceCategories: ServiceCategory[];
  showHeader?: boolean;
  className?: string;
}

export const ServiceCategoriesSection = ({
  serviceCategories,
  showHeader = true,
  className = ""
}: ServiceCategoriesSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = React.useState(serviceCategories[0]?.title || "");

  // Use the actual 6 service categories from the data
  const displayCategories = serviceCategories.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={`section-spacing-lg bg-theme-lightblue dark:bg-gray-900 transition-colors duration-300 ${className}`}>
      <div className="container mx-auto px-4">
        {showHeader && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            viewport={{ once: true }} 
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-serif text-[#1C1C1C] dark:text-white">
              Our Service Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
              Explore our comprehensive range of professional cleaning services, each tailored to meet specific requirements and standards.
            </p>
          </motion.div>
        )}
        
        <Tabs defaultValue={displayCategories[0]?.title || ""} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className={`${isMobile ? 'w-full grid grid-cols-2 gap-1' : 'w-auto'} bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm`}>
              {displayCategories.map(category => (
                <TabsTrigger 
                  key={category.title} 
                  value={category.title} 
                  className={`${isMobile ? 'px-2 section-spacing-xs text-xs' : 'px-4 section-spacing-xs'} text-gray-700 dark:text-gray-300 data-[state=active]:text-primary data-[state=active]:dark:text-primary`}
                >
                  {isMobile ? category.title.split(' ')[0] : category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {displayCategories.map(category => (
            <TabsContent key={category.title} value={category.title} className="mt-4">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto"
              >
                {/* Services Grid with Staggered Animation */}
                <motion.div 
                  className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} mb-6`}
                  variants={containerVariants}
                >
                  {category.services.map((service, idx) => {
                    const ServiceIcon = service.icon;
                    return (
                      <motion.div 
                        key={idx} 
                        variants={cardVariants}
                        whileHover={{ 
                          scale: 1.02,
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Card className="h-full hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm group hover:border-primary/30 overflow-hidden">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold text-[#1C1C1C] dark:text-white group-hover:text-primary transition-colors leading-tight flex items-center gap-2">
                              <ServiceIcon className="h-5 w-5" />
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0 pb-3 flex-1">
                            <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                              {service.description}
                            </CardDescription>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Link href={service.href} className="w-full">
                              <Button 
                                variant="outline" 
                                className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 text-sm section-spacing-xs"
                              >
                                Learn More
                                <motion.div
                                  whileHover={{ x: 2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </motion.div>
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Category CTA with Wave Animation */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Card className="inline-block bg-card border-border overflow-hidden relative hover:shadow-lg transition-shadow duration-300">
                    <motion.div
                      className="absolute inset-0 bg-primary/5"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <CardContent className="card-spacing-sm relative z-10">
                      <h4 className="text-xl font-semibold mb-2 text-[#1C1C1C] dark:text-white">
                        Need a Custom {category.title} Solution?
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                        Our experts can create a tailored cleaning plan that perfectly fits your specific requirements.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Link href="/contact">
                          <Button className="bg-primary hover:bg-primary/90 text-white text-sm">
                            Get Free Quote
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href="/services">
                          <Button variant="outline" className="text-sm">
                            View All Services
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
