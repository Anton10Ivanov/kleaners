
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { supabase, hasAdminAccess, UserRole } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { 
  Loader2, 
  ShieldAlert, 
  Users, 
  Calendar, 
  Home, 
  LogOut, 
  Settings,
  Menu,
  X 
} from "lucide-react";
import { handleError, ErrorSeverity } from "@/utils/errorHandling";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user }, error: sessionError } = await supabase.auth.getUser();
        
        if (sessionError) {
          handleError(
            sessionError, 
            'Session error', 
            true, 
            { 
              severity: ErrorSeverity.HIGH, 
              component: 'AdminLayout' 
            }
          );
          throw sessionError;
        }

        if (!user) {
          console.log('No user session found - redirecting to login');
          navigate('/auth/login');
          return;
        }

        console.log('Checking admin role for user:', user.id);
        const isAdmin = await hasAdminAccess(user.id);
        
        // Get user display name and check if super admin
        const { data: profileData } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .maybeSingle();
          
        if (profileData?.first_name) {
          setUserName(profileData.first_name);
        } else {
          // Fall back to email if no name is set
          setUserName(user.email?.split('@')[0] || 'Admin');
        }

        // Check if user is super admin
        const { data: roleData } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (roleData?.role === 'super_admin') {
          setUserRole(UserRole.SUPER_ADMIN);
        } else if (isAdmin) {
          setUserRole(UserRole.ADMIN);
        }

        if (!isAdmin) {
          console.log('Not an admin user');
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access this area.",
          });
          navigate('/');
          return;
        }

        console.log('Admin access verified');
        setIsLoading(false);
      } catch (error) {
        handleError(
          error, 
          'Error in admin authentication check', 
          true, 
          { 
            severity: ErrorSeverity.HIGH, 
            component: 'AdminLayout',
            shouldRetry: true,
            maxRetries: 2
          }
        );
        navigate('/auth/login');
      }
    };

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth/login');
      } else {
        checkAdminStatus();
      }
    });

    checkAdminStatus();

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth/login');
    } catch (error) {
      handleError(
        error, 
        'Error signing out', 
        true, 
        { 
          severity: ErrorSeverity.MEDIUM, 
          component: 'AdminLayout' 
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg max-w-md w-full flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <h1 className="text-xl font-semibold mb-2">Verifying Admin Access</h1>
          <p className="text-muted-foreground text-center">
            Please wait while we verify your credentials...
          </p>
        </div>
      </div>
    );
  }

  const isActive = (path: string) => {
    return location.pathname === path ? 
      "bg-primary text-primary-foreground" : 
      "text-muted-foreground hover:bg-muted hover:text-foreground";
  };

  const NavItems = () => (
    <ul className="flex flex-col md:flex-row space-y-1 md:space-y-0 space-x-0 md:space-x-1">
      <li className="w-full md:w-auto">
        <Link 
          to="/admin/dashboard" 
          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center w-full ${isActive('/admin/dashboard')}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Home className="h-4 w-4 mr-2" />
          <span>Dashboard</span>
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link 
          to="/admin/bookings" 
          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center w-full ${isActive('/admin/bookings')}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Calendar className="h-4 w-4 mr-2" />
          <span>Bookings</span>
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link 
          to="/admin/customers" 
          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center w-full ${isActive('/admin/customers')}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Users className="h-4 w-4 mr-2" />
          <span>Customers</span>
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link 
          to="/admin/providers" 
          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center w-full ${isActive('/admin/providers')}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Users className="h-4 w-4 mr-2" />
          <span>Providers</span>
        </Link>
      </li>
      <li className="w-full md:w-auto">
        <Link 
          to="/admin/settings" 
          className={`px-3 py-2 rounded-md text-sm font-medium flex items-center w-full ${isActive('/admin/settings')}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Settings className="h-4 w-4 mr-2" />
          <span>Settings</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <ShieldAlert className="h-5 w-5 text-primary mr-2" />
          <h1 className="text-xl font-bold">Kleaners</h1>
          {userRole === UserRole.SUPER_ADMIN && (
            <span className="ml-2 text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100 rounded-md">
              Super Admin
            </span>
          )}
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6 pb-2 border-b">
                  <div className="flex items-center">
                    <ShieldAlert className="h-5 w-5 text-primary mr-2" />
                    <h2 className="font-bold">Kleaners Admin</h2>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {userName && (
                  <div className="mb-6 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {userRole === UserRole.SUPER_ADMIN ? 'Super Admin' : 'Admin'}
                      </p>
                    </div>
                  </div>
                )}
                
                <nav className="flex-grow">
                  <NavItems />
                </nav>
                
                <div className="mt-auto pt-4 border-t">
                  <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block flex-1 overflow-x-auto ml-6">
          <NavItems />
        </nav>
        
        <div className="flex items-center">
          {userName && (
            <div className="hidden md:flex items-center mr-3 rounded-full px-3 py-1 bg-primary/10">
              <span className="text-sm font-medium">{userName}</span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout} className="hidden md:flex whitespace-nowrap">
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-auto">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-sm p-3 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Kleaners Admin Dashboard</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
