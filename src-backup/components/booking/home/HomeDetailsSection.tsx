import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Users, Bath, Square } from 'lucide-react';

interface HomeDetailsSectionProps {
  form: UseFormReturn<any>;
}

const HomeDetailsSection = ({ form }: HomeDetailsSectionProps) => {
  const propertySize = form.watch('propertySize') || 70;
  const bedrooms = form.watch('bedrooms') || 2;
  const bathrooms = form.watch('bathrooms') || 1;
  const cleaningPace = form.watch('cleaningPace') || 'standard';

  return (
    <div className="form-spacing-loose">
      {/* Property Size */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Square className="h-5 w-5 text-primary" />
            Property Size
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="propertySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Size (m²)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter property size"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Room Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Room Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Bedrooms
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'bedroom' : 'bedrooms'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Bath className="h-4 w-4" />
                    Bathrooms
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'bathroom' : 'bathrooms'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Cleaning Pace */}
      <Card>
        <CardHeader>
          <CardTitle>Cleaning Pace</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="cleaningPace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How thorough would you like the cleaning to be?</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="cursor-pointer flex-1">
                        <div className="font-medium">Standard</div>
                        <div className="text-sm text-muted-foreground">Regular cleaning routine</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="thorough" id="thorough" />
                      <Label htmlFor="thorough" className="cursor-pointer flex-1">
                        <div className="font-medium">Thorough</div>
                        <div className="text-sm text-muted-foreground">More detailed cleaning</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="deep" id="deep" />
                      <Label htmlFor="deep" className="cursor-pointer flex-1">
                        <div className="font-medium">Deep Clean</div>
                        <div className="text-sm text-muted-foreground">Comprehensive cleaning</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeDetailsSection;
