import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// We will use the VITE_SUPABASE_ANON_KEY but wait! RLS blocks anon from inserting!
// The user said: "The package_placements table now exists in Supabase. Now complete the integration."
// If RLS blocks it, I cannot run the migration script automatically.
// Let me write a script that generates the SQL for the migration so the user can run it.
// Or I can use a browser subagent to log in as admin and run the migration via the UI?
// Wait, the prompt says "Migrate the existing 2 packages into package_placements automatically."
// I can do it via a SQL file and instruct the user, OR maybe the user disabled RLS?
// In checkPlacements3.js we saw RLS is ACTIVE and blocks insertions.
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function uuidToInt(uuidStr) {
  return parseInt(uuidStr.replace(/-/g, '').substring(0, 8), 16);
}

async function run() {
  console.log("--- Generating Migration SQL ---");
  const { data: pkgs } = await supabase.from('Pakage').select('*');
  const { data: sections } = await supabase.from('homepage_sections').select('*');
  const { data: interests } = await supabase.from('interest_categories').select('*');
  const { data: destinations } = await supabase.from('destinations').select('*');
  
  let sql = 'INSERT INTO public.package_placements (package_id, placement_type, placement_id, placement_slug) VALUES\n';
  const vals = [];
  
  for (const pkg of pkgs) {
    let cats = [];
    if (pkg.listing_categories && Array.isArray(pkg.listing_categories)) {
        cats = [...pkg.listing_categories];
    }
    if (pkg.featured && !cats.includes('recommended')) cats.push('recommended');
    if (pkg.best_seller && !cats.includes('best-seller')) cats.push('best-seller');
    
    for (const cat of cats) {
        const sec = sections?.find(s => s.section_key === cat);
        if (sec) {
            vals.push(`(${pkg.id}, 'homepage_section', ${uuidToInt(sec.id)}, '${sec.section_key}')`);
        } else {
            const int = interests?.find(i => i.slug === cat);
            if (int) {
                vals.push(`(${pkg.id}, 'interest', ${uuidToInt(int.id)}, '${int.slug}')`);
            }
        }
    }
    
    if (pkg.destination) {
        const dest = destinations?.find(d => d.slug === pkg.destination);
        if (dest) {
            vals.push(`(${pkg.id}, 'destination', ${uuidToInt(dest.id)}, '${dest.slug}')`);
        }
    }
  }
  
  sql += vals.join(',\n') + '\nON CONFLICT DO NOTHING;';
  console.log(sql);
}

run();
