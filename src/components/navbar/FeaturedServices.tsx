
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
      path: "/services/home-cleaning",
      bgColor: "bg-blue-50/50 hover:bg-blue-50/80 dark:bg-blue-900/20 dark:hover:bg-blue-900/30",
      textColor: "text-blue-700 dark:text-blue-300"
    },
    {
      title: "Office Cleaning", 
      price: "from €85",
      icon: <Building2 className="h-4 w-4" />,
      path: "/services/office-cleaning",
      bgColor: "bg-emerald-50/50 hover:bg-emerald-50/80 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/30", 
      textColor: "text-emerald-700 dark:text-emerald-300"
    }
  ];

  return (
    <div className="hidden lg:flex items-center gap-3">
      {services.map((service) => (
        <button
          key={service.title}
          onClick={() => navigate(service.path)}
          className={cn(
            "group relative overflow-hidden rounded-lg px-3 py-1.5",
            "transition-all duration-300 border border-transparent",
            "hover:border-gray-200 dark:hover:border-gray-600",
            "h-9 flex items-center gap-2 text-sm",
            service.bgColor
          )}
        >
          <div className={cn("flex items-center gap-2", service.textColor)}>
            {service.icon}
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs font-medium">
                {service.title}
              </span>
              <span className="text-xs opacity-75">
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
