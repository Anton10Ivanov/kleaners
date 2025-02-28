
import { useNavigate } from "react-router-dom";
import { 
  Calendar,
  Users,
  Settings,
  LayoutDashboard, 
  UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminPanel = () => {
  const navigate = useNavigate();

  const adminSections = [
    {
      title: "Dashboard",
      description: "Overview of bookings, customers, and providers",
      icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
      path: "/admin/dashboard"
    },
    {
      title: "Bookings",
      description: "Manage all cleaning service bookings",
      icon: <Calendar className="h-8 w-8 text-primary" />,
      path: "/admin/bookings"
    },
    {
      title: "Customers",
      description: "View and manage customer accounts",
      icon: <Users className="h-8 w-8 text-primary" />,
      path: "/admin/customers"
    },
    {
      title: "Service Providers",
      description: "Manage cleaning service providers",
      icon: <UserCog className="h-8 w-8 text-primary" />,
      path: "/admin/providers"
    },
    {
      title: "Settings",
      description: "Configure system settings",
      icon: <Settings className="h-8 w-8 text-primary" />,
      path: "/admin/settings"
    }
  ];

  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminSections.map((section, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="bg-primary/5 pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {section.icon}
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">{section.description}</p>
                <Button 
                  className="w-full" 
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
