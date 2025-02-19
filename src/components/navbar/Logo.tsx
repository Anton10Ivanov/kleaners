
import { Link, useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
      <img
        src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png"
        alt="Kleaners.de Logo"
        className="h-8 w-8 object-contain"
        style={{ filter: 'brightness(0) saturate(100%) invert(50%) sepia(50%) saturate(1000%) hue-rotate(346deg) brightness(100%) contrast(100%)' }}
      />
      <span className="font-raleway font-bold text-2xl text-primary dark:text-primary hover:opacity-90 transition-opacity">
        Kleaners.de
      </span>
    </div>
  );
};
