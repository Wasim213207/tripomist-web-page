import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: hs } = await supabase.from('homepage_sections').select('*');
  console.log("homepage_sections:", hs);
  
  const { data: ic } = await supabase.from('interest_categories').select('*');
  console.log("interest_categories:", ic);
  
  const { data: d } = await supabase.from('destinations').select('*');
  console.log("destinations:", d);
}

run();
