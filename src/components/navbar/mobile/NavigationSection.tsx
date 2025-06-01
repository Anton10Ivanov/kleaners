
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationItem {
  title: string;
  href: string;
  children?: Array<{
    title: string;
    href: string;
  }>;
}

interface NavigationSectionProps {
  navigationData: NavigationItem[];
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ navigationData }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleExpanded = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
        Navigation
      </h3>
      
      {navigationData.map((item) => (
        <div key={item.title} className="space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-between min-h-[44px] px-3"
            onClick={() => {
              if (item.children) {
                toggleExpanded(item.title);
              } else {
                handleNavigation(item.href);
              }
            }}
          >
            <span>{item.title}</span>
            {item.children && (
              <motion.div
                animate={{ rotate: expandedItems.has(item.title) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            )}
          </Button>
          
          <AnimatePresence>
            {item.children && expandedItems.has(item.title) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="pl-4 space-y-1"
              >
                {item.children.map((child) => (
                  <Button
                    key={child.title}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start min-h-[40px] text-sm"
                    onClick={() => handleNavigation(child.href)}
                  >
                    {child.title}
                  </Button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default NavigationSection;
