'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { getSneakers } from '@/lib/supabase';
import { Sneaker } from '@/lib/schema';

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlist() {
      if (user) {
        const data = await getSneakers(user.id, true);
        setWishlist(data as Sneaker[]);
      }
      setLoading(false);
    }

    loadWishlist();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <Link href="/wishlist/add">
          <Button>Add to Wishlist</Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search wishlist..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="flex space-x-2">
            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">All Brands</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="jordan">Jordan</option>
              <option value="yeezy">Yeezy</option>
            </select>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p>Loading your wishlist...</p>
          </div>
        </div>
      ) : wishlist.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
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
              className="h-6 w-6 text-primary"
            >
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">Your wishlist is empty</h3>
          <p className="mb-4 text-muted-foreground">
            Add sneakers to your wishlist to keep track of what you want to buy next.
          </p>
          <Link href="/wishlist/add">
            <Button>Add Your First Wishlist Item</Button>
          </Link>
        </div>
      ) : (
        // Wishlist Grid
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((sneaker) => (
            <div key={sneaker.id} className="overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
              <div className="aspect-square overflow-hidden bg-muted">
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
                <div className="mt-4 flex space-x-2">
                  <Button variant="default" size="sm" className="flex-1">
                    Add to Collection
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 