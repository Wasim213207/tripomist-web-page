-- ==========================================
-- STRICT BOOKING PRIVACY RLS POLICIES
-- ==========================================

-- Enable RLS on bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 1. Remove any existing overly permissive policies
DROP POLICY IF EXISTS "Public SELECT bookings" ON public.bookings;
DROP POLICY IF EXISTS "Customer SELECT bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin ALL bookings" ON public.bookings;
DROP POLICY IF EXISTS "Customer SELECT own bookings" ON public.bookings;

-- 2. Admin Policy: Admin users can see and modify all bookings
CREATE POLICY "Admin ALL bookings" ON public.bookings
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. Customer Policy: Logged-in customers can ONLY see bookings explicitly linked to their auth.uid()
CREATE POLICY "Customer SELECT own bookings" ON public.bookings
FOR SELECT USING (
    auth.role() = 'authenticated' AND 
    user_id = auth.uid()
);

-- Note: Unlinked bookings (user_id IS NULL) are protected because they will not match auth.uid(),
-- and therefore will remain invisible to any non-admin user.
