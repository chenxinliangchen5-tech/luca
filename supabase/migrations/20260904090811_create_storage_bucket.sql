/*
# Create storage bucket for portfolio images

1. Purpose
   - Create a public storage bucket so the site owner can upload images (avatar, project images, etc.) directly from the admin panel.
   - Allow anyone to read uploaded images (they're displayed on the public website).
   - Only authenticated (logged-in owner) can upload or delete images.

2. Storage Changes
   - Create bucket `portfolio-images` (public = true).
   - Add SELECT policy for anon+authenticated (public read).
   - Add INSERT policy for authenticated only (owner upload).
   - Add DELETE policy for authenticated only (owner delete).
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read: anyone can view images
DROP POLICY IF EXISTS "public_read_portfolio_images" ON storage.objects;
CREATE POLICY "public_read_portfolio_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'portfolio-images');

-- Authenticated upload: only logged-in owner can upload
DROP POLICY IF EXISTS "auth_upload_portfolio_images" ON storage.objects;
CREATE POLICY "auth_upload_portfolio_images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio-images');

-- Authenticated delete: only logged-in owner can delete
DROP POLICY IF EXISTS "auth_delete_portfolio_images" ON storage.objects;
CREATE POLICY "auth_delete_portfolio_images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio-images');

-- Authenticated update: only logged-in owner can update
DROP POLICY IF EXISTS "auth_update_portfolio_images" ON storage.objects;
CREATE POLICY "auth_update_portfolio_images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio-images') WITH CHECK (bucket_id = 'portfolio-images');