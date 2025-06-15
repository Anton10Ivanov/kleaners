
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { LanguageSelector, UserControls } from '../';
import { AuthButtons } from '../auth';

interface DesktopControlsProps {
  user: any;
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

export const DesktopControls = ({ user, currentLanguage, onLanguageChange }: DesktopControlsProps) => {
  const { getMobileSpacing } = useMobileOptimizations();

  return (
    <div className={cn(
      "hidden md:flex items-center gap-1 w-full", // Added w-full to stretch full navbar width
      getMobileSpacing('sm')
    )}>
      {user && (
        <div className="touch-comfortable">
          <UserControls user={user} />
        </div>
      )}
      
      {!user && (
        <div className="touch-comfortable">
          <AuthButtons />
        </div>
      )}
      
      <div className="flex items-center gap-1 ml-auto">
        {/* Use ml-auto to stick language selector etc. to the right */}
        <div className="touch-comfortable">
          <LanguageSelector 
            currentLanguage={currentLanguage} 
            onLanguageChange={onLanguageChange} 
          />
        </div>
      </div>
    </div>
  );
};
