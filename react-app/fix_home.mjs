import fs from 'fs';

const filePath = 'src/pages/Home.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Swap Honeymoon and Family destinations images & links
// The destinations block:
// Group Departures
content = content.replace(
  /<span className="font-button text-button text-on-surface group-hover:text-primary text-center transition-colors">Group Departures<\/span>/g, 
  '<span className="font-button text-button text-on-surface group-hover:text-primary text-center transition-colors">Group<br/>Departures</span>'
);

// Weekend Departures
content = content.replace(
  /<span className="font-button text-button text-on-surface group-hover:text-primary text-center transition-colors max-w-\[100px\] leading-tight">Weekend Departures<\/span>/g, 
  '<span className="font-button text-button text-on-surface group-hover:text-primary text-center max-w-[100px] leading-tight transition-colors">Weekend<br/>Departures</span>'
);

// Trekking Departure
content = content.replace(
  /<span className="font-button text-button text-on-surface group-hover:text-primary text-center transition-colors">Trekking Departure<\/span>/g, 
  '<span className="font-button text-button text-on-surface group-hover:text-primary text-center transition-colors">Trekking<br/>Departure</span>'
);

// Swap the links:
// Family Tours -> Honeymoon Trips
// Honeymoon Trips -> Family Destinations
// It's safer to just replace the two blocks directly.
const familyBlock = `<Link to="/family-tours" className="flex flex-col items-center gap-3 cursor-pointer group min-w-[100px] destination-circle no-underline">
                <div className="w-32 h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                  <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Family Destinations" src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop" />
                </div>
                <span className="font-button text-button text-on-surface group-hover:text-primary text-center max-w-[100px] leading-tight transition-colors">Family Destinations</span>
              </Link>`;

const honeymoonBlock = `<Link to="/honeymoon-trips" className="flex flex-col items-center gap-3 cursor-pointer group min-w-[100px] destination-circle no-underline">
                <div className="w-32 h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                  <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Honeymoon Trips" src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80" />
                </div>
                <span className="font-button text-button text-on-surface group-hover:text-primary text-center max-w-[100px] leading-tight transition-colors">Honeymoon Trips</span>
              </Link>`;

const familyBlockReplaced = `<Link to="/honeymoon-trips" className="flex flex-col items-center gap-3 cursor-pointer group min-w-[100px] destination-circle no-underline">
                <div className="w-32 h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                  <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Honeymoon Trips" src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80" />
                </div>
                <span className="font-button text-button text-on-surface group-hover:text-primary text-center max-w-[100px] leading-tight transition-colors">Honeymoon<br/>Trips</span>
              </Link>`;

const honeymoonBlockReplaced = `<Link to="/family-tours" className="flex flex-col items-center gap-3 cursor-pointer group min-w-[100px] destination-circle no-underline">
                <div className="w-32 h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                  <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Family Destinations" src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop" />
                </div>
                <span className="font-button text-button text-on-surface group-hover:text-primary text-center max-w-[100px] leading-tight transition-colors">Family<br/>Destinations</span>
              </Link>`;

content = content.replace(familyBlock, familyBlockReplaced);
content = content.replace(honeymoonBlock, honeymoonBlockReplaced);

// 2. Revert Most Popular Packages to static
const newPopular = `<div ref={scrollRef} className="flex overflow-x-auto gap-4 md:gap-6 hide-scrollbar pb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth">
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Ladakh" 
              price="₹21,999" 
              duration="6N/7D" 
              description="Experience the raw beauty of Leh, Nubra Valley, and Pangong Tso with a close-knit group of adventurers."
              bg="https://images.unsplash.com/photo-1581793746485-04698e79a4e8?w=1600&q=80"
              link="/itinerary/Ladakh" 
            />
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Spiti Valley" 
              price="₹16,999" 
              duration="5N/6D" 
              description="Brave the frozen landscapes of the middle land. A curated winter adventure for the bold."
              bg="https://images.unsplash.com/photo-1549257850-25e24bcf0e13?w=1600&q=80"
              link="/itinerary/Spiti Valley" 
            />
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Kashmir" 
              price="₹17,999" 
              duration="4N/5D" 
              description="Explore Srinagar, Gulmarg, and Pahalgam. A perfect mix of leisure and breathtaking vistas."
              bg="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1600&q=80"
              link="/itinerary/Kashmir" 
            />
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Andaman Retreat" 
              price="₹25,999" 
              duration="5N/6D" 
              description="Relax on the pristine beaches of Havelock and Neil Islands with amazing scuba diving opportunities."
              bg="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=1600&q=80"
              link="/group-trips" 
            />
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Meghalaya Expedition" 
              price="₹18,999" 
              duration="6N/7D" 
              description="Journey through the abode of clouds, explore living root bridges and crystal clear rivers."
              bg="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1600&q=80"
              link="/group-trips" 
            />
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Manali Kasol" 
              price="₹10,999" 
              duration="4N/5D" 
              description="Experience the vibrant cafes of Kasol and the snow-capped peaks of Manali in one epic trip."
              bg="https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1600&q=80"
              link="/group-trips" 
            />
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Jibhi Tirthan" 
              price="₹9,999" 
              duration="3N/4D" 
              description="Unwind in the pristine hidden valleys of Jibhi and Tirthan, surrounded by lush green forests."
              bg="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80"
              link="/group-trips" 
            />
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Chopta Tungnath" 
              price="₹11,999" 
              duration="4N/5D" 
              description="Trek through the mini Switzerland of India and visit the highest Shiva temple in the world."
              bg="https://images.unsplash.com/photo-1610212594957-c5332fc39634?w=1600&q=80"
              link="/group-trips" 
            />
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Kedarnath" 
              price="₹14,999" 
              duration="5N/6D" 
              description="Embark on a spiritual journey to the majestic Kedarnath temple amidst the Garhwal Himalayas."
              bg="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1600&q=80"
              link="/group-trips" 
            />
            <PackageCard className="w-[85vw] sm:w-[240px] md:w-[260px] lg:w-[280px] h-[340px] md:h-[360px] snap-center shrink-0" 
              tripTitle="Madhyameshwar" 
              price="₹12,999" 
              duration="4N/5D" 
              description="Discover the serene beauty and spiritual aura of the mystical Madhyameshwar temple trek."
              bg="https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?w=1600&q=80"
              link="/group-trips" 
            />
          </div>`;

const popularRegex = /<div ref=\{scrollRef\} className="flex overflow-x-auto gap-4 md:gap-6 hide-scrollbar pb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth">[\s\S]*?<\/div>/;
content = content.replace(popularRegex, newPopular);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Home page fixed");
