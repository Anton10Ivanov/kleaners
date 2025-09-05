
import React from 'react';

interface HeaderControlsProps {
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

const HeaderControls: React.FC<HeaderControlsProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        {/* Theme toggle removed - light mode only */}
      </div>
      
      <div className="text-xs text-gray-500">
        Language: {currentLanguage.toUpperCase()}
      </div>
    </div>
  );
};

export default HeaderControls;
