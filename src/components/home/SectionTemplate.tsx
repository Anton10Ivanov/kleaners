
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTemplateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  background?: string; // Tailwind class (e.g. 'bg-gradient-to-br from-primary/5')
  children?: React.ReactNode;
  actions?: React.ReactNode; // CTAs/buttons
  grid?: boolean; // If true, children wrapped in a grid
  className?: string;
  id?: string;
}

export const SectionTemplate: React.FC<SectionTemplateProps> = ({
  icon,
  title,
  description,
  background = "bg-gradient-to-br from-primary/5 via-transparent to-primary/10",
  children,
  actions,
  grid,
  className,
  id,
}) => (
  <section
    id={id}
    className={cn(
      background,
      "py-16 md:py-24 transition-colors duration-300",
      className
    )}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={cn(
          "mb-12 text-center flex flex-col items-center",
          icon && "gap-3"
        )}
      >
        {icon && (
          <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">{icon}</div>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
        {description && (
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">{description}</p>
        )}
        {actions && <div className="mt-4">{actions}</div>}
      </motion.div>
      <div className={grid ? "grid grid-cols-1 md:grid-cols-2 gap-8" : ""}>
        {children}
      </div>
    </div>
  </section>
);
