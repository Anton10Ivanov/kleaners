
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
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" // Show multiple columns when no option is selected
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
                    "group relative flex items-center p-6 rounded-lg border-2 cursor-pointer transition-all",
                    "hover:border-primary hover:bg-primary/5",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border",
                    field.value ? "w-full" : "" // Make selected option full width
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
                  <div className="flex items-center gap-4 flex-1">
                    <div className={cn(
                      "p-3 rounded-md transition-colors",
                      isSelected ? "bg-primary/10" : "bg-secondary/50 group-hover:bg-primary/5"
                    )}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-base font-medium">{type.label}</span>
                  </div>
                  {type.value === "other" && isSelected && (
                    <Input
                      placeholder="Please specify"
                      className="mt-4 w-full text-sm"
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

