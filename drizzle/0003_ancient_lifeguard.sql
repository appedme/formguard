ALTER TABLE "forms" ADD COLUMN "slack_webhook_url" text;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "discord_webhook_url" text;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "auto_responder_enabled" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "auto_responder_subject" text;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "auto_responder_message" text;