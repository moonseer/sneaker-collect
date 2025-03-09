'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { hoverElevate, hoverScale } from '@/lib/animations';

// Animated versions of Card components
export const AnimatedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & MotionProps & { animate?: boolean; hover?: 'scale' | 'elevate' | 'none' }
>(({ className, animate = true, hover = 'none', ...props }, ref) => {
  const hoverAnimation = hover === 'scale' 
    ? hoverScale 
    : hover === 'elevate' 
      ? hoverElevate 
      : {};

  if (!animate) {
    return <Card ref={ref} className={className} {...props} />;
  }

  return (
    <motion.div
      ref={ref}
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      whileHover={hoverAnimation}
      {...props}
    />
  );
});
AnimatedCard.displayName = 'AnimatedCard';

export const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & MotionProps & { animate?: boolean }
>(({ className, animate = true, ...props }, ref) => {
  if (!animate) {
    return <CardHeader ref={ref} className={className} {...props} />;
  }

  return (
    <motion.div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      {...props}
    />
  );
});
AnimatedCardHeader.displayName = 'AnimatedCardHeader';

export const AnimatedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & MotionProps & { animate?: boolean }
>(({ className, animate = true, ...props }, ref) => {
  if (!animate) {
    return <CardTitle ref={ref as any} className={className} {...props} />;
  }

  return (
    <motion.h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      {...props}
    />
  );
});
AnimatedCardTitle.displayName = 'AnimatedCardTitle';

export const AnimatedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & MotionProps & { animate?: boolean }
>(({ className, animate = true, ...props }, ref) => {
  if (!animate) {
    return <CardDescription ref={ref} className={className} {...props} />;
  }

  return (
    <motion.p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      {...props}
    />
  );
});
AnimatedCardDescription.displayName = 'AnimatedCardDescription';

export const AnimatedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & MotionProps & { animate?: boolean }
>(({ className, animate = true, ...props }, ref) => {
  if (!animate) {
    return <CardContent ref={ref} className={className} {...props} />;
  }

  return (
    <motion.div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      {...props}
    />
  );
});
AnimatedCardContent.displayName = 'AnimatedCardContent';

export const AnimatedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & MotionProps & { animate?: boolean }
>(({ className, animate = true, ...props }, ref) => {
  if (!animate) {
    return <CardFooter ref={ref} className={className} {...props} />;
  }

  return (
    <motion.div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      {...props}
    />
  );
});
AnimatedCardFooter.displayName = 'AnimatedCardFooter'; 