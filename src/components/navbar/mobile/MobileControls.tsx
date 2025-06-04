
import { cn } from '@/lib/utils';
import { MobileUserControls, MobileMenuToggle } from '../';

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
  return (
    <div className={cn(
      "md:hidden flex items-center",
      "gap-2 min-h-[48px]" // Ensure mobile touch target height
    )}>
      {user && (
        <div className="touch-comfortable">
          <MobileUserControls 
            user={user} 
            handleBookingsClick={handleBookingsClick} 
          />
        </div>
      )}
      
      <div className="touch-comfortable">
        <MobileMenuToggle 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
        />
      </div>
    </div>
  );
};
