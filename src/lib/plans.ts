// Plan limits — single source of truth
export const PLAN_LIMITS = {
	free: {
		maxForms: 3,
		maxSubmissionsPerMonth: 500,
		aiInsights: true,
		aiInsightsPerMonth: 5,
		webhooks: true,
		teamWorkspace: false,
		label: "Starter",
		price: 0,
	},
	pro: {
		maxForms: 25,
		maxSubmissionsPerMonth: 25000,
		aiInsights: true,
		aiInsightsPerMonth: 100,
		webhooks: true,
		teamWorkspace: false,
		label: "Pro",
		price: 19,
	},
	growth: {
		maxForms: Infinity,
		maxSubmissionsPerMonth: Infinity,
		aiInsights: true,
		aiInsightsPerMonth: Infinity,
		webhooks: true,
		teamWorkspace: true,
		label: "Business",
		price: 49,
	},
} as const;

export type PlanName = keyof typeof PLAN_LIMITS;
