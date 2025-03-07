
import { CheckCircle2, XCircle } from "lucide-react";

interface ConfirmationStepProps {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  skills: string[];
  availability: string[];
  resume: File | null;
  backgroundCheckConsent: File | null;
  hasCriminalRecord: boolean;
}

export const ConfirmationStep = ({
  name,
  email,
  phone,
  position,
  experience,
  skills,
  availability,
  resume,
  backgroundCheckConsent,
  hasCriminalRecord
}: ConfirmationStepProps) => {
  // Separate employment types from availability days
  const employmentTypes = availability.filter(item => 
    ['vollzeit', 'midijob', 'minijob'].includes(item)
  ).map(type => {
    const labels: Record<string, string> = {
      'vollzeit': 'Vollzeit (Full-time)',
      'midijob': 'Midijob (Part-time)',
      'minijob': 'Minijob (Mini job)'
    };
    return labels[type] || type;
  });
  
  const availableDays = availability.filter(item => 
    !['vollzeit', 'midijob', 'minijob'].includes(item)
  );

  // Format experiences
  const experienceText = {
    '0-1': '0-1 years',
    '1-3': '1-3 years',
    '3-5': '3-5 years',
    '5+': '5+ years'
  }[experience] || experience;

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Review Your Application</h3>
        <p className="text-sm text-gray-500">Please review your information before submitting</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 dark:text-white">Personal Information</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Name:</span> {name}</p>
            <p><span className="font-medium">Email:</span> {email}</p>
            <p><span className="font-medium">Phone:</span> {phone}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 dark:text-white">Experience & Position</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Position:</span> {position.charAt(0).toUpperCase() + position.slice(1)}</p>
            <p><span className="font-medium">Experience:</span> {experienceText}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 dark:text-white">Employment Type</h4>
          {employmentTypes.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {employmentTypes.map((type) => (
                <span 
                  key={type} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-50"
                >
                  {type}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No employment type selected</p>
          )}
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 dark:text-white">Availability</h4>
          {availableDays.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {availableDays.map((day) => (
                <span 
                  key={day} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-50"
                >
                  {day}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No availability selected</p>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium text-gray-800 dark:text-white">Skills</h4>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-50"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No skills selected</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 dark:text-white">Documents</h4>
          <div className="space-y-1 text-sm">
            <p className="flex items-center space-x-2">
              <span className="font-medium">Resume:</span>
              {resume ? (
                <span className="flex items-center text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Uploaded
                </span>
              ) : (
                <span className="flex items-center text-red-600">
                  <XCircle className="h-4 w-4 mr-1" /> Not uploaded
                </span>
              )}
            </p>
            <p className="flex items-center space-x-2">
              <span className="font-medium">Background Check:</span>
              {backgroundCheckConsent ? (
                <span className="flex items-center text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Uploaded
                </span>
              ) : (
                <span className="flex items-center text-amber-600">
                  <span className="flex items-center">Not required</span>
                </span>
              )}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 dark:text-white">Background Check</h4>
          <p className="flex items-center space-x-2 text-sm">
            <span className="font-medium">Criminal Record:</span>
            {!hasCriminalRecord ? (
              <span className="flex items-center text-green-600">
                <CheckCircle2 className="h-4 w-4 mr-1" /> No criminal record
              </span>
            ) : (
              <span className="flex items-center text-red-600">
                <XCircle className="h-4 w-4 mr-1" /> Has criminal record
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
