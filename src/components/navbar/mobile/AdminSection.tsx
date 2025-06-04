
import React from 'react';
import { Users, Settings, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AdminSectionProps {
  setIsOpen: (open: boolean) => void;
}

const AdminSection: React.FC<AdminSectionProps> = ({ setIsOpen }) => {
  const navigate = useNavigate();

  const adminItems = [
    {
      title: "User Management",
      description: "Manage users and permissions",
      icon: <Users className="h-4 w-4" />,
      href: "/admin/users"
    },
    {
      title: "Analytics",
      description: "View platform analytics",
      icon: <BarChart className="h-4 w-4" />,
      href: "/admin/analytics"
    },
    {
      title: "Settings",
      description: "Platform configuration",
      icon: <Settings className="h-4 w-4" />,
      href: "/admin/settings"
    }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
        Admin Panel
      </h3>
      
      {adminItems.map((item) => (
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

export default AdminSection;
