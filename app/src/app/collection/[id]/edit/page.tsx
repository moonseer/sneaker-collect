'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { getSneakerById, updateSneaker } from '@/lib/supabase';
import { Sneaker } from '@/lib/schema';

export default function EditSneakerPage({ params }: { params: { id: string } }) {
  console.log("Rendering EditSneakerPage with params:", params);
  
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sneaker, setSneaker] = useState<Partial<Sneaker> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    name: '',
    colorway: '',
    size: '',
    sku: '',
    condition: '',
    retail_price: '',
    market_value: '',
    purchase_date: '',
    purchase_price: '',
    purchase_location: '',
    notes: '',
  });

  useEffect(() => {
    async function loadSneaker() {
      if (user) {
        console.log(`Loading sneaker with ID: ${params.id}`);
        try {
          const data = await getSneakerById(params.id);
          console.log('Sneaker data loaded:', data);
          
          if (!data) {
            console.warn(`No sneaker found with ID: ${params.id}`);
            setSneaker(null);
          } else {
            setSneaker(data as Sneaker);
            
            setFormData({
              brand: data.brand || '',
              model: data.model || '',
              name: data.name || '',
              colorway: data.colorway || '',
              size: data.size?.toString() || '',
              sku: data.sku || '',
              condition: data.condition || '',
              retail_price: data.retail_price?.toString() || '',
              market_value: data.market_value?.toString() || '',
              purchase_date: data.purchase_date ? new Date(data.purchase_date).toISOString().split('T')[0] : '',
              purchase_price: data.purchase_price?.toString() || '',
              purchase_location: data.purchase_location || '',
              notes: data.notes || '',
            });
          }
        } catch (err) {
          console.error('Error loading sneaker:', err);
          setError(err instanceof Error ? err : new Error('Unknown error loading sneaker'));
        }
      }
      setLoading(false);
    }

    loadSneaker();
  }, [user, params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !sneaker) {
      alert('Unable to update sneaker');
      return;
    }
    
    setSaving(true);
    
    try {
      // Convert string values to numbers where needed
      const sneakerData = {
        ...formData,
        size: parseFloat(formData.size) || 0,
        retail_price: formData.retail_price ? parseFloat(formData.retail_price) : undefined,
        market_value: formData.market_value ? parseFloat(formData.market_value) : undefined,
        purchase_price: formData.purchase_price ? parseFloat(formData.purchase_price) : undefined,
        purchase_date: formData.purchase_date ? new Date(formData.purchase_date) : undefined,
        condition: formData.condition as 'new' | 'like_new' | 'good' | 'fair' | 'poor' | 'worn',
      };
      
      await updateSneaker(params.id, sneakerData);
      router.push(`/collection/${params.id}`);
    } catch (error) {
      console.error('Error updating sneaker:', error);
      alert('Failed to update sneaker');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Loading sneaker details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Error Loading Sneaker</h1>
          <Link href="/collection">
            <Button variant="outline">Back to Collection</Button>
          </Link>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <p className="text-red-500 font-medium">An error occurred while loading the sneaker:</p>
          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-sm">
            {error.message}
            {error.stack && <div className="mt-2 text-xs">{error.stack}</div>}
          </pre>
        </div>
      </div>
    );
  }

  if (!sneaker) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sneaker Not Found</h1>
          <Link href="/collection">
            <Button variant="outline">Back to Collection</Button>
          </Link>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <p className="text-muted-foreground">The sneaker you're trying to edit could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Sneaker</h1>
        <Link href={`/collection/${params.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            
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
                  placeholder="e.g. Air Force 1"
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
                placeholder="e.g. Triple White"
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
                placeholder="e.g. White/White/White"
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
                <label htmlFor="condition" className="block text-sm font-medium">
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="new">New/Deadstock</option>
                  <option value="like_new">Like New (Worn 1-2 times)</option>
                  <option value="good">Good (Light wear)</option>
                  <option value="fair">Fair (Visible wear)</option>
                  <option value="poor">Poor (Heavy wear)</option>
                  <option value="worn">Worn</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="sku" className="block text-sm font-medium">
                  SKU Number
                </label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="e.g. CW2288-111"
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
                  name="purchase_date"
                  value={formData.purchase_date}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="purchase_price" className="block text-sm font-medium">
                  Purchase Price ($)
                </label>
                <input
                  type="number"
                  id="purchase_price"
                  name="purchase_price"
                  value={formData.purchase_price}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="market_value" className="block text-sm font-medium">
                  Current Market Value ($)
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
            
            <div className="space-y-2">
              <label htmlFor="purchase_location" className="block text-sm font-medium">
                Purchase Location
              </label>
              <input
                type="text"
                id="purchase_location"
                name="purchase_location"
                value={formData.purchase_location}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Nike Store, StockX, GOAT"
              />
            </div>
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
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Add any additional notes about this sneaker..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Link href={`/collection/${params.id}`}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 