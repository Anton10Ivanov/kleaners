
import { Menu, Calendar, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MobileControlsProps {
  user: any;
  handleBookingsClick: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const MobileControls = ({ 
  user, 
  handleBookingsClick, 
  isMenuOpen, 
  setIsMenuOpen 
}: MobileControlsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex md:hidden items-center gap-1">
      {user && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookingsClick}
          className="h-10 w-10 p-0 hover:bg-muted"
          aria-label="View bookings"
        >
          <Calendar className="h-5 w-5 text-secondary-text" />
        </Button>
      )}
      
      {!user && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/auth/login')}
          className="h-10 w-10 p-0 hover:bg-muted"
          aria-label="Login"
        >
          <LogIn className="h-5 w-5 text-secondary-text" />
        </Button>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          "h-10 w-10 p-0 hover:bg-muted transition-colors",
          isMenuOpen && "bg-primary/10 text-primary"
        )}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
};
