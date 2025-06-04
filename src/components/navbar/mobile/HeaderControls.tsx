
import React from 'react';
import { ThemeToggle } from '../ThemeToggle';

interface HeaderControlsProps {
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Language: {currentLanguage.toUpperCase()}
      </div>
    </div>
  );
};

export default HeaderControls;
