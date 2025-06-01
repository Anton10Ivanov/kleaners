import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './navbar/Logo';
import { ThemeToggle } from './navbar/ThemeToggle';
import LanguageSelector from './navbar/LanguageSelector';
import { MobileMenu } from './navbar/MobileMenu';
import { AuthButtons } from './navbar/auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import NavbarContainer from './navbar/NavbarContainer';
import UserControls from './navbar/UserControls';
import MobileUserControls from './navbar/MobileUserControls';
import MobileMenuToggle from './navbar/MobileMenuToggle';
import { Icons } from './navbar/navigationData';
import FeaturedServices from './navbar/FeaturedServices';
import { EnhancedDropdownNavigation } from './navbar/EnhancedDropdownNavigation';
import { Heart, HelpCircle, Phone, Users, FileText, Shield } from 'lucide-react';

const navItems = [
  {
    id: 2,
    label: "About",
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
  }, {
    id: 4,
    label: "Legal",
    subMenus: [{
      title: "Legal Information",
      items: [{
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
      
      <EnhancedDropdownNavigation navItems={navItems} />

      <div className="hidden md:flex items-center space-x-3">
        {user && <UserControls user={user} />}
        
        <ThemeToggle />
        <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={toggleLanguage} />
        {!user && <AuthButtons />}
      </div>

      <div className="md:hidden flex items-center gap-2">
        <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={toggleLanguage} />
        
        {user && <MobileUserControls user={user} handleBookingsClick={handleBookingsClick} />}
        
        <MobileMenuToggle isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
