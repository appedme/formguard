/**
 * Cloudflare Turnstile Server-Side Verification
 * 
 * Documentation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

interface TurnstileVerifyResponse {
	success: boolean;
	"error-codes": string[];
	challenge_ts?: string;
	hostname?: string;
}

export async function verifyTurnstileToken(token: string, secretKey?: string) {
	const secret = secretKey || process.env.TURNSTILE_SECRET_KEY;

	if (!secret) {
		console.error("TURNSTILE_SECRET_KEY is not defined");
		return { success: false, error: "Configuration error" };
	}

	try {
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
			}
		);

		const data = (await response.json()) as TurnstileVerifyResponse;
		return data;
	} catch (error) {
		console.error("Turnstile verification error:", error);
		return { success: false, error: "Network error" };
	}
}
