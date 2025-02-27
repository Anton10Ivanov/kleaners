
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  UserPlus, 
  LayoutDashboard, 
  LogOut 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useMediaQuery } from "@/hooks/use-media-query";

const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Get user profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single();
          
          if (profile?.first_name || profile?.last_name) {
            setUserName(`${profile.first_name || ''} ${profile.last_name || ''}`.trim());
          } else {
            setUserName(user.email);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAddUser = () => {
    try {
      navigate('/auth/signup');
      
      toast({
        title: "Add New User",
        description: "Redirected to signup page",
      });
    } catch (error) {
      console.error("Navigation error:", error);
      toast({
        variant: "destructive",
        title: "Navigation failed",
        description: "Failed to navigate to signup page",
      });
    }
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

  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <Card className="shadow-lg dark:glass-morphism border-0 dark:border dark:border-gray-800">
        <CardHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddUser}
                  className="hover:text-primary hover:border-primary transition-colors"
                  title="Add New User"
                >
                  <UserPlus className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  className={`hover:text-primary hover:border-primary transition-colors ${isLoading ? 'animate-spin' : ''}`}
                  title="Refresh Data"
                  disabled={isLoading}
                >
                  <RefreshCw className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center">
                <LayoutDashboard className="w-5 h-5 mr-2 text-primary" />
                <CardTitle className="text-xl md:text-2xl">Admin Dashboard</CardTitle>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {userName && (
                <span className="text-sm font-medium hidden md:inline-block">
                  Welcome, {userName}
                </span>
              )}
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleSignOut}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                {isMobile ? "Logout" : "Sign Out"}
              </Button>
            </div>
          </div>
          
          {isMobile && (
            <div className="flex items-center justify-between mt-4 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddUser}
                className="flex-1 hover:text-primary hover:border-primary transition-colors"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                Add User
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className={`flex-1 hover:text-primary hover:border-primary transition-colors ${isLoading ? 'animate-spin' : ''}`}
                disabled={isLoading}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0 sm:p-2 md:p-6">
          <div className="rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm">
            <AdminTabs />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
