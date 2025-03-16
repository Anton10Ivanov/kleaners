
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { BusinessTypeSelector } from "./components/BusinessTypeSelector";
import { CleaningOptionsSelector } from "./components/CleaningOptionsSelector";
import { AdditionalFields } from "./components/AdditionalFields";
import ServiceOptions from "../ServiceOptions";
import { FrequencyTimeSelector } from "./components/FrequencyTimeSelector";
import Calendar from "../Calendar";
import { Card } from "@/components/ui/card";

interface BusinessStepProps {
  form: UseFormReturn<BookingFormData>;
}

const BusinessStep = ({ form }: BusinessStepProps) => {
  const businessType = form.watch("businessType");
  const frequency = form.watch("frequency") as Frequency | undefined;

  const showFrequencyTimeSelector = frequency === Frequency.Custom;
  const showCalendar = frequency && frequency !== Frequency.Custom;

  return (
    <div className="space-y-6">
      {/* Service Options */}
      <ServiceOptions 
        frequency={frequency}
        setFrequency={(freq) => form.setValue('frequency', freq)} 
      />
      
      {/* Calendar */}
      {showCalendar && (
        <Card className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl text-center md:text-left text-zinc-900 dark:text-white font-medium mb-4">
            Select Date & Time
          </h3>
          <Calendar form={form} />
        </Card>
      )}
      
      {/* Frequency Time Selector for Custom Schedule */}
      {showFrequencyTimeSelector && (
        <Card className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl text-center md:text-left text-zinc-900 dark:text-white font-medium mb-4">
            Custom Schedule
          </h3>
          <FrequencyTimeSelector form={form} />
        </Card>
      )}
      
      {/* Business Type */}
      <Card className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl text-center md:text-left text-zinc-900 dark:text-white font-medium mb-4">
          Business Type
        </h3>
        <BusinessTypeSelector form={form} />
      </Card>
      
      {/* Cleaning Options */}
      <Card className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl text-center md:text-left text-zinc-900 dark:text-white font-medium mb-4">
          Cleaning Options
        </h3>
        <CleaningOptionsSelector form={form} businessType={businessType} />
      </Card>
      
      {/* Additional Fields */}
      <Card className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl text-center md:text-left text-zinc-900 dark:text-white font-medium mb-4">
          Additional Details
        </h3>
        <AdditionalFields form={form} businessType={businessType} />
      </Card>
    </div>
  );
};

export default BusinessStep;
