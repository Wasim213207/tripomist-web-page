import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: nav } = await supabase.from('navigation_items').select('*');
  console.log(nav?.map(n => ({label: n.label, route: n.route})));
}

run();
