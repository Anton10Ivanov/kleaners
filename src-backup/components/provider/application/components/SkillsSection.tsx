
import React from 'react';
import { Label } from '@/components/ui/label';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from './FormSelectionButtons';

interface SkillsSectionProps {
  skills: string[];
  toggleSkill: (value: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, toggleSkill }) => {
  const skillsList = [
    ["Deep Cleaning", "Commercial Cleaning"],
    ["Residential Cleaning", "Window Cleaning"],
    ["Carpet Cleaning", "Move In/Out Cleaning"]
  ];
  
  return (
    <div className="form-spacing-normal">
      <div className="flex items-center space-x-1">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          My Skills or Interests of Work
        </Label>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TooltipIndicator />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-primary text-primary-foreground border border-primary/60 p-2 text-sm max-w-xs">
              <p>Select all cleaning skills that you possess or are interested in</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {skillsList.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((skill) => (
              <div 
                key={skill} 
                className="flex items-center justify-between card-spacing-sm bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 transition-colors"
              >
                <Label className="text-sm font-medium">{skill}</Label>
                <div className="flex space-x-3">
                  <div 
                    className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors border ${
                      skills.includes(skill) ? 
                      'bg-theme-green text-primary-foreground border-primary/60 dark:bg-theme-green dark:text-primary-foreground dark:border-primary/60' : 
                      'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                    onClick={() => {
                      if (!skills.includes(skill)) {
                        toggleSkill(skill);
                      }
                    }}
                  >
                    <span className="font-medium">Yes</span>
                  </div>
                  <div 
                    className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors border ${
                      !skills.includes(skill) ? 
                      'bg-destructive text-destructive-foreground border-destructive/60' : 
                      'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                    onClick={() => {
                      if (skills.includes(skill)) {
                        toggleSkill(skill);
                      }
                    }}
                  >
                    <span className="font-medium">No</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
