'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, ArrowLeft, Calendar, Phone, Crown, Star, Zap, Sparkles } from 'lucide-react';
import { generateQuote, QuoteResult } from '../utils/questionnaire-logic';
import { WizardAnswers } from '../index';
import { calculateOfficeHourlyRate } from '@/utils/pricing';

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
  color: string;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ answers, onBack, availablePackages }) => {
  const [contractTerm, setContractTerm] = useState<'monthly' | 'sixMonth'>('monthly');
  const [showAnnualInterest, setShowAnnualInterest] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  // Determine office type and traffic level
  const officeType = answers.officeType?.id || 'small';
  const trafficLevel = answers.traffic?.id || 'medium';
  
  // Define package options based on user's selected frequency
  const getPackageOptions = (): PackageOption[] => {
    // Generate packages based on user's selected frequency
    const userFrequency = answers.frequency || 1;
    
    // Create packages around the user's selected frequency
    const basePackages = [
      {
        id: 'lower',
        name: 'Smart Clean',
        icon: <Calendar className="h-4 w-4" />,
        description: 'Light maintenance schedule',
        frequency: Math.max(0.25, userFrequency * 0.5),
        highlighted: false,
        color: 'blue'
      },
      {
        id: 'selected',
        name: 'Your Choice',
        icon: <Star className="h-4 w-4" />,
        description: 'Your selected frequency',
        frequency: userFrequency,
        highlighted: true,
        color: 'orange'
      },
      {
        id: 'higher',
        name: 'Premium Plus',
        icon: <Crown className="h-4 w-4" />,
        description: 'Enhanced service level',
        frequency: Math.min(7, userFrequency * 1.5),
        highlighted: false,
        color: 'green'
      }
    ];
    
    return basePackages;
  };
  
  const packageOptions = getPackageOptions();

  // Filter packages based on smart logic
  const displayedPackages = packageOptions.filter(pkg => availablePackages.includes(pkg.id));

  // Generate quote for selected package
  const getQuoteForPackage = (packageId: string): QuoteResult | null => {
    const packageOption = packageOptions.find(pkg => pkg.id === packageId);
    if (!packageOption) return null;
    
    return generateQuote({ ...answers, frequency: packageOption.frequency }, { contract: contractTerm });
  };

  const selectedQuote = selectedPackage ? getQuoteForPackage(selectedPackage) : null;
  const selectedPackageOption = packageOptions.find(pkg => pkg.id === selectedPackage);

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      blue: isSelected ? 'text-blue-600' : 'text-blue-500',
      purple: isSelected ? 'text-purple-600' : 'text-purple-500',
      green: isSelected ? 'text-green-600' : 'text-green-500',
      orange: isSelected ? 'text-orange-600' : 'text-orange-500',
      amber: isSelected ? 'text-amber-600' : 'text-amber-500',
      gray: isSelected ? 'text-gray-600' : 'text-gray-500'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-gray-500';
  };

  const getFrequencyLabel = (frequency: number): string => {
    if (frequency === 0) return 'Consultation';
    if (frequency === 0.25) return 'Monthly';
    if (frequency === 0.5) return 'Bi-monthly';
    if (frequency === 1) return 'Weekly';
    if (frequency === 1.5) return '1.5x weekly';
    if (frequency === 2) return 'Bi-weekly';
    if (frequency === 2.5) return '2.5x weekly';
    if (frequency === 3) return '3x weekly';
    if (frequency === 3.5) return '3.5x weekly';
    if (frequency === 4) return '4x weekly';
    if (frequency === 5) return 'Daily weekdays';
    if (frequency === 6) return '6x weekly';
    if (frequency === 7) return 'Daily (7 days)';
    if (frequency === 10) return 'Twice daily';
    if (frequency === 14) return 'Twice daily (7 days)';
    if (frequency === 20) return 'Multiple daily';
    return `${frequency}x per week`;
  };

  const getServiceLevel = (frequency: number): string => {
    if (frequency <= 0.5) return 'Smart';
    if (frequency <= 1) return 'Comfort';
    if (frequency <= 3) return 'Premium';
    return 'Royal';
  };

  const getServiceLevelInfo = (level: string) => {
    const serviceLevels = {
      Smart: { color: 'text-blue-600', description: 'Essential cleaning' },
      Comfort: { color: 'text-green-600', description: 'Standard service' },
      Premium: { color: 'text-purple-600', description: 'Enhanced care' },
      Royal: { color: 'text-orange-600', description: 'Luxury service' }
    };
    return serviceLevels[level as keyof typeof serviceLevels] || serviceLevels.Smart;
  };

  const getEstimatedHours = (officeType?: string, trafficLevel?: string): string => {
    const baseDurations = {
      'small': 1.5,          // 40-60 m², 2-4 people
      'medium': 2.5,         // 100-150 m², 6-10 people
      'large': 4,            // 200-300 m², 12-18 people
      'corporate': 6,        // 400-600 m², 20-30 people
      'enterprise': 8,       // 800-1200 m², 35-45 people
      'retail-office': 3,    // 120-180 m², 4-8 people
      'warehouse-office': 5  // 250-350 m², 8-15 people
    };
    
    const trafficMultipliers = {
      'minimal': 0.8,
      'light': 0.9,
      'moderate': 1.0,
      'busy': 1.1,
      'heavy': 1.2,
      'public': 1.4,
      'high-security': 1.3,
      '24-7': 1.5
    };
    
    const baseDuration = baseDurations[officeType as keyof typeof baseDurations] || 2;
    const trafficMultiplier = trafficMultipliers[trafficLevel as keyof typeof trafficMultipliers] || 1;
    const totalHours = baseDuration * trafficMultiplier;
    
    return `${totalHours.toFixed(1)} hours`;
  };

  const getHourlyRate = (answers: WizardAnswers): number => {
    return calculateOfficeHourlyRate({
      officeType: answers.officeType,
      traffic: answers.traffic,
      frequency: answers.frequency || 1
    });
  };

  const handleBookNow = () => {
    console.log('Booking with:', { 
      answers, 
      selectedPackage, 
      contractTerm 
    });
  };

  const handleScheduleCall = () => {
    console.log('Schedule call for:', {
      answers,
      selectedPackage,
      contractTerm
    });
  };

  if (availablePackages.includes('consultation')) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Custom Quote Required
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your office setup requires a personalized consultation for accurate pricing.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Schedule Your Free Consultation
            </h2>
            <p className="text-gray-600 mb-6">
              Our cleaning experts will visit your office to provide a detailed quote and cleaning plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleScheduleCall}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Schedule Call
              </Button>
              <Button 
                onClick={onBack}
                variant="outline"
                className="px-8 py-3"
              >
                Back to Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your Office Cleaning Quote
        </h1>
        <p className="text-lg text-gray-600">
          Choose your preferred cleaning package and contract terms
        </p>
      </div>

      {/* Package Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Select Your Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPackages.map((packageOption) => {
            const isSelected = selectedPackage === packageOption.id;
            const quote = getQuoteForPackage(packageOption.id);
            const isRecommended = packageOption.highlighted;
            
            return (
              <button
                key={packageOption.id}
                onClick={() => setSelectedPackage(packageOption.id)}
                className={`relative card-spacing-sm rounded-xl border-2 transition-all text-left h-full ${
                  isSelected 
                    ? 'border-accent bg-accent/5' 
                    : 'border-border hover:border-accent/50'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground">
                      Recommended
                    </Badge>
                  </div>
                )}
                
                <div className="flex flex-col h-full justify-between form-spacing-normal">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      isSelected ? 'bg-accent text-accent-foreground' : 'bg-muted'
                    }`}>
                      {React.cloneElement(packageOption.icon as React.ReactElement, { 
                        className: "w-4 h-4" 
                      })}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground mb-1 leading-tight">
                        {packageOption.name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-snug mb-2">
                        {packageOption.description}
                      </p>
                      
                      {quote && (
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-primary">
                            €{quote.monthlyPrice}
                            <span className="text-sm font-normal text-muted-foreground">/month</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {getFrequencyLabel(packageOption.frequency)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contract Terms */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Contract Terms
        </h2>
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Contract Length</h3>
              <p className="text-sm text-gray-600">
                {contractTerm === 'monthly' ? 'Monthly contract' : '6-month contract'}
              </p>
            </div>
            <Switch
              checked={contractTerm === 'sixMonth'}
              onCheckedChange={(checked) => setContractTerm(checked ? 'sixMonth' : 'monthly')}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      {selectedQuote && selectedPackageOption && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Cleaning Summary
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Details */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Office Type:</span>
                <span className="font-medium">{answers.officeType?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Traffic Level:</span>
                <span className="font-medium">{answers.traffic?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cleaning Frequency:</span>
                <span className="font-medium">{getFrequencyLabel(answers.frequency || 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Service Level:</span>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${getServiceLevelInfo(getServiceLevel(answers.frequency || 0)).color}`}>
                    {getServiceLevel(answers.frequency || 0)}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    getServiceLevel(answers.frequency || 0) === 'Smart' ? 'bg-blue-500' :
                    getServiceLevel(answers.frequency || 0) === 'Comfort' ? 'bg-green-500' :
                    getServiceLevel(answers.frequency || 0) === 'Premium' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}></div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Hours/Visit:</span>
                <span className="font-medium">{getEstimatedHours(answers.officeType?.id, answers.traffic?.id)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hourly Rate:</span>
                <span className="font-medium">€{getHourlyRate(answers).toFixed(2)}/hour</span>
              </div>
            </div>
            
            {/* Right Column - Pricing */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">Monthly Cost</span>
                  <span className="text-2xl font-bold text-primary">
                    €{selectedQuote.monthlyPrice}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {contractTerm === 'sixMonth' ? '6-month contract' : 'Monthly contract'}
                </div>
              </div>
              
              {selectedQuote.savings > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">You Save</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    €{selectedQuote.savings}/month
                  </div>
                  <div className="text-sm text-green-600">
                    vs. individual bookings
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={handleBookNow}
          disabled={!selectedPackage}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
        >
          Book Now
        </Button>
        <Button 
          onClick={onBack}
          variant="outline"
          className="px-8 py-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Form
        </Button>
      </div>
    </div>
  );
};
