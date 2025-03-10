
import React from 'react';

export const useFormHandlers = (
  availability: string[],
  skills: string[],
  setAvailability: React.Dispatch<React.SetStateAction<string[]>>,
  setSkills: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };
  
  const toggleAvailability = (day: string) => {
    setAvailability(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  };
  
  const toggleSkill = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  return {
    handleFileChange,
    toggleAvailability,
    toggleSkill
  };
};
