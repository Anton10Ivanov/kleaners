
import React, { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// Import from the new utils/errors file
import { handleError } from '@/utils/errors';

interface DotProps {
  index: number;
}

const Dot = memo(({ index }: DotProps) => {
  const xOffset = (index % 5) * 10;
  const yOffset = Math.floor(index / 5) * 10;

  return (
    <motion.circle
      cx={50 + xOffset}
      cy={50 + yOffset}
      r="2"
      fill="currentColor"
      className="text-primary/5 dark:text-primary/50"
      variants={{
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1, transition: { delay: index * 0.05 } },
      }}
    />
  );
});

Dot.displayName = "Dot";

const AnimatedDot = memo(() => {
  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className="absolute inset-0"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
      }}
    >
      {Array.from({ length: 25 }).map((_, index) => (
        <Dot key={index} index={index} />
      ))}
    </motion.svg>
  );
});

AnimatedDot.displayName = "AnimatedDot";

const Circle = memo(() => {
  return (
    <motion.div
      className="absolute rounded-full bg-secondary/20 dark:bg-secondary/40 blur-xl opacity-75"
      style={{
        width: 200,
        height: 200,
        top: "40%",
        left: "70%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 1 } }}
    />
  );
});

Circle.displayName = "Circle";

const Blob = memo(() => {
  return (
    <motion.div
      className="absolute rounded-full bg-accent/20 dark:bg-accent/40 blur-3xl opacity-50"
      style={{
        width: 300,
        height: 300,
        top: "80%",
        left: "20%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { duration: 1 } }}
    />
  );
});

Blob.displayName = "Blob";

export const BackgroundElements = memo(() => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatedDot />
      <Circle />
      <Blob />
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";
