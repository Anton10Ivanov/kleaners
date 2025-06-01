
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <Button
      variant="home"
      navigateHome={true}
      className={cn(
        "flex items-center gap-2 text-[#7ebce6]/80 hover:text-[#7ebce6] transition-colors",
        "text-lg font-bold tracking-wide"
      )}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-[#7ebce6] to-[#5a9fd4] rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">K</span>
      </div>
      Kleaners
    </Button>
  );
};
