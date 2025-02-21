
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { businessTypes } from "../config/businessTypes";

interface BusinessTypeSelectorProps {
  form: UseFormReturn<BookingFormData>;
}

export const BusinessTypeSelector = ({ form }: BusinessTypeSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name="businessType"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel className="text-lg font-medium">Type of Business Property</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {businessTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.value}
                  className={cn(
                    "relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                    "hover:border-primary hover:bg-primary/5",
                    field.value === type.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  )}
                  onClick={() => field.onChange(type.value)}
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="text-sm text-center">{type.label}</span>
                  {type.value === "other" && field.value === "other" && (
                    <Input
                      placeholder="Please specify"
                      className="mt-2 w-full text-sm"
                      onChange={(e) => {
                        field.onChange("other");
                        form.setValue("specialRequirements", e.target.value);
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
