
import { memo } from "react";
import { motion } from "framer-motion";
import { Shield, CreditCard, Clock, Award } from "lucide-react";

const badges = [
  {
    icon: Shield,
    text: "5M€ Insurance",
    subtext: "Fully covered"
  },
  {
    icon: Award,
    text: "Licensed & Certified",
    subtext: "Professional team"
  },
  {
    icon: Clock,
    text: "24/7 Support",
    subtext: "Always available"
  },
  {
    icon: CreditCard,
    text: "Secure Payment",
    subtext: "Pay after completion"
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
          className="flex items-center gap-2 bg-white/90 rounded-lg px-3 py-2 shadow-sm border border-gray-200/50"
        >
          <badge.icon className="h-4 w-4 text-primary flex-shrink-0" />
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-800">{badge.text}</p>
            <p className="text-xs text-gray-500">{badge.subtext}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
});

TrustBadges.displayName = "TrustBadges";
