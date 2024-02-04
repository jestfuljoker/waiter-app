CREATE INDEX IF NOT EXISTS "product_name_idx" ON "product" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_price_idx" ON "product" ("price");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "product_categoryId_idx" ON "product" ("categoryId");