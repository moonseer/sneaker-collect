'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface AnimatedButtonProps extends Omit<ButtonProps, keyof MotionProps> {
  children?: React.ReactNode;
  animateOnHover?: boolean;
  animateOnTap?: boolean;
  animatePresence?: boolean;
  motionProps?: Partial<MotionProps>;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    children,
    className, 
    variant, 
    size, 
    animateOnHover = true, 
    animateOnTap = true, 
    animatePresence = true,
    motionProps,
    ...props 
  }, ref) => {
    // Base button component
    const buttonContent = (
      <Button
        ref={ref}
        className={cn(className)}
        variant={variant}
        size={size}
        {...props}
      >
        {children}
      </Button>
    );

    // If no animations are requested, return the base button
    if (!animateOnHover && !animateOnTap && !animatePresence) {
      return buttonContent;
    }

    // Animation properties
    const hoverAnimation = animateOnHover ? { 
      scale: 1.03,
      transition: { duration: 0.2 }
    } : {};

    const tapAnimation = animateOnTap ? { 
      scale: 0.97,
      transition: { duration: 0.1 }
    } : {};

    const presenceAnimation = animatePresence ? {
      initial: { opacity: 0, y: 5 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 5 },
      transition: { duration: 0.2 }
    } : {};

    // Return animated button
    return (
      <motion.div
        className="inline-block"
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        {...presenceAnimation}
        {...motionProps}
      >
        {buttonContent}
      </motion.div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton'; 