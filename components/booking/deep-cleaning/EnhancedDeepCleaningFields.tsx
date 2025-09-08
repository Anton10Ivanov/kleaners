import { UseFormReturn } from 'react-hook-form';
import { DeepCleaningFormData } from '@/schemas/booking';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Sparkles, MapPin } from 'lucide-react';
import PropertyDetails from './PropertyDetails';
import PropertyCondition from './PropertyCondition';
import CleaningPersonnel from './CleaningPersonnel';
import SpecialConditions from './SpecialConditions';
import { EnhancedDeepCleaningFields as HazardousFields } from '../shared/EnhancedDeepCleaningFields';
import { ConditionalFields, DisinfectionRequiredField } from '../shared/SharedFields';
import { ConditionalTargetAreas } from '../shared/ConditionalTargetAreas';
import { ServiceType } from '@/schemas/booking';

interface EnhancedDeepCleaningFieldsProps {
  form: UseFormReturn<DeepCleaningFormData>;
}

const EnhancedDeepCleaningFields = ({ form }: EnhancedDeepCleaningFieldsProps) => {
  const squareMeters = form.watch('squareMeters') || 50;
  const bedrooms = form.watch('bedrooms') || 1;
  const bathrooms = form.watch('bathrooms') || 1;
  const dirtinessLevel = form.watch('dirtinessLevel') || 3;
  const lastCleaned = form.watch('lastCleaned') || 3;
  const cleaningPersonnel = (form.watch('cleaningPersonnel') as 'normal' | 'experienced') || 'normal';
  const specialConditions = form.watch('specialConditions') || [];
  const additionalNotes = form.watch('additionalNotes') || '';

  return (
    <div className="form-spacing-loose">
      {/* Basic Property Details */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyDetails
            squareMeters={squareMeters}
            setSquareMeters={(value) => form.setValue('squareMeters', value)}
            bathrooms={bathrooms}
            setBathrooms={(value) => form.setValue('bathrooms', value)}
            bedrooms={bedrooms}
            setBedrooms={(value) => form.setValue('bedrooms', value)}
          />
        </CardContent>
      </Card>

      {/* Property Condition Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Property Condition</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyCondition
            dirtinessLevel={dirtinessLevel}
            setDirtinessLevel={(value) => form.setValue('dirtinessLevel', value)}
            lastCleaned={lastCleaned}
            setLastCleaned={(value) => form.setValue('lastCleaned', value)}
          />
        </CardContent>
      </Card>

      {/* Cleaning Personnel Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Cleaning Team</CardTitle>
        </CardHeader>
        <CardContent>
          <CleaningPersonnel
            cleaningPersonnel={cleaningPersonnel}
            setCleaningPersonnel={(value) => form.setValue('cleaningPersonnel', value)}
          />
        </CardContent>
      </Card>

      {/* Special Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Special Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <SpecialConditions
            specialConditions={specialConditions}
            setSpecialConditions={(value) => form.setValue('specialConditions', value)}
          />
        </CardContent>
      </Card>

      {/* Enhanced Deep Cleaning Fields - Hazardous Conditions & Equipment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-orange-600">Advanced Deep Cleaning Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <HazardousFields form={form} />
        </CardContent>
      </Card>

      {/* Target Areas and Focus Areas */}
      <ConditionalFields form={form} serviceType={ServiceType.DeepCleaning} />

      {/* Enhanced Target Areas with Conditional Logic */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Cleaning Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ConditionalTargetAreas form={form} />
        </CardContent>
      </Card>

      {/* Deep Cleaning Specific Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Deep Cleaning Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Include Walls and Ceilings */}
          <FormField
            control={form.control}
            name="includeWallsAndCeilings"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Include walls and ceilings
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mold or Pest Presence */}
          <FormField
            control={form.control}
            name="moldOrPestPresence"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Mold or pest presence
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Disinfection Required */}
          <DisinfectionRequiredField form={form} />
        </CardContent>
      </Card>

      {/* Special Surfaces */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Special Surfaces
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="specialSurfacesToHandle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-foreground font-medium">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Special Surfaces to Handle (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe any special surfaces that need attention (marble, wood, etc.)..."
                    {...field}
                    className="min-h-[80px] bg-background border-input text-foreground"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="form-spacing-normal">
            <Label className="text-secondary-text">Additional Notes</Label>
            <Textarea
              placeholder="Is there anything else we should know about your property? Any specific areas of concern, access restrictions, or special requirements?"
              value={additionalNotes}
              onChange={(e) => form.setValue('additionalNotes', e.target.value)}
              className="min-h-[100px] resize-y transition-colors focus:border-primary"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDeepCleaningFields;
