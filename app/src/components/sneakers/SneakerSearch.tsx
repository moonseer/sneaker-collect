'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { lookupSneakerWithLLM, mapLLMSneakerData, SneakerLookupResult } from '@/lib/llm-api';
import { searchStockX, mapStockXSneakerData, StockXSneakerResult } from '@/lib/stockx-api';
import { Sneaker } from '@/lib/schema';

interface SneakerSearchProps {
  onSelect: (sneaker: Partial<Sneaker>) => void;
}

export default function SneakerSearch({ onSelect }: SneakerSearchProps) {
  const [activeTab, setActiveTab] = useState<string>('stockx');
  const [query, setQuery] = useState('');
  const [llmResults, setLlmResults] = useState<SneakerLookupResult[]>([]);
  const [stockXResults, setStockXResults] = useState<StockXSneakerResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleLLMSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a SKU number (e.g., HF3975-001)');
      return;
    }

    setLoading(true);
    setError('');
    setDebugInfo(null);
    setLlmResults([]);
    
    try {
      console.log(`Looking up sneaker with SKU: ${query} using LLM`);
      
      const result = await lookupSneakerWithLLM(query);
      
      if (result) {
        console.log('LLM Lookup successful:', result);
        setLlmResults([result]);
      } else {
        setError('No sneaker found with that SKU. Please try a different SKU number.');
        setDebugInfo('Try one of these SKUs: HF3975-001, DZ5485-400, DV1748-601, FD2596-100');
      }
    } catch (err) {
      console.error('Error in handleLLMSearch:', err);
      setError('An error occurred while searching. Please try again.');
      setDebugInfo(`Error details: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStockXSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a SKU number for best results');
      return;
    }

    setLoading(true);
    setError('');
    setDebugInfo(null);
    setStockXResults([]);
    
    try {
      console.log(`Searching StockX for: ${query}`);
      
      const results = await searchStockX(query);
      
      if (results && results.length > 0) {
        console.log('StockX search successful:', results);
        setStockXResults(results);
      } else {
        setError('No sneakers found. Please try a different SKU number.');
        setDebugInfo('For best results, try searching by exact SKU number (e.g., DN3673-303). The API may be temporarily unavailable.');
      }
    } catch (err) {
      console.error('Error in handleStockXSearch:', err);
      setError('An error occurred while searching StockX. The API may be temporarily unavailable.');
      setDebugInfo(`Try using the AI Lookup tab instead. Error details: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (activeTab === 'llm') {
      await handleLLMSearch();
    } else {
      await handleStockXSearch();
    }
  };

  const handleLLMSelect = (result: SneakerLookupResult) => {
    try {
      console.log('Selected LLM result:', result);
      const mappedData = mapLLMSneakerData(result);
      console.log('Mapped LLM data:', mappedData);
      onSelect(mappedData);
      // Clear results after selection
      setLlmResults([]);
      setQuery('');
      setDebugInfo(null);
    } catch (err) {
      console.error('Error in handleLLMSelect:', err);
      setError('An error occurred while selecting this sneaker. Please try again.');
      setDebugInfo(`Error details: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleStockXSelect = (result: StockXSneakerResult) => {
    try {
      console.log('Selected StockX result:', result);
      const mappedData = mapStockXSneakerData(result);
      console.log('Mapped StockX data:', mappedData);
      onSelect(mappedData);
      // Clear results after selection
      setStockXResults([]);
      setQuery('');
      setDebugInfo(null);
    } catch (err) {
      console.error('Error in handleStockXSelect:', err);
      setError('An error occurred while selecting this sneaker. Please try again.');
      setDebugInfo(`Error details: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  // Format currency with dollar sign and commas
  const formatCurrency = (value: number | undefined): string => {
    if (value === undefined || value === 0) return 'N/A';
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="stockx" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stockx">StockX Search</TabsTrigger>
          <TabsTrigger value="llm">AI Lookup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stockx" className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter SKU number for best results (e.g., DN3673-303)"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              className="flex-1"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !loading && handleStockXSearch()}
              disabled={loading}
            />
            <Button 
              onClick={handleStockXSearch} 
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
          
          {error && (
            <div className="text-sm text-red-500 p-2 border border-red-200 rounded-md bg-red-50">
              <p>{error}</p>
              {error.includes('StockX') && (
                <p className="mt-1 text-xs">
                  Note: The StockX API may be temporarily unavailable. Please try the AI Lookup tab instead.
                </p>
              )}
            </div>
          )}
          
          {debugInfo && (
            <div className="text-xs text-gray-500 mt-1 p-2 border border-gray-200 rounded-md bg-gray-50">{debugInfo}</div>
          )}
          
          {loading && (
            <div className="rounded-md border bg-muted p-4">
              <div className="flex items-center space-x-4">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <div>
                  <p className="text-sm font-medium">Searching StockX...</p>
                </div>
              </div>
            </div>
          )}
          
          {stockXResults.length > 0 && (
            <div className="rounded-md border">
              <div className="p-2 bg-muted text-sm font-medium">
                StockX Results ({stockXResults.length})
              </div>
              <div className="divide-y">
                {stockXResults.map((result) => (
                  <div 
                    key={result.id || result.sku} 
                    className="p-3 flex items-center hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleStockXSelect(result)}
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
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-muted-foreground">{result.brand}</div>
                      <div className="text-xs text-muted-foreground">SKU: {result.sku || result.styleId}</div>
                      <div className="text-xs text-muted-foreground">Colorway: {result.colorway}</div>
                      <div className="flex space-x-4 mt-1">
                        <div className="text-xs">
                          <span className="font-medium">Retail:</span> {formatCurrency(result.retailPrice)}
                        </div>
                        <div className="text-xs font-medium">
                          <span className="font-medium">Market:</span> {formatCurrency(result.market?.lastSale || result.lastSale)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="llm" className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter SKU number (e.g., HF3975-001)"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              className="flex-1"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !loading && handleLLMSearch()}
              disabled={loading}
            />
            <Button 
              onClick={handleLLMSearch} 
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
                  <p className="text-sm font-medium">Looking up sneaker information with AI...</p>
                </div>
              </div>
            </div>
          )}
          
          {llmResults.length > 0 && (
            <div className="rounded-md border">
              <div className="p-2 bg-muted text-sm font-medium">
                AI Lookup Results
              </div>
              <div className="divide-y">
                {llmResults.map((result) => (
                  <div 
                    key={result.id} 
                    className="p-3 flex items-center hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleLLMSelect(result)}
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
                        <div className="text-xs font-medium mt-1">Retail: {formatCurrency(result.retailPrice)}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 