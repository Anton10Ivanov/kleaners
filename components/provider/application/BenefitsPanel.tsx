
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Euro, Calendar, Users, Award, Heart, Shield, Clock } from 'lucide-react';

interface BenefitsPanelProps {
  className?: string;
}

export const BenefitsPanel = ({ className = "" }: BenefitsPanelProps) => {
  const benefits = [
    {
      icon: <Euro className="h-5 w-5 text-primary" />,
      title: "Competitive Pay",
      description: "Fair wages with performance bonuses"
    },
    {
      icon: <Calendar className="h-5 w-5 text-primary" />,
      title: "Flexible Hours",
      description: "Choose your own schedule"
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Full Insurance",
      description: "Comprehensive coverage included"
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Integration Support",
      description: "Language and cultural assistance"
    }
  ];

  const perks = [
    "Paid training included",
    "Equipment provided",
    "Quick payments",
    "24/7 support",
    "Performance bonuses",
    "Referral rewards"
  ];

  return (
    <div className={`form-spacing-loose ${className}`}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Why Work With Us?</CardTitle>
          <p className="text-secondary-text">
            Join a company that values quality and fairness in the cleaning industry.
          </p>
        </CardHeader>
        <CardContent className="form-spacing-loose">
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 card-spacing-sm rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 mt-0.5">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-secondary-text">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <h3 className="font-semibold mb-3">Additional Benefits</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {perks.map((perk, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
