import { NextRequest, NextResponse } from 'next/server';

// Mock market data for demonstration
const mockMarketData = {
  'jordan-1-chicago': {
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
    
    const marketData = mockMarketData[id as keyof typeof mockMarketData];
    
    if (!marketData) {
      return NextResponse.json(
        { message: 'Market data not found for this product' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(marketData);
  } catch (error: any) {
    console.error('StockX market data error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch market data' },
      { status: 500 }
    );
  }
} 