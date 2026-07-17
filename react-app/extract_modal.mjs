import fs from 'fs';

const sourceFile = 'src/pages/ItinerarySpiti.jsx';
const content = fs.readFileSync(sourceFile, 'utf8');

const startStr = 'const BookingModal = ({';
const endStr = 'export default function ';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  let modalCode = content.substring(startIndex, endIndex);
  
  // Add imports
  const componentCode = `import React, { useState } from 'react';\n\n` + modalCode + `\nexport default BookingModal;\n`;
  
  fs.writeFileSync('src/components/BookingModal.jsx', componentCode, 'utf8');
  console.log("BookingModal extracted");
} else {
  console.log("Could not find boundaries");
}
