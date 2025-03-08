'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { getSneakers } from '@/lib/supabase';
import { Sneaker } from '@/lib/schema';
import SortOptions, { SortOption } from '@/components/sneakers/SortOptions';

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'brand', direction: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('');

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

  // Apply sorting and filtering
  const filteredAndSortedWishlist = useMemo(() => {
    // First, filter the wishlist
    let filtered = [...wishlist];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        sneaker => 
          sneaker.brand.toLowerCase().includes(query) ||
          sneaker.model.toLowerCase().includes(query) ||
          sneaker.name.toLowerCase().includes(query) ||
          sneaker.colorway.toLowerCase().includes(query) ||
          (sneaker.sku && sneaker.sku.toLowerCase().includes(query))
      );
    }
    
    // Apply brand filter
    if (brandFilter) {
      filtered = filtered.filter(
        sneaker => sneaker.brand.toLowerCase() === brandFilter.toLowerCase()
      );
    }
    
    // Then, sort the filtered wishlist
    return filtered.sort((a, b) => {
      const field = sortOption.field;
      const direction = sortOption.direction === 'asc' ? 1 : -1;
      
      // Handle special cases for dates and nullable fields
      if (field === 'purchase_date') {
        const dateA = a.purchase_date ? new Date(a.purchase_date).getTime() : 0;
        const dateB = b.purchase_date ? new Date(b.purchase_date).getTime() : 0;
        return (dateA - dateB) * direction;
      }
      
      if (field === 'market_value' || field === 'purchase_price' || field === 'retail_price') {
        const valueA = a[field] || 0;
        const valueB = b[field] || 0;
        return (valueA - valueB) * direction;
      }
      
      // Default string comparison for other fields
      const valueA = String(a[field] || '').toLowerCase();
      const valueB = String(b[field] || '').toLowerCase();
      return valueA.localeCompare(valueB) * direction;
    });
  }, [wishlist, sortOption, searchQuery, brandFilter]);

  // Get unique brands for the filter dropdown
  const uniqueBrands = useMemo(() => {
    const brands = new Set(wishlist.map(sneaker => sneaker.brand));
    return Array.from(brands).sort();
  }, [wishlist]);

  const handleSortChange = (newSortOption: SortOption) => {
    setSortOption(newSortOption);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleBrandFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBrandFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setBrandFilter('');
    setSortOption({ field: 'brand', direction: 'asc' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <Link href="/wishlist/add">
          <Button>Add to Wishlist</Button>
        </Link>
      </div>

      {/* Search, Filter, and Sort */}
      <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex flex-col space-y-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search wishlist..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* Filters and Sort */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="flex flex-1 space-x-2">
              <select 
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={brandFilter}
                onChange={handleBrandFilterChange}
              >
                <option value="">All Brands</option>
                {uniqueBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
                className="whitespace-nowrap"
              >
                Clear Filters
              </Button>
            </div>
            
            <div className="w-full md:w-64">
              <SortOptions 
                onSortChange={handleSortChange} 
                currentSort={sortOption}
              />
            </div>
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
      ) : filteredAndSortedWishlist.length === 0 ? (
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
          {wishlist.length === 0 ? (
            <>
              <h3 className="mb-2 text-xl font-semibold">Your wishlist is empty</h3>
              <p className="mb-4 text-muted-foreground">
                Add sneakers to your wishlist to keep track of what you want to buy next.
              </p>
              <Link href="/wishlist/add">
                <Button>Add Your First Wishlist Item</Button>
              </Link>
            </>
          ) : (
            <>
              <h3 className="mb-2 text-xl font-semibold">No matching sneakers</h3>
              <p className="mb-4 text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </>
          )}
        </div>
      ) : (
        // Wishlist Grid
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredAndSortedWishlist.map((sneaker) => (
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