
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { SelectionButtons, TooltipIndicator } from './FormSelectionButtons';

interface EquipmentSectionProps {
  availability: string[];
  toggleAvailability: (value: string) => void;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ 
  availability, 
  toggleAvailability 
}) => {
  const allEquipment = [
    "Vacuum Cleaner", 
    "Mop and Bucket", 
    "Microfiber Cloths",
    "Cleaning Chemicals", 
    "Broom and Dustpan", 
    "Squeegee",
    "Scrub Brushes",
    "Extension Pole"
  ];
  
  // Initialize with all equipment selected by default
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(allEquipment);

  const toggleEquipment = (equipment: string) => {
    if (selectedEquipment.includes(equipment)) {
      setSelectedEquipment(selectedEquipment.filter(item => item !== equipment));
    } else {
      setSelectedEquipment([...selectedEquipment, equipment]);
    }
  };

  const hasOwnVehicle = availability.includes("own-vehicle");
  const hasOwnSupplies = availability.includes("own-supplies");

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-1">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Equipment & Resources
        </Label>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TooltipIndicator />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-primary text-primary-foreground border border-primary/60 p-2 text-sm max-w-xs">
              <p>Let us know what equipment and resources you have available</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-3 pt-1">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium">Do you have your own vehicle?</Label>
            <SelectionButtons
              value={hasOwnVehicle}
              onYesClick={() => {
                if (!hasOwnVehicle) toggleAvailability("own-vehicle");
              }}
              onNoClick={() => {
                if (hasOwnVehicle) toggleAvailability("own-vehicle");
              }}
            />
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium">Do you have your own cleaning supplies?</Label>
            <SelectionButtons
              value={hasOwnSupplies}
              onYesClick={() => {
                if (!hasOwnSupplies) toggleAvailability("own-supplies");
              }}
              onNoClick={() => {
                if (hasOwnSupplies) toggleAvailability("own-supplies");
              }}
            />
          </div>
          
          {hasOwnSupplies && (
            <div className="mt-4 border-t pt-3 border-gray-200 dark:border-gray-700">
              <Label className="text-sm font-medium mb-2 block">Select the equipment you have:</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {allEquipment.map((equipment) => (
                  <div 
                    key={equipment}
                    className={`flex items-center space-x-2 p-2 rounded-md border ${
                      selectedEquipment.includes(equipment) ? 
                      'bg-theme-green border-primary/50 dark:bg-theme-green dark:border-primary/50' : 
                      'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => toggleEquipment(equipment)}
                  >
                    <Checkbox 
                      id={`equipment-${equipment}`}
                      checked={selectedEquipment.includes(equipment)}
                      onCheckedChange={() => toggleEquipment(equipment)}
                      className="h-4 w-4"
                    />
                    <Label 
                      htmlFor={`equipment-${equipment}`}
                      className="text-sm cursor-pointer"
                    >
                      {equipment}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
