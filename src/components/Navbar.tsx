
import { useState, useEffect } from 'react';
import { AlignJustify, X, ChevronDown } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Logo } from './navbar/Logo';
import { ThemeToggle } from './navbar/ThemeToggle';
import { LanguageSelector } from './navbar/LanguageSelector';
import { NavigationMenu } from './navbar/NavigationMenu';
import { MobileMenu } from './navbar/MobileMenu';
import { AuthButtons } from './navbar/AuthButtons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'de'>('en');
  const location = useLocation();

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

  if (!mounted) return null;

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'de' : 'en');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 min-h-[64px] transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } backdrop-blur-sm bg-white/95 dark:bg-dark-background/95 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <NavigationMenu 
            isServicesOpen={isServicesOpen}
            setIsServicesOpen={setIsServicesOpen}
          />

          <div className="hidden md:flex items-center space-x-4">
            <LegalDropdown />
            <ThemeToggle />
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={toggleLanguage}
            />
            <AuthButtons />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <AuthButtons />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors p-1"
            >
              {isMenuOpen ? <X size={28} /> : <AlignJustify size={28} />}
            </button>
          </div>
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          isMobileServicesOpen={isMobileServicesOpen}
          setIsMobileServicesOpen={setIsMobileServicesOpen}
          currentLanguage={currentLanguage}
          onLanguageChange={toggleLanguage}
        />
      </div>
    </nav>
  );
};

const LegalDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="flex items-center space-x-1">
        <span>Legal</span>
        <ChevronDown className="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link to="/legal/terms">Terms of Service</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/legal/privacy">Privacy Policy</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Navbar;
