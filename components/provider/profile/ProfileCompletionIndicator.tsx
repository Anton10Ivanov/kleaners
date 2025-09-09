
import { Progress } from '@/components/ui/progress';
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type ProfileSection = {
  name: string;
  isComplete: boolean;
  weight: number;
};

interface ProfileCompletionIndicatorProps {
  sections: ProfileSection[];
}

export const ProfileCompletionIndicator = ({ sections }: ProfileCompletionIndicatorProps) => {
  // Calculate completion percentage
  const totalWeight = sections.reduce((acc, section) => acc + section.weight, 0);
  const completedWeight = sections
    .filter(section => section.isComplete)
    .reduce((acc, section) => acc + section.weight, 0);
  
  const completionPercentage = Math.round((completedWeight / totalWeight) * 100);
  
  // Determine color based on completion percentage
  const getProgressColor = () => {
    if (completionPercentage < 40) return "bg-red-500";
    if (completionPercentage < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow card-spacing-sm mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium flex items-center gap-2">
          Profile Completion
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-64">Complete your profile to improve visibility to clients and increase booking opportunities.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h3>
        <span className="font-semibold">{completionPercentage}%</span>
      </div>
      
      <Progress value={completionPercentage} className="h-2" indicatorClassName={getProgressColor()} />
      
      {completionPercentage < 100 && (
        <div className="mt-3">
          <p className="text-sm text-muted-foreground">Incomplete sections:</p>
          <ul className="mt-1 component-spacing-xs">
            {sections
              .filter(section => !section.isComplete)
              .map(section => (
                <li key={section.name} className="text-sm flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                  {section.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
