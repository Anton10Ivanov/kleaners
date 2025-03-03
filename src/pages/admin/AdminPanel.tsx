
import { useNavigate } from "react-router-dom";
import { 
  Calendar,
  Users,
  Settings,
  LayoutDashboard, 
  UserCog,
  Activity,
  LineChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [counts, setCounts] = useState({
    bookings: 0,
    customers: 0,
    providers: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setIsLoading(true);

        // Get bookings count
        const { count: bookingsCount, error: bookingsError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true });

        // Get customers count
        const { count: customersCount, error: customersError } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });

        // Get providers count
        const { count: providersCount, error: providersError } = await supabase
          .from('service_providers')
          .select('*', { count: 'exact', head: true });

        if (bookingsError || customersError || providersError) {
          console.error("Error fetching counts:", { 
            bookingsError, customersError, providersError 
          });
          toast({
            variant: "destructive",
            title: "Data Load Error",
            description: "Failed to fetch overview statistics."
          });
        } else {
          setCounts({
            bookings: bookingsCount || 0,
            customers: customersCount || 0,
            providers: providersCount || 0
          });
        }
      } catch (error) {
        console.error("Error in fetch counts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, [toast]);

  const adminSections = [
    {
      title: "Dashboard",
      description: "Analytics and statistics overview",
      icon: <LineChart className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
      path: "/admin/dashboard",
      count: null
    },
    {
      title: "Bookings",
      description: "Manage all cleaning service bookings",
      icon: <Calendar className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
      path: "/admin/bookings",
      count: counts.bookings
    },
    {
      title: "Customers",
      description: "View and manage customer accounts",
      icon: <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
      path: "/admin/customers",
      count: counts.customers
    },
    {
      title: "Service Providers",
      description: "Manage cleaning service providers",
      icon: <UserCog className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
      path: "/admin/providers",
      count: counts.providers
    },
    {
      title: "Settings",
      description: "Configure system settings",
      icon: <Settings className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
      path: "/admin/settings",
      count: null
    }
  ];

  return (
    <div className="container mx-auto py-2 px-2 md:py-8 md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Admin Control Panel</h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">
              Manage all aspects of your cleaning service business
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              size={isMobile ? "sm" : "default"}
              onClick={() => navigate('/')}
              className="text-xs sm:text-sm"
            >
              Visit Website
            </Button>
            <Button 
              variant="default"
              size={isMobile ? "sm" : "default"}
              onClick={() => navigate('/admin/dashboard')}
              className="text-xs sm:text-sm"
            >
              <Activity className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              View Analytics
            </Button>
          </div>
        </div>
        
        {/* Statistics Overview */}
        <div className={`grid grid-cols-1 ${isMobile ? 'space-y-2' : 'sm:grid-cols-3 gap-4'} mb-6 md:mb-8`}>
          <Card>
            <CardHeader className="pb-1 md:pb-2">
              <CardTitle className="text-sm md:text-lg">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">
                {isLoading ? (
                  <div className="h-8 md:h-9 w-12 md:w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  counts.bookings
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All time booking count
              </p>
            </CardContent>
          </Card>
          
          <Card className={isMobile ? 'mt-2' : ''}>
            <CardHeader className="pb-1 md:pb-2">
              <CardTitle className="text-sm md:text-lg">Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">
                {isLoading ? (
                  <div className="h-8 md:h-9 w-12 md:w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  counts.customers
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Registered customer accounts
              </p>
            </CardContent>
          </Card>
          
          <Card className={isMobile ? 'mt-2' : ''}>
            <CardHeader className="pb-1 md:pb-2">
              <CardTitle className="text-sm md:text-lg">Service Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">
                {isLoading ? (
                  <div className="h-8 md:h-9 w-12 md:w-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                ) : (
                  counts.providers
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Active cleaning personnel
              </p>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {adminSections.map((section, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/5 pb-1 md:pb-2">
                <CardTitle className="flex items-center gap-2 text-sm md:text-lg">
                  {section.icon}
                  <span>{section.title}</span>
                  
                  {section.count !== null && (
                    <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 md:py-1 rounded-full">
                      {isLoading ? '...' : section.count}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 md:pt-4">
                <CardDescription className="text-xs md:text-sm mb-2 md:mb-4">
                  {section.description}
                </CardDescription>
                <Button 
                  className="w-full text-xs md:text-sm py-1 md:py-2" 
                  onClick={() => navigate(section.path)}
                >
                  Go to {section.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
