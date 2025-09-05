
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useNavbarHandlers = () => {
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

  return {
    handleBookingsClick
  };
};
