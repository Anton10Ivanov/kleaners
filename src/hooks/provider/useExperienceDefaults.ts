
import { useEffect } from 'react';

/**
 * A hook to initialize default values for the experience step form
 */
export const useExperienceDefaults = (
  skills: string[],
  availability: string[],
  toggleSkill: (value: string) => void,
  toggleAvailability: (value: string) => void,
) => {
  // Initialize with all skills selected and availability settings by default
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
  }, []);  // Empty dependency array ensures this only runs once

  // Calculate the currently selected employment type
  const selectedEmploymentType = availability.find(type => ["vollzeit", "midijob", "minijob"].includes(type)) || "";
  
  // Handle employment type changes
  const handleEmploymentTypeChange = (value: string) => {
    // Don't do anything if clicking on the already selected type
    if (selectedEmploymentType === value) return;
    
    // Toggle off the current employment type if one exists
    if (selectedEmploymentType) {
      toggleAvailability(selectedEmploymentType);
    }
    
    // Toggle on the new employment type
    toggleAvailability(value);
  };

  return {
    selectedEmploymentType,
    handleEmploymentTypeChange
  };
};
