
import { Card, CardHeader, CardTitle } from '@/components/ui/card";
import { Button } from '@/components/ui/button";
import { LayoutDashboard, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  userName: string | null;
  isLoading: boolean;
  onRefresh: () => void;
  isMobile: boolean;
}

export const DashboardHeader = ({ userName, isLoading, onRefresh, isMobile }: DashboardHeaderProps) => {
  const navigate = useRouter();
  
  return (
    <CardHeader className="form-spacing-none pb-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center">
          <LayoutDashboard className="w-5 h-5 mr-2 text-primary" />
          <CardTitle className="text-xl md:text-2xl">Analytics Dashboard</CardTitle>
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
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="default"
            size={isMobile ? "sm" : "default"}
            onClick={() => navigate('/admin')}
          >
            <Home className="w-4 h-4 mr-2" />
            Admin Panel
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};
