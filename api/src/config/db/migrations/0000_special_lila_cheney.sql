DO $$ BEGIN
 CREATE TYPE "orderStatus" AS ENUM('WAITING', 'IN_PRODUCTION', 'DONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"table" varchar(255) NOT NULL,
	"status" "orderStatus" DEFAULT 'WAITING' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
