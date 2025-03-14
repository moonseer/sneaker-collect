import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Function to decode Base64 encoded credentials
const decodeCredential = (encoded: string): string => {
  return Buffer.from(encoded, 'base64').toString();
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    
    if (!query) {
      return NextResponse.json(
        { message: 'Search query is required' },
        { status: 400 }
      );
    }

    // For now, we'll use a mock implementation
    // In a production environment, you would use the actual StockX API
    
    // This is a simplified mock of what the StockX API might return
    const mockResults = [
      {
        id: 'jordan-1-chicago',
        name: 'Air Jordan 1 Retro High OG Chicago',
        style: '555088-101',
        brand: 'Jordan',
        colorway: 'White/Black-Varsity Red',
        retailPrice: 170,
        releaseDate: '2022-10-29',
        image: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-2022-Product.jpg',
        lowestAsk: 450,
        highestBid: 420
      },
      {
        id: 'jordan-4-bred',
        name: 'Air Jordan 4 Retro Bred',
        style: '308497-060',
        brand: 'Jordan',
        colorway: 'Black/Cement Grey-Fire Red',
        retailPrice: 200,
        releaseDate: '2019-05-04',
        image: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cement-2019-Product.jpg',
        lowestAsk: 380,
        highestBid: 350
      },
      {
        id: 'yeezy-350-zebra',
        name: 'adidas Yeezy Boost 350 V2 Zebra',
        style: 'CP9654',
        brand: 'adidas',
        colorway: 'White/Core Black/Red',
        retailPrice: 220,
        releaseDate: '2017-02-25',
        image: 'https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Zebra-Product.jpg',
        lowestAsk: 320,
        highestBid: 290
      }
    ];
    
    // Filter results based on search query
    const filteredResults = mockResults.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.style.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase()) ||
      item.colorway.toLowerCase().includes(query.toLowerCase())
    );
    
    return NextResponse.json(filteredResults);
  } catch (error: any) {
    console.error('StockX search error:', error);
    return NextResponse.json(
      { message: error.message || 'Search failed' },
      { status: 500 }
    );
  }
} 