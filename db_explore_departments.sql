-- 1. Create table `explore_departments`
CREATE TABLE IF NOT EXISTS public.explore_departments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  icon text,
  route text,
  parent_id uuid REFERENCES public.explore_departments(id),
  hero_banner_url text,
  hero_media_type text DEFAULT 'image',
  description text,
  is_active boolean DEFAULT true,
  allow_package_placement boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- RLS policies
ALTER TABLE public.explore_departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on explore_departments" 
  ON public.explore_departments FOR SELECT 
  USING (true);

CREATE POLICY "Allow admin all access on explore_departments" 
  ON public.explore_departments FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Insert Initial Items
INSERT INTO public.explore_departments (title, slug, route, icon, display_order)
VALUES 
  ('Sales Offers', 'sales-offers', '/explore/sales-offers', 'local_offer', 1),
  ('Summer Destinations', 'summer-destinations', '/explore/summer-destinations', 'wb_sunny', 2),
  ('Winter Destinations', 'winter-destinations', '/explore/winter-destinations', 'ac_unit', 3),
  ('Monsoon Destinations', 'monsoon-destinations', '/explore/monsoon-destinations', 'umbrella', 4),
  ('Testimonials', 'testimonials', '/review', 'forum', 5)
ON CONFLICT (slug) DO NOTHING;
