import React, { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, Clock, Users, TrendingUp, Star } from 'lucide-react';
import { calculatePrice, getPriceBreakdown } from '@/utils/pricing';
import { calculateDuration, calculateCleanerCount, calculateComplexityScore } from '@/utils/bookingCalculations';

interface RealTimePricingProps {
  form: UseFormReturn<any>;
  serviceType: string;
}

export const RealTimePricing: React.FC<RealTimePricingProps> = ({ form, serviceType }) => {
  const formData = form.watch();
  
  const pricing = useMemo(() => {
    if (!formData || !serviceType) return null;
    
    const data = { ...formData, serviceType };
    
    try {
      const breakdown = getPriceBreakdown(data);
      const duration = calculateDuration(data);
      const cleanerCount = calculateCleanerCount(data);
      const complexityScore = calculateComplexityScore(data);
      
      return {
        ...breakdown,
        duration,
        cleanerCount,
        complexityScore
      };
    } catch (error) {
      console.error('Error calculating pricing:', error);
      return null;
    }
  }, [formData, serviceType]);

  if (!pricing) {
    return (
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
        <CardContent className="pt-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Calculator className="h-8 w-8 mx-auto mb-2" />
            <p>Fill in the details to see pricing</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getComplexityColor = (score: number) => {
    if (score <= 3) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (score <= 6) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  const getComplexityLabel = (score: number) => {
    if (score <= 3) return 'Simple';
    if (score <= 6) return 'Moderate';
    return 'Complex';
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="h-5 w-5" />
          Live Pricing Estimate
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
            <div className="text-2xl font-bold text-primary">{pricing.duration}h</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
            <div className="text-2xl font-bold text-primary">{pricing.cleanerCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Cleaners</div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-primary" />
            <div className="text-2xl font-bold text-primary">€{pricing.hourlyRate}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Per Hour</div>
          </div>
          
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Star className="h-5 w-5 mx-auto mb-1 text-primary" />
            <Badge className={getComplexityColor(pricing.complexityScore)}>
              {getComplexityLabel(pricing.complexityScore)}
            </Badge>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Complexity</div>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-gray-600 dark:text-gray-400">
            Price Breakdown
          </h4>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Base Service ({pricing.duration}h × {pricing.cleanerCount} cleaner{pricing.cleanerCount > 1 ? 's' : ''} × €{pricing.hourlyRate})</span>
              <span className="font-semibold">€{pricing.basePrice}</span>
            </div>
            
            {pricing.discountPercent > 0 && (
              <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                <span>Frequency Discount ({pricing.discountPercent}%)</span>
                <span className="font-semibold">Applied</span>
              </div>
            )}
            
            {pricing.extrasPrice > 0 && (
              <div className="flex justify-between items-center">
                <span>Additional Services</span>
                <span className="font-semibold">€{pricing.extrasPrice}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold bg-primary/10 p-3 rounded-lg">
          <span>Total Estimate</span>
          <span className="text-primary">€{pricing.total}</span>
        </div>

        {/* Disclaimers */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Prices are estimates and may vary based on actual conditions</p>
          <p>• Final pricing will be confirmed after initial assessment</p>
          <p>• All prices include VAT</p>
        </div>
      </CardContent>
    </Card>
  );
};