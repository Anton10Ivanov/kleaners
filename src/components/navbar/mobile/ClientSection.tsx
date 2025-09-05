
import React from 'react';
import { Calendar, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ClientSection: React.FC = () => {
  const navigate = useNavigate();

  const clientItems = [
    {
      title: "My Bookings",
      description: "View and manage your bookings",
      icon: <Calendar className="h-4 w-4" />,
      href: "/client/bookings"
    },
    {
      title: "My Profile", 
      description: "Update your account information",
      icon: <User className="h-4 w-4" />,
      href: "/client/profile"
    },
    {
      title: "Favorites",
      description: "Your saved services and providers",
      icon: <Heart className="h-4 w-4" />,
      href: "/client/favorites"
    }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
        My Account
      </h3>
      
      {clientItems.map((item) => (
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

export default ClientSection;
