import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
interface SpecialInstructionsProps {
  form: UseFormReturn<BookingFormData>;
}
const SpecialInstructions = ({
  form
}: SpecialInstructionsProps) => {
  return;
};
export default SpecialInstructions;