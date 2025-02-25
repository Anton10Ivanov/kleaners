
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { serviceLinks } from './navigationData';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

interface MobileMenuProps {
  isOpen: boolean;
  isMobileServicesOpen: boolean;
  setIsMobileServicesOpen: (value: boolean) => void;
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

export const MobileMenu = ({
  isOpen,
  isMobileServicesOpen,
  setIsMobileServicesOpen,
  currentLanguage,
  onLanguageChange,
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute left-0 right-0 top-16 bg-white dark:bg-dark-background shadow-lg">
      <div className="px-4 py-3 space-y-4">
        <button
          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
          className="flex items-center justify-between w-full px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 font-raleway font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors"
        >
          <span>Services</span>
          {isMobileServicesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {isMobileServicesOpen && (
          <div className="pl-6 space-y-2">
            {serviceLinks.map((service) => (
              <Link
                key={service.path}
                to={service.path}
                className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 font-raleway font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors"
              >
                {service.label}
              </Link>
            ))}
          </div>
        )}
        
        <Link
          to="/legal/terms"
          className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 font-raleway font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors"
        >
          Terms of Service
        </Link>
        
        <Link
          to="/legal/privacy"
          className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 font-raleway font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors"
        >
          Privacy Policy
        </Link>

        <Link
          to="/contact"
          className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 font-raleway font-medium"
        >
          Contact
        </Link>

        <div className="flex items-center justify-between px-3 py-2">
          <ThemeToggle />
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </div>
  );
};
