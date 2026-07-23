-- ==========================================
-- ADD HERO AND ABOUT COLUMNS TO LISTINGS
-- ==========================================

-- Destinations
ALTER TABLE public.destinations ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.destinations ADD COLUMN IF NOT EXISTS hero_banner_url TEXT;
ALTER TABLE public.destinations ADD COLUMN IF NOT EXISTS hero_media_type TEXT DEFAULT 'image';

-- Interest Categories
ALTER TABLE public.interest_categories ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.interest_categories ADD COLUMN IF NOT EXISTS hero_banner_url TEXT;
ALTER TABLE public.interest_categories ADD COLUMN IF NOT EXISTS hero_media_type TEXT DEFAULT 'image';
