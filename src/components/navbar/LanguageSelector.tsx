
import { Button } from '@/components/ui/button';
import { LanguagesIcon } from 'lucide-react';

export interface LanguageSelectorProps {
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage = 'en',
  onLanguageChange = () => {},
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onLanguageChange}
      className="hover:text-primary transition-colors"
      title={`Current Language: ${currentLanguage.toUpperCase()}`}
    >
      <span className="sr-only">Toggle Language</span>
      <LanguagesIcon className="h-5 w-5" />
      <span className="ml-1 text-xs font-medium hidden md:inline">
        {currentLanguage.toUpperCase()}
      </span>
    </Button>
  );
};
