
import { useState, useEffect } from 'react';
import { AlignJustify, X, Shield, CalendarDays, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './navbar/Logo';
import { ThemeToggle } from './navbar/ThemeToggle';
import LanguageSelector from './navbar/LanguageSelector';
import { MobileMenu } from './navbar/MobileMenu';
import { AuthButtons } from './navbar/AuthButtons';
import { DropdownNavigation } from './navbar/DropdownNavigation';
import { Icons } from './navbar/icons';
import { Button } from "./ui/button";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const navItems = [
  {
    id: 1,
    label: "Services",
    subMenus: [{
      title: "Cleaning Services",
      items: [{
        label: "Regular Cleaning",
        description: "Professional home cleaning service",
        icon: Icons.regular,
        path: "/services/regular-cleaning"
      }, {
        label: "Business Cleaning",
        description: "Commercial cleaning solutions",
        icon: Icons.business,
        path: "/services/business-cleaning"
      }, {
        label: "Move In/Out",
        description: "Thorough cleaning for transitions",
        icon: Icons.moveInOut,
        path: "/services/move-in-out"
      }, {
        label: "Post Construction",
        description: "Clean-up after construction work",
        icon: Icons.postConstruction,
        path: "/services/post-construction-cleaning"
      }]
    }]
  }, {
    id: 2,
    label: "About",
    subMenus: [{
      title: "About Us",
      items: [{
        label: "Company's Values",
        description: "Our principles and what we stand for",
        icon: Icons.regular,
        path: "/about/values"
      }, {
        label: "FAQ",
        description: "Frequently asked questions",
        icon: Icons.regular,
        path: "/about/faq"
      }]
    }]
  }, {
    id: 3,
    label: "Contact",
    subMenus: [{
      title: "Contact Us",
      items: [{
        label: "Get in Touch",
        description: "Contact our customer service team",
        icon: Icons.regular,
        path: "/contact"
      }, {
        label: "Join Our Team",
        description: "Apply to work with us",
        icon: Icons.regular,
        path: "/join-team"
      }]
    }]
  }, {
    id: 4,
    label: "Legal",
    subMenus: [{
      title: "Legal Information",
      items: [{
        label: "Terms of Service",
        description: "Our terms and conditions",
        icon: Icons.regular,
        path: "/legal/terms"
      }, {
        label: "Privacy Policy",
        description: "How we handle your data",
        icon: Icons.regular,
        path: "/legal/privacy"
      }]
    }]
  }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'de'>('en');
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!mounted) return null;

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'de' : 'en');
  };

  const handleAdminClick = () => {
    console.log("Admin button clicked, navigating to panel");
    navigate('/admin');
    toast({
      title: "Admin Panel",
      description: "Navigating to the admin panel"
    });
  };

  const handleBookingsClick = () => {
    console.log("Bookings button clicked, navigating to bookings");
    navigate('/user/bookings');
    toast({
      title: "My Bookings",
      description: "Navigating to your bookings"
    });
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out"
      });
      // Redirection is handled by auth state change
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return <nav className={`fixed w-full z-50 transition-all duration-300 min-h-[64px] transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-dark-background/80 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[6px]">
        <div className="flex justify-between items-center h-16 my-[3px] py-[8px] bg-transparent">
          <Logo />
          
          <DropdownNavigation navItems={navItems} />

          <div className="hidden md:flex items-center space-x-3">
            {user && (
              <>
                <Button variant="outline" size="sm" onClick={handleAdminClick} className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10">
                  <Shield className="h-4 w-4" />
                  <span>Panel</span>
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleBookingsClick} className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10">
                  <CalendarDays className="h-4 w-4" />
                  <span>My Bookings</span>
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1 text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </Button>
              </>
            )}
            
            <ThemeToggle />
            <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={toggleLanguage} />
            {!user && <AuthButtons />}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={toggleLanguage} />
            
            {user && (
              <Button variant="outline" size="icon" onClick={handleBookingsClick} className="text-primary border-primary p-1 h-8 w-8">
                <CalendarDays className="h-4 w-4" />
              </Button>
            )}
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors p-1">
              <AlignJustify size={28} />
            </button>
          </div>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen} 
          setIsOpen={setIsMenuOpen}
          isMobileServicesOpen={isMobileServicesOpen} 
          setIsMobileServicesOpen={setIsMobileServicesOpen} 
          currentLanguage={currentLanguage} 
          onLanguageChange={toggleLanguage} 
        />
      </div>
    </nav>;
};

export default Navbar;
