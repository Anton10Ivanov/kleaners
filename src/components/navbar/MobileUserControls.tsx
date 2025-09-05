
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface MobileUserControlsProps {
  user: any;
  handleBookingsClick: () => void;
}

const MobileUserControls: React.FC<MobileUserControlsProps> = ({ 
  user, 
  handleBookingsClick 
}) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleBookingsClick}
      className="p-2 min-h-[44px] min-w-[44px]"
      aria-label="My Bookings"
    >
      <Calendar className="h-5 w-5" />
    </Button>
  );
};

export default MobileUserControls;
