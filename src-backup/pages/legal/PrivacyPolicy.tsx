
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RootLayout from "@/components/RootLayout";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 section-spacing-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Service preferences and history</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process your transactions</li>
            <li>Communicate with you</li>
            <li>Ensure security and prevent fraud</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Professional advisors and legal authorities when required</li>
          </ul>

          <h2>4. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
