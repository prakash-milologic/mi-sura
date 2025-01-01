DO $$ BEGIN
 ALTER TABLE public.user ADD CONSTRAINT "public_user_id_fkey" FOREIGN KEY ("id") REFERENCES auth.users("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;