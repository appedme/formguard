// Plan limits — single source of truth
export const PLAN_LIMITS = {
	free: {
		maxForms: 1,
		maxSubmissionsPerMonth: 100,
		aiInsights: false,
		aiInsightsPerMonth: 0,
		webhooks: false,
		teamWorkspace: false,
		label: "Free",
		price: 0,
	},
	pro: {
		maxForms: 10,
		maxSubmissionsPerMonth: 5000,
		aiInsights: true,
		aiInsightsPerMonth: 25,
		webhooks: false,
		teamWorkspace: false,
		label: "Pro",
		price: 9,
	},
	growth: {
		maxForms: Infinity,
		maxSubmissionsPerMonth: Infinity,
		aiInsights: true,
		aiInsightsPerMonth: Infinity,
		webhooks: true,
		teamWorkspace: true,
		label: "Growth",
		price: 29,
	},
} as const;

export type PlanName = keyof typeof PLAN_LIMITS;
