import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Droplets, Wind, Hammer, Bug, Paintbrush } from 'lucide-react';

interface EnhancedDeepCleaningFieldsProps {
  form: UseFormReturn<any>;
}

export const EnhancedDeepCleaningFields = ({ form }: EnhancedDeepCleaningFieldsProps) => {
  const hazardousOptions = [
    { id: 'mold', label: 'Mold/Mildew Present', icon: <Droplets className="h-4 w-4" />, description: 'Visible mold or strong musty odors' },
    { id: 'asbestos', label: 'Asbestos Concerns', icon: <AlertTriangle className="h-4 w-4" />, description: 'Older building with potential asbestos' },
    { id: 'lead', label: 'Lead Paint', icon: <Paintbrush className="h-4 w-4" />, description: 'Pre-1978 paint that may contain lead' },
    { id: 'chemicals', label: 'Chemical Residues', icon: <Wind className="h-4 w-4" />, description: 'Industrial or laboratory chemical exposure' },
    { id: 'pests', label: 'Pest Infestation', icon: <Bug className="h-4 w-4" />, description: 'Active or recent pest problems' },
    { id: 'biohazard', label: 'Biohazard Materials', icon: <AlertTriangle className="h-4 w-4" />, description: 'Blood, bodily fluids, or other biohazards' }
  ];

  const specialEquipment = [
    { id: 'hepa', label: 'HEPA Filtration', description: 'High-efficiency particulate air filters' },
    { id: 'steam', label: 'Steam Cleaning', description: 'High-temperature steam sanitization' },
    { id: 'ozone', label: 'Ozone Treatment', description: 'Odor elimination and sanitization' },
    { id: 'uv', label: 'UV Sanitization', description: 'Ultraviolet light disinfection' },
    { id: 'pressure', label: 'Pressure Washing', description: 'High-pressure exterior cleaning' },
    { id: 'dehumidifier', label: 'Industrial Dehumidifiers', description: 'Moisture control equipment' }
  ];

  return (
    <div className="form-spacing-loose">
      {/* Hazardous Conditions */}
      <FormField
        control={form.control}
        name="hazardousConditions"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-lg font-semibold">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Hazardous Conditions Assessment
            </FormLabel>
            <FormControl>
              <div className="form-spacing-normal">
                <p className="text-sm text-muted-foreground mb-4">
                  Please identify any hazardous conditions that may require special handling or equipment:
                </p>
                {hazardousOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3 card-spacing-xs rounded-lg border hover:bg-accent/50 transition-colors">
                    <Checkbox
                      id={option.id}
                      checked={field.value?.includes(option.id)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        if (checked) {
                          field.onChange([...current, option.id]);
                        } else {
                          field.onChange(current.filter((id: string) => id !== option.id));
                        }
                      }}
                    />
                    <label htmlFor={option.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        {option.icon}
                        <span className="font-medium">{option.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </label>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Contamination Level */}
      <FormField
        control={form.control}
        name="contaminationLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contamination/Dirt Level (1-10 scale)</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Rate the contamination level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1-2">Light (1-2) - Normal wear, dust</SelectItem>
                <SelectItem value="3-4">Moderate (3-4) - Some stains, grime</SelectItem>
                <SelectItem value="5-6">Heavy (5-6) - Significant buildup</SelectItem>
                <SelectItem value="7-8">Severe (7-8) - Extensive contamination</SelectItem>
                <SelectItem value="9-10">Extreme (9-10) - Requires specialized treatment</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Air Quality Concerns */}
      <FormField
        control={form.control}
        name="airQualityConcerns"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 form-spacing-none">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="component-spacing-xs leading-none">
              <FormLabel>Air Quality Concerns</FormLabel>
              <p className="text-sm text-muted-foreground">
                Strong odors, poor ventilation, or respiratory concerns
              </p>
            </div>
          </FormItem>
        )}
      />

      {/* Previous Cleaning Attempts */}
      <FormField
        control={form.control}
        name="previousCleaningAttempts"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Previous Cleaning Attempts</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any previous cleaning attempts, products used, or ongoing maintenance..."
                className="min-h-[80px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Special Equipment Needed */}
      <FormField
        control={form.control}
        name="specialEquipmentNeeded"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Hammer className="h-4 w-4" />
              Special Equipment Requirements
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specialEquipment.map((equipment) => (
                  <div key={equipment.id} className="flex items-start space-x-3 card-spacing-xs rounded-lg border hover:bg-accent/50 transition-colors">
                    <Checkbox
                      id={equipment.id}
                      checked={field.value?.includes(equipment.id)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        if (checked) {
                          field.onChange([...current, equipment.id]);
                        } else {
                          field.onChange(current.filter((id: string) => id !== equipment.id));
                        }
                      }}
                    />
                    <label htmlFor={equipment.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-sm">{equipment.label}</div>
                      <p className="text-xs text-muted-foreground">{equipment.description}</p>
                    </label>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Safety Warnings */}
      {form.watch('hazardousConditions')?.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/10">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <strong>Safety Notice:</strong> Based on your selections, this cleaning may require specialized safety protocols, 
            additional protective equipment, and certified technicians. Our team will contact you to discuss safety measures 
            and any additional costs before proceeding.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};