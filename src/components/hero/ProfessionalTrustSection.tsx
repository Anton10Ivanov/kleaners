
import { memo } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Users, CheckCircle } from "lucide-react";

export const ProfessionalTrustSection = memo(() => {
  const trustFeatures = [
    {
      icon: Shield,
      title: "Fully Insured & Bonded",
      description: "€5M coverage for complete peace of mind"
    },
    {
      icon: Users,
      title: "Vetted Professionals",
      description: "Background-checked and certified cleaners"
    },
    {
      icon: Clock,
      title: "Instant Booking",
      description: "Book in minutes, confirmed within hours"
    },
    {
      icon: CheckCircle,
      title: "Satisfaction Guaranteed",
      description: "100% money-back guarantee on all services"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our Services?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional cleaning services you can trust, with the reliability and quality you deserve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ProfessionalTrustSection.displayName = "ProfessionalTrustSection";
