import fs from 'fs';

const filePath = 'src/pages/PackageDetail.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Change id to slug
content = content.replace(/const \{ id \} = useParams\(\)/g, "const { slug } = useParams()");
content = content.replace(/\.eq\('id', id\)/g, ".eq('slug', slug)");
content = content.replace(/if \(id\) \{/g, "if (slug) {");
content = content.replace(/\}, \[id\]\)/g, "}, [slug])");

// 2. Add costings to the mapping
const oldMapping = `inclusions: data.inclusions || [],
          exclusions: data.exclusions || [],
          highlights: data.itinerary ? data.itinerary.map(item => item.title) : [],
          itinerary: data.itinerary || []
        })`;

const newMapping = `inclusions: data.inclusions || [],
          exclusions: data.exclusions || [],
          highlights: data.itinerary ? data.itinerary.map(item => item.title) : [],
          itinerary: data.itinerary || [],
          costings: data.costings || []
        })`;
content = content.replace(oldMapping, newMapping);

// 3. Update the Costing section to render dynamically
const oldCosting = `                  <div className="space-y-4 text-gray-700 font-medium">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="font-bold">Quad Sharing</span>
                      <span className="text-[#136b8a] font-bold text-lg">₹{(trip.numericPrice - 2000).toLocaleString()} <span className="text-sm text-gray-500 font-normal">+ 5% GST</span></span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="font-bold">Triple Sharing</span>
                      <span className="text-[#136b8a] font-bold text-lg">₹{(trip.numericPrice - 1000).toLocaleString()} <span className="text-sm text-gray-500 font-normal">+ 5% GST</span></span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#eff6f9] rounded-xl border border-[#cde5ef]">
                      <span className="font-bold">Double Sharing</span>
                      <span className="text-[#136b8a] font-bold text-lg">₹{trip.numericPrice.toLocaleString()} <span className="text-sm text-gray-500 font-normal">+ 5% GST</span></span>
                    </div>
                  </div>`;

const newCosting = `                  <div className="space-y-4 text-gray-700 font-medium">
                    {trip.costings && trip.costings.length > 0 ? (
                      trip.costings.map((cost, idx) => (
                        <div key={idx} className={\`flex justify-between items-center p-4 rounded-xl border \${idx === trip.costings.length - 1 ? 'bg-[#eff6f9] border-[#cde5ef]' : 'bg-gray-50 border-gray-100'}\`}>
                          <span className="font-bold">{cost.sharing}</span>
                          <span className="text-[#136b8a] font-bold text-lg">
                            ₹{Number(cost.price).toLocaleString('en-IN')} 
                            {cost.gst && <span className="text-sm text-gray-500 font-normal ml-1">+ {cost.gst}</span>}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p>No costing details available.</p>
                    )}
                  </div>`;
content = content.replace(oldCosting, newCosting);

// Replace currency symbols just in case there are weird characters
content = content.replace(/,1/g, '₹');

fs.writeFileSync(filePath, content, 'utf8');
console.log("PackageDetail updated");
