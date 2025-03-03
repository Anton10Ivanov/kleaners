
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Shield } from "lucide-react";

/**
 * PrivacySecurityCard Component
 * 
 * Displays privacy and security information for the user's account settings,
 * including links to Privacy Policy and Terms of Service.
 * 
 * @returns {JSX.Element} A card component with privacy and security information
 */
export const PrivacySecurityCard = (): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
          <CardTitle>Privacy & Security</CardTitle>
        </div>
        <CardDescription>Manage your data and account security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h4 className="font-medium" id="privacy-policy-heading">Data Privacy</h4>
          <p className="text-sm text-muted-foreground">
            We collect and process your data as described in our{" "}
            <a 
              href="/legal/privacy" 
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              aria-labelledby="privacy-policy-heading"
            >
              Privacy Policy
            </a>.
          </p>
        </div>
        
        <div className="space-y-1">
          <h4 className="font-medium" id="terms-heading">Terms of Service</h4>
          <p className="text-sm text-muted-foreground">
            By using our service, you agree to our{" "}
            <a 
              href="/legal/terms" 
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
              aria-labelledby="terms-heading"
            >
              Terms of Service
            </a>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
