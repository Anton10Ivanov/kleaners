
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, DollarSign } from 'lucide-react';

interface ContractStepProps {
  selected?: 'monthly' | 'sixMonth' | 'annual';
  onSelect: (contract: 'monthly' | 'sixMonth' | 'annual') => void;
  previewQuote?: any;
}

export const ContractStep: React.FC<ContractStepProps> = ({ selected, onSelect, previewQuote }) => {
  const [isAnnual, setIsAnnual] = React.useState(selected === 'annual');

  React.useEffect(() => {
    if (isAnnual) {
      onSelect('annual');
    } else {
      onSelect(selected === 'sixMonth' ? 'sixMonth' : 'monthly');
    }
  }, [isAnnual, selected, onSelect]);

  const monthlyPrice = previewQuote?.monthlyPrice || 0;
  const annualPrice = Math.round(monthlyPrice * 0.8); // 20% discount
  const savings = monthlyPrice - annualPrice;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Choose your contract term
        </h2>
        <p className="text-muted-foreground">
          Longer commitments unlock better pricing
        </p>
      </div>

      {/* Monthly/Annual Toggle */}
      <div className="flex items-center justify-center space-x-4 p-6 bg-muted/30 rounded-xl">
        <span className={`font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
          Monthly
        </span>
        
        <Switch
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
          className="data-[state=checked]:bg-primary"
        />
        
        <div className="flex items-center space-x-2">
          <span className={`font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
            Annual
          </span>
          {isAnnual && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
              Save 20%
            </Badge>
          )}
        </div>
      </div>

      {/* Pricing Display */}
      {previewQuote && (
        <div className="bg-white border-2 border-primary/20 rounded-xl p-6">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-foreground">
              ${isAnnual ? annualPrice : monthlyPrice}
              <span className="text-base font-normal text-muted-foreground">/month</span>
            </div>
            
            {isAnnual && savings > 0 && (
              <div className="flex items-center justify-center space-x-1 mt-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">
                  Save ${savings}/month (${savings * 12}/year)
                </span>
              </div>
            )}
          </div>

          {/* Contract Benefits */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-muted-foreground">
                {isAnnual ? 'Priority scheduling & support' : 'Flexible month-to-month'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-muted-foreground">
                {isAnnual ? 'Locked-in pricing protection' : 'No long-term commitment'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {isAnnual ? '30-day satisfaction guarantee' : 'Cancel anytime with 30 days notice'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6-Month Option */}
      {!isAnnual && (
        <div className="text-center">
          <button
            onClick={() => onSelect('sixMonth')}
            className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
              selected === 'sixMonth'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-muted hover:border-primary/30'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium">6-Month Contract</span>
              <Badge variant="outline" className="text-xs">
                Save 12%
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Balance of savings and flexibility
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
