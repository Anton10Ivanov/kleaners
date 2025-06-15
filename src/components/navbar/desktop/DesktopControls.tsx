
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

  // Only styles for items inside, no excessive width/flex
  return (
    <div className={cn(
      "hidden md:flex items-center gap-2",
      getMobileSpacing('sm')
    )}>
      {user
        ? <UserControls user={user} />
        : <AuthButtons />
      }
      <LanguageSelector
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />
    </div>
  );
};
