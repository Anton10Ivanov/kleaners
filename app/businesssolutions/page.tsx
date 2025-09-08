
import { motion } from 'framer-motion';
import { CheckCircle, Users, Gift, Award, TrendingUp, Handshake, Star, Building, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BusinessSolutions = () => {
  const programs = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Corporate Partnership Program",
      description: "Long-term partnerships with exclusive benefits",
      benefits: [
        "15% discount on all services",
        "Priority booking slots",
        "Dedicated account manager",
        "Quarterly business reviews",
        "Custom service packages"
      ],
      badge: "Most Popular"
    },
    {
      icon: <Handshake className="h-8 w-8 text-primary" />,
      title: "Referral Program",
      description: "Earn rewards for every successful referral",
      benefits: [
        "€50 credit per referral",
        "Tiered bonus system",
        "Monthly referral contests",
        "Special recognition awards",
        "Unlimited referral potential"
      ],
      badge: "High Rewards"
    },
    {
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: "Employee Discount Program",
      description: "Special rates for your team members",
      benefits: [
        "20% employee discount",
        "Family member inclusion",
        "Flexible payment terms",
        "Emergency cleaning support",
        "Seasonal bonus services"
      ],
      badge: "Employee Perk"
    }
  ];

  const contractBenefits = [
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Contract Signing Bonus",
      description: "Free deep cleaning service worth €200"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Annual Volume Discounts",
      description: "Up to 25% savings based on yearly commitment"
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: "Premium Service Tier",
      description: "Access to specialized equipment and expert teams"
    },
    {
      icon: <Building className="h-6 w-6 text-primary" />,
      title: "Multi-Location Management",
      description: "Centralized billing and service coordination"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent section-spacing-2xl md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Business <span className="text-primary">Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive cleaning solutions designed for businesses, with exclusive partnerships, 
              employee benefits, and contract incentives that grow with your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 section-spacing-xs">
                Get Partnership Quote
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 section-spacing-xs">
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-spacing-2xl md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Partnership Programs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the program that best fits your business needs and unlock exclusive benefits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative">
                  {program.badge && (
                    <Badge className="absolute -top-2 left-4 bg-primary text-white">
                      {program.badge}
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4 pt-8">
                    <div className="mx-auto mb-4 card-spacing-xs bg-primary/10 rounded-full w-fit">
                      {program.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{program.title}</CardTitle>
                    <CardDescription className="text-base">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="form-spacing-normal">
                      {program.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Benefits */}
      <section className="section-spacing-2xl md:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Contract Signing Benefits
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Sign a long-term contract and unlock immediate value with these exclusive perks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contractBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="flex items-start gap-4 card-spacing-md bg-white dark:bg-gray-900 rounded-xl shadow-md"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-2xl md:py-32 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Partner with Us?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join hundreds of businesses already benefiting from our partnership programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-lg">+49 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span className="text-lg">business@kleaners.de</span>
              </div>
            </div>
            <Button 
              size="lg" 
              variant="secondary" 
              className="mt-8 text-lg px-8 section-spacing-xs bg-white text-primary hover:bg-gray-100"
            >
              Schedule Partnership Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BusinessSolutions;
