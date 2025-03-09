"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  OptimizedImage, 
  LazyImage, 
  BlurredImage, 
  ProgressiveImage 
} from "@/components/ui/optimized-image";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { ImageGallery, SingleImageWithZoom } from "@/components/ui/image-gallery";
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  Paragraph, 
  Code 
} from "@/components/ui/typography";
import { Section, Container, Content } from "@/components/ui/spacing";

// Sample images for demonstration
const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1200&auto=format&fit=crop",
    alt: "Nike sneakers",
    width: 600,
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
    alt: "Adidas sneakers",
    width: 600,
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop",
    alt: "Puma sneakers",
    width: 600,
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
    alt: "New Balance sneakers",
    width: 600,
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1200&auto=format&fit=crop",
    alt: "Converse sneakers",
    width: 600,
    height: 400,
  },
  {
    src: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop",
    alt: "Vans sneakers",
    width: 600,
    height: 400,
  },
];

// Low quality versions of the same images
const lowQualityImages = sampleImages.map(img => ({
  ...img,
  src: img.src.replace("w=1200", "w=20").replace("q=80", "q=10"),
}));

// Invalid image URL for testing error handling
const invalidImageUrl = "https://example.com/nonexistent-image.jpg";

export default function ImagesPage() {
  return (
    <Container size="xl" className="py-8">
      <Heading1 className="mb-8">Image Optimization</Heading1>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="usage">Usage Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Section size="lg">
            <Card>
              <CardHeader>
                <CardTitle>Image Optimization System</CardTitle>
                <CardDescription>
                  A comprehensive system for optimized image loading and display
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Content size="md">
                  <Paragraph>
                    The Sneaker Collect Plus application uses a carefully designed image optimization system to ensure
                    fast loading times, smooth user experience, and high-quality visuals.
                  </Paragraph>
                  
                  <Heading3 className="mt-6">Key Features</Heading3>
                  <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
                    <li>Lazy loading for improved performance</li>
                    <li>Responsive images that adapt to different screen sizes</li>
                    <li>Placeholder images during loading</li>
                    <li>Error handling for failed image loads</li>
                    <li>Progressive image loading for better perceived performance</li>
                    <li>Image galleries with zoom functionality</li>
                    <li>Consistent aspect ratios and styling</li>
                  </ul>
                  
                  <Heading3 className="mt-6">Implementation</Heading3>
                  <Paragraph>
                    The system is built on Next.js's Image component, which provides automatic image optimization,
                    including resizing, optimizing, and serving images in modern formats. Our custom components
                    extend this functionality with additional features like placeholders, error handling, and
                    progressive loading.
                  </Paragraph>
                </Content>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
        
        <TabsContent value="components">
          <Section size="lg">
            <Heading2 className="mb-6">Image Components</Heading2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>OptimizedImage</CardTitle>
                  <CardDescription>
                    Base component with loading states and error handling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <OptimizedImage
                      src={sampleImages[0].src}
                      alt={sampleImages[0].alt}
                      width={400}
                      height={300}
                      rounded="md"
                      aspectRatio="landscape"
                    />
                    <Paragraph className="text-sm text-muted-foreground">
                      Standard optimized image with loading skeleton and error handling
                    </Paragraph>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>LazyImage</CardTitle>
                  <CardDescription>
                    Loads only when scrolled into view
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <LazyImage
                      src={sampleImages[1].src}
                      alt={sampleImages[1].alt}
                      width={400}
                      height={300}
                      rounded="md"
                      aspectRatio="landscape"
                    />
                    <Paragraph className="text-sm text-muted-foreground">
                      Lazy-loaded image that only loads when scrolled into view
                    </Paragraph>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>BlurredImage</CardTitle>
                  <CardDescription>
                    Shows a blurred version while loading
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <BlurredImage
                      src={sampleImages[2].src}
                      alt={sampleImages[2].alt}
                      width={400}
                      height={300}
                      rounded="md"
                      aspectRatio="landscape"
                      blurDataURL={lowQualityImages[2].src}
                    />
                    <Paragraph className="text-sm text-muted-foreground">
                      Image with blur-up effect while loading
                    </Paragraph>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>ProgressiveImage</CardTitle>
                  <CardDescription>
                    Shows a low-quality version while loading the high-quality one
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ProgressiveImage
                      src={sampleImages[3].src}
                      alt={sampleImages[3].alt}
                      width={400}
                      height={300}
                      rounded="md"
                      aspectRatio="landscape"
                      lowQualitySrc={lowQualityImages[3].src}
                    />
                    <Paragraph className="text-sm text-muted-foreground">
                      Progressive image that shows a low-quality version first
                    </Paragraph>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>PlaceholderImage</CardTitle>
                  <CardDescription>
                    Shown when an image fails to load
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <PlaceholderImage
                      width={400}
                      height={300}
                      rounded="md"
                      aspectRatio="landscape"
                      text="Image not available"
                    />
                    <Paragraph className="text-sm text-muted-foreground">
                      Placeholder shown when an image fails to load
                    </Paragraph>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Error Handling</CardTitle>
                  <CardDescription>
                    Automatically shows a placeholder for invalid images
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <OptimizedImage
                      src={invalidImageUrl}
                      alt="Invalid image"
                      width={400}
                      height={300}
                      rounded="md"
                      aspectRatio="landscape"
                      fallbackText="This image could not be loaded"
                    />
                    <Paragraph className="text-sm text-muted-foreground">
                      Attempting to load an invalid image URL
                    </Paragraph>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>
        </TabsContent>
        
        <TabsContent value="gallery">
          <Section size="lg">
            <Heading2 className="mb-6">Image Gallery Components</Heading2>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Image Gallery</CardTitle>
                <CardDescription>
                  Grid of images with lightbox functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageGallery
                  images={sampleImages}
                  aspectRatio="landscape"
                  columns={3}
                  gap="md"
                  rounded="md"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Single Image with Zoom</CardTitle>
                <CardDescription>
                  Single image with zoom functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-md mx-auto">
                  <SingleImageWithZoom
                    src={sampleImages[0].src}
                    alt={sampleImages[0].alt}
                    width={600}
                    height={400}
                    aspectRatio="landscape"
                    rounded="md"
                  />
                </div>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
        
        <TabsContent value="usage">
          <Section size="lg">
            <Card>
              <CardHeader>
                <CardTitle>Usage Guide</CardTitle>
                <CardDescription>
                  How to use the image optimization components in your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Content size="md">
                  <Heading3>Basic Usage</Heading3>
                  <Paragraph className="mt-2">
                    The OptimizedImage component is the base component for all image optimization features.
                  </Paragraph>
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <Code className="block whitespace-pre text-xs">
{`import { OptimizedImage } from "@/components/ui/optimized-image";

export function MyComponent() {
  return (
    <OptimizedImage
      src="/path/to/image.jpg"
      alt="Description of the image"
      width={600}
      height={400}
      aspectRatio="landscape"
      rounded="md"
      objectFit="cover"
    />
  );
}`}
                    </Code>
                  </div>
                  
                  <Heading3 className="mt-8">Lazy Loading</Heading3>
                  <Paragraph className="mt-2">
                    Use the LazyImage component to load images only when they are scrolled into view.
                  </Paragraph>
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <Code className="block whitespace-pre text-xs">
{`import { LazyImage } from "@/components/ui/optimized-image";

export function MyComponent() {
  return (
    <LazyImage
      src="/path/to/image.jpg"
      alt="Description of the image"
      width={600}
      height={400}
      threshold={0.1} // Load when 10% of the image is visible
    />
  );
}`}
                    </Code>
                  </div>
                  
                  <Heading3 className="mt-8">Progressive Loading</Heading3>
                  <Paragraph className="mt-2">
                    Use the ProgressiveImage component to show a low-quality version while loading the high-quality one.
                  </Paragraph>
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <Code className="block whitespace-pre text-xs">
{`import { ProgressiveImage } from "@/components/ui/optimized-image";

export function MyComponent() {
  return (
    <ProgressiveImage
      src="/path/to/high-quality-image.jpg"
      lowQualitySrc="/path/to/low-quality-image.jpg"
      alt="Description of the image"
      width={600}
      height={400}
    />
  );
}`}
                    </Code>
                  </div>
                  
                  <Heading3 className="mt-8">Image Gallery</Heading3>
                  <Paragraph className="mt-2">
                    Use the ImageGallery component to display a grid of images with lightbox functionality.
                  </Paragraph>
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <Code className="block whitespace-pre text-xs">
{`import { ImageGallery } from "@/components/ui/image-gallery";

export function MyComponent() {
  const images = [
    {
      src: "/path/to/image1.jpg",
      alt: "Image 1",
      width: 600,
      height: 400,
    },
    {
      src: "/path/to/image2.jpg",
      alt: "Image 2",
      width: 600,
      height: 400,
    },
    // More images...
  ];

  return (
    <ImageGallery
      images={images}
      aspectRatio="landscape"
      columns={3}
      gap="md"
      rounded="md"
    />
  );
}`}
                    </Code>
                  </div>
                </Content>
              </CardContent>
            </Card>
          </Section>
        </TabsContent>
      </Tabs>
    </Container>
  );
} 