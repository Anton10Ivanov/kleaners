
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowLeft, Calendar, Download, Phone } from 'lucide-react';
import { QuoteResult } from '../utils/questionnaire-logic';
import { WizardAnswers } from '../index';

interface QuoteDisplayProps {
  quote: QuoteResult;
  answers: WizardAnswers;
  onBack: () => void;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, answers, onBack }) => {
  const handleBookNow = () => {
    // Navigate to actual booking form with pre-filled data
    console.log('Booking with:', { quote, answers });
  };

  const handleScheduleCall = () => {
    // Schedule consultation call
    console.log('Schedule call for:', { quote, answers });
  };

  return (
    <div className="min-h-screen bg-section-primary pt-20 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Quote Ready!
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Custom Office Cleaning Quote
          </h1>
          <p className="text-muted-foreground">
            Based on your {answers.officeType?.label} with {quote.frequency.toLowerCase()} service
          </p>
        </div>

        {/* Main Quote Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-8 mb-8">
          {/* Plan Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <h2 className="text-2xl font-bold text-foreground">{quote.planName}</h2>
              {quote.savings && (
                <Badge className="bg-green-100 text-green-800">
                  Save ${quote.savings}/month
                </Badge>
              )}
            </div>
            
            <div className="text-4xl font-bold text-primary mb-2">
              ${quote.monthlyPrice}
              <span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            
            {quote.discountedPrice && (
              <div className="text-muted-foreground line-through">
                Originally ${quote.discountedPrice}/month
              </div>
            )}
            
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              {quote.description}
            </p>
          </div>

          {/* What's Included */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
              What's Included
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quote.includes.map((item, index) => (
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
                {quote.frequency}
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
                {answers.contract === 'annual' ? '12 months' : 
                 answers.contract === 'sixMonth' ? '6 months' : 'Monthly'}
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
