
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, House, CheckCircle, Clock, Users } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const advantages = [
  {
    title: "Professional Cleaners",
    icon: Users,
    color: "bg-orange-100 text-orange-600",
    tooltip: "Trained and vetted cleaning professionals"
  },
  {
    title: "Liability Insurance",
    icon: Shield,
    color: "bg-blue-100 text-blue-600",
    tooltip: "Full insurance coverage for your peace of mind"
  },
  {
    title: "Home Safety Guaranteed",
    icon: House,
    color: "bg-green-100 text-green-600",
    tooltip: "Your home is safe and secure with us"
  },
  {
    title: "Quality Results",
    icon: Sparkles,
    color: "bg-purple-100 text-purple-600",
    tooltip: "Spotless cleaning with attention to detail"
  },
  {
    title: "Satisfaction Guaranteed",
    icon: CheckCircle,
    color: "bg-red-100 text-red-600",
    tooltip: "100% satisfaction or we'll make it right"
  },
  {
    title: "Flexible Scheduling",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
    tooltip: "Book at your convenience, when you need us"
  }
];

export const ModernWhyChooseUs = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="py-6 bg-[#F2FCE2] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-zinc-950">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            We make home cleaning simple, reliable, and tailored to your needs with our trusted local professionals.
          </p>
        </motion.div>

        <TooltipProvider>
          <div className={`grid ${
            isMobile 
              ? 'grid-cols-2 gap-2' 
              : 'grid-cols-3 lg:grid-cols-6 gap-3'
          }`}>
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-3 rounded-xl shadow-sm flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 bg-white hover:shadow-md border border-gray-100 cursor-pointer">
                      <div className={`p-2 ${advantage.color} rounded-full mb-2`}>
                        <advantage.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <h3 className="text-xs md:text-sm font-semibold text-gray-900 leading-tight">
                        {advantage.title}
                      </h3>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{advantage.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default ModernWhyChooseUs;
