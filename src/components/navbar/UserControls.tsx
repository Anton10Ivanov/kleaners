
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserControlsProps {
  user: any;
}

const UserControls: React.FC<UserControlsProps> = ({ user }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBookingsClick = () => {
    console.log("Bookings button clicked, navigating to bookings");
    navigate('/client/bookings');
    toast({
      title: "My Bookings",
      description: "Navigating to your bookings"
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleBookingsClick}
      className="flex items-center gap-2 min-h-[44px] px-3 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <Calendar className="h-4 w-4" />
      <span className="hidden lg:inline">My Bookings</span>
    </Button>
  );
};

export default UserControls;
