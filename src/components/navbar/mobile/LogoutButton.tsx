
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface LogoutButtonProps {
  setIsOpen: (open: boolean) => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      setIsOpen(false);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account."
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an error logging you out.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
      <Button
        variant="ghost"
        className="w-full justify-start min-h-[44px] px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        onClick={handleLogout}
      >
        <div className="flex items-center gap-3">
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Sign Out</span>
        </div>
      </Button>
    </div>
  );
};

export default LogoutButton;
