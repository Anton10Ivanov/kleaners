import { memo } from "react";

export const BackgroundElements = memo(() => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Clean, minimal background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle accent elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-muted/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-muted/10 to-transparent" />
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";