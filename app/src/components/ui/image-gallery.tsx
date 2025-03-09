"use client";

import React, { useState } from "react";
import { cn } from "@/lib/typography";
import { OptimizedImage, LazyImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  className?: string;
  thumbnailClassName?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  rounded?: boolean | "sm" | "md" | "lg" | "full";
}

export function ImageGallery({
  images,
  className,
  thumbnailClassName,
  aspectRatio = "square",
  columns = 3,
  gap = "md",
  rounded = "md",
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <div
          className={cn(
            "grid",
            columnClasses[columns],
            gapClasses[gap]
          )}
        >
          {images.map((image, index) => (
            <DialogTrigger key={index} asChild>
              <button
                className={cn(
                  "overflow-hidden",
                  thumbnailClassName
                )}
                onClick={() => setSelectedIndex(index)}
              >
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  aspectRatio={aspectRatio}
                  rounded={rounded}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </button>
            </DialogTrigger>
          ))}
        </div>

        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full bg-background/50 hover:bg-background/80"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex items-center justify-center p-6">
              <OptimizedImage
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={images[selectedIndex].width * 2}
                height={images[selectedIndex].height * 2}
                className="max-h-[80vh] w-auto"
                objectFit="contain"
              />
            </div>

            <div className="absolute inset-y-0 left-2 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/50 hover:bg-background/80"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute inset-y-0 right-2 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/50 hover:bg-background/80"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === selectedIndex
                      ? "bg-primary"
                      : "bg-muted hover:bg-muted-foreground"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export interface SingleImageWithZoomProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  rounded?: boolean | "sm" | "md" | "lg" | "full";
}

export function SingleImageWithZoom({
  src,
  alt,
  width,
  height,
  className,
  aspectRatio = "auto",
  rounded = "md",
}: SingleImageWithZoomProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className={cn("relative group", className)}>
        <DialogTrigger asChild>
          <button className="w-full">
            <OptimizedImage
              src={src}
              alt={alt}
              width={width}
              height={height}
              aspectRatio={aspectRatio}
              rounded={rounded}
              className="hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-background/50 backdrop-blur-sm p-2 rounded-full">
                <ZoomIn className="h-6 w-6" />
              </div>
            </div>
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-sm">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 rounded-full bg-background/50 hover:bg-background/80"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex items-center justify-center p-6">
            <OptimizedImage
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="max-h-[80vh] w-auto"
              objectFit="contain"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 