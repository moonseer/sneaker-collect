'use client';

import { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export type SortField = 'brand' | 'model' | 'name' | 'size' | 'purchase_date' | 'purchase_price' | 'market_value' | 'retail_price' | 'condition';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

interface SortOptionsProps {
  onSortChange: (sortOption: SortOption) => void;
  currentSort?: SortOption;
}

export default function SortOptions({ onSortChange, currentSort }: SortOptionsProps) {
  const [field, setField] = useState<SortField>(currentSort?.field || 'brand');
  const [direction, setDirection] = useState<SortDirection>(currentSort?.direction || 'asc');

  const handleFieldChange = (value: string) => {
    const newField = value as SortField;
    setField(newField);
    onSortChange({ field: newField, direction });
  };

  const toggleDirection = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc';
    setDirection(newDirection);
    onSortChange({ field, direction: newDirection });
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1">
        <Select value={field} onValueChange={handleFieldChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brand">Brand</SelectItem>
            <SelectItem value="model">Model</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="size">Size</SelectItem>
            <SelectItem value="purchase_date">Purchase Date</SelectItem>
            <SelectItem value="purchase_price">Purchase Price</SelectItem>
            <SelectItem value="market_value">Market Value</SelectItem>
            <SelectItem value="retail_price">Retail Price</SelectItem>
            <SelectItem value="condition">Condition</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleDirection}
        title={direction === 'asc' ? 'Ascending' : 'Descending'}
      >
        <ArrowUpDown className={`h-4 w-4 ${direction === 'desc' ? 'rotate-180' : ''} transition-transform`} />
      </Button>
    </div>
  );
} 