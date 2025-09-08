
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/**
 * A type-safe hook for form handling with Zod schema validation
 * This provides strong typing and validation for form data
 
export function useTypeSafeForm<TSchema extends z.ZodType>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">
): UseFormReturn<z.infer<TSchema>> {
  return useForm<z.infer<TSchema>>({
    ...options,
    resolver: zodResolver(schema),
  });
}
