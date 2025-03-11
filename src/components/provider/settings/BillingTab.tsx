
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const BillingTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods and billing preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="card" className="grid gap-4">
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="card" id="card" />
              <div className="flex-1">
                <Label htmlFor="card" className="font-medium">Credit/Debit Card</Label>
                <div className="text-sm text-muted-foreground">**** **** **** 4242</div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="paypal" id="paypal" />
              <div className="flex-1">
                <Label htmlFor="paypal" className="font-medium">PayPal</Label>
                <div className="text-sm text-muted-foreground">example@email.com</div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            
            <Button variant="outline" className="w-full">Add Payment Method</Button>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Update your billing details and address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="font-medium">Billing Address</div>
            <div className="text-sm text-muted-foreground">
              <p>123 Main Street</p>
              <p>Apartment 4B</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
            </div>
            <Button variant="outline" className="w-fit mt-2">Edit Address</Button>
          </div>
          
          <Separator />
          
          <div className="grid gap-2">
            <div className="font-medium">Billing Contact</div>
            <div className="text-sm text-muted-foreground">
              <p>John Doe</p>
              <p>john.doe@example.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <Button variant="outline" className="w-fit mt-2">Edit Contact</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your recent invoices and payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 text-sm font-medium">
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            <Separator />
            <div className="grid grid-cols-3 text-sm">
              <div>Oct 12, 2023</div>
              <div>$49.99</div>
              <div className="text-green-500">Paid</div>
            </div>
            <Separator />
            <div className="grid grid-cols-3 text-sm">
              <div>Sep 12, 2023</div>
              <div>$49.99</div>
              <div className="text-green-500">Paid</div>
            </div>
            <Separator />
            <div className="grid grid-cols-3 text-sm">
              <div>Aug 12, 2023</div>
              <div>$49.99</div>
              <div className="text-green-500">Paid</div>
            </div>
            <Button variant="outline" className="w-full mt-4">View All Invoices</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingTab;
