
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { serviceLinks } from './navigationData';

interface NavigationMenuProps {
  isServicesOpen: boolean;
  setIsServicesOpen: (value: boolean) => void;
}

export const NavigationMenu = ({ isServicesOpen, setIsServicesOpen }: NavigationMenuProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <div className="relative group">
        <button
          onClick={() => setIsServicesOpen(!isServicesOpen)}
          className="flex items-center space-x-1 font-raleway font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
        >
          <span>Services</span>
          {isServicesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {isServicesOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {serviceLinks.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <NavLink href="#about">About</NavLink>
      <Link
        to="/contact"
        className="font-raleway font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
      >
        Contact
      </Link>
    </div>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="font-raleway font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
  >
    {children}
  </a>
);
