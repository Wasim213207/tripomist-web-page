const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'pages', 'ItinerarySpiti.jsx');
const destPath = path.join(__dirname, 'src', 'pages', 'ItineraryUdaipurKumbhalgarh.jsx');

let content = fs.readFileSync(srcPath, 'utf8');

// Replace component name
content = content.replace(/ItinerarySpiti/g, 'ItineraryUdaipurKumbhalgarh');

// Replace tripsData key and data
content = content.replace(/"Spiti Valley": \{[\s\S]*?\},\s*"Ladakh": \{/, `"Udaipur & Kumbhalgarh": {
      title: "Udaipur & Kumbhalgarh",
      location: "Rajasthan, India",
      description: "Explore Rajasthan’s lake city and various heritage wonders including the magnificent Kumbhalgarh Fort.",
      price: "₹6,999",
      numericPrice: 6999,
      duration: "2N/3D",
      difficulty: "Easy",
      bg: "https://images.unsplash.com/photo-1615836245337-f5b9b230bc18?w=1600&q=80",
      days: [
        {
          num: 0,
          title: "GURUGRAM TO UDAIPUR | OVERNIGHT JOURNEY",
          desc: "Assemble at the boarding point in Gurugram (IFFCO Chowk Metro Station or as informed).\\nStart an overnight journey to Udaipur and socialize with your co-travellers."
        },
        {
          num: 1,
          title: "UDAIPUR ARRIVAL | LAKE , BAZAARS",
          desc: "After arriving in Udaipur, check-in to our hotel, have some leisure and freshen-up.\\n\\nHead out to explore Rajasthan’s lake city and various heritage wonders.\\n\\nVisit the Saheliyon Ki Bari, Maharana Pratap Memorial and Under the Sun Aquarium. A trip to Udaipur will remain incomplete without soaking in the serenity of its freshwater lakes. In the evening, enjoy a mesmerizing sunset at Fatehsagar Lake, go out in Fatehsagar’s local market area for lip-smacking street food options.\\n\\nPost explorations, head back to your comfy accommodation.\\n\\nDinner and overnight stay in a hotel in Udaipur."
        },
        {
          num: 2,
          title: "UDAIPUR OLD CITY EXPLORATION || CAFE HOPING",
          desc: "Wake up and post a delightful breakfast, set out to explore the other major attractions in Rajasthan’s lake city.\\n\\nVisit Udaipur’s City Palace and experience the grandeur and rich history of Mewar region. The City Palace offers panoramic views of Pichola lake and the entire white city.\\n\\nBuilt in the 17th century and dedicated to Lord Vishnu, visit Jagdish Temple and witness the intricate carvings of the temple. Also, visit Karni Mata Temple (via ropeway/by foot on your own).\\n\\nIn the evening, feel free to either witness the cultural & folk-art performances at the beautiful Bagore Ki Haveli (on your own) nestled along Lake Pichola or explore Gangaur Ghat and streets of Udaipur decorated with various local handicrafts, colorful fabrics, souvenirs, and chill at lake-view cafes."
        },
        {
          num: 3,
          title: "KUMBALGARGH FORT || DEPART FOR GURUGRAM",
          desc: "Wake up and post a delightful breakfast, check-out from our hotel and drive towards Kumbhalgarh Fort - one of the most beautiful forts in Rajasthan and a UNESCO World Heritage Site.\\n\\nAfter arriving at Kumbhalgarh, head out to explore the magnificent fort. The walls of the fort extend over 38 km and is the second longest wall after the Great Wall of China.\\n\\nIn the evening, say goodbye to Kumbhalgarh and start-off your return journey for Gurugram."
        },
        {
          num: 4,
          title: "GURUGRAM ARRIVAL",
          desc: "Reach Gurugram early morning with lots of amazing memories and unforgettable experiences."
        }
      ]
    },
    "Ladakh": {`);

// Update trip key references if needed (the original code dynamically gets it from the URL or hardcodes it sometimes).
// Let's check how the tripsData is used. `const tripKey = id || "Spiti Valley"`
content = content.replace(/const tripKey = id \|\| "Spiti Valley"/, 'const tripKey = id || "Udaipur & Kumbhalgarh"');
content = content.replace(/const tripKey = "Spiti Valley"/, 'const tripKey = "Udaipur & Kumbhalgarh"');
content = content.replace(/Object\.keys\(tripsData\)\.find\(key => key\.toLowerCase\(\)\.replace\(\/\\s\+\/g, '-'\) === id\)/, `Object.keys(tripsData).find(key => key.toLowerCase().replace(/\\s+/g, '-') === id)`);

// Update Inclusions and Exclusions
content = content.replace(/const inclusions = \[[\s\S]*?\];/, `const inclusions = [
    "Transportation from Gurugram to Gurugram: Tempo Traveler",
    "Accommodation on Sharing Basis: 2 Nights in Hotel.",
    "4 Meals: Dinner (2) & Breakfast (2), starting from Dinner on Day 1 to Breakfast on Day 3.",
    "All local explorations as per itinerary: City Palace, Jagdish Temple, Karni Mata Temple, Fatesagar Lake, Saheliyon Ki Bari, Lake Pichola, Gangaur Ghat, Bagore Ki Haveli and Kumbhalgarh Fort.",
    "Experienced and cool Trip Captain.",
    "Driver allowances, toll taxes, parking, state road taxes."
  ];`);

content = content.replace(/const exclusions = \[[\s\S]*?\];/, `const exclusions = [
    "Any personal Expenses / Adventure activities",
    "Anything not mentioned in the itinerary",
    "Any kind of entry tickets/fees",
    "Any Meals / Drinks other than Inclusion",
    "5% GST."
  ];`);

// Add new trip to tripsData correctly if there are multiple places.
fs.writeFileSync(destPath, content);
console.log('Created ItineraryUdaipurKumbhalgarh.jsx');
