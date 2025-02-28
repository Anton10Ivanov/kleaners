
interface LanguageSelectorProps {
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

export const LanguageSelector = ({ 
  currentLanguage = 'en', 
  onLanguageChange = () => {} 
}: LanguageSelectorProps) => {
  return (
    <button 
      onClick={onLanguageChange}
      className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
    >
      {currentLanguage.toUpperCase()}
    </button>
  );
};
