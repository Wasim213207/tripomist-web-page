-- Create login slider items table
CREATE TABLE IF NOT EXISTS public.login_slider_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  title text,
  subtitle text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.login_slider_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active slides
CREATE POLICY "Public can view active login slider items" 
  ON public.login_slider_items 
  FOR SELECT 
  USING (is_active = true);

-- Allow admins full access
CREATE POLICY "Admins can manage login slider items" 
  ON public.login_slider_items 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );
