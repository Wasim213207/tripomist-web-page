import fs from 'fs';

const pages = [
  'src/pages/PackageDetail.jsx',
  'src/pages/ItinerarySpiti.jsx',
  'src/pages/ItineraryChopta.jsx',
  'src/pages/ItineraryJibhi.jsx',
  'src/pages/ItineraryKedarnath.jsx',
  'src/pages/ItineraryMadhyameshwar.jsx',
  'src/pages/ItineraryManaliKasol.jsx',
  'src/pages/ItineraryUdaipurKumbhalgarh.jsx'
];

for (const file of pages) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Add import if not present
    if (!content.includes("import BookingModal")) {
      content = content.replace("import Navbar", "import BookingModal from '../components/BookingModal'\nimport Navbar");
    }

    // Remove inline BookingModal definition
    const startStr = 'const BookingModal = ({';
    let endStr = 'export default function ';
    if (file.includes('PackageDetail')) {
      // PackageDetail doesn't have the inline definition anyway, but we just check
    }

    const startIndex = content.indexOf(startStr);
    const endIndex = content.indexOf(endStr, startIndex);

    if (startIndex !== -1 && endIndex !== -1) {
      content = content.substring(0, startIndex) + content.substring(endIndex);
    } else if (startIndex !== -1) {
      // Itinerary might use function name instead of export default function sometimes
      const altEnd = 'function Itinerary';
      const altEndIndex = content.indexOf(altEnd, startIndex);
      if (altEndIndex !== -1) {
        content = content.substring(0, startIndex) + content.substring(altEndIndex);
      }
    }

    fs.writeFileSync(file, content, 'utf8');
  }
}

console.log("Imports and cleanup done");
