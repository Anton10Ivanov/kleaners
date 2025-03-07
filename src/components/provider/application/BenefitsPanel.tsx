
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BenefitsPanelProps {
  className?: string;
}

export const BenefitsPanel = ({ className }: BenefitsPanelProps) => {
  return (
    <Card className={cn("border-0 shadow-md md:col-span-2", className)}>
      <CardHeader>
        <CardTitle>Why Work With Us?</CardTitle>
        <CardDescription>Benefits of joining our team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Flexible Schedule</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            We offer flexible working hours to accommodate your personal needs.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Competitive Pay</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Fair compensation for your skills and experience.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Growth Opportunities</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Room for advancement and professional development.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Supportive Team</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Join a friendly, diverse, and supportive work environment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
