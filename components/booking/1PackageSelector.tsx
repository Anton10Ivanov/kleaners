'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, TrendingDown, Calendar } from 'lucide-react';
import { calculateRegularPricing, formatPrice } from '@/utils/1bookingCalculations';
import { RegularityPackage, PackageRecommendation } from '@/types/bookingFlow';

interface PackageSelectorProps {
  onPackageSelect: (package: RegularityPackage) => void;
  onBack: () => void;
  selectedPackage?: RegularityPackage;
}

export const PackageSelector: React.FC<PackageSelectorProps> = ({
  onPackageSelect,
  onBack,
  selectedPackage
}) => {
  const packages = [
    calculateRegularPricing(RegularityPackage.WEEKLY),
    calculateRegularPricing(RegularityPackage.BIWEEKLY),
    calculateRegularPricing(RegularityPackage.MONTHLY)
  ];

  const getPackageIcon = (package: RegularityPackage) => {
    switch (package) {
      case RegularityPackage.WEEKLY:
        return <Calendar className="h-5 w-5" />;
      case RegularityPackage.BIWEEKLY:
        return <TrendingDown className="h-5 w-5" />;
      case RegularityPackage.MONTHLY:
        return <Star className="h-5 w-5" />;
    }
  };

  const getPackageColor = (package: RegularityPackage) => {
    switch (package) {
      case RegularityPackage.WEEKLY:
        return 'blue';
      case RegularityPackage.BIWEEKLY:
        return 'green';
      case RegularityPackage.MONTHLY:
        return 'purple';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Choose Your Cleaning Package</CardTitle>
          <p className="text-muted-foreground">
            Select the frequency that works best for your needs and budget
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const isSelected = selectedPackage === pkg.package;
              const color = getPackageColor(pkg.package);
              const Icon = getPackageIcon(pkg.package);
              
              return (
                <motion.div
                  key={pkg.package}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-200 h-full ${
                      isSelected 
                        ? 'border-primary border-2 shadow-lg' 
                        : 'border-2 hover:border-primary/50'
                    } ${
                      pkg.isRecommended 
                        ? 'ring-2 ring-primary/20' 
                        : ''
                    }`}
                    onClick={() => onPackageSelect(pkg.package)}
                  >
                    <CardHeader className="text-center relative">
                      {pkg.isRecommended && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                          Recommended
                        </Badge>
                      )}
                      
                      <div className={`mx-auto mb-4 p-3 rounded-full bg-${color}-100`}>
                        <Icon className={`h-6 w-6 text-${color}-600`} />
                      </div>
                      
                      <CardTitle className="text-xl">
                        {pkg.package === RegularityPackage.WEEKLY && 'Weekly'}
                        {pkg.package === RegularityPackage.BIWEEKLY && 'Bi-weekly'}
                        {pkg.package === RegularityPackage.MONTHLY && 'Monthly'}
                      </CardTitle>
                      
                      {pkg.discount > 0 && (
                        <Badge variant="secondary" className="mt-2">
                          {pkg.discount}% OFF
                        </Badge>
                      )}
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Pricing */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">
                          {formatPrice(45 * (1 - pkg.discount / 100))}
                        </div>
                        <div className="text-sm text-muted-foreground">per hour</div>
                        {pkg.discount > 0 && (
                          <div className="text-sm text-muted-foreground line-through">
                            {formatPrice(45)} regular rate
                          </div>
                        )}
                      </div>

                      {/* Monthly Savings */}
                      {pkg.monthlySavings > 0 && (
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">
                            Save {formatPrice(pkg.monthlySavings)}/month
                          </div>
                          <div className="text-xs text-green-500">
                            vs one-time cleaning
                          </div>
                        </div>
                      )}

                      {/* Reason */}
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          {pkg.reason}
                        </p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Regular cleaning schedule
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Priority booking
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Consistent cleaner
                        </li>
                        {pkg.discount > 0 && (
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {pkg.discount}% discount
                          </li>
                        )}
                      </ul>

                      {/* Select Button */}
                      <Button 
                        className={`w-full ${
                          isSelected 
                            ? 'bg-primary' 
                            : pkg.isRecommended 
                              ? 'bg-primary hover:bg-primary/90' 
                              : 'bg-secondary hover:bg-secondary/90'
                        }`}
                        onClick={() => onPackageSelect(pkg.package)}
                      >
                        {isSelected ? 'Selected' : 'Select Package'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Button variant="ghost" onClick={onBack}>
              Back to Property Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
