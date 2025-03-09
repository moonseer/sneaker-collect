"use client";

import React from "react";
import { cn } from "@/lib/typography";

interface PlaceholderImageProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  text?: string;
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
}

export function PlaceholderImage({
  width,
  height,
  text = "Image not available",
  className,
  rounded = false,
  aspectRatio = "auto",
  ...props
}: PlaceholderImageProps) {
  // Handle aspect ratio
  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    auto: "",
  };

  // Handle rounded corners
  const roundedClasses = {
    true: "rounded",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
    false: "",
  };

  const style: React.CSSProperties = {
    width: width ? `${width}px` : "100%",
    height: height ? `${height}px` : "auto",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground",
        aspectRatioClasses[aspectRatio],
        roundedClasses[rounded as keyof typeof roundedClasses],
        className
      )}
      style={style}
      {...props}
    >
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mb-2 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-xs">{text}</p>
      </div>
    </div>
  );
} 