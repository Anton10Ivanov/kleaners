import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { WebFriendlyCleaningPaceField } from './WebFriendlyFields';
import { PetsField } from './SharedFields';
import { Settings, Shield, ShieldAlert, Package, Brush, Droplets, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModifyAndSaveSectionProps {
  form: UseFormReturn<any>;
}

export const ModifyAndSaveSection = ({ form }: ModifyAndSaveSectionProps) => {
  const [insuranceWarningOpen, setInsuranceWarningOpen] = useState(false);
  const insuranceValue = form.watch('insurance');

  const handleInsuranceChange = (checked: boolean) => {
    if (!checked && insuranceValue !== false) {
      setInsuranceWarningOpen(true);
    }
    form.setValue('insurance', checked);
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Modify & Save
        </CardTitle>
      </CardHeader>
      <CardContent className="form-spacing-loose">
        {/* Supplies & Preferences */}
        <div className="form-spacing-relaxed">
          <h4 className="font-semibold text-base flex items-center gap-2">
            <Package className="h-4 w-4" />
            Supplies & Preferences
          </h4>
          
          <div className="grid gap-4">
            {/* Combined Client Supplies */}
            <FormField
              control={form.control}
              name="clientSupplies"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between card-spacing-sm border rounded-lg bg-primary/5">
                    <div className="flex items-center space-x-3">
                      <Droplets className="h-5 w-5 text-primary" />
                      <div>
                        <FormLabel className="text-base font-medium">I want the cleaning specialist to use my cleaning solvents and microfiber cloths</FormLabel>
                        <FormDescription className="text-sm">Use your own cleaning supplies instead of professional ones</FormDescription>
                      </div>
                    </div>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        {field.value && (
                          <Badge variant="destructive" className="text-xs">-2€</Badge>
                        )}
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Vacuum Cleaner */}
            <FormField
              control={form.control}
              name="vacuumCleanerProvided"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between card-spacing-sm border rounded-lg bg-secondary/5">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <div>
                        <FormLabel className="text-base font-medium">I have a vacuum cleaner</FormLabel>
                        <FormDescription className="text-sm">Professional vacuum equipment available at the location</FormDescription>
                      </div>
                    </div>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        {!field.value && (
                          <Badge variant="outline" className="text-xs">+12€</Badge>
                        )}
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Pets Field */}
        <div>
          <PetsField form={form} />
        </div>

        {/* Cleaning Pace Slider */}
        <div>
          <WebFriendlyCleaningPaceField form={form} />
        </div>

        {/* Insurance */}
        <div className="form-spacing-relaxed">
          <h4 className="font-semibold text-base flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Insurance Coverage
          </h4>
          
          <FormField
            control={form.control}
            name="insurance"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between card-spacing-sm border rounded-lg bg-primary/5">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <FormLabel className="text-base font-medium">Insurance on my cleaning</FormLabel>
                      <FormDescription className="text-sm">
                        Full protection including theft, damage, and professional liability coverage
                      </FormDescription>
                    </div>
                  </div>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={handleInsuranceChange}
                      />
                      {field.value === false && (
                        <Badge variant="destructive" className="text-xs">-5%</Badge>
                      )}
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Insurance Warning Dialog */}
        <Dialog open={insuranceWarningOpen} onOpenChange={setInsuranceWarningOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <ShieldAlert className="h-5 w-5" />
                Important Notice
              </DialogTitle>
              <DialogDescription className="form-spacing-normal text-left">
                <p className="font-medium">By declining insurance coverage, you acknowledge:</p>
                <ul className="form-spacing-tight text-sm list-disc list-inside">
                  <li><strong>No theft protection</strong> - We are not liable for any missing items</li>
                  <li><strong>No liability for broken items</strong> - Damage to your property is not covered</li>
                  <li><strong>Independent cleaners</strong> - Cleaning agents may not be direct employees</li>
                  <li><strong>No review protection</strong> - You forfeit the right to post negative reviews</li>
                </ul>
                <div className="mt-4 card-spacing-xs bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Save 5%</strong> on your total price by accepting these terms.
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};