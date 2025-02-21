
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Store, UtensilsCrossed, Building, School, Warehouse, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BusinessStepProps {
  form: UseFormReturn<BookingFormData>;
}

const businessTypes = [
  { value: "office", label: "Office", icon: Building2 },
  { value: "retail", label: "Retail Store", icon: Store },
  { value: "restaurant", label: "Restaurant/Café", icon: UtensilsCrossed },
  { value: "medical", label: "Medical Facility", icon: Building },
  { value: "school", label: "School/Educational", icon: School },
  { value: "warehouse", label: "Warehouse/Industrial", icon: Warehouse },
  { value: "other", label: "Other", icon: HelpCircle },
];

const cleaningOptions = {
  office: {
    workstation: [
      "Desk and Keyboard Sanitization",
      "Monitor and Screen Cleaning",
      "Chair and Furniture Cleaning"
    ],
    commonAreas: [
      "Lobby and Reception Area Cleaning",
      "Conference Room Cleaning",
      "Breakroom/Kitchen Cleaning"
    ],
    special: [
      "Whiteboard Cleaning",
      "Plant Care"
    ]
  },
  restaurant: {
    kitchen: [
      "Grease Trap Cleaning",
      "Oven and Stovetop Cleaning",
      "Hood and Exhaust Fan Cleaning"
    ],
    diningArea: [
      "Table and Chair Sanitization",
      "Floor Scrubbing and Degreasing",
      "Window Cleaning"
    ],
    special: [
      "Outdoor Patio Cleaning",
      "Menu and Condiment Holder Cleaning"
    ]
  },
  retail: {
    display: [
      "Glass Display Case Cleaning",
      "Shelf and Product Dusting",
      "Mannequin Cleaning"
    ],
    customerArea: [
      "Fitting Room Sanitization",
      "Checkout Counter Cleaning",
      "Floor Cleaning"
    ],
    special: [
      "Signage Cleaning",
      "Shopping Cart/Basket Sanitization"
    ]
  },
  medical: {
    sterilization: [
      "Operating Room Cleaning",
      "Medical Equipment Sanitization",
      "Biohazard Waste Disposal"
    ],
    patientArea: [
      "Bed and Furniture Sanitization",
      "Restroom Disinfection",
      "Waiting Area Cleaning"
    ],
    special: [
      "Air Quality Control",
      "Laundry Services"
    ]
  },
  school: {
    classroom: [
      "Desk and Chair Sanitization",
      "Whiteboard/Corkboard Cleaning",
      "Floor Cleaning"
    ],
    commonAreas: [
      "Gymnasium Cleaning",
      "Cafeteria Cleaning",
      "Restroom Disinfection"
    ],
    special: [
      "Playground Equipment Cleaning",
      "Locker Room Cleaning"
    ]
  },
  warehouse: {
    floor: [
      "Concrete Floor Scrubbing",
      "Oil and Grease Removal",
      "High-Pressure Washing"
    ],
    equipment: [
      "Machinery Cleaning",
      "Conveyor Belt Cleaning",
      "Storage Rack Cleaning"
    ],
    special: [
      "Hazardous Material Cleanup",
      "Loading Dock Cleaning"
    ]
  }
};

const BusinessStep = ({ form }: BusinessStepProps) => {
  const businessType = form.watch("businessType");
  const selectedOptions = form.watch("cleaningOptions") || [];

  const renderCleaningOptions = () => {
    if (!businessType || businessType === "other") return null;

    const options = cleaningOptions[businessType as keyof typeof cleaningOptions];
    if (!options) return null;

    return (
      <div className="space-y-6 mt-6">
        <FormField
          control={form.control}
          name="cleaningOptions"
          render={() => (
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
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), item]
                                    : field.value?.filter((val) => val !== item) || [];
                                  field.onChange(updatedValue);
                                }}
                              />
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {item}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
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

      {renderCleaningOptions()}

      <FormField
        control={form.control}
        name="frequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How Often Do You Need Cleaning?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="propertySize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Property Size (in square meters)</FormLabel>
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

      {businessType !== "other" && (
        <FormField
          control={form.control}
          name="specialRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requirements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please specify any special requirements or instructions"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default BusinessStep;
