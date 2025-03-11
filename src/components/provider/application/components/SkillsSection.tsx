
import React from 'react';
import { Label } from '@/components/ui/label';

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
    <div className="space-y-3">
      <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
        My Skills or Interests of Work <span className="text-red-500">*</span>
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {skillsList.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((skill) => (
              <div 
                key={skill} 
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 transition-colors"
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
      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
        Select all cleaning skills that you possess or are interested in
      </p>
    </div>
  );
};
