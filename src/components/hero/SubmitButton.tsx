
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isMobile: boolean;
}

export const SubmitButton = memo(({ isMobile }: SubmitButtonProps) => {
  if (isMobile) {
    return (
      <>
        <motion.div 
          whileHover={{ scale: 1.02, y: -2 }} 
          whileTap={{ scale: 0.98 }} 
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Button 
            type="submit" 
            className="w-full h-16 bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
          >
            Instant Quote. Fixed Price
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <p className="text-sm text-gray-500 text-center font-medium">
          No commitment • Free quotes • Instant booking
        </p>
      </>
    );
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }} 
      whileTap={{ scale: 0.98 }} 
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Button 
        type="submit" 
        className="w-full h-14 bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 group"
      >
        Instant Quote. Fixed Price
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
});

SubmitButton.displayName = "SubmitButton";
