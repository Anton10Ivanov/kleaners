
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from '@/schemas/booking';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, LogIn, User } from "lucide-react";
import { useState } from 'react';

interface PersonalInformationProps {
  form: UseFormReturn<BookingFormData>;
}

const PersonalInformation = ({ form }: PersonalInformationProps) => {
  const [selectedOption, setSelectedOption] = useState<'guest' | 'create' | 'login' | null>(null);

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Your Information</h3>
        
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedOption === 'create' && (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose a password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Account Options */}
        <div className="border-t pt-4">
          <h4 className="text-md font-medium mb-3">Account Options</h4>
          <div className="form-spacing-normal">
            {/* Order as Guest */}
            <div className="flex items-center space-x-3 card-spacing-xs border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Checkbox 
                id="order-guest"
                checked={selectedOption === 'guest'}
                onCheckedChange={(checked) => setSelectedOption(checked ? 'guest' : null)}
              />
              <User className="h-4 w-4 text-gray-500" />
              <Label htmlFor="order-guest" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Order as a guest</p>
                  <p className="text-xs text-gray-500">Quick checkout without creating an account</p>
                </div>
              </Label>
            </div>

            {/* Create Account */}
            <div className="flex items-center space-x-3 card-spacing-xs border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Checkbox 
                id="create-account"
                checked={selectedOption === 'create'}
                onCheckedChange={(checked) => setSelectedOption(checked ? 'create' : null)}
              />
              <UserPlus className="h-4 w-4 text-gray-500" />
              <Label htmlFor="create-account" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Create an account</p>
                  <p className="text-xs text-gray-500">Save your details for future bookings</p>
                </div>
              </Label>
            </div>

            {/* Login as Returning Client */}
            <div className="flex items-center space-x-3 card-spacing-xs border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <Checkbox 
                id="login-returning"
                checked={selectedOption === 'login'}
                onCheckedChange={(checked) => setSelectedOption(checked ? 'login' : null)}
              />
              <LogIn className="h-4 w-4 text-gray-500" />
              <Label htmlFor="login-returning" className="cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Login as returning client</p>
                  <p className="text-xs text-gray-500">Use your existing account details</p>
                </div>
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
