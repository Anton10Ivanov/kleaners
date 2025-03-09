
import { useState } from 'react';
import { useJoinTeamForm } from '@/hooks/useJoinTeamForm';
import { ApplicationForm } from '@/components/provider/application/ApplicationForm';
import { BenefitsPanel } from '@/components/provider/application/BenefitsPanel';
import { SuccessSubmission } from '@/components/provider/application/SuccessSubmission';
import { Button } from '@/components/ui/button';

const JoinTeam = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const {
    currentStep,
    formProgress,
    name,
    email,
    phone,
    position,
    experience,
    availability,
    skills,
    resume,
    backgroundCheckConsent,
    message,
    agreeToTerms,
    agreeToBackgroundCheck,
    agreeToTraining,
    isLoading,
    applicationSubmitted,
    applicationId,
    setName,
    setEmail,
    setPhone,
    setPosition,
    setExperience,
    setMessage,
    setAgreeToTerms,
    setAgreeToBackgroundCheck,
    setAgreeToTraining,
    nextStep,
    prevStep,
    handleSubmit,
    handleFileChange,
    toggleAvailability,
    toggleSkill,
  } = useJoinTeamForm();

  if (applicationSubmitted) {
    return <SuccessSubmission email={email} applicationId={applicationId} />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join Our Team
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            We're looking for passionate individuals to join our cleaning service. Apply today and become part of our growing team!
          </p>
          
          {!showApplicationForm && (
            <Button 
              size="lg" 
              onClick={() => setShowApplicationForm(true)}
              className="font-semibold text-base px-8 py-6 mb-8"
            >
              Apply Now
            </Button>
          )}
        </div>

        {!showApplicationForm ? (
          <div className="space-y-12">
            <BenefitsPanel className="border-0 shadow-md" />
          </div>
        ) : (
          <div className="w-full">
            <ApplicationForm 
              currentStep={currentStep}
              formProgress={formProgress}
              name={name}
              email={email}
              phone={phone}
              position={position}
              experience={experience}
              availability={availability}
              skills={skills}
              resume={resume}
              backgroundCheckConsent={backgroundCheckConsent}
              message={message}
              agreeToTerms={agreeToTerms}
              agreeToBackgroundCheck={agreeToBackgroundCheck}
              agreeToTraining={agreeToTraining}
              isLoading={isLoading}
              setName={setName}
              setEmail={setEmail}
              setPhone={setPhone}
              setPosition={setPosition}
              setExperience={setExperience}
              setMessage={setMessage}
              setAgreeToTerms={setAgreeToTerms}
              setAgreeToBackgroundCheck={setAgreeToBackgroundCheck}
              setAgreeToTraining={setAgreeToTraining}
              handleFileChange={handleFileChange}
              toggleAvailability={toggleAvailability}
              toggleSkill={toggleSkill}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinTeam;
