
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from '@/schemas/booking';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cleaningOptions } from "../config/cleaningOptions";
import { cn } from '@/lib/utils';

interface CleaningOptionsSelectorProps {
  form: UseFormReturn<BookingFormData>;
  businessType: string | undefined;
}

export const CleaningOptionsSelector = ({ form, businessType }: CleaningOptionsSelectorProps) => {
  if (!businessType || businessType === "other") return null;

  const options = cleaningOptions[businessType as keyof typeof cleaningOptions];
  if (!options) return null;

  return (
    <FormField
      control={form.control}
      name="cleaningOptions"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg">Select Cleaning Services</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(options).map(([category, items]) => (
              <Card key={category} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="form-spacing-normal">
                  {items.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="cleaningOptions"
                      render={({ field: innerField }) => {
                        const currentValue = (innerField.value || []) as string[];
                        const isSelected = currentValue.includes(item);

                        return (
                          <div 
                            className={cn(
                              "group flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all",
                              "hover:bg-primary/5",
                              isSelected && "bg-primary/5"
                            )}
                            onClick={() => {
                              const updatedValue = isSelected
                                ? currentValue.filter((val) => val !== item)
                                : [...currentValue, item];
                              innerField.onChange(updatedValue);
                            }}
                          >
                            <div className={cn(
                              "flex items-center justify-center w-5 h-5 rounded border transition-colors",
                              isSelected 
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-input bg-background group-hover:border-primary/50"
                            )}>
                              {isSelected && (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className={cn(
                              "text-sm transition-colors",
                              isSelected && "text-primary font-medium"
                            )}>
                              {item}
                            </span>
                          </div>
                        );
                      }}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};
