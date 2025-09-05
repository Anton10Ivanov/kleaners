import { cn } from "@/lib/utils";
import React from "react";
import { UnifiedContainer } from "./layout/UnifiedContainer";

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "ultra-wide" | "full";
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, children, size = "2xl", ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn("min-h-screen", className)}
        {...props}
      >
        <UnifiedContainer size={size}>
          {children}
        </UnifiedContainer>
      </main>
    );
  }
);
PageLayout.displayName = "PageLayout";

export default PageLayout;
