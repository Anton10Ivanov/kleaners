
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RootLayout from '@/components/RootLayout';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 section-spacing-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to our cleaning service platform. By using our service, you agree to these terms. Please read them carefully.
          </p>

          <h2>2. Services Overview</h2>
          <p>
            We provide an online platform connecting customers with cleaning service providers. Our service includes booking, scheduling, and payment processing for cleaning services.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            Users must:
          </p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of their account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect the rights of service providers and other users</li>
          </ul>

          <h2>4. Privacy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
          </p>

          <h2>5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
