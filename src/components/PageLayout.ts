import { cn } from "@/lib/utils";
import React from "react";

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <main
        ref={ref}
        // This is the key: mobile-first padding that scales up for larger screens
        className={cn("container mx-auto p-4 sm:p-6 lg:p-8", className)}
        {...props}
      >
        {children}
      </main>
    );
  }
);
PageLayout.displayName = "PageLayout";

export default PageLayout;
