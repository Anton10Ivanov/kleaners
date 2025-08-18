
import { memo } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PostalCodeInput } from "./PostalCodeInput";
import { SubmitButton } from "./SubmitButton";
import { cn } from "@/lib/utils";

interface HeroFormProps {
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const HeroForm = memo(({
  postalCode,
  setPostalCode,
  handleNextStep
}: HeroFormProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  return (
    <motion.div 
      initial={{
        opacity: 0,
        scale: isMobile ? 0.95 : 1,
        y: isMobile ? 20 : 30
      }} 
      animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} 
      transition={{
        duration: 0.8,
        delay: isMobile ? 0.1 : 0.7,
        ease: "easeOut"
      }}
      className={cn(
        "backdrop-blur-sm rounded-3xl shadow-2xl border transition-all duration-300",
        isMobile 
          ? "w-full bg-card/95 border-border p-8 mt-8" 
          : "absolute top-[15%] left-8 transform w-96 max-w-sm border-white/20 p-8 z-10 py-0 px-[28px] bg-transparent"
      )}
    >
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-4" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{
          duration: 0.6,
          delay: isMobile ? 0.2 : 0.9
        }}
      >
        {/* Enhanced form header - Mobile only */}
        {isMobile && (
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">Get Your Quote</h3>
            <p className="text-sm font-medium text-muted-foreground">Quick • Easy • Free • No Commitment</p>
          </div>
        )}

        {/* Location Input */}
        <PostalCodeInput postalCode={postalCode} setPostalCode={setPostalCode} />
        
        {/* CTA Button */}
        <SubmitButton />
      </motion.form>
    </motion.div>
  );
});
HeroForm.displayName = "HeroForm";
