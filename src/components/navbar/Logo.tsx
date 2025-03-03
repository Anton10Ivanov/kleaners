
import { Link, useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="flex-shrink-0 flex items-center gap-1 cursor-pointer" 
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
    >
      <img
        src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png"
        alt="Kleaners.de Logo"
        className="h-6 w-6 object-contain"
        style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(23%) saturate(1351%) hue-rotate(170deg) brightness(92%) contrast(87%)' }}
      />
      <span className="font-raleway font-bold text-xl text-primary dark:text-primary hover:opacity-90 transition-opacity">
        Kleaners.de
      </span>
    </div>
  );
};
