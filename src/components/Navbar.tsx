import { useState, useEffect } from 'react';
import { AlignJustify, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './navbar/Logo';
import { ThemeToggle } from './navbar/ThemeToggle';
import { LanguageSelector } from './navbar/LanguageSelector';
import { MobileMenu } from './navbar/MobileMenu';
import { AuthButtons } from './navbar/AuthButtons';
import { DropdownNavigation } from './navbar/DropdownNavigation';
import { Icons } from './navbar/icons';
import { supabase, hasAdminAccess } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const navItems = [
  {
    id: 1,
    label: "Services",
    subMenus: [
      {
        title: "Cleaning Services",
        items: [
          {
            label: "Regular Cleaning",
            description: "Professional home cleaning service",
            icon: Icons.regular,
            path: "/services/regular-cleaning"
          },
          {
            label: "Business Cleaning",
            description: "Commercial cleaning solutions",
            icon: Icons.business,
            path: "/services/business-cleaning"
          },
          {
            label: "Move In/Out",
            description: "Thorough cleaning for transitions",
            icon: Icons.moveInOut,
            path: "/services/move-in-out"
          },
          {
            label: "Post Construction",
            description: "Clean-up after construction work",
            icon: Icons.postConstruction,
            path: "/services/post-construction-cleaning"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "About",
    subMenus: [
      {
        title: "About Us",
        items: [
          {
            label: "Company's Values",
            description: "Our principles and what we stand for",
            icon: Icons.regular,
            path: "/about/values"
          },
          {
            label: "FAQ",
            description: "Frequently asked questions",
            icon: Icons.regular,
            path: "/about/faq"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    label: "Contact",
    link: "/contact"
  },
  {
    id: 4,
    label: "Legal",
    subMenus: [
      {
        title: "Legal Information",
        items: [
          {
            label: "Terms of Service",
            description: "Our terms and conditions",
            icon: Icons.regular,
            path: "/legal/terms"
          },
          {
            label: "Privacy Policy",
            description: "How we handle your data",
            icon: Icons.regular,
            path: "/legal/privacy"
          }
        ]
      }
    ]
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    
    const checkAdminStatus = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          console.log("Checking admin status for user:", user.id);
          const adminAccess = await hasAdminAccess(user.id);
          console.log("Admin access:", adminAccess);
          setIsAdmin(adminAccess);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminStatus();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      if (event === 'SIGNED_IN' && session?.user) {
        const adminAccess = await hasAdminAccess(session.user.id);
        setIsAdmin(adminAccess);
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
      }
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

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      description: "Navigating to the admin panel",
    });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 min-h-[64px] transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-dark-background/80 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <DropdownNavigation navItems={navItems} />

          <div className="hidden md:flex items-center space-x-4">
            {isAdmin && !isLoading && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAdminClick}
                className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10"
              >
                <span>Admin Panel</span>
              </Button>
            )}
            <ThemeToggle />
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={toggleLanguage}
            />
            <AuthButtons />
          </div>

          <div className="md:hidden flex items-center gap-2">
            {isAdmin && !isLoading && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAdminClick}
                className="flex items-center p-1 text-primary border-primary"
              >
                <span className="text-xs">Admin</span>
              </Button>
            )}
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
          isAdmin={isAdmin}
        />
      </div>
    </nav>
  );
};

export default Navbar;
