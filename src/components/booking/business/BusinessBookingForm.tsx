
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import PersonalInformation from "../final/PersonalInformation";
import CleaningAddress from "../final/CleaningAddress";
import SpecialInstructions from "../final/SpecialInstructions";
import PromoCode from "../final/PromoCode";

interface BusinessBookingFormProps {
  form: UseFormReturn<BookingFormData>;
  postalCode: string;
}

const BusinessBookingForm = ({ form, postalCode }: BusinessBookingFormProps) => {
  return (
    <div className="space-y-8">
      <PersonalInformation form={form} />
      <CleaningAddress form={form} postalCode={postalCode} />
      <SpecialInstructions form={form} />
      <PromoCode form={form} />
    </div>
  );
};

export default BusinessBookingForm;
