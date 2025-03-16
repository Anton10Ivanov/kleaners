
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

type Feature = {
  text: string;
  delay: number;
};

const FEATURES: Feature[] = [
  { text: "Multiple cleaning services", delay: 0.1 },
  { text: "Vetted professional cleaners", delay: 0.2 },
  { text: "Fully insured & secure", delay: 0.3 },
  { text: "24/6 Customer support", delay: 0.4 }
];

export const FeatureList = memo(() => {
  return (
    <ul className="grid grid-cols-1 gap-3 w-full mx-0 md:mx-0">
      {FEATURES.map((feature, index) => (
        <motion.li 
          key={index}
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.3, delay: feature.delay }} 
          className="flex items-center justify-start gap-3 text-gray-600 dark:text-gray-300 font-medium"
        >
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span>{feature.text}</span>
        </motion.li>
      ))}
    </ul>
  );
});

FeatureList.displayName = "FeatureList";
