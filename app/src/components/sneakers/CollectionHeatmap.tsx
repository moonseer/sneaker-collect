'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sneaker } from '@/lib/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the color scale for the heatmap
const COLOR_SCALE = [
  'hsl(213, 94%, 95%)', // Lightest blue
  'hsl(213, 94%, 85%)',
  'hsl(213, 94%, 75%)',
  'hsl(213, 94%, 65%)',
  'hsl(213, 94%, 55%)',
  'hsl(213, 94%, 45%)', // Darkest blue
];

// Define the dimensions for the heatmap cells
const CELL_SIZE = 30;
const CELL_MARGIN = 4;

type HeatmapDimension = 'brand' | 'model' | 'size' | 'condition' | 'purchase_date';

interface CollectionHeatmapProps {
  sneakers: Sneaker[];
}

export function CollectionHeatmap({ sneakers }: CollectionHeatmapProps) {
  const [xAxis, setXAxis] = useState<HeatmapDimension>('brand');
  const [yAxis, setYAxis] = useState<HeatmapDimension>('size');
  
  // Generate heatmap data based on selected dimensions
  const heatmapData = useMemo(() => {
    // Create a map to count sneakers by the selected dimensions
    const countMap: Record<string, Record<string, number>> = {};
    
    // Initialize with empty objects
    sneakers.forEach(sneaker => {
      const xValue = String(sneaker[xAxis] || 'Unknown');
      if (!countMap[xValue]) {
        countMap[xValue] = {};
      }
    });
    
    // Count sneakers for each combination
    sneakers.forEach(sneaker => {
      const xValue = String(sneaker[xAxis] || 'Unknown');
      const yValue = String(sneaker[yAxis] || 'Unknown');
      
      if (!countMap[xValue][yValue]) {
        countMap[xValue][yValue] = 0;
      }
      
      countMap[xValue][yValue]++;
    });
    
    return countMap;
  }, [sneakers, xAxis, yAxis]);
  
  // Get unique values for both axes
  const xValues = useMemo(() => 
    Array.from(new Set(sneakers.map(s => String(s[xAxis] || 'Unknown')))).sort(),
  [sneakers, xAxis]);
  
  const yValues = useMemo(() => 
    Array.from(new Set(sneakers.map(s => String(s[yAxis] || 'Unknown')))).sort((a, b) => {
      // Special handling for sizes to ensure numerical sorting
      if (yAxis === 'size') {
        return parseFloat(a) - parseFloat(b);
      }
      return a.localeCompare(b);
    }),
  [sneakers, yAxis]);
  
  // Find the maximum count to normalize colors
  const maxCount = useMemo(() => {
    let max = 0;
    Object.values(heatmapData).forEach(yMap => {
      Object.values(yMap).forEach(count => {
        if (count > max) max = count;
      });
    });
    return max;
  }, [heatmapData]);
  
  // Get color based on count (normalized)
  const getColor = (count: number) => {
    if (count === 0) return 'hsl(0, 0%, 95%)'; // Light gray for zero
    const index = Math.min(
      Math.floor((count / maxCount) * (COLOR_SCALE.length - 1)),
      COLOR_SCALE.length - 1
    );
    return COLOR_SCALE[index];
  };
  
  // Format dimension labels for display
  const formatDimension = (dim: HeatmapDimension): string => {
    switch (dim) {
      case 'brand': return 'Brand';
      case 'model': return 'Model';
      case 'size': return 'Size';
      case 'condition': return 'Condition';
      case 'purchase_date': return 'Purchase Date';
      default: return dim;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Collection Heatmap</CardTitle>
        <CardDescription>
          Visualize your collection density across different dimensions
        </CardDescription>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">X-Axis</label>
            <Select value={xAxis} onValueChange={(value) => setXAxis(value as HeatmapDimension)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select dimension" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="model">Model</SelectItem>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="condition">Condition</SelectItem>
                <SelectItem value="purchase_date">Purchase Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Y-Axis</label>
            <Select value={yAxis} onValueChange={(value) => setYAxis(value as HeatmapDimension)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select dimension" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="model">Model</SelectItem>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="condition">Condition</SelectItem>
                <SelectItem value="purchase_date">Purchase Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {sneakers.length === 0 ? (
          <div className="flex justify-center items-center h-[300px] text-muted-foreground">
            No sneakers in your collection to display
          </div>
        ) : (
          <div className="overflow-auto max-h-[500px]">
            <div className="flex">
              {/* Empty cell for the corner */}
              <div style={{ 
                width: CELL_SIZE * 3, 
                height: CELL_SIZE, 
                marginRight: CELL_MARGIN 
              }} />
              
              {/* X-axis labels */}
              {xValues.map((xValue) => (
                <div 
                  key={`x-${xValue}`}
                  style={{ 
                    width: CELL_SIZE, 
                    height: CELL_SIZE,
                    marginRight: CELL_MARGIN,
                    textAlign: 'center',
                    fontSize: '0.7rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'bottom left',
                    position: 'relative',
                    top: CELL_SIZE / 2,
                    left: CELL_SIZE / 2
                  }}
                  title={xValue}
                >
                  {xValue}
                </div>
              ))}
            </div>
            
            {/* Y-axis labels and heatmap cells */}
            {yValues.map((yValue) => (
              <div key={`row-${yValue}`} className="flex items-center">
                <div 
                  style={{ 
                    width: CELL_SIZE * 3, 
                    height: CELL_SIZE,
                    marginRight: CELL_MARGIN,
                    fontSize: '0.8rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={yValue}
                >
                  {yValue}
                </div>
                
                {xValues.map((xValue) => {
                  const count = heatmapData[xValue]?.[yValue] || 0;
                  return (
                    <div
                      key={`cell-${xValue}-${yValue}`}
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        marginRight: CELL_MARGIN,
                        marginBottom: CELL_MARGIN,
                        backgroundColor: getColor(count),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        color: count > (maxCount / 2) ? 'white' : 'black',
                        cursor: 'pointer',
                        transition: 'transform 0.1s ease-in-out',
                      }}
                      title={`${formatDimension(xAxis)}: ${xValue}, ${formatDimension(yAxis)}: ${yValue}, Count: ${count}`}
                      className="hover:scale-110"
                    >
                      {count > 0 ? count : ''}
                    </div>
                  );
                })}
              </div>
            ))}
            
            {/* Legend */}
            <div className="flex items-center mt-6 justify-end">
              <span className="text-xs mr-2">Fewer</span>
              {COLOR_SCALE.map((color, i) => (
                <div
                  key={`legend-${i}`}
                  style={{
                    width: CELL_SIZE / 1.5,
                    height: CELL_SIZE / 1.5,
                    backgroundColor: color,
                    marginRight: i === COLOR_SCALE.length - 1 ? 0 : 2,
                  }}
                />
              ))}
              <span className="text-xs ml-2">More</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 