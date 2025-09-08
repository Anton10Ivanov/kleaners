
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Phone, CheckCircle2, Building2, Users, Clock } from 'lucide-react';
import { WizardAnswers } from '../index';

interface ConsultationCTAProps {
  answers: WizardAnswers;
  onBack: () => void;
}

export const ConsultationCTA: React.FC<ConsultationCTAProps> = ({ answers, onBack }) => {
  const handleScheduleVisit = () => {
    // Navigate to consultation booking
    console.log('Schedule visit for:', answers);
  };

  const handleCallNow = () => {
    // Initiate phone call
    window.open('tel:+1234567890');
  };

  const getComplexityReason = () => {
    if (answers.officeType?.id === 'enterprise') {
      return 'Enterprise-scale facilities require customized cleaning solutions';
    }
    if (answers.officeType?.id === 'large' && answers.traffic?.id === 'public') {
      return 'High-traffic large offices need specialized attention and assessment';
    }
    if (answers.frequency && answers.frequency > 5) {
      return 'Intensive daily cleaning requires detailed planning and custom pricing';
    }
    return 'Your requirements need personalized assessment for accurate pricing';
  };

  return (
    <div className="min-h-screen bg-section-primary pt-20 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 section-spacing-xs bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Building2 className="h-4 w-4 mr-2" />
            Custom Solution Required
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Let's Schedule a Site Visit
          </h1>
          <p className="text-muted-foreground">
            {getComplexityReason()}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border card-spacing-lg mb-8">
          {/* Your Requirements */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
              Your Requirements
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center card-spacing-sm bg-muted/30 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold text-foreground">
                  {answers.officeType?.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {answers.officeType?.sqft.toLocaleString()} sqft
                </div>
              </div>

              <div className="text-center card-spacing-sm bg-muted/30 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold text-foreground">
                  {answers.traffic?.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  Office traffic
                </div>
              </div>

              <div className="text-center card-spacing-sm bg-muted/30 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold text-foreground">
                  {answers.frequency}x per week
                </div>
                <div className="text-sm text-muted-foreground">
                  Cleaning frequency
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
              What Happens Next
            </h3>
            
            <div className="form-spacing-relaxed">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  1
                </div>
                <div>
                  <div className="font-medium text-foreground">Site Assessment</div>
                  <div className="text-sm text-muted-foreground">
                    Our cleaning specialist visits your office to understand your specific needs
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  2
                </div>
                <div>
                  <div className="font-medium text-foreground">Custom Proposal</div>
                  <div className="text-sm text-muted-foreground">
                    Receive a detailed proposal with transparent pricing and service details
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                  3
                </div>
                <div>
                  <div className="font-medium text-foreground">Service Launch</div>
                  <div className="text-sm text-muted-foreground">
                    Start your cleaning service with a dedicated team and account manager
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl card-spacing-md mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800 dark:text-green-400">
                Free Consultation & Quote
              </span>
            </div>
            <div className="text-sm text-green-700 dark:text-green-300 component-spacing-xs">
              <div>• No obligation assessment</div>
              <div>• Customized cleaning plan</div>
              <div>• Transparent, competitive pricing</div>
              <div>• Same-day response guarantee</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleScheduleVisit}
              className="flex-1 h-12 text-base font-medium"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Site Visit
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleCallNow}
              className="flex-1 h-12 text-base font-medium"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Modify Requirements
          </Button>
        </div>
      </div>
    </div>
  );
};
