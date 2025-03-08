'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { lookupSneakerWithLLM, mapLLMSneakerData } from '@/lib/llm-api';
import { Sneaker } from '@/lib/schema';

interface SneakerUpdateFormProps {
  currentSneaker: Partial<Sneaker>;
  onUpdate: (updatedSneaker: Partial<Sneaker>) => void;
}

export default function SneakerUpdateForm({ currentSneaker, onUpdate }: SneakerUpdateFormProps) {
  const [sku, setSku] = useState(currentSneaker.sku || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdate = async () => {
    if (!sku.trim()) {
      setError('Please enter a SKU number');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      console.log(`Looking up sneaker with SKU: ${sku}`);
      
      const result = await lookupSneakerWithLLM(sku);
      
      if (result) {
        console.log('Lookup successful:', result);
        
        // Map the LLM data to our Sneaker model
        const lookupData = mapLLMSneakerData(result);
        
        // Merge with current sneaker data, prioritizing the lookup data
        // but keeping fields that should not be overwritten
        const updatedSneaker: Partial<Sneaker> = {
          ...currentSneaker,
          ...lookupData,
          // Keep these fields from the current sneaker
          id: currentSneaker.id,
          user_id: currentSneaker.user_id,
          size: currentSneaker.size,
          condition: currentSneaker.condition,
          purchase_date: currentSneaker.purchase_date,
          purchase_price: currentSneaker.purchase_price,
          purchase_location: currentSneaker.purchase_location,
          notes: currentSneaker.notes,
          is_wishlist: currentSneaker.is_wishlist,
          created_at: currentSneaker.created_at,
          updated_at: new Date(),
        };
        
        // Call the onUpdate callback with the updated sneaker
        onUpdate(updatedSneaker);
        setSuccess('Sneaker information updated successfully!');
      } else {
        setError(`No information found for SKU: ${sku}`);
      }
    } catch (err) {
      console.error('Error updating sneaker:', err);
      setError('An error occurred while updating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-md bg-card">
      <h3 className="text-lg font-medium">Update Sneaker Information</h3>
      <p className="text-sm text-muted-foreground">
        Enter the SKU number to update this sneaker's information using our database.
      </p>
      
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter SKU number (e.g., HF3975-001)"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="flex-1"
          disabled={loading}
        />
        <Button 
          onClick={handleUpdate} 
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </div>
      
      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      
      {success && (
        <div className="text-sm text-green-500">{success}</div>
      )}
      
      <div className="text-xs text-muted-foreground">
        Note: This will update brand, model, name, colorway, and other product information.
        Your personal data like size, condition, purchase details, and notes will be preserved.
      </div>
    </div>
  );
} 