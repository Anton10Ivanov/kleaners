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
const PersonalInfoForm = ({
  form,
  onSubmit,
  saving
}: PersonalInfoFormProps) => {
  return;
};
export default PersonalInfoForm;