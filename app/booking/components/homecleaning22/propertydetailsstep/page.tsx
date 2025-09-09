'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Home, Building, Sparkles, Heart } from 'lucide-react';
import { ClutterLevel22, BookingData22 } from '../../types/HomeCleaning22Types';
import { CLUTTER_LEVELS } from '../../../constants/homecleaning22constants/page';

interface PropertyDetailsStepProps {
  bookingData: BookingData22;
  onUpdate: (updates: Partial<BookingData22>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({
  bookingData,
  onUpdate,
  onNext,
  onBack
}) => {
  const handlePropertySizeChange = (value: string) => {
    const size = parseInt(value) || 0;
    onUpdate({ propertySize: size });
  };

  const handleClutterLevelSelect = (level: ClutterLevel22) => {
    onUpdate({ clutterLevel: level });
  };

  const isStepValid = bookingData.propertySize > 0 && bookingData.clutterLevel !== null;

  return (
    <div className="max-w-4xl mx-auto px-4 section-spacing-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-heading-color mb-4">
          Tell us about your home
        </h2>
        <p className="text-muted-foreground">
          This helps us provide an accurate estimate and cleaning plan
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Property Size */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Size
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter the total square meters of your home
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="propertySize">Square Meters</Label>
              <Input
                id="propertySize"
                type="number"
                placeholder="e.g., 120"
                value={bookingData.propertySize || ''}
                onChange={(e) => handlePropertySizeChange(e.target.value)}
                className="text-lg"
              />
            </div>
            
            {bookingData.propertySize > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Estimated cleaning time:</strong> {Math.ceil(bookingData.propertySize / 50)} hours
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  Based on 1 hour per 50 square meters
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Clutter Level */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Clutter Level
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              How cluttered is your home? This affects cleaning time.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {CLUTTER_LEVELS.map((clutter) => (
                <button
                  key={clutter.level}
                  onClick={() => handleClutterLevelSelect(clutter.level)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    bookingData.clutterLevel === clutter.level
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      bookingData.clutterLevel === clutter.level
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {clutter.icon}
                    </div>
                    <div>
                      <div className="font-medium">{clutter.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {clutter.multiplier}x time
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {clutter.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      {isStepValid && (
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Your Cleaning Estimate</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {bookingData.propertySize} m²
                  </div>
                  <div className="text-sm text-muted-foreground">Property Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {bookingData.clutterLevel ? CLUTTER_LEVELS.find(c => c.level === bookingData.clutterLevel)?.label : 'N/A'}
                  </div>
                  <div className="text-sm text-muted-foreground">Clutter Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.ceil(bookingData.propertySize / 50)} hours
                  </div>
                  <div className="text-sm text-muted-foreground">Estimated Time</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!isStepValid}
          className="bg-primary hover:bg-primary/90"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
