import { useRouter } from "next/navigation";
import { cn } from '@/lib/utils";


export const Logo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 rounded-lg p-1"
    >
      <img
        src="/Images/Logo.png" 
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
