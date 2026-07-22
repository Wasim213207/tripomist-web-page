import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyData() {
  console.log('--- Verifying Data Sync ---');
  
  // Get all packages
  const { data: pkgs } = await supabase.from('Pakage').select('id, title, slug');
  console.log(`Found ${pkgs.length} packages`);
  
  // Verify placements mapping
  const { data: placements } = await supabase.from('package_placements').select('*');
  console.log(`Found ${placements.length} placements`);
  
  // Verify IDs against sections, interests, destinations
  const { data: sections } = await supabase.from('homepage_sections').select('id, section_key');
  const { data: interests } = await supabase.from('interest_categories').select('id, slug');
  const { data: destinations } = await supabase.from('destinations').select('id, slug');
  
  let valid = true;
  for (const p of placements) {
    if (p.placement_type === 'homepage_section') {
      const match = sections.find(s => s.id === p.placement_id);
      if (!match) {
        console.log(`❌ Invalid placement_id ${p.placement_id} for section ${p.placement_slug}`);
        valid = false;
      }
    } else if (p.placement_type === 'interest') {
      const match = interests.find(s => s.id === p.placement_id);
      if (!match) {
        console.log(`❌ Invalid placement_id ${p.placement_id} for interest ${p.placement_slug}`);
        valid = false;
      }
    } else if (p.placement_type === 'destination') {
      const match = destinations.find(s => s.id === p.placement_id);
      if (!match) {
        console.log(`❌ Invalid placement_id ${p.placement_id} for destination ${p.placement_slug}`);
        valid = false;
      }
    }
  }
  
  if (valid) {
    console.log('✅ All package_placements use valid real IDs!');
  }
  
  // Print current rendering sets
  console.log('\n--- Frontend Sections ---');
  sections.forEach(s => console.log(`Section: ${s.section_key} (ID: ${s.id})`));
}

verifyData().catch(console.error);
