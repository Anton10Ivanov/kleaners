import { UseFormReturn } from 'react-hook-form';
import { HomeBookingForm } from '@/schemas/bookingSchemas';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Home, User, Droplets, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExtrasSelector from '@/components/booking/ExtrasSelector';
import { ServiceType } from '@/schemas/booking';

interface EnhancedHomeDetailsSectionProps {
  form: UseFormReturn<HomeBookingForm>;
  onSuggestedTimeSelect?: (hours: number) => void;
}

export const EnhancedHomeDetailsSection = ({ form, onSuggestedTimeSelect }: EnhancedHomeDetailsSectionProps) => {
  const suggestedHours = [2, 3, 4, 5, 6];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Home className="h-5 w-5" />
        Home Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Size */}
        <div>
          <FormField
            control={form.control}
            name="propertySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Property Size (m²)
                </FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {field.value}m²
                      </div>
                    </div>
                    <Slider
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      max={500}
                      min={20}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>20m²</span>
                      <span>500m²</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bedrooms */}
        <div>
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={10}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bathrooms */}
        <div>
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Number of Residents */}
        <div>
          <FormField
            control={form.control}
            name="numResidents"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Number of Residents
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dirtiness Level */}
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="dirtinessLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Droplets className="h-4 w-4" />
                  Dirtiness Level
                </FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-semibold text-primary">
                        Level {field.value} - {
                          field.value === 1 ? 'Very Clean' :
                          field.value === 2 ? 'Lightly Dirty' :
                          field.value === 3 ? 'Moderately Dirty' :
                          field.value === 4 ? 'Very Dirty' : 'Extremely Dirty'
                        }
                      </div>
                    </div>
                    <Slider
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Very Clean</span>
                      <span>Extremely Dirty</span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Supplies Provided */}
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="suppliesProvided"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor="supplies">
                    I will provide cleaning supplies
                  </Label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Suggested Hours */}
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Estimated Hours
                </FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {field.value} hours
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedHours.map((hours) => (
                        <Button
                          key={hours}
                          type="button"
                          variant={field.value === hours ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            field.onChange(hours);
                            onSuggestedTimeSelect?.(hours);
                          }}
                        >
                          {hours}h
                        </Button>
                      ))}
                    </div>
                    <Slider
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      max={12}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Enhanced Extras Section */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Additional Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="extras"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ExtrasSelector
                      serviceType={ServiceType.Home}
                      selectedExtras={(field.value || []) as any}
                      onExtrasChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};