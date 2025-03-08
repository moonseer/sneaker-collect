'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SneakerSearch from '@/components/sneakers/SneakerSearch';
import { Sneaker } from '@/lib/schema';
import { useAuth } from '@/lib/auth';
import { createSneaker } from '@/lib/supabase';

export default function AddSneakerPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<Sneaker>>({
    brand: '',
    model: '',
    name: '',
    colorway: '',
    size: undefined,
    condition: 'new',
    sku: '',
    retail_price: undefined,
    market_value: undefined,
    purchase_date: undefined,
    purchase_price: undefined,
    purchase_location: '',
    notes: '',
    images: [],
    is_wishlist: false,
  });
  const [purchaseDate, setPurchaseDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPurchaseDate(value);
    
    // Convert the string date to a Date object if it's not empty
    if (value) {
      setFormData((prev) => ({
        ...prev,
        purchase_date: new Date(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        purchase_date: undefined,
      }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value ? parseFloat(value) : undefined,
    }));
  };

  const handleSneakerSelect = (sneakerData: Partial<Sneaker>) => {
    setFormData((prev) => ({
      ...prev,
      ...sneakerData,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('You must be logged in to add a sneaker');
      return;
    }
    
    if (!formData.brand || !formData.model || !formData.size || !formData.condition) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const sneakerData = {
        ...formData,
        user_id: user.id,
      };
      
      await createSneaker(sneakerData as Sneaker);
      router.push('/collection');
    } catch (error) {
      console.error('Error adding sneaker:', error);
      alert('Failed to add sneaker');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add Sneaker</h1>
        <Link href="/collection">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        {/* Sneaker Search Section */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold">Search for a Sneaker</h2>
          <p className="text-sm text-muted-foreground">
            Search for a sneaker by SKU number or name to automatically fill in details
          </p>
          <SneakerSearch onSelect={handleSneakerSelect} />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="brand" className="block text-sm font-medium">
                  Brand <span className="text-red-500">*</span>
                </label>
                <select
                  id="brand"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                  value={formData.brand}
                  onChange={handleChange}
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
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="model"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="e.g. Air Force 1"
                  required
                  value={formData.model}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name/Colorway Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Triple White"
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="colorway" className="block text-sm font-medium">
                Colorway Description
              </label>
              <input
                type="text"
                id="colorway"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. White/White/White"
                value={formData.colorway || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="size" className="block text-sm font-medium">
                  Size (US) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="size"
                  step="0.5"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                  value={formData.size || ''}
                  onChange={handleNumberChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="condition" className="block text-sm font-medium">
                  Condition <span className="text-red-500">*</span>
                </label>
                <select
                  id="condition"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="">Select Condition</option>
                  <option value="new">New/Deadstock</option>
                  <option value="like_new">Like New (Worn 1-2 times)</option>
                  <option value="good">Good (Light wear)</option>
                  <option value="fair">Fair (Visible wear)</option>
                  <option value="poor">Poor (Heavy wear)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="sku" className="block text-sm font-medium">
                  SKU Number
                </label>
                <input
                  type="text"
                  id="sku"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="e.g. CW2288-111"
                  value={formData.sku || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          {/* Purchase Info Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Purchase Information</h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="purchase_date" className="block text-sm font-medium">
                  Purchase Date
                </label>
                <input
                  type="date"
                  id="purchase_date"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={purchaseDate}
                  onChange={handleDateChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="purchase_price" className="block text-sm font-medium">
                  Purchase Price ($)
                </label>
                <input
                  type="number"
                  id="purchase_price"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="0.00"
                  value={formData.purchase_price || ''}
                  onChange={handleNumberChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="market_value" className="block text-sm font-medium">
                  Current Market Value ($)
                </label>
                <input
                  type="number"
                  id="market_value"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="0.00"
                  value={formData.market_value || ''}
                  onChange={handleNumberChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="purchase_location" className="block text-sm font-medium">
                Purchase Location
              </label>
              <input
                type="text"
                id="purchase_location"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Nike Store, StockX, GOAT"
                value={formData.purchase_location || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Images Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Images</h2>
            
            {formData.images && formData.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                    <img 
                      src={image} 
                      alt={`Sneaker image ${index + 1}`} 
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-2 rounded-full bg-background p-1 text-red-500 shadow-sm"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          images: prev.images?.filter((_, i) => i !== index)
                        }));
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-input p-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                    <line x1="16" x2="22" y1="5" y2="5"></line>
                    <line x1="19" x2="19" y1="2" y2="8"></line>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop images here or click to browse
                  </p>
                  <Button variant="outline" size="sm" type="button">
                    Upload Images
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Notes Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Notes</h2>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Add any additional notes about this sneaker..."
                value={formData.notes || ''}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Save as Draft
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add to Collection'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 