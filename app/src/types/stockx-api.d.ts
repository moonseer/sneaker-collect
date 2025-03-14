declare module 'stockx-api' {
  export default class StockX {
    constructor();
    login(email: string, password: string): Promise<any>;
    searchProducts(query: string): Promise<any[]>;
    fetchProductDetails(productId: string): Promise<any>;
    fetchProductMarketData(productId: string): Promise<any>;
  }
} 