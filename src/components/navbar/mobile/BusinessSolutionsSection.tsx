
import React from 'react';
import { Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const BusinessSolutionsSection: React.FC = () => {
  const navigate = useNavigate();

  const businessServices = [
    {
      title: "Office Cleaning",
      description: "Professional office cleaning services",
      href: "/services/business-cleaning"
    },
    {
      title: "Retail Cleaning", 
      description: "Specialized retail space cleaning",
      href: "/services/business-cleaning"
    },
    {
      title: "Healthcare Cleaning",
      description: "Medical facility cleaning services", 
      href: "/services/business-cleaning"
    }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
        Business Solutions
      </h3>
      
      {businessServices.map((service) => (
        <Button
          key={service.title}
          variant="ghost"
          className="w-full justify-start min-h-[44px] px-3 text-left"
          onClick={() => handleNavigation(service.href)}
        >
          <div className="flex items-center gap-3 w-full">
            <Building2 className="h-4 w-4 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{service.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {service.description}
              </p>
            </div>
            <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
          </div>
        </Button>
      ))}
      
      <Button
        variant="outline"
        className="w-full min-h-[44px]"
        onClick={() => handleNavigation('/services/business-cleaning')}
      >
        View All Business Services
      </Button>
    </div>
  );
};

export default BusinessSolutionsSection;
