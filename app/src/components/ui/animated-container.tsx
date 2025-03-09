'use client';

import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { pageTransition, staggerContainer } from '@/lib/animations';

interface AnimatedContainerProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'stagger' | 'none';
  delay?: number;
  duration?: number;
  variants?: Variants;
}

export function AnimatedContainer({
  children,
  animation = 'fade',
  delay = 0,
  duration = 0.3,
  className,
  variants,
  style,
  ...props
}: AnimatedContainerProps) {
  // If no animation is requested, return a regular div
  if (animation === 'none') {
    // Extract motion-specific props to avoid passing them to a regular div
    const { 
      initial, animate, exit, transition, whileHover, whileTap, whileFocus, 
      whileInView, viewport, drag, dragConstraints, dragElastic, dragMomentum,
      ...divProps 
    } = props as any;
    
    return (
      <div className={className} style={style} {...divProps}>
        {children}
      </div>
    );
  }

  // Select animation variant based on the animation prop
  let animationVariant: Variants;
  
  switch (animation) {
    case 'fade':
      animationVariant = {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            duration,
            delay
          }
        },
        exit: { 
          opacity: 0,
          transition: { duration: duration / 1.5 }
        }
      };
      break;
    case 'slide':
      animationVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: 'spring',
            stiffness: 300,
            damping: 30,
            delay
          }
        },
        exit: { 
          opacity: 0, 
          y: 20,
          transition: { duration: duration / 1.5 }
        }
      };
      break;
    case 'stagger':
      animationVariant = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay
          }
        },
        exit: { 
          opacity: 0,
          transition: { 
            staggerChildren: 0.05,
            staggerDirection: -1
          }
        }
      };
      break;
    default:
      animationVariant = pageTransition;
  }

  // Use provided variants if available, otherwise use the selected animation
  const finalVariants = variants || animationVariant;

  return (
    <motion.div
      className={className}
      style={style}
      variants={finalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Animated item for use within staggered containers
interface AnimatedItemProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: React.ReactNode;
  delay?: number;
}

export function AnimatedItem({
  children,
  delay = 0,
  className,
  style,
  ...props
}: AnimatedItemProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: 'spring',
            stiffness: 300,
            damping: 30,
            delay
          }
        },
        exit: { 
          opacity: 0, 
          y: 10,
          transition: { duration: 0.2 }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
} 