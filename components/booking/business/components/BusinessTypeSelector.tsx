
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from '@/schemas/booking";
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form";
import { Input } from '@/components/ui/input";
import { cn } from '@/lib/utils";
import { businessTypes } from "../config/businessTypes";

interface BusinessTypeSelectorProps {
  form: UseFormReturn<BookingFormData>;
}

export const BusinessTypeSelector = ({ form }: BusinessTypeSelectorProps) => {
  const selectedType = form.watch("businessType");
  const specialRequirements = form.watch("specialRequirements");

  return (
    <FormField
      control={form.control}
      name="businessType"
      render={({ field }) => (
        <FormItem className="form-spacing-relaxed">
          <FormLabel className="text-lg font-medium">Type of Business Property</FormLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {businessTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = field.value === type.value;

              // Only show the selected type or all types if none selected
              if (selectedType && !isSelected) {
                return null;
              }

              return (
                <div
                  key={type.value}
                  className={cn(
                    "group relative flex items-center card-spacing-md rounded-lg border-2 cursor-pointer transition-all duration-200",
                    "hover:border-primary/50 hover:bg-primary/5",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm scale-[1.02]"
                      : "border-border",
                  )}
                  onClick={() => {
                    if (isSelected) {
                      field.onChange("");
                      form.setValue("specialRequirements", "");
                    } else {
                      field.onChange(type.value);
                    }
                  }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={cn(
                      "card-spacing-xs rounded-md transition-colors",
                      isSelected ? "bg-primary text-white" : "bg-secondary/50 group-hover:bg-primary/5"
                    )}>
                      <Icon className={cn(
                        "w-6 h-6",
                        isSelected ? "text-white" : "text-primary"
                      )} />
                    </div>
                    <span className={cn(
                      "text-base font-medium transition-colors",
                      isSelected ? "text-primary" : "text-foreground"
                    )}>
                      {type.label}
                    </span>
                  </div>
                  {type.value === "other" && isSelected && (
                    <Input
                      placeholder="Please specify"
                      className="mt-4 w-full text-sm"
                      value={specialRequirements || ""}
                      onChange={(e) => form.setValue("specialRequirements", e.target.value)}
                      onClick={(e) => e.stopPropagation()}
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
