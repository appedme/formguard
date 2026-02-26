import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

/**
 * Syncs all environment variables from .env to:
 * 1. Cloudflare Wrangler (Worker Secrets)
 * 2. GitHub Actions (Repo Secrets)
 */

async function sync() {
	const envPath = join(process.cwd(), ".env");
	let envContent = "";

	try {
		envContent = readFileSync(envPath, "utf-8");
	} catch (error) {
		console.error("Error: .env file not found in current directory.");
		process.exit(1);
	}

	const lines = envContent.split("\n");
	const envVars: Record<string, string> = {};

	for (const line of lines) {
		const trimmed = line.trim();
		// Skip comments and empty lines
		if (!trimmed || trimmed.startsWith("#")) continue;

		const firstEqual = trimmed.indexOf("=");
		if (firstEqual === -1) continue;

		const key = trimmed.slice(0, firstEqual).trim();
		let value = trimmed.slice(firstEqual + 1).trim();

		// Remove quotes if present
		if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
			value = value.slice(1, -1);
		}

		if (key) {
			envVars[key] = value;
		}
	}

	const keys = Object.keys(envVars);
	console.log(`🚀 Found ${keys.length} variables. Starting sync...\n`);

	for (const key of keys) {
		const value = envVars[key];

		// 1. Sync to Cloudflare Wrangler
		try {
			console.log(`☁️  [Cloudflare] Setting ${key}...`);
			execSync(`echo "${value}" | bunx wrangler secret put ${key}`, { stdio: "inherit" });
		} catch (error) {
			console.error(`❌ Failed to set ${key} on Cloudflare.`);
		}

		// 2. Sync to GitHub Actions using gh CLI
		try {
			console.log(`🐙 [GitHub] Setting ${key}...`);
			execSync(`gh secret set ${key} --body "${value}"`, { stdio: "inherit" });
		} catch (error) {
			console.error(`❌ Failed to set ${key} on GitHub. Ensure 'gh' is logged in.`);
		}

		console.log("");
	}

	console.log("✅ Sync complete!");
}

sync().catch(console.error);
