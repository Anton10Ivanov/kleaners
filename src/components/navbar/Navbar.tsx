import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { MobileMenu } from './MobileMenu';
import { AuthButtons } from './auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import NavbarContainer from './NavbarContainer';
import UserControls from './UserControls';
import MobileUserControls from './MobileUserControls';
import MobileMenuToggle from './MobileMenuToggle';
import FeaturedServices from './FeaturedServices';
import { ServicesMegamenu } from './ServicesMegamenu';
import { EnhancedDropdownNavigation } from './EnhancedDropdownNavigation';
import { Heart, HelpCircle, Phone, Users, FileText, Shield } from 'lucide-react';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { cn } from '@/lib/utils';

const navItems = [
  {
    id: 2,
    label: "About Us",
    subMenus: [{
      title: "About Us",
      items: [{
        label: "Company's Values",
        description: "Our principles and what we stand for",
        icon: <Heart className="h-4 w-4" />,
        path: "/about/values"
      }, {
        label: "FAQ",
        description: "Frequently asked questions",
        icon: <HelpCircle className="h-4 w-4" />,
        path: "/about/faq"
      }, {
        label: "Terms of Service",
        description: "Our terms and conditions",
        icon: <FileText className="h-4 w-4" />,
        path: "/legal/terms"
      }, {
        label: "Privacy Policy",
        description: "How we handle your data",
        icon: <Shield className="h-4 w-4" />,
        path: "/legal/privacy"
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
        icon: <Phone className="h-4 w-4" />,
        path: "/contact"
      }, {
        label: "Join Our Team",
        description: "Apply to work with us",
        icon: <Users className="h-4 w-4" />,
        path: "/join-team"
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
  const [userRole, setUserRole] = useState<'client' | 'provider' | 'admin' | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isMobile } = useMobileOptimizations();

  useEffect(() => {
    setMounted(true);
    
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: adminData } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
          
        if (adminData) {
          setUserRole('admin');
        } else {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', user.id)
            .single();
            
          if (profileData) {
            setUserRole(profileData.user_type as 'client' | 'provider' || 'client');
          } else {
            setUserRole('client');
          }
        }
      } else {
        setUserRole(null);
      }
    };
    
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      
      if (session?.user) {
        const { data: adminData } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
          
        if (adminData) {
          setUserRole('admin');
        } else {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', session.user.id)
            .single();
            
          if (profileData) {
            setUserRole(profileData.user_type as 'client' | 'provider' || 'client');
          } else {
            setUserRole('client');
          }
        }
      } else {
        setUserRole(null);
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
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!mounted) return null;

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'de' : 'en');
  };

  const handleBookingsClick = () => {
    console.log("Bookings button clicked, navigating to bookings");
    navigate('/client/bookings');
    toast({
      title: "My Bookings",
      description: "Navigating to your bookings"
    });
  };

  return (
    <NavbarContainer isVisible={isVisible} scrolled={scrolled}>
      <Logo />
      
      <FeaturedServices />
      
      {/* Desktop navigation with design token styling */}
      <div className="hidden lg:flex items-center space-x-6">
        <div className={cn(
          "flex items-center",
          isMobile ? "space-x-4" : "space-x-6"
        )}>
          <ServicesMegamenu />
          <EnhancedDropdownNavigation navItems={navItems} />
        </div>
      </div>

      {/* Desktop controls with mobile-responsive spacing */}
      <div className={cn(
        "hidden md:flex items-center",
        isMobile ? "space-x-2" : "space-x-3"
      )}>
        {user && (
          <div className="touch-comfortable">
            <UserControls user={user} />
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <div className="touch-comfortable">
            <ThemeToggle />
          </div>
          <div className="touch-comfortable">
            <LanguageSelector 
              currentLanguage={currentLanguage} 
              onLanguageChange={toggleLanguage} 
            />
          </div>
        </div>
        
        {!user && (
          <div className="touch-comfortable">
            <AuthButtons />
          </div>
        )}
      </div>

      {/* Mobile controls with enhanced touch targets */}
      <div className={cn(
        "md:hidden flex items-center",
        "gap-2 min-h-[48px]" // Ensure mobile touch target height
      )}>
        {user && (
          <div className="touch-comfortable">
            <MobileUserControls 
              user={user} 
              handleBookingsClick={handleBookingsClick} 
            />
          </div>
        )}
        
        <div className="touch-comfortable">
          <MobileMenuToggle 
            isMenuOpen={isMenuOpen} 
            setIsMenuOpen={setIsMenuOpen} 
          />
        </div>
      </div>

      <MobileMenu 
        isOpen={isMenuOpen} 
        setIsOpen={setIsMenuOpen}
        isMobileServicesOpen={isMobileServicesOpen} 
        setIsMobileServicesOpen={setIsMobileServicesOpen} 
        currentLanguage={currentLanguage} 
        onLanguageChange={toggleLanguage} 
        userRole={userRole}
      />
    </NavbarContainer>
  );
};

export default Navbar;
