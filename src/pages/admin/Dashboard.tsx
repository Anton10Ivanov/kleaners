
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();

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

  return (
    <div className="container mx-auto py-4 px-2 md:py-8 md:px-4">
      <Card className="shadow-lg dark:glass-morphism">
        <CardHeader className="space-y-0 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddUser}
                className="hover:text-primary hover:border-primary transition-colors"
                title="Add New User"
              >
                <UserPlus className="w-5 h-5" />
              </Button>
              <CardTitle className="text-xl md:text-2xl">Admin Dashboard</CardTitle>
            </div>
          </div>
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
