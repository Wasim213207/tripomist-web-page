import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("--- VISIBILITY TEST ---");
  
  // Since we are checking from public API, RLS for SELECT allows everyone
  const { data: homeRec, error: e1 } = await supabase
    .from('package_placements')
    .select('*, Pakage!inner(title)')
    .eq('placement_type', 'homepage_section')
    .eq('placement_slug', 'recommended');
  console.log("Recommended section packages:", homeRec?.map(r => r.Pakage.title) || []);
  if (e1) console.log("Error:", e1);
  
  const { data: homeBest, error: e2 } = await supabase
    .from('package_placements')
    .select('*, Pakage!inner(title)')
    .eq('placement_type', 'homepage_section')
    .eq('placement_slug', 'best-seller');
  console.log("Best Seller section packages:", homeBest?.map(r => r.Pakage.title) || []);
  if (e2) console.log("Error:", e2);
  
  const { data: intTrek, error: e3 } = await supabase
    .from('package_placements')
    .select('*, Pakage!inner(title)')
    .eq('placement_type', 'interest')
    .eq('placement_slug', 'trek');
  console.log("Trek interest packages:", intTrek?.map(r => r.Pakage.title) || []);
  if (e3) console.log("Error:", e3);
  
  const { data: destTest, error: e4 } = await supabase
    .from('package_placements')
    .select('*, Pakage!inner(title)')
    .eq('placement_type', 'destination');
  console.log("Destination packages:", destTest?.map(r => r.Pakage.title) || []);
  if (e4) console.log("Error:", e4);
  
  const { data: all, error: e5 } = await supabase.from('package_placements').select('*');
  console.log(`Total package placements inserted: ${all?.length || 0}`);
  if (e5) console.log("Error:", e5);
}

run();
