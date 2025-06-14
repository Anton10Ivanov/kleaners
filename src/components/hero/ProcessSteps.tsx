
import { memo } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Sparkles } from "lucide-react";

export const ProcessSteps = memo(() => {
  const steps = [
    {
      icon: MapPin,
      number: "01",
      title: "Enter Your Location",
      description: "Tell us where you need cleaning services",
      color: "bg-primary text-white"
    },
    {
      icon: Calendar,
      number: "02", 
      title: "Choose Date & Time",
      description: "Pick a convenient time that works for you",
      color: "bg-green-500 text-white"
    },
    {
      icon: Sparkles,
      number: "03",
      title: "Get Professional Cleaning",
      description: "Sit back and enjoy your spotless space",
      color: "bg-purple-500 text-white"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get professional cleaning in three simple steps. It's that easy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Enhanced step connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 transform translate-x-8 z-0" />
                )}
                
                <div className="relative z-10">
                  <motion.div 
                    className={`inline-flex items-center justify-center w-20 h-20 ${step.color} rounded-2xl mb-6 relative shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <IconComponent className="h-9 w-9" />
                    <motion.span 
                      className="absolute -top-3 -right-3 bg-gray-900 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5 + (index * 0.2), type: "spring" }}
                    >
                      {step.number}
                    </motion.span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
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
