
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeaturedServices: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Home Cleaning",
      price: "from €45",
      icon: <Home className="h-4 w-4" />,
      path: "/services/regular-cleaning",
      bgColor: "bg-primary/10 hover:bg-primary/20",
      textColor: "text-primary"
    },
    {
      title: "Office Cleaning", 
      price: "from €85",
      icon: <Building2 className="h-4 w-4" />,
      path: "/services/business-cleaning",
      bgColor: "bg-secondary/10 hover:bg-secondary/20", 
      textColor: "text-secondary"
    }
  ];

  return (
    <div className="hidden lg:flex items-center gap-3">
      {services.map((service) => (
        <button
          key={service.title}
          onClick={() => navigate(service.path)}
          className={cn(
            "group relative overflow-hidden rounded-lg px-3 py-2",
            "transition-all duration-300 border border-transparent",
            "hover:border-gray-200 dark:hover:border-gray-600",
            "h-10 flex items-center gap-2",
            service.bgColor
          )}
        >
          <div className={cn("flex items-center gap-2", service.textColor)}>
            {service.icon}
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium leading-tight">
                {service.title}
              </span>
              <span className="text-xs opacity-75 leading-tight">
                {service.price}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FeaturedServices;
