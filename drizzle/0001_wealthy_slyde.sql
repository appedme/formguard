ALTER TABLE "forms" ADD COLUMN "redirect_url" text;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "error_url" text;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "email_notifications" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "webhook_url" text;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "webhook_enabled" boolean DEFAULT false NOT NULL;