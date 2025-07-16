
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 text-primary hover:text-primary/80 transition-colors",
        "text-lg font-bold tracking-wide cursor-pointer"
      )}
    >
      <img 
        src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png" 
        alt="Kleaners.de Logo" 
        className="h-8 w-8 object-contain" 
        style={{
          filter: 'brightness(0) saturate(100%) invert(13%) sepia(98%) saturate(7489%) hue-rotate(196deg) brightness(95%) contrast(107%)'
        }}
      />
      Kleaners
    </button>
  );
};
