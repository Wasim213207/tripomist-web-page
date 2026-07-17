import fs from 'fs';

const filePath = 'src/pages/Home.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. We need to add state for best sellers and fetch them
const importsRegex = /import React.*?from 'react'/;
if (!content.includes('useEffect')) {
  content = content.replace("import React from 'react'", "import React, { useState, useEffect } from 'react'");
} else {
  // if it already has it, fine
}

if (!content.includes('import { supabase }')) {
  content = content.replace("import PackageCard from '../components/PackageCard'", "import PackageCard from '../components/PackageCard'\nimport { supabase } from '../supabaseClient'");
}

const componentDeclRegex = /export default function Home\(\) \{|function Home\(\) \{/;
const stateDecl = `function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestSellers() {
      const { data, error } = await supabase
        .from('Pakage')
        .select('*')
        .eq('best_seller', true)
        .ilike('status', '%active%');
        
      if (!error && data) {
        setBestSellers(data);
      }
      setLoading(false);
    }
    fetchBestSellers();
  }, []);
`;
content = content.replace(componentDeclRegex, stateDecl);

// 2. Now find the "Most Popular Packages" section and replace its inner scrollRef div
const popularRegex = /<div ref=\{scrollRef\} className="flex overflow-x-auto gap-4 md:gap-6 hide-scrollbar pb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth">[\s\S]*?<\/div>\s*<\/section>/;

const newPopular = `<div ref={scrollRef} className="flex overflow-x-auto gap-4 md:gap-6 hide-scrollbar pb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth">
            {loading ? (
              <p className="text-gray-500 font-bold ml-4">Loading Best Sellers...</p>
            ) : bestSellers.length > 0 ? (
              bestSellers.map((pkg) => (
                <PackageCard 
                  key={pkg.id}
                  className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
                  tripTitle={pkg.title} 
                  price={"₹" + Number(pkg.price).toLocaleString('en-IN')}
                  originalPrice={pkg.original_price ? "₹" + Number(pkg.original_price).toLocaleString('en-IN') : null}
                  discountText={pkg.discount_text}
                  bestSeller={pkg.best_seller}
                  duration={pkg.duration} 
                  description={pkg.short_description ? pkg.short_description.substring(0, 80) + '...' : pkg.title}
                  bg={pkg.image_url || pkg.banner_image}
                  link={\`/itinerary/\${pkg.slug || pkg.id}\`} 
                />
              ))
            ) : (
              <p className="text-gray-500 font-bold ml-4">No best sellers found.</p>
            )}
            </div>
          </section>`;

content = content.replace(popularRegex, newPopular);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Home best sellers updated");
