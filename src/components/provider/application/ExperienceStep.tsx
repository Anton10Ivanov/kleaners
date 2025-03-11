
import React, { useEffect } from 'react';
import { PositionSection } from './components/PositionSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EmploymentTypeSection } from './components/EmploymentTypeSection';
import { AvailabilitySection } from './components/AvailabilitySection';
import { SkillsSection } from './components/SkillsSection';
import { EquipmentSection } from './components/EquipmentSection';

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

  // Initialize with all skills selected by default
  useEffect(() => {
    const allSkills = [
      "Deep Cleaning", "Commercial Cleaning",
      "Residential Cleaning", "Window Cleaning",
      "Carpet Cleaning", "Move In/Out Cleaning"
    ];
    
    // For each skill that's not already in the skills array, toggle it
    allSkills.forEach(skill => {
      if (!skills.includes(skill)) {
        toggleSkill(skill);
      }
    });
    
    // Set all days as available by default
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].forEach(day => {
      if (!availability.includes(day)) {
        toggleAvailability(day);
      }
    });
    
    // Set default for own vehicle and supplies
    if (!availability.includes("own-vehicle")) {
      toggleAvailability("own-vehicle");
    }
    
    if (!availability.includes("own-supplies")) {
      toggleAvailability("own-supplies");
    }
    
    // Default to vollzeit if no employment type is selected
    const hasEmploymentType = ["vollzeit", "midijob", "minijob"].some(type => availability.includes(type));
    if (!hasEmploymentType) {
      toggleAvailability("vollzeit");
    }
  }, []);

  const selectedEmploymentType = availability.find(type => ["vollzeit", "midijob", "minijob"].includes(type)) || "";
  
  const handleEmploymentTypeChange = (value: string) => {
    const filteredAvailability = availability.filter(type => !["vollzeit", "midijob", "minijob"].includes(type));
    
    if (selectedEmploymentType === value) return;
    
    if (selectedEmploymentType) {
      toggleAvailability(selectedEmploymentType);
    }
    
    toggleAvailability(value);
  };

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
