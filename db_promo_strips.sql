CREATE TABLE public.promo_strips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    text TEXT NOT NULL,
    link_url TEXT,
    is_clickable BOOLEAN DEFAULT true,
    open_in_new_tab BOOLEAN DEFAULT false,
    shine_enabled BOOLEAN DEFAULT true,
    animation_speed INTEGER DEFAULT 3,
    is_active BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Turn on Row Level Security
ALTER TABLE public.promo_strips ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active promo strips
CREATE POLICY "Allow public read access on promo_strips"
    ON public.promo_strips
    FOR SELECT
    USING (true);

-- Allow full access to authenticated users (admin)
CREATE POLICY "Allow full access to authenticated users on promo_strips"
    ON public.promo_strips
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert initial sample row
INSERT INTO public.promo_strips (text, link_url, is_active, display_order, is_clickable, open_in_new_tab)
VALUES ('Ladakh Spiti Early Bird – Save up to ₹3,000 🎉', '/explore/summer-destinations', true, 1, true, false);
