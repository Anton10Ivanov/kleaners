import { memo } from "react";

export const BackgroundElements = memo(() => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Clean, minimal background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Orange accent elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent" />
      
      {/* Orange geometric shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-primary/15 rounded-full blur-lg" />
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";