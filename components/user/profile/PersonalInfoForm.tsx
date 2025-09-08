
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form";
import { Input } from '@/components/ui/input";
import { Button } from '@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card";
import { Loader2, Save, Mail, Phone, MapPin } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";

interface PersonalInfoFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => Promise<void>;
  saving: boolean;
  profileData?: any; // Added profileData prop
}

const PersonalInfoForm = ({
  form,
  onSubmit,
  saving,
  profileData
}: PersonalInfoFormProps) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-gray-100 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="form-spacing-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
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
                      <Input placeholder="Enter your last name" {...field} />
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
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Your email address" 
                        className="pl-10" 
                        disabled 
                        {...field} 
                      />
                    </div>
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Your phone number" 
                        className="pl-10" 
                        {...field} 
                        value={field.value || ''}
                      />
                    </div>
                  </FormControl>
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
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Your address" 
                        className="pl-10" 
                        {...field} 
                        value={field.value || ''}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={saving} className="flex items-center gap-2">
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
