
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="position">Position of Interest <span className="text-red-500">*</span></Label>
        <Select onValueChange={setPosition} value={position}>
          <SelectTrigger id="position">
            <SelectValue placeholder="Select a position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cleaner">Cleaner</SelectItem>
            <SelectItem value="supervisor">Cleaning Supervisor</SelectItem>
            <SelectItem value="customer-service">Customer Service</SelectItem>
            <SelectItem value="admin">Administrative Staff</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience <span className="text-red-500">*</span></Label>
        <Select onValueChange={setExperience} value={experience}>
          <SelectTrigger id="experience">
            <SelectValue placeholder="Select your experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-1">0-1 years</SelectItem>
            <SelectItem value="1-3">1-3 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="5+">5+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Skills <span className="text-red-500">*</span></Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {["Deep Cleaning", "Commercial Cleaning", "Residential Cleaning", 
            "Window Cleaning", "Carpet Cleaning", "Move In/Out Cleaning"].map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox 
                id={`skill-${skill}`} 
                checked={skills.includes(skill)}
                onCheckedChange={() => toggleSkill(skill)}
              />
              <Label htmlFor={`skill-${skill}`} className="text-sm font-normal">{skill}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Availability <span className="text-red-500">*</span></Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox 
                id={`day-${day}`} 
                checked={availability.includes(day)}
                onCheckedChange={() => toggleAvailability(day)}
              />
              <Label htmlFor={`day-${day}`} className="text-sm font-normal">{day}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
