
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { BusinessTypeSelector } from "./components/BusinessTypeSelector";
import { CleaningOptionsSelector } from "./components/CleaningOptionsSelector";
import { AdditionalFields } from "./components/AdditionalFields";
import ServiceOptions from "../ServiceOptions";
import { FrequencyTimeSelector } from "./components/FrequencyTimeSelector";
import { EnhancedCalendar } from "../EnhancedCalendar";

interface BusinessStepProps {
  form: UseFormReturn<BookingFormData>;
}

const BusinessStep = ({ form }: BusinessStepProps) => {
  const businessType = form.watch("businessType");
  const frequency = form.watch("frequency") as Frequency | undefined;

  const showFrequencyTimeSelector = frequency === Frequency.Custom;
  const showCalendar = frequency && frequency !== Frequency.Custom;

  return (
    <div className="form-spacing-relaxed">
      {/* Service Options */}
      <div className="bg-white dark:bg-gray-800 card-spacing-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <ServiceOptions 
          frequency={frequency}
          setFrequency={(freq) => form.setValue('frequency', freq)} 
        />
      </div>
      
      {/* Calendar - Using EnhancedCalendar with improved UI */}
      {showCalendar && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 card-spacing-sm">
          <EnhancedCalendar form={form} />
        </div>
      )}
      
      {/* Frequency Time Selector for Custom Schedule */}
      {showFrequencyTimeSelector && (
        <div className="bg-white dark:bg-gray-800 card-spacing-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg text-center md:text-left text-zinc-900 dark:text-white font-medium mb-4">
            Custom Schedule
          </h3>
          <FrequencyTimeSelector form={form} />
        </div>
      )}
      
      {/* Business Type */}
      <div className="bg-white dark:bg-gray-800 card-spacing-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg text-center md:text-left text-zinc-900 dark:text-white font-medium mb-4">
          Business Type
        </h3>
        <BusinessTypeSelector form={form} />
      </div>
      
      {/* Cleaning Options */}
      <div className="bg-white dark:bg-gray-800 card-spacing-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg text-center md:text-left text-zinc-900 dark:text-white font-medium mb-4">
          Cleaning Options
        </h3>
        <CleaningOptionsSelector form={form} businessType={businessType} />
      </div>
      
      {/* Additional Fields */}
      <div className="bg-white dark:bg-gray-800 card-spacing-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg text-center md:text-left text-zinc-900 dark:text-white font-medium mb-4">
          Additional Details
        </h3>
        <AdditionalFields form={form} businessType={businessType} />
      </div>
    </div>
  );
};

export default BusinessStep;
