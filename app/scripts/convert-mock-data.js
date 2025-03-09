/**
 * Script to convert the JavaScript mock data to TypeScript
 * 
 * This script reads the generated mock data file and converts it to TypeScript
 * with proper type annotations.
 * 
 * Usage:
 * 1. Run: node scripts/convert-mock-data.js
 * 2. The script will update the src/lib/mock-data.ts file
 */

const fs = require('fs');
const path = require('path');

// Paths to the files
const inputFilePath = path.join(__dirname, '../data/full-mock-data.js');
const outputFilePath = path.join(__dirname, '../src/lib/mock-data.ts');

// Function to convert JavaScript to TypeScript
function convertToTypeScript() {
  try {
    // Read the input file
    const jsData = fs.readFileSync(inputFilePath, 'utf8');
    
    // Process the data line by line to handle all apostrophes
    const lines = jsData.split('\n');
    const processedLines = lines.map(line => {
      // Check if the line contains a product name
      if (line.trim().startsWith("name: '")) {
        // If the line contains an apostrophe or parentheses, use double quotes
        if (line.includes("'s") || line.includes("(") || line.includes(")")) {
          // Extract the name between single quotes
          const match = line.match(/name: '([^']+)'/);
          if (match) {
            const name = match[1];
            // Replace single quotes with double quotes and escape any internal apostrophes
            return line.replace(`name: '${name}'`, `name: "${name.replace(/'/g, "\\'")}"`);
          }
        }
      }
      return line;
    });
    
    // Join the lines back together
    const processedData = processedLines.join('\n');
    
    // Extract the mockSneakers and mockWishlist arrays
    const mockSneakersMatch = processedData.match(/const mockSneakers = \[([\s\S]*?)\];/);
    const mockWishlistMatch = processedData.match(/const mockWishlist = \[([\s\S]*?)\];/);
    
    if (!mockSneakersMatch || !mockWishlistMatch) {
      console.error('Could not extract mockSneakers or mockWishlist from the input file');
      return;
    }
    
    const mockSneakersContent = mockSneakersMatch[1];
    const mockWishlistContent = mockWishlistMatch[1];
    
    // Create the TypeScript content
    const tsContent = `// Mock data for development - generated from JSON data
export interface Sneaker {
  id: string;
  user_id: string;
  brand: string;
  model: string;
  name: string;
  colorway: string;
  size: number;
  retail_price: number;
  market_value: number;
  condition: 'new' | 'like_new' | 'good' | 'worn';
  purchase_date?: Date;
  purchase_price?: number;
  purchase_location?: string;
  notes?: string;
  sku: string;
  images: string[];
  is_wishlist: boolean;
  created_at: Date;
  updated_at: Date;
}

// Import the data from the generated file
// This file was created from the dataset.json file using the populate-mock-data.js script
export const mockSneakers: Sneaker[] = [${mockSneakersContent}];

export const mockWishlist: Sneaker[] = [${mockWishlistContent}];
`;
    
    // Write the output file
    fs.writeFileSync(outputFilePath, tsContent);
    
    console.log(`Successfully converted mock data to TypeScript at ${outputFilePath}`);
    
  } catch (error) {
    console.error('Error converting mock data to TypeScript:', error);
  }
}

// Run the conversion
convertToTypeScript(); 