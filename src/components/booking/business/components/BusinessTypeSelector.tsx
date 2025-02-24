
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {businessTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = field.value === type.value;

              return (
                <div
                  key={type.value}
                  className={cn(
                    "group relative flex items-center p-6 rounded-lg border-2 cursor-pointer transition-all duration-200",
                    "hover:border-primary/50 hover:bg-primary/5",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm scale-[1.02]"
                      : "border-border",
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
                      value={form.watch("specialRequirements") || ""}
                      onChange={(e) => {
                        form.setValue("specialRequirements", e.target.value);
                      }}
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

