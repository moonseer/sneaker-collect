'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { createSneaker } from '@/lib/supabase';

export default function AddToWishlistPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    name: '',
    colorway: '',
    size: '',
    retail_price: '',
    market_value: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('You must be logged in to add items to your wishlist');
      return;
    }
    
    setLoading(true);
    
    try {
      // Convert string values to numbers where needed
      const sneakerData = {
        ...formData,
        user_id: user.id,
        size: parseFloat(formData.size) || 0,
        retail_price: formData.retail_price ? parseFloat(formData.retail_price) : undefined,
        market_value: formData.market_value ? parseFloat(formData.market_value) : undefined,
        is_wishlist: true,
        condition: 'new',
      };
      
      await createSneaker(sneakerData);
      router.push('/wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add item to wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add to Wishlist</h1>
        <Link href="/wishlist">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Sneaker Information</h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="brand" className="block text-sm font-medium">
                  Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Yeezy">Yeezy</option>
                  <option value="New Balance">New Balance</option>
                  <option value="Converse">Converse</option>
                  <option value="Vans">Vans</option>
                  <option value="Puma">Puma</option>
                  <option value="Reebok">Reebok</option>
                  <option value="Asics">Asics</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="model" className="block text-sm font-medium">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="e.g. Air Jordan 1"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name/Colorway
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Chicago"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="colorway" className="block text-sm font-medium">
                Colorway Description
              </label>
              <input
                type="text"
                id="colorway"
                name="colorway"
                value={formData.colorway}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Red/White/Black"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="size" className="block text-sm font-medium">
                  Size (US)
                </label>
                <input
                  type="number"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  step="0.5"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="retail_price" className="block text-sm font-medium">
                  Retail Price ($)
                </label>
                <input
                  type="number"
                  id="retail_price"
                  name="retail_price"
                  value={formData.retail_price}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="market_value" className="block text-sm font-medium">
                  Market Value ($)
                </label>
                <input
                  type="number"
                  id="market_value"
                  name="market_value"
                  value={formData.market_value}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Link href="/wishlist">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add to Wishlist'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 