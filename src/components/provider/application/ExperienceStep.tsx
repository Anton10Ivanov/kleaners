
import React from 'react';
import { PositionSection } from './components/PositionSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EmploymentTypeSection } from './components/EmploymentTypeSection';
import { AvailabilitySection } from './components/AvailabilitySection';
import { SkillsSection } from './components/SkillsSection';
import { EquipmentSection } from './components/EquipmentSection';
import { useExperienceDefaults } from '@/hooks/provider/useExperienceDefaults';

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

  // Use our custom hook to handle defaults and employment type state
  const { selectedEmploymentType, handleEmploymentTypeChange } = useExperienceDefaults(
    skills,
    availability,
    toggleSkill,
    toggleAvailability
  );

  return (
    <div className="space-y-6">
      <PositionSection position={position} setPosition={setPosition} />
      
      <ExperienceSection experience={experience} setExperience={setExperience} />
      
      <EmploymentTypeSection 
        selectedEmploymentType={selectedEmploymentType} 
        handleEmploymentTypeChange={handleEmploymentTypeChange} 
      />
      
      <AvailabilitySection 
        availability={availability} 
        toggleAvailability={toggleAvailability} 
      />
      
      <SkillsSection skills={skills} toggleSkill={toggleSkill} />
      
      <EquipmentSection 
        availability={availability} 
        toggleAvailability={toggleAvailability} 
      />
    </div>
  );
};
