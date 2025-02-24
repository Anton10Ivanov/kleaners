
import { useState, useEffect } from 'react';
import { AlignJustify, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './navbar/Logo';
import { ThemeToggle } from './navbar/ThemeToggle';
import { LanguageSelector } from './navbar/LanguageSelector';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'de'>('en');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsMobileServicesOpen(false);
  }, [location]);

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

  if (!mounted) {
    return null;
  }

  const serviceLinks = [
    { path: '/services/regular-cleaning', label: 'Regular Cleaning' },
    { path: '/services/move-in-out', label: 'Move In/Out' },
    { path: '/services/business-cleaning', label: 'Business Cleaning' },
    { path: '/services/post-construction-cleaning', label: 'Post-Construction Cleaning' },
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
          <Logo />
          
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
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={toggleLanguage}
              />
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="font-raleway"
              >
                Sign in
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="mr-2 font-raleway"
            >
              Sign in
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors p-1"
            >
              {isMenuOpen ? <X size={28} /> : <AlignJustify size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
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
                to="/contact"
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 font-raleway font-medium hover:text-primary hover:bg-gray-50 dark:hover:bg-dark-background/50 transition-colors"
              >
                Contact
              </Link>

              <div className="flex items-center justify-between px-3 py-2">
                <ThemeToggle />
                <LanguageSelector
                  currentLanguage={currentLanguage}
                  onLanguageChange={toggleLanguage}
                />
              </div>
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

export default Navbar;

