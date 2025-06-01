
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface HeroContentProps {
  isMobile: boolean;
}

export const HeroContent = memo(({ isMobile }: HeroContentProps) => {
  const benefits = ["Liability insurance", "Simple booking", "Professional cleaners", "Satisfaction guaranteed"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className={`space-y-${isMobile ? '8' : '12'} max-w-4xl mx-auto`}
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`${isMobile ? 'text-2xl md:text-4xl' : 'text-5xl xl:text-6xl'} font-black leading-tight text-gray-900 font-['Inter'] ${isMobile ? 'mb-2' : ''}`}
      >
        Book your cleaning service{" "}
        <span className="text-primary font-extrabold">online</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`${isMobile ? 'text-sm' : 'text-xl'} text-gray-600 font-medium ${isMobile ? 'mb-2' : ''}`}
      >
        Get instant price quote in 3 easy steps • Direct price estimation on final step
      </motion.p>

      {!isMobile && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-semibold">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {isMobile && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-2 mb-4 max-w-sm mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-2 text-left"
            >
              <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
              <span className="text-xs text-gray-700 font-semibold">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
});

HeroContent.displayName = "HeroContent";
