
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  UserPlus, 
  LayoutDashboard, 
  LogOut,
  AlertTriangle,
  Calendar,
  Users,
  UserCog
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    console.log("Admin Dashboard component mounted");
    
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching user profile on dashboard component...");
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          console.log("User found:", user.id);
          // Get user profile data
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single();
          
          if (profileError) {
            console.error("Error fetching profile:", profileError);
            return;
          }
          
          if (profile?.first_name || profile?.last_name) {
            setUserName(`${profile.first_name || ''} ${profile.last_name || ''}`.trim());
          } else {
            setUserName(user.email);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user data. Please try refreshing the page.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleQuickNavigation = (path: string, title: string) => {
    navigate(path);
    toast({
      title: title,
      description: `Navigating to ${title.toLowerCase()}`,
    });
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      // Invalidate and refetch all relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["customers"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["providers"] })
      ]);

      toast({
        title: "Success",
        description: "Dashboard data refreshed successfully",
      });
    } catch (error) {
      console.error("Refresh error:", error);
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "Failed to refresh dashboard data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  if (error) {
    return (
      <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <Card className="shadow-lg dark:glass-morphism border-0 dark:border dark:border-gray-800">
        <CardHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <LayoutDashboard className="w-5 h-5 mr-2 text-primary" />
              <CardTitle className="text-xl md:text-2xl">Admin Dashboard</CardTitle>
              {userName && (
                <span className="ml-4 text-sm font-medium hidden md:inline-block">
                  Welcome, {userName}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleRefresh}
                className={`transition-colors ${isLoading ? 'animate-spin' : ''}`}
                disabled={isLoading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleSignOut}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {/* Quick Navigation Cards (Mobile Optimized) */}
        {isMobile && (
          <div className="px-4 pb-4 grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20"
              onClick={() => handleQuickNavigation('/admin/bookings', 'Bookings')}
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span>Bookings</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20"
              onClick={() => handleQuickNavigation('/admin/customers', 'Customers')}
            >
              <Users className="h-5 w-5 mb-1" />
              <span>Customers</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20"
              onClick={() => handleQuickNavigation('/admin/providers', 'Providers')}
            >
              <UserCog className="h-5 w-5 mb-1" />
              <span>Providers</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-20"
              onClick={() => handleQuickNavigation('/admin/settings', 'Settings')}
            >
              <UserPlus className="h-5 w-5 mb-1" />
              <span>Settings</span>
            </Button>
          </div>
        )}

        <CardContent className="p-0 sm:p-2 md:p-6">
          <div className="rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm">
            <AdminTabs />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
