'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sneaker } from '@/lib/schema';
import { Checkbox } from '@/components/ui/checkbox';

interface SelectableSneakerCardProps {
  sneaker: Sneaker;
  isSelected: boolean;
  onSelectChange: (sneakerId: string, isSelected: boolean) => void;
  selectionMode: boolean;
}

export default function SelectableSneakerCard({
  sneaker,
  isSelected,
  onSelectChange,
  selectionMode
}: SelectableSneakerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    onSelectChange(sneaker.id, checked);
  };

  return (
    <div 
      className={`overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {/* Selection checkbox */}
        {(selectionMode || isHovered || isSelected) && (
          <div className="absolute left-2 top-2 z-10">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={handleCheckboxChange}
              className="h-5 w-5 border-2 bg-background/80"
            />
          </div>
        )}
        
        {/* Sneaker image */}
        {sneaker.images && sneaker.images.length > 0 ? (
          <img
            src={sneaker.images[0]}
            alt={`${sneaker.brand} ${sneaker.model} ${sneaker.name}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold">{sneaker.brand} {sneaker.model}</h3>
        <p className="text-sm text-muted-foreground">{sneaker.name}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm">Size: {sneaker.size}</span>
          <span className="font-medium">${sneaker.market_value || sneaker.retail_price || 'N/A'}</span>
        </div>
        
        {/* Only show action buttons if not in selection mode or on hover */}
        {(!selectionMode || isHovered) && (
          <div className="mt-4 flex space-x-2">
            <Link href={`/collection/${sneaker.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                View
              </Button>
            </Link>
            <Link href={`/collection/${sneaker.id}/edit`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                Edit
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 