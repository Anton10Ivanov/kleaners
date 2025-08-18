
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export const SubmitButton = memo(() => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.02, y: -2 }} 
        whileTap={{ scale: 0.98 }} 
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Button 
          type="submit" 
          className={cn(
            "w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 group",
            isMobile ? "h-16" : "h-14"
          )}
        >
          Instant Quote. Fixed Price
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Button>
      </motion.div>

      {isMobile && (
        <p className="text-sm text-muted-foreground text-center font-medium">
          No commitment • Free quotes • Instant booking
        </p>
      )}
    </>
  );
});

SubmitButton.displayName = "SubmitButton";
