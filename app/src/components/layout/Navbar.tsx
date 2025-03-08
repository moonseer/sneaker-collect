'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Sneaker Collect Plus
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm hover:underline">
                Dashboard
              </Link>
              <Link href="/collection" className="text-sm hover:underline">
                Collection
              </Link>
              <Link href="/wishlist" className="text-sm hover:underline">
                Wishlist
              </Link>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/signin" className="text-sm hover:underline">
                Sign In
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 