
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { Steps, Step } from '@/components/ui/steps';
import { CheckCircle, FileText, CheckCheck, UserPlus, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

  const renderStepContent = () => {
    switch (currentStep) {
      case ApplicationStep.PERSONAL_INFO:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );
        
      case ApplicationStep.EXPERIENCE:
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
        
      case ApplicationStep.DOCUMENTS:
        return (
          <div className="space-y-4">
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Verification Required</AlertTitle>
              <AlertDescription>
                To ensure the safety of our clients, we require documentation and background checks for all service providers.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label htmlFor="resume">Resume/CV <span className="text-red-500">*</span></Label>
              <Input
                id="resume"
                type="file"
                onChange={(e) => handleFileChange(e, setResume)}
                className="cursor-pointer"
                accept=".pdf,.doc,.docx"
              />
              <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="identification">ID Verification</Label>
              <Input
                id="identification"
                type="file"
                onChange={(e) => handleFileChange(e, setIdentificationDoc)}
                className="cursor-pointer"
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <p className="text-xs text-muted-foreground">Please provide a government-issued ID (driver's license, passport, etc.)</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="background-check">Background Check Consent Form</Label>
              <Input
                id="background-check"
                type="file"
                onChange={(e) => handleFileChange(e, setBackgroundCheckConsent)}
                className="cursor-pointer"
                accept=".pdf"
              />
              <p className="text-xs text-muted-foreground">Download, fill and upload our <a href="#" className="text-primary hover:underline">Background Check Consent Form</a></p>
            </div>
          </div>
        );
        
      case ApplicationStep.AGREEMENT:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Why do you want to join our team?</Label>
              <Textarea
                id="message"
                placeholder="Tell us about yourself and why you're interested in this position"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                />
                <div>
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="backgroundCheck" 
                  checked={agreeToBackgroundCheck}
                  onCheckedChange={(checked) => setAgreeToBackgroundCheck(checked === true)}
                />
                <div>
                  <Label htmlFor="backgroundCheck" className="text-sm font-normal">
                    I consent to a background check as part of the application process <span className="text-red-500">*</span>
                  </Label>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="training" 
                  checked={agreeToTraining}
                  onCheckedChange={(checked) => setAgreeToTraining(checked === true)}
                />
                <div>
                  <Label htmlFor="training" className="text-sm font-normal">
                    I am willing to complete required training if my application is accepted
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );
        
      case ApplicationStep.CONFIRMATION:
        return (
          <div className="space-y-4 py-4">
            <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Application Review</AlertTitle>
              <AlertDescription>
                Please review your information before submitting the application.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
                <p><span className="font-medium">Name:</span> {name}</p>
                <p><span className="font-medium">Email:</span> {email}</p>
                <p><span className="font-medium">Phone:</span> {phone}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Professional Information</h3>
                <p><span className="font-medium">Position:</span> {position}</p>
                <p><span className="font-medium">Experience:</span> {experience}</p>
                <p><span className="font-medium">Skills:</span> {skills.join(', ') || 'None specified'}</p>
                <p><span className="font-medium">Availability:</span> {availability.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Documents</h3>
                <p><span className="font-medium">Resume:</span> {resume ? '✓ Uploaded' : '✗ Not uploaded'}</p>
                <p><span className="font-medium">ID Verification:</span> {identificationDoc ? '✓ Uploaded' : '✗ Not uploaded'}</p>
                <p><span className="font-medium">Background Check Consent:</span> {backgroundCheckConsent ? '✓ Uploaded' : '✗ Not uploaded'}</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">By clicking submit, your application will be sent for review.</p>
          </div>
        );
    }
  };

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCheck className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center">Application Submitted!</CardTitle>
              <CardDescription className="text-center">Thank you for applying to join our team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Your application has been received and is now being reviewed. We'll contact you soon about next steps.
              </p>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <p className="text-sm"><span className="font-medium">Application ID:</span> {applicationId}</p>
                <p className="text-sm"><span className="font-medium">Status:</span> Under Review</p>
              </div>
              
              <p className="text-center text-sm text-muted-foreground">
                You'll be redirected to create an account in a few seconds...
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                onClick={() => navigate(`/auth/signup?type=provider&email=${encodeURIComponent(email)}&applicationId=${applicationId}`)}
                className="w-full"
              >
                Continue to Account Setup
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Return to Homepage
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

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
