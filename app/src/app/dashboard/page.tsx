import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Dashboard | Sneaker Collect Plus',
  description: 'View your sneaker collection stats and recent activity',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Collection Stats Card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Collection Stats</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Sneakers</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold">$0</p>
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
            <p className="text-2xl font-bold">0</p>
          </div>
          <Link href="/wishlist" className="mt-4 block">
            <Button variant="outline" className="w-full">View Wishlist</Button>
          </Link>
        </div>
        
        {/* Recent Activity Card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
          <p className="text-muted-foreground">No recent activity</p>
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
    </div>
  );
} 