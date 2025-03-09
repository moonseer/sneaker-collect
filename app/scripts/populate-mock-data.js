/**
 * Script to populate mock data in the Supabase client
 * 
 * This script reads a JSON file containing sneaker data and generates
 * the mockSneakers array for the Supabase client.
 * 
 * Usage:
 * 1. Save your sneaker data as JSON in the data directory
 * 2. Run: node scripts/populate-mock-data.js
 * 3. Copy the output and paste it into the supabase.ts file
 */

const fs = require('fs');
const path = require('path');

// Path to the JSON data file
const dataFilePath = path.join(__dirname, '../data/sneakers.json');

// Function to generate a random date within the last 2 years
function randomDate(start = new Date(2022, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Function to generate a random price within a range
function randomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to generate a random condition
function randomCondition() {
  const conditions = ['new', 'like_new', 'good', 'worn'];
  return conditions[Math.floor(Math.random() * conditions.length)];
}

// Function to generate a random purchase location
function randomLocation() {
  const locations = [
    'Nike Store', 'Foot Locker', 'SNKRS App', 'StockX', 'GOAT', 
    'Flight Club', 'Stadium Goods', 'Adidas Store', 'New Balance Store',
    'eBay', 'Grailed'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

// Function to generate a random note
function randomNote(brand, model, name) {
  const notes = [
    `Great ${brand} sneaker`,
    `Classic ${model}`,
    `Limited edition ${name}`,
    'Grail sneaker',
    'Comfortable everyday wear',
    'Clean colorway',
    'Rare find',
    'Birthday gift',
    'Special release',
    'Collaboration piece'
  ];
  return notes[Math.floor(Math.random() * notes.length)];
}

// Main function to process the JSON data
function processData() {
  try {
    // Read the JSON file
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    const sneakersData = JSON.parse(rawData);
    
    // Transform the data into the format needed for mockSneakers
    const mockSneakers = sneakersData.map((sneaker, index) => {
      const id = (index + 1).toString();
      const purchaseDate = randomDate();
      const retailPrice = sneaker.retail_price || randomPrice(100, 250);
      const marketValue = sneaker.market_value || randomPrice(retailPrice, retailPrice * 2);
      const purchasePrice = randomPrice(retailPrice * 0.8, retailPrice * 1.2);
      
      return {
        id,
        user_id: 'user123',
        brand: sneaker.brand,
        model: sneaker.model || sneaker.name.split(' ').slice(0, 2).join(' '),
        name: sneaker.name,
        colorway: sneaker.colorway || 'Unknown',
        size: 12,
        retail_price: retailPrice,
        market_value: marketValue,
        condition: randomCondition(),
        purchase_date: `new Date('${purchaseDate.toISOString().split('T')[0]}')`,
        purchase_price: purchasePrice,
        purchase_location: randomLocation(),
        notes: randomNote(sneaker.brand, sneaker.model, sneaker.name),
        sku: sneaker.sku || 'Unknown',
        images: [sneaker.image],
        is_wishlist: false,
        created_at: `new Date('${purchaseDate.toISOString().split('T')[0]}')`,
        updated_at: `new Date('${purchaseDate.toISOString().split('T')[0]}')`,
      };
    });
    
    // Generate some wishlist items (last 5 items)
    const wishlistItems = sneakersData.slice(-5).map((sneaker, index) => {
      const id = (mockSneakers.length + index + 1).toString();
      const createdDate = randomDate(new Date(2023, 0, 1), new Date());
      
      return {
        id,
        user_id: 'user123',
        brand: sneaker.brand,
        model: sneaker.model || sneaker.name.split(' ').slice(0, 2).join(' '),
        name: sneaker.name,
        colorway: sneaker.colorway || 'Unknown',
        size: 12,
        retail_price: sneaker.retail_price || randomPrice(100, 250),
        market_value: sneaker.market_value || randomPrice(200, 800),
        condition: 'new',
        sku: sneaker.sku || 'Unknown',
        images: [sneaker.image],
        is_wishlist: true,
        created_at: `new Date('${createdDate.toISOString().split('T')[0]}')`,
        updated_at: `new Date('${createdDate.toISOString().split('T')[0]}')`,
      };
    });
    
    // Generate the code for mockSneakers array
    let mockSneakersCode = 'const mockSneakers = [\n';
    mockSneakers.forEach((sneaker, index) => {
      mockSneakersCode += '  {\n';
      Object.entries(sneaker).forEach(([key, value]) => {
        if (key === 'purchase_date' || key === 'created_at' || key === 'updated_at') {
          mockSneakersCode += `    ${key}: ${value},\n`;
        } else if (key === 'images') {
          mockSneakersCode += `    ${key}: ['${value[0]}'],\n`;
        } else if (typeof value === 'string') {
          mockSneakersCode += `    ${key}: '${value}',\n`;
        } else {
          mockSneakersCode += `    ${key}: ${value},\n`;
        }
      });
      mockSneakersCode += '  }';
      if (index < mockSneakers.length - 1) {
        mockSneakersCode += ',\n';
      } else {
        mockSneakersCode += '\n';
      }
    });
    mockSneakersCode += '];\n\n';
    
    // Generate the code for mockWishlist array
    let mockWishlistCode = 'const mockWishlist = [\n';
    wishlistItems.forEach((item, index) => {
      mockWishlistCode += '  {\n';
      Object.entries(item).forEach(([key, value]) => {
        if (key === 'created_at' || key === 'updated_at') {
          mockWishlistCode += `    ${key}: ${value},\n`;
        } else if (key === 'images') {
          mockWishlistCode += `    ${key}: ['${value[0]}'],\n`;
        } else if (typeof value === 'string') {
          mockWishlistCode += `    ${key}: '${value}',\n`;
        } else {
          mockWishlistCode += `    ${key}: ${value},\n`;
        }
      });
      mockWishlistCode += '  }';
      if (index < wishlistItems.length - 1) {
        mockWishlistCode += ',\n';
      } else {
        mockWishlistCode += '\n';
      }
    });
    mockWishlistCode += '];\n';
    
    // Output the generated code
    console.log('// Mock data for development - generated from JSON data');
    console.log(mockSneakersCode);
    console.log(mockWishlistCode);
    
    // Save the output to a file for easy copying
    const outputPath = path.join(__dirname, '../data/generated-mock-data.js');
    fs.writeFileSync(outputPath, '// Mock data for development - generated from JSON data\n' + mockSneakersCode + mockWishlistCode);
    
    console.log(`\nGenerated mock data has been saved to ${outputPath}`);
    console.log('Copy and paste this into your supabase.ts file to replace the existing mock data.');
    
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

// Run the script
processData(); 