
import React from 'react';
import { Calendar, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ProviderSection: React.FC = () => {
  const navigate = useNavigate();

  const providerItems = [
    {
      title: "My Jobs",
      description: "View and manage your assignments",
      icon: <Calendar className="h-4 w-4" />,
      href: "/provider/jobs"
    },
    {
      title: "Earnings",
      description: "Track your income and payments",
      icon: <DollarSign className="h-4 w-4" />,
      href: "/provider/earnings"
    },
    {
      title: "Reviews",
      description: "View customer feedback",
      icon: <Star className="h-4 w-4" />,
      href: "/provider/reviews"
    }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
        Provider Dashboard
      </h3>
      
      {providerItems.map((item) => (
        <Button
          key={item.title}
          variant="ghost"
          className="w-full justify-start min-h-[44px] px-3"
          onClick={() => handleNavigation(item.href)}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <div className="text-left">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default ProviderSection;
