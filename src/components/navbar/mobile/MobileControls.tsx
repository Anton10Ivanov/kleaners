
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
<<<<<<< HEAD
    <div className="flex md:hidden items-center gap-2">
      {user && (
        <button
          onClick={handleBookingsClick}
          className="h-12 w-12 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-xl touch-manipulation flex items-center justify-center"
          aria-label="View bookings"
        >
          <Calendar className="h-5 w-5 text-accent" />
        </button>
      )}
      
      {!user && (
        <button
          onClick={() => navigate('/auth/login')}
          className="h-12 w-12 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-xl touch-manipulation flex items-center justify-center"
          aria-label="Login"
        >
          <LogIn className="h-5 w-5 text-accent" />
        </button>
      )}
      
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          "h-12 w-12 p-0 transition-all duration-200 rounded-xl touch-manipulation flex items-center justify-center",
          isMenuOpen 
            ? "bg-primary text-primary-foreground shadow-lg" 
            : "hover:bg-primary/10 hover:text-primary text-accent"
=======
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
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
        )}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        <Menu className="h-5 w-5" />
<<<<<<< HEAD
      </button>
=======
      </Button>
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
    </div>
  );
};
