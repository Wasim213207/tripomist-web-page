-- 1. Storage Bucket creation for website-assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for website-assets
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'website-assets');

CREATE POLICY "Admin Upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'website-assets' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admin Update" 
ON storage.objects FOR UPDATE 
WITH CHECK (bucket_id = 'website-assets' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admin Delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'website-assets' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- 2. Menu Manager Fixes
ALTER TABLE public.navigation_items
ADD COLUMN IF NOT EXISTS badge_is_active BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS badge_text TEXT,
ADD COLUMN IF NOT EXISTS badge_type TEXT DEFAULT 'new';

-- 3. Promo Strip Enhancements
ALTER TABLE public.promo_strips
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS hero_banner_url TEXT,
ADD COLUMN IF NOT EXISTS hero_media_type TEXT DEFAULT 'image',
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS bg_color TEXT,
ADD COLUMN IF NOT EXISTS text_color TEXT,
ADD COLUMN IF NOT EXISTS allow_package_placement BOOLEAN DEFAULT true;
