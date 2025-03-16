
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, Shield } from "lucide-react";

interface CheckoutStepProps {
  form: UseFormReturn<BookingFormData>;
}

const CheckoutStep = ({ form }: CheckoutStepProps) => {
  const formValues = form.getValues();
  
  // Calculate the total based on service, extras, etc.
  // This is a simplified version - in a real app, you'd have more complex logic
  const calculateTotal = () => {
    let baseRate = 30; // Default rate
    
    // Adjust rate based on frequency
    if (formValues.frequency === 'weekly') baseRate = 27;
    else if (formValues.frequency === 'bi-weekly') baseRate = 30;
    else if (formValues.frequency === 'monthly') baseRate = 35;
    
    // Calculate hours
    const hours = formValues.hours || 2;
    
    // Calculate extras cost
    const extrasCount = (formValues.extras || []).length;
    const extrasCost = extrasCount * 15; // Assuming each extra is $15
    
    // Calculate total
    return (baseRate * hours) + extrasCost;
  };
  
  const total = calculateTotal();
  
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Booking Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-xl">
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Booking Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Service:</span>
            <span className="font-medium">{formValues.service || 'Regular Cleaning'}</span>
          </div>
          
          {formValues.frequency && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Frequency:</span>
              <span className="font-medium">{formValues.frequency}</span>
            </div>
          )}
          
          {formValues.date && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Date & Time:</span>
              <span className="font-medium">{format(formValues.date, 'PPP p')}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Address:</span>
            <span className="font-medium text-right">
              {formValues.address}{formValues.city ? `, ${formValues.city}` : ''} {formValues.postalCode}
            </span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span className="text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Payment Method */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Method</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number" className="text-gray-600 dark:text-gray-400">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" maxLength={19} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-gray-600 dark:text-gray-400">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" maxLength={5} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvc" className="text-gray-600 dark:text-gray-400">CVC</Label>
              <Input id="cvc" placeholder="123" maxLength={3} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-600 dark:text-gray-400">Cardholder Name</Label>
            <Input id="name" placeholder="Name on card" />
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full bg-theme-cta hover:bg-theme-cta/90 text-white h-12 rounded-xl text-base"
      >
        Complete Booking
      </Button>
      
      {/* Security & Guarantee */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Shield className="h-4 w-4" />
        <span>Secure Payment | 100% Satisfaction Guarantee</span>
      </div>
      
      {/* Cancellation Policy */}
      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
        <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
        <span>Free cancellation up to 24 hours before your appointment</span>
      </div>
    </div>
  );
};

export default CheckoutStep;
