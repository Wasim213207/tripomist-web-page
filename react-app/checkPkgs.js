import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: pkgs, error } = await supabase.from('Pakage').select('id, title, listing_categories, featured, best_seller, destination');
  console.log(pkgs);
  if (error) console.log(error);
}

run();
