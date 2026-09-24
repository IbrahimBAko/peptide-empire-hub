CREATE TABLE public.customer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name text NOT NULL CHECK (char_length(reviewer_name) BETWEEN 2 AND 80),
  location text NOT NULL CHECK (char_length(location) BETWEEN 2 AND 100),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 100),
  body text NOT NULL CHECK (char_length(body) BETWEEN 10 AND 1000),
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.customer_reviews TO anon;
GRANT SELECT, INSERT ON public.customer_reviews TO authenticated;
GRANT ALL ON public.customer_reviews TO service_role;

ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read approved customer reviews"
ON public.customer_reviews
FOR SELECT
TO anon, authenticated
USING (approved = true);

CREATE POLICY "Public can submit pending customer reviews"
ON public.customer_reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (approved = false);

CREATE OR REPLACE FUNCTION public.set_customer_reviews_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_customer_reviews_updated_at
BEFORE UPDATE ON public.customer_reviews
FOR EACH ROW
EXECUTE FUNCTION public.set_customer_reviews_updated_at();