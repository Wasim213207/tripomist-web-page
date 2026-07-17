import fs from 'fs';

const pages = [
  'src/pages/Rajasthan.jsx',
  'src/pages/GroupTrips.jsx',
  'src/pages/WeekendTrips.jsx',
  'src/pages/Treks.jsx',
  'src/pages/FamilyTours.jsx',
  'src/pages/HoneymoonTrips.jsx'
];

for (const file of pages) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Strict status checking (pkg.status && pkg.status.trim() === 'active')
  // We'll replace `.includes('active')` with `.trim() === 'active'`
  content = content.replace(/\.includes\('active'\)/g, ".trim() === 'active'");

  // 2. Strict category filtering for Group Trips
  if (file.includes('GroupTrips')) {
    // Before: let categoryPackages = activePackages.filter(pkg => pkg.category === 'Group Trip' || pkg.title.toLowerCase().includes('group'));
    const groupFilter = /let categoryPackages = activePackages\.filter\(pkg => pkg\.category === 'Group Trip' \|\| pkg\.title\.toLowerCase\(\)\.includes\('group'\)\);/g;
    content = content.replace(groupFilter, "let categoryPackages = activePackages.filter(pkg => pkg.category === 'Group Trip');");
    
    // Also remove the fallback: if (categoryPackages.length === 0) categoryPackages = activePackages;
    const fallback = /if \(categoryPackages\.length === 0\) categoryPackages = activePackages;/g;
    content = content.replace(fallback, "");
  }

  // Same strict logic for Rajasthan
  if (file.includes('Rajasthan')) {
    // Rajasthan already uses: pkg.state === 'Rajasthan' && pkg.status && pkg.status.includes('active')
    // Let's replace the mappedTrips to include new fields
  }

  // 3. Update mappedTrips to pass originalPrice, discountText, bestSeller, slug
  const mapRegex = /const mappedTrips = (.*?).map\(pkg => \(\{([\s\S]*?)\}\)\);/s;
  const match = content.match(mapRegex);
  if (match) {
    const listName = match[1];
    const newMapping = `const mappedTrips = ${listName}.map(pkg => ({
          id: pkg.id,
          slug: pkg.slug,
          name: pkg.title,
          location: pkg.destination || pkg.state,
          style: pkg.category === 'International' ? 'International Trips' : 'Domestic Trips',
          durationText: pkg.duration,
          price: pkg.price,
          originalPrice: pkg.original_price,
          discountText: pkg.discount_text,
          bestSeller: pkg.best_seller,
          isFav: false,
          tagline: pkg.short_description ? pkg.short_description.substring(0, 80) + '...' : pkg.title,
          img: pkg.image_url || pkg.banner_image
        }));`;
    content = content.replace(mapRegex, newMapping);
  }

  // 4. Update the PackageCard invocation
  const cardRegex = /<PackageCard \s*key=\{dest\.id\}\s*tripTitle=\{dest\.name\} \s*price=\{"₹" \+ dest\.price\.toLocaleString\('en-IN'\)\}\s*duration=\{dest\.durationText\} \s*description=\{dest\.tagline\}\s*bg=\{dest\.img\}\s*link=\{\`\/itinerary\/\$\{dest\.id\}\`\} \s*blueText=\{true\}\s*\/>/s;
  
  const newCard = `<PackageCard 
                key={dest.id}
                tripTitle={dest.name} 
                price={"₹" + Number(dest.price).toLocaleString('en-IN')}
                originalPrice={dest.originalPrice ? "₹" + Number(dest.originalPrice).toLocaleString('en-IN') : null}
                discountText={dest.discountText}
                bestSeller={dest.bestSeller}
                duration={dest.durationText} 
                description={dest.tagline}
                bg={dest.img}
                link={\`/itinerary/\${dest.slug || dest.id}\`} 
                blueText={true}
              />`;

  // Note: Since I used flex formatting, I might need a more robust regex or just string replacement
  const replaceStr = content.split('<PackageCard ')[1]?.split('/>')[0];
  if (replaceStr) {
    content = content.replace(`<PackageCard ${replaceStr}/>`, newCard);
  }

  fs.writeFileSync(file, content, 'utf8');
}

console.log("Category pages updated");
