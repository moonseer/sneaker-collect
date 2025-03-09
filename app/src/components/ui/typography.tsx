"use client";

import React from "react";
import { cn } from "@/lib/typography";
import { typography } from "@/lib/typography";

type TypographyVariant = keyof typeof typography;

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  as?: React.ElementType;
  className?: string;
}

export function Typography({
  variant,
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  // Map variant to appropriate HTML element if not specified
  const defaultElementMap: Record<TypographyVariant, React.ElementType> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    p: "p",
    lead: "p",
    large: "p",
    small: "p",
    muted: "p",
    blockquote: "blockquote",
    code: "code",
    list: "ul",
    label: "label",
    input: "input",
  };

  const Component = as || defaultElementMap[variant] || "div";

  return (
    <Component
      className={cn(typography[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

// Convenience components for common typography variants
export function Heading1(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h1" {...props} />;
}

export function Heading2(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h2" {...props} />;
}

export function Heading3(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h3" {...props} />;
}

export function Heading4(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="h4" {...props} />;
}

export function Paragraph(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="p" {...props} />;
}

export function Lead(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="lead" {...props} />;
}

export function Large(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="large" {...props} />;
}

export function Small(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="small" {...props} />;
}

export function Muted(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="muted" {...props} />;
}

export function Blockquote(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="blockquote" {...props} />;
}

export function Code(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="code" {...props} />;
}

export function List(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="list" {...props} />;
}

export function Label(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="label" {...props} />;
} 