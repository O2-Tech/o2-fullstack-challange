ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stock_movements" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "stock_movements" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "stock_movements" ADD COLUMN "reason" text NOT NULL;--> statement-breakpoint
ALTER TABLE "stock_movements" DROP COLUMN "description";