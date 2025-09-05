
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ServiceCategoryCardProps {
  title: string;
  icon: LucideIcon;
  services: Array<{
    title: string;
    href: string;
    description: string;
  }>;
}

const ServiceCategoryCard = ({ title, icon: Icon, services }: ServiceCategoryCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 mb-6">
          {services.slice(0, 4).map((service, index) => (
            <Link
              key={index}
              to={service.href}
              className="block group hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary">
                  {service.title}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
        
        {services.length > 4 && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              +{services.length - 4} more services
            </p>
          </div>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4"
          onClick={() => {
            // Scroll to contact section or navigate to contact page
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }}
        >
          View All {title}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCategoryCard;
