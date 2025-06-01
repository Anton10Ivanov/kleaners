
import { memo } from "react";
import { motion } from "framer-motion";

const badges = [
  {
    alt: "5M€ Insurance Coverage",
    placeholder: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120&h=80&fit=crop&crop=center",
    text: "5M€ Insurance"
  },
  {
    alt: "Licensed & Certified Professionals",
    placeholder: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=120&h=80&fit=crop&crop=center",
    text: "Licensed & Certified"
  },
  {
    alt: "24/7 Customer Support",
    placeholder: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&h=80&fit=crop&crop=center",
    text: "24/7 Support"
  },
  {
    alt: "Secure Payment Processing",
    placeholder: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=120&h=80&fit=crop&crop=center",
    text: "Secure Payment"
  }
];

export const TrustBadges = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="flex flex-wrap justify-center gap-4 mt-6 mb-6"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
          className="flex flex-col items-center gap-2 bg-white/90 rounded-lg p-3 shadow-sm border border-gray-200/50"
        >
          <div className="w-16 h-10 bg-gray-200 rounded-md overflow-hidden">
            <img 
              src={badge.placeholder}
              alt={badge.alt}
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <p className="text-xs font-semibold text-gray-800 text-center">{badge.text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
});

TrustBadges.displayName = "TrustBadges";
