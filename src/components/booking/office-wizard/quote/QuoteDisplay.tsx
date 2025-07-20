import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, ArrowLeft, Calendar, Download, Phone, Crown, Star, Zap } from 'lucide-react';
import { generateQuote, QuoteResult } from '../utils/questionnaire-logic';
import { WizardAnswers } from '../index';

interface QuoteDisplayProps {
  answers: WizardAnswers;
  onBack: () => void;
  availablePackages: string[];
}

interface PackageOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  frequency: number;
  highlighted?: boolean;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ answers, onBack, availablePackages }) => {
  const [contractTerm, setContractTerm] = useState<'monthly' | 'sixMonth'>('monthly');
  const [showAnnualInterest, setShowAnnualInterest] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  // Define package options
  const packageOptions: PackageOption[] = [
    {
      id: 'essential',
      name: 'Essential Clean',
      icon: <Calendar className="h-5 w-5" />,
      description: 'Perfect for basic maintenance',
      frequency: 1,
      highlighted: answers.officeType?.id === 'small'
    },
    {
      id: 'professional',
      name: 'Professional Care',
      icon: <Star className="h-5 w-5" />,
      description: 'Comprehensive cleaning service',
      frequency: 2,
      highlighted: answers.officeType?.id === 'medium'
    },
    {
      id: 'premium',
      name: 'Premium Maintenance',
      icon: <Crown className="h-5 w-5" />,
      description: 'White-glove daily service',
      frequency: 5,
      highlighted: answers.officeType?.id === 'large'
    }
  ];

  // Filter packages based on smart logic
  const displayedPackages = packageOptions.filter(pkg => availablePackages.includes(pkg.id));

  // Auto-select highlighted package or first available
  React.useEffect(() => {
    if (!selectedPackage && displayedPackages.length > 0) {
      const highlighted = displayedPackages.find(pkg => pkg.highlighted);
      setSelectedPackage(highlighted?.id || displayedPackages[0].id);
    }
  }, [displayedPackages, selectedPackage]);

  const getQuoteForPackage = (packageId: string): QuoteResult | null => {
    const packageOption = packageOptions.find(pkg => pkg.id === packageId);
    if (!packageOption) return null;

    return generateQuote({
      ...answers,
      frequency: packageOption.frequency
    }, { contract: contractTerm });
  };

  const selectedQuote = selectedPackage ? getQuoteForPackage(selectedPackage) : null;

  const handleBookNow = () => {
    console.log('Booking with:', { 
      quote: selectedQuote, 
      answers: { ...answers, contract: contractTerm },
      annualInterest: showAnnualInterest 
    });
  };

  const handleScheduleCall = () => {
    console.log('Schedule call for:', { 
      answers: { ...answers, contract: contractTerm },
      annualInterest: showAnnualInterest 
    });
  };

  if (availablePackages.includes('consultation')) {
    return (
      <div className="min-h-screen bg-section-primary pt-20 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Phone className="h-4 w-4 mr-2" />
              Consultation Required
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Let's Schedule a Site Visit
            </h1>
            <p className="text-muted-foreground">
              For {answers.officeType?.label.toLowerCase()} spaces, we recommend a personalized consultation
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-8 text-center">
            <Zap className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Custom Solution Required
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your office size and requirements need a personalized approach. 
              Our experts will visit your location and create a custom cleaning plan.
            </p>
            
            <div className="space-y-4">
              <Button onClick={handleScheduleCall} className="w-full h-12 text-base font-medium">
                <Phone className="h-5 w-5 mr-2" />
                Schedule Site Visit
              </Button>
              
              <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Questions
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-primary pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Quote Ready!
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Choose Your Cleaning Plan
          </h1>
          <p className="text-muted-foreground">
            Based on your {answers.officeType?.label.toLowerCase()} with {answers.traffic?.label.toLowerCase()} traffic
          </p>
        </div>

        {/* Package Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedPackages.map((packageOption) => {
            const quote = getQuoteForPackage(packageOption.id);
            const isSelected = selectedPackage === packageOption.id;
            const isHighlighted = packageOption.highlighted;
            
            return (
              <div
                key={packageOption.id}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                } ${isHighlighted ? 'ring-2 ring-primary/20' : ''}`}
                onClick={() => setSelectedPackage(packageOption.id)}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {packageOption.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {packageOption.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {packageOption.description}
                  </p>
                  
                  {quote && (
                    <div className="text-2xl font-bold text-primary">
                      ${quote.monthlyPrice}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Quote Details */}
        {selectedQuote && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-8 mb-8">
            {/* Contract Terms */}
            <div className="mb-8 p-6 bg-muted/30 rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contract Terms</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={contractTerm === 'sixMonth'}
                      onCheckedChange={(checked) => setContractTerm(checked ? 'sixMonth' : 'monthly')}
                    />
                    <div>
                      <div className="font-medium text-foreground">
                        {contractTerm === 'sixMonth' ? '6 Month Contract' : 'Monthly Contract'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {contractTerm === 'sixMonth' 
                          ? 'Save 12% with 6-month commitment' 
                          : 'Flexible monthly billing'}
                      </div>
                    </div>
                  </div>
                  {contractTerm === 'sixMonth' && (
                    <Badge variant="success">12% Savings</Badge>
                  )}
                </div>

                <div className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <Checkbox
                    checked={showAnnualInterest}
                    onCheckedChange={(checked) => setShowAnnualInterest(checked === true)}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-foreground">
                      Interested in Annual Contract
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Get a custom 20% discount quote for 12-month commitment
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">20% Off</Badge>
                </div>
              </div>
            </div>

            {/* Quote Summary */}
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-primary mb-2">
                ${selectedQuote.monthlyPrice}
                <span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              
              {selectedQuote.discountedPrice && (
                <div className="text-muted-foreground line-through">
                  Originally ${selectedQuote.discountedPrice}/month
                </div>
              )}
              
              <p className="text-muted-foreground mt-4 max-w-md mx-auto">
                {selectedQuote.description}
              </p>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                What's Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedQuote.includes.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Details */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-muted/30 rounded-xl mb-8">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {selectedQuote.frequency}
                </div>
                <div className="text-sm text-muted-foreground">Frequency</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {answers.officeType?.sqft.toLocaleString()} sqft
                </div>
                <div className="text-sm text-muted-foreground">Coverage</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {contractTerm === 'sixMonth' ? '6 months' : 'Monthly'}
                </div>
                <div className="text-sm text-muted-foreground">Contract</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleBookNow}
                className="flex-1 h-12 text-base font-medium"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Now
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleScheduleCall}
                className="flex-1 h-12 text-base font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                Schedule Call
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.print()}
                className="sm:flex-none h-12 px-6"
              >
                <Download className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Button variant="ghost" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Modify Quote
          </Button>
        </div>
      </div>
    </div>
  );
};