ALTER TABLE "plant" ADD COLUMN "capacity" numeric;--> statement-breakpoint
ALTER TABLE "plant" ADD COLUMN "created_by" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plant" ADD CONSTRAINT "plant_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
