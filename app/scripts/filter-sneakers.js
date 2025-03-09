/**
 * Script to filter out sneakers with problematic characters in their names
 * 
 * This script reads the dataset.json file and creates a filtered version
 * that excludes sneakers with apostrophes or other problematic characters.
 * 
 * Usage:
 * 1. Run: node scripts/filter-sneakers.js
 * 2. The script will create a filtered-dataset.json file
 */

const fs = require('fs');
const path = require('path');

// Paths to the files
const inputFilePath = path.join(__dirname, '../data/dataset.json');
const outputFilePath = path.join(__dirname, '../data/filtered-dataset.json');

// Function to filter out problematic sneakers
function filterSneakers() {
  try {
    // Read the input file
    const rawData = fs.readFileSync(inputFilePath, 'utf8');
    const sneakers = JSON.parse(rawData);
    
    console.log(`Total sneakers in dataset: ${sneakers.length}`);
    
    // Filter out sneakers with problematic characters in their names
    const filteredSneakers = sneakers.filter(sneaker => {
      const name = sneaker.name;
      
      // Check for problematic patterns
      const hasApostrophe = name.includes("'s");
      const hasSpecialQuotes = name.includes("'");
      const hasTickMark = name.includes("'");
      const hasProblematicNumbers = name.includes("'96") || name.includes("'07");
      
      // Keep sneakers that don't have problematic characters
      return !(hasApostrophe || hasSpecialQuotes || hasTickMark || hasProblematicNumbers);
    });
    
    console.log(`Filtered sneakers: ${filteredSneakers.length}`);
    console.log(`Removed ${sneakers.length - filteredSneakers.length} problematic sneakers`);
    
    // Write the filtered data to the output file
    fs.writeFileSync(outputFilePath, JSON.stringify(filteredSneakers, null, 2));
    
    console.log(`Successfully wrote filtered dataset to ${outputFilePath}`);
    
  } catch (error) {
    console.error('Error filtering sneakers:', error);
  }
}

// Run the filter
filterSneakers(); 