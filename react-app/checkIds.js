import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: s } = await supabase.from('homepage_sections').select('id').limit(1);
  const { data: i } = await supabase.from('interest_categories').select('id').limit(1);
  const { data: d } = await supabase.from('destinations').select('id').limit(1);
  
  console.log("sections id:", s);
  console.log("interests id:", i);
  console.log("destinations id:", d);
}

check();
