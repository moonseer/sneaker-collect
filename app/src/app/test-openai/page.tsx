'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { lookupSneakerWithLLM, testOpenAIIntegration } from '@/lib/llm-api';

export default function TestOpenAIPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [sku, setSku] = useState('');
  const [sneakerResult, setSneakerResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    setLoading(true);
    setTestResult(null);
    setError(null);
    
    try {
      const result = await testOpenAIIntegration();
      setTestResult(result);
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async () => {
    if (!sku.trim()) {
      setError('Please enter a SKU');
      return;
    }
    
    setLoading(true);
    setSneakerResult(null);
    setError(null);
    
    try {
      const result = await lookupSneakerWithLLM(sku);
      setSneakerResult(result);
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">OpenAI Integration Test</h1>
      
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Basic Integration</h2>
        <Button onClick={handleTest} disabled={loading}>
          {loading ? 'Testing...' : 'Test OpenAI Connection'}
        </Button>
        
        {testResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-medium">Test Result:</h3>
            <pre className="mt-2 text-sm overflow-auto max-h-60">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test Sneaker Lookup</h2>
        
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Enter SKU (e.g., DV1748-601)"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            disabled={loading}
          />
          <Button onClick={handleLookup} disabled={loading}>
            {loading ? 'Looking up...' : 'Lookup Sneaker'}
          </Button>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        
        {sneakerResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-medium">Sneaker Information:</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Brand:</strong> {sneakerResult.brand}</p>
                <p><strong>Model:</strong> {sneakerResult.model}</p>
                <p><strong>Name:</strong> {sneakerResult.name}</p>
                <p><strong>Colorway:</strong> {sneakerResult.colorway}</p>
                <p><strong>SKU:</strong> {sneakerResult.sku}</p>
                <p><strong>Release Date:</strong> {sneakerResult.releaseDate || 'Unknown'}</p>
                <p><strong>Retail Price:</strong> ${sneakerResult.retailPrice || 'Unknown'}</p>
              </div>
              <div>
                {sneakerResult.image ? (
                  <img 
                    src={sneakerResult.image} 
                    alt={sneakerResult.name} 
                    className="w-full max-w-xs rounded-lg"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                    No Image Available
                  </div>
                )}
                <p className="mt-2 text-sm">{sneakerResult.description}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium">Raw Data:</h3>
              <pre className="mt-2 text-sm overflow-auto max-h-60">
                {JSON.stringify(sneakerResult, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 