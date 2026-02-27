import {
	pgTable,
	uuid,
	text,
	timestamp,
	pgEnum,
	boolean,
	jsonb,
	index,
} from "drizzle-orm/pg-core";

// Enums
export const planEnum = pgEnum("plan", ["free", "pro", "growth"]);

// ─── Users ───────────────────────────────────────────
export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	stackAuthId: text("stack_auth_id").notNull().unique(),
	email: text("email").notNull(),
	displayName: text("display_name"),
	plan: planEnum("plan").notNull().default("free"),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ─── Forms ───────────────────────────────────────────
export const forms = pgTable(
	"forms",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		endpointId: text("endpoint_id").notNull().unique(),
		redirectUrl: text("redirect_url"),
		errorUrl: text("error_url"),
		emailNotifications: boolean("email_notifications").notNull().default(false),
		webhookUrl: text("webhook_url"),
		webhookEnabled: boolean("webhook_enabled").notNull().default(false),
		slackWebhookUrl: text("slack_webhook_url"),
		discordWebhookUrl: text("discord_webhook_url"),
		autoResponderEnabled: boolean("auto_responder_enabled").notNull().default(false),
		autoResponderSubject: text("auto_responder_subject"),
		autoResponderMessage: text("auto_responder_message"),
		allowedOrigins: text("allowed_origins"), // Comma-separated list of allowed origins
		turnstileEnabled: boolean("turnstile_enabled").notNull().default(false),
		// ─── Integrations ────────────────────────────
		googleSheetsUrl: text("google_sheets_url"),
		telegramBotToken: text("telegram_bot_token"),
		telegramChatId: text("telegram_chat_id"),
		notionDatabaseId: text("notion_database_id"),
		notionToken: text("notion_token"),
		// ─── Public Form ─────────────────────────────
		isPublic: boolean("is_public").notNull().default(false),
		publicFormDescription: text("public_form_description"),
		publicFormFields: jsonb("public_form_fields").notNull().default([]),
		publicFormSuccessMessage: text("public_form_success_message"),
		publicFormButtonText: text("public_form_button_text").notNull().default("Submit"),
		publicFormHeaderImage: text("public_form_header_image"),
		publicFormThemeColor: text("public_form_theme_color").notNull().default("#6366f1"),
		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [index("forms_user_id_idx").on(table.userId)]
);

// ─── Submissions ─────────────────────────────────────
export const submissions = pgTable(
	"submissions",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		formId: uuid("form_id")
			.notNull()
			.references(() => forms.id, { onDelete: "cascade" }),
		payload: jsonb("payload").notNull(),
		ipAddress: text("ip_address"),
		isSpam: boolean("is_spam").notNull().default(false),
		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		index("submissions_form_id_idx").on(table.formId),
		index("submissions_created_at_idx").on(table.createdAt),
	]
);

// ─── Insights ────────────────────────────────────────
export const insights = pgTable(
	"insights",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		formId: uuid("form_id")
			.notNull()
			.references(() => forms.id, { onDelete: "cascade" }),
		summary: text("summary").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [index("insights_form_id_idx").on(table.formId)]
);

// ─── API Keys ─────────────────────────────────────────
export const apiKeys = pgTable(
	"api_keys",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		key: text("key").notNull().unique(),
		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
		lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
	},
	(table) => [index("api_keys_user_id_idx").on(table.userId), index("api_keys_key_idx").on(table.key)]
);

// ─── Feedback ─────────────────────────────────────────
export const feedback = pgTable(
	"feedback",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		name: text("name").notNull(),
		email: text("email").notNull(),
		message: text("message").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [index("feedback_created_at_idx").on(table.createdAt)]
);

// ─── Type Exports ────────────────────────────────────
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Form = typeof forms.$inferSelect;
export type NewForm = typeof forms.$inferInsert;
export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
export type Insight = typeof insights.$inferSelect;
export type NewInsight = typeof insights.$inferInsert;
export type Feedback = typeof feedback.$inferSelect;
export type NewFeedback = typeof feedback.$inferInsert;
