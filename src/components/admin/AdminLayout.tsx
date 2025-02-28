
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { supabase, hasAdminAccess, UserRole } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ShieldAlert, Users, Calendar, Home, LogOut, Settings } from "lucide-react";
import { handleError, ErrorSeverity } from "@/utils/errorHandling";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);

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
        
        // Get user display name
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Kleaners Admin</h1>
        </div>
        
        <nav className="flex-1 overflow-x-auto">
          <ul className="flex space-x-1 sm:space-x-2 justify-start sm:justify-center">
            <li>
              <Link 
                to="/admin/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap flex items-center ${isActive('/admin/dashboard')}`}
              >
                <Home className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/bookings" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap flex items-center ${isActive('/admin/bookings')}`}
              >
                <Calendar className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Bookings</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/customers" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap flex items-center ${isActive('/admin/customers')}`}
              >
                <Users className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Customers</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/providers" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap flex items-center ${isActive('/admin/providers')}`}
              >
                <Users className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Providers</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/settings" 
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap flex items-center ${isActive('/admin/settings')}`}
              >
                <Settings className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center gap-2">
          <span className="text-sm hidden sm:inline">Welcome, {userName}</span>
          <Button variant="outline" size="sm" onClick={handleLogout} className="whitespace-nowrap">
            <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Log Out</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-sm p-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Kleaners Admin Dashboard</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
