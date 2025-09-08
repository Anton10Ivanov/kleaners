
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, LogIn, User } from 'lucide-react';

export const GuestOrderOptions = () => {
  const [selectedOption, setSelectedOption] = useState<'guest' | 'create' | 'login' | null>(null);

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Account Options</h3>
        <div className="form-spacing-relaxed">
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
      </CardContent>
    </Card>
  );
};
