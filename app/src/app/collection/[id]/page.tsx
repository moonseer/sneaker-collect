'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { getSneakerById, deleteSneaker } from '@/lib/supabase';
import { Sneaker } from '@/lib/schema';

export default function SneakerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [sneaker, setSneaker] = useState<Sneaker | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadSneaker() {
      if (user) {
        const data = await getSneakerById(params.id);
        setSneaker(data as Sneaker);
      }
      setLoading(false);
    }

    loadSneaker();
  }, [user, params.id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this sneaker from your collection?')) {
      return;
    }

    setDeleting(true);
    try {
      await deleteSneaker(params.id);
      router.push('/collection');
    } catch (error) {
      console.error('Error deleting sneaker:', error);
      alert('Failed to delete sneaker');
      setDeleting(false);
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
          <p className="text-muted-foreground">The sneaker you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sneaker Details</h1>
        <div className="flex space-x-2">
          <Link href="/collection">
            <Button variant="outline">Back to Collection</Button>
          </Link>
          <Link href={`/collection/${params.id}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Sneaker Image */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="aspect-square overflow-hidden rounded-md bg-muted">
            {sneaker.images && sneaker.images.length > 0 ? (
              <img
                src={sneaker.images[0]}
                alt={`${sneaker.brand} ${sneaker.model} ${sneaker.name}`}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Sneaker Details */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{sneaker.brand} {sneaker.model}</h2>
            <p className="text-lg text-muted-foreground">{sneaker.name}</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Colorway</p>
                <p>{sneaker.colorway}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Size</p>
                <p>US {sneaker.size}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Condition</p>
                <p>{sneaker.condition?.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SKU</p>
                <p>{sneaker.sku || 'N/A'}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="mb-2 font-semibold">Purchase Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Date</p>
                  <p>{sneaker.purchase_date ? new Date(sneaker.purchase_date).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Price</p>
                  <p>{sneaker.purchase_price ? `$${sneaker.purchase_price.toFixed(2)}` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Location</p>
                  <p>{sneaker.purchase_location || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Market Value</p>
                  <p>{sneaker.market_value ? `$${sneaker.market_value.toFixed(2)}` : 'N/A'}</p>
                </div>
              </div>
            </div>

            {sneaker.notes && (
              <div className="border-t pt-4">
                <h3 className="mb-2 font-semibold">Notes</h3>
                <p className="text-muted-foreground">{sneaker.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 