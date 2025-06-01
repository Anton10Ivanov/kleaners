
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
        "flex items-center gap-2 text-[#7ebce6]/80 hover:text-[#7ebce6] transition-colors",
        "text-lg font-bold tracking-wide cursor-pointer"
      )}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-[#7ebce6] to-[#5a9fd4] rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">K</span>
      </div>
      Kleaners
    </button>
  );
};
