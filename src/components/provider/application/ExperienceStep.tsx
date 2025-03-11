
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface ExperienceStepProps {
  position: string;
  experience: string;
  availability: string[];
  skills: string[];
  setPosition: (value: string) => void;
  setExperience: (value: string) => void;
  toggleAvailability: (value: string) => void;
  toggleSkill: (value: string) => void;
}

export const ExperienceStep = ({
  position,
  experience,
  availability,
  skills,
  setPosition,
  setExperience,
  toggleAvailability,
  toggleSkill
}: ExperienceStepProps) => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const toggleEquipment = (equipment: string) => {
    if (selectedEquipment.includes(equipment)) {
      setSelectedEquipment(selectedEquipment.filter(item => item !== equipment));
    } else {
      setSelectedEquipment([...selectedEquipment, equipment]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="position" className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Position of Interest <span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={setPosition} value={position}>
          <SelectTrigger id="position" className="w-full">
            <SelectValue placeholder="Select a position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cleaner">Cleaner</SelectItem>
            <SelectItem value="supervisor">Cleaning Supervisor</SelectItem>
            <SelectItem value="customer-service">Customer Service</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience" className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Years of Experience <span className="text-red-500">*</span>
        </Label>
        <Select onValueChange={setExperience} value={experience}>
          <SelectTrigger id="experience" className="w-full">
            <SelectValue placeholder="Select your experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-1">0-1 years</SelectItem>
            <SelectItem value="1-3">1-3 years</SelectItem>
            <SelectItem value="3+">3+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Employment Type <span className="text-red-500">*</span>
        </Label>
        <RadioGroup 
          value={availability.find(type => ["vollzeit", "midijob", "minijob"].includes(type)) || ""} 
          onValueChange={(value) => {
            // Remove any existing employment type
            const filteredAvailability = availability.filter(type => !["vollzeit", "midijob", "minijob"].includes(type));
            // Add the new employment type
            toggleAvailability(value);
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1"
        >
          {[
            { id: "vollzeit", label: "Vollzeit (Full-time)" },
            { id: "midijob", label: "Midijob (Part-time)" },
            { id: "minijob", label: "Minijob (Mini job)" }
          ].map((type) => (
            <div
              key={type.id}
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors cursor-pointer
                ${availability.includes(type.id) 
                  ? 'bg-green-500/10 border-green-500' 
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => {
                // Remove any existing employment type
                const filteredAvailability = availability.filter(item => !["vollzeit", "midijob", "minijob"].includes(item));
                // Add the new employment type if it's not already there
                if (!availability.includes(type.id)) {
                  toggleAvailability(type.id);
                }
              }}
            >
              <RadioGroupItem id={`job-type-${type.id}`} value={type.id} className="h-5 w-5" />
              <Label 
                htmlFor={`job-type-${type.id}`} 
                className="text-sm font-medium cursor-pointer flex-grow"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          Select the type of employment you are looking for
        </p>
      </div>
      
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Availability <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div 
              key={day} 
              className={`flex items-center space-x-2 p-4 rounded-lg border transition-colors cursor-pointer
                ${availability.includes(day) 
                  ? 'bg-green-500/10 border-green-500' 
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => toggleAvailability(day)}
            >
              <Checkbox 
                id={`day-${day}`} 
                checked={availability.includes(day)}
                onCheckedChange={() => toggleAvailability(day)}
                className="h-5 w-5"
              />
              <Label 
                htmlFor={`day-${day}`} 
                className="text-sm font-medium cursor-pointer flex-grow"
              >
                {day}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          Select all days when you would be available to work
        </p>
      </div>
      
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          My Skills or Interests of Work <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {[
            ["Deep Cleaning", "Commercial Cleaning"],
            ["Residential Cleaning", "Window Cleaning"],
            ["Carpet Cleaning", "Move In/Out Cleaning"]
          ].map((row, rowIndex) => (
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
                        'bg-green-500 text-white border-green-600' : 
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
                        'bg-red-500 text-white border-red-600' : 
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
      
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Equipment & Resources <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-3 pt-1">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Do you have your own vehicle?</Label>
              <div className="flex space-x-3">
                <div 
                  className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors border ${
                    availability.includes("own-vehicle") ? 
                    'bg-green-500 text-white border-green-600' : 
                    'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                  onClick={() => {
                    if (!availability.includes("own-vehicle")) {
                      toggleAvailability("own-vehicle");
                    }
                  }}
                >
                  <span className="font-medium">Yes</span>
                </div>
                <div 
                  className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors border ${
                    !availability.includes("own-vehicle") ? 
                    'bg-red-500 text-white border-red-600' : 
                    'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                  onClick={() => {
                    if (availability.includes("own-vehicle")) {
                      toggleAvailability("own-vehicle");
                    }
                  }}
                >
                  <span className="font-medium">No</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Do you have your own cleaning supplies?</Label>
              <div className="flex space-x-3">
                <div 
                  className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors border ${
                    availability.includes("own-supplies") ? 
                    'bg-green-500 text-white border-green-600' : 
                    'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                  onClick={() => {
                    if (!availability.includes("own-supplies")) {
                      toggleAvailability("own-supplies");
                    }
                  }}
                >
                  <span className="font-medium">Yes</span>
                </div>
                <div 
                  className={`flex items-center px-3 py-1 rounded-md cursor-pointer transition-colors border ${
                    !availability.includes("own-supplies") ? 
                    'bg-red-500 text-white border-red-600' : 
                    'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                  }`}
                  onClick={() => {
                    if (availability.includes("own-supplies")) {
                      toggleAvailability("own-supplies");
                    }
                  }}
                >
                  <span className="font-medium">No</span>
                </div>
              </div>
            </div>
            
            {availability.includes("own-supplies") && (
              <div className="mt-4 border-t pt-3 border-gray-200 dark:border-gray-700">
                <Label className="text-sm font-medium mb-2 block">Select the equipment you have:</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Vacuum Cleaner", 
                    "Mop and Bucket", 
                    "Microfiber Cloths",
                    "Cleaning Chemicals", 
                    "Broom and Dustpan", 
                    "Squeegee",
                    "Scrub Brushes",
                    "Extension Pole"
                  ].map((equipment) => (
                    <div 
                      key={equipment}
                      className={`flex items-center space-x-2 p-2 rounded-md border ${
                        selectedEquipment.includes(equipment) ? 
                        'bg-green-500/10 border-green-500' : 
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
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          Let us know about your available equipment
        </p>
      </div>
    </div>
  );
};
