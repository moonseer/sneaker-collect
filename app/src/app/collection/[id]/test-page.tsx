'use client';

// Minimal test page with no dependencies except for React
export default function TestPage({ params }: { params: { id: string } }) {
  console.log("Rendering TestPage with params:", params);
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Simple Test Page</h1>
      <p>This is a minimal test page with no dependencies.</p>
      <p style={{ marginTop: '10px' }}>
        <strong>Sneaker ID:</strong> {params.id}
      </p>
      <div style={{ marginTop: '20px' }}>
        <a 
          href="/collection" 
          style={{ 
            display: 'inline-block', 
            padding: '8px 16px', 
            backgroundColor: '#f0f0f0', 
            borderRadius: '4px', 
            textDecoration: 'none',
            color: '#333'
          }}
        >
          Back to Collection
        </a>
      </div>
    </div>
  );
} 