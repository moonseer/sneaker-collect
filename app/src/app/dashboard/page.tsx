'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { getCollectionStats, getSneakers } from '@/lib/supabase';
import { CollectionStats, Sneaker } from '@/lib/schema';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Partial<CollectionStats>>({
    total_sneakers: 0,
    total_value: 0,
    average_value: 0,
  });
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (user) {
        // Get collection stats
        const collectionStats = await getCollectionStats(user.id);
        setStats(collectionStats);

        // Get wishlist count
        const wishlist = await getSneakers(user.id, true);
        setWishlistCount(wishlist.length);
      }
      setLoading(false);
    }

    loadData();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Collection Stats Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Collection Stats</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Sneakers</p>
              <p className="text-2xl font-bold">{stats.total_sneakers || 0}</p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">${(stats.total_value || 0).toFixed(2)}</p>
            </div>
            <Link href="/collection" className="mt-4 block">
              <Button variant="outline" className="w-full">View Collection</Button>
            </Link>
          </div>
          
          {/* Wishlist Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Wishlist</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Sneakers in Wishlist</p>
              <p className="text-2xl font-bold">{wishlistCount}</p>
            </div>
            <Link href="/wishlist" className="mt-4 block">
              <Button variant="outline" className="w-full">View Wishlist</Button>
            </Link>
          </div>
          
          {/* Recent Activity Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
            {(stats.total_sneakers || 0) > 0 ? (
              <div className="space-y-3">
                <div className="rounded-md bg-muted/50 p-2 text-sm">
                  <p className="font-medium">Added new sneaker</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.most_valuable_sneaker?.brand} {stats.most_valuable_sneaker?.model}
                  </p>
                </div>
                <div className="rounded-md bg-muted/50 p-2 text-sm">
                  <p className="font-medium">Updated collection value</p>
                  <p className="text-xs text-muted-foreground">
                    Total value: ${(stats.total_value || 0).toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No recent activity</p>
            )}
            <Link href="/collection/add" className="mt-4 block">
              <Button variant="outline" className="w-full">Add Sneaker</Button>
            </Link>
          </div>
          
          {/* Quick Actions Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/collection/add" className="block">
                <Button variant="default" className="w-full">Add Sneaker</Button>
              </Link>
              <Link href="/wishlist/add" className="block">
                <Button variant="outline" className="w-full">Add to Wishlist</Button>
              </Link>
              <Link href="/analytics" className="block">
                <Button variant="outline" className="w-full">View Analytics</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 