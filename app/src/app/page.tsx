import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="mb-4 text-4xl font-bold">Sneaker Collect Plus</h1>
      <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
        Track and organize your sneaker collection with ease. Add, view, and manage your sneakers all in one place.
      </p>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link href="/dashboard">
          <Button size="lg" className="min-w-40">Go to Dashboard</Button>
        </Link>
        <Link href="/collection">
          <Button size="lg" variant="outline" className="min-w-40">View Collection</Button>
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Track Your Collection</h2>
          <p className="text-muted-foreground">
            Keep a detailed record of all your sneakers with images, purchase info, and condition.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Manage Your Wishlist</h2>
          <p className="text-muted-foreground">
            Keep track of sneakers you want to add to your collection in the future.
          </p>
        </div>
        
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">View Analytics</h2>
          <p className="text-muted-foreground">
            Get insights about your collection value, brand distribution, and more.
          </p>
        </div>
      </div>
    </div>
  );
} 