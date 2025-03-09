'use client';

export default function SimpleTestPage() {
  console.log("Rendering SimpleTestPage");
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Static Test Page</h1>
      <p>This is a minimal test page at a static route.</p>
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