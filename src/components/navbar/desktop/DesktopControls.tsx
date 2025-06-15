
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { ThemeToggle, LanguageSelector, UserControls } from '../';
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
      "hidden md:flex items-center",
      getMobileSpacing('sm')
    )}>
      <ul className="flex items-center gap-1 list-none">
        {user && (
          <li className="touch-comfortable">
            <UserControls user={user} />
          </li>
        )}
        
        <li className="touch-comfortable">
          <ThemeToggle />
        </li>
        
        <li className="touch-comfortable">
          <LanguageSelector 
            currentLanguage={currentLanguage} 
            onLanguageChange={onLanguageChange} 
          />
        </li>
        
        {!user && (
          <li className="touch-comfortable">
            <AuthButtons />
          </li>
        )}
      </ul>
    </div>
  );
};
