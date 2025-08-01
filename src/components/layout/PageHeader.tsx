
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
}

/**
 * Consistent page header component with title, description and optional actions
 * 
 * @param title - Page title
 * @param description - Optional page description
 * @param actions - Optional action buttons
 * @param size - Size of the header (sm: compact, md: normal, lg: large)
 * @param align - Text alignment (left or center)
 */
export function PageHeader({
  title,
  description,
  actions,
  size = "md",
  align = "left",
  className,
  ...props
}: PageHeaderProps) {
  const sizeClasses = {
    sm: "py-4",
    md: "py-8",
    lg: "py-12",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  return (
    <div className={cn("border-b", sizeClasses[size], className)} {...props}>
      <Container>
        <div className={cn("flex flex-col gap-2", alignClasses[align])}>
          <div className="flex items-center justify-between gap-4">
            <h1 className={cn(
              "font-bold text-theme-darkheading dark:text-white",
              {
                "text-2xl": size === "sm",
                "text-3xl": size === "md",
                "text-4xl": size === "lg",
              }
            )}>
              {title}
            </h1>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
          {description && (
            <p className="text-muted-foreground max-w-prose">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
