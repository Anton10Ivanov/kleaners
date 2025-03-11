
import React from 'react';
import { ThemeToggle } from '../ThemeToggle';
import LanguageSelector from '../LanguageSelector';

interface HeaderControlsProps {
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <ThemeToggle />
      <LanguageSelector 
        currentLanguage={currentLanguage}
        onLanguageChange={onLanguageChange}
      />
    </div>
  );
};

export default HeaderControls;
