'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { getSneakers } from '@/lib/supabase';
import { Sneaker } from '@/lib/schema';

export default function CollectionPage() {
  const { user } = useAuth();
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSneakers() {
      if (user) {
        const data = await getSneakers(user.id, false);
        setSneakers(data as Sneaker[]);
      }
      setLoading(false);
    }

    loadSneakers();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Collection</h1>
        <Link href="/collection/add">
          <Button>Add Sneaker</Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search sneakers..."
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
            <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">All Sizes</option>
              <option value="7">US 7</option>
              <option value="8">US 8</option>
              <option value="9">US 9</option>
              <option value="10">US 10</option>
              <option value="11">US 11</option>
              <option value="12">US 12</option>
            </select>
            <Button variant="outline" size="sm">
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p>Loading your collection...</p>
          </div>
        </div>
      ) : sneakers.length === 0 ? (
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
              <path d="M18.5 2h-13A3.5 3.5 0 0 0 2 5.5v13A3.5 3.5 0 0 0 5.5 22h13a3.5 3.5 0 0 0 3.5-3.5v-13A3.5 3.5 0 0 0 18.5 2Z"></path>
              <path d="M8 10v4"></path>
              <path d="M12 8v8"></path>
              <path d="M16 12v2"></path>
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">No sneakers yet</h3>
          <p className="mb-4 text-muted-foreground">
            Add your first sneaker to start building your collection.
          </p>
          <Link href="/collection/add">
            <Button>Add Your First Sneaker</Button>
          </Link>
        </div>
      ) : (
        // Sneaker Grid
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sneakers.map((sneaker) => (
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 