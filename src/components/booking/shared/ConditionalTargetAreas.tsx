import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Home, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConditionalTargetAreasProps {
  form: UseFormReturn<any>;
}

export const ConditionalTargetAreas = ({ form }: ConditionalTargetAreasProps) => {
  const [cleaningType, setCleaningType] = useState<'whole-place' | 'partial'>('whole-place');

  const specificAreas = [
    { id: 'bathroom', label: 'Bathroom', description: 'Deep clean all bathroom fixtures', icon: '🚿' },
    { id: 'kitchen', label: 'Kitchen', description: 'Complete kitchen cleaning including appliances', icon: '🍽️' },
    { id: 'living-room', label: 'Living Room', description: 'Full living area cleaning', icon: '🛋️' },
    { id: 'bedrooms', label: 'Bedrooms', description: 'All bedroom spaces', icon: '🛏️' },
    { id: 'balcony', label: 'Balcony/Terrace', description: 'Outdoor spaces', icon: '🌿' },
    { id: 'basement', label: 'Basement/Storage', description: 'Storage and basement areas', icon: '📦' }
  ];

  const handleCleaningTypeChange = (value: 'whole-place' | 'partial') => {
    setCleaningType(value);
    if (value === 'whole-place') {
      form.setValue('targetAreas', ['whole-place']);
    } else {
      form.setValue('targetAreas', []);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="targetAreas"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-lg font-semibold">
              <MapPin className="h-5 w-5" />
              Cleaning Areas
            </FormLabel>
            
            <FormControl>
              <div className="space-y-4">
                {/* Primary Choice */}
                <RadioGroup
                  value={cleaningType}
                  onValueChange={handleCleaningTypeChange}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="whole-place" id="whole-place" />
                    <label htmlFor="whole-place" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Home className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">Whole Place</div>
                        <div className="text-sm text-muted-foreground">Complete property cleaning</div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="partial" id="partial" />
                    <label htmlFor="partial" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Settings className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">Partial Cleaning</div>
                        <div className="text-sm text-muted-foreground">Select specific areas</div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>

                {/* Conditional Specific Areas */}
                <AnimatePresence>
                  {cleaningType === 'partial' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border rounded-lg p-4 bg-accent/20">
                        <h4 className="font-medium mb-3 text-sm text-muted-foreground">Select specific areas to clean:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {specificAreas.map((area) => (
                            <div key={area.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-background hover:bg-accent/50 transition-colors">
                              <Checkbox
                                id={area.id}
                                checked={field.value?.includes(area.id)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, area.id]);
                                  } else {
                                    field.onChange(current.filter((id: string) => id !== area.id));
                                  }
                                }}
                              />
                              <label htmlFor={area.id} className="flex-1 cursor-pointer">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">{area.icon}</span>
                                  <span className="font-medium text-sm">{area.label}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{area.description}</p>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};