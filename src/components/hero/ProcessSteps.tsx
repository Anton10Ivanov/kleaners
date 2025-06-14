
import { memo } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Sparkles } from "lucide-react";

export const ProcessSteps = memo(() => {
  const steps = [
    {
      icon: MapPin,
      number: "01",
      title: "Enter Your Location",
      description: "Tell us where you need cleaning services"
    },
    {
      icon: Calendar,
      number: "02", 
      title: "Choose Date & Time",
      description: "Pick a convenient time that works for you"
    },
    {
      icon: Sparkles,
      number: "03",
      title: "Get Professional Cleaning",
      description: "Sit back and enjoy your spotless space"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get professional cleaning in three simple steps. It's that easy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Step connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-px bg-gradient-to-r from-primary/30 to-primary/30 transform translate-x-8 z-0" />
                )}
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-4 relative">
                    <IconComponent className="h-7 w-7" />
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ProcessSteps.displayName = "ProcessSteps";
