
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, UserRole } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, UserCircle, LogOut, Settings, LayoutDashboard, Calendar, ClipboardList, ShieldCheck, User, Home } from 'lucide-react';

export const AuthButtons = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [customerData, setCustomerData] = useState<any>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        // For development, let's assume the user has all roles
        if (user) {
          setUserRoles([UserRole.ADMIN, UserRole.CLIENT, UserRole.PROVIDER]);
          setCustomerData({ first_name: "Dev", last_name: "User" });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          // For development, let's assume the user has all roles
          setUserRoles([UserRole.ADMIN, UserRole.CLIENT, UserRole.PROVIDER]);
          setCustomerData({ first_name: "Dev", last_name: "User" });
        } else {
          setUserRoles([]);
          setCustomerData(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account.',
      });
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to log out. Please try again.',
      });
    }
  };

  // For development, we'll consider all users to have all roles
  const isAdmin = true;
  const isProvider = true;
  const isCustomer = true;
  const isSuperAdmin = true;

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            <span className="hidden md:inline">
              {customerData?.first_name || user.email || 'My Account'}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {/* Home Link for everyone */}
          <DropdownMenuItem onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            <span>Homepage</span>
          </DropdownMenuItem>
          
          {/* Dashboard based on role - show all for development */}
          <DropdownMenuItem onClick={() => navigate('/user/dashboard')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Customer Dashboard</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/user/dashboard')}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Provider Dashboard</span>
          </DropdownMenuItem>
          
          {/* Client options */}
          <DropdownMenuItem onClick={() => navigate('/user/bookings')}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>My Bookings</span>
          </DropdownMenuItem>
          
          {/* Provider options */}
          <DropdownMenuItem onClick={() => navigate('/provider/assignments')}>
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>My Assignments</span>
          </DropdownMenuItem>
          
          {/* Admin panel access */}
          <DropdownMenuItem onClick={() => navigate('/admin')}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Admin Panel</span>
          </DropdownMenuItem>
          
          {/* Show for all users */}
          <DropdownMenuItem onClick={() => navigate('/user/profile')}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => navigate('/user/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/auth/login')}
      >
        Login
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={() => navigate('/auth/signup')}
      >
        Sign up
      </Button>
    </div>
  );
};
