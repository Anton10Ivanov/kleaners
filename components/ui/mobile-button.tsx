
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils"

const mobileButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-medium ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-98 touch-manipulation",
  {
    variants: {
      variant: {
        default: "btn-primary shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md",
        secondary: "btn-secondary shadow-sm hover:shadow-md",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "touch-comfortable px-6",
        sm: "touch-minimum px-4 text-sm",
        lg: "touch-large px-8 text-lg", 
        icon: "touch-comfortable w-12",
        full: "touch-comfortable w-full px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MobileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mobileButtonVariants> {
  asChild?: boolean
}

const MobileButton = React.forwardRef<HTMLButtonElement, MobileButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(mobileButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
MobileButton.displayName = "MobileButton"

export { MobileButton, mobileButtonVariants }
