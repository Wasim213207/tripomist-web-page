import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use service role key to bypass RLS for migration, wait I only have anon key
// The admin has a policy "Admin ALL package_placements FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());"
// Wait, is public.is_admin() bypassed by the anon key? No.
// But wait, the previous RLS for package_placements was:
// CREATE POLICY "Public SELECT package_placements" ON public.package_placements FOR SELECT USING (true);
// But how do I insert if I am not admin?
// The user might have created the table. Did the user create the RLS?
// If the user created the RLS, I can't insert via anon key!
// Let me just try inserting, if it fails due to RLS, I can disable RLS or just write the migration script in SQL and ask the user to run it?
// Or I can authenticate as admin. But I don't know the admin password.
// Let me write a script and see if it can insert. Maybe RLS is not enabled yet or I can disable it.
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("--- MIGRATION SCRIPT ---");
  
  // 1. Fetch all packages
  const { data: pkgs, error: pkgsErr } = await supabase.from('Pakage').select('*');
  if (pkgsErr) {
    console.error("Error fetching packages:", pkgsErr);
    return;
  }
  
  console.log(`Found ${pkgs.length} packages.`);
  
  // 2. For each package, derive placements and insert
  const placements = [];
  
  // Fetch IDs for homepage_sections, interests, destinations
  const { data: sections } = await supabase.from('homepage_sections').select('*');
  const { data: interests } = await supabase.from('interest_categories').select('*');
  const { data: destinations } = await supabase.from('destinations').select('*');
  
  for (const pkg of pkgs) {
    let cats = [];
    if (pkg.listing_categories && Array.isArray(pkg.listing_categories)) {
        cats = [...pkg.listing_categories];
    }
    if (pkg.featured && !cats.includes('recommended')) cats.push('recommended');
    if (pkg.best_seller && !cats.includes('best-seller')) cats.push('best-seller');
    
    // Homepage Sections & Interests
    for (const cat of cats) {
        const sec = sections?.find(s => s.section_key === cat);
        if (sec) {
            placements.push({
                package_id: pkg.id,
                placement_type: 'homepage_section',
                placement_id: sec.id,
                placement_slug: sec.section_key
            });
        } else {
            const int = interests?.find(i => i.slug === cat);
            if (int) {
                placements.push({
                    package_id: pkg.id,
                    placement_type: 'interest',
                    placement_id: int.id,
                    placement_slug: int.slug
                });
            }
        }
    }
    
    // Destination
    if (pkg.destination) {
        const dest = destinations?.find(d => d.slug === pkg.destination);
        if (dest) {
            placements.push({
                package_id: pkg.id,
                placement_type: 'destination',
                placement_id: dest.id,
                placement_slug: dest.slug
            });
        }
    }
  }
  
  console.log("Placements to insert:", placements);
  
  if (placements.length > 0) {
      const { data: inserted, error: insertErr } = await supabase
        .from('package_placements')
        .insert(placements)
        .select();
        
      if (insertErr) {
          console.error("Error inserting placements:", insertErr);
      } else {
          console.log("Successfully inserted placements:", inserted);
      }
  }
  
  // 3. Test visibility
  console.log("--- VISIBILITY TEST ---");
  
  const { data: homeRec } = await supabase
    .from('package_placements')
    .select('*, Pakage!inner(title)')
    .eq('placement_type', 'homepage_section')
    .eq('placement_slug', 'recommended');
  console.log("Recommended section packages:", homeRec?.map(r => r.Pakage.title));
  
  const { data: homeBest } = await supabase
    .from('package_placements')
    .select('*, Pakage!inner(title)')
    .eq('placement_type', 'homepage_section')
    .eq('placement_slug', 'best-seller');
  console.log("Best Seller section packages:", homeBest?.map(r => r.Pakage.title));
  
  const { data: intTrek } = await supabase
    .from('package_placements')
    .select('*, Pakage!inner(title)')
    .eq('placement_type', 'interest')
    .eq('placement_slug', 'trek');
  console.log("Trek interest packages:", intTrek?.map(r => r.Pakage.title));
  
  const { data: destTest } = await supabase
    .from('package_placements')
    .select('*, Pakage!inner(title)')
    .eq('placement_type', 'destination');
  console.log("Destination packages:", destTest?.map(r => r.Pakage.title));

}

run();
