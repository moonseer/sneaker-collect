'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ColorSwatchProps {
  name: string;
  color: string;
  textColor?: string;
  className?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  name, 
  color, 
  textColor = 'text-white',
  className 
}) => {
  return (
    <div className={cn('flex flex-col rounded-md overflow-hidden shadow-sm', className)}>
      <div 
        className={cn('h-16 flex items-center justify-center p-2', color, textColor)}
      >
        <span className="font-medium">{name}</span>
      </div>
      <div className="bg-card p-2 text-xs text-card-foreground">
        <code>{color}</code>
      </div>
    </div>
  );
};

export function ColorPalette() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-3">Primary Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="Primary" color="bg-primary" />
          <ColorSwatch name="Primary Foreground" color="bg-primary-foreground" textColor="text-primary" />
          <ColorSwatch name="Secondary" color="bg-secondary" textColor="text-secondary-foreground" />
          <ColorSwatch name="Secondary Foreground" color="bg-secondary-foreground" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Accent Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="Accent" color="bg-accent" textColor="text-accent-foreground" />
          <ColorSwatch name="Accent Foreground" color="bg-accent-foreground" textColor="text-white" />
          <ColorSwatch name="Muted" color="bg-muted" textColor="text-muted-foreground" />
          <ColorSwatch name="Muted Foreground" color="bg-muted-foreground" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Status Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="Success" color="bg-success" />
          <ColorSwatch name="Warning" color="bg-warning" textColor="text-warning-foreground" />
          <ColorSwatch name="Destructive" color="bg-destructive" />
          <ColorSwatch name="Ring" color="bg-ring" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">UI Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="Background" color="bg-background" textColor="text-foreground" />
          <ColorSwatch name="Foreground" color="bg-foreground" />
          <ColorSwatch name="Card" color="bg-card" textColor="text-card-foreground" />
          <ColorSwatch name="Card Foreground" color="bg-card-foreground" />
          <ColorSwatch name="Border" color="bg-border" textColor="text-foreground" />
          <ColorSwatch name="Input" color="bg-input" textColor="text-foreground" />
        </div>
      </div>
    </div>
  );
} 