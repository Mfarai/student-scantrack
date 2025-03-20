
/**
 * PageTransition Component
 * 
 * A wrapper component that provides consistent page transition animations
 * using Framer Motion. This creates a smoother user experience when
 * navigating between different pages.
 * 
 * Usage:
 * ```tsx
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 * ```
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageTransition Component
 * 
 * @param children - The content to display within the animated container
 * @param className - Optional additional CSS classes
 * @returns An animated wrapper for page content
 */
const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
