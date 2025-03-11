
import React from 'react';
import { CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

interface MobileClientControlsProps {
  user: any;
  handleBookingsClick: () => void;
}

const MobileClientControls: React.FC<MobileClientControlsProps> = ({ user, handleBookingsClick }) => {
  if (!user) return null;

  return (
    <Button variant="outline" size="icon" onClick={handleBookingsClick} className="text-primary border-primary p-1 h-8 w-8">
      <CalendarDays className="h-4 w-4" />
    </Button>
  );
};

export default MobileClientControls;
