
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Save, Mail, Phone, MapPin } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

interface PersonalInfoFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => Promise<void>;
  saving: boolean;
}

const PersonalInfoForm = ({ form, onSubmit, saving }: PersonalInfoFormProps) => {
  return (
    <Card className="md:col-span-2 border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your profile details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Email" 
                        {...field} 
                        disabled 
                        className="flex-1"
                      />
                    </FormControl>
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="Phone number" 
                        {...field} 
                        className="flex-1"
                      />
                    </FormControl>
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input 
                        placeholder="Your address" 
                        {...field} 
                        className="flex-1"
                      />
                    </FormControl>
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button 
                type="button" 
                variant="outline"
                disabled={saving}
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button 
                type="submit" 
                disabled={saving || !form.formState.isDirty}
                className="flex gap-2 items-center"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
