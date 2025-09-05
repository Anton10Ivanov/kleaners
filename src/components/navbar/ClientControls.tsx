
import React from 'react';
import { Shield, CalendarDays, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ClientControlsProps {
  user: any;
}

const ClientControls: React.FC<ClientControlsProps> = ({ user }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdminClick = () => {
    console.log("Admin button clicked, navigating to panel");
    navigate('/admin');
    toast({
      title: "Admin Panel",
      description: "Navigating to the admin panel"
    });
  };

  const handleBookingsClick = () => {
    console.log("Bookings button clicked, navigating to bookings");
    navigate('/client/bookings');
    toast({
      title: "My Bookings",
      description: "Navigating to your bookings"
    });
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out"
      });
      // Redirection is handled by auth state change
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!user) return null;

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleAdminClick} className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10">
        <Shield className="h-4 w-4" />
        <span>Panel</span>
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleBookingsClick} className="flex items-center gap-1 text-primary border-primary hover:bg-primary/10">
        <CalendarDays className="h-4 w-4" />
        <span>My Bookings</span>
      </Button>
      
      <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1 text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20">
        <LogOut className="h-4 w-4" />
        <span>Log Out</span>
      </Button>
    </>
  );
};

export default ClientControls;
