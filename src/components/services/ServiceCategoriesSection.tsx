import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/animated-tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { motion } from 'framer-motion';
import { CheckCircle, LucideIcon, ArrowRight } from 'lucide-react';
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
export const ServiceCategoriesSection = ({
  serviceCategories,
  showHeader = true,
  className = ""
}: ServiceCategoriesSectionProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = React.useState(serviceCategories[0]?.title || "");

  // Use the actual 6 service categories from the data
  const displayCategories = serviceCategories.slice(0, 6);
  return <section className={`py-16 bg-theme-lightblue dark:bg-gray-900 transition-colors duration-300 ${className}`}>
      <div className="container mx-auto px-4">
        {showHeader && <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} viewport={{
        once: true
      }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-[#1C1C1C] dark:text-white">Our Service Categories</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our comprehensive range of professional cleaning services, each tailored to meet specific requirements and standards.
            </p>
          </motion.div>}
        
        <Tabs defaultValue={displayCategories[0]?.title || ""} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className={`${isMobile ? 'w-full grid grid-cols-2 gap-1' : 'w-auto'} bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm`}>
              {displayCategories.map(category => <TabsTrigger key={category.title} value={category.title} className={`${isMobile ? 'px-2 py-2 text-xs' : 'px-4 py-2'} text-gray-700 dark:text-gray-300 data-[state=active]:text-primary data-[state=active]:dark:text-primary`}>
                  {isMobile ? category.title.split(' ')[0] : category.title}
                </TabsTrigger>)}
            </TabsList>
          </div>
          
          {displayCategories.map(category => <TabsContent key={category.title} value={category.title} className="mt-6">
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }} className="max-w-7xl mx-auto">
                {/* Category Header */}
                

                {/* Services Grid */}
                <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} mb-8`}>
                  {category.services.map((service, idx) => <motion.div key={idx} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.3,
                delay: idx * 0.1
              }}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm group hover:border-primary/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                              <CardTitle className="text-lg font-semibold text-[#1C1C1C] dark:text-white group-hover:text-primary transition-colors">
                                {service.title}
                              </CardTitle>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0" />
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 flex-1">
                          <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {service.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className="pt-4">
                          <Link to={service.href} className="w-full">
                            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                              Learn More
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>)}
                </div>

                {/* Category CTA */}
                <div className="text-center">
                  <Card className="inline-block bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-[#1C1C1C] dark:text-white">
                        Need a Custom {category.title} Solution?
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Our experts can create a tailored cleaning plan that perfectly fits your specific requirements.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/contact">
                          <Button className="bg-primary hover:bg-primary/90 text-white">
                            Get Free Quote
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to="/services">
                          <Button variant="outline">
                            View All Services
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>)}
        </Tabs>
      </div>
    </section>;
};