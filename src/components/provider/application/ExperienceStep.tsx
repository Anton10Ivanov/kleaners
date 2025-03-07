
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
            <SelectItem value="admin">Administrative Staff</SelectItem>
            <SelectItem value="other">Other</SelectItem>
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
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="5+">5+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Employment Type <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
          {[
            { id: "vollzeit", label: "Vollzeit (Full-time)" },
            { id: "midijob", label: "Midijob (Part-time)" },
            { id: "minijob", label: "Minijob (Mini job)" }
          ].map((type) => (
            <div key={type.id} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
              <Checkbox 
                id={`job-type-${type.id}`} 
                checked={availability.includes(type.id)}
                onCheckedChange={() => toggleAvailability(type.id)}
                className="h-5 w-5"
              />
              <Label 
                htmlFor={`job-type-${type.id}`} 
                className="text-sm font-medium cursor-pointer"
              >
                {type.label}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          Select the type of employment you are looking for
        </p>
      </div>
      
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Availability <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <div key={day} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors">
              <Checkbox 
                id={`day-${day}`} 
                checked={availability.includes(day)}
                onCheckedChange={() => toggleAvailability(day)}
                className="h-4 w-4"
              />
              <Label 
                htmlFor={`day-${day}`} 
                className="text-sm font-medium cursor-pointer"
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
          Skills <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {["Deep Cleaning", "Commercial Cleaning", "Residential Cleaning", 
            "Window Cleaning", "Carpet Cleaning", "Move In/Out Cleaning"].map((skill) => (
            <div key={skill} className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <Checkbox 
                id={`skill-${skill}`} 
                checked={skills.includes(skill)}
                onCheckedChange={() => toggleSkill(skill)}
                className="h-5 w-5"
              />
              <Label 
                htmlFor={`skill-${skill}`} 
                className="text-sm font-medium cursor-pointer"
              >
                {skill}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          Select all cleaning skills that you possess
        </p>
      </div>
    </div>
  );
};
