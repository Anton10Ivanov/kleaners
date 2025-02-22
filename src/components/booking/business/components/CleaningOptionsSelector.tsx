
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cleaningOptions } from "../config/cleaningOptions";

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
              <Card key={category} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {items.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="cleaningOptions"
                      render={({ field: innerField }) => {
                        const currentValue = (innerField.value || []) as string[];
                        return (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <Checkbox
                              checked={currentValue.includes(item)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...currentValue, item]
                                  : currentValue.filter((val) => val !== item);
                                innerField.onChange(updatedValue);
                              }}
                            />
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {item}
                            </FormLabel>
                          </FormItem>
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
