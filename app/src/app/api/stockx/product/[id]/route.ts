import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Function to decode Base64 encoded credentials
const decodeCredential = (encoded: string): string => {
  return Buffer.from(encoded, 'base64').toString();
};

// Mock data for demonstration
const mockProducts = {
  'jordan-1-chicago': {
    id: 'jordan-1-chicago',
    name: 'Air Jordan 1 Retro High OG Chicago',
    style: '555088-101',
    brand: 'Jordan',
    colorway: 'White/Black-Varsity Red',
    retailPrice: 170,
    releaseDate: '2022-10-29',
    image: 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-2022-Product.jpg',
    description: 'The Air Jordan 1 Retro High OG "Chicago" 2022 reimagines the iconic colorway that started it all. This release features a vintage aesthetic with a slightly yellowed midsole and aged leather upper, giving it a nostalgic feel reminiscent of original pairs from 1985.',
    gender: 'men',
    category: 'basketball',
    year: 2022,
    silhouette: 'Air Jordan 1',
    lowestAsk: 450,
    highestBid: 420,
    lastSale: 435,
    salesLast72Hours: 28,
    pricePremium: 1.65, // 165% over retail
    volatility: 0.12,
    deadstockSold: 5842,
    averageDeadstockPrice: 442,
    priceHistory: [
      { date: '2022-11-01', price: 410 },
      { date: '2022-12-01', price: 425 },
      { date: '2023-01-01', price: 440 },
      { date: '2023-02-01', price: 435 },
      { date: '2023-03-01', price: 450 }
    ]
  },
  'jordan-4-bred': {
    id: 'jordan-4-bred',
    name: 'Air Jordan 4 Retro Bred',
    style: '308497-060',
    brand: 'Jordan',
    colorway: 'Black/Cement Grey-Fire Red',
    retailPrice: 200,
    releaseDate: '2019-05-04',
    image: 'https://images.stockx.com/images/Air-Jordan-4-Retro-Black-Cement-2019-Product.jpg',
    description: 'The Air Jordan 4 Retro "Bred" 2019 is a retro re-release of the classic silhouette in its OG "Black Cement" colorway. The 2019 version features Nike Air branding on the heel, staying true to the original design from 1989.',
    gender: 'men',
    category: 'basketball',
    year: 2019,
    silhouette: 'Air Jordan 4',
    lowestAsk: 380,
    highestBid: 350,
    lastSale: 365,
    salesLast72Hours: 15,
    pricePremium: 0.9, // 90% over retail
    volatility: 0.08,
    deadstockSold: 12453,
    averageDeadstockPrice: 372,
    priceHistory: [
      { date: '2022-11-01', price: 350 },
      { date: '2022-12-01', price: 360 },
      { date: '2023-01-01', price: 370 },
      { date: '2023-02-01', price: 365 },
      { date: '2023-03-01', price: 380 }
    ]
  },
  'yeezy-350-zebra': {
    id: 'yeezy-350-zebra',
    name: 'adidas Yeezy Boost 350 V2 Zebra',
    style: 'CP9654',
    brand: 'adidas',
    colorway: 'White/Core Black/Red',
    retailPrice: 220,
    releaseDate: '2017-02-25',
    image: 'https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Zebra-Product.jpg',
    description: 'The adidas Yeezy Boost 350 V2 "Zebra" features a white and black Primeknit upper with a red "SPLY-350" text on the side. The sneaker also includes a white midsole housing the full-length Boost cushioning technology.',
    gender: 'men',
    category: 'lifestyle',
    year: 2017,
    silhouette: 'Yeezy Boost 350 V2',
    lowestAsk: 320,
    highestBid: 290,
    lastSale: 305,
    salesLast72Hours: 22,
    pricePremium: 0.45, // 45% over retail
    volatility: 0.15,
    deadstockSold: 24567,
    averageDeadstockPrice: 312,
    priceHistory: [
      { date: '2022-11-01', price: 330 },
      { date: '2022-12-01', price: 320 },
      { date: '2023-01-01', price: 310 },
      { date: '2023-02-01', price: 300 },
      { date: '2023-03-01', price: 320 }
    ]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    // For now, we'll use a mock implementation
    // In a production environment, you would use the actual StockX API
    const product = mockProducts[id as keyof typeof mockProducts];
    
    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('StockX product details error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch product details' },
      { status: 500 }
    );
  }
} 