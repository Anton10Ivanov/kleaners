
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Shield } from "lucide-react";

export const PrivacySecurityCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Privacy & Security</CardTitle>
        </div>
        <CardDescription>Manage your data and account security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h4 className="font-medium">Data Privacy</h4>
          <p className="text-sm text-muted-foreground">
            We collect and process your data as described in our{" "}
            <a href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
        
        <div className="space-y-1">
          <h4 className="font-medium">Terms of Service</h4>
          <p className="text-sm text-muted-foreground">
            By using our service, you agree to our{" "}
            <a href="/legal/terms" className="text-primary hover:underline">Terms of Service</a>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
