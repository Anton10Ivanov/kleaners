
import { motion } from 'framer-motion';
import { Building2, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const BusinessSolutionsSection = () => {
  const highlights = [
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Up to 25% Savings",
      description: "Volume discounts for corporate partners"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Dedicated Support",
      description: "Personal account manager assigned"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Priority Booking",
      description: "Skip the queue with priority slots"
    }
  ];

  return (
    <section className="section-spacing-xl md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                For Businesses
              </Badge>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Corporate <span className="text-primary">Partnership Programs</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Join hundreds of businesses already saving with our exclusive partnership programs. 
              From employee discounts to corporate contracts, we've got solutions that scale with your success.
            </p>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 card-spacing-sm bg-white/70 dark:bg-gray-800/70 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/business-solutions">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Partnership Programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Building2 className="h-5 w-5" />
                  Partnership Benefits
                </CardTitle>
                <CardDescription>
                  What your business gets with our partnership programs
                </CardDescription>
              </CardHeader>
              <CardContent className="form-spacing-relaxed">
                <div className="flex justify-between items-center card-spacing-xs bg-white/50 rounded-lg">
                  <span className="font-medium">Contract Signing Bonus</span>
                  <span className="text-green-600 font-bold">€200 Value</span>
                </div>
                <div className="flex justify-between items-center card-spacing-xs bg-white/50 rounded-lg">
                  <span className="font-medium">Employee Discounts</span>
                  <span className="text-green-600 font-bold">20% Off</span>
                </div>
                <div className="flex justify-between items-center card-spacing-xs bg-white/50 rounded-lg">
                  <span className="font-medium">Volume Discounts</span>
                  <span className="text-green-600 font-bold">Up to 25%</span>
                </div>
                <div className="flex justify-between items-center card-spacing-xs bg-white/50 rounded-lg">
                  <span className="font-medium">Referral Rewards</span>
                  <span className="text-green-600 font-bold">€50/Referral</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute -top-4 -right-4 bg-primary text-white card-spacing-sm rounded-xl shadow-lg"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs opacity-90">Business Partners</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutionsSection;
