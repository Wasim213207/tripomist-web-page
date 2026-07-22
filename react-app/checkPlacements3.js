import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { error } = await supabase.from('package_placements').insert({
    package_id: 1,
    placement_type: 'homepage_section',
    placement_id: 1, // sending bigint instead of UUID
    placement_slug: 'recommended'
  });
  console.log("Error after sending bigint:", error);
  
  if (!error) {
    await supabase.from('package_placements').delete().eq('package_id', 1).eq('placement_slug', 'recommended');
  }
}

check();
