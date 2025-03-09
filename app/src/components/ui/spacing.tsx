"use client";

import React from "react";
import { cn } from "@/lib/typography";
import { spacing } from "@/lib/typography";

type SpacingType = "section" | "content" | "stack" | "inset" | "container";
type SpacingSize = "sm" | "md" | "lg" | "xl" | "2xl";

interface SpacingProps extends React.HTMLAttributes<HTMLDivElement> {
  type: SpacingType;
  size: SpacingSize;
  className?: string;
}

export function Spacing({
  type,
  size,
  className,
  children,
  ...props
}: SpacingProps) {
  // Not all spacing types have all sizes
  const validSize = (spacing[type] as Record<string, string>)[size] 
    ? size 
    : (Object.keys(spacing[type])[0] as SpacingSize);

  return (
    <div
      className={cn((spacing[type] as Record<string, string>)[validSize], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Convenience components for common spacing patterns
export function Section({
  size = "md",
  className,
  ...props
}: Omit<SpacingProps, "type"> & { size?: SpacingSize }) {
  return <Spacing type="section" size={size} className={className} {...props} />;
}

export function Content({
  size = "md",
  className,
  ...props
}: Omit<SpacingProps, "type"> & { size?: SpacingSize }) {
  return <Spacing type="content" size={size} className={className} {...props} />;
}

export function Stack({
  size = "md",
  className,
  ...props
}: Omit<SpacingProps, "type"> & { size?: SpacingSize }) {
  return (
    <Spacing
      type="stack"
      size={size}
      className={cn("flex flex-row items-center", className)}
      {...props}
    />
  );
}

export function Inset({
  size = "md",
  className,
  ...props
}: Omit<SpacingProps, "type"> & { size?: SpacingSize }) {
  return <Spacing type="inset" size={size} className={className} {...props} />;
}

export function Container({
  size = "lg",
  className,
  ...props
}: Omit<SpacingProps, "type"> & { size?: SpacingSize }) {
  return (
    <Spacing
      type="container"
      size={size}
      className={cn("mx-auto px-4", className)}
      {...props}
    />
  );
} 