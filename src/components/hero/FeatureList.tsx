
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
    <div className="w-full max-w-3xl mx-auto mt-4">
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
        {FEATURES.map((feature, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, delay: feature.delay }} 
            className="flex items-center justify-start md:justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 shadow-sm border-0"
          >
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-xs md:text-sm truncate">{feature.text}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
});

FeatureList.displayName = "FeatureList";
