
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { Steps, Step } from '@/components/ui/steps';
import { UserPlus, FileText, CheckCheck, CheckCircle } from 'lucide-react';
import { PersonalInfoStep } from '@/components/provider/application/PersonalInfoStep';
import { ExperienceStep } from '@/components/provider/application/ExperienceStep';
import { DocumentsStep } from '@/components/provider/application/DocumentsStep';
import { AgreementStep } from '@/components/provider/application/AgreementStep';
import { ConfirmationStep } from '@/components/provider/application/ConfirmationStep';
import { SuccessSubmission } from '@/components/provider/application/SuccessSubmission';

// Define verification process steps
enum ApplicationStep {
  PERSONAL_INFO = 0,
  EXPERIENCE = 1,
  DOCUMENTS = 2,
  AGREEMENT = 3,
  CONFIRMATION = 4
}

const JoinTeam = () => {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(ApplicationStep.PERSONAL_INFO);
  const [formProgress, setFormProgress] = useState(20);
  
  // Personal info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Experience
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [availability, setAvailability] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  
  // Documents
  const [resume, setResume] = useState<File | null>(null);
  const [identificationDoc, setIdentificationDoc] = useState<File | null>(null);
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState<File | null>(null);
  
  // Agreement
  const [message, setMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToBackgroundCheck, setAgreeToBackgroundCheck] = useState(false);
  const [agreeToTraining, setAgreeToTraining] = useState(false);
  
  // Processing state
  const [isLoading, setIsLoading] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < ApplicationStep.CONFIRMATION) {
      setCurrentStep(prev => prev + 1);
      setFormProgress((prev) => Math.min(prev + 20, 100));
    }
  };

  const prevStep = () => {
    if (currentStep > ApplicationStep.PERSONAL_INFO) {
      setCurrentStep(prev => prev - 1);
      setFormProgress((prev) => Math.max(prev - 20, 20));
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case ApplicationStep.PERSONAL_INFO:
        if (!name || !email || !phone) {
          toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill all the required personal information fields.",
          });
          return false;
        }
        return true;
        
      case ApplicationStep.EXPERIENCE:
        if (!position || !experience || availability.length === 0) {
          toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please provide information about your experience and availability.",
          });
          return false;
        }
        return true;
        
      case ApplicationStep.DOCUMENTS:
        if (!resume) {
          toast({
            variant: "destructive",
            title: "Document Required",
            description: "A resume/CV is required to proceed.",
          });
          return false;
        }
        return true;
        
      case ApplicationStep.AGREEMENT:
        if (!agreeToTerms || !agreeToBackgroundCheck) {
          toast({
            variant: "destructive",
            title: "Agreement Required",
            description: "You must agree to the terms and background check to proceed.",
          });
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep < ApplicationStep.CONFIRMATION) {
      nextStep();
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create provider application record
      const { data, error } = await supabase
        .from('provider_applications')
        .insert({
          full_name: name,
          email: email,
          phone: phone,
          position: position,
          experience_level: experience,
          availability: availability,
          skills: skills,
          message: message,
          background_check_consent: agreeToBackgroundCheck,
          terms_agreement: agreeToTerms,
          training_agreement: agreeToTraining,
          application_status: 'pending_review',
          verification_status: 'not_started'
        })
        .select('id')
        .single();
      
      if (error) throw error;
      
      const applicationId = data?.id;
      setApplicationId(applicationId);

      // Handle document uploads if provided
      const uploadPromises = [];
      
      if (resume && applicationId) {
        const fileExt = resume.name.split('.').pop();
        const resumePath = `provider_applications/${applicationId}/resume_${Date.now()}.${fileExt}`;
        
        uploadPromises.push(
          supabase.storage
            .from('applications')
            .upload(resumePath, resume)
            .then(async (result) => {
              if (result.error) throw result.error;
              
              // Update the record with the resume path
              return supabase
                .from('provider_applications')
                .update({ resume_path: resumePath })
                .eq('id', applicationId);
            })
        );
      }
      
      if (identificationDoc && applicationId) {
        const fileExt = identificationDoc.name.split('.').pop();
        const idPath = `provider_applications/${applicationId}/id_${Date.now()}.${fileExt}`;
        
        uploadPromises.push(
          supabase.storage
            .from('applications')
            .upload(idPath, identificationDoc)
            .then(async (result) => {
              if (result.error) throw result.error;
              
              // Update the record with the ID path
              return supabase
                .from('provider_applications')
                .update({ identification_path: idPath })
                .eq('id', applicationId);
            })
        );
      }
      
      if (backgroundCheckConsent && applicationId) {
        const fileExt = backgroundCheckConsent.name.split('.').pop();
        const consentPath = `provider_applications/${applicationId}/consent_${Date.now()}.${fileExt}`;
        
        uploadPromises.push(
          supabase.storage
            .from('applications')
            .upload(consentPath, backgroundCheckConsent)
            .then(async (result) => {
              if (result.error) throw result.error;
              
              // Update the record with the consent path
              return supabase
                .from('provider_applications')
                .update({ consent_form_path: consentPath })
                .eq('id', applicationId);
            })
        );
      }
      
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      
      // Application successfully submitted
      setApplicationSubmitted(true);
      
      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon!",
      });
      
      // Set up temporary provider account
      setTimeout(() => {
        // Redirect to provider signup page with email prefilled
        navigate(`/auth/signup?type=provider&email=${encodeURIComponent(email)}&applicationId=${applicationId}`);
      }, 3000);
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem submitting your application. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const toggleAvailability = (value: string) => {
    setAvailability(current => 
      current.includes(value)
        ? current.filter(day => day !== value)
        : [...current, value]
    );
  };

  const toggleSkill = (value: string) => {
    setSkills(current => 
      current.includes(value)
        ? current.filter(skill => skill !== value)
        : [...current, value]
    );
  };

  if (applicationSubmitted) {
    return <SuccessSubmission email={email} applicationId={applicationId} />;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case ApplicationStep.PERSONAL_INFO:
        return (
          <PersonalInfoStep
            name={name}
            email={email}
            phone={phone}
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
          />
        );
        
      case ApplicationStep.EXPERIENCE:
        return (
          <ExperienceStep
            position={position}
            experience={experience}
            availability={availability}
            skills={skills}
            setPosition={setPosition}
            setExperience={setExperience}
            toggleAvailability={toggleAvailability}
            toggleSkill={toggleSkill}
          />
        );
        
      case ApplicationStep.DOCUMENTS:
        return (
          <DocumentsStep
            handleFileChange={handleFileChange}
            setResume={setResume}
            setIdentificationDoc={setIdentificationDoc}
            setBackgroundCheckConsent={setBackgroundCheckConsent}
          />
        );
        
      case ApplicationStep.AGREEMENT:
        return (
          <AgreementStep
            message={message}
            agreeToTerms={agreeToTerms}
            agreeToBackgroundCheck={agreeToBackgroundCheck}
            agreeToTraining={agreeToTraining}
            setMessage={setMessage}
            setAgreeToTerms={setAgreeToTerms}
            setAgreeToBackgroundCheck={setAgreeToBackgroundCheck}
            setAgreeToTraining={setAgreeToTraining}
          />
        );
        
      case ApplicationStep.CONFIRMATION:
        return (
          <ConfirmationStep
            name={name}
            email={email}
            phone={phone}
            position={position}
            experience={experience}
            skills={skills}
            availability={availability}
            resume={resume}
            identificationDoc={identificationDoc}
            backgroundCheckConsent={backgroundCheckConsent}
          />
        );
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join Our Team
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're looking for passionate individuals to join our cleaning service. Apply today and become part of our growing team!
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <Card className="border-0 shadow-md md:col-span-3">
            <CardHeader>
              <CardTitle>Provider Application</CardTitle>
              <CardDescription>Step {currentStep + 1} of 5</CardDescription>
              <Progress value={formProgress} className="h-2 mt-2" />
            </CardHeader>
            
            <div className="px-6 pt-2 pb-4">
              <Steps currentStep={currentStep} className="mb-6">
                <Step icon={<UserPlus className="h-4 w-4" />} title="Personal Info" />
                <Step icon={<CheckCircle className="h-4 w-4" />} title="Experience" />
                <Step icon={<FileText className="h-4 w-4" />} title="Documents" />
                <Step icon={<CheckCheck className="h-4 w-4" />} title="Agreement" />
                <Step icon={<CheckCircle className="h-4 w-4" />} title="Review" />
              </Steps>
            </div>
            
            <CardContent>
              {renderStepContent()}
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2 pb-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === ApplicationStep.PERSONAL_INFO || isLoading}
              >
                Previous
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : 
                  currentStep === ApplicationStep.CONFIRMATION ? "Submit Application" : "Next Step"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-0 shadow-md md:col-span-2">
            <CardHeader>
              <CardTitle>Why Work With Us?</CardTitle>
              <CardDescription>Benefits of joining our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Flexible Schedule</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  We offer flexible working hours to accommodate your personal needs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Competitive Pay</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Fair compensation for your skills and experience.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Growth Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Room for advancement and professional development.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Supportive Team</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Join a friendly, diverse, and supportive work environment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
