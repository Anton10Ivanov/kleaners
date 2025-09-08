import { memo } from "react";

export const BackgroundElements = memo(() => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      {/* Professional accent overlays */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-accent/8 via-accent/4 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/8 to-transparent" />
      
      {/* Sophisticated geometric elements */}
      <div className="absolute top-32 right-32 w-96 h-96 bg-gradient-to-br from-accent/12 to-secondary/8 rounded-full blur-3xl animate-float opacity-60" />
      <div className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tr from-secondary/15 to-accent/10 rounded-full blur-2xl animate-pulse opacity-40" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/6 to-transparent rounded-full blur-3xl" />
      
      {/* Strategic orange accent for conversion focus */}
      <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-br from-primary/8 to-primary/4 rounded-full blur-xl opacity-50" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";