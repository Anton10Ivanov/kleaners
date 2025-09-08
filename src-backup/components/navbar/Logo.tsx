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
      className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 rounded-lg p-1"
    >
      <img
        src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png" 
        alt="Kleaners.de Logo" 
        className="h-8 w-8 object-contain" 
        style={{
          filter: 'brightness(0) saturate(100%) invert(13%) sepia(98%) saturate(7489%) hue-rotate(196deg) brightness(95%) contrast(107%)'
        }}
      />
      <span className="text-xl font-bold text-heading-color tracking-tight">
        Kleaners
      </span>
    </button>
  );
};
