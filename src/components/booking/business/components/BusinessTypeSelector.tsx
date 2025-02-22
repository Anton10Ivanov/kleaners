
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
          <div className={cn(
            "grid gap-4",
            field.value 
              ? "grid-cols-1" // Show only one column when an option is selected
              : "grid-cols-2 md:grid-cols-3" // Show multiple columns when no option is selected
          )}>
            {businessTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = field.value === type.value;
              
              // Hide unselected options when one is selected
              if (field.value && !isSelected) {
                return null;
              }

              return (
                <div
                  key={type.value}
                  className={cn(
                    "relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                    "hover:border-primary hover:bg-primary/5",
                    isSelected
                      ? "border-primary bg-primary/5 w-full"
                      : "border-border",
                    field.value ? "col-span-full" : "" // Make selected option full width
                  )}
                  onClick={() => {
                    // If clicking the same option again, deselect it
                    if (isSelected) {
                      field.onChange("");
                      if (type.value === "other") {
                        form.setValue("specialRequirements", "");
                      }
                    } else {
                      field.onChange(type.value);
                    }
                  }}
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="text-sm text-center">{type.label}</span>
                  {type.value === "other" && isSelected && (
                    <Input
                      placeholder="Please specify"
                      className="mt-2 w-full text-sm"
                      value={form.watch("specialRequirements") || ""}
                      onChange={(e) => {
                        form.setValue("specialRequirements", e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()} // Prevent the parent div's onClick from firing
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
