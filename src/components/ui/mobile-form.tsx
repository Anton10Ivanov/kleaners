
import * as React from "react"
import { cn } from "@/lib/utils"

const MobileForm = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form
    ref={ref}
    className={cn("mobile-stack space-y-4", className)}
    {...props}
  />
))
MobileForm.displayName = "MobileForm"

const MobileFormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("form-group space-y-2", className)}
    {...props}
  />
))
MobileFormField.displayName = "MobileFormField"

const MobileFormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
  }
>(({ className, children, required, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("form-label text-sm font-medium text-foreground", className)}
    {...props}
  >
    {children}
    {required && <span className="text-destructive ml-1">*</span>}
  </label>
))
MobileFormLabel.displayName = "MobileFormLabel"

const MobileFormError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("form-error text-sm text-destructive", className)}
    {...props}
  />
))
MobileFormError.displayName = "MobileFormError"

const MobileFormHelper = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("form-help text-sm text-muted-foreground", className)}
    {...props}
  />
))
MobileFormHelper.displayName = "MobileFormHelper"

export {
  MobileForm,
  MobileFormField,
  MobileFormLabel,
  MobileFormError,
  MobileFormHelper,
}
