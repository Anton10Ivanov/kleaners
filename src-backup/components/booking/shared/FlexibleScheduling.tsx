import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface FlexibleSchedulingProps {
  form: UseFormReturn<any>;
}

export const FlexibleScheduling = ({ form }: FlexibleSchedulingProps) => {
  const [schedulingType, setSchedulingType] = useState<'specific' | 'flexible'>('specific');

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleSchedulingTypeChange = (value: 'specific' | 'flexible') => {
    setSchedulingType(value);
    if (value === 'flexible') {
      form.setValue('selectedDate', undefined);
      form.setValue('selectedTime', undefined);
    } else {
      form.setValue('flexibleScheduleNotes', undefined);
    }
  };

  return (
    <div className="form-spacing-loose">
      <div className="form-spacing-relaxed">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Schedule Your Cleaning
        </h3>
        
        {/* Scheduling Type Selection */}
        <RadioGroup
          value={schedulingType}
          onValueChange={handleSchedulingTypeChange}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-3 border rounded-lg card-spacing-sm hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="specific" id="specific" />
            <label htmlFor="specific" className="flex items-center gap-2 cursor-pointer flex-1">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <div className="font-medium">Specific Date & Time</div>
                <div className="text-sm text-muted-foreground">Choose exact scheduling</div>
              </div>
            </label>
          </div>
          
          <div className="flex items-center space-x-3 border rounded-lg card-spacing-sm hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="flexible" id="flexible" />
            <label htmlFor="flexible" className="flex items-center gap-2 cursor-pointer flex-1">
              <HelpCircle className="h-4 w-4 text-primary" />
              <div>
                <div className="font-medium">Not Sure Yet</div>
                <div className="text-sm text-muted-foreground">Flexible scheduling</div>
              </div>
            </label>
          </div>
        </RadioGroup>

        {/* Conditional Content */}
        <AnimatePresence>
          {schedulingType === 'specific' ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="form-spacing-relaxed overflow-hidden"
            >
              {/* Date Picker */}
              <FormField
                control={form.control}
                name="selectedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date</FormLabel>
                    <FormControl>
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time Slots */}
              <FormField
                control={form.control}
                name="selectedTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => field.onChange(time)}
                            className={`p-2 text-sm border rounded-lg transition-colors ${
                              field.value === time 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'hover:bg-accent border-border'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <FormField
                control={form.control}
                name="flexibleScheduleNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe your approximate timing preferences. For example: 'Next week sometime', 'Weekends only', 'After March 15th', 'Mornings preferred', etc."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground mt-2">
                      Our team will contact you to find the perfect time that works for your schedule.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};