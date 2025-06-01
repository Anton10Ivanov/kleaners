
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCategoryCardProps {
  title: string;
  icon: LucideIcon;
  services: Array<{
    title: string;
    href: string;
    description: string;
  }>;
  index: number;
}

const ServiceCategoryCard = ({ title, icon: Icon, services, index }: ServiceCategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0 flex-grow flex flex-col">
          <div className="space-y-3 mb-6 flex-grow">
            {services.slice(0, 3).map((service, serviceIndex) => (
              <Link
                key={serviceIndex}
                to={service.href}
                className="block group hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-md transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary">
                    {service.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
          
          {services.length > 3 && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                +{services.length - 3} more services
              </p>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-auto"
            onClick={() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }}
          >
            View All {title}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface ServiceCategoriesSectionProps {
  serviceCategories: Array<{
    title: string;
    icon: LucideIcon;
    services: Array<{
      title: string;
      href: string;
      description: string;
    }>;
  }>;
  showHeader?: boolean;
  className?: string;
}

export const ServiceCategoriesSection = ({ 
  serviceCategories, 
  showHeader = true, 
  className = "" 
}: ServiceCategoriesSectionProps) => {
  return (
    <section className={`py-8 md:py-16 bg-white dark:bg-gray-900 transition-colors duration-300 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4 drop-shadow-sm">
              Our Service Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              Choose from our comprehensive range of professional cleaning services, 
              each tailored to meet specific requirements and standards.
            </p>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {serviceCategories.map((category, index) => (
            <ServiceCategoryCard
              key={index}
              title={category.title}
              icon={category.icon}
              services={category.services}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
