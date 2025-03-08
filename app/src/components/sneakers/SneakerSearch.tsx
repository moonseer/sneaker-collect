'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { lookupSneakerWithLLM, mapLLMSneakerData, SneakerLookupResult } from '@/lib/llm-api';
import { Sneaker } from '@/lib/schema';

interface SneakerSearchProps {
  onSelect: (sneaker: Partial<Sneaker>) => void;
}

export default function SneakerSearch({ onSelect }: SneakerSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SneakerLookupResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a SKU number (e.g., HF3975-001)');
      return;
    }

    setLoading(true);
    setError('');
    setDebugInfo(null);
    setResults([]);
    
    try {
      console.log(`Looking up sneaker with SKU: ${query}`);
      
      const result = await lookupSneakerWithLLM(query);
      
      if (result) {
        console.log('Lookup successful:', result);
        setResults([result]);
      } else {
        setError('No sneaker found with that SKU. Please try a different SKU number.');
        setDebugInfo('Try one of these SKUs: HF3975-001, DZ5485-400, DV1748-601, FD2596-100');
      }
    } catch (err) {
      console.error('Error in handleSearch:', err);
      setError('An error occurred while searching. Please try again.');
      setDebugInfo(`Error details: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (result: SneakerLookupResult) => {
    try {
      console.log('Selected result:', result);
      const mappedData = mapLLMSneakerData(result);
      console.log('Mapped data:', mappedData);
      onSelect(mappedData);
      // Clear results after selection
      setResults([]);
      setQuery('');
      setDebugInfo(null);
    } catch (err) {
      console.error('Error in handleSelect:', err);
      setError('An error occurred while selecting this sneaker. Please try again.');
      setDebugInfo(`Error details: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter SKU number (e.g., HF3975-001)"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="flex-1"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !loading && handleSearch()}
          disabled={loading}
        />
        <Button 
          onClick={handleSearch} 
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </div>
      
      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      
      {debugInfo && (
        <div className="text-xs text-gray-500 mt-1">{debugInfo}</div>
      )}
      
      {loading && (
        <div className="rounded-md border bg-muted p-4">
          <div className="flex items-center space-x-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <div>
              <p className="text-sm font-medium">Looking up sneaker information...</p>
            </div>
          </div>
        </div>
      )}
      
      {results.length > 0 && (
        <div className="rounded-md border">
          <div className="p-2 bg-muted text-sm font-medium">
            Search Results
          </div>
          <div className="divide-y">
            {results.map((result) => (
              <div 
                key={result.id} 
                className="p-3 flex items-center hover:bg-muted/50 cursor-pointer"
                onClick={() => handleSelect(result)}
              >
                <div className="h-16 w-16 mr-3 bg-muted flex-shrink-0 overflow-hidden rounded-md">
                  {result.image ? (
                    <img 
                      src={result.image} 
                      alt={result.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{result.model}</div>
                  <div className="text-sm text-muted-foreground">{result.brand}</div>
                  <div className="text-sm">{result.name}</div>
                  <div className="text-xs text-muted-foreground">SKU: {result.sku}</div>
                  <div className="text-xs text-muted-foreground">Colorway: {result.colorway}</div>
                  {result.retailPrice && (
                    <div className="text-xs font-medium mt-1">Retail: ${result.retailPrice}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 