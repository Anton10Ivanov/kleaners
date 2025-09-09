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
import { Minus, Plus, Building2, Users, MapPin } from 'lucide-react';
import { OfficeCleaningData } from '@/types/bookingFlow';

const officeCleaningSchema = z.object({
  officeType: z.string().min(1, 'Please select an office type'),
  workstations: z.number().min(1, 'At least 1 workstation is required').max(100, 'Maximum 100 workstations'),
  commonAreas: z.number().min(0, 'Common areas cannot be negative').max(20, 'Maximum 20 common areas'),
  customerName: z.string().min(2, 'Customer name must be at least 3 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  contactInfo: z.string().min(10, 'Contact info must be at least 10 characters'),
});

type OfficeCleaningFormData = z.infer<typeof officeCleaningSchema>;

interface OfficeCleaningFormProps {
  onNext: (data: OfficeCleaningFormData) => void;
  onBack: () => void;
  initialData?: Partial<OfficeCleaningFormData>;
}

const officeTypes = [
  { id: 'small-office', label: 'Small Office (1-10 employees)', multiplier: 1.0 },
  { id: 'medium-office', label: 'Medium Office (11-50 employees)', multiplier: 1.2 },
  { id: 'large-office', label: 'Large Office (51+ employees)', multiplier: 1.5 },
  { id: 'warehouse', label: 'Warehouse/Storage', multiplier: 1.8 },
  { id: 'retail', label: 'Retail Space', multiplier: 1.3 },
  { id: 'medical', label: 'Medical Facility', multiplier: 1.6 },
  { id: 'restaurant', label: 'Restaurant/Food Service', multiplier: 1.4 },
];

export const OfficeCleaningForm: React.FC<OfficeCleaningFormProps> = ({
  onNext,
  onBack,
  initialData = {}
}) => {
  const [workstations, setWorkstations] = useState(initialData.workstations || 1);
  const [commonAreas, setCommonAreas] = useState(initialData.commonAreas || 0);
  const [selectedOfficeType, setSelectedOfficeType] = useState(initialData.officeType || '');

  const form = useForm<OfficeCleaningFormData>({
    resolver: zodResolver(officeCleaningSchema),
    defaultValues: {
      officeType: initialData.officeType || '',
      workstations: initialData.workstations || 1,
      commonAreas: initialData.commonAreas || 0,
      customerName: initialData.customerName || '',
      address: initialData.address || '',
      contactInfo: initialData.contactInfo || '',
    }
  });

  const handleSubmit = (data: OfficeCleaningFormData) => {
    onNext(data);
  };

  const incrementWorkstations = () => {
    if (workstations < 100) {
      const newCount = workstations + 1;
      setWorkstations(newCount);
      form.setValue('workstations', newCount);
    }
  };

  const decrementWorkstations = () => {
    if (workstations > 1) {
      const newCount = workstations - 1;
      setWorkstations(newCount);
      form.setValue('workstations', newCount);
    }
  };

  const incrementCommonAreas = () => {
    if (commonAreas < 20) {
      const newCount = commonAreas + 1;
      setCommonAreas(newCount);
      form.setValue('commonAreas', newCount);
    }
  };

  const decrementCommonAreas = () => {
    if (commonAreas > 0) {
      const newCount = commonAreas - 1;
      setCommonAreas(newCount);
      form.setValue('commonAreas', newCount);
    }
  };

  const handleOfficeTypeChange = (value: string) => {
    setSelectedOfficeType(value);
    form.setValue('officeType', value);
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
            <Building2 className="h-5 w-5" />
            Office Details
          </CardTitle>
          <p className="text-muted-foreground">
            Tell us about your office space for accurate pricing
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Office Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="officeType">Office Type</Label>
              <Select value={selectedOfficeType} onValueChange={handleOfficeTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your office type" />
                </SelectTrigger>
                <SelectContent>
                  {officeTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.officeType && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.officeType.message}
                </p>
              )}
            </div>

            {/* Workstations Count */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Workstations
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={decrementWorkstations}
                  disabled={workstations <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center justify-center w-16 h-10 border rounded-md bg-muted">
                  <span className="text-lg font-semibold">{workstations}</span>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={incrementWorkstations}
                  disabled={workstations >= 100}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                We add 0.25 hours per workstation to our estimate
              </p>
            </div>

            {/* Common Areas Count */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Number of Common Areas
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={decrementCommonAreas}
                  disabled={commonAreas <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center justify-center w-16 h-10 border rounded-md bg-muted">
                  <span className="text-lg font-semibold">{commonAreas}</span>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={incrementCommonAreas}
                  disabled={commonAreas >= 20}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Common areas include lobbies, break rooms, conference rooms, etc.
              </p>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer/Company Name</Label>
                <Input
                  id="customerName"
                  {...form.register('customerName')}
                  placeholder="Enter company or customer name"
                />
                {form.formState.errors.customerName && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.customerName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Office Address</Label>
                <Input
                  id="address"
                  {...form.register('address')}
                  placeholder="Enter office address"
                />
                {form.formState.errors.address && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Information</Label>
                <Input
                  id="contactInfo"
                  {...form.register('contactInfo')}
                  placeholder="Phone number or email"
                />
                {form.formState.errors.contactInfo && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.contactInfo.message}
                  </p>
                )}
              </div>
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
