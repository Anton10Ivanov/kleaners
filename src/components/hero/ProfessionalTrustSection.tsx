
import { memo } from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Users, CheckCircle } from "lucide-react";

export const ProfessionalTrustSection = memo(() => {
  const trustFeatures = [
    {
      icon: Shield,
      title: "Fully Insured & Bonded",
      description: "€5M coverage for complete peace of mind",
      color: "bg-green-500/10 text-green-600"
    },
    {
      icon: Users,
      title: "Vetted Professionals",
      description: "Background-checked and certified cleaners",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: Clock,
      title: "Instant Booking",
      description: "Book in minutes, confirmed within hours",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Satisfaction Guaranteed",
      description: "100% money-back guarantee on all services",
      color: "bg-primary/10 text-primary"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Why Choose Our Services?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional cleaning services you can trust, with the reliability and quality you deserve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600"
              >
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} rounded-2xl mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <IconComponent className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
