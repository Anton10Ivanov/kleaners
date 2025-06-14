
import { memo } from "react";

export const BackgroundElements = memo(() => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Simple gradient background for the form area */}
      <div 
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-slate-50 via-blue-50 to-slate-100"
        style={{ zIndex: 1 }}
      />
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";
