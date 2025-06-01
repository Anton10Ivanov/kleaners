
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ComparisonFeature {
  feature: string;
  ourBenefit: string;
  theirLimitation: string;
  category: string;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    feature: "Local Presence",
    ourBenefit: "Local cleaners in your area with no travel fees",
    theirLimitation: "Distant cleaners with additional travel charges",
    category: "Trust & Reliability"
  },
  {
    feature: "Pricing Transparency",
    ourBenefit: "Fixed upfront pricing with no hidden costs",
    theirLimitation: "Variable pricing with surprise charges",
    category: "Trust & Reliability"
  },
  {
    feature: "Insurance Coverage",
    ourBenefit: "Fully insured up to €5M for complete protection",
    theirLimitation: "Limited or no insurance coverage",
    category: "Trust & Reliability"
  },
  {
    feature: "Service Customization",
    ourBenefit: "Fully customizable service to your needs",
    theirLimitation: "One-size-fits-all approach",
    category: "Flexibility & Quality"
  },
  {
    feature: "Booking Process",
    ourBenefit: "2-minute online booking process",
    theirLimitation: "Lengthy phone calls and paperwork",
    category: "Convenience"
  },
  {
    feature: "Schedule Flexibility",
    ourBenefit: "Monday-Saturday availability with flexible times",
    theirLimitation: "Limited availability and rigid scheduling",
    category: "Flexibility & Quality"
  },
  {
    feature: "Contracts",
    ourBenefit: "No long-term contracts or commitments",
    theirLimitation: "Locked into lengthy service contracts",
    category: "Flexibility & Quality"
  },
  {
    feature: "Quality Guarantee",
    ourBenefit: "95% success rate with satisfaction guarantee",
    theirLimitation: "No guarantee or accountability",
    category: "Trust & Reliability"
  },
  {
    feature: "Background Checks",
    ourBenefit: "Thoroughly vetted and trained professionals",
    theirLimitation: "Minimal vetting of cleaning staff",
    category: "Trust & Reliability"
  },
  {
    feature: "Customer Support",
    ourBenefit: "Same-day response to all inquiries",
    theirLimitation: "Slow response times and poor communication",
    category: "Convenience"
  },
  {
    feature: "Eco-Friendly Products",
    ourBenefit: "Environmentally safe cleaning products",
    theirLimitation: "Harsh chemicals harmful to health",
    category: "Flexibility & Quality"
  },
  {
    feature: "Service Reports",
    ourBenefit: "Detailed digital reports after each cleaning",
    theirLimitation: "No documentation or follow-up",
    category: "Convenience"
  }
];

const categories = [
  "Trust & Reliability",
  "Convenience", 
  "Flexibility & Quality"
];

export const CompetitiveComparisonTable = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <div className="space-y-6">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="bg-primary/10 px-4 py-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">{category}</h3>
            </div>
            <div className="p-4 space-y-4">
              {comparisonFeatures
                .filter(feature => feature.category === category)
                .map((feature, index) => (
                  <div key={feature.feature} className="space-y-3">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {feature.feature}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-green-800 dark:text-green-300 mb-1">Kleaners.de</div>
                          <div className="text-sm text-green-700 dark:text-green-200">{feature.ourBenefit}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <X className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-xs font-medium text-red-800 dark:text-red-300 mb-1">Typical Companies</div>
                          <div className="text-sm text-red-700 dark:text-red-200">{feature.theirLimitation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          viewport={{ once: true }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
        >
          <div className="bg-primary/10 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 font-medium text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center py-4 px-6 font-medium text-green-700 dark:text-green-400">Kleaners.de</th>
                  <th className="text-center py-4 px-6 font-medium text-red-700 dark:text-red-400">Typical Companies</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures
                  .filter(feature => feature.category === category)
                  .map((feature, index) => (
                    <motion.tr
                      key={feature.feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                        {feature.feature}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300 mt-2">
                          {feature.ourBenefit}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full">
                            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                          </div>
                        </div>
                        <div className="text-sm text-red-700 dark:text-red-300 mt-2">
                          {feature.theirLimitation}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
