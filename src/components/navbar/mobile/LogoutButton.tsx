
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LogoutButtonProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ setIsOpen }) => {
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsOpen(false);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      // Redirect happens via auth state change
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="mt-4">
      <Button
        variant="destructive"
        size="sm"
        onClick={handleLogout}
        className="w-full flex items-center justify-center py-2"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log Out</span>
      </Button>
    </div>
  );
};

export default LogoutButton;
