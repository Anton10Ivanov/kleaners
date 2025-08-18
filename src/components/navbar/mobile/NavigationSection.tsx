
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Building2, Users, Phone, Heart, HelpCircle, FileText, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';

const navigationData = [
  {
    title: "About Us",
    href: "/about",
    children: [
      { title: "Company Values", href: "/about/values", icon: Heart, description: "Our principles and what we stand for" },
      { title: "FAQ", href: "/about/faq", icon: HelpCircle, description: "Frequently asked questions" },
      { title: "Terms of Service", href: "/legal/terms", icon: FileText, description: "Our terms and conditions" },
      { title: "Privacy Policy", href: "/legal/privacy", icon: Shield, description: "How we handle your data" }
    ]
  },
  {
    title: "Contact",
    href: "/contact",
    children: [
      { title: "Get in Touch", href: "/contact", icon: Phone, description: "Contact our customer service team" },
      { title: "Join Our Team", href: "/contact?tab=join", icon: Users, description: "Apply to work with us" }
    ]
  }
];

interface NavigationSectionProps {
  navigationData?: any[];
}

export const NavigationSection: React.FC<NavigationSectionProps> = ({ 
  navigationData: propNavigationData 
}) => {
  const navData = propNavigationData || navigationData;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3">
        Information
      </h3>
      
      <div className="space-y-2">
        {navData.map((section) => (
          <div key={section.title} className="space-y-2">
            <div className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              {section.title}
            </div>
            
            {section.children && (
              <div className="space-y-1 ml-4">
                {section.children.map((item: any) => {
                  const IconComponent = item.icon;
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link to={item.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 text-left h-auto p-3"
                        >
                          {IconComponent && <IconComponent className="h-4 w-4 text-gray-400" />}
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.title}</div>
                            {item.description && (
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </Button>
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Add default export for backward compatibility
export default NavigationSection;
