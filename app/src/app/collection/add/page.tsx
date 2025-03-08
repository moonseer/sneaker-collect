import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Add Sneaker | Sneaker Collect Plus',
  description: 'Add a new sneaker to your collection',
};

export default function AddSneakerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add Sneaker</h1>
        <Link href="/collection">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <form className="space-y-6">
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
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="nike">Nike</option>
                  <option value="adidas">Adidas</option>
                  <option value="jordan">Jordan</option>
                  <option value="yeezy">Yeezy</option>
                  <option value="new_balance">New Balance</option>
                  <option value="converse">Converse</option>
                  <option value="vans">Vans</option>
                  <option value="puma">Puma</option>
                  <option value="reebok">Reebok</option>
                  <option value="asics">Asics</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="model" className="block text-sm font-medium">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
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
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="e.g. Triple White"
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
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
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
              />
            </div>
          </div>
          
          {/* Images Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Images</h2>
            
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
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Save as Draft
            </Button>
            <Button type="submit">
              Add to Collection
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 