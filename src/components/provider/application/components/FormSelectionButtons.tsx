
import React from 'react';
import { Info } from 'lucide-react';

interface SelectionButtonsProps {
  value: boolean;
  onYesClick: () => void;
  onNoClick: () => void;
  label?: string;
}

export const SelectionButtons: React.FC<SelectionButtonsProps> = ({
  value,
  onYesClick,
  onNoClick,
  label
}) => {
  return (
    <div className="flex space-x-3">
      <div 
        className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors border ${
          value ? 
          'bg-theme-green text-primary-foreground border-primary/60' : 
          'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
        }`}
        onClick={onYesClick}
      >
        <span className="font-medium">Yes</span>
      </div>
      <div 
        className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors border ${
          !value ? 
          'bg-destructive text-destructive-foreground border-destructive/60' : 
          'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
        }`}
        onClick={onNoClick}
      >
        <span className="font-medium">No</span>
      </div>
    </div>
  );
};

export const TooltipIndicator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`inline-flex items-center justify-center w-4 h-4 ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-help transition-colors ${className}`}>
    <Info className="h-3 w-3 text-gray-500" />
  </div>
);
