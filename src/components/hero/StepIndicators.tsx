
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface StepIndicatorsProps {
  isMobile: boolean;
}

export const StepIndicators = memo(({ isMobile }: StepIndicatorsProps) => {
  if (isMobile) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex justify-center items-center gap-2 mt-4"
      >
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
          <span className="text-xs text-gray-600 font-medium">Info</span>
        </div>
        <ArrowRight className="h-3 w-3 text-gray-400" />
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
          <span className="text-xs text-gray-600 font-medium">Details</span>
        </div>
        <ArrowRight className="h-3 w-3 text-gray-400" />
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
          <span className="text-xs text-gray-600 font-medium">Price</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="flex justify-center items-center gap-4 mt-6"
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
        <span className="text-sm text-gray-600 font-medium">Service Info</span>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-400" />
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
        <span className="text-sm text-gray-600 font-medium">Details</span>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-400" />
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
        <span className="text-sm text-gray-600 font-medium">Price & Book</span>
      </div>
    </motion.div>
  );
});

StepIndicators.displayName = "StepIndicators";
