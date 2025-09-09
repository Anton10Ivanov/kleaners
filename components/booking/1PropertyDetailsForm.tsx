'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Minus, Plus, Home, Bath, PawPrint } from 'lucide-react';
import { PROPERTY_SIZE_RANGES } from '@/utils/1bookingCalculations';
import { OneTimeCleaningData, RegularCleaningData } from '@/types/bookingFlow';

const propertyDetailsSchema = z.object({
  propertySize: z.string().min(1, 'Please select a property size'),
  bathroomCount: z.number().min(1, 'At least 1 bathroom is required').max(5, 'Maximum 5 bathrooms'),
  hasPets: z.boolean().default(false),
});

type PropertyDetailsFormData = z.infer<typeof propertyDetailsSchema>;

interface PropertyDetailsFormProps {
  onNext: (data: PropertyDetailsFormData) => void;
  onBack: () => void;
  initialData?: Partial<PropertyDetailsFormData>;
  isRegularCleaning?: boolean;
}

export const PropertyDetailsForm: React.FC<PropertyDetailsFormProps> = ({
  onNext,
  onBack,
  initialData = {},
  isRegularCleaning = false
}) => {
  const [bathroomCount, setBathroomCount] = useState(initialData.bathroomCount || 1);
  const [hasPets, setHasPets] = useState(initialData.hasPets || false);
  const [selectedSize, setSelectedSize] = useState(initialData.propertySize || '');

  const form = useForm<PropertyDetailsFormData>({
    resolver: zodResolver(propertyDetailsSchema),
    defaultValues: {
      propertySize: initialData.propertySize || '',
      bathroomCount: initialData.bathroomCount || 1,
      hasPets: initialData.hasPets || false,
    }
  });

  const handleSubmit = (data: PropertyDetailsFormData) => {
    onNext(data);
  };

  const incrementBathrooms = () => {
    if (bathroomCount < 5) {
      const newCount = bathroomCount + 1;
      setBathroomCount(newCount);
      form.setValue('bathroomCount', newCount);
    }
  };

  const decrementBathrooms = () => {
    if (bathroomCount > 1) {
      const newCount = bathroomCount - 1;
      setBathroomCount(newCount);
      form.setValue('bathroomCount', newCount);
    }
  };

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
    form.setValue('propertySize', value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Property Details
          </CardTitle>
          <p className="text-muted-foreground">
            {isRegularCleaning 
              ? 'Tell us about your property for regular cleaning'
              : 'Help us estimate the cleaning time for your property'
            }
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Property Size Selection */}
            <div className="space-y-2">
              <Label htmlFor="propertySize">Property Size</Label>
              <Select value={selectedSize} onValueChange={handleSizeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property size range" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_SIZE_RANGES.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.propertySize && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.propertySize.message}
                </p>
              )}
            </div>

            {/* Bathroom Count */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Bath className="h-4 w-4" />
                Number of Bathrooms
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={decrementBathrooms}
                  disabled={bathroomCount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center justify-center w-16 h-10 border rounded-md bg-muted">
                  <span className="text-lg font-semibold">{bathroomCount}</span>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={incrementBathrooms}
                  disabled={bathroomCount >= 5}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                We add 0.5 hours per bathroom to our estimate
              </p>
            </div>

            {/* Pets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <PawPrint className="h-4 w-4" />
                  Do you have pets?
                </Label>
                <Switch
                  checked={hasPets}
                  onCheckedChange={(checked) => {
                    setHasPets(checked);
                    form.setValue('hasPets', checked);
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Pets may require additional cleaning time
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button type="submit">
                Show Estimate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
