
import React from "react";
import { Card, CardContent, CardHeader } from '@/components/ui/card";
import { ProfileHeader } from "./ProfileHeader";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { PaymentSection } from "./sections/PaymentSection";
import { PersonalStatementSection } from "./sections/PersonalStatementSection";
import { SkillsSection } from "./sections/SkillsSection";
import { AvailabilitySection } from "./sections/AvailabilitySection";
import { EmploymentSection } from "./sections/EmploymentSection";
import { Settings } from "lucide-react";
import { Button } from '@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProfileContentProps {
  provider: any;
  skills: string[];
  availability: string[];
  paymentInfo: any;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({
  provider,
  skills,
  availability,
  paymentInfo
}) => {
  const navigate = useRouter();

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="relative pb-0">
        <ProfileHeader provider={provider} />
      </CardHeader>
      
      <CardContent className="pt-14 px-6 pb-6">
        <div className="mb-6 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate('/provider/settings')}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-spacing-loose">
            <ContactSection provider={provider} />
            <ExperienceSection provider={provider} />
            <PaymentSection paymentInfo={paymentInfo} />
            <PersonalStatementSection message={provider?.message} />
          </div>
          
          <div className="form-spacing-loose">
            <SkillsSection skills={skills} />
            <AvailabilitySection availability={availability} />
            <EmploymentSection />
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t text-center text-gray-500 text-sm">
          <p>Joined on {new Date(provider?.created_at).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};
