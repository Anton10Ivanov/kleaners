
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Euro, Calendar, Users, Award, Heart, Shield, Clock } from 'lucide-react';

interface BenefitsPanelProps {
  className?: string;
}

export const BenefitsPanel = ({ className = "" }: BenefitsPanelProps) => {
  const benefits = [
    {
      icon: <Euro className="h-6 w-6 text-green-600" />,
      title: "Competitive Compensation",
      description: "Fair wages that reflect German market standards with performance bonuses and regular salary reviews."
    },
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "Flexible Scheduling",
      description: "Choose your working hours and days. Perfect work-life balance with the ability to set your own availability."
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Full Insurance Coverage",
      description: "Comprehensive liability insurance up to €5M, plus accident insurance and equipment protection."
    },
    {
      icon: <Users className="h-6 w-6 text-orange-600" />,
      title: "Integration Support",
      description: "Special programs for international workers including German language support and cultural integration assistance."
    },
    {
      icon: <Award className="h-6 w-6 text-red-600" />,
      title: "Professional Development",
      description: "Free training programs, certification courses, and skill development workshops to advance your career."
    },
    {
      icon: <Clock className="h-6 w-6 text-teal-600" />,
      title: "Regular Work Guaranteed",
      description: "Steady stream of bookings with our growing customer base. No more worrying about finding clients."
    },
    {
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      title: "Social Impact",
      description: "Be part of fighting the black economy while providing essential services to all segments of society."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: "Legal & Transparent",
      description: "All contracts are fully compliant with German labor laws. No hidden fees or unfair practices."
    }
  ];

  const perks = [
    "Paid training and onboarding",
    "Equipment and supplies provided",
    "Direct payment within 24 hours",
    "24/7 customer support",
    "Performance-based bonuses",
    "Referral rewards program",
    "Access to employee benefits portal",
    "Career advancement opportunities"
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Main Benefits Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 border-2 border-primary/20">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Work With Us?
          </CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join a company that values quality, fairness, and social responsibility. 
            We're building a better future for the cleaning industry in Germany.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="flex-shrink-0 mt-1">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Perks */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Additional Perks & Benefits
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {perks.map((perk, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
              <Badge variant="secondary" className="bg-primary text-white">
                New
              </Badge>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Special integration programs for international workers
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
