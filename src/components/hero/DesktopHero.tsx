
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { BookingForm } from "./BookingForm";

export const DesktopHero = memo(() => {
  const benefits = [
    "Liability insurance included",
    "Simple online booking",
    "Professional cleaners",
    "Satisfaction guaranteed"
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 py-8">
      {/* Left Content */}
      <div className="flex-1 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900"
          >
            Book your cleaning service{" "}
            <span className="text-orange-600">online</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Professional house cleaning with transparent pricing and guaranteed satisfaction. Book in just 2 minutes.
          </motion.p>

          {/* Benefits List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Right Content - Booking Form */}
      <div className="flex-1 max-w-lg w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get your quote</h2>
            <p className="text-gray-600">Fill out the form to receive your personalized cleaning quote</p>
          </div>
          <BookingForm layout="desktop" />
        </motion.div>
      </div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
