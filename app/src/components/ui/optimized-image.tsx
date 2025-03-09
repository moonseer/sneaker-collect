"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export interface OptimizedImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  fallbackText?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  containerClassName?: string;
  showSkeleton?: boolean;
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackText = "Image not available",
  aspectRatio = "auto",
  containerClassName,
  className,
  showSkeleton = true,
  rounded = false,
  objectFit = "cover",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

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

  // Handle object fit
  const objectFitClasses = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  };

  if (error) {
    return (
      <PlaceholderImage
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        text={fallbackText}
        aspectRatio={aspectRatio}
        rounded={rounded}
        className={containerClassName}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatioClasses[aspectRatio],
        roundedClasses[rounded as keyof typeof roundedClasses],
        containerClassName
      )}
    >
      {showSkeleton && isLoading && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10",
            roundedClasses[rounded as keyof typeof roundedClasses]
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          objectFitClasses[objectFit],
          isLoading ? "opacity-0" : "opacity-100",
          roundedClasses[rounded as keyof typeof roundedClasses],
          className
        )}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}

export interface BlurredImageProps extends OptimizedImageProps {
  blurDataURL?: string;
  blurAmount?: number;
}

export function BlurredImage({
  blurDataURL,
  blurAmount = 8,
  ...props
}: BlurredImageProps) {
  return (
    <OptimizedImage
      placeholder="blur"
      blurDataURL={blurDataURL}
      style={{ filter: `blur(${blurAmount}px)` }}
      {...props}
    />
  );
}

export interface LazyImageProps extends OptimizedImageProps {
  threshold?: number;
}

export function LazyImage({ threshold = 0.1, ...props }: LazyImageProps) {
  return <OptimizedImage loading="lazy" {...props} />;
}

export interface ProgressiveImageProps extends OptimizedImageProps {
  lowQualitySrc: string;
}

export function ProgressiveImage({
  src,
  lowQualitySrc,
  ...props
}: ProgressiveImageProps) {
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);

  return (
    <div className="relative">
      <OptimizedImage
        src={lowQualitySrc}
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          highQualityLoaded ? "opacity-0" : "opacity-100"
        )}
        {...props}
      />
      <OptimizedImage
        src={src}
        onLoadingComplete={() => setHighQualityLoaded(true)}
        className={cn(
          "transition-opacity duration-500",
          highQualityLoaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />
    </div>
  );
} 