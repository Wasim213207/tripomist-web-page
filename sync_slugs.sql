-- Normalize all homepage_sections view_all_route to match section_key exactly
UPDATE public.homepage_sections 
SET view_all_route = '/trips/' || section_key 
WHERE view_all_route IS NOT NULL AND view_all_route != '';

-- Normalize all interest_categories route to match slug exactly
UPDATE public.interest_categories 
SET route = '/trips/' || slug 
WHERE route IS NOT NULL AND route != '';

-- Add upcoming_trips if it doesn't exist
INSERT INTO public.homepage_sections (id, section_key, title, subtitle, is_active, display_order, view_all_route, max_cards)
SELECT gen_random_uuid(), 'upcoming_trips', 'Upcoming Trips', 'Don''t miss out', true, 5, '/trips/upcoming_trips', 10
WHERE NOT EXISTS (SELECT 1 FROM public.homepage_sections WHERE section_key = 'upcoming_trips');
