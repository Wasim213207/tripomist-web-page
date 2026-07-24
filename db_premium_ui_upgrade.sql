-- 1. Add subtitle to explore_departments
ALTER TABLE public.explore_departments
ADD COLUMN IF NOT EXISTS subtitle TEXT;

-- 2. Add subtitle, shine_animation, and is_clickable to promo_strips
ALTER TABLE public.promo_strips
ADD COLUMN IF NOT EXISTS subtitle TEXT,
ADD COLUMN IF NOT EXISTS shine_animation BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS is_clickable BOOLEAN DEFAULT true;

-- 3. Menu Manager Fixes
ALTER TABLE public.navigation_items
ADD COLUMN IF NOT EXISTS badge_is_active BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS badge_text TEXT,
ADD COLUMN IF NOT EXISTS badge_type TEXT DEFAULT 'new';

-- 4. Storage Bucket creation for website-assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Policies for website-assets
-- Note: These might already exist, so wrap in DO blocks or just let them error if they exist.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public Access' AND tablename = 'objects'
    ) THEN
        CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'website-assets');
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Admin Upload' AND tablename = 'objects'
    ) THEN
        CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'website-assets' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Admin Update' AND tablename = 'objects'
    ) THEN
        CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE WITH CHECK (bucket_id = 'website-assets' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Admin Delete' AND tablename = 'objects'
    ) THEN
        CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'website-assets' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
    END IF;
END $$;
