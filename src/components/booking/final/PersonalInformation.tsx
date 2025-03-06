import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
interface PersonalInformationProps {
  form: UseFormReturn<BookingFormData>;
}
const PersonalInformation = ({
  form
}: PersonalInformationProps) => {
  return <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Your information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField control={form.control} name="firstName" render={({
        field
      }) => <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        <FormField control={form.control} name="lastName" render={({
        field
      }) => <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        <FormField control={form.control} name="phone" render={({
        field
      }) => <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        <FormField control={form.control} name="email" render={({
        field
      }) => <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        <FormField control={form.control} name="password" render={({
        field
      }) => <FormItem>
              <FormLabel>Choose a password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        <FormField control={form.control} name="confirmPassword" render={({
        field
      }) => <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
      </div>
      <p className="text-sm text-primary">* Login as returning client</p>
    </div>;
};
export default PersonalInformation;