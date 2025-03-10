
import { memo } from "react";
import { motion } from "framer-motion";

type Feature = {
  text: string;
  delay: number;
};

const FEATURES: Feature[] = [
  { text: "Multiple cleaning service options", delay: 0.1 },
  { text: "24/6 Support", delay: 0.2 },
  { text: "Fully insured professionals", delay: 0.3 }
];

export const FeatureList = memo(() => {
  return (
    <ul className="grid grid-cols-1 gap-4 w-full mx-0 md:mx-0">
      {FEATURES.map((feature, index) => (
        <motion.li 
          key={index}
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3, delay: feature.delay }} 
          className="flex items-center justify-start gap-3 text-[#8E9196] dark:text-gray-300 font-medium"
        >
          <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
          <span className="text-zinc-800">{feature.text}</span>
        </motion.li>
      ))}
    </ul>
  );
});

FeatureList.displayName = "FeatureList";
