
import { motion } from "framer-motion";
import { Users, LucideIcon, Clock, Shield } from "lucide-react";

type FeatureBadge = {
  icon: LucideIcon;
  text: string;
  delay: number;
};

const FEATURES: FeatureBadge[] = [
  {
    icon: Users,
    text: "Local professionals",
    delay: 0.1
  },
  {
    icon: Shield,
    text: "Fully insured service",
    delay: 0.2
  },
  {
    icon: Clock,
    text: "Book in minutes",
    delay: 0.3
  }
];

export const FeatureBadges = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {FEATURES.map((feature, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3, delay: feature.delay }} 
          className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium flex items-center shadow-sm border border-gray-100"
        >
          <feature.icon className="w-3.5 h-3.5 text-primary mr-1.5" />
          <span className="text-zinc-600 text-xs">{feature.text}</span>
        </motion.div>
      ))}
    </div>
  );
};
