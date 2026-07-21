-- ==========================================
-- Supabase Schema Updates for Tripomist
-- ==========================================

-- Admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- We assume authenticated users accessing the admin portal have admin rights.
  -- You can add a dedicated admins table check here if needed.
  RETURN (auth.role() = 'authenticated');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROMOTIONAL BANNERS
CREATE TABLE IF NOT EXISTS public.promotional_banners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label TEXT,
    title TEXT NOT NULL,
    highlighted_text TEXT,
    subtitle TEXT,
    price_text TEXT,
    desktop_image TEXT NOT NULL,
    mobile_image TEXT,
    button_text TEXT DEFAULT 'Explore Now',
    button_link TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. DESTINATIONS
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT,
    region TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.destinations (name, slug, image_url, display_order)
VALUES 
('Ladakh', 'ladakh', 'https://images.unsplash.com/photo-1581793746485-04698e79a4e8?q=80&w=600&auto=format&fit=crop', 1),
('Kashmir', 'kashmir', 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&q=80', 2),
('Spiti Valley', 'spiti-valley', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', 3),
('Uttarakhand', 'uttarakhand', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', 4),
('Himachal', 'himachal', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', 5),
('Rajasthan', 'rajasthan', 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80', 6),
('Kerala', 'kerala', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', 7),
('Meghalaya', 'meghalaya', 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1600&q=80', 8),
('Goa', 'goa', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', 9)
ON CONFLICT (slug) DO NOTHING;

-- 3. INTEREST CATEGORIES
CREATE TABLE IF NOT EXISTS public.interest_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT,
    route TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.interest_categories (name, slug, route, image_url, display_order)
VALUES 
('Only Trek', 'trek', '/trips/trek', 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=600&auto=format&fit=crop', 1),
('Group Departures', 'group-departures', '/trips/group-departures', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop', 2),
('Weekend Departures', 'weekend-departures', '/trips/weekend-departures', 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop', 3),
('Family Destination', 'family-trips', '/trips/family-trips', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop', 4),
('Honeymoon Trips', 'honeymoon-trips', '/trips/honeymoon-trips', 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80', 5)
ON CONFLICT (slug) DO NOTHING;


-- 4. HOMEPAGE SECTIONS
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    icon TEXT,
    view_all_text TEXT DEFAULT 'View All',
    view_all_route TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    max_cards INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.homepage_sections (section_key, title, subtitle, icon, view_all_text, view_all_route, display_order)
VALUES
('destinations', 'Destinations', '', '', '', '', 1),
('interests', 'Destination According To Interest', '', '', '', '', 2),
('recommended', 'Recommended Packages', 'Hot Selling', 'local_fire_department', 'View All Packages', '/trips/recommended', 3),
('best_seller', 'Best Seller', 'Top Choice', 'award_star', 'View All Sellers', '/trips/best-seller', 4),
('upcoming', 'Upcoming Trips', 'Plan Ahead', 'event_upcoming', 'View All', '/trips/upcoming-trips', 5),
('international', 'Soon you can plan abroad trips with us', 'International', 'flight_takeoff', 'View All Destinations', '/trips/international', 6)
ON CONFLICT (section_key) DO NOTHING;


-- 5. WEBSITE PAGES
CREATE TABLE IF NOT EXISTS public.website_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_key TEXT NOT NULL UNIQUE,
    title TEXT,
    subtitle TEXT,
    content JSONB DEFAULT '{}'::jsonb,
    hero_image_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.website_pages (page_key, title, subtitle, content)
VALUES
('about-us', 'About Us', 'Learn more about TripoMist', '{"paragraphs": ["Welcome to TripoMist, your ultimate travel partner.", "We provide the best curated packages."]}'::jsonb),
('cancellation-refund', 'Cancellation & Refund', 'Our refund policies', '{"paragraphs": ["Refunds are subject to terms and conditions.", "Please contact support for detailed information."]}'::jsonb),
('terms-conditions', 'Terms & Conditions', 'Our terms of service', '{"paragraphs": ["By using this site, you agree to our terms of service.", "Please read carefully before booking."]}'::jsonb),
('privacy-policy', 'Privacy Policy', 'How we protect your data', '{"paragraphs": ["Your privacy is our priority.", "We do not share your data with third parties."]}'::jsonb),
('contact-us', 'Contact Us', 'Get in touch with us', '{"paragraphs": ["Email: support@tripomist.com", "Phone: +91 9999999999"]}'::jsonb)
ON CONFLICT (page_key) DO NOTHING;


-- 6. BOOKINGS
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_reference TEXT UNIQUE NOT NULL,
    booking_source TEXT DEFAULT 'manual',
    user_id UUID,
    package_id UUID,
    package_title TEXT,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    travel_date DATE,
    travellers_count INTEGER DEFAULT 1,
    sharing_type TEXT,
    total_amount NUMERIC DEFAULT 0,
    advance_payment NUMERIC DEFAULT 0,
    remaining_payment NUMERIC DEFAULT 0,
    payment_status TEXT DEFAULT 'unpaid',
    booking_status TEXT DEFAULT 'pending',
    payment_method TEXT,
    notes TEXT,
    created_by UUID,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);


-- 7. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.site_settings (setting_key, setting_value)
VALUES
('hero', '{
  "media_type": "video",
  "desktop_media_url": "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4",
  "mobile_media_url": "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4",
  "heading": "Find Yourself<br /><span class=\"text-primary-container\">With TripoMist</span>",
  "subtitle": "Your Safe Travel Our Responsibility<span class=\"text-primary-container\">.</span>",
  "primary_button_text": "Explore All Departures",
  "primary_button_route": "/all-departures",
  "secondary_button_text": "See Upcoming Trips",
  "secondary_button_route": "/trips/upcoming-trips",
  "overlay_opacity": "30",
  "is_active": true
}'::jsonb),
('navbar', '{
  "logo_text": "TripoMist",
  "logo_image_url": "",
  "search_placeholder": "Search destinations...",
  "login_button_text": "Login",
  "login_route": "/login",
  "menu_button_text": "Menu",
  "main_links": [
    {"label": "Uttarakhand", "route": "/destinations/uttarakhand"},
    {"label": "Himachal", "route": "/destinations/himachal"},
    {"label": "About Us", "route": "/about-us"}
  ]
}'::jsonb),
('footer', '{
  "company_description": "Creating extraordinary adventures, from mountain trails to dream destinations, designed for explorers who seek more than just a trip.",
  "copyright_text": "TripoMist c {year} All Rights Reserved.",
  "columns": [
    {
      "title": "Company",
      "links": [
        {"label": "About Us", "href": "/about-us"},
        {"label": "Cancellation & Refund", "href": "/cancellation-refund"},
        {"label": "Terms & Conditions", "href": "/terms-conditions"},
        {"label": "Privacy Policy", "href": "/privacy-policy"},
        {"label": "Contact Us", "href": "/contact-us"}
      ]
    }
  ]
}'::jsonb),
('contact', '{
  "phone": "9990802608",
  "email": "info@tripomist.com",
  "address": "New Kondli, Mayur Vihar Phase-3, Delhi 110096"
}'::jsonb),
('social_links', '{
  "twitter": "https://twitter.com",
  "instagram": "https://www.instagram.com/travellhikes?igsh=dDIxcmJvbmRkemlj",
  "facebook": "https://www.facebook.com/share/1BWhe7V5V3/",
  "youtube": "",
  "whatsapp": "https://wa.me/919990802608"
}'::jsonb),
('package_detail_settings', '{
  "default_badge_text": "Most Popular",
  "show_badge": true,
  "whatsapp_number": "919990802608",
  "whatsapp_template": "Hey *TripoMist* I''m interested in *{package_title}*\nMy Full Name: \nPrefer Travel date: \nDestination: {package_title}\nHow Many people travel with me : {travellers}",
  "gst_label": "+ 5% GST",
  "default_enquiry_text": "Send Enquiry"
}'::jsonb),
('static_page_settings', '{}'::jsonb)
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;


-- ==========================================
-- RLS POLICIES
-- ==========================================

-- Promotional Banners
ALTER TABLE public.promotional_banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read - Promotional Banners" ON public.promotional_banners;
DROP POLICY IF EXISTS "Admin All - Promotional Banners" ON public.promotional_banners;
CREATE POLICY "Public Read - Promotional Banners" ON public.promotional_banners FOR SELECT USING (true);
CREATE POLICY "Admin All - Promotional Banners" ON public.promotional_banners FOR ALL USING (public.is_admin());

-- Destinations
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read - Destinations" ON public.destinations;
DROP POLICY IF EXISTS "Admin All - Destinations" ON public.destinations;
CREATE POLICY "Public Read - Destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Admin All - Destinations" ON public.destinations FOR ALL USING (public.is_admin());

-- Interest Categories
ALTER TABLE public.interest_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read - Interest Categories" ON public.interest_categories;
DROP POLICY IF EXISTS "Admin All - Interest Categories" ON public.interest_categories;
CREATE POLICY "Public Read - Interest Categories" ON public.interest_categories FOR SELECT USING (true);
CREATE POLICY "Admin All - Interest Categories" ON public.interest_categories FOR ALL USING (public.is_admin());

-- Homepage Sections
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read - Homepage Sections" ON public.homepage_sections;
DROP POLICY IF EXISTS "Admin All - Homepage Sections" ON public.homepage_sections;
CREATE POLICY "Public Read - Homepage Sections" ON public.homepage_sections FOR SELECT USING (true);
CREATE POLICY "Admin All - Homepage Sections" ON public.homepage_sections FOR ALL USING (public.is_admin());

-- Website Pages
ALTER TABLE public.website_pages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read - Website Pages" ON public.website_pages;
DROP POLICY IF EXISTS "Admin All - Website Pages" ON public.website_pages;
CREATE POLICY "Public Read - Website Pages" ON public.website_pages FOR SELECT USING (true);
CREATE POLICY "Admin All - Website Pages" ON public.website_pages FOR ALL USING (public.is_admin());

-- Bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Customer Read Own Bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin All - Bookings" ON public.bookings;
CREATE POLICY "Customer Read Own Bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin All - Bookings" ON public.bookings FOR ALL USING (public.is_admin());

-- Site Settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read - Site Settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin All - Site Settings" ON public.site_settings;
CREATE POLICY "Public Read - Site Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin All - Site Settings" ON public.site_settings FOR ALL USING (public.is_admin());

-- 8. REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    customer_image_url TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL CHECK (length(trim(review_text)) > 0),
    package_id UUID,
    package_title TEXT,
    destination TEXT,
    review_date DATE DEFAULT current_date,
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    source TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews RLS Policies
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read - Approved Reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admin All - Reviews" ON public.reviews;
CREATE POLICY "Public Read - Approved Reviews" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Admin All - Reviews" ON public.reviews FOR ALL USING (public.is_admin());
