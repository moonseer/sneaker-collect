'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Sneaker } from '@/lib/schema';
import { updateSneaker } from '@/lib/supabase';

interface BulkEditToolbarProps {
  selectedSneakers: Sneaker[];
  onClearSelection: () => void;
  onBulkEditComplete: () => void;
}

export default function BulkEditToolbar({ 
  selectedSneakers, 
  onClearSelection,
  onBulkEditComplete
}: BulkEditToolbarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [bulkEditField, setBulkEditField] = useState<string>('');
  const [bulkEditValue, setBulkEditValue] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Fields that can be bulk edited
  const editableFields = [
    { id: 'condition', label: 'Condition' },
    { id: 'market_value', label: 'Market Value' },
    { id: 'retail_price', label: 'Retail Price' },
    { id: 'purchase_price', label: 'Purchase Price' },
    { id: 'purchase_location', label: 'Purchase Location' },
    { id: 'notes', label: 'Notes' }
  ];

  // Handle bulk edit submission
  const handleBulkEdit = async () => {
    if (!bulkEditField || !bulkEditValue) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Process each sneaker one by one
      for (let i = 0; i < selectedSneakers.length; i++) {
        const sneaker = selectedSneakers[i];
        
        // Create update object with just the field being edited
        const updateData: any = {
          [bulkEditField]: bulkEditField === 'market_value' || 
                          bulkEditField === 'retail_price' || 
                          bulkEditField === 'purchase_price' 
                            ? parseFloat(bulkEditValue) 
                            : bulkEditValue
        };
        
        // Update the sneaker
        await updateSneaker(sneaker.id, updateData);
        
        // Update progress
        setProgress(Math.round(((i + 1) / selectedSneakers.length) * 100));
      }
      
      // Complete the operation
      setIsProcessing(false);
      setIsConfirmDialogOpen(false);
      setIsEditing(false);
      setBulkEditField('');
      setBulkEditValue('');
      onBulkEditComplete();
    } catch (error) {
      console.error('Error during bulk edit:', error);
      setIsProcessing(false);
      alert('An error occurred during bulk edit. Some items may not have been updated.');
    }
  };

  // Export selected sneakers as CSV
  const exportAsCSV = () => {
    // Create CSV header
    const headers = [
      'Brand', 'Model', 'Name', 'Colorway', 'Size', 'Condition', 
      'SKU', 'Retail Price', 'Market Value', 'Purchase Date', 
      'Purchase Price', 'Purchase Location', 'Notes'
    ].join(',');
    
    // Create CSV rows
    const rows = selectedSneakers.map(sneaker => {
      return [
        sneaker.brand,
        sneaker.model,
        sneaker.name,
        sneaker.colorway,
        sneaker.size,
        sneaker.condition,
        sneaker.sku || '',
        sneaker.retail_price || '',
        sneaker.market_value || '',
        sneaker.purchase_date || '',
        sneaker.purchase_price || '',
        sneaker.purchase_location || '',
        (sneaker.notes || '').replace(/,/g, ';') // Replace commas in notes with semicolons
      ].map(value => `"${value}"`).join(',');
    });
    
    // Combine header and rows
    const csv = [headers, ...rows].join('\n');
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'sneaker_collection_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedSneakers.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 mb-4 rounded-lg border bg-card p-4 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center">
          <span className="mr-2 font-medium">{selectedSneakers.length} sneakers selected</span>
          <Button variant="outline" size="sm" onClick={onClearSelection}>
            Clear Selection
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={exportAsCSV}
          >
            Export as CSV
          </Button>
          
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button size="sm">Bulk Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Edit {selectedSneakers.length} Sneakers</DialogTitle>
                <DialogDescription>
                  Choose a field to edit for all selected sneakers.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="bulkEditField" className="text-right">
                    Field
                  </label>
                  <select
                    id="bulkEditField"
                    className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={bulkEditField}
                    onChange={(e) => setBulkEditField(e.target.value)}
                  >
                    <option value="">Select a field</option>
                    {editableFields.map(field => (
                      <option key={field.id} value={field.id}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="bulkEditValue" className="text-right">
                    New Value
                  </label>
                  <input
                    id="bulkEditValue"
                    type={
                      bulkEditField === 'market_value' || 
                      bulkEditField === 'retail_price' || 
                      bulkEditField === 'purchase_price' 
                        ? 'number' 
                        : 'text'
                    }
                    className="col-span-3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={bulkEditValue}
                    onChange={(e) => setBulkEditValue(e.target.value)}
                    placeholder={`Enter new ${bulkEditField ? editableFields.find(f => f.id === bulkEditField)?.label.toLowerCase() : 'value'}`}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => setIsConfirmDialogOpen(true)}
                  disabled={!bulkEditField || !bulkEditValue}
                >
                  Preview Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Bulk Edit</DialogTitle>
                <DialogDescription>
                  You are about to update {selectedSneakers.length} sneakers. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Sneaker</th>
                      <th className="p-2 text-left">Current Value</th>
                      <th className="p-2 text-left">New Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSneakers.map(sneaker => (
                      <tr key={sneaker.id} className="border-b">
                        <td className="p-2">
                          {sneaker.brand} {sneaker.model} - {sneaker.name}
                        </td>
                        <td className="p-2">
                          {bulkEditField && (sneaker as any)[bulkEditField] !== undefined 
                            ? (sneaker as any)[bulkEditField] 
                            : 'N/A'}
                        </td>
                        <td className="p-2 font-medium">
                          {bulkEditValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {isProcessing && (
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div 
                      className="h-full bg-primary transition-all" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsConfirmDialogOpen(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleBulkEdit}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Changes'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
} 