import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { error } = await supabase.from('package_placements').insert({
    package_id: 1,
    placement_type: 'homepage_section',
    placement_id: '6a8c14d9-8124-411f-b2fb-484ce32a7ff2',
    placement_slug: 'recommended'
  });
  console.log(error);
}

check();
