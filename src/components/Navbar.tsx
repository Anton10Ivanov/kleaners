import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'de'>('en');
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
        setIsServicesOpen(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsServicesOpen(false);
  }, [location]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const serviceLinks = [
    { path: '/services/regular-cleaning', label: 'Regular Cleaning' },
    { path: '/services/move-in-out', label: 'Move In/Out' },
    { path: '/services/business-cleaning', label: 'Business Cleaning' },
  ];

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'de' : 'en');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 min-h-[64px] transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'bg-white/95 dark:bg-dark-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img
              src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png"
              alt="Kleaners.de Logo"
              className="h-8 w-8 object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(50%) saturate(1000%) hue-rotate(346deg) brightness(100%) contrast(100%)' }}
            />
            <Link to="/" className="font-raleway font-bold text-2xl text-primary dark:text-primary">
              Kleaners.de
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center space-x-1 font-raleway font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
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
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 h-16">
                <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
                <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleLanguage}
                  className={`w-8 h-6 rounded overflow-hidden transition-opacity ${currentLanguage === 'de' ? 'opacity-50' : ''}`}
                >
                  <img
                    src="https://flagcdn.com/w40/de.png"
                    alt="German"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button 
                  onClick={toggleLanguage}
                  className={`w-8 h-6 rounded overflow-hidden transition-opacity ${currentLanguage === 'en' ? 'opacity-50' : ''}`}
                >
                  <img
                    src="https://flagcdn.com/w40/gb.png"
                    alt="English"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleLanguage}
                className={`w-6 h-4 rounded overflow-hidden transition-opacity ${currentLanguage === 'de' ? 'opacity-50' : ''}`}
              >
                <img
                  src="https://flagcdn.com/w40/de.png"
                  alt="German"
                  className="w-full h-full object-cover"
                />
              </button>
              <button 
                onClick={toggleLanguage}
                className={`w-6 h-4 rounded overflow-hidden transition-opacity ${currentLanguage === 'en' ? 'opacity-50' : ''}`}
              >
                <img
                  src="https://flagcdn.com/w40/gb.png"
                  alt="English"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
            <div className="flex items-center space-x-2 h-16">
              <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white dark:bg-dark-background shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {serviceLinks.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 font-raleway font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors"
                >
                  {service.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 font-raleway font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
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

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 font-raleway font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors"
  >
    {children}
  </a>
);

export default Navbar;
