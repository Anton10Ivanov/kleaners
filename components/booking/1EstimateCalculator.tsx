'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, CheckCircle, AlertCircle, Calculator, Sparkles } from 'lucide-react';
import { calculateOneTimeEstimate, formatPrice } from '@/utils/1bookingCalculations';
import { OneTimeCleaningData, Estimate } from '@/types/bookingFlow';

interface EstimateCalculatorProps {
  propertyData: OneTimeCleaningData;
  onApplyRecommendation: (estimate: Estimate) => void;
  onChooseCustom: (estimate: Estimate) => void;
  onBack: () => void;
}

export const EstimateCalculator: React.FC<EstimateCalculatorProps> = ({
  propertyData,
  onApplyRecommendation,
  onChooseCustom,
  onBack
}) => {
  const [customHours, setCustomHours] = useState<number>(0);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Calculate the estimate
  const estimate = calculateOneTimeEstimate(propertyData);
  const displayEstimate = showCustomInput && customHours > 0 
    ? { ...estimate, recommendedHours: customHours, totalPrice: customHours * estimate.baseRate }
    : estimate;

  const handleApplyRecommendation = () => {
    onApplyRecommendation(estimate);
  };

  const handleChooseCustom = () => {
    if (customHours > 0) {
      const customEstimate = {
        ...estimate,
        recommendedHours: customHours,
        totalPrice: customHours * estimate.baseRate
      };
      onChooseCustom(customEstimate);
    } else {
      setShowCustomInput(true);
    }
  };

  const handleCustomHoursChange = (hours: number) => {
    setCustomHours(hours);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Cleaning Estimate
          </CardTitle>
          <p className="text-muted-foreground">
            Based on your property details, here's our recommended cleaning time
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Property Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Property Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Size:</span>
                <span className="ml-2 font-medium">{propertyData.propertySize} m²</span>
              </div>
              <div>
                <span className="text-muted-foreground">Bathrooms:</span>
                <span className="ml-2 font-medium">{propertyData.bathroomCount}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Pets:</span>
                <span className="ml-2 font-medium">{propertyData.hasPets ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Estimate Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Estimated Time</span>
              </div>
              <Badge variant="outline">
                {displayEstimate.estimatedHours} hours
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Recommended Time</span>
              </div>
              <Badge variant="default" className="bg-green-500">
                {displayEstimate.recommendedHours} hours
              </Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total Price</span>
              <span className="text-primary">
                {formatPrice(displayEstimate.totalPrice)}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              Rate: {formatPrice(displayEstimate.baseRate)} per hour
            </div>
          </div>

          {/* Custom Hours Input */}
          {showCustomInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 p-4 border rounded-lg bg-amber-50"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="font-medium">Custom Hours Selection</span>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Choose your preferred cleaning time (in 0.5 hour increments):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.5"
                    max="12"
                    step="0.5"
                    value={customHours}
                    onChange={(e) => handleCustomHoursChange(parseFloat(e.target.value) || 0)}
                    className="w-20 px-3 py-2 border rounded-md"
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Custom total: {formatPrice(customHours * estimate.baseRate)}
                </p>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleApplyRecommendation}
              className="w-full"
              size="lg"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Apply Recommendation ({displayEstimate.recommendedHours} hours)
            </Button>
            
            <Button 
              onClick={handleChooseCustom}
              variant="outline"
              className="w-full"
            >
              Choose Myself
            </Button>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <Button variant="ghost" onClick={onBack} className="w-full">
              Back to Property Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
