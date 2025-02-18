
interface LanguageSelectorProps {
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

export const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={onLanguageChange}
        className={`w-8 h-6 rounded overflow-hidden transition-opacity ${currentLanguage === 'de' ? 'opacity-50' : ''}`}
      >
        <img
          src="https://flagcdn.com/w40/de.png"
          alt="German"
          className="w-full h-full object-cover"
        />
      </button>
      <button 
        onClick={onLanguageChange}
        className={`w-8 h-6 rounded overflow-hidden transition-opacity ${currentLanguage === 'en' ? 'opacity-50' : ''}`}
      >
        <img
          src="https://flagcdn.com/w40/gb.png"
          alt="English"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};
