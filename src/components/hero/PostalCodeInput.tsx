import { memo } from "react";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface PostalCodeInputProps {
  postalCode: string;
  setPostalCode: (value: string) => void;
}

export const PostalCodeInput = memo(({
  postalCode,
  setPostalCode
}: PostalCodeInputProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div>
      <label className={cn(
        "block text-sm font-medium mb-2 text-center",
        isMobile ? "text-muted-foreground" : "text-primary-foreground"
      )}>
        Your Postal code
      </label>
      <Input 
        type="text" 
        placeholder="City name or Postal code" 
        value={postalCode} 
        onChange={e => setPostalCode(e.target.value)} 
        className={cn(
          "px-4 rounded-2xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-base font-medium shadow-sm hover:shadow-md",
          isMobile ? "h-16" : "h-14"
        )}
        required 
      />
    </div>
  );
});
PostalCodeInput.displayName = "PostalCodeInput";