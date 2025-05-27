
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { BookingForm } from "./BookingForm";

interface MobileHeroProps {
  hideForm?: boolean;
}

export const MobileHero = memo(({ hideForm = false }: MobileHeroProps) => {
  const benefits = [
    "Liability insurance",
    "Simple booking",
    "Professional cleaners",
    "Satisfaction guaranteed"
  ];

  return (
    <div className="flex flex-col items-center gap-8 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }} 
          className="text-4xl font-bold leading-tight text-gray-900 mb-4"
        >
          Book your cleaning service{" "}
          <span className="text-orange-600">online</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 mb-6 max-w-md mx-auto"
        >
          Professional house cleaning with transparent pricing and guaranteed satisfaction.
        </motion.p>

        {/* Benefits List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-8 max-w-sm mx-auto"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-left">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium">{benefit}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Booking Form - conditionally rendered */}
      {!hideForm && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.4 }} 
          className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
        >
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Get your quote</h2>
            <p className="text-gray-600 text-sm">Fill out the form below</p>
          </div>
          <BookingForm layout="mobile" />
        </motion.div>
      )}
    </div>
  );
});

MobileHero.displayName = "MobileHero";
