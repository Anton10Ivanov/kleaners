
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
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "from-blue-600 to-blue-700"
    },
    {
      title: "Office Cleaning", 
      price: "from €85",
      icon: <Building2 className="h-4 w-4" />,
      path: "/services/business-cleaning",
      gradient: "from-emerald-500 to-emerald-600",
      hoverGradient: "from-emerald-600 to-emerald-700"
    }
  ];

  return (
    <div className="hidden lg:flex items-center gap-3">
      {services.map((service) => (
        <button
          key={service.title}
          onClick={() => navigate(service.path)}
          className={cn(
            "group relative overflow-hidden rounded-xl px-4 py-2.5",
            "bg-gradient-to-r transition-all duration-300 transform",
            "hover:scale-105 hover:shadow-lg active:scale-95",
            "min-h-[44px] flex items-center gap-2",
            service.gradient,
            `hover:bg-gradient-to-r hover:${service.hoverGradient}`
          )}
        >
          <div className="flex items-center gap-2 text-white">
            {service.icon}
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold leading-tight">
                {service.title}
              </span>
              <span className="text-xs opacity-90 leading-tight">
                {service.price}
              </span>
            </div>
          </div>
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default FeaturedServices;
