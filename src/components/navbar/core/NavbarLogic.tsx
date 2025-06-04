
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useNavbarLogic = () => {
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

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'de' : 'en');
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
    isMobileServicesOpen,
    setIsMobileServicesOpen,
    isVisible,
    scrolled,
    mounted,
    currentLanguage,
    user,
    userRole,
    toggleLanguage
  };
};
