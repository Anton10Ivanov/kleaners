
import { UseFormReturn } from "react-hook-form";
import { BusinessCleaningFormData } from '@/schemas/booking';
import PersonalInformation from "../final/PersonalInformation";
import CleaningAddress from "../final/CleaningAddress";
import SpecialInstructions from "../final/SpecialInstructions";
import PromoCode from "../final/PromoCode";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ValidatedInput } from '@/components/booking/ValidatedInput';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const businessTypes = [
  { value: "office", label: "Office", description: "Standard office spaces and co-working areas." },
  { value: "retail", label: "Retail", description: "Shops, showrooms, and customer-facing stores." },
  { value: "medical", label: "Medical / Clinic", description: "Clinics, doctor's offices, and other healthcare facilities." },
  { value: "restaurant", label: "Restaurant / Cafe", description: "Dining areas, kitchens, and food service spaces." },
  { value: "school", label: "School / Daycare", description: "Educational institutions and childcare centers." },
  { value: "warehouse", label: "Warehouse / Industrial", description: "Storage facilities and manufacturing floors." },
  { value: "other", label: "Other", description: "If your business type isn't listed, select this." }
];

const cleaningOptionsData = {
  office: [
    { id: "kitchen", label: "Kitchenette Cleaning" },
    { id: "windows", label: "Interior Window Cleaning" },
    { id: "carpet", label: "Carpet Shampooing" },
  ],
  default: [
    { id: "deep_clean", label: "Initial Deep Clean" },
    { id: "green_products", label: "Use Eco-Friendly Products" },
    { id: "supply_restock", label: "Supply Restocking (e.g., soap, paper towels)" },
  ],
};

const getCleaningOptions = (businessType?: string) => {
  const options = (businessType && cleaningOptionsData[businessType as keyof typeof cleaningOptionsData]) || [];
  return [...options, ...cleaningOptionsData.default];
};


const BusinessBookingForm = ({ form }: { form: UseFormReturn<BusinessCleaningFormData> }) => {
  const postalCode = form.watch('postalCode') || '';
  const businessType = form.watch('businessType');
  const cleaningOptions = getCleaningOptions(businessType);
  
  return (
    <div className="form-spacing-loose">
      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>Tell us about your business so we can tailor our service.</CardDescription>
        </CardHeader>
        <CardContent className="form-spacing-loose">
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Business Type <span className="text-destructive">*</span></FormLabel>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="w-64">
                        <ul className="form-spacing-tight">
                          {businessTypes.map(bt => (
                            <li key={bt.value}>
                              <p className="font-semibold">{bt.label}</p>
                              <p className="text-xs text-muted-foreground">{bt.description}</p>
                            </li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select a business type" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {businessTypes.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <ValidatedInput
             name="squareMeters"
             label="Approximate Size (m²)"
             type="number"
             placeholder="e.g. 150"
             required
             min={10}
           />
           
           <FormField
              control={form.control}
              name="cleaningOptions"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Cleaning Options <span className="text-destructive">*</span></FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Select any additional services you require.
                    </p>
                  </div>
                  <div className="form-spacing-normal">
                    {cleaningOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="cleaningOptions"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex flex-row items-center space-x-3 form-spacing-none">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const currentValue = field.value || [];
                                    return checked
                                      ? field.onChange([...currentValue, item.id])
                                      : field.onChange(currentValue.filter((value: string) => value !== item.id));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact & Address</CardTitle>
          <CardDescription>Who should we contact and where is the service needed?</CardDescription>
        </CardHeader>
        <CardContent className="form-spacing-loose">
            <PersonalInformation form={form} />
            <Separator />
            <CleaningAddress form={form} postalCode={postalCode} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
        </CardHeader>
        <CardContent className="form-spacing-loose">
          <SpecialInstructions form={form} />
          <PromoCode form={form} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessBookingForm;
